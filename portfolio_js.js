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
                subtitle: "Pipeline ML end-to-end para predicción de vida útil residual (RUL) en motores turbofan sobre el benchmark aeroespacial NASA CMAPSS — estándar de referencia en la industria de mantenimiento predictivo.",
                description: `El dataset NASA CMAPSS (Commercial Modular Aero-Propulsion System Simulation) es el benchmark más utilizado en investigación de mantenimiento predictivo aeroespacial. Consta de 4 subsets (FD001–FD004) que simulan distintos modos de fallo y condiciones operativas, con más de 20 000 ciclos de motor registrados por 21 sensores cada uno. El objetivo es predecir el RUL (Remaining Useful Life) como un problema de regresión supervisada: dado el histórico de señales de un motor, estimar cuántos ciclos le quedan antes de fallo. <br><br>
El proyecto cubre el ciclo completo: desde la ingesta y EDA distribuido con PySpark, pasando por feature engineering avanzado, entrenamiento con experiment tracking en MLflow, hasta el despliegue de una API de inferencia en FastAPI y una UI interactiva en Streamlit, todo containerizado con Docker.`,
                features: [
                    "Ingesta y EDA distribuido con PySpark sobre los 4 subsets CMAPSS (FD001–FD004) con distintas condiciones operativas y modos de fallo",
                    "Feature engineering avanzado: rolling statistics (media, desviación estándar en ventanas deslizantes), lag features por ciclo y normalización por unidad operativa",
                    "Benchmark de 4 modelos supervisados: XGBoost, Random Forest, SVR y Gradient Boosting — evaluados con RMSE, MAE y la función de scoring asimétrico propia de NASA (penaliza más las predicciones tardías)",
                    "Experiment tracking completo con MLflow: logging de hiperparámetros, métricas por fold, artifacts y registro del modelo campeón en el Model Registry",
                    "API de inferencia REST con FastAPI: endpoint /predict que acepta secuencias de sensores y devuelve RUL estimado con intervalo de confianza",
                    "Dashboard interactivo en Streamlit: visualización de degradación del motor, curva de RUL predicha vs real y análisis de feature importance",
                    "Pipeline containerizado end-to-end con Docker Compose para reproducibilidad total del entorno"
                ],
                tech: ["Python", "PySpark", "Scikit-learn", "XGBoost", "MLflow", "FastAPI", "Streamlit", "Docker", "pandas", "NumPy"],
                responsibilities: [
                    "Diseño de la arquitectura completa del pipeline ML (ingesta → features → train → serving)",
                    "Implementación del EDA distribuido y feature engineering con PySpark",
                    "Entrenamiento, tuning de hiperparámetros y selección del modelo con MLflow como sistema de registro",
                    "Desarrollo de la API de inferencia (FastAPI) y la interfaz de exploración (Streamlit)",
                    "Análisis de feature importance e interpretabilidad del modelo en contexto industrial",
                    "Documentación técnica del proyecto y defensa ante el tribunal del máster"
                ],
                codeLink: "https://github.com/lightskinhorti/TFM_CMAPSS-FD001"
            },

            investment: {
                tag: "Full-Stack · ML · Cloud",
                title: "Investment Tracker",
                subtitle: "Plataforma full-stack de seguimiento de carteras con módulo de predicción de precios integrado. Desarrollada con Claude Code como copiloto — ciclo de entrega ~40% más rápido.",
                description: "Aplicación web completa para el tracking de inversiones personales que va más allá del registro contable: integra un módulo ML que genera predicciones de precio sobre los activos de la cartera usando Scikit-learn y Prophet. El backend en FastAPI expone tanto los endpoints de negocio como el servicio de inferencia; el frontend en React/TypeScript consume la API y muestra visualizaciones de rendimiento histórico y proyecciones. Todo el stack está containerizado con Docker y desplegado en AWS. El desarrollo se realizó con Claude Code como copiloto de código, reduciendo el tiempo de desarrollo estimado en aproximadamente un 40% frente a un flujo tradicional.",
                features: [
                    "Dashboard de cartera con rendimiento histórico, distribución de activos y métricas de riesgo (volatilidad, drawdown)",
                    "Predicción de precios con Scikit-learn (regresión) y Prophet (series temporales con estacionalidad)",
                    "Backend FastAPI con autenticación JWT, endpoints documentados con OpenAPI/Swagger",
                    "Base de datos PostgreSQL gestionada en AWS RDS con migraciones versionadas",
                    "Frontend React + TypeScript con gráficos interactivos de evolución de cartera",
                    "Containerización completa con Docker; despliegue en AWS EC2 + RDS",
                    "Ciclo de desarrollo acelerado ~40% usando Claude Code como copiloto de código"
                ],
                tech: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Scikit-learn", "Prophet", "Docker", "AWS", "JWT"],
                responsibilities: [
                    "Definición de la arquitectura del sistema y diseño del modelo de datos",
                    "Desarrollo del módulo de predicción ML y su exposición como microservicio en FastAPI",
                    "Implementación del frontend React/TypeScript con gestión de estado y visualizaciones",
                    "Configuración del entorno AWS (EC2, RDS) y pipeline de despliegue con Docker",
                    "Integración de Claude Code en el flujo de desarrollo para generación y revisión de código"
                ],
                codeLink: "https://github.com/lightskinhorti/Trading-App-Tracker"
            },

            bigdata: {
                tag: "Big Data · Arquitecturas Distribuidas",
                title: "Pipeline Big Data & ML",
                subtitle: "Pipelines ETL distribuidos a escala con PySpark y Hadoop, modelos ML aplicados sobre datos reales y comparativa de arquitecturas Lambda vs. Kappa.",
                description: "Proyecto de ingeniería de datos que aborda los retos del procesamiento a gran escala: diseño e implementación de pipelines ETL distribuidos con PySpark sobre un cluster Hadoop/HDFS, con foco en la optimización de rendimiento (particionado estratégico, broadcast joins para evitar shuffles costosos, persistencia de DataFrames intermedios y tuning de configuración Spark). Sobre los datos transformados se aplican algoritmos ML con Spark MLlib. El proyecto también implementa y compara las dos arquitecturas de referencia en Big Data: Lambda (batch + speed layer independientes) y Kappa (procesamiento unificado en streaming), evaluando sus trade-offs en latencia, complejidad operativa y consistencia de datos.",
                features: [
                    "Pipelines ETL distribuidos con PySpark sobre HDFS: ingesta, transformación y carga a escala",
                    "Optimización avanzada: particionado estratégico, broadcast joins, persistencia de DataFrames, tuning de executor memory y parallelism",
                    "K-Means clustering distribuido con Spark MLlib sobre datasets de volumen real",
                    "Árboles de decisión y regresión lineal con validación cruzada distribuida",
                    "Validación de calidad de datos: detección de nulos, outliers y drift en el pipeline",
                    "Arquitectura Lambda: batch layer (HDFS + Spark) + speed layer (Spark Streaming) + serving layer",
                    "Arquitectura Kappa: procesamiento unificado en streaming con estado persistente"
                ],
                tech: ["PySpark", "Apache Spark", "Hadoop", "HDFS", "Spark MLlib", "Spark Streaming", "Python"],
                responsibilities: [
                    "Diseño e implementación de los pipelines ETL end-to-end",
                    "Optimización de rendimiento a nivel de Spark (configuración, tuning, profiling)",
                    "Implementación de modelos ML distribuidos con Spark MLlib",
                    "Diseño y comparativa de arquitecturas Lambda y Kappa",
                    "Análisis de trade-offs de rendimiento y consistencia entre ambas arquitecturas"
                ],
                // TODO: add real repo URL
                codeLink: "#"
            },

            expense: {
                tag: "Full-Stack · Producto Real",
                title: "Expense Tracker VTC",
                subtitle: "Aplicación de gestión financiera operativa desarrollada para un cliente real del sector transporte privado (VTC). En producción con usuarios activos.",
                description: "Proyecto desarrollado como solución real para una empresa de transporte privado que necesitaba controlar sus gastos operativos (combustible, mantenimiento, peajes, seguros) por vehículo y conductor. La aplicación permite registrar y categorizar gastos, visualizar resúmenes mensuales y exportar informes contables. La arquitectura combina FastAPI como backend API, Supabase como BaaS (PostgreSQL gestionado + autenticación integrada + almacenamiento), React para la interfaz de usuario y Vercel para el despliegue continuo automático. El proyecto pasó por análisis de requisitos real con el cliente, iteraciones de diseño y está actualmente en uso por los conductores de la empresa.",
                features: [
                    "Registro y categorización de gastos operativos por tipo, vehículo y conductor",
                    "Panel financiero mensual con resúmenes, gráficos de distribución y comparativas",
                    "Exportación de informes contables en formato estructurado",
                    "Autenticación de usuarios con Supabase Auth (email + OAuth)",
                    "Base de datos PostgreSQL gestionada en Supabase con Row Level Security (RLS)",
                    "Despliegue continuo en Vercel con preview deployments por rama",
                    "App en producción con usuarios reales — desarrollada para un cliente concreto"
                ],
                tech: ["FastAPI", "React", "JavaScript", "Supabase", "PostgreSQL", "Vercel"],
                responsibilities: [
                    "Análisis de requisitos funcionales y técnicos con el cliente",
                    "Diseño del schema de base de datos y configuración de RLS en Supabase",
                    "Desarrollo del backend FastAPI y sus endpoints REST",
                    "Implementación del frontend React con integración de Supabase Auth",
                    "Configuración del pipeline de despliegue continuo en Vercel",
                    "Iteraciones de mejora basadas en feedback de usuarios reales"
                ],
                codeLink: "https://github.com/lightskinhorti/AppVTC"
            },

            nlp: {
                tag: "NLP · Representaciones Vectoriales",
                title: "Sistema NLP — Búsqueda Semántica en Español",
                subtitle: "Motor de recuperación semántica sobre corpus en español con análisis comparativo riguroso entre embeddings contextuales (BERT) y estáticos (GloVe).",
                description: "Proyecto de NLP que construye un sistema de búsqueda semántica orientado al español, un idioma con menor cobertura que el inglés en los modelos preentrenados estándar. El núcleo del proyecto es la comparativa rigurosa entre dos familias de representaciones vectoriales: embeddings estáticos con GloVe (vectors entrenados sobre corpus en español) y embeddings contextuales con BERT fine-tuned en español (modelo BETO). El sistema implementa un pipeline completo: preprocesamiento del corpus, generación de representaciones, indexación semántica, recuperación de documentos por similitud coseno y evaluación con métricas de información retrieval. La reducción dimensional con PCA y t-SNE permite visualizar la estructura del espacio vectorial y analizar cómo cada modelo agrupa conceptos semánticamente relacionados.",
                features: [
                    "Pipeline de preprocesamiento NLP para español: tokenización, lematización, eliminación de stopwords y normalización",
                    "Embeddings estáticos con GloVe entrenado sobre corpus en español (agregación por documento)",
                    "Embeddings contextuales con BERT en español (BETO / multilingual BERT fine-tuned)",
                    "Indexación semántica por similitud coseno sobre el espacio de embeddings",
                    "Evaluación de relevancia con métricas de Information Retrieval: Precision@k, Recall@k y MRR (Mean Reciprocal Rank)",
                    "Reducción dimensional con PCA (varianza explicada) y t-SNE (visualización 2D de clusters semánticos)",
                    "Análisis comparativo cuantitativo y cualitativo: BERT vs. GloVe en tareas de similitud y recuperación"
                ],
                tech: ["Python", "BERT", "GloVe", "HuggingFace Transformers", "Scikit-learn", "PCA", "t-SNE", "NumPy", "NLTK"],
                responsibilities: [
                    "Diseño del pipeline NLP end-to-end para corpus en español",
                    "Selección e integración de modelos preentrenados (BETO, GloVe-es)",
                    "Implementación del motor de recuperación semántica por similitud coseno",
                    "Definición del protocolo de evaluación con métricas de IR",
                    "Análisis exploratorio del espacio vectorial con PCA y t-SNE",
                    "Redacción del informe comparativo con conclusiones sobre el comportamiento de cada representación"
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
