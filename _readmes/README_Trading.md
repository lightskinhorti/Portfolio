# Investment Tracker — App Full-Stack con ML

Plataforma de seguimiento de carteras de inversión con predicción de precios integrada. Backend FastAPI, frontend React/TypeScript, PostgreSQL en AWS. Desarrollada con Claude Code como copiloto — ciclo de entrega ~40% más rápido.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | FastAPI · Python · JWT |
| Frontend | React · TypeScript |
| Base de datos | PostgreSQL (AWS RDS) |
| ML | Scikit-learn · Prophet |
| Infraestructura | Docker · AWS EC2 |
| API docs | OpenAPI / Swagger |

## Características

- **Dashboard de cartera** — rendimiento histórico, distribución de activos, métricas de riesgo (volatilidad, drawdown)
- **Predicción de precios** — modelos de regresión (Scikit-learn) y series temporales con estacionalidad (Prophet)
- **Autenticación JWT** — sistema de usuarios con sesiones seguras
- **API REST documentada** — endpoints disponibles en `/docs` con Swagger UI
- **Despliegue en AWS** — EC2 + RDS PostgreSQL + Docker

## Cómo ejecutar en local

```bash
git clone https://github.com/lightskinhorti/Trading-App-Tracker.git
cd Trading-App-Tracker

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

Con Docker:

```bash
docker-compose up --build
```

## Variables de entorno

```env
DATABASE_URL=postgresql://user:password@localhost:5432/tracker
SECRET_KEY=your_jwt_secret
```

## Autor

**Javier Hortigüela Valiente** — [LinkedIn](https://es.linkedin.com/in/javierhortiguela) · [Portfolio](https://lightskinhorti.github.io/Portfolio/)
