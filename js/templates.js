// templates.js - Componentes reutilizables Header y Footer

// Determinar la ruta base según la ubicación del archivo
function getBasePath() {
    const path = window.location.pathname;
    return path.includes('/pages/') ? '../' : '';
}

// Template del Header
function loadHeader() {
    const basePath = getBasePath();
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    const headerHTML = `
        <header>
            <nav>
                <a href="${basePath}index.html" class="logo">
                    <img src="${basePath}/assets/images/logo.png" alt="DEPORTECA Logo" class="logo-img" style="height:60px; vertical-align:middle;">
                </a>
                <ul>
                    <li><a href="${basePath}index.html" class="${currentPage === 'index.html' || currentPage === '' ? 'active' : ''}">HOME</a></li>
                    <li><a href="${basePath}index.html#about">ABOUT US</a></li>
                    <li><a href="${basePath}index.html#noticias">NOTICIAS</a></li>
                    <li><a href="${basePath}pages/deportes.html" class="${currentPage.includes('deportes') || currentPage.includes('populares') || currentPage.includes('basquet') ? 'active' : ''}">DEPORTES</a></li>
                </ul>
            </nav>
        </header>
    `;
    
    document.getElementById('header-placeholder').innerHTML = headerHTML;
}

// Template del Footer
function loadFooter() {
    const footerHTML = `
        <footer>
            <p>© 2025 Escuela PRO La Falda - Deporteca</p>
        </footer>
    `;
    
    document.getElementById('footer-placeholder').innerHTML = footerHTML;
}

// Cargar templates cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    loadHeader();
    loadFooter();
    
    // Scroll suave para los enlaces de anclaje
    document.addEventListener('click', function(e) {
        const target = e.target;
        if (target.tagName === 'A' && target.getAttribute('href') && target.getAttribute('href').includes('#')) {
            const href = target.getAttribute('href');
            
            // Si es un enlace a una sección en la misma página
            if (href.startsWith('#')) {
                e.preventDefault();
                const sectionId = href.substring(1);
                const section = document.getElementById(sectionId);
                if (section) {
                    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
            // Si es un enlace a index.html con hash
            else if (href.includes('index.html#')) {
                // Permitir la navegación normal, el navegador manejará el scroll
            }
        }
    });
});