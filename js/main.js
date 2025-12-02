let currentNewsIndex = 0;
let newsData = [];

async function fetchSportsNews() {
    const newsSlider = document.querySelector('.news-slider');
    if (newsSlider) newsSlider.classList.add('loading');
    try {
        const apiKey = 'd31733cb8831b347978473465ca9e0f0';
        const url = `https://gnews.io/api/v4/top-headlines?category=sports&lang=es&country=ar&max=10&apikey=${apiKey}`;
        const response = await fetch(url);
        if (!response.ok) {
            console.error(`Error de la API: ${response.status} - ${response.statusText}`);
            const errorData = await response.json();
            console.error('Mensaje de error de la API:', errorData.errors);
            throw new Error('Fallo al obtener noticias de la API.');
        }
        const data = await response.json();
        if (data.articles && data.articles.length > 0) {
            newsData = data.articles.slice(0, 10).map(article => {
                const titleParts = article.title.split(' - ');
                const title = titleParts[0].trim().toUpperCase();
                const source = article.source.name ? article.source.name.toUpperCase() : 'FUENTE DESCONOCIDA';
                const numberMatch = title.match(/\d+/);
                const displayNumber = numberMatch ? numberMatch[0] : Math.floor(Math.random() * 99) + 1;
                return {
                    title: title.substring(0, 50),
                    team: source,
                    league: 'NOTICIAS DEPORTIVAS',
                    number: displayNumber.toString(),
                    url: article.url,
                    image: article.image,
                    publishedAt: new Date(article.publishedAt).toLocaleDateString('es-AR')
                };
            });
            updateNewsSlide();
            return true;
        } else {
            loadDefaultNews();
            return false;
        }
    } catch (error) {
        console.error('Error al cargar noticias:', error);
        loadDefaultNews();
        return false;
    } finally {
        if (newsSlider) newsSlider.classList.remove('loading');
    }
}

function updateNewsSlide() {
    const newsCard = document.querySelector('.news-card');
    const newsImageDiv = newsCard.querySelector('.news-image');
    if (!newsCard || newsData.length === 0) return;
    const news = newsData[currentNewsIndex];
    newsCard.style.opacity = '0';
    newsCard.style.transform = 'scale(0.95)';
    setTimeout(() => {
        newsCard.querySelector('.news-title').textContent = news.title;
        newsCard.querySelector('.news-team').textContent = news.team;
        newsCard.querySelector('.news-league').textContent = news.league;
        if (news.image) {
            newsImageDiv.style.backgroundImage = `url('${news.image}')`;
        } else {
            newsImageDiv.style.backgroundImage = 'none';
            newsImageDiv.style.backgroundColor = '#cccccc';
        }
        newsImageDiv.textContent = '';
        if (news.publishedAt) {
            newsCard.querySelector('.news-time').textContent = `📅 ${news.publishedAt}`;
        } else {
            newsCard.querySelector('.news-time').textContent = '📅 Sin fecha';
        }
        newsCard.style.opacity = '1';
        newsCard.style.transform = 'scale(1)';
    }, 200);
}

function nextNews() {
    currentNewsIndex = (currentNewsIndex + 1) % newsData.length;
    updateNewsSlide();
}

function prevNews() {
    currentNewsIndex = (currentNewsIndex - 1 + newsData.length) % newsData.length;
    updateNewsSlide();
}

let newsInterval;
function startNewsAutoplay() {
    newsInterval = setInterval(() => {
        nextNews();
    }, 8000);
}

function stopNewsAutoplay() {
    if (newsInterval) {
        clearInterval(newsInterval);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const nextBtn = document.querySelector('.slider-nav.next');
    const prevBtn = document.querySelector('.slider-nav.prev');
    const newsSlider = document.querySelector('.news-slider');
    if (nextBtn && prevBtn) {
        fetchSportsNews();
        if (newsSlider) {
            // Si quieres pausar alguna animación visual, puedes dejar estos eventos
            // newsSlider.addEventListener('mouseenter', stopNewsAutoplay);
            // newsSlider.addEventListener('mouseleave', startNewsAutoplay);
        }
        nextBtn.addEventListener('click', () => {
            nextNews();
        });
        prevBtn.addEventListener('click', () => {
            prevNews();
        });
    }
    setInterval(() => {
        fetchSportsNews();
    }, 600000);
});


function toggleAccordion(header) {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    document.querySelectorAll('.accordion-content').forEach(item => {
        item.classList.remove('active');
    });
    if (!isActive) {
        content.classList.add('active');
    }
}

function toggleRegulation(header) {
    const content = header.nextElementSibling;
    const isActive = content.classList.contains('active');
    header.classList.toggle('open');
    if (isActive) {
        content.classList.remove('active');
    } else {
        content.classList.add('active');
    }
}

function loadDefaultNews() {
    newsData = [{
        title: "¡NOVEDADES EN DEPORTECA!",
        team: "PROA LA FALDA",
        league: "BIENVENIDO",
        number: "🔥",
        url: "https://prensa.cba.gov.ar/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-05-at-18.22.40-1024x682.jpeg",
        image: "https://prensa.cba.gov.ar/wp-content/uploads/2025/09/WhatsApp-Image-2025-09-05-at-18.22.40-1024x682.jpeg",
        publishedAt: new Date().toLocaleDateString('es-AR')
    }];
    updateNewsSlide();
}
