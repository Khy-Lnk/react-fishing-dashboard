# Panel de Desembarques - Pesquera Talcahuano Sur SpA

Este proyecto consiste en una aplicación web Single Page Application (SPA) desarrollada en React utilizando Vite. Su objetivo principal es automatizar y digitalizar el control de los desembarques diarios de recursos pelágicos en la bahía de Talcahuano (Región del Biobío), reemplazando el uso de planillas Excel tradicionales para optimizar los tiempos del equipo de operaciones.

---

## R1. Identificación de Elementos de React

En el desarrollo de este panel web se identificaron y aplicaron los siguientes conceptos fundamentales de React:

* **Componentes:** Se estructuró la interfaz de forma modular y reutilizable. `App.jsx` actúa como el componente cerebro u orquestador principal. Dentro de la carpeta `components/` se crearon `BuscadorFiltro.jsx` (para gestionar la barra de herramientas), `ListaDesembarques.jsx` (que actúa como el contenedor de la tabla estructural) y `FilaDesembarque.jsx` (que renderiza de forma atómica cada lote de pescado).
* **Props (Propiedades):** Se utilizaron para transferir datos de forma unidireccional desde el componente padre hacia los componentes hijos. Por ejemplo, `App.jsx` le pasa el arreglo de datos filtrados (`datos`), el estado de favoritos (`prioritarios`) y la función manejadora (`togglePrioridad`) al componente `ListaDesembarques`, el cual a su vez los distribuye a cada `FilaDesembarque`.
* **Estado (`useState`):** Permite a los componentes reaccionar de manera dinámica ante los cambios del usuario o la API. Se implementaron estados para almacenar los desembarques traídos de la API (`desembarques`), controlar los flujos de la interfaz (`loading` y `error`), capturar los inputs del operador (`busqueda` y `filtroEstado`) y persistir los lotes críticos (`prioritarios`).
* **Efectos (`useEffect`):** Se emplearon dos hooks de efectos en `App.jsx`. El primero ejecuta de forma asíncrona la petición `fetch` al endpoint del servidor al momento de montarse la aplicación por primera vez. El segundo se encarga de escuchar los cambios en el estado de prioridades para actualizar automáticamente el almacenamiento del navegador.
* **JSX:** Sintaxis de extensión de JavaScript que permitió combinar la lógica de programación con la estructura HTML de la tabla de operaciones y los controles del buscador de forma declarativa y legible.
* **Manejo de Eventos:** Se capturaron las acciones interactivas del operador mediante los atributos `onChange` en el cuadro de búsqueda de especies y en el selector de estados, además de un evento `onClick` en el botón de la fila para conmutar la prioridad del lote.

### Uso de Inteligencia Artificial (GitHub Copilot)
* **Sugerencia de GitHub Copilot recibida (Transcripción):**
     Al inicializar el estado de los lotes prioritarios, Copilot sugirió implementar una función de inicialización perezosa (lazy initialization):
     ```javascript
     const [prioritarios, setPrioritarios] = useState(() => {
       const guardados = localStorage.getItem('lotesPrioritarios');
       return guardados ? JSON.parse(guardados) : [];
     });
     ```
* **Comentario de aceptación/modificación:** Acepté completamente la sugerencia de GitHub Copilot debido a que optimiza el rendimiento. Al pasar una función anónima al `useState`, la lectura del `localStorage` (que es una operación de E/S síncrona y costosa) ocurre una sola vez cuando el componente se monta, en lugar de ejecutarse innecesariamente en cada renderizado de la aplicación.

---

## R5, R6 y R7. Buenas Prácticas de Desarrollo Seguro y Análisis de IA

El proyecto fue analizado utilizando la extensión **SonarLint** en Visual Studio Code para garantizar la calidad del código y la seguridad de la aplicación frente a vulnerabilidades comunes del desarrollo FrontEnd.

### Hallazgos de SonarLint y Correcciones Aplicadas:

1.  **Hallazgo 1: Code Smell / Vulnerabilidad Potencial (Cross-Site Scripting - XSS)**
    * *Descripción:* SonarLint alertó sobre el riesgo de inyección de contenido no saneado si se enlazaba el valor directo de un campo de texto crudo (`input`) en operaciones de filtrado o renderizado dinámico en el DOM, violando los principios de confianza cero en las entradas del usuario.
    * *Corrección aplicada:* Se creó un módulo de seguridad en `src/utils/validator.js` con la función `sanitizarEntrada()`. Esta función utiliza una expresión regular (`/[^a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]/g`) para eliminar cualquier carácter especial o etiquetas sospechosas (`<script>`, `/`, etc.) antes de que el texto actualice el estado del componente.

2.  **Hallazgo 2: Code Smell (Maintainability - Component Key inside Loops)**
    * *Descripción:* Al renderizar la lista iterativa con `.map()`, SonarLint detectó la ausencia de una clave única y estable para los elementos hijos de la tabla, advirtiendo que usar el índice del arreglo podría romper el algoritmo de reconciliación de React y generar bugs visuales al filtrar elementos.
    * *Corrección aplicada:* Se corrigió el archivo `ListaDesembarques.jsx` asignando explícitamente el identificador único proveniente de la base de datos de la empresa: `<FilaDesembarque key={lote.id} lote={lote} />`, asegurando un renderizado óptimo y seguro.

### Otras Prácticas de Seguridad Implementadas (R6):
* **Uso de Variables de Entorno:** La URL del servicio REST (`http://localhost:3001/desembarques`) no fue expuesta ("quemada") en el código fuente. Se aisló de forma segura mediante el archivo `.env` utilizando el prefijo obligatorio de Vite: `import.meta.env.VITE_API_URL`.
* **Manejo Defensivo de Errores:** Se envolvió la petición en bloques `try/catch` evaluando la propiedad `respuesta.ok`. Si el servidor de datos (`json-server`) se cae o responde con un código de error, el estado muta para mostrar un mensaje amigable al operador en lugar de colapsar la pantalla en blanco.
