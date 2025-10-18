// Race Scrollbar - Interactive 5K Race Progress Indicator
class RaceScrollbar {
    constructor() {
        this.scrollbar = document.querySelector('.race-scrollbar');
        if (!this.scrollbar) return;

        this.runner = this.scrollbar.querySelector('.runner');
        this.progressText = this.scrollbar.querySelector('.race-progress');
        this.track = this.scrollbar.querySelector('.race-track');
        this.article = document.querySelector('.article-full');
        
        // Add classes to body
        document.body.classList.add('race-scrollbar-active');
        document.body.classList.add('race-5k-article');
        
        // Track scrolling state
        this.scrollTimeout = null;
        this.isScrolling = false;
        
        // Bind methods for proper event listener removal
        this.boundHandleScroll = this.handleScroll.bind(this);
        this.boundUpdatePosition = this.updateRunnerPosition.bind(this);
        
        this.init();
    }

    init() {
        // Update on scroll
        window.addEventListener('scroll', this.boundHandleScroll);
        window.addEventListener('resize', this.boundUpdatePosition);
        
        // Initial position
        this.updateRunnerPosition();
    }
    
    destroy() {
        // Remove event listeners
        window.removeEventListener('scroll', this.boundHandleScroll);
        window.removeEventListener('resize', this.boundUpdatePosition);
        
        // Clear timeout
        if (this.scrollTimeout) {
            clearTimeout(this.scrollTimeout);
        }
        
        // Remove classes from body
        document.body.classList.remove('race-scrollbar-active');
        document.body.classList.remove('race-5k-article');
    }
    
    handleScroll() {
        // Add running class when scrolling starts
        if (!this.isScrolling) {
            this.isScrolling = true;
            this.runner.classList.add('running');
        }
        
        // Update position
        this.updateRunnerPosition();
        
        // Clear previous timeout
        clearTimeout(this.scrollTimeout);
        
        // Remove running class after scrolling stops (200ms of no scroll)
        this.scrollTimeout = setTimeout(() => {
            this.isScrolling = false;
            this.runner.classList.remove('running');
        }, 200);
    }

    getDimensions() {
        // Get dimensions dynamically based on screen size
        const width = window.innerWidth;
        
        if (width <= 360) {
            return { startLine: 18, finishLine: 18, runner: 54 };
        } else if (width <= 480) {
            return { startLine: 20, finishLine: 20, runner: 62 };
        } else if (width <= 768) {
            return { startLine: 24, finishLine: 24, runner: 72 };
        } else {
            return { startLine: 30, finishLine: 30, runner: 85 };
        }
    }

    updateRunnerPosition() {
        if (!this.article) return;
        
        // Get article position and dimensions
        const articleRect = this.article.getBoundingClientRect();
        const articleTop = articleRect.top + window.pageYOffset;
        const articleHeight = this.article.offsetHeight;
        const articleBottom = articleTop + articleHeight;
        
        // Get current scroll position
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const scrollBottom = scrollTop + windowHeight;
        
        // Calculate how much of the article has been scrolled through
        // 0 = article just starting to appear, 1 = article end reached
        let scrollPercentage = 0;
        
        if (scrollTop >= articleTop && scrollTop < articleBottom) {
            // We're somewhere in the article
            const scrolledIntoArticle = scrollTop - articleTop;
            const visibleArticleHeight = Math.min(articleHeight, windowHeight);
            const scrollableRange = articleHeight - visibleArticleHeight;
            
            if (scrollableRange > 0) {
                scrollPercentage = scrolledIntoArticle / scrollableRange;
            }
        } else if (scrollTop >= articleBottom) {
            // Past the article
            scrollPercentage = 1;
        }
        
        // Clamp between 0 and 1
        const clampedPercentage = Math.max(0, Math.min(1, scrollPercentage));
        
        // Get dimensions for current screen size
        const dims = this.getDimensions();
        
        // Get track dimensions
        const trackHeight = this.track.offsetHeight;
        const usableTrackHeight = trackHeight - dims.startLine - dims.finishLine - dims.runner;
        
        // Calculate runner position (from top of usable track)
        const runnerTop = dims.startLine + (usableTrackHeight * clampedPercentage);
        
        // Update runner position
        this.runner.style.top = `${runnerTop}px`;
        
        // Add celebration effect when reaching the finish
        if (clampedPercentage >= 0.99) {
            this.runner.classList.add('finished');
        } else {
            this.runner.classList.remove('finished');
        }
    }
}

// Store instance globally for cleanup
window.raceScrollbarInstance = null;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        // Clean up any existing instance
        if (window.raceScrollbarInstance && window.raceScrollbarInstance.destroy) {
            window.raceScrollbarInstance.destroy();
        }
        window.raceScrollbarInstance = new RaceScrollbar();
    });
} else {
    // Clean up any existing instance
    if (window.raceScrollbarInstance && window.raceScrollbarInstance.destroy) {
        window.raceScrollbarInstance.destroy();
    }
    window.raceScrollbarInstance = new RaceScrollbar();
}
