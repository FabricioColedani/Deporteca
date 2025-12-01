// Función para acordeones antiguos (mantener compatibilidad)
function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Cerrar todos los acordeones
    document.querySelectorAll('.accordion-content').forEach(item => {
        item.classList.remove('active');
    });
    
    // Abrir el seleccionado si no estaba activo
    if (!isActive) {
        content.classList.add('active');
    }
}

// Función para los reglamentos del deporte (nueva versión)
function toggleRegulation(header) {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Toggle del ícono de flecha
    header.classList.toggle('open');
    
    // Toggle del contenido
    if (isActive) {
        content.classList.remove('active');
    } else {
        content.classList.add('active');
    }
}

// Slider de noticias
let currentSlide = 0;
const slides = [
    {
        title: 'CAVANI HACE UN GOL',
        team: 'BOCA JUNIORS',
        league: 'FUTBOL ARGENTINO',
        number: '10'
    },
    {
        title: 'MESSI REGRESA A ARGENTINA',
        team: 'SELECCIÓN ARGENTINA',
        league: 'FUTBOL INTERNACIONAL',
        number: '10'
    },
    {
        title: 'NUEVA TEMPORADA DE LA LIGA',
        team: 'LIGA PROFESIONAL',
        league: 'FUTBOL ARGENTINO',
        number: '24'
    }
];

function updateSlide() {
    const newsCard = document.querySelector('.news-card');
    if (!newsCard) return;
    
    const slide = slides[currentSlide];
    newsCard.querySelector('.news-title').textContent = slide.title;
    newsCard.querySelector('.news-team').textContent = slide.team;
    newsCard.querySelector('.news-league').textContent = slide.league;
    newsCard.querySelector('.news-image').textContent = slide.number;
}

// Event listeners para el slider
document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.querySelector('.slider-nav.next');
    const prevBtn = document.querySelector('.slider-nav.prev');
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlide();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlide();
        });
    }
});