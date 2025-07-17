// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavbar();
    initBackToTop();
    initSmoothScroll();
    initProductModal();
    initCounters();
    initLazyLoading();
});

// Navbar Scroll Effect
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Mobile menu close on link click
    const navLinks = document.querySelectorAll('.nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                bsCollapse.hide();
            }
        });
    });
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Smooth Scroll for Navigation Links
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Product Modal
function initProductModal() {
    const productModal = document.getElementById('productModal');
    const modalTitle = productModal.querySelector('.modal-title');
    const modalImage = productModal.querySelector('img');
    const modalPrice = productModal.querySelector('.h4');
    const modalOriginalPrice = productModal.querySelector('.text-muted');
    const modalWhatsAppBtn = productModal.querySelector('.btn-success');
    
    // Add click event to product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            const productName = this.querySelector('h5').textContent;
            const product = products[productName];
            
            if (product) {
                modalTitle.textContent = productName;
                modalImage.src = product.image;
                modalImage.alt = productName;
                modalPrice.textContent = product.price;
                modalOriginalPrice.textContent = product.originalPrice;
                modalWhatsAppBtn.href = `https://wa.me/6281234567890?text=${encodeURIComponent(product.whatsappText)}`;
                
                const modal = new bootstrap.Modal(productModal);
                modal.show();
            }
        });
    });
}

// Animated Counters
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    const animateCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(() => animateCounter(counter), 1);
        } else {
            counter.innerText = target;
        }
    };
    
    // Intersection Observer for counters
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                if (!counter.classList.contains('animated')) {
                    counter.classList.add('animated');
                    animateCounter(counter);
                }
            }
        });
    });
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
}

// Lazy Loading for Images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// WhatsApp Order Functions
function orderProduct(productName, price) {
    const message = `Halo, saya tertarik untuk memesan ${productName} dengan harga ${price}. Mohon informasi lebih lanjut.`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

function orderPackage(packageName, price) {
    const message = `Halo, saya tertarik untuk memesan paket ${packageName} dengan harga ${price}. Mohon informasi lebih lanjut.`;
    const whatsappUrl = `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Loading State
function showLoading(element) {
    const originalText = element.innerHTML;
    element.innerHTML = '<span class="loading"></span> Loading...';
    element.disabled = true;
    
    return function hideLoading() {
        element.innerHTML = originalText;
        element.disabled = false;
    };
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Initialize cart UI on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartUI();
    updateWishlistUI();
});

// Performance Optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimized scroll handler
const optimizedScrollHandler = debounce(function() {
    // Handle scroll events here
}, 100);

window.addEventListener('scroll', optimizedScrollHandler);



// Dark Mode Toggle
function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        if (darkModeToggle) {
            darkModeToggle.checked = savedTheme === 'dark-mode';
        }
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark-mode');
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light-mode');
            }
        });
    }
}

// Image Gallery with Lightbox
function initImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <span class="lightbox-close">&times;</span>
                    <img src="${this.src}" alt="${this.alt}">
                    <div class="lightbox-caption">${this.alt}</div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            
            // Close lightbox
            const closeBtn = lightbox.querySelector('.lightbox-close');
            closeBtn.addEventListener('click', () => {
                document.body.removeChild(lightbox);
            });
            
            lightbox.addEventListener('click', function(e) {
                if (e.target === this) {
                    document.body.removeChild(lightbox);
                }
            });
        });
    });
}

// Product Quick View
function showQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;
    
    const quickViewModal = document.createElement('div');
    quickViewModal.className = 'modal fade';
    quickViewModal.innerHTML = `
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Quick View - ${product.name}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div class="modal-body">
                    <div class="row">
                        <div class="col-md-6">
                            <img src="${product.image}" alt="${product.name}" class="img-fluid">
                        </div>
                        <div class="col-md-6">
                            <h4>${product.name}</h4>
                            <p class="text-muted">${product.description}</p>
                            <div class="price mb-3">
                                <span class="h4 text-success">${product.price}</span>
                                ${product.originalPrice ? `<span class="text-muted text-decoration-line-through ms-2">${product.originalPrice}</span>` : ''}
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-success" onclick="addToCart('${product.id}', '${product.name}', ${product.priceValue}, '${product.image}')">
                                    <i class="fas fa-cart-plus me-2"></i>Tambah ke Keranjang
                                </button>
                                <button class="btn btn-outline-success" onclick="orderProduct('${product.name}', '${product.price}')">
                                    <i class="fab fa-whatsapp me-2"></i>Pesan via WhatsApp
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(quickViewModal);
    const modal = new bootstrap.Modal(quickViewModal);
    modal.show();
    
    quickViewModal.addEventListener('hidden.bs.modal', function() {
        document.body.removeChild(quickViewModal);
    });
}

function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Initialize all functionality when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initDarkMode();
    initImageGallery();
    initAdvancedSearch();
    initTestimonialCarousel();
    searchFAQ();
    
    // Initialize inventory for demo
    const demoInventory = {
        '1': 15,
        '2': 8,
        '3': 12,
        '4': 20
    };
    localStorage.setItem('inventory', JSON.stringify(demoInventory));
    
    // Update inventory UI for all products
    Object.keys(demoInventory).forEach(productId => {
        updateInventoryUI(productId, demoInventory[productId]);
    });
});

// Export functions for global use
window.PlantFrameApp = {
    orderProduct,
    orderPackage,
    addToCart,
    toggleWishlist,
    addToCompare,
    showQuickView,
    submitRating,
    trackProductView,
    trackAddToCart,
    shareProduct,
    subscribeNewsletter
};


