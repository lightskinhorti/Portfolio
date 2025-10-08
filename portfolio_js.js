// Smooth scrolling
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

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.project-card, .timeline-item, .skill-card, .contact-card').forEach(el => {
    observer.observe(el);
});

// Parallax effect for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// Active nav link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
        link.style.color = '#94a3b8';
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#06b6d4';
        }
    });
});
// Project Modal Functionality
const projectModal = {
    init() {
        this.modal = document.getElementById('project-modal');
        this.modalBody = document.getElementById('modal-body');
        this.closeBtn = document.querySelector('.close-modal');
        
        this.bindEvents();
    },
    
    bindEvents() {
        // Open modal when clicking project links
        document.querySelectorAll('.view-details').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const projectCard = e.target.closest('.project-card');
                const projectType = projectCard.dataset.project;
                this.openModal(projectType);
            });
        });
        
        // Close modal events
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        
        // Close with Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    },
    
    openModal(projectType) {
        const content = this.getProjectContent(projectType);
        this.modalBody.innerHTML = content;
        this.modal.classList.add('show');
        document.body.style.overflow = 'hidden';
    },
    
    closeModal() {
        this.modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    },
    
    getProjectContent(projectType) {
        const projects = {
            erp: {
                tag: "TFG - Trabajo Fin de Grado",
                title: "Sistema ERP Empresarial",
                subtitle: "Desarrollo completo de un sistema de planificación de recursos empresariales (ERP) integral para optimizar procesos empresariales.",
                description: "Este proyecto representa mi Trabajo de Fin de Grado, donde diseñé e implementé un sistema ERP completo que centraliza y automatiza las operaciones empresariales críticas. La solución abarca múltiples módulos integrados que funcionan en armonía para proporcionar una plataforma unificada de gestión empresarial.",
                features: [
                    "Gestión integral de inventarios en tiempo real",
                    "Módulo de facturación y contabilidad automatizada",
                    "Sistema de gestión de recursos humanos",
                    "Panel de control ejecutivo con métricas clave",
                    "Generación de reportes personalizados",
                    "Sistema de roles y permisos granular"
                ],
                tech: ["Java", "Spring Boot", "PostgreSQL", "React", "Docker", "REST APIs", "JWT", "Maven"],
                responsibilities: [
                    "Arquitectura y diseño del sistema completo",
                    "Desarrollo backend con Spring Boot",
                    "Implementación de la base de datos PostgreSQL",
                    "Creación del frontend con React",
                    "Dockerización y despliegue",
                    "Documentación técnica y de usuario"
                ],
                demoLink: "#",
                codeLink: "#"
            }
            // Puedes agregar más proyectos aquí siguiendo la misma estructura
        };
        
        const project = projects[projectType];
        
        return `
            <div class="modal-header">
                <span class="modal-tag">${project.tag}</span>
                <h2 class="modal-title">${project.title}</h2>
                <p class="modal-subtitle">${project.subtitle}</p>
            </div>
            
            <div class="modal-grid">
                <div class="modal-features">
                    <h4>Descripción del Proyecto</h4>
                    <p>${project.description}</p>
                    
                    <h4>Características Principales</h4>
                    <ul>
                        ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="modal-sidebar">
                    <div class="tech-stack">
                        <h4>Tecnologías Utilizadas</h4>
                        <div>
                            ${project.tech.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
                        </div>
                    </div>
                    
                    <div class="responsibilities">
                        <h4>Mis Responsabilidades</h4>
                        <ul>
                            ${project.responsibilities.map(resp => `<li>${resp}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="modal-links">
                <a href="${project.demoLink}" class="btn btn-primary" target="_blank">Ver Demo</a>
                <a href="${project.codeLink}" class="btn btn-secondary" target="_blank">Código Fuente</a>
            </div>
        `;
    }
};

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    projectModal.init();
});