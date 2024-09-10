// Função para criar o efeito de spray no body
document.addEventListener('mousemove', function(e) {
    const wave = document.createElement('div');
    wave.className = 'wave';
    document.body.appendChild(wave);

    const x = e.clientX;
    const y = e.clientY;

    wave.style.left = `${x}px`;
    wave.style.top = `${y}px`;

    wave.addEventListener('animationend', () => {
        wave.remove(); // Remove o spray após a animação terminar
    });
});

// Função para criar o efeito de onda nas letras
function createLetterWaveEffect(element) {
    const text = element.innerText;
    element.innerHTML = '';

    // Dividir o texto em caracteres (incluindo espaços)
    text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        // Verificar se o caractere é um espaço
        if (char === ' ') {
            span.innerHTML = '&nbsp;'; // Utiliza espaço não quebrável para garantir que o espaço seja mantido
        } else {
            span.innerText = char;
            span.classList.add('letter-wave');
        }
        element.appendChild(span);

        // Adicionar um evento para o efeito de onda
        span.addEventListener('mouseover', () => {
            if (char !== ' ') {  // Não aplica o efeito de onda nos espaços
                span.classList.add('color-change');  // Adiciona a classe para mudança de cor
                span.style.transform = 'scale(1.5)';
                // Remover o efeito após a transição
                setTimeout(() => {
                    span.style.transform = 'scale(1)';
                    span.classList.remove('color-change');  // Remove a classe de cor
                }, 300);
            }
        });
    });
}

// Aplicar o efeito a todos os h1, h2 e h3
document.querySelectorAll('h1, h2, h3').forEach(createLetterWaveEffect);

// Função para criar o efeito nas imagens
function createWaveEffect(element) {
    element.style.display = 'inline-block';
    element.style.transition = 'transform 5s ease-out';

    // Adicionar um evento para o efeito 
    element.addEventListener('mouseover', () => {
        element.style.transform = 'rotateY(1080deg)';
        setTimeout(() => {
            element.style.transform = 'rotateY(720deg)';
        }, 2000);
    });
}

// Aplicar o efeito a todos as img, e i
document.querySelectorAll('img, i').forEach(createWaveEffect);

// Função para adicionar a classe 'visible' com um atraso para criar o efeito de cascata
function animateOnScroll(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.cardAnimation');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200); // Atraso de 200ms multiplicado pelo índice para o efeito de cascata
            });
            observer.unobserve(entry.target); // Parar de observar a seção após animar
        }
    });
}

// Configuração do IntersectionObserver
let observer = new IntersectionObserver(animateOnScroll, {
    threshold: 0.1 // Quando 10% da seção estiver visível
});

// Observar cada seção
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});


