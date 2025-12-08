# 🏡 Sistema de Registro de Propiedad Inmueble (Neuquén)

> **Prueba Técnica Fullstack Senior**
> Aplicación para la gestión de "Afectación a Vivienda" (Bien de Familia).

![Java](https://img.shields.io/badge/Java-21-orange?style=flat-square)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-green?style=flat-square)
![React](https://img.shields.io/badge/React-19-blue?style=flat-square)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square)

## 📋 Descripción del Proyecto

Este sistema permite registrar inmuebles como Bien de Familia bajo la normativa de la provincia de Neuquén. Resuelve la complejidad de múltiples titulares, validación matemática de porcentajes de propiedad (racionales/quebrados).

El proyecto está estructurado como un **Monorepo Lógico**, desacoplando el Backend (API REST) del Frontend (SPA), orquestados mediante Docker para un despliegue transparente.

---

## 🏗️ Arquitectura y Modelo de Dominio

La arquitectura sigue los principios de **Separación de Responsabilidades**. Se ha puesto especial énfasis en evitar el problema "N+1" y las referencias circulares mediante el uso de **DTOs de Proyección (Query Views)** para las búsquedas masivas.

### Diagrama de Clases
El siguiente diagrama ilustra el modelo de entidades, la normalización geográfica y la estrategia de DTOs para optimizar la lectura:

[![](https://mermaid.ink/img/pako:eNrNWNtu2zgQ_RVCQIGkmziOc3OFoIBiC62ARPbKbhZbGAhoiXVZyKSWooqm2eQn-in7tq_5sR1Ksk3dXAtdFPWDRXFmyJnhXA71YPg8IIZp-CGO4yHFC4GXM4bg9-IFOjw8RINra2JP0BX8q_eMlnKjKxwTm0kq79FDNq9-l5fWPJYC-_L1683sb9ecLRANtJkrzkOCGQpISCTRKQ6LJWYS-YJgoFiyhpZEgU57nLGC2sPRjeM6I3SEbHfqDK0h2LBWn-EliSPsEzTkS0yZrn5m2piImDOsE-qtSGcnUlCY9xMq6ymML-eC1NNwRMKQBry8E43l05TKJMSCBjh4QpHgESUwJHGJV1LCyC39DI8AWx-IL3GA9_ZR7uESdwgrY6EtTWLg1fd72kg8lj3jsGVC5iFp55olhqcPazf6hzBYXyYCf9cPMnupeCEz3KecrVyB8HqqxEvABbmjeO6obV5q5SFN2bKTIDhVwiiKwyQRSxJQvJMf09koi0qnTFyfCc0HFbokCyIQS5ZEgMWigR4QOAjKajgWRI658AmT-BMBXwQ8KWxTcULNYTzsaKiPwyGkNoIVPpadY8fqxDaLI5JONESV4PaXCFwMapOWLqOM-hSLzU5gtFljVUkMQ5LO24v5mPkkbC8nlIu-tpKrnNRY8M-UgbHtMnot1hBL0FfogtdwVRTwyEKdZKvdRSpTom0siXbYdkgiLCR0AiZ5u80DTXKr9cNmxtzosh0VLQc0qakj3-lDqcxWzQZ1LAWP1BtZ0a-SkGVVLy9JVnYkUHVEoH5XI8-zhiOvODu23aEDbdsuTtvunWffOhNn5BYJ1tgbXVlDqzjr2YO31vvK9MByB_Z1YfqxHkJYYwfgw3A6iuuQg2dPxiN3Yt-NbW8ycq0qhtD6gAdCnMUEFtu5DG6t9z9az1flT1esWgkbm_82e364469woa316G31K3NSexf_DNSmabUGLrQE4TbhV4wwFX_bguqXCaZs0zw09PUb46f1If1_-FE_iR0gpNK0DkU2heGvFX47hN02yNYmwn4qamssV_WV_Pd3tvcnunXsPyZob5qA-gRDPKNbhfHRDagtKA7pV7g17dfV-lT-LpOvZORVEv-VwLXsTQjIL6xxmQL9MXiGzz8RaKwEYuXackdoL4abZ3rNiBFm6nhwvF8RdUDXEEEvxmghaAhbHkk8h4cyACI4CZUr4zYZX4ivAV9GcP_mO0dnY7bvmJC7ZXS0vm1o4dzQKMi2RlGOhbe2Z7sDx9qcs_YZ4_Jv4MgzuZ7oFKKuTK3oWmZoQuZlPh2flWlFVLk2zgNUMwBsZE-yqfUNZ2YczwwwVw06nZcw1m-oJkq_HqAcma0-fLQSat6w2-mocc1t0Eyxr_pQ1LDKSziflXyOgk0UqjqTJuodYXUCiruAYysymVSNRrrJMCgXrZVkrkuJuwr1C1qUuD0N9m9uLQ1MRTNVgel0Xm_MVo6MoBCobMlYSxhBcRcPryyg9S7FvIqBKmN9i1AyDSe8ES_spIO1kno6Sa0QpotWLSsvUQdNC_KVVHn-5qLr529vnIGFhja6tqBDTKb5vaBa1YuegRvmvbL4LsCSx3cB2SamnVUrueKpNYgyrrouFzVrzAxv1SAQjyRdqizgWTOZP_-bscezGYNqiwbvnCniyNUqdwdIE8rWXiSbRtWZGXrWglPd0dSarN_WWuk2ZPqQ8DNBIc5Xff6HIde8gZ3u0SLBAgIn5DEC1eYKjcZo7_iot7_azTgwoAsGhilFQg4MQKxLrF6NtOfODPmRLMnMMGEYkA8YbFeSjyAWYfae8-VKUvBk8dEwP-AwhrfsY3L--XvNAlFMxIAnTBrm8Xk3XcMwH4wvhnnYP77odHv93tmr3sXFyelJ_8C4N8yTk85p_-ziVbd31jvvn52dPR4YX9Nde53Tbvf85Lx7fn7c73e7xycHBmAcycVN_gFePR7_A5ye8Qo?type=png)](https://mermaid.live/edit#pako:eNrNWNtu2zgQ_RVCQIGkmziOc3OFoIBiC62ARPbKbhZbGAhoiXVZyKSWooqm2eQn-in7tq_5sR1Ksk3dXAtdFPWDRXFmyJnhXA71YPg8IIZp-CGO4yHFC4GXM4bg9-IFOjw8RINra2JP0BX8q_eMlnKjKxwTm0kq79FDNq9-l5fWPJYC-_L1683sb9ecLRANtJkrzkOCGQpISCTRKQ6LJWYS-YJgoFiyhpZEgU57nLGC2sPRjeM6I3SEbHfqDK0h2LBWn-EliSPsEzTkS0yZrn5m2piImDOsE-qtSGcnUlCY9xMq6ymML-eC1NNwRMKQBry8E43l05TKJMSCBjh4QpHgESUwJHGJV1LCyC39DI8AWx-IL3GA9_ZR7uESdwgrY6EtTWLg1fd72kg8lj3jsGVC5iFp55olhqcPazf6hzBYXyYCf9cPMnupeCEz3KecrVyB8HqqxEvABbmjeO6obV5q5SFN2bKTIDhVwiiKwyQRSxJQvJMf09koi0qnTFyfCc0HFbokCyIQS5ZEgMWigR4QOAjKajgWRI658AmT-BMBXwQ8KWxTcULNYTzsaKiPwyGkNoIVPpadY8fqxDaLI5JONESV4PaXCFwMapOWLqOM-hSLzU5gtFljVUkMQ5LO24v5mPkkbC8nlIu-tpKrnNRY8M-UgbHtMnot1hBL0FfogtdwVRTwyEKdZKvdRSpTom0siXbYdkgiLCR0AiZ5u80DTXKr9cNmxtzosh0VLQc0qakj3-lDqcxWzQZ1LAWP1BtZ0a-SkGVVLy9JVnYkUHVEoH5XI8-zhiOvODu23aEDbdsuTtvunWffOhNn5BYJ1tgbXVlDqzjr2YO31vvK9MByB_Z1YfqxHkJYYwfgw3A6iuuQg2dPxiN3Yt-NbW8ycq0qhtD6gAdCnMUEFtu5DG6t9z9az1flT1esWgkbm_82e364469woa316G31K3NSexf_DNSmabUGLrQE4TbhV4wwFX_bguqXCaZs0zw09PUb46f1If1_-FE_iR0gpNK0DkU2heGvFX47hN02yNYmwn4qamssV_WV_Pd3tvcnunXsPyZob5qA-gRDPKNbhfHRDagtKA7pV7g17dfV-lT-LpOvZORVEv-VwLXsTQjIL6xxmQL9MXiGzz8RaKwEYuXackdoL4abZ3rNiBFm6nhwvF8RdUDXEEEvxmghaAhbHkk8h4cyACI4CZUr4zYZX4ivAV9GcP_mO0dnY7bvmJC7ZXS0vm1o4dzQKMi2RlGOhbe2Z7sDx9qcs_YZ4_Jv4MgzuZ7oFKKuTK3oWmZoQuZlPh2flWlFVLk2zgNUMwBsZE-yqfUNZ2YczwwwVw06nZcw1m-oJkq_HqAcma0-fLQSat6w2-mocc1t0Eyxr_pQ1LDKSziflXyOgk0UqjqTJuodYXUCiruAYysymVSNRrrJMCgXrZVkrkuJuwr1C1qUuD0N9m9uLQ1MRTNVgel0Xm_MVo6MoBCobMlYSxhBcRcPryyg9S7FvIqBKmN9i1AyDSe8ES_spIO1kno6Sa0QpotWLSsvUQdNC_KVVHn-5qLr529vnIGFhja6tqBDTKb5vaBa1YuegRvmvbL4LsCSx3cB2SamnVUrueKpNYgyrrouFzVrzAxv1SAQjyRdqizgWTOZP_-bscezGYNqiwbvnCniyNUqdwdIE8rWXiSbRtWZGXrWglPd0dSarN_WWuk2ZPqQ8DNBIc5Xff6HIde8gZ3u0SLBAgIn5DEC1eYKjcZo7_iot7_azTgwoAsGhilFQg4MQKxLrF6NtOfODPmRLMnMMGEYkA8YbFeSjyAWYfae8-VKUvBk8dEwP-AwhrfsY3L--XvNAlFMxIAnTBrm8Xk3XcMwH4wvhnnYP77odHv93tmr3sXFyelJ_8C4N8yTk85p_-ziVbd31jvvn52dPR4YX9Nde53Tbvf85Lx7fn7c73e7xycHBmAcycVN_gFePR7_A5ye8Qo)

---

## 🚀 Stack Tecnológico

### Backend (Spring Boot)
* **Core:** Java 21, Spring Boot 3.x.
* **Persistencia:** Spring Data JPA, H2 Database (In-Memory).
* **Validación & Utils:** Apache Commons Math (para validación precisa de quebrados), Hibernate Validator.
* **Calidad de Código:** MapStruct (mapeo DTO/Entidad), Lombok.
* **Documentación:** OpenAPI / Swagger UI.

### Frontend (React 19)
* **Framework:** Vite + React 19 (TypeScript).
* **Design System:** Ant Design (v5) con ConfigProvider global.
* **Estado & API:** Axios (con interceptors), React Hooks, useActionState.
* **Routing:** React Router DOM.

---

## 💡 Decisiones Técnicas Clave (Seniority)

1.  **Entidad `Titularidad` Explicita:**
    En lugar de una relación `@ManyToMany` simple, se creó una entidad intermedia para almacenar el porcentaje de propiedad con precisión matemática (numerador/denominador), evitando errores de redondeo de punto flotante.

2.  **Patrón "Query View" (CQRS Lite):**
    Para las búsquedas (`BusquedaGlobalDTO`), no se recuperan entidades completas. Se utilizan **JPQL Constructor Expressions** para proyectar directamente los resultados de la BD a un DTO plano.
    * *Beneficio:* Búsquedas ultrarrápidas y payload JSON mínimo.
    * *Resultado:* Tablas en el frontend que renderizan sin transformar datos complejos.

3.  **Geografía Normalizada y Flexible:**
    La relación `Inmueble -> Ciudad -> Departamento` permite integridad referencial, pero el modelo soporta propiedades rurales (sin Ciudad asignada) vinculadas directamente a un Departamento.

---

## 🛠️ Instalación y Ejecución

### Opción A: Docker (Recomendada)
Ejecuta todo el entorno con un solo comando. No requiere Java ni Node instalados localmente.

```bash
docker-compose up --build
```

* Frontend: http://localhost:5173
* Backend API: http://localhost:8080
* Swagger UI: http://localhost:8080/swagger-ui.html

### Opción B: Desarrollo Local
1. Backend:
```bash
cd backend
mvn spring-boot:run
```
2. Frontend:cd frontend
```bash
   npm install
   npm run dev
```

### Ejecutar tests de Backend
✅ TestingEl proyecto incluye tests unitarios para la lógica crítica (validación de fracciones) y de integración para los repositorios.
```bash   
cd backend
mvn test
```
