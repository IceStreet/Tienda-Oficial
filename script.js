document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. LÓGICA GENERAL DE LA TIENDA
    // ==========================================

    // --- MENÚ HAMBURGUESA (MÓVIL) ---
    const menuToggle = document.getElementById('mobile-menu');
    const navList = document.getElementById('nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', () => {
            navList.classList.toggle('active');
        });
    }

    // --- BOTONES DE COMPRA A WHATSAPP ---
    const whatsappNumber = "529993580530"; 
    const buyButtons = document.querySelectorAll('.add-to-cart');
    
    buyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.getAttribute('data-product');
            const productPrice = this.getAttribute('data-price');
            
            const message = `¡Hola! Estoy interesado en comprar el siguiente producto:%0A%0A*Producto:* ${productName}%0A*Precio:* $${productPrice} MXN%0A%0APor favor, necesito información sobre disponibilidad, tallas y formas de pago.`;
            const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            window.open(whatsappURL, '_blank');
        });
    });

    // --- FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.");
            contactForm.reset(); 
        });
    }

    // --- ANIMACIÓN AL HACER SCROLL ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        observer.observe(product);
    });

    // ==========================================
    // 2. LÓGICA DEL MAPA (CLICK -> GOOGLE MAPS)
    // ==========================================
    
    const mapContainer = document.getElementById('map');

    if (mapContainer) {
        
        // 1. DATOS
        const lat = 21.282036;
        const lng = -89.673325;
        const ubicacionSucursal = [lat, lng]; 

        const imagenCamisa = 'https://cdn-icons-png.flaticon.com/512/2589/2589175.png';
        const imagenPin = 'https://cdn-icons-png.flaticon.com/512/3345/3345369.png';

        // 2. INICIALIZAR EL MAPA
        var map = L.map('map', {
            center: ubicacionSucursal,
            zoom: 18,               
            zoomControl: false,     
            dragging: false,        
            touchZoom: false,       
            scrollWheelZoom: false, 
            doubleClickZoom: false, 
            boxZoom: false,        
            keyboard: false,
            tap: false // Importante para gestionar bien el click en móviles modernos
        });

        // 3. CAPA VISUAL
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; ICE STREET',
            maxZoom: 20
        }).addTo(map);

        // 4. ELEMENTOS VISUALES (PIN + CAMISA)
        
        // Pin en el suelo
        var iconoPin = L.icon({
            iconUrl: imagenPin,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        L.marker(ubicacionSucursal, {icon: iconoPin, interactive: false}).addTo(map); // interactive:false para que el click pase al mapa

        // Camisa flotante
        var iconoCamisa = L.icon({
            iconUrl: imagenCamisa,
            iconSize: [65, 65],     
            iconAnchor: [32.5, 100], 
            className: 'camisa-flotante' 
        });
        L.marker(ubicacionSucursal, {icon: iconoCamisa, interactive: false, zIndexOffset: 1000}).addTo(map);

        // 5. EVENTO DE CLIC (LA MAGIA)
        // Al hacer clic en CUALQUIER PARTE del mapa, te lleva a Google Maps
        map.on('click', function() {
            // Generamos el link de "Cómo llegar" con tus coordenadas exactas
            const googleMapsUrl = `https://maps.app.goo.gl/xw7RWBvqhTXiop8d6`;
            
            // Abrir en nueva pestaña
            window.open(googleMapsUrl, '_blank');
        });
    }
});