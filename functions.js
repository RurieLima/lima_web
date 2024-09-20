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

// funcao para validaçao do formulario

document.getElementById('contactForm').addEventListener('submit', function(event) {
    let isValid = true;

    // Limpar mensagens de erro anteriores
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('msgError').textContent = '';

    // Validar Nome (deve ser preenchido e conter pelo menos 3 caracteres)
    const nameInput = document.getElementById('userName').value.trim();
    if (nameInput === '' || nameInput.length < 3) {
        document.getElementById('nameError').textContent = 'Por favor, insira um nome válido (mínimo de 3 caracteres).';
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    }

    // Validar Email (formato válido de email)
    const emailInput = document.getElementById('userEmail').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput)) {
        document.getElementById('emailError').textContent = 'Por favor, insira um email válido.';
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }

    // Validar Telefone (opcional, mas se preenchido, verificar se é numérico e contém entre 9 e 15 dígitos)
    const phoneInput = document.getElementById('userPhone').value.trim();
    const phoneRegex = /^[0-9]{9,15}$/;
    if (phoneInput !== '' && !phoneRegex.test(phoneInput)) {
        document.getElementById('phoneError').textContent = 'Por favor, insira um telefone válido (somente números, entre 9 e 15 dígitos).';
        document.getElementById('phoneError').style.display = 'block';
        isValid = false;
    }

    // Validar Mensagem (opcional, mas se preenchido, deve conter pelo menos 10 caracteres)
    const msgInput = document.getElementById('userMsg').value.trim();
    if (msgInput !== '' && msgInput.length < 10) {
        document.getElementById('msgError').textContent = 'A mensagem deve conter pelo menos 10 caracteres.';
        document.getElementById('msgError').style.display = 'block';
        isValid = false;
    }

    // Impedir envio do formulário se houver erros
    if (!isValid) {
        event.preventDefault();
    } else {
        // Exibir mensagem de sucesso
        document.getElementById('successMessage').style.display = 'block';
        
        // Limpar o formulário após exibir a mensagem de sucesso
        event.preventDefault();  // Impede o envio do formulário para fins de demonstração
        document.getElementById('contactForm').reset();
        
        // Ocultar a mensagem de sucesso após alguns segundos
        setTimeout(() => {
            document.getElementById('successMessage').style.display = 'none';
        }, 3000); // após 3 segundos
    }
});
