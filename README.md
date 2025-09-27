# @autamedica/core

Paquete compartido con componentes, hooks, tipos y utilidades para el ecosistema Autamedica Healthcare Platform.

## 🚀 Instalación

```bash
npm install @autamedica/core
```

## 📦 Contenido

### Auth (`@autamedica/core/auth`)
Sistema de autenticación centralizado con Supabase:
- Hooks de autenticación (`useAuth`, `useRequireAuth`)
- Cliente Supabase configurado
- Middleware de protección de rutas
- Gestión de roles y permisos

### UI (`@autamedica/core/ui`)
Componentes de interfaz reutilizables:
- Componentes base (Button, Input, Card)
- Layouts modulares
- Componentes médicos especializados
- Sistema de temas

### Hooks (`@autamedica/core/hooks`)
Hooks React personalizados:
- `usePatientData` - Datos de pacientes
- `useDoctorProfile` - Perfil de médicos
- `useTelemedicine` - Funcionalidades de telemedicina
- `useLocalStorage` - Persistencia local

### Types (`@autamedica/core/types`)
Tipos TypeScript compartidos:
- Tipos de usuarios (Patient, Doctor, Company)
- Interfaces médicas (Appointment, Prescription)
- Tipos de datos clínicos
- Configuraciones de aplicación

### Utils (`@autamedica/core/utils`)
Utilidades y helpers:
- Formateo de fechas médicas
- Validaciones de datos
- Helpers de API
- Constantes del sistema

## 🔧 Uso

### Importación completa
```typescript
import { useAuth, Button, PatientType } from '@autamedica/core';
```

### Importación específica por módulo
```typescript
import { useAuth } from '@autamedica/core/auth';
import { Button } from '@autamedica/core/ui';
import { PatientType } from '@autamedica/core/types';
```

## 🏗️ Configuración

### 1. Configurar variables de entorno

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Configurar el AuthProvider

```tsx
import { AuthProvider } from '@autamedica/core/auth';

function App({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
```

### 3. Usar componentes y hooks

```tsx
import { useAuth, Button, LoadingSpinner } from '@autamedica/core';

function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return (
    <div>
      <h1>Bienvenido, {user?.name}</h1>
      <Button variant="primary">Acción Principal</Button>
    </div>
  );
}
```

## 🎯 Casos de Uso

### Portal de Pacientes
```typescript
import {
  useAuth,
  usePatientData,
  PatientDashboard,
  AppointmentCard
} from '@autamedica/core';
```

### Portal de Doctores
```typescript
import {
  useAuth,
  useDoctorProfile,
  DoctorDashboard,
  PatientList
} from '@autamedica/core';
```

### Portal Empresarial
```typescript
import {
  useAuth,
  useCompanyData,
  CompanyDashboard,
  EmployeeHealthMetrics
} from '@autamedica/core';
```

## 🔄 Versionado

Este paquete sigue [Semantic Versioning](https://semver.org/):

- **MAJOR**: Cambios incompatibles en la API
- **MINOR**: Nuevas funcionalidades compatibles
- **PATCH**: Correcciones de bugs

## 📄 Licencia

MIT © Autamedica Healthcare Platform

## 🤝 Contribución

Este es un paquete interno del ecosistema Autamedica. Para contribuciones:

1. Crear feature branch desde `main`
2. Hacer cambios con tests
3. Crear PR con descripción detallada
4. Review y merge por el team

## 🔗 Enlaces

- [Documentación completa](https://docs.autamedica.com)
- [Portal de pacientes](https://github.com/REINA-08/autamedica-patients)
- [Portal de doctores](https://github.com/REINA-08/autamedica-doctors)
- [Portal empresarial](https://github.com/REINA-08/autamedica-companies)