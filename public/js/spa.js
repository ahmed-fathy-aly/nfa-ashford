// Single Page Application Router
class SPARouter {
    constructor() {
        this.contentContainer = document.getElementById('spa-content');
        this.init();
    }

    init() {
        // Handle navigation clicks
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href^="/"]');
            if (link && !link.hasAttribute('target')) {
                e.preventDefault();
                const url = link.getAttribute('href');
                this.navigateTo(url);
            }
        });

        // Handle browser back/forward buttons
        window.addEventListener('popstate', (e) => {
            this.loadContent(window.location.pathname, false);
        });

        // Load initial content
        this.loadContent(window.location.pathname, false);
    }

    navigateTo(url) {
        window.history.pushState({}, '', url);
        this.loadContent(url, true);
    }

    async loadContent(url, shouldScrollToTop) {
        try {
            // Remove all article-specific classes before loading new content
            document.body.classList.remove('article-page');
            document.body.classList.remove('race-scrollbar-active');
            document.body.classList.remove('race-5k-article');
            
            // Show loading state
            this.contentContainer.style.opacity = '0.5';
            
            // Fetch content
            const response = await fetch(url + '?spa=true');
            if (!response.ok) {
                throw new Error('Page not found');
            }
            
            const html = await response.text();
            
            // Update content
            this.contentContainer.innerHTML = html;
            
            // Execute any scripts in the loaded content
            const scripts = this.contentContainer.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    newScript.textContent = oldScript.textContent;
                }
                oldScript.parentNode.replaceChild(newScript, oldScript);
            });
            
            // Restore opacity
            this.contentContainer.style.opacity = '1';
            
            // Scroll to top if navigating (not on initial load or back button)
            if (shouldScrollToTop) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // Update active nav link
            this.updateActiveNav(url);
            
        } catch (error) {
            console.error('Error loading content:', error);
            this.contentContainer.innerHTML = '<div class="container"><h1>Error loading page</h1></div>';
        }
    }

    updateActiveNav(url) {
        // Remove all active classes
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page
        const currentLink = document.querySelector(`.nav-link[href="${url}"]`) || 
                           document.querySelector('.nav-link[href="/"]');
        if (currentLink) {
            currentLink.classList.add('active');
        }
    }
}

// Initialize router when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new SPARouter();
});
