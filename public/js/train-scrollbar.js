(function() {
    'use strict';
    
    const trainScrollbar = document.querySelector('.train-scrollbar');
    const train = document.querySelector('.train');
    
    if (!trainScrollbar || !train) {
        console.log('Train scrollbar elements not found');
        return;
    }
    
    function updateTrainPosition() {
        // Calculate scroll percentage
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(Math.max((scrollTop / docHeight) * 100, 0), 100);
        
        // Update train position
        train.style.left = `${scrollPercent}%`;
        
        // Add motion class when scrolling
        if (train._lastScroll !== scrollPercent) {
            train.classList.add('moving');
            clearTimeout(train._stopTimer);
            train._stopTimer = setTimeout(() => {
                train.classList.remove('moving');
            }, 150);
        }
        train._lastScroll = scrollPercent;
    }
    
    // Update on scroll
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                updateTrainPosition();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initial position
    updateTrainPosition();
    
    console.log('Train scrollbar initialized');
})();
