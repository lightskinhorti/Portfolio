// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return; // skip placeholder links
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -80px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            setTimeout(() => {
                entry.target.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 80);
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .timeline-item, .skill-card, .contact-card, .education-card').forEach(el => {
    observer.observe(el);
});

// Parallax for hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 1.2;
    }
});

// Active nav highlight
window.addEventListener('scroll', () => {
    let current = '';
    document.querySelectorAll('section[id]').forEach(section => {
        if (pageYOffset >= section.offsetTop - 200) {
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

// Hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Project Modal
const projectModal = {
    init() {
        this.modal = document.getElementById('project-modal');
        this.modalBody = document.getElementById('modal-body');
        this.closeBtn = document.querySelector('.close-modal');
        this.bindEvents();
    },

    bindEvents() {
        document.querySelectorAll('.view-details').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const card = e.target.closest('.project-card');
                this.openModal(card.dataset.project);
            });
        });

        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) this.closeModal();
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
        });
    },

    openModal(projectType) {
        const content = this.getProjectContent(projectType);
        if (!content) return;
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
            tfm: {
                tag: "TFM — Máster IA & Big Data",
                title: "Mantenimiento Predictivo — NASA CMAPSS",
                subtitle: "Pipeline ML end-to-end para predicción de vida útil residual (RUL) en motores turbofan sobre el benchmark aeroespacial NASA CMAPSS.",
                description: "Proyecto fin de máster que cubre el ciclo completo de un sistema ML en producción: desde la ingesta y exploración distribuida del dataset NASA CMAPSS con PySpark, hasta el despliegue de una API de inferencia con FastAPI y una interfaz interactiva con Streamlit. Incluye experiment tracking con MLflow para comparar modelos (XGBoost, Random Forest, regresión) y containerización completa con Docker.",
                features: [
                    "EDA distribuido sobre dataset CMAPSS con PySpark (4 subsets, +20 000 ciclos de motor)",
                    "Benchmark de modelos supervisados: XGBoost, Random Forest, Ridge Regression",
                    "Experiment tracking y registro de modelos con MLflow",
                    "API de inferencia REST desplegada con FastAPI",
                    "Dashboard interactivo de predicción con Streamlit",
                    "Pipeline containerizado end-to-end con Docker Compose"
                ],
                tech: ["Python", "PySpark", "Scikit-learn", "XGBoost", "MLflow", "FastAPI", "Streamlit", "Docker"],
                responsibilities: [
                    "Diseño del pipeline distribuido de ingesta y preprocesamiento",
                    "Feature engineering sobre señales de sensor (rolling stats, lag features)",
                    "Entrenamiento, evaluación y selección de modelos con MLflow",
                    "Desarrollo de la API de inferencia y la UI de Streamlit",
                    "Documentación técnica y análisis de resultados"
                ],
                // TODO: add real repo URL
                codeLink: "#"
            },

            investment: {
                tag: "Full-Stack · ML · Cloud",
                title: "Investment Tracker",
                subtitle: "Aplicación full-stack de seguimiento de inversiones con predicción ML integrada. Desarrollada con Claude Code (~40% reducción del ciclo de entrega).",
                description: "Plataforma web completa para el tracking de carteras de inversión que integra un módulo de predicción ML de precios (Scikit-learn + Prophet). El backend con FastAPI y JWT gestiona la lógica de negocio y expone los endpoints de predicción; el frontend en React/TypeScript consume la API y muestra visualizaciones en tiempo real. Desplegada en AWS con base de datos PostgreSQL. Desarrollada con Claude Code como copiloto, acelerando el ciclo de entrega en ~40% frente al flujo tradicional.",
                features: [
                    "Dashboard de cartera con rendimiento histórico y métricas clave",
                    "Predicción de precios de activos con Scikit-learn y Prophet",
                    "Autenticación JWT con sistema de usuarios multi-perfil",
                    "API REST documentada con FastAPI y OpenAPI",
                    "Despliegue en AWS (EC2 / RDS PostgreSQL) con Docker",
                    "Ciclo de desarrollo acelerado ~40% con Claude Code como copiloto"
                ],
                tech: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Scikit-learn", "Prophet", "Docker", "AWS", "JWT"],
                responsibilities: [
                    "Arquitectura de la aplicación y diseño de la API",
                    "Desarrollo del modelo de predicción y su integración con el backend",
                    "Implementación del frontend en React/TypeScript",
                    "Configuración del entorno AWS y pipeline de despliegue",
                    "Gestión del ciclo de desarrollo con Claude Code"
                ],
                // TODO: add real repo URL
                codeLink: "#"
            },

            bigdata: {
                tag: "Big Data · Arquitecturas Distribuidas",
                title: "Pipeline Big Data & ML",
                subtitle: "Pipelines ETL distribuidos con PySpark y Hadoop, con modelos ML aplicados sobre datos en escala.",
                description: "Proyecto de arquitectura de datos a gran escala que implementa pipelines ETL distribuidos con PySpark sobre HDFS. Incluye optimización avanzada (particionado, broadcast joins, persistencia y tuning de rendimiento), procesamiento batch y streaming, y la aplicación de algoritmos ML (K-Means, árboles de decisión, regresión) sobre datasets reales con calidad de datos validada.",
                features: [
                    "Pipelines ETL distribuidos con PySpark sobre HDFS (Hadoop)",
                    "Optimización avanzada: particionado, broadcast joins, persistencia y tuning de rendimiento",
                    "K-Means clustering sobre datos de gran volumen",
                    "Árboles de decisión y regresión con Spark MLlib",
                    "Arquitectura Lambda (batch + speed layer) con validación de calidad de datos",
                    "Arquitectura Kappa con procesamiento unificado en streaming"
                ],
                tech: ["PySpark", "Apache Spark", "Hadoop", "HDFS", "Spark MLlib", "Python"],
                responsibilities: [
                    "Diseño e implementación de los pipelines ETL distribuidos",
                    "Configuración del cluster Hadoop y entorno Spark",
                    "Implementación de modelos ML con Spark MLlib",
                    "Comparativa de arquitecturas Lambda vs. Kappa",
                    "Optimización de rendimiento en procesamiento distribuido"
                ],
                // TODO: add real repo URL
                codeLink: "#"
            },

            expense: {
                tag: "Full-Stack · SaaS",
                title: "Expense Tracker VTC",
                subtitle: "Web app de gestión de gastos para una empresa de transporte real (VTC). En producción con usuarios reales.",
                description: "Aplicación web desarrollada como solución real para una empresa de transporte privado. Permite registrar, categorizar y visualizar gastos operativos. El backend FastAPI conecta con Supabase (PostgreSQL gestionado + autenticación), el frontend React se despliega automáticamente en Vercel. La app está en uso por los conductores de la empresa.",
                features: [
                    "Registro y categorización de gastos por tipo y vehículo",
                    "Dashboard de resumen mensual con visualizaciones",
                    "Autenticación de usuarios con Supabase Auth",
                    "Base de datos PostgreSQL gestionada en Supabase",
                    "Despliegue continuo con Vercel (CI/CD automático)",
                    "App en producción con usuarios reales"
                ],
                tech: ["FastAPI", "React", "Supabase", "PostgreSQL", "Vercel", "JavaScript"],
                responsibilities: [
                    "Análisis de requisitos con el cliente real",
                    "Desarrollo del backend FastAPI y diseño del schema",
                    "Implementación del frontend React con Supabase Auth",
                    "Configuración del despliegue continuo en Vercel",
                    "Mantenimiento y soporte post-lanzamiento"
                ],
                // TODO: add real repo URL
                codeLink: "#"
            },

            nlp: {
                tag: "NLP · Representaciones Vectoriales",
                title: "Sistema NLP — Búsqueda Semántica en Español",
                subtitle: "Sistema de recuperación semántica sobre corpus en español con comparativa de embeddings BERT vs. GloVe.",
                description: "Proyecto de procesamiento del lenguaje natural que construye un sistema de búsqueda semántica sobre un corpus en español. Compara representaciones vectoriales de BERT (contextualizadas) frente a GloVe (estáticas), aplica reducción dimensional con PCA y t-SNE para análisis exploratorio, e implementa un pipeline completo de preprocesamiento, indexación y recuperación de documentos.",
                features: [
                    "Pipeline de preprocesamiento NLP para corpus en español",
                    "Embeddings contextualizados con BERT (HuggingFace Transformers)",
                    "Embeddings estáticos con GloVe para corpus en español",
                    "Reducción dimensional con PCA y t-SNE para visualización",
                    "Evaluación de relevancia con métricas de recuperación (Precision@k, MRR)",
                    "Comparativa cuantitativa BERT vs. GloVe en tareas de similitud semántica"
                ],
                tech: ["Python", "BERT", "GloVe", "Transformers", "PCA", "t-SNE", "HuggingFace", "NumPy"],
                responsibilities: [
                    "Diseño del pipeline de preprocesamiento para español",
                    "Fine-tuning de embeddings y construcción del índice semántico",
                    "Análisis exploratorio con PCA y t-SNE",
                    "Evaluación cuantitativa de ambos sistemas de embedding",
                    "Documentación de resultados y conclusiones"
                ],
                // TODO: add real repo URL
                codeLink: "#"
            }
        };

        const project = projects[projectType];
        if (!project) return null;

        const githubBtn = project.codeLink !== '#'
            ? `<a href="${project.codeLink}" class="btn btn-primary" target="_blank">Ver Código en GitHub</a>`
            : `<a href="https://github.com/lightskinhorti" class="btn btn-secondary" target="_blank">Ver GitHub</a>`;

        return `
            <div class="modal-body">
                <div class="modal-header">
                    <span class="modal-tag">${project.tag}</span>
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-subtitle">${project.subtitle}</p>
                </div>

                <div class="modal-grid">
                    <div class="modal-features">
                        <h4>Descripción</h4>
                        <p>${project.description}</p>
                        <h4>Características</h4>
                        <ul>
                            ${project.features.map(f => `<li>${f}</li>`).join('')}
                        </ul>
                    </div>

                    <div class="modal-sidebar">
                        <div class="tech-stack">
                            <h4>Stack Tecnológico</h4>
                            <div class="tech-badges-container">
                                ${project.tech.map(t => `<span class="tech-badge">${t}</span>`).join('')}
                            </div>
                        </div>
                        <div class="responsibilities">
                            <h4>Responsabilidades</h4>
                            <ul>
                                ${project.responsibilities.map(r => `<li>${r}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="modal-links">
                    ${githubBtn}
                </div>
            </div>
        `;
    }
};

document.addEventListener('DOMContentLoaded', () => {
    projectModal.init();
});
