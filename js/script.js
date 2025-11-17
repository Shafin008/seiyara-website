$(document).ready(function() {
    // Add jQuery easing for smoother navigation scrolling
    $.easing.easeInOutQuad = function(x, t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * ((--t) * (t - 2) - 1) + b;
    };
    
    // Mobile menu toggle
    $('#mobileToggle').click(function() {
        $('#nav').toggleClass('active');
    });

    // Close mobile menu when clicking a link
    $('#nav a').click(function() {
        if ($(window).width() <= 768) {
            $('#nav').removeClass('active');
        }
    });

    // Theme toggle
    $('#themeToggle').click(function() {
        const html = $('html');
        const currentTheme = html.attr('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        html.attr('data-theme', newTheme);
        $(this).text(newTheme === 'light' ? '🌙' : '☀️');
        
        // Store preference
        try {
            localStorage.setItem('theme', newTheme);
        } catch(e) {
            // Silently fail if localStorage unavailable
        }
    });

    // Load saved theme
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            $('html').attr('data-theme', savedTheme);
            $('#themeToggle').text(savedTheme === 'light' ? '🌙' : '☀️');
        }
    } catch(e) {
        // Silently fail if localStorage unavailable
    }

    // MODIFIED: Instant smooth scroll with no delay
    $('a[href^="#"]').click(function(e) {
        const target = $(this.getAttribute('href'));
        if (target.length) {
            e.preventDefault();
            const headerHeight = $('#header').outerHeight();
            
            // NEW: Immediately reveal target section to prevent pause effect
            target.addClass('active');
            target.find('.reveal').addClass('active');
            
            $('html, body').stop(true, true).animate({ // CHANGED: stop(true, true) to jump to end and clear queue
                scrollTop: target.offset().top - headerHeight - 20
            }, 400, 'linear'); // CHANGED: Reduced to 400ms with linear easing for instant feel
        }
    });

    // Quick contact panel
    $('#quickContactToggle').click(function() {
        $('#quickContactPanel').toggleClass('active');
    });

    $('#panelClose').click(function() {
        $('#quickContactPanel').removeClass('active');
    });

    // Form validation
    $('#contactForm').submit(function(e) {
        e.preventDefault();
        
        let isValid = true;
        $('.error-message').hide();

        // Validate name
        const name = $('#name').val().trim();
        if (name === '') {
            $('#nameError').show();
            isValid = false;
        }

        // Validate email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            $('#emailError').show();
            isValid = false;
        }

        // Validate message
        const message = $('#message').val().trim();
        if (message === '') {
            $('#messageError').show();
            isValid = false;
        }

        if (isValid) {
            // Success message
            alert('Thank you for your message! We will contact you soon.');
            this.reset();
        }
    });

    // Header shadow on scroll
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#header').css('box-shadow', 'var(--shadow-md)');
        } else {
            $('#header').css('box-shadow', 'var(--shadow-sm)');
        }
    });

    // Partner logo click placeholder
    $('.partner-logo').click(function() {
        const partnerName = $(this).text();
        if (!partnerName.includes('[Partner')) {
            alert('Partner details for ' + partnerName + ' will be available soon.');
        }
    });

    // News card click placeholder
    $('.news-card').click(function() {
        const title = $(this).find('h3').text();
        alert('Full details for "' + title + '" will be available soon.');
    });

    // Keyboard navigation for accessibility
    $('.partner-logo, .news-card').attr('tabindex', '0').keypress(function(e) {
        if (e.which === 13) { // Enter key
            $(this).click();
        }
    });

    // ============================================
    // NEW: BACK TO TOP BUTTON - Modern UX
    // ============================================
    
    // Create back to top button
    $('body').append('<button class="back-to-top" id="backToTop" aria-label="Back to top">↑</button>');
    
    // Show/hide back to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#backToTop').addClass('show');
        } else {
            $('#backToTop').removeClass('show');
        }
    });
    
    // Back to top click
    $('#backToTop').click(function() {
        $('html, body').stop(true, true).animate({
            scrollTop: 0
        }, 600, 'easeInOutQuad');
    });
    
    // ============================================
    // LOGO/COMPANY NAME CLICK - Refresh page
    // ============================================
    
    $('.logo-area, .company-name').click(function() {
        window.location.href = window.location.pathname; // CHANGED: Full page refresh instead of scroll
    });

    // ============================================
    // SMOOTH SCROLL REVEAL ANIMATIONS
    // ============================================
    
    // Add reveal class to all sections and cards
    $('section').addClass('reveal');
    $('.solution-card').addClass('reveal');
    $('.news-card').addClass('reveal');
    $('.about-content p').addClass('reveal');
    $('.contact-grid > *').addClass('reveal');
    
    // Reveal animation on scroll
    function revealOnScroll() {
        const windowHeight = $(window).height();
        const scrollTop = $(window).scrollTop();
        
        $('.reveal').each(function() {
            const elementTop = $(this).offset().top;
            const revealPoint = 100; // Distance from bottom of viewport to trigger
            
            if (scrollTop + windowHeight - revealPoint > elementTop) {
                $(this).addClass('active');
            }
        });
    }
    
    // Run on scroll and on page load
    $(window).on('scroll', revealOnScroll);
    revealOnScroll(); // Initial check on page load
    
    // ============================================
    // STAGGERED ANIMATION FOR CARDS
    // ============================================
    
    // Add stagger delays to solution cards
    $('.solution-card').each(function(index) {
        $(this).css('transition-delay', (index * 0.15) + 's');
    });
    
    // Add stagger delays to news cards
    $('.news-card').each(function(index) {
        $(this).css('transition-delay', (index * 0.15) + 's');
    });
    
    // Add stagger delays to about paragraphs
    $('.about-content p').each(function(index) {
        $(this).css('transition-delay', (index * 0.2) + 's');
    });
});