// Application State
const state = {
    currentUser: null,
    cart: [],
    orders: [],
    tables: [
        { id: 1, number: 1, status: 'available' },
        { id: 2, number: 2, status: 'available' },
        { id: 3, number: 3, status: 'occupied' },
        { id: 4, number: 4, status: 'available' },
        { id: 5, number: 5, status: 'occupied' },
        { id: 6, number: 6, status: 'available' },
        { id: 7, number: 7, status: 'available' },
        { id: 8, number: 8, status: 'occupied' },
        { id: 9, number: 9, status: 'available' },
        { id: 10, number: 10, status: 'available' }
    ],
    adminOrders: [
        {
            id: 1,
            items: [{ name: "Regular Thali", quantity: 1, price: 80 }],
            total: 80,
            status: 'pending',
            timestamp: new Date().toLocaleString(),
            user: { type: 'student', id: 'S12345', name: 'Student User' },
            table: 3
        },
        {
            id: 2,
            items: [{ name: "Satvik Thali", quantity: 2, price: 90 }],
            total: 180,
            status: 'preparing',
            timestamp: new Date().toLocaleString(),
            user: { type: 'faculty', id: 'F67890', name: 'Faculty User' },
            table: 5
        },
        {
            id: 3,
            items: [{ name: "Jain Thali", quantity: 1, price: 95 }, { name: "Coffee", quantity: 1, price: 25 }],
            total: 120,
            status: 'ready',
            timestamp: new Date().toLocaleString(),
            user: { type: 'hostel', id: 'H11223', name: 'Hostel User' },
            table: null
        }
    ],
    menuItems: [
        {
            id: 1,
            name: "Regular Thali",
            description: "A complete meal with rice, dal, vegetables, roti, salad, and dessert",
            price: 80,
            category: "thali",
            image: "regular-thali"
        },
        {
            id: 2,
            name: "Satvik Thali",
            description: "Pure vegetarian meal without onion and garlic, as per Swaminarayan tradition",
            price: 90,
            category: "thali",
            image: "satvik-thali"
        },
        {
            id: 3,
            name: "Jain Thali",
            description: "Vegetarian meal without root vegetables, suitable for Jain dietary practices",
            price: 95,
            category: "thali",
            image: "jain-thali"
        },
        {
            id: 4,
            name: "Samosa",
            description: "Crispy pastry filled with spiced potatoes and peas",
            price: 20,
            category: "snacks",
            image: "samosa"
        },
        {
            id: 5,
            name: "Sandwich",
            description: "Fresh vegetables between bread slices with chutney",
            price: 40,
            category: "snacks",
            image: "sandwich"
        },
        {
            id: 6,
            name: "Coffee",
            description: "Hot brewed coffee with milk and sugar",
            price: 25,
            category: "beverages",
            image: "coffee"
        },
        {
            id: 7,
            name: "Tea",
            description: "Traditional Indian tea with milk and spices",
            price: 15,
            category: "beverages",
            image: "tea"
        },
        {
            id: 8,
            name: "Cold Drink",
            description: "Assorted soft drinks and juices",
            price: 30,
            category: "beverages",
            image: "cold-drink"
        }
    ],
    // Demo data for statistics
    stats: {
        todayOrders: 47,
        yesterdayOrders: 42,
        todayRevenue: 3845,
        yesterdayRevenue: 3560,
        pendingOrders: 12,
        activeUsers: 143
    },
    feedback: []
};

// DOM Elements
const pages = document.querySelectorAll('.page');
const navLinks = document.querySelectorAll('.nav-link');
const loginCards = document.querySelectorAll('.login-card');
const categoryBtns = document.querySelectorAll('.category-btn');
const menuItemsContainer = document.getElementById('menu-items-container');
const orderItemsContainer = document.getElementById('order-items');
const orderTotalElement = document.getElementById('order-total');
const placeOrderBtn = document.getElementById('place-order-btn');
const emptyCartMessage = document.getElementById('empty-cart-message');
const userAvatar = document.getElementById('user-avatar');
const userName = document.getElementById('user-name');
const userBalance = document.getElementById('user-balance');
const adminNav = document.getElementById('admin-nav');
const notification = document.getElementById('notification');
const adminOrderList = document.getElementById('admin-order-list');
const tablesGrid = document.getElementById('tables-grid');
const adminMenuItems = document.getElementById('admin-menu-items');

// Camera Elements
const cameraVideo = document.getElementById('camera-video');
const cameraCanvas = document.getElementById('camera-canvas');
const cameraPreview = document.getElementById('camera-preview');
const startCameraBtn = document.getElementById('start-camera');
const stopCameraBtn = document.getElementById('stop-camera');
const qrResult = document.getElementById('qr-result');

const hostelCameraVideo = document.getElementById('hostel-camera-video');
const hostelCameraCanvas = document.getElementById('hostel-camera-canvas');
const hostelCameraPreview = document.getElementById('hostel-camera-preview');
const startHostelCameraBtn = document.getElementById('start-hostel-camera');
const stopHostelCameraBtn = document.getElementById('stop-hostel-camera');
const hostelScanResult = document.getElementById('hostel-scan-result');

// Statistics Elements
const todayOrders = document.getElementById('today-orders');
const ordersChange = document.getElementById('orders-change');
const todayRevenue = document.getElementById('today-revenue');
const revenueChange = document.getElementById('revenue-change');
const pendingOrders = document.getElementById('pending-orders');
const activeUsers = document.getElementById('active-users');

// Initialize the application
function init() {
    setupEventListeners();
    renderMenuItems();
    updateCartDisplay();
    renderAdminOrders();
    renderTables();
    updateAdminStats();
    renderAdminMenuItems();
    
    // Add footer navigation
    document.querySelectorAll('.footer-nav').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            document.querySelector(`[data-page="${pageId}"]`).classList.add('active');
        });
    });
}

// Set up event listeners
function setupEventListeners() {
    // Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            showPage(pageId);
            
            // Update active nav link
            navLinks.forEach(nav => nav.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Login cards
    loginCards.forEach(card => {
        card.addEventListener('click', () => {
            const userType = card.getAttribute('data-type');
            showLoginForm(userType);
        });
    });

    // Back buttons
    document.getElementById('back-from-student').addEventListener('click', () => showPage('home'));
    document.getElementById('back-from-faculty').addEventListener('click', () => showPage('home'));
    document.getElementById('back-from-hostel').addEventListener('click', () => showPage('home'));
    document.getElementById('back-from-admin').addEventListener('click', () => showPage('home'));
    document.getElementById('back-from-camera').addEventListener('click', () => showPage('home'));
    document.getElementById('back-from-qr').addEventListener('click', () => showPage('home'));
    document.getElementById('back-from-feedback').addEventListener('click', () => showPage('home'));
    document.getElementById('back-from-menu-management').addEventListener('click', () => showPage('admin'));

    // QR Scanner
    document.getElementById('scan-qr-btn').addEventListener('click', () => showPage('qr-scanner'));

    // Login forms
    document.getElementById('student-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        loginUser('student', document.getElementById('student-id').value);
    });
    
    document.getElementById('faculty-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        loginUser('faculty', document.getElementById('faculty-id').value);
    });
    
    document.getElementById('hostel-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        loginUser('hostel', document.getElementById('hostel-id').value);
    });
    
    document.getElementById('admin-login-form').addEventListener('submit', (e) => {
        e.preventDefault();
        loginUser('admin', document.getElementById('admin-name').value);
    });

    // Category filters
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const category = btn.getAttribute('data-category');
            
            // Update active category button
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Filter menu items
            renderMenuItems(category);
        });
    });

    // Camera actions
    startCameraBtn.addEventListener('click', startQRScanner);
    stopCameraBtn.addEventListener('click', stopQRScanner);
    
    startHostelCameraBtn.addEventListener('click', startHostelScanner);
    stopHostelCameraBtn.addEventListener('click', stopHostelScanner);
    
    document.getElementById('skip-scanning').addEventListener('click', () => showPage('menu'));

    // Order actions
    placeOrderBtn.addEventListener('click', placeOrder);

    // Logout buttons
    document.getElementById('logout-btn').addEventListener('click', logout);
    document.getElementById('logout-from-orders').addEventListener('click', logout);
    document.getElementById('logout-from-admin').addEventListener('click', logout);

    // Admin actions
    document.getElementById('manage-menu-btn').addEventListener('click', () => {
        showPage('menu-management');
    });
    document.getElementById('view-feedback-btn').addEventListener('click', () => {
        showNotification('Feedback management feature would open here', 'info');
    });
    document.getElementById('view-reports-btn').addEventListener('click', () => {
        showNotification('Reports feature would open here', 'info');
    });
    document.getElementById('system-settings-btn').addEventListener('click', () => {
        showNotification('System settings feature would open here', 'info');
    });

    // Feedback form
    document.getElementById('feedback-form').addEventListener('submit', (e) => {
        e.preventDefault();
        submitFeedback();
    });

    // Rating stars
    document.querySelectorAll('.rating-star').forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.getAttribute('data-rating'));
            setRating(rating);
        });
    });

    // Menu management form
    document.getElementById('add-menu-item-form').addEventListener('submit', (e) => {
        e.preventDefault();
        addMenuItem();
    });
}

// Show specific page
function showPage(pageId) {
    pages.forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
    
    // Stop any active cameras when leaving pages
    if (pageId !== 'qr-scanner' && pageId !== 'camera-page') {
        stopQRScanner();
        stopHostelScanner();
    }
    
    // Update admin stats when showing admin page
    if (pageId === 'admin') {
        updateAdminStats();
    }
}

// Show login form based on user type
function showLoginForm(userType) {
    showPage(`${userType}-login`);
}

// Login user
function loginUser(userType, userId) {
    // In a real application, this would validate against a server
    state.currentUser = {
        type: userType,
        id: userId,
        name: `${userType.charAt(0).toUpperCase() + userType.slice(1)} User`,
        balance: userType === 'hostel' ? 0 : 500 // Hostel students get free thali
    };

    // Update UI
    userAvatar.textContent = state.currentUser.name.split(' ').map(n => n[0]).join('');
    userName.textContent = state.currentUser.name;
    userBalance.textContent = `Balance: ₹${state.currentUser.balance}`;
    
    // Show admin nav if admin
    if (userType === 'admin') {
        adminNav.style.display = 'block';
    }

    // Show notification
    showNotification(`Welcome, ${state.currentUser.name}!`, 'success');

    // Redirect based on user type
    if (userType === 'hostel') {
        showPage('camera-page');
    } else {
        showPage('menu');
    }
}

// Logout user
function logout() {
    state.currentUser = null;
    state.cart = [];
    
    // Reset UI
    userAvatar.textContent = 'GU';
    userName.textContent = 'Guest User';
    adminNav.style.display = 'none';
    
    // Show notification
    showNotification('You have been logged out successfully', 'info');
    
    // Redirect to home
    showPage('home');
    
    // Update navigation
    navLinks.forEach(nav => nav.classList.remove('active'));
    document.querySelector('[data-page="home"]').classList.add('active');
    
    // Update cart display
    updateCartDisplay();
}

// Start QR Scanner
function startQRScanner() {
    startCameraBtn.style.display = 'none';
    stopCameraBtn.style.display = 'inline-block';
    cameraPreview.style.display = 'none';
    cameraVideo.style.display = 'block';
    qrResult.textContent = '';

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            cameraVideo.srcObject = stream;
            cameraVideo.play();
            requestAnimationFrame(scanQRCode);
        })
        .catch(err => {
            console.error('Error accessing camera:', err);
            showNotification('Error accessing camera. Please ensure you have granted camera permissions.', 'error');
            stopQRScanner();
        });
}

// Stop QR Scanner
function stopQRScanner() {
    startCameraBtn.style.display = 'inline-block';
    stopCameraBtn.style.display = 'none';
    cameraPreview.style.display = 'flex';
    cameraVideo.style.display = 'none';

    if (cameraVideo.srcObject) {
        cameraVideo.srcObject.getTracks().forEach(track => track.stop());
        cameraVideo.srcObject = null;
    }
}

// Scan QR Code
function scanQRCode() {
    if (cameraVideo.readyState === cameraVideo.HAVE_ENOUGH_DATA) {
        cameraCanvas.height = cameraVideo.videoHeight;
        cameraCanvas.width = cameraVideo.videoWidth;
        const context = cameraCanvas.getContext('2d');
        context.drawImage(cameraVideo, 0, 0, cameraCanvas.width, cameraCanvas.height);
        
        const imageData = context.getImageData(0, 0, cameraCanvas.width, cameraCanvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
            qrResult.textContent = `QR Code detected: ${code.data}`;
            qrResult.style.color = 'var(--success)';
            
            showNotification('QR Code scanned successfully! Redirecting to menu...', 'success');
            
            setTimeout(() => {
                showPage('menu');
                stopQRScanner();
            }, 1500);
        }
    }
    
    if (cameraVideo.style.display === 'block') {
        requestAnimationFrame(scanQRCode);
    }
}

// Start Hostel Scanner
function startHostelScanner() {
    startHostelCameraBtn.style.display = 'none';
    stopHostelCameraBtn.style.display = 'inline-block';
    hostelCameraPreview.style.display = 'none';
    hostelCameraVideo.style.display = 'block';
    hostelScanResult.textContent = '';

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
        .then(stream => {
            hostelCameraVideo.srcObject = stream;
            hostelCameraVideo.play();
            requestAnimationFrame(scanHostelID);
        })
        .catch(err => {
            console.error('Error accessing camera:', err);
            showNotification('Error accessing camera. Please ensure you have granted camera permissions.', 'error');
            stopHostelScanner();
        });
}

// Stop Hostel Scanner
function stopHostelScanner() {
    startHostelCameraBtn.style.display = 'inline-block';
    stopHostelCameraBtn.style.display = 'none';
    hostelCameraPreview.style.display = 'flex';
    hostelCameraVideo.style.display = 'none';

    if (hostelCameraVideo.srcObject) {
        hostelCameraVideo.srcObject.getTracks().forEach(track => track.stop());
        hostelCameraVideo.srcObject = null;
    }
}

// Scan Hostel ID
function scanHostelID() {
    if (hostelCameraVideo.readyState === hostelCameraVideo.HAVE_ENOUGH_DATA) {
        hostelCameraCanvas.height = hostelCameraVideo.videoHeight;
        hostelCameraCanvas.width = hostelCameraVideo.videoWidth;
        const context = hostelCameraCanvas.getContext('2d');
        context.drawImage(hostelCameraVideo, 0, 0, hostelCameraCanvas.width, hostelCameraCanvas.height);
        
        // Simulate barcode scanning
        // In a real application, you would use a barcode scanning library here
        
        // For demo purposes, we'll just simulate a successful scan after a few seconds
        if (Math.random() < 0.05) { // 5% chance per frame to "detect" a barcode
            hostelScanResult.textContent = 'Hostel ID verified successfully!';
            hostelScanResult.style.color = 'var(--success)';
            
            showNotification('Hostel ID scanned successfully! You can now order your free thali.', 'success');
            
            setTimeout(() => {
                showPage('menu');
                stopHostelScanner();
            }, 1500);
        }
    }
    
    if (hostelCameraVideo.style.display === 'block') {
        requestAnimationFrame(scanHostelID);
    }
}

// Render menu items
function renderMenuItems(category = 'all') {
    menuItemsContainer.innerHTML = '';
    
    const filteredItems = category === 'all' 
        ? state.menuItems 
        : state.menuItems.filter(item => item.category === category);
    
    if (filteredItems.length === 0) {
        menuItemsContainer.innerHTML = '<p>No items found in this category.</p>';
        return;
    }
    
    filteredItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'menu-item';
        menuItemElement.innerHTML = `
            <div class="menu-item-img">
                <i class="fas fa-utensils"></i>
            </div>
            <div class="menu-item-content">
                <h3 class="menu-item-title">${item.name}</h3>
                <p class="menu-item-desc">${item.description}</p>
                <div class="menu-item-price">₹${item.price}</div>
                <div class="menu-item-actions">
                    <button class="btn btn-primary add-to-cart" data-id="${item.id}">Add to Cart</button>
                </div>
            </div>
        `;
        
        menuItemsContainer.appendChild(menuItemElement);
    });
    
    // Add event listeners to Add to Cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            addToCart(itemId);
        });
    });
}

// Add item to cart
function addToCart(itemId) {
    if (!state.currentUser) {
        showNotification('Please login first to add items to cart', 'error');
        showPage('home');
        return;
    }
    
    const item = state.menuItems.find(i => i.id === itemId);
    const existingItem = state.cart.find(i => i.id === itemId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        state.cart.push({
            ...item,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    showNotification(`${item.name} added to cart`, 'success');
}

// Update cart display
function updateCartDisplay() {
    orderItemsContainer.innerHTML = '';
    
    if (state.cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        placeOrderBtn.disabled = true;
        orderTotalElement.textContent = '₹0';
        return;
    }
    
    emptyCartMessage.style.display = 'none';
    placeOrderBtn.disabled = false;
    
    let total = 0;
    
    state.cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const orderItemElement = document.createElement('div');
        orderItemElement.className = 'order-item';
        orderItemElement.innerHTML = `
            <div class="order-item-info">
                <div class="order-item-name">${item.name}</div>
                <div class="order-item-price">₹${item.price} each</div>
            </div>
            <div class="order-item-quantity">
                <button class="quantity-btn decrease-quantity" data-id="${item.id}">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn increase-quantity" data-id="${item.id}">+</button>
            </div>
        `;
        
        orderItemsContainer.appendChild(orderItemElement);
    });
    
    orderTotalElement.textContent = `₹${total}`;
    
    // Add event listeners to quantity buttons
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(itemId, -1);
        });
    });
    
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            updateQuantity(itemId, 1);
        });
    });
}

// Update item quantity in cart
function updateQuantity(itemId, change) {
    const item = state.cart.find(i => i.id === itemId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            state.cart = state.cart.filter(i => i.id !== itemId);
        }
        
        updateCartDisplay();
    }
}

// Place order
function placeOrder() {
    if (state.cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Calculate total
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Check if user has sufficient balance (for non-hostel students)
    if (state.currentUser.type !== 'hostel' && state.currentUser.balance < total) {
        showNotification('Insufficient balance. Please recharge your account.', 'error');
        return;
    }
    
    // Create order
    const order = {
        id: state.orders.length + 1,
        items: [...state.cart],
        total: total,
        status: 'pending',
        timestamp: new Date().toLocaleString(),
        user: state.currentUser
    };
    
    state.orders.push(order);
    
    // Also add to admin orders for demo purposes
    state.adminOrders.push({
        ...order,
        table: Math.floor(Math.random() * 10) + 1
    });
    
    // For hostel students, check if they're ordering free thali
    if (state.currentUser.type === 'hostel') {
        const hasFreeThali = state.cart.some(item => 
            item.name === 'Regular Thali' || 
            item.name === 'Satvik Thali' || 
            item.name === 'Jain Thali'
        );
        
        if (hasFreeThali) {
            showNotification('Your free thali order has been placed! Order #' + order.id, 'success');
        } else {
            showNotification('Order placed successfully! Order #' + order.id, 'success');
        }
    } else {
        // Deduct amount from balance
        state.currentUser.balance -= total;
        userBalance.textContent = `Balance: ₹${state.currentUser.balance}`;
        showNotification('Order placed successfully! Order #' + order.id, 'success');
    }
    
    // Update admin stats
    updateAdminStats();
    
    // Reset cart
    state.cart = [];
    updateCartDisplay();
    
    // Show orders page
    showPage('orders');
    renderUserOrders();
}

// Render user orders
function renderUserOrders() {
    const userOrdersContainer = document.getElementById('user-orders');
    userOrdersContainer.innerHTML = '';
    
    if (state.orders.length === 0) {
        userOrdersContainer.innerHTML = '<p>No orders yet. Place an order from the menu.</p>';
        return;
    }
    
    state.orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-card';
        orderElement.innerHTML = `
            <div class="order-header">
                <span class="order-number">Order #${order.id}</span>
                <span class="order-status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
            <div class="order-details">
                <p>${order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}</p>
                <p>Total: ₹${order.total} | ${order.timestamp}</p>
            </div>
        `;
        
        userOrdersContainer.appendChild(orderElement);
    });
}

// Render admin orders
function renderAdminOrders() {
    adminOrderList.innerHTML = '';
    
    if (state.adminOrders.length === 0) {
        adminOrderList.innerHTML = '<p>No orders to display</p>';
        return;
    }
    
    state.adminOrders.forEach(order => {
        const orderCard = document.createElement('div');
        orderCard.className = `order-card ${order.status}`;
        orderCard.innerHTML = `
            <div class="order-header">
                <span class="order-number">Order #${order.id}</span>
                <span class="order-status status-${order.status}">${order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
            </div>
            <div class="order-details">
                <p>${order.items.map(item => `${item.name} x ${item.quantity}`).join(', ')}</p>
                <p>${order.user.type.charAt(0).toUpperCase() + order.user.type.slice(1)}: ${order.user.id} | ${order.table ? `Table: ${order.table}` : 'Takeaway'}</p>
                <p>Total: ₹${order.total} | ${order.timestamp}</p>
            </div>
            <div class="order-actions">
                ${order.status === 'pending' ? '<button class="btn btn-info btn-sm update-order" data-id="' + order.id + '" data-status="preparing">Mark Preparing</button>' : ''}
                ${order.status === 'preparing' ? '<button class="btn btn-success btn-sm update-order" data-id="' + order.id + '" data-status="ready">Mark Ready</button>' : ''}
                ${order.status === 'ready' ? '<button class="btn btn-success btn-sm update-order" data-id="' + order.id + '" data-status="completed">Mark Completed</button>' : ''}
                ${order.status !== 'completed' ? '<button class="btn btn-danger btn-sm cancel-order" data-id="' + order.id + '">Cancel</button>' : ''}
            </div>
        `;
        
        adminOrderList.appendChild(orderCard);
    });
    
    // Add event listeners to order action buttons
    document.querySelectorAll('.update-order').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = parseInt(e.target.getAttribute('data-id'));
            const newStatus = e.target.getAttribute('data-status');
            updateOrderStatus(orderId, newStatus);
        });
    });
    
    document.querySelectorAll('.cancel-order').forEach(button => {
        button.addEventListener('click', (e) => {
            const orderId = parseInt(e.target.getAttribute('data-id'));
            cancelOrder(orderId);
        });
    });
}

// Update order status
function updateOrderStatus(orderId, newStatus) {
    const order = state.adminOrders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        renderAdminOrders();
        updateAdminStats();
        showNotification(`Order #${orderId} status updated to ${newStatus}`, 'success');
    }
}

// Cancel order
function cancelOrder(orderId) {
    state.adminOrders = state.adminOrders.filter(o => o.id !== orderId);
    renderAdminOrders();
    updateAdminStats();
    showNotification(`Order #${orderId} has been cancelled`, 'success');
}

// Render tables
function renderTables() {
    tablesGrid.innerHTML = '';
    
    state.tables.forEach(table => {
        const tableCard = document.createElement('div');
        tableCard.className = `table-card ${table.status === 'occupied' ? 'active' : ''}`;
        tableCard.innerHTML = `
            <div class="table-number">${table.number}</div>
            <div class="table-status status-${table.status}">${table.status.charAt(0).toUpperCase() + table.status.slice(1)}</div>
        `;
        
        // Add click event to toggle table status
        tableCard.addEventListener('click', () => {
            table.status = table.status === 'available' ? 'occupied' : 'available';
            renderTables();
            showNotification(`Table ${table.number} status updated to ${table.status}`, 'info');
        });
        
        tablesGrid.appendChild(tableCard);
    });
}

// Update admin statistics
function updateAdminStats() {
    // Calculate stats from orders
    const pendingCount = state.adminOrders.filter(o => o.status === 'pending').length;
    const todayOrdersCount = state.adminOrders.length;
    const todayRevenueTotal = state.adminOrders.reduce((sum, order) => sum + order.total, 0);
    
    // Update DOM elements
    todayOrders.textContent = todayOrdersCount;
    todayRevenue.textContent = `₹${todayRevenueTotal}`;
    pendingOrders.textContent = pendingCount;
    activeUsers.textContent = state.stats.activeUsers;
    
    // Calculate percentage changes (for demo, using static data)
    const ordersPercentChange = Math.round(((state.stats.todayOrders - state.stats.yesterdayOrders) / state.stats.yesterdayOrders) * 100);
    const revenuePercentChange = Math.round(((state.stats.todayRevenue - state.stats.yesterdayRevenue) / state.stats.yesterdayRevenue) * 100);
    
    ordersChange.textContent = `${ordersPercentChange >= 0 ? '+' : ''}${ordersPercentChange}% from yesterday`;
    revenueChange.textContent = `${revenuePercentChange >= 0 ? '+' : ''}${revenuePercentChange}% from yesterday`;
    
    // Color code the percentage changes
    ordersChange.style.color = ordersPercentChange >= 0 ? 'var(--success)' : 'var(--danger)';
    revenueChange.style.color = revenuePercentChange >= 0 ? 'var(--success)' : 'var(--danger)';
}

// Render admin menu items
function renderAdminMenuItems() {
    adminMenuItems.innerHTML = '';
    
    if (state.menuItems.length === 0) {
        adminMenuItems.innerHTML = '<p>No menu items found.</p>';
        return;
    }
    
    state.menuItems.forEach(item => {
        const menuItemElement = document.createElement('div');
        menuItemElement.className = 'admin-menu-item';
        menuItemElement.innerHTML = `
            <div class="admin-menu-item-header">
                <div class="admin-menu-item-name">${item.name}</div>
                <div class="admin-menu-item-price">₹${item.price}</div>
            </div>
            <div class="admin-menu-item-desc">${item.description}</div>
            <div class="admin-menu-item-category">${item.category.charAt(0).toUpperCase() + item.category.slice(1)}</div>
            <div class="admin-menu-item-actions">
                <button class="btn btn-warning btn-sm edit-menu-item" data-id="${item.id}">Edit</button>
                <button class="btn btn-danger btn-sm delete-menu-item" data-id="${item.id}">Delete</button>
            </div>
        `;
        
        adminMenuItems.appendChild(menuItemElement);
    });
    
    // Add event listeners to menu item buttons
    document.querySelectorAll('.edit-menu-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            editMenuItem(itemId);
        });
    });
    
    document.querySelectorAll('.delete-menu-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const itemId = parseInt(e.target.getAttribute('data-id'));
            deleteMenuItem(itemId);
        });
    });
}

// Add menu item
function addMenuItem() {
    const name = document.getElementById('item-name').value;
    const description = document.getElementById('item-description').value;
    const price = parseInt(document.getElementById('item-price').value);
    const category = document.getElementById('item-category').value;
    
    const newItem = {
        id: state.menuItems.length + 1,
        name,
        description,
        price,
        category,
        image: 'default'
    };
    
    state.menuItems.push(newItem);
    
    // Reset form
    document.getElementById('add-menu-item-form').reset();
    
    // Update displays
    renderAdminMenuItems();
    renderMenuItems();
    
    showNotification(`"${name}" added to menu successfully`, 'success');
}

// Edit menu item
function editMenuItem(itemId) {
    const item = state.menuItems.find(i => i.id === itemId);
    if (item) {
        // In a real application, you would open a modal or form to edit the item
        // For this demo, we'll just simulate editing with a prompt
        const newName = prompt("Enter new name:", item.name);
        if (newName) {
            const newPrice = prompt("Enter new price:", item.price);
            if (newPrice) {
                item.name = newName;
                item.price = parseInt(newPrice);
                
                // Update displays
                renderAdminMenuItems();
                renderMenuItems();
                
                showNotification(`"${item.name}" updated successfully`, 'success');
            }
        }
    }
}

// Delete menu item
function deleteMenuItem(itemId) {
    const item = state.menuItems.find(i => i.id === itemId);
    if (item) {
        if (confirm(`Are you sure you want to delete "${item.name}"?`)) {
            state.menuItems = state.menuItems.filter(i => i.id !== itemId);
            renderAdminMenuItems();
            renderMenuItems();
            showNotification(`"${item.name}" removed from menu`, 'success');
        }
    }
}

// Set rating stars
function setRating(rating) {
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
}

// Submit feedback
function submitFeedback() {
    const type = document.getElementById('feedback-type').value;
    const message = document.getElementById('feedback-message').value;
    const rating = document.querySelectorAll('.rating-star.active').length;
    
    if (!type || !message) {
        showNotification('Please fill all required fields', 'error');
        return;
    }
    
    const feedback = {
        id: state.feedback.length + 1,
        type,
        message,
        rating,
        timestamp: new Date().toLocaleString(),
        user: state.currentUser ? state.currentUser.name : 'Anonymous'
    };
    
    state.feedback.push(feedback);
    
    // Reset form
    document.getElementById('feedback-form').reset();
    setRating(0);
    
    showNotification('Thank you for your feedback!', 'success');
    
    // Redirect to home
    setTimeout(() => {
        showPage('home');
    }, 1500);
}

// Show notification
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const icon = notification.querySelector('.notification-icon i');
    const title = notification.querySelector('.notification-title');
    const messageEl = notification.querySelector('.notification-message');
    
    // Set content and type
    messageEl.textContent = message;
    notification.className = `notification ${type}`;
    
    // Set icon based on type
    if (type === 'success') {
        icon.className = 'fas fa-check-circle';
        title.textContent = 'Success';
    } else if (type === 'error') {
        icon.className = 'fas fa-exclamation-circle';
        title.textContent = 'Error';
    } else if (type === 'warning') {
        icon.className = 'fas fa-exclamation-triangle';
        title.textContent = 'Warning';
    } else {
        icon.className = 'fas fa-info-circle';
        title.textContent = 'Info';
    }
    
    // Show notification
    notification.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', init);