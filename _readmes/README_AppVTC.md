# Expense Tracker VTC — Gestión Financiera para Transporte Privado

Web app de gestión de gastos operativos desarrollada para un cliente real del sector transporte privado (VTC). En producción con usuarios activos.

---

## Stack tecnológico

| Capa | Tecnología |
|------|-----------|
| Backend | FastAPI · Python |
| Frontend | React · JavaScript |
| Base de datos | Supabase (PostgreSQL gestionado) |
| Autenticación | Supabase Auth |
| Despliegue | Vercel (CI/CD automático) |

## Características

- **Registro de gastos** — categorización por tipo (combustible, mantenimiento, peajes, seguros) y por vehículo/conductor
- **Panel financiero mensual** — resúmenes, gráficos de distribución y comparativas entre periodos
- **Exportación de informes** — generación de reportes contables en formato estructurado
- **Autenticación** — Supabase Auth con Row Level Security (RLS) para aislamiento de datos por usuario
- **Despliegue continuo** — Vercel con preview deployments por rama

## Contexto real

Proyecto desarrollado para un cliente concreto del sector transporte privado que necesitaba digitalizar el control de sus gastos operativos. Pasó por análisis de requisitos real, iteraciones con el cliente y está actualmente en uso.

## Cómo ejecutar en local

```bash
git clone https://github.com/lightskinhorti/AppVTC.git
cd AppVTC

# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Frontend
cd frontend
npm install
npm run dev
```

## Variables de entorno

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key
```

## Autor

**Javier Hortigüela Valiente** — [LinkedIn](https://es.linkedin.com/in/javierhortiguela) · [Portfolio](https://lightskinhorti.github.io/Portfolio/)
