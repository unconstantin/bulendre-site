// Fashion Analytics Site - script.js

// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Main initialization function
function initializeWebsite() {
    initSmoothScrolling();
    initScrollAnimations();
    initStatsAnimation();
    initMobileMenu();
    initContactForm();
    initChartPlaceholders();
    initAnalyticsTracking();
}

// Smooth scrolling pentru link-urile din meniu
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active nav link
                updateActiveNavLink(this.getAttribute('href'));
            }
        });
    });
}

// Update active navigation link
function updateActiveNavLink(activeHref) {
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.classList.remove('active');
    });
    
    const activeLink = document.querySelector(`a[href="${activeHref}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Scroll-based animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Special animation for stats cards
                if (entry.target.querySelector('.stats-grid')) {
                    animateStatsCards(entry.target);
                }
                
                // Special animation for insights list
                if (entry.target.querySelector('.insights-list')) {
                    animateInsightsList(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });
}

// Animate stats cards with delay
function animateStatsCards(container) {
    const statsCards = container.querySelectorAll('.stat-card');
    statsCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.opacity = '1';
        }, index * 100);
    });
}

// Animate insights list items
function animateInsightsList(container) {
    const listItems = container.querySelectorAll('.insights-list li');
    listItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(0)';
            item.style.opacity = '1';
        }, index * 50);
    });
}

// Stats counter animation
function initStatsAnimation() {
    function animateCounter(element, target, suffix = '') {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current) + suffix;
        }, 20);
    }

    // Trigger when stats become visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                const originalText = statNumber.textContent;
                const number = parseInt(originalText);
                const suffix = originalText.replace(number.toString(), '');
                
                if (!entry.target.classList.contains('animated')) {
                    animateCounter(statNumber, number, suffix);
                    entry.target.classList.add('animated');
                }
            }
        });
    });

    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });
}

// Mobile menu functionality
function initMobileMenu() {
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-btn';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.style.cssText = `
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        color: #2c3e50;
        cursor: pointer;
    `;

    // Add mobile menu button to nav
    const nav = document.querySelector('nav');
    nav.appendChild(mobileMenuBtn);

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.classList.toggle('mobile-open');
    });

    // Add mobile styles dynamically
    const mobileStyles = document.createElement('style');
    mobileStyles.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-btn {
                display: block !important;
            }
            
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                border-radius: 0 0 10px 10px;
            }
            
            .nav-links.mobile-open {
                display: flex !important;
            }
            
            .nav-links a.active {
                color: #e74c3c;
                font-weight: bold;
            }
        }
    `;
    document.head.appendChild(mobileStyles);
}

// Contact form handling (for future implementation)
function initContactForm() {
    // Add contact form functionality when needed
    console.log('Contact form initialized - ready for implementation');
}

// Chart placeholders with loading animation
function initChartPlaceholders() {
    const chartPlaceholders = document.querySelectorAll('.chart-placeholder');
    
    chartPlaceholders.forEach(placeholder => {
        // Add hover effect
        placeholder.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(45deg, #e8e8e8, #d8d8d8)';
            this.style.transform = 'scale(1.02)';
            this.innerHTML = `
                <div>
                    📊 Chart-ul va fi încarcat aici<br>
                    <small>Hover pentru preview interactiv</small>
                    <div class="loading" style="margin-top: 10px;"></div>
                </div>
            `;
        });

        placeholder.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(45deg, #f0f0f0, #e0e0e0)';
            this.style.transform = 'scale(1)';
            this.innerHTML = `
                📈 Aici vei adăuga chart-urile tale interactive<br>
                (Chart.js, D3.js, sau Plotly)
            `;
        });
    });
}

// Analytics and tracking (Google Analytics placeholder)
function initAnalyticsTracking() {
    // Track page views
    console.log('Page loaded:', window.location.href);
    
    // Track button clicks
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const buttonText = this.textContent;
            const buttonHref = this.href;
            console.log('Button clicked:', buttonText, buttonHref);
            
            // Add Google Analytics event tracking here when implemented
            // gtag('event', 'click', {
            //     'event_category': 'engagement',
            //     'event_label': buttonText
            // });
        });
    });

    // Track scroll depth
    let maxScroll = 0;
    window.addEventListener('scroll', function() {
        const scrollPercent = Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
            maxScroll = scrollPercent;
            if (maxScroll % 25 === 0) { // Track every 25%
                console.log('Scroll depth:', maxScroll + '%');
            }
        }
    });
}

// Utility functions for future chart integration
const ChartUtils = {
    // Initialize Chart.js chart
    createChart: function(canvasId, config) {
        const ctx = document.getElementById(canvasId);
        if (ctx && typeof Chart !== 'undefined') {
            return new Chart(ctx, config);
        }
        console.warn('Chart.js not loaded or canvas not found:', canvasId);
        return null;
    },

    // Sample fashion data generator
    generateFashionData: function(months = 12) {
        const data = [];
        const categories = ['Îmbrăcăminte', 'Încălțăminte', 'Accesorii', 'Genți'];
        const months_ro = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];
        
        for (let i = 0; i < months; i++) {
            const monthData = {
                month: months_ro[i % 12],
                sales: Math.floor(Math.random() * 100000) + 50000,
                categories: {}
            };
            
            categories.forEach(cat => {
                monthData.categories[cat] = Math.floor(Math.random() * 25000) + 10000;
            });
            
            data.push(monthData);
        }
        
        return data;
    },

    // Color schemes for charts
    colorSchemes: {
        fashion: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'],
        gradient: ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#4facfe'],
        seasonal: {
            spring: ['#ff9a9e', '#fecfef', '#fecfef'],
            summer: ['#a8edea', '#fed6e3', '#ffd89b'],
            autumn: ['#d299c2', '#fef9d7', '#ff8a80'],
            winter: ['#89f7fe', '#66a6ff', '#a8c8ec']
        }
    }
};

// Initialize CSV file processing utilities
const DataProcessor = {
    // Process uploaded CSV files (for future implementation)
    processCSV: function(file, callback) {
        if (typeof Papa !== 'undefined') {
            Papa.parse(file, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: function(results) {
                    console.log('CSV processed:', results.data.length, 'rows');
                    callback(results.data);
                },
                error: function(error) {
                    console.error('CSV parsing error:', error);
                }
            });
        } else {
            console.warn('Papa Parse not loaded - CSV processing unavailable');
        }
    },

    // Clean and prepare fashion data
    cleanFashionData: function(data) {
        return data.map(row => {
            // Clean common fashion data issues
            if (row.price) {
                row.price = parseFloat(row.price.toString().replace(/[^0-9.-]+/g, ''));
            }
            if (row.category) {
                row.category = row.category.toString().trim().toLowerCase();
            }
            if (row.brand) {
                row.brand = row.brand.toString().trim();
            }
            return row;
        }).filter(row => row.price && row.price > 0); // Remove invalid entries
    },

    // Generate insights from fashion data
    generateInsights: function(data) {
        if (!data || data.length === 0) return [];

        const insights = [];
        
        // Price analysis
        const prices = data.map(item => item.price).filter(p => p);
        if (prices.length > 0) {
            const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
            insights.push(`Prețul mediu al produselor: ${avgPrice.toFixed(2)} RON`);
        }

        // Category distribution
        const categories = {};
        data.forEach(item => {
            if (item.category) {
                categories[item.category] = (categories[item.category] || 0) + 1;
            }
        });

        const topCategory = Object.entries(categories).sort((a, b) => b[1] - a[1])[0];
        if (topCategory) {
            insights.push(`Categoria predominantă: ${topCategory[0]} (${topCategory[1]} produse)`);
        }

        return insights;
    }
};

// Export utilities for global access
window.ChartUtils = ChartUtils;
window.DataProcessor = DataProcessor;

// Ready state indicator
console.log('🎯 Fashion Analytics Site - JavaScript loaded successfully!');
console.log('📊 Chart utilities available:', typeof ChartUtils !== 'undefined');
console.log('📋 Data processing utilities available:', typeof DataProcessor !== 'undefined');