// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault(); // prevent page jump before any check
        const href = this.getAttribute('href');
        if (href === '#') return;
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
El proyecto está implementado como un notebook de análisis en Google Colab y cubre el ciclo completo: ingesta y EDA distribuido con PySpark, feature engineering avanzado sobre los 4 subsets, benchmark de modelos supervisados con experiment tracking en MLflow, y análisis de interpretabilidad orientado a contexto industrial de mantenimiento predictivo.`,
                features: [
                    "Ingesta y EDA distribuido con PySpark sobre los 4 subsets CMAPSS (FD001–FD004) con distintas condiciones operativas y modos de fallo",
                    "Feature engineering avanzado: rolling statistics (media, desviación estándar en ventanas deslizantes), lag features por ciclo y normalización por unidad operativa",
                    "Benchmark de 4 modelos supervisados: XGBoost, Random Forest, SVR y Gradient Boosting — evaluados con RMSE, MAE y la función de scoring asimétrico propia de NASA (penaliza más las predicciones tardías)",
                    "Experiment tracking completo con MLflow: logging de hiperparámetros, métricas por fold, artifacts y registro del modelo campeón en el Model Registry",
                    "Análisis de feature importance e interpretabilidad del modelo en contexto industrial aeroespacial",
                    "Validación cruzada y análisis de error por subset operativo para medir robustez del modelo ante distintas condiciones de vuelo"
                ],
                tech: ["Python", "PySpark", "Scikit-learn", "XGBoost", "MLflow", "pandas", "NumPy", "Matplotlib", "Google Colab"],
                responsibilities: [
                    "Diseño de la arquitectura completa del pipeline ML (ingesta → features → train → evaluación)",
                    "Implementación del EDA distribuido y feature engineering con PySpark",
                    "Entrenamiento, tuning de hiperparámetros y selección del modelo campeón con MLflow",
                    "Análisis de feature importance e interpretabilidad orientado a mantenimiento industrial",
                    "Documentación técnica del proyecto y defensa ante el tribunal del máster"
                ],
                codeLink: "https://github.com/lightskinhorti/TFM_CMAPSS-FD001"
            },

            investment: {
                tag: "Full-Stack · ML · Cloud",
                title: "Investment Tracker",
                subtitle: "Plataforma completa de análisis de carteras con predicción ML integrada — RSI, SMA, benchmark vs S&amp;P 500 y Bitcoin, e intervalo de confianza por activo.",
                description: "Aplicación web full-stack para el tracking y análisis de carteras de inversión con un módulo ML que genera predicciones de precio por activo con intervalo de confianza y score de confianza (93.3% en validación con NVDA). El dashboard muestra P&L en tiempo real y comparativa normalizada contra benchmarks de mercado (S&P 500, Bitcoin). La pestaña de Análisis ofrece indicadores técnicos completos (RSI 14 períodos, SMA 20/SMA 50) con detección automática de señales (Golden Cross, tendencia bajista). El backend FastAPI expone los endpoints de negocio y el servicio de inferencia ML; el frontend React/TypeScript renderiza gráficas interactivas con múltiples timeframes. Desarrollada con Claude Code como copiloto, reduciendo el ciclo de entrega en ~40%.",
                features: [
                    "Dashboard de cartera: Total Invertido, Valor Actual, Ganancia/Pérdida y Rendimiento en tiempo real — soporta acciones, ETFs y crypto",
                    "Análisis técnico completo: RSI (14 períodos), SMA 20 y SMA 50 con detección automática de señales (Golden Cross, tendencia bajista/alcista)",
                    "Gráficas de precio interactivas con overlay de medias móviles y selección de timeframe (1D · 1S · 1M · 3M · 1A)",
                    "Benchmarks: rendimiento de cartera normalizado a base 100 vs S&P 500 y Bitcoin con comparativa por periodo",
                    "Predicción ML por activo a 7/14/30 días: precio proyectado con intervalo de confianza superior/inferior, score de confianza y volatilidad histórica",
                    "Pestañas adicionales: Correlación entre activos y sistema de Alertas configurable",
                    "Backend FastAPI con autenticación JWT y endpoints REST documentados con OpenAPI/Swagger",
                    "Ciclo de desarrollo acelerado ~40% con Claude Code como copiloto de código"
                ],
                tech: ["FastAPI", "React", "TypeScript", "PostgreSQL", "Scikit-learn", "Prophet", "Docker", "AWS", "JWT"],
                responsibilities: [
                    "Arquitectura completa: diseño de la API, modelo de datos y pipeline ML end-to-end",
                    "Implementación del módulo de predicción ML (regresión + Prophet) y exposición como endpoint de inferencia en FastAPI",
                    "Desarrollo del frontend React/TypeScript: dashboard, gráficas interactivas, indicadores técnicos RSI/SMA y benchmarks",
                    "Configuración del entorno AWS (EC2 + RDS PostgreSQL) y containerización con Docker",
                    "Integración de Claude Code en el flujo de desarrollo para generación y revisión de código"
                ],
                screenshots: [
                    { src: "img/Captura de pantalla 2026-06-01 221530.png", caption: "Dashboard de cartera — P&L en tiempo real" },
                    { src: "img/Captura de pantalla 2026-06-01 221543.png", caption: "Análisis de precio — SMA 20/50 y timeframes" },
                    { src: "img/Captura de pantalla 2026-06-01 221553.png", caption: "Indicadores técnicos — RSI 14 períodos y señales" },
                    { src: "img/Captura de pantalla 2026-06-01 221602.png", caption: "Rendimiento vs S&P 500 y Bitcoin (base 100)" },
                    { src: "img/Captura de pantalla 2026-06-01 221609.png", caption: "Predicción ML — intervalo de confianza y score" }
                ],
                codeLink: "https://github.com/lightskinhorti/Trading-App-Tracker"
            },

            agent: {
                tag: "AI Agent · LangGraph · Claude API",
                title: "Agente Autónomo con Tool Use",
                subtitle: "Sistema de investigación autónomo production-ready con ciclo plan→ejecutar→revisar→replanificar, 6 herramientas reales, human-in-the-loop y estado persistido en SQLite.",
                description: `Agente de investigación autónomo construido sobre LangGraph con Claude como backbone LLM. El ciclo de ejecución es explícito y auditable: el agente planifica el enfoque, ejecuta herramientas para recopilar información, revisa si los resultados son suficientes y replanifica si es necesario. <br><br>
A diferencia de un chatbot con herramientas, este sistema usa checkpointing en disco (SQLite) en lugar de estado en memoria — el agente sobrevive a reinicios y reanuncia exactamente donde se quedó. El mecanismo de human-in-the-loop va más allá de un simple diálogo de confirmación: interrumpe la ejecución con <code>interrupt_before</code> antes de ejecutar código, requiriendo aprobación explícita, y mantiene trails de razonamiento auditables. La API REST expone ejecución asíncrona con polling de estado.`,
                features: [
                    "Ciclo autónomo plan → ejecutar → revisar → replanificar con trails de razonamiento auditables",
                    "6 herramientas reales: rag_search (ChromaDB híbrido), web_search (DuckDuckGo), document_fetch (HTML+PDF), code_executor (sandbox RestrictedPython), report_writer y memory_store",
                    "Human-in-the-loop con interrupt_before en ejecución de código — requiere aprobación explícita antes de correr cualquier script",
                    "Checkpointing en SQLite — estado persistido en disco, el agente reanuda tras reinicios sin perder contexto",
                    "Búsqueda híbrida semántica + keyword sobre la base de conocimiento en ChromaDB",
                    "API REST con FastAPI: ejecución asíncrona, polling de estado y observabilidad (token usage, latencias de herramientas, métricas de éxito)",
                    "Despliegue containerizado con Docker Compose — UI en Streamlit"
                ],
                tech: ["LangGraph", "Claude API", "FastAPI", "ChromaDB", "Streamlit", "RestrictedPython", "SQLite", "Docker", "Python"],
                responsibilities: [
                    "Diseño de la arquitectura del agente: grafo de estados LangGraph, herramientas y ciclo de revisión",
                    "Implementación del mecanismo human-in-the-loop con interrupt_before y flujo de aprobación",
                    "Integración de las 6 herramientas con manejo de errores y logging de latencias",
                    "Configuración del checkpointing en SQLite para persistencia de estado entre sesiones",
                    "Exposición de la API REST asíncrona con FastAPI y despliegue con Docker Compose"
                ],
                codeLink: "https://github.com/lightskinhorti/AI-Agent-With-Tool-Use"
            },

            rag: {
                tag: "RAG · LegalTech · NLP",
                title: "RAG — Consulta sobre Legislación BOE",
                subtitle: "Sistema de consulta en lenguaje natural sobre legislación española real del BOE con retrieval híbrido, re-ranking y agente legal multi-step. Score global 0.79 sobre 50 preguntas de referencia.",
                description: `Sistema RAG production-ready orientado a documentos legislativos del BOE (Boletín Oficial del Estado) español. Resuelve el reto de navegar legislación técnica extensa en español — un dominio con cobertura limitada en modelos preentrenados estándar. <br><br>
La arquitectura implementa un pipeline sofisticado: las consultas pasan primero por un caché semántico Redis (umbral de similitud ~95%); los cache misses activan un agente legal con LangGraph que puede descomponer preguntas complejas, ejecutar búsqueda híbrida densa+sparse (ChromaDB + BM25) y aplicar re-ranking con cross-encoder antes de que Claude genere la respuesta citando las fuentes. Todas las peticiones llevan cabeceras de trazabilidad y métricas de latencia expuestas vía Prometheus/Grafana.`,
                features: [
                    "Ingestión de documentos reales del BOE vía API pública (PDF, TXT, Markdown, XML) — ~2.000+ chunks de ~150 documentos legislativos",
                    "Retrieval híbrido: embeddings densos (Sentence-Transformers multilingüe) + BM25 sparse, fusionados con Reciprocal Rank Fusion",
                    "Re-ranking con cross-encoder (ms-marco-MiniLM-L-6-v2) para maximizar precisión de contexto",
                    "Caché semántico Redis con similitud coseno (~95% threshold) — respuestas instantáneas para preguntas similares",
                    "Agente legal multi-step con LangGraph: descompone preguntas complejas en sub-queries y consolida resultados",
                    "Filtrado por metadatos: sección, departamento y fecha del documento",
                    "Benchmark sobre 50 preguntas de referencia — Fidelidad 0.82, Relevancia 0.78, Context Precision 0.85, Context Recall 0.71",
                    "Latencia media ~800ms end-to-end; p95 ~1.4s. Observabilidad con Prometheus + Grafana"
                ],
                tech: ["Claude API", "LangGraph", "ChromaDB", "FastAPI", "Sentence-Transformers", "BM25", "Redis", "Prometheus", "Docker", "Python"],
                responsibilities: [
                    "Diseño del pipeline RAG completo: ingestión, chunking, indexación, retrieval y generación",
                    "Implementación del retrieval híbrido denso+sparse con Reciprocal Rank Fusion y cross-encoder reranking",
                    "Configuración del caché semántico Redis con umbral de similitud coseno ajustable",
                    "Desarrollo del agente legal multi-step con LangGraph para descomposición de consultas complejas",
                    "Benchmark de evaluación sobre 50 preguntas de referencia en derecho laboral, fiscal y administrativo",
                    "Configuración de observabilidad: Prometheus, Grafana y trazabilidad por petición"
                ],
                codeLink: "https://github.com/lightskinhorti/RAG"
            }
        };

        const project = projects[projectType];
        if (!project) return null;

        const githubBtn = project.codeLink !== '#'
            ? `<a href="${project.codeLink}" class="btn btn-primary" target="_blank">Ver Código en GitHub</a>`
            : `<a href="https://github.com/lightskinhorti" class="btn btn-secondary" target="_blank">Ver GitHub</a>`;

        const screenshotsHtml = project.screenshots ? `
            <div class="modal-screenshots">
                <h4>Capturas de pantalla</h4>
                <div class="screenshots-grid">
                    ${project.screenshots.map(s => `
                        <figure class="screenshot-item">
                            <img src="${s.src}" alt="${s.caption}" loading="lazy" onerror="this.closest('figure').style.display='none'">
                            <figcaption>${s.caption}</figcaption>
                        </figure>
                    `).join('')}
                </div>
            </div>
        ` : '';

        return `
            <div class="modal-body">
                <div class="modal-header">
                    <span class="modal-tag">${project.tag}</span>
                    <h2 class="modal-title">${project.title}</h2>
                    <p class="modal-subtitle">${project.subtitle}</p>
                </div>

                ${screenshotsHtml}

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
