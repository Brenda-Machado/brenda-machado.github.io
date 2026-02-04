// Particles
(function createNebulaParticles() {
    const nebula = document.getElementById('nebula');
    if (!nebula) return;

    const total = 80;
    for (let i = 0; i < total; i++) {
        const p = document.createElement('div');
        const colorClass = Math.random() < 0.6 ? 'blue' : 'purple';
        const useCurved = Math.random() < 0.50; 
        p.className = 'particle ' + colorClass + (useCurved ? ' curved' : '');

        const size = (Math.random() * 6 + 2).toFixed(2) + 'px'; 
        p.style.setProperty('--size', size);
        p.style.left = (Math.random() * 100).toFixed(2) + 'vw';
        p.style.top = (Math.random() * 100).toFixed(2) + 'vh';

        const duration = (Math.random() * 12 + 8).toFixed(2) + 's'; 
        const delay = (-Math.random() * 10).toFixed(2) + 's'; 
        p.style.setProperty('--anim-duration', duration);
        p.style.setProperty('--anim-delay', delay);

        nebula.appendChild(p);
    }
})();

// Language switching functionality
let currentLang = 'pt';

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update button states
    document.getElementById('pt-btn').classList.toggle('active', lang === 'pt');
    document.getElementById('en-btn').classList.toggle('active', lang === 'en');
    
    // Update mobile button states
    const ptBtnMobile = document.getElementById('pt-btn-mobile');
    const enBtnMobile = document.getElementById('en-btn-mobile');
    if (ptBtnMobile && enBtnMobile) {
        ptBtnMobile.classList.toggle('active', lang === 'pt');
        enBtnMobile.classList.toggle('active', lang === 'en');
    }
    
    // Hide all content
    document.querySelectorAll('.lang-content').forEach(el => {
        el.classList.remove('active');
    });
    
    // Show selected language content
    if (lang === 'pt') {
        document.getElementById('pt-content').classList.add('active');
        document.getElementById('about-pt').classList.add('active');
        document.getElementById('research-pt').classList.add('active');
        document.getElementById('papers-pt').classList.add('active');
        document.getElementById('projects-pt').classList.add('active');
        document.getElementById('contact-pt').classList.add('active');
        document.getElementById('footer-text-pt').style.display = 'block';
        document.getElementById('footer-text-en').style.display = 'none';
        document.documentElement.lang = 'pt-BR';
    } else {
        document.getElementById('en-content').classList.add('active');
        document.getElementById('about-en').classList.add('active');
        document.getElementById('research-en').classList.add('active');
        document.getElementById('papers-en').classList.add('active');
        document.getElementById('projects-en').classList.add('active');
        document.getElementById('contact-en').classList.add('active');
        document.getElementById('footer-text-pt').style.display = 'none';
        document.getElementById('footer-text-en').style.display = 'block';
        document.documentElement.lang = 'en';
    }
    
    // Update navigation links
    document.querySelectorAll('.nav-links a, .mobile-nav-links a').forEach(link => {
        const text = lang === 'pt' ? link.getAttribute('data-pt') : link.getAttribute('data-en');
        if (text) {
            link.textContent = text;
        }
    });
}

// Mobile menu functions
function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    mobileNav.classList.add('active');
    mobileOverlay.classList.add('active');
}

function closeMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    const mobileOverlay = document.getElementById('mobileOverlay');
    
    mobileNav.classList.remove('active');
    mobileOverlay.classList.remove('active');
}

// Smooth scrolling for anchor links
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

// Advanced particle animation system
(function(){
    const container = document.getElementById('nebula');
    if (!container) return;
    
    const TOTAL = 40;
    const SPIRAL_FRACTION = 0.35;
    const BASE_SPEED = 0.02;
    const SPIRAL_TIGHTNESS = 0.12;
    const LIFE_TIME = 18000 + 8000;
    const rand = (a,b)=> a + Math.random()*(b-a);
    const particles = [];
    
    for (let i = 0; i < TOTAL; i++) {
        const el = document.createElement('div');
        el.className = 'particle ' + (Math.random() > 0.5 ? 'blue' : 'purple');
        
        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;
        const isSpiral = Math.random() < SPIRAL_FRACTION;
        const life = rand(0.9 * LIFE_TIME, 1.4 * LIFE_TIME);
        const startTime = performance.now() - Math.random() * life;
        const speed = rand(BASE_SPEED * 0.6, BASE_SPEED * 1.6);
        const angleOffset = Math.random() * Math.PI * 2;
        const direction = Math.random() < 0.5 ? 1 : -1;
        const size = rand(4, 8);
        
        el.style.width = size + 'px';
        el.style.height = size + 'px';
        el.style.left = '0px';
        el.style.top = '0px';
        el.style.opacity = (isSpiral ? 0.9 : 0.45) + Math.random() * 0.25 + 0.4;
        el.style.filter = 'drop-shadow(0 0 6px rgba(150,150,255,0.7))';
        
        const centerX = startX;
        const centerY = startY;
        const floatVy = rand(-0.02, -0.06);
        const floatVx = rand(-0.01, 0.01);
        
        const part = {
            el, isSpiral, startTime, life, speed, angleOffset, direction,
            centerX: startX,      
            centerY: startY,      
            floatVy, floatVx, size
        };
        
        container.appendChild(el);
        particles.push(part);
    }
    
    let last = performance.now();
    function animate(now) {
        const dt = now - last;
        last = now;
        
        for (const p of particles) {
            const t = now - p.startTime;
            if (t > p.life) resetParticle(p, now);
            
            if (p.isSpiral) {
                const tt = t * 0.0015;
                const r = 20 + tt * 0.5; 
                const theta = p.angleOffset + tt * 3.2 * p.direction;
                const x = p.centerX + r * Math.cos(theta);
                const y = p.centerY + r * Math.sin(theta) - tt * 0.05;
                
                p.el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
                p.el.style.opacity = 0.9 - (t / p.life) * 0.7 + 0.4;
                p.el.style.filter = 'drop-shadow(0 0 14px rgba(180,160,255,1))';
            } else {
                p.centerX += p.floatVx * dt;
                p.centerY += p.floatVy * dt;
                p.el.style.transform = `translate3d(${p.centerX}px, ${p.centerY}px, 0)`;
                p.el.style.opacity = 0.45 - (t / p.life) * 0.4 + 0.2;
                p.el.style.filter = 'drop-shadow(0 0 10px rgba(100,150,255,0.6))';
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    function resetParticle(p, now) {
        p.startTime = now - Math.random() * 3000;
        p.life = rand(0.9 * LIFE_TIME, 1.4 * LIFE_TIME);
        p.speed = rand(BASE_SPEED * 0.6, BASE_SPEED * 1.6);
        p.angleOffset = Math.random() * Math.PI * 2;
        p.direction = Math.random() < 0.5 ? 1 : -1;
        p.size = rand(4,8);
        p.el.style.width = p.size + 'px';
        p.el.style.height = p.size + 'px';
        p.el.style.opacity = (p.isSpiral ? 1 : 0.5) + Math.random() * 0.2 + 0.4;
        p.el.style.filter = 'drop-shadow(0 0 10px rgba(140,130,255,0.9))';
        
        p.centerX = Math.random() * window.innerWidth;
        p.centerY = Math.random() * window.innerHeight;
        p.floatVy = rand(-0.02, -0.06);
        p.floatVx = rand(-0.01, 0.01);
    }
    
    window.addEventListener('resize', () => {
        for (const p of particles) {
            p.centerX = Math.min(window.innerWidth-10, Math.max(10, p.centerX));
            p.centerY = Math.min(window.innerHeight-10, Math.max(10, p.centerY));
        }
    });
    
    requestAnimationFrame(animate);
})();