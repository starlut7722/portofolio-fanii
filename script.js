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

// Particles Background
const canvas = document.getElementById('particles-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function createParticles() {
    const count = Math.min(window.innerWidth / 10, 100);
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 2,
            speedX: (Math.random() - 0.5) * 0.5,
            speedY: (Math.random() - 0.5) * 0.5,
            color: `rgba(255, 79, 216, ${Math.random() * 0.5})`
        });
    }
}

function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });
    requestAnimationFrame(animateParticles);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    particles = [];
    createParticles();
});

resizeCanvas();
createParticles();
animateParticles();

// Scroll Progress
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    document.querySelector('.progress-bar').style.width = scrolled + '%';
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Hamburger Menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

if (hamburger && navMenu) {
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
}

// Typing Animation
const words = ['Developer', 'Designer', 'Creator'];
let i = 0, j = 0, isDeleting = false;
const textEl = document.querySelector('.typing-text');

function type() {
    if (!textEl) return;
    const current = words[i];
    textEl.textContent = isDeleting ? current.substring(0, j - 1) : current.substring(0, j + 1);
    isDeleting ? j-- : j++;
    
    if (!isDeleting && j === current.length) {
        isDeleting = true;
        setTimeout(type, 2000);
    } else if (isDeleting && j === 0) {
        isDeleting = false;
        i = (i + 1) % words.length;
        setTimeout(type, 500);
    } else {
        setTimeout(type, 100);
    }
}

setTimeout(type, 500);

// Skill Bar Animation
const skillBars = document.querySelectorAll('.skill-progress');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const width = entry.target.getAttribute('data-width');
            entry.target.style.width = width + '%';
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

skillBars.forEach(bar => observer.observe(bar));

// Skills Data
const skills = [
    {
        category: "Design",
        items: [
            { name: "Adobe Photoshop", percent: 95 },
            { name: "Adobe Illustrator", percent: 90 },
            { name: "Figma", percent: 88 }
        ]
    },
    {
        category: "Motion",
        items: [
            { name: "After Effects", percent: 85 },
            { name: "Premiere Pro", percent: 82 },
            { name: "Blender", percent: 75 }
        ]
    },
    {
        category: "Tools",
        items: [
            { name: "Procreate", percent: 90 },
            { name: "Lightroom", percent: 85 },
            { name: "CapCut", percent: 88 }
        ]
    }
];

function loadSkills() {
    const container = document.getElementById('skillsGrid');
    if (!container) return;
    container.innerHTML = '';
    
    skills.forEach(skillCat => {
        const card = document.createElement('div');
        card.className = 'skill-category glass-card';
        card.innerHTML = `<h3><i class="fas fa-palette"></i> ${skillCat.category}</h3>`;
        
        skillCat.items.forEach(item => {
            card.innerHTML += `
                <div class="skill-item">
                    <div class="skill-info">
                        <span>${item.name}</span>
                        <span>${item.percent}%</span>
                    </div>
                    <div class="skill-bar">
                        <div class="skill-progress" data-width="${item.percent}"></div>
                    </div>
                </div>
            `;
        });
        container.appendChild(card);
    });
}

loadSkills();

// ==================== PROYEK (GANTI FOTO & DRIVE DI SINI) ====================
const projects = [
    {
        title: 'Poster Event',
        desc: 'Desain poster untuk acara tahunan sekolah',
        tech: ['Photoshop', 'Illustrator'],
        image: 'https://via.placeholder.com/400x200/FF4FD8/FFFFFF?text=Poster+Event',
        drive: 'https://drive.google.com/drive/folders/xxxx1'
    },
    {
        title: 'Branding UMKM',
        desc: 'Desain logo & identity untuk bisnis lokal',
        tech: ['Illustrator', 'Figma'],
        image: 'https://via.placeholder.com/400x200/FF00AA/FFFFFF?text=Branding',
        drive: 'https://drive.google.com/drive/folders/xxxx2'
    },
    {
        title: 'Motion Intro',
        desc: 'Animasi opening untuk YouTube channel',
        tech: ['After Effects', 'Premiere'],
        image: 'https://via.placeholder.com/400x200/FF4FD8/FFFFFF?text=Motion+Intro',
        drive: 'https://drive.google.com/drive/folders/xxxx3'
    },
    {
        title: 'UI/UX App',
        desc: 'Desain interface aplikasi mobile',
        tech: ['Figma', 'Prototype'],
        image: 'https://via.placeholder.com/400x200/FF00AA/FFFFFF?text=UI+UX',
        drive: 'https://drive.google.com/drive/folders/xxxx4'
    },
    {
        title: 'Ilustrasi Karakter',
        desc: 'Desain karakter untuk game',
        tech: ['Procreate', 'Photoshop'],
        image: 'https://via.placeholder.com/400x200/FF4FD8/FFFFFF?text=Ilustrasi',
        drive: 'https://drive.google.com/drive/folders/xxxx5'
    }
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
            <div class="project-image">
                <img src="${p.image}" alt="${p.title}">
            </div>
            <div class="project-info">
                <h3 class="project-title">${p.title}</h3>
                <p class="project-desc">${p.desc}</p>
                <div class="project-tech">
                    ${p.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

loadProjects();

// Experience Data
const experiences = [
    {
        date: "2023 - Present",
        title: "UI/UX Designer",
        company: "Creative Studio",
        desc: "Mendesain antarmuka pengguna untuk berbagai aplikasi dan website.",
        tech: ["Figma", "Adobe XD", "Prototype"]
    },
    {
        date: "2021 - 2023",
        title: "Graphic Designer",
        company: "Digital Agency",
        desc: "Membuat desain branding, sosial media, dan materi promosi.",
        tech: ["Photoshop", "Illustrator", "Lightroom"]
    },
    {
        date: "2019 - 2021",
        title: "Freelance Designer",
        company: "Self Employed",
        desc: "Mengerjakan berbagai proyek desain untuk klien dari berbagai bidang.",
        tech: ["Procreate", "After Effects", "Premiere"]
    }
];

function loadExperience() {
    const container = document.getElementById('timeline');
    if (!container) return;
    container.innerHTML = '';
    
    experiences.forEach(exp => {
        const item = document.createElement('div');
        item.className = 'timeline-item';
        item.innerHTML = `
            <div class="timeline-dot"></div>
            <div class="timeline-content glass-card">
                <span class="timeline-date">${exp.date}</span>
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p>${exp.desc}</p>
                <div class="timeline-tech">
                    ${exp.tech.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `;
        container.appendChild(item);
    });
}

loadExperience();

// Contact Form
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('✨ Pesan terkirim! Terima kasih sudah menghubungi ✨');
        contactForm.reset();
    });
}

// Active Menu on Scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
        document.body.style.overflow = '';
    });
});
