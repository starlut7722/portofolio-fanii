// Loading Screen
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('fade-out'), 1500);
});

// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
if (window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
        cursorFollower.style.transform = `translate(${e.clientX - 15}px, ${e.clientY - 15}px)`;
    });
    document.addEventListener('mousedown', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    document.addEventListener('mouseup', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
    });
}

// Particles
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];
function resizeCanvas() { canvas.width = innerWidth; canvas.height = innerHeight; }
function createParticles() {
    for (let i = 0; i < Math.min(innerWidth / 10, 100); i++) {
        particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 2, speedX: (Math.random() - 0.5) * 0.5, speedY: (Math.random() - 0.5) * 0.5, color: `rgba(255, 79, 216, ${Math.random() * 0.5})` });
    }
}
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX; p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width; if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height; if (p.y > canvas.height) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2); ctx.fillStyle = p.color; ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}
window.addEventListener('resize', () => { resizeCanvas(); particles = []; createParticles(); });
resizeCanvas(); createParticles(); animateParticles();

// Scroll Progress
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    document.querySelector('.progress-bar').style.width = (winScroll / height) * 100 + '%';
});

// Navbar Scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
});

// Hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// Typing Animation
const words = ['Developer', 'Designer', 'Creator'];
let i = 0, j = 0, isDeleting = false;
const textEl = document.querySelector('.typing-text');
function type() {
    const current = words[i];
    textEl.textContent = isDeleting ? current.substring(0, j - 1) : current.substring(0, j + 1);
    isDeleting ? j-- : j++;
    if (!isDeleting && j === current.length) { isDeleting = true; setTimeout(type, 2000); }
    else if (isDeleting && j === 0) { isDeleting = false; i = (i + 1) % words.length; setTimeout(type, 500); }
    else setTimeout(type, 100);
}
setTimeout(type, 500);

// Skill data
const skills = [
    { category: "Frontend", items: [{ name: "React.js", percent: 95 }, { name: "Vue.js", percent: 88 }, { name: "Three.js", percent: 85 }] },
    { category: "Backend", items: [{ name: "Node.js", percent: 92 }, { name: "Python", percent: 87 }, { name: "GraphQL", percent: 82 }] },
    { category: "Tools", items: [{ name: "Figma", percent: 90 }, { name: "Docker", percent: 78 }, { name: "MongoDB", percent: 85 }] }
];
function loadSkills() {
    const container = document.getElementById('skillsGrid');
    if (!container) return;
    container.innerHTML = '';
    skills.forEach(skillCat => {
        const card = document.createElement('div'); card.className = 'skill-category glass-card';
        card.innerHTML = `<h3><i class="fas fa-code"></i> ${skillCat.category}</h3>`;
        skillCat.items.forEach(item => {
            card.innerHTML += `<div class="skill-item"><div class="skill-info"><span>${item.name}</span><span>${item.percent}%</span></div><div class="skill-bar"><div class="skill-progress" data-width="${item.percent}"></div></div></div>`;
        });
        container.appendChild(card);
    });
}
loadSkills();

// Projects DATA dengan LINK DRIVE (GANTI DRIVE LINK KAMU)
const projects = [
    { title: 'AI Assistant', desc: 'AI with voice recognition', tech: ['React', 'OpenAI'], image: 'https://i.postimg.cc/7Y9qjK8R/IMG-20250510-210656.jpg', drive: 'https://drive.google.com/drive/folders/xxxxx1' },
    { title: 'IoT Dashboard', desc: 'Real-time IoT monitoring', tech: ['Vue', 'D3'], image: 'https://i.postimg.cc/7Y9qjK8R/IMG-20250510-210656.jpg', drive: 'https://drive.google.com/drive/folders/xxxxx2' },
    { title: 'Cyberpunk E-Commerce', desc: 'Futuristic e-commerce', tech: ['Three.js', 'Next'], image: 'https://i.postimg.cc/7Y9qjK8R/IMG-20250510-210656.jpg', drive: 'https://drive.google.com/drive/folders/xxxxx3' },
    { title: 'Modern Portfolio', desc: 'Creative portfolio', tech: ['GSAP', 'WebGL'], image: 'https://i.postimg.cc/7Y9qjK8R/IMG-20250510-210656.jpg', drive: 'https://drive.google.com/drive/folders/xxxxx4' },
    { title: 'Chat App', desc: 'Real-time messaging', tech: ['Socket.io', 'Express'], image: 'https://i.postimg.cc/7Y9qjK8R/IMG-20250510-210656.jpg', drive: 'https://drive.google.com/drive/folders/xxxxx5' }
];

function loadProjects() {
    const container = document.getElementById('projectsGrid');
    if (!container) return;
    container.innerHTML = '';
    projects.forEach(p => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.style.cursor = 'pointer';
        card.onclick = () => window.open(p.drive, '_blank');
        card.innerHTML = `
            <div class="project-image"><img src="${p.image}" alt="${p.title}" style="width:100%; height:100%; object-fit:cover;"></div>
            <div class="project-info">
                <h3>${p.title}</h3>
                <p>${p.desc}</p>
                <div class="project-tech">${p.tech.map(t => `<span>${t}</span>`).join('')}</div>
            </div>
        `;
        container.appendChild(card);
    });
}
loadProjects();

// Experience
const experiences = [
    { date: "2023 - Now", title: "Senior Frontend Dev", company: "CyberTech", desc: "Leading futuristic web apps.", tech: ["React", "Three.js"] },
    { date: "2021 - 2023", title: "Full Stack Dev", company: "Neon Labs", desc: "Fullstack modern apps.", tech: ["Node.js", "Vue"] },
    { date: "2019 - 2021", title: "UI/UX Designer", company: "Digital Dreams", desc: "Designed futuristic interfaces.", tech: ["Figma", "Adobe XD"] }
];
function loadExperience() {
    const container = document.getElementById('timeline');
    if (!container) return;
    container.innerHTML = '';
    experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `<div class="timeline-dot"></div><div class="timeline-content glass-card"><span class="timeline-date">${exp.date}</span><h3>${exp.title}</h3><h4>${exp.company}</h4><p>${exp.desc}</p><div class="timeline-tech">${exp.tech.map(t => `<span>${t}</span>`).join('')}</div></div>`;
        container.appendChild(item);
    });
}
loadExperience();

// Contact Form
document.getElementById('contact-form')?.addEventListener('submit', (e) => { e.preventDefault(); alert('Message sent!'); e.target.reset(); });

// Active Menu
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => { if (scrollY >= section.offsetTop - 200) current = section.getAttribute('id'); });
    document.querySelectorAll('.nav-link').forEach(link => { link.classList.remove('active'); if (link.getAttribute('href') === `#${current}`) link.classList.add('active'); });
});
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) { e.preventDefault(); document.querySelector(this.getAttribute('href'))?.scrollIntoView({ behavior: 'smooth' }); });
});
