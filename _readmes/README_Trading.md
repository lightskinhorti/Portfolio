# Investment Tracker — Análisis de Carteras con ML

Plataforma web full-stack para el seguimiento y análisis de carteras de inversión con módulo de predicción ML integrado. Dashboard de P&L en tiempo real, análisis técnico (RSI, SMA), benchmark vs S&P 500 y Bitcoin, y predicciones de precio por activo con intervalo de confianza.

Desarrollada con Claude Code como copiloto — ciclo de entrega ~40% más rápido frente al flujo tradicional.

---

## Capturas

### Dashboard de Cartera
> Total Invertido · Valor Actual · Ganancia/Pérdida · Rendimiento en tiempo real

### Análisis Técnico — RSI y SMA
> RSI (14 períodos), SMA 20 y SMA 50 con señales automáticas (Golden Cross, tendencia bajista/alcista)

### Gráfica de Precio Interactiva
> Precio histórico con overlay de medias móviles, timeframes 1D / 1S / 1M / 3M / 1A

### Rendimiento vs Benchmarks
> Cartera normalizada a base 100 vs S&P 500 y Bitcoin

### Predicción ML
> Precio proyectado a 7/14/30 días con intervalo de confianza superior/inferior, score de confianza y volatilidad histórica

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

## Funcionalidades

- **Portfolio tab** — tabla de activos (acciones, ETFs, crypto) con Cantidad, Precio Compra, Precio Actual, P/L y variación 24h
- **Análisis tab** — RSI (14 períodos), SMA 20 y SMA 50 con señales automáticas de compra/venta. Gráfica de precio interactiva con overlay de medias y selección de timeframe
- **Benchmarks tab** — rendimiento de la cartera normalizado a base 100 comparado con S&P 500 y Bitcoin por periodo (1S · 1M · 3M · 1A)
- **Predicciones tab** — modelo ML que genera precio proyectado a 7/14/30 días con límite inferior/superior del intervalo de confianza, score de confianza del modelo y volatilidad histórica del activo
- **Correlación tab** — matriz de correlación entre activos de la cartera
- **Alertas tab** — sistema de alertas configurables por precio

## Cómo ejecutar en local

```bash
git clone https://github.com/lightskinhorti/Trading-App-Tracker.git
cd Trading-App-Tracker

# Con Docker (recomendado)
docker-compose up --build

# Backend manual
cd backend && pip install -r requirements.txt && uvicorn main:app --reload

# Frontend manual
cd frontend && npm install && npm run dev
```

## Variables de entorno

```env
DATABASE_URL=postgresql://user:password@localhost:5432/tracker
SECRET_KEY=your_jwt_secret
```

## Autor

**Javier Hortigüela Valiente** — Data Engineer & ML Engineer  
[LinkedIn](https://es.linkedin.com/in/javierhortiguela) · [Portfolio](https://lightskinhorti.github.io/Portfolio/) · [GitHub](https://github.com/lightskinhorti)
