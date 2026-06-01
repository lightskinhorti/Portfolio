# Mantenimiento Predictivo — NASA CMAPSS Turbofan Engine

**TFM — Máster en Inteligencia Artificial y Big Data**

Pipeline ML end-to-end para predicción de vida útil restante (RUL) en motores turbofan sobre el benchmark aeroespacial NASA CMAPSS — estándar de referencia en la industria de mantenimiento predictivo.

---

## Descripción del problema

El dataset [NASA CMAPSS](https://data.nasa.gov/Aerospace/CMAPSS-Jet-Engine-Simulated-Data/ff5v-kuh6) simula la degradación de motores turbofan bajo distintas condiciones operativas y modos de fallo (subsets FD001–FD004, +20 000 ciclos de motor, 21 sensores). El objetivo es predecir el **RUL (Remaining Useful Life)** — cuántos ciclos le quedan al motor antes del fallo — como un problema de regresión supervisada.

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Procesamiento distribuido | PySpark · Apache Spark |
| Feature engineering | pandas · NumPy |
| Modelos | Scikit-learn · XGBoost (Random Forest, SVR, Gradient Boosting) |
| Experiment tracking | MLflow |
| API de inferencia | FastAPI |
| UI interactiva | Streamlit |
| Containerización | Docker · Docker Compose |

## Arquitectura del pipeline

```
NASA CMAPSS (FD001–FD004)
        │
        ▼
  Ingesta & EDA distribuido (PySpark)
        │
        ▼
  Feature Engineering
  ├── Rolling statistics (media, std por ventana deslizante)
  ├── Lag features por ciclo
  └── Normalización por unidad operativa
        │
        ▼
  Entrenamiento & Benchmark (MLflow tracking)
  ├── XGBoost
  ├── Random Forest
  ├── SVR
  └── Gradient Boosting
        │
        ▼
  Evaluación: RMSE · MAE · NASA scoring function (asimétrica)
        │
        ▼
  Serving: FastAPI + Streamlit — Docker Compose
```

## Características principales

- **EDA distribuido** con PySpark sobre los 4 subsets CMAPSS con distintas condiciones operativas
- **Feature engineering avanzado**: rolling stats con ventanas deslizantes, lag features, normalización por unidad operativa
- **Benchmark de 4 modelos** con tracking completo de hiperparámetros, métricas y artifacts en MLflow Model Registry
- **Evaluación con scoring asimétrico** propio de NASA: penaliza más las predicciones tardías (predicción conservadora)
- **API REST de inferencia** (`/predict`) con FastAPI — acepta secuencias de sensores, devuelve RUL estimado
- **Dashboard interactivo** en Streamlit: curva de degradación, RUL predicho vs real, feature importance
- **Reproducibilidad total** — entorno containerizado con Docker Compose

## Cómo ejecutar

```bash
# Clonar el repo
git clone https://github.com/lightskinhorti/TFM_CMAPSS-FD001.git
cd TFM_CMAPSS-FD001

# Levantar el entorno completo
docker-compose up --build

# API disponible en http://localhost:8000
# UI Streamlit en http://localhost:8501
# MLflow UI en http://localhost:5000
```

## Resultados

| Modelo | RMSE | MAE | NASA Score |
|--------|------|-----|------------|
| XGBoost | — | — | — |
| Random Forest | — | — | — |
| SVR | — | — | — |
| Gradient Boosting | — | — | — |

> Añade aquí las métricas reales de tu evaluación final.

## Autor

**Javier Hortigüela Valiente** — [LinkedIn](https://es.linkedin.com/in/javierhortiguela) · [Portfolio](https://lightskinhorti.github.io/Portfolio/)
