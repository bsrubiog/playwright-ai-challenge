# Desafío Técnico: Automatización E2E con Playwright e Integración de IA

Framework de pruebas de extremo a extremo (E2E) desarrollado en **TypeScript** y **Playwright**, integrado con la API de **Google Gemini** para la generación dinámica de datos sintéticos y validaciones semánticas, complementado con **Allure Framework** para una observabilidad avanzada y captura de tráfico de red.

---

## 🛠️ Stack Tecnológico

- **Lenguaje:** TypeScript / Node.js
- **Core Test Library:** Playwright Test
- **Gestor de Dependencias:** NPM
- **Motor de Inteligencia Artificial:** Google Gemini API (`gemini-1.5-flash`)
- **Reportes y Observabilidad:** Allure Framework (`allure-playwright`)

---

## 🚀 Requisitos Previos

Para ejecutar el proyecto y visualizar los reportes de Allure de manera local, asegúrate de tener instalado:

- **Node.js:** v18 LTS o superior.
- **Java Development Kit (JDK) 21:** Requerido para el motor de ejecución y generación de reportes de Allure.
- **Maven:** Gestor de dependencias Java compatible con el CLI de Allure.

---

## ⚙️ Configuración del Entorno y Variables

1. **Clonar el repositorio:**
   ```bash
   git clone https://github.com/bsrubiog/playwright-ai-challenge.git
   cd playwright-ai-challenge
   ```

2. **Instalar dependencias de Node:**
   ```bash
   npm install
   npx playwright install --with-deps
   ```

3. **Configurar las variables de entorno:**
   Duplica el archivo `.env.example` y guárdalo como `.env`:
   ```bash
   cp .env.example .env
   ```
   Abre el archivo `.env` e ingresa tu clave secreta de la API de Google Gemini:
   ```env
   GEMINI_API_KEY=tu_api_key_de_gemini_aqui
   ```
   *(Nota: El repositorio incluye un archivo `.env.example` documentado sin claves reales expuestas por seguridad).*

---

## 🤖 Opciones de Inteligencia Artificial Implementadas

El framework integra dos capacidades avanzadas impulsadas por **Google Gemini (`gemini-1.5-flash`)**:

1. **Generación Dinámica de Datos Sintéticos (`generateSyntheticData`):**
   - *Propósito:* Evita datos de prueba estáticos o hardcodeados en el flujo de comercio electrónico.
   - *Funcionamiento:* Envía un prompt estructurado a la IA para obtener información de comprador válida (nombre, apellido y código postal de 5 dígitos) en formato JSON antes de iniciar el pago.

2. **Aserciones Semánticas (`assertSemanticIntent`):**
   - *Propósito:* Validar resultados de negocio complejos mediante comprensión de lenguaje natural en lugar de comparaciones rígidas de cadenas (`toBe()`).
   - *Funcionamiento:* Evalúa el texto final obtenido en la interfaz frente a la intención esperada (*"El mensaje indica de manera clara que la orden ha sido completada con éxito"*), devolviendo una validación robusta basada en IA.

---

## 💻 Comandos de Ejecución y Reportes

### 1. Ejecutar las pruebas E2E

- **Ejecutar en modo headless (por defecto):**
  ```bash
  npx playwright test
  ```

- **Ejecutar con interfaz gráfica de Playwright (UI Mode):**
  ```bash
  npx playwright test --ui
  ```

### 2. Generación y Visualización de Reportes (Allure Framework)

El proyecto intercepta automáticamente todas las peticiones y respuestas HTTP de red (`page.on('request')` / `page.on('response')`), adjuntándolas como evidencia dentro de cada caso de prueba en el reporte.

- **Generar y abrir el reporte interactivo local:**
  ```bash
  npx allure generate allure-results --clean -o allure-report
  npx allure open allure-report
  ```

- **Generar reporte autónomo en un solo archivo (ideal para adjuntar o compartir sin servidor):**
  ```bash
  npx allure generate allure-results --clean --single-file -o allure-report-standalone
  ```