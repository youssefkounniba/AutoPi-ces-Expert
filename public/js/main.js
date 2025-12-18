// ===== Login Modal =====
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const modalClose = document.getElementById('modal-close');
const magicLinkForm = document.getElementById('magic-link-form');

if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
}

if (modalClose) {
    modalClose.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });
}

if (magicLinkForm) {
    magicLinkForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const messageDiv = document.getElementById('login-message');
        const submitBtn = magicLinkForm.querySelector('button[type="submit"]');
        
        messageDiv.style.display = 'none';
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        try {
            const response = await fetch('/auth/magic-link', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            
            messageDiv.style.display = 'block';
            messageDiv.className = 'alert ' + (data.success ? 'alert-success' : 'alert-error');
            messageDiv.textContent = data.message;
            
            if (data.success) {
                magicLinkForm.reset();
                setTimeout(() => {
                    loginModal.classList.remove('active');
                }, 2000);
            }
        } catch (error) {
            messageDiv.style.display = 'block';
            messageDiv.className = 'alert alert-error';
            messageDiv.textContent = 'Erreur lors de l\'envoi. Veuillez réessayer.';
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Envoyer le lien de connexion';
        }
    });
}

// Close modal when clicking outside
if (loginModal) {
    loginModal.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });
}

// ===== Logout =====
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        try {
            const response = await fetch('/auth/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            const data = await response.json();
            if (data.success) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    });
}

// ===== Chatbot =====
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotWindow = document.getElementById('chatbot-window');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            chatbotInput.focus();
        }
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
}

function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'chatbot-message ' + (isUser ? 'user' : 'bot');
    messageDiv.innerHTML = `<p>${text}</p>`;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

async function sendChatbotMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    chatbotSend.disabled = true;
    chatbotSend.textContent = 'Envoi...';
    
    try {
        const response = await fetch('/chatbot/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        
        if (data.success) {
            addMessage(data.response, false);
        } else {
            addMessage('Désolé, une erreur s\'est produite. Veuillez réessayer.', false);
        }
    } catch (error) {
        console.error('Chatbot error:', error);
        addMessage('Erreur de connexion. Veuillez réessayer plus tard.', false);
    } finally {
        chatbotSend.disabled = false;
        chatbotSend.textContent = 'Envoyer';
    }
}

if (chatbotSend) {
    chatbotSend.addEventListener('click', sendChatbotMessage);
}

if (chatbotInput) {
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendChatbotMessage();
        }
    });
}

// ===== Order Button =====
const orderBtn = document.getElementById('order-btn');
if (orderBtn) {
    orderBtn.addEventListener('click', () => {
        // Check if user is authenticated
        fetch('/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.user) {
                    // User is logged in, proceed with order
                    alert('Fonctionnalité de commande à implémenter. Vous êtes connecté !');
                } else {
                    // User not logged in, show login modal
                    if (loginModal) {
                        loginModal.classList.add('active');
                    }
                }
            })
            .catch(error => {
                console.error('Error checking auth:', error);
            });
    });
}

// ===== Add to Cart Buttons =====
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const productId = this.getAttribute('data-product-id');
        
        // Check if user is authenticated
        fetch('/auth/me')
            .then(res => res.json())
            .then(data => {
                if (data.success && data.user) {
                    // User is logged in, proceed with order
                    alert('Produit ajouté à la commande ! (Fonctionnalité à implémenter)');
                    this.textContent = 'Ajouté ✓';
                    this.disabled = true;
                    setTimeout(() => {
                        this.textContent = 'Commander';
                        this.disabled = false;
                    }, 2000);
                } else {
                    // User not logged in, show login modal
                    if (loginModal) {
                        loginModal.classList.add('active');
                    }
                }
            })
            .catch(error => {
                console.error('Error checking auth:', error);
            });
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Intersection Observer for Animations =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Animate elements on scroll
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.product-card, .service-card, .about-text, .about-image');
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ===== Add Ripple Effect to Buttons =====
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

