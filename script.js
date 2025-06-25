// script.js - Efeitos JavaScript para o portfólio

document.addEventListener('DOMContentLoaded', function() {
    
    // Efeito de digitação para o nome
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        element.style.borderRight = '3px solid #007bff';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            } else {
                // Remove o cursor após terminar de digitar
                setTimeout(() => {
                    element.style.borderRight = 'none';
                }, 1000);
            }
        }
        type();
    }

    // Animação de entrada das seções
    function animateOnScroll() {
        const sections = document.querySelectorAll('.slide-in');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animationDelay = '0.2s';
                    entry.target.classList.add('animate');
                }
            });
        }, {
            threshold: 0.1
        });

        sections.forEach(section => {
            observer.observe(section);
        });
    }

    // Efeito parallax suave no scroll
    function parallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.container');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }

    // Efeito de hover nas seções com partículas
    function addParticleEffect() {
        const sections = document.querySelectorAll('section');
        
        sections.forEach(section => {
            section.addEventListener('mouseenter', function() {
                createParticles(this);
            });
        });
    }

    function createParticles(element) {
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #007bff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                animation: particleFloat 2s ease-out forwards;
            `;
            
            const rect = element.getBoundingClientRect();
            particle.style.left = Math.random() * rect.width + 'px';
            particle.style.top = Math.random() * rect.height + 'px';
            
            element.style.position = 'relative';
            element.appendChild(particle);
            
            setTimeout(() => {
                if (particle.parentNode) {
                    particle.parentNode.removeChild(particle);
                }
            }, 2000);
        }
    }

    // Smooth scroll para navegação
    function smoothScroll() {
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }

    // Efeito de loading da página
    function pageLoadEffect() {
        const container = document.querySelector('.container');
        container.style.opacity = '0';
        container.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            container.style.transition = 'all 1s ease-out';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
        }, 100);
    }

    // Efeito de cursor personalizado
    function customCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(0, 123, 255, 0.3);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);

        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
        });

        // Efeito especial em elementos interativos
        const interactiveElements = document.querySelectorAll('a, button, .profile-image');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'rgba(0, 123, 255, 0.6)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'rgba(0, 123, 255, 0.3)';
            });
        });
    }

    // Contador animado para anos de experiência
    function animateCounter() {
        const aboutText = document.querySelector('section p');
        if (aboutText && aboutText.textContent.includes('20 anos')) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateNumber(20, 2000);
                        observer.unobserve(entry.target);
                    }
                });
            });
            observer.observe(aboutText);
        }
    }

    function animateNumber(target, duration) {
        const aboutText = document.querySelector('section p');
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateNumber() {
            start += increment;
            if (start < target) {
                const currentText = aboutText.textContent.replace(/\d+(?=\s+anos)/, Math.floor(start));
                aboutText.textContent = currentText;
                requestAnimationFrame(updateNumber);
            } else {
                const finalText = aboutText.textContent.replace(/\d+(?=\s+anos)/, target);
                aboutText.textContent = finalText;
            }
        }
        updateNumber();
    }

    // Adicionar estilos CSS para animações via JavaScript
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes particleFloat {
                0% {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-50px) scale(0);
                }
            }
            
            .slide-in.animate {
                animation-delay: 0.2s;
            }
            
            .custom-cursor {
                display: none;
            }
            
            @media (min-width: 768px) {
                .custom-cursor {
                    display: block;
                }
                
                body {
                    cursor: none;
                }
            }
            
            .section-hover-effect {
                position: relative;
                overflow: hidden;
            }
            
            .section-hover-effect::after {
                content: '';
                position: absolute;
                top: 0;
                left: -100%;
                width: 100%;
                height: 100%;
                background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
                transition: left 0.6s;
            }
            
            .section-hover-effect:hover::after {
                left: 100%;
            }
        `;
        document.head.appendChild(style);
    }

    // Inicializar todos os efeitos
    function init() {
        addDynamicStyles();
        pageLoadEffect();
        
        // Aguardar um pouco antes de iniciar a animação de digitação
        setTimeout(() => {
            const nameElement = document.querySelector('.typing-animation');
            if (nameElement) {
                typeWriter(nameElement, 'Márcio Silva', 150);
            }
        }, 1000);
        
        animateOnScroll();
        addParticleEffect();
        smoothScroll();
        customCursor();
        animateCounter();
        
        // Adicionar classe de efeito hover às seções
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            section.classList.add('section-hover-effect');
        });
    }

    // Inicializar quando a página carregar
    init();
    
    // Efeito de fade out/in ao navegar
    window.addEventListener('beforeunload', function() {
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease-out';
    });
});

// Função para detectar dispositivos móveis
function isMobile() {
    return window.innerWidth <= 768;
}

// Ajustar efeitos para dispositivos móveis
if (isMobile()) {
    // Desabilitar alguns efeitos pesados em dispositivos móveis
    document.addEventListener('DOMContentLoaded', function() {
        const style = document.createElement('style');
        style.textContent = `
            .custom-cursor {
                display: none !important;
            }
            
            body {
                cursor: auto !important;
            }
            
            .container {
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
    });
}

