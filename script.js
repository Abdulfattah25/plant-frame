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
    initFormValidation();
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

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const productCards = document.querySelectorAll('.product-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            
            productCards.forEach(card => {
                const productName = card.querySelector('h5').textContent.toLowerCase();
                const productDescription = card.querySelector('p').textContent.toLowerCase();
                
                if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
                    card.style.display = 'block';
                    card.parentElement.style.display = 'block';
                } else {
                    card.style.display = 'none';
                    card.parentElement.style.display = 'none';
                }
            });
        });
    }
}

// Email Validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show position-fixed`;
    notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
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

// Share Product
function shareProduct(productName, productUrl) {
    if (navigator.share) {
        navigator.share({
            title: productName,
            text: `Lihat produk ${productName} yang keren ini!`,
            url: productUrl
        });
    } else {
        copyToClipboard(productUrl);
    }
}

// Price Calculator
function calculatePrice(basePrice, quantity, discount = 0) {
    const total = basePrice * quantity;
    const discountAmount = total * (discount / 100);
    return total - discountAmount;
}

// Format Currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount);
}

// Testimonial Carousel Auto-play
function initTestimonialCarousel() {
    const carousel = document.querySelector('#testimonialCarousel');
    if (carousel) {
        const bsCarousel = new bootstrap.Carousel(carousel, {
            interval: 5000,
            wrap: true
        });
    }
}

// Wishlist Functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist(productId, productName) {
    const index = wishlist.findIndex(item => item.id === productId);
    
    if (index > -1) {
        wishlist.splice(index, 1);
        showNotification(`${productName} dihapus dari wishlist`, 'info');
    } else {
        wishlist.push({ id: productId, name: productName });
        showNotification(`${productName} ditambahkan ke wishlist`, 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    updateWishlistUI();
}

function updateWishlistUI() {
    const wishlistButtons = document.querySelectorAll('.wishlist-btn');
    
    wishlistButtons.forEach(btn => {
        const productId = btn.dataset.productId;
        const isInWishlist = wishlist.some(item => item.id === productId);
        
        if (isInWishlist) {
            btn.classList.add('active');
            btn.innerHTML = '<i class="fas fa-heart"></i>';
        } else {
            btn.classList.remove('active');
            btn.innerHTML = '<i class="far fa-heart"></i>';
        }
    });
}

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId, productName, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    showNotification(`${productName} ditambahkan ke keranjang`, 'success');
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function updateCartQuantity(productId, quantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = quantity;
        if (quantity <= 0) {
            removeFromCart(productId);
        } else {
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartUI();
        }
    }
}

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    const cartTotal = document.querySelector('.cart-total');
    
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'inline' : 'none';
    }
    
    if (cartTotal) {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = formatCurrency(total);
    }
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

// Error Handling
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
    // You can send error reports to your analytics service here
});

// Service Worker Registration (for PWA)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('SW registered: ', registration);
            })
            .catch(function(registrationError) {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

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

// Product Comparison
let compareList = [];

function addToCompare(productId, productName) {
    if (compareList.length >= 3) {
        showNotification('Maksimal 3 produk dapat dibandingkan', 'warning');
        return;
    }
    
    if (!compareList.includes(productId)) {
        compareList.push(productId);
        showNotification(`${productName} ditambahkan ke perbandingan`, 'success');
        updateCompareUI();
    }
}

function removeFromCompare(productId) {
    compareList = compareList.filter(id => id !== productId);
    updateCompareUI();
}

function updateCompareUI() {
    const compareCount = document.querySelector('.compare-count');
    if (compareCount) {
        compareCount.textContent = compareList.length;
        compareCount.style.display = compareList.length > 0 ? 'inline' : 'none';
    }
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

// Product Rating System
function submitRating(productId, rating, review) {
    const ratingData = {
        productId: productId,
        rating: rating,
        review: review,
        date: new Date().toISOString(),
        user: 'Anonymous' // In real app, get from user session
    };
    
    // Save to localStorage (in real app, send to server)
    let ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    ratings.push(ratingData);
    localStorage.setItem('ratings', JSON.stringify(ratings));
    
    showNotification('Terima kasih atas review Anda!', 'success');
    updateProductRating(productId);
}

function updateProductRating(productId) {
    const ratings = JSON.parse(localStorage.getItem('ratings')) || [];
    const productRatings = ratings.filter(r => r.productId === productId);
    
    if (productRatings.length > 0) {
        const averageRating = productRatings.reduce((sum, r) => sum + r.rating, 0) / productRatings.length;
        const ratingElement = document.querySelector(`[data-product-id="${productId}"] .product-rating`);
        
        if (ratingElement) {
            ratingElement.innerHTML = generateStarRating(averageRating) + ` (${productRatings.length})`;
        }
    }
}

function generateStarRating(rating) {
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= rating) {
            stars += '<i class="fas fa-star text-warning"></i>';
        } else if (i - 0.5 <= rating) {
            stars += '<i class="fas fa-star-half-alt text-warning"></i>';
        } else {
            stars += '<i class="far fa-star text-warning"></i>';
        }
    }
    return stars;
}

// Advanced Search with Filters
function initAdvancedSearch() {
    const searchForm = document.getElementById('advancedSearchForm');
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const filters = {
            keyword: formData.get('keyword'),
            category: formData.get('category'),
            priceMin: formData.get('priceMin'),
            priceMax: formData.get('priceMax'),
            rating: formData.get('rating')
        };
        
        filterProducts(filters);
    });
}

function filterProducts(filters) {
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        let show = true;
        
        // Keyword filter
        if (filters.keyword) {
            const productName = product.querySelector('h5').textContent.toLowerCase();
            const productDesc = product.querySelector('p').textContent.toLowerCase();
            if (!productName.includes(filters.keyword.toLowerCase()) && 
                !productDesc.includes(filters.keyword.toLowerCase())) {
                show = false;
            }
        }
        
        // Category filter
        if (filters.category && filters.category !== 'all') {
            if (product.dataset.category !== filters.category) {
                show = false;
            }
        }
        
        // Price filter
        if (filters.priceMin || filters.priceMax) {
            const price = parseInt(product.dataset.price);
            if (filters.priceMin && price < parseInt(filters.priceMin)) {
                show = false;
            }
            if (filters.priceMax && price > parseInt(filters.priceMax)) {
                show = false;
            }
        }
        
        // Rating filter
        if (filters.rating) {
            const rating = parseFloat(product.dataset.rating || 0);
            if (rating < parseFloat(filters.rating)) {
                show = false;
            }
        }
        
        product.style.display = show ? 'block' : 'none';
        product.parentElement.style.display = show ? 'block' : 'none';
    });
}

// Inventory Management
function checkInventory(productId) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    return inventory[productId] || 0;
}

function updateInventory(productId, quantity) {
    const inventory = JSON.parse(localStorage.getItem('inventory')) || {};
    inventory[productId] = quantity;
    localStorage.setItem('inventory', JSON.stringify(inventory));
    
    updateInventoryUI(productId, quantity);
}

function updateInventoryUI(productId, quantity) {
    const productCard = document.querySelector(`[data-product-id="${productId}"]`);
    if (!productCard) return;
    
    const stockElement = productCard.querySelector('.stock-status');
    const addToCartBtn = productCard.querySelector('.add-to-cart-btn');
    
    if (stockElement) {
        if (quantity > 0) {
            stockElement.innerHTML = `<span class="badge bg-success">Stok: ${quantity}</span>`;
            if (addToCartBtn) addToCartBtn.disabled = false;
        } else {
            stockElement.innerHTML = '<span class="badge bg-danger">Stok Habis</span>';
            if (addToCartBtn) addToCartBtn.disabled = true;
        }
    }
}

// Analytics Tracking
function trackEvent(eventName, eventData) {
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, eventData);
    }
    
    // Facebook Pixel example
    if (typeof fbq !== 'undefined') {
        fbq('track', eventName, eventData);
    }
    
    // Custom analytics
    const analyticsData = {
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent
    };
    
    // Send to your analytics endpoint
    // fetch('/api/analytics', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(analyticsData)
    // });
}

// Track product views
function trackProductView(productId, productName) {
    trackEvent('view_item', {
        item_id: productId,
        item_name: productName,
        item_category: 'plant_frame'
    });
}

// Track add to cart
function trackAddToCart(productId, productName, price) {
    trackEvent('add_to_cart', {
        item_id: productId,
        item_name: productName,
        price: price,
        currency: 'IDR'
    });
}



function formatDate(date) {
    return new Intl.DateTimeFormat('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
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


