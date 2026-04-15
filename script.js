/* ═══════════════════════════════════════════════════
   GOWTHAM R — PREMIUM PORTFOLIO  |  script.js
   Interactive features: Loading screen, custom cursor,
   typing effect, scroll reveals, skill animations,
   dark mode, parallax, contact form, and more.
═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {


    /* ══════════════════════════════
       1. LOADING SCREEN
       Fades out after assets are ready
    ══════════════════════════════ */
    const loader = document.getElementById('loader');

    const hideLoader = () => {
        if (loader) {
            loader.classList.add('loaded');
            // Allow body scrolling after loader disappears
            document.body.style.overflow = '';
        }
    };

    // Prevent scrolling while loading
    document.body.style.overflow = 'hidden';

    // Hide loader when page is fully loaded (min 1.2s for smooth feel)
    window.addEventListener('load', () => {
        setTimeout(hideLoader, 1200);
    });

    // Fallback: hide after 3.5s even if assets are slow
    setTimeout(hideLoader, 3500);


    /* ══════════════════════════════
       2. CUSTOM CURSOR
       Dot + ring follow the mouse
    ══════════════════════════════ */
    const cursorDot = document.getElementById('cursor-dot');
    const cursorRing = document.getElementById('cursor-ring');

    if (cursorDot && cursorRing) {
        let mouseX = 0, mouseY = 0;
        let ringX = 0, ringY = 0;

        // Track mouse position
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            // Dot follows instantly
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Ring follows with smooth lag
        const animateRing = () => {
            ringX += (mouseX - ringX) * 0.15;
            ringY += (mouseY - ringY) * 0.15;
            cursorRing.style.left = ringX + 'px';
            cursorRing.style.top = ringY + 'px';
            requestAnimationFrame(animateRing);
        };
        animateRing();

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll(
            'a, button, .btn, .project-card, .skill-card, .info-card, .timeline-card, .social-icon, input, textarea, .highlight-item, .contact-info-card'
        );

        hoverTargets.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorDot.classList.add('hovering');
                cursorRing.classList.add('hovering');
            });
            el.addEventListener('mouseleave', () => {
                cursorDot.classList.remove('hovering');
                cursorRing.classList.remove('hovering');
            });
        });

        // Hide cursor when leaving window
        document.addEventListener('mouseleave', () => {
            cursorDot.style.opacity = '0';
            cursorRing.style.opacity = '0';
        });
        document.addEventListener('mouseenter', () => {
            cursorDot.style.opacity = '1';
            cursorRing.style.opacity = '1';
        });
    }


    /* ══════════════════════════════
       3. TYPING EFFECT
       Cycles through skill strings
    ══════════════════════════════ */
    const typingEl = document.getElementById('typing-text');

    if (typingEl) {
        const phrases = [
            'Frontend Developer',
            'UI/UX Enthusiast',
            'React Developer',
            'Python Programmer',
            'Web Designer',
            'Problem Solver'
        ];

        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 80;

        const typeEffect = () => {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                // Deleting characters
                typingEl.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 40;
            } else {
                // Typing characters
                typingEl.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 80;
            }

            // Finished typing current phrase
            if (!isDeleting && charIndex === currentPhrase.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            }

            // Finished deleting
            if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                typingSpeed = 400; // Brief pause before next phrase
            }

            setTimeout(typeEffect, typingSpeed);
        };

        // Start typing after a short delay
        setTimeout(typeEffect, 1500);
    }


    /* ══════════════════════════════
       4. SCROLL REVEAL (IntersectionObserver)
       Animates elements as they enter the viewport
    ══════════════════════════════ */
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

    const revealObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    revealElements.forEach(el => revealObserver.observe(el));


    /* ══════════════════════════════
       5. NAVBAR — Scroll Effects
       Adds background blur on scroll + active section highlighting
    ══════════════════════════════ */
    const navbar = document.getElementById('navbar');
    const navItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    // Scroll handler for navbar background
    const updateNavbar = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();

    // Active section observer for nav highlighting
    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navItems.forEach(item => {
                        item.classList.remove('active');
                        if (item.getAttribute('data-section') === id) {
                            item.classList.add('active');
                        }
                    });
                }
            });
        },
        { threshold: 0.3, rootMargin: '-100px 0px -100px 0px' }
    );

    sections.forEach(section => sectionObserver.observe(section));


    /* ══════════════════════════════
       6. HAMBURGER MENU (Mobile)
    ══════════════════════════════ */
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.getElementById('nav-links');

    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            const isOpen = navLinksContainer.classList.toggle('open');
            hamburger.classList.toggle('open', isOpen);
            hamburger.setAttribute('aria-expanded', isOpen);
            // Prevent body scroll when menu is open
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu on link click
        navLinksContainer.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('open');
                hamburger.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }


    /* ══════════════════════════════
       7. DARK MODE TOGGLE
       Switches between dark and light themes
    ══════════════════════════════ */
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const html = document.documentElement;

    // Check saved preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            themeIcon.className = theme === 'dark'
                ? 'fa-solid fa-moon'
                : 'fa-solid fa-sun';
        }
    }


    /* ══════════════════════════════
       8. SKILL CIRCULAR PROGRESS ANIMATION
       Animates SVG ring fill when skills section is visible
    ══════════════════════════════ */
    const skillCards = document.querySelectorAll('.skill-card');

    // Create SVG gradient definition (we need it for stroke color)
    const svgNS = 'http://www.w3.org/2000/svg';
    const skillRings = document.querySelectorAll('.skill-progress-ring svg');

    skillRings.forEach(svg => {
        // Add gradient definition
        const defs = document.createElementNS(svgNS, 'defs');
        const gradient = document.createElementNS(svgNS, 'linearGradient');
        gradient.setAttribute('id', 'grad-' + Math.random().toString(36).substr(2, 5));
        gradient.setAttribute('x1', '0%');
        gradient.setAttribute('y1', '0%');
        gradient.setAttribute('x2', '100%');
        gradient.setAttribute('y2', '100%');

        const stop1 = document.createElementNS(svgNS, 'stop');
        stop1.setAttribute('offset', '0%');
        stop1.setAttribute('stop-color', '#6366f1');

        const stop2 = document.createElementNS(svgNS, 'stop');
        stop2.setAttribute('offset', '100%');
        stop2.setAttribute('stop-color', '#c084fc');

        gradient.appendChild(stop1);
        gradient.appendChild(stop2);
        defs.appendChild(gradient);
        svg.insertBefore(defs, svg.firstChild);

        // Apply gradient to ring-fill
        const ringFill = svg.querySelector('.ring-fill');
        if (ringFill) {
            ringFill.setAttribute('stroke', `url(#${gradient.id})`);
        }
    });

    // Animate rings when visible
    const skillObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const ring = card.querySelector('.ring-fill');
                    const countEl = card.querySelector('.count-up');

                    if (ring) {
                        const progress = parseInt(card.getAttribute('data-skill')) || 0;
                        const circumference = 2 * Math.PI * 54; // r=54
                        const offset = circumference - (progress / 100) * circumference;

                        // Trigger animation
                        setTimeout(() => {
                            ring.style.strokeDashoffset = offset;
                        }, 200);
                    }

                    // Count-up animation
                    if (countEl) {
                        const target = parseInt(countEl.getAttribute('data-target')) || 0;
                        animateCount(countEl, 0, target, 1500);
                    }

                    skillObserver.unobserve(card);
                }
            });
        },
        { threshold: 0.3 }
    );

    skillCards.forEach(card => skillObserver.observe(card));


    /* ══════════════════════════════
       9. COUNT-UP ANIMATION
       Used for hero stats and skill percentages
    ══════════════════════════════ */
    function animateCount(element, start, end, duration) {
        const startTime = performance.now();

        const update = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (end - start) * easedProgress);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        };

        requestAnimationFrame(update);
    }

    // Hero stats count-up
    const statNumbers = document.querySelectorAll('.hero-stats .stat-number');
    const statsObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-count')) || 0;
                    animateCount(el, 0, target, 2000);
                    statsObserver.unobserve(el);
                }
            });
        },
        { threshold: 0.5 }
    );

    statNumbers.forEach(el => statsObserver.observe(el));


    /* ══════════════════════════════
       10. TIMELINE LINE FILL ANIMATION
       Fills the vertical line as user scrolls
    ══════════════════════════════ */
    const timelineFill = document.getElementById('timeline-fill');
    const timelineSection = document.querySelector('.timeline-section');

    if (timelineFill && timelineSection) {
        const updateTimeline = () => {
            const rect = timelineSection.getBoundingClientRect();
            const sectionHeight = timelineSection.offsetHeight;
            const windowHeight = window.innerHeight;

            // Calculate how far through the section we've scrolled
            const scrollProgress = (windowHeight - rect.top) / (sectionHeight + windowHeight);
            const fillPercent = Math.max(0, Math.min(scrollProgress * 130, 100));

            timelineFill.style.height = fillPercent + '%';
        };

        window.addEventListener('scroll', updateTimeline, { passive: true });
        updateTimeline();
    }


    /* ══════════════════════════════
       11. HERO PARTICLES
       Generates floating particles in the hero section
    ══════════════════════════════ */
    const particlesContainer = document.getElementById('hero-particles');

    if (particlesContainer) {
        const particleCount = 30;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';

            // Random position and animation delay
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (6 + Math.random() * 6) + 's';

            // Random size
            const size = 2 + Math.random() * 4;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';

            // Random opacity
            particle.style.setProperty('--max-opacity', (0.3 + Math.random() * 0.5).toString());

            particlesContainer.appendChild(particle);
        }
    }


    /* ══════════════════════════════
       12. PARALLAX EFFECT
       Subtle parallax movement on hero content
    ══════════════════════════════ */
    const heroContent = document.querySelector('.hero-content');
    const heroGradient = document.querySelector('.hero-gradient');

    if (heroContent) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.15}px)`;
                heroContent.style.opacity = 1 - (scrolled / (window.innerHeight * 0.8));

                if (heroGradient) {
                    heroGradient.style.transform = `translate(-50%, -50%) scale(${1 + scrolled * 0.0005})`;
                }
            }
        }, { passive: true });
    }


    /* ══════════════════════════════
       13. SMOOTH SCROLL FOR NAV LINKS
       Enhanced smooth scrolling with offset
    ══════════════════════════════ */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPos = targetEl.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPos,
                    behavior: 'smooth'
                });
            }
        });
    });


    /* ══════════════════════════════
       14. BACK TO TOP BUTTON
    ══════════════════════════════ */
    const backToTop = document.getElementById('back-to-top');

    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        }, { passive: true });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }


    /* ══════════════════════════════
       15. CONTACT FORM HANDLING
       Simple validation and success feedback
    ══════════════════════════════ */
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('form-submit');
            const originalHTML = submitBtn.innerHTML;

            // Simulate sending (replace with actual form handling)
            submitBtn.innerHTML = '<span>Sending...</span><i class="fa-solid fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent!</span><i class="fa-solid fa-check"></i>';
                submitBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';

                // Construct mailto link
                const name = document.getElementById('form-name').value;
                const email = document.getElementById('form-email').value;
                const subject = document.getElementById('form-subject').value;
                const message = document.getElementById('form-message').value;

                const mailtoLink = `mailto:gowthamsugi8@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    `Name: ${name}\nEmail: ${email}\n\n${message}`
                )}`;

                window.location.href = mailtoLink;

                // Reset form after delay
                setTimeout(() => {
                    contactForm.reset();
                    submitBtn.innerHTML = originalHTML;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                }, 3000);
            }, 1500);
        });
    }


    /* ══════════════════════════════
       16. BUTTON RIPPLE EFFECT
       Adds a material-style ripple on click
    ══════════════════════════════ */
    document.querySelectorAll('.btn, .project-link, .social-icon, .action-btn').forEach(btn => {
        btn.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 50%;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out forwards;
                pointer-events: none;
            `;

            if (getComputedStyle(this).position === 'static') {
                this.style.position = 'relative';
            }
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            ripple.addEventListener('animationend', () => ripple.remove());
        });
    });

    // Inject ripple keyframe
    if (!document.getElementById('ripple-keyframe')) {
        const style = document.createElement('style');
        style.id = 'ripple-keyframe';
        style.textContent = `
            @keyframes rippleEffect {
                to { transform: scale(2.5); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }


    /* ══════════════════════════════
       17. TILT EFFECT ON CARDS
       Subtle 3D tilt on hover for project and skill cards
    ══════════════════════════════ */
    const tiltCards = document.querySelectorAll('.project-card, .skill-card, .info-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;

            card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });


    /* ══════════════════════════════
       18. MAGNETIC BUTTON EFFECT
       Buttons slightly pull towards the cursor
    ══════════════════════════════ */
    const magneticBtns = document.querySelectorAll('.btn-primary, .btn-outline, .social-icon');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });


    /* ══════════════════════════════
       19. TEXT REVEAL ON SCROLL
       Adds gradient text reveal effect to section titles
    ══════════════════════════════ */
    const sectionTitles = document.querySelectorAll('.section-title');

    const titleObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        },
        { threshold: 0.3 }
    );

    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)';
        titleObserver.observe(title);
    });


    /* ══════════════════════════════
       20. PERFORMANCE — Passive event listeners
       + Reduced motion support
    ══════════════════════════════ */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (prefersReducedMotion.matches) {
        // Disable all animations for users who prefer reduced motion
        document.documentElement.style.setProperty('--ease-out', 'linear');
        document.documentElement.style.setProperty('--ease-back', 'linear');

        // Make all reveals immediately visible
        document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
            el.classList.add('visible');
            el.style.transition = 'none';
        });
    }


}); /* End DOMContentLoaded */
