// Wait for the entire DOM content to load before running JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons (must be called after DOM is ready)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons(); 
    }

    // 2. Cache necessary DOM elements
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    // Select both desktop and mobile navigation links
    const navLinks = document.querySelectorAll('nav a[data-page], #mobile-menu a[data-page-mobile]');
    const pageContents = document.querySelectorAll('.page-content');
    
    // --- CORE NAVIGATION LOGIC ---
    
    /**
     * Handles switching the visible page content and updating navigation links.
     * @param {string} targetPageId - The ID suffix of the page section (e.g., 'home', 'new-drop').
     */
    window.switchPage = (targetPageId) => {
        // 1. Hide all pages
        pageContents.forEach(page => {
            page.classList.add('hidden');
            page.classList.remove('block');
        });

        // 2. Show the target page
        const targetPage = document.getElementById(`page-${targetPageId}`);
        if (targetPage) {
            targetPage.classList.remove('hidden');
            targetPage.classList.add('block');
            // Smoothly scroll to the top of the page
            window.scrollTo({ top: 0, behavior: 'smooth' }); 
        }
        
        // 3. Update active state in desktop and mobile navigation
        navLinks.forEach(link => {
            // Reset link styling to default
            link.classList.remove('nav-active', 'font-bold', 'text-black');
            link.classList.add('font-medium', 'text-gray-700');
            
            // Determine the page name from the data attributes
            const pageName = link.getAttribute('data-page') || 
                             link.getAttribute('data-page-mobile').replace('-mobile', '');
            
            // Apply active styling if it matches the target page
            if (pageName === targetPageId) {
                link.classList.add('nav-active', 'font-bold', 'text-black');
                link.classList.remove('font-medium', 'text-gray-700');
            }
        });

        // 4. Hide mobile menu after selection (if it was open)
        mobileMenu.classList.add('hidden');
        // Reset the mobile button icon back to 'menu'
        if (mobileMenuButton) {
            mobileMenuButton.querySelector('svg').outerHTML = lucide.icons.menu.toSvg({ class: 'w-6 h-6' });
        }
    };

    // --- MOBILE MENU TOGGLE (Responsive Element) ---
    if (mobileMenuButton && mobileMenu && typeof lucide !== 'undefined') {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon from 'menu' to 'x' when open/closed
            const icon = mobileMenuButton.querySelector('svg');
            if (mobileMenu.classList.contains('hidden')) {
                // Menu is closed, show 'menu' icon
                icon.outerHTML = lucide.icons.menu.toSvg({ class: 'w-6 h-6' });
            } else {
                // Menu is open, show 'x' (close) icon
                icon.outerHTML = lucide.icons.x.toSvg({ class: 'w-6 h-6' });
            }
        });
    }
    
    // Initial load: show the home page by default
    switchPage('home');
});// JavaScript Document