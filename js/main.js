document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    //  MOBILE NAVIGATION (Your existing code is good!)
    // ==========================================================================
    const navToggle = document.querySelector('.mobile-nav-toggle');
    const navPanel = document.querySelector('.mobile-nav-panel');
    
    if (navToggle && navPanel) { // A slightly cleaner check
        const mainPanel = navPanel.querySelector('.mobile-nav-main');
        const submenuTriggers = navPanel.querySelectorAll('.mobile-submenu-trigger');
        const backButtons = navPanel.querySelectorAll('.mobile-nav-back');
        const allSubmenus = navPanel.querySelectorAll('.mobile-nav-submenu');

        // Open/close the main panel
        navToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navPanel.classList.toggle('is-active');
        });
        
        // Close panel when clicking outside of it
        document.addEventListener('click', (e) => {
            if (navPanel.classList.contains('is-active') && !navPanel.contains(e.target)) {
                navPanel.classList.remove('is-active');
            }
        });

        // Close panel on scroll
        window.addEventListener('scroll', () => {
            if (navPanel.classList.contains('is-active')) {
                navPanel.classList.remove('is-active');
            }
        });

        // Handle submenu sliding to the right
        submenuTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                // Get the name from the text content (e.g., "Services >")
                const submenuName = trigger.textContent.split(' ')[0]; 
                const targetSubmenu = document.querySelector(`.mobile-nav-submenu[data-submenu="${submenuName}"]`);
                
                if (targetSubmenu) {
                    mainPanel.classList.add('slide-out');
                    targetSubmenu.classList.add('is-active');
                }
            });
        });

        // Handle back button sliding to the left
        backButtons.forEach(button => {
            button.addEventListener('click', () => {
                mainPanel.classList.remove('slide-out');
                allSubmenus.forEach(submenu => submenu.classList.remove('is-active'));
            });
        });
    }


    // ==========================================================================
    //  SCROLL TO TOP BUTTON (The single, corrected version)
    // ==========================================================================
    const scrollToTopButton = document.querySelector('.scroll-to-top');

    // 1. Check if the button exists on the page
    if (scrollToTopButton) {

        // 2. Show or hide the button based on scroll position
        window.addEventListener('scroll', () => {
            // Show the button if the user has scrolled down more than 300px
            // (You can change this 300 value to whatever you like)
            if (window.scrollY > 300) {
                scrollToTopButton.classList.add('is-visible');
            } else {
                scrollToTopButton.classList.remove('is-visible');
            }
        });

        // 3. Handle the smooth scroll back to the top when clicked
        scrollToTopButton.addEventListener('click', (event) => {
            event.preventDefault(); // Stop the link's default behavior
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});