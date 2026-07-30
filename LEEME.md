# Landings Dashboard - Pesquera Talcahuano Sur SpA

This project consists of a Single Page Application (SPA) developed in React using Vite. Its main objective is to automate and digitize the control of daily pelagic resource landings in the Bay of Talcahuano (Biobío Region), replacing the use of traditional Excel spreadsheets to optimize the operations team's workflow.

---

## R1. Identification of React Elements

During the development of this web dashboard, the following fundamental React concepts were identified and applied:

* **Components:** The interface was structured in a modular and reusable way. `App.jsx` acts as the brain or main orchestrator component. Inside the `components/` folder, we created `BuscadorFiltro.jsx` (to manage the toolbar), `ListaDesembarques.jsx` (which acts as the structural table container), and `FilaDesembarque.jsx` (which atomically renders each fish batch).
* **Props (Properties):** Used to transfer data unidirectionally from the parent component down to the child components. For example, `App.jsx` passes the filtered data array (`datos`), the favorites state (`prioritarios`), and the handler function (`togglePrioridad`) to the `ListaDesembarques` component, which in turn distributes them to each `FilaDesembarque`.
* **State (`useState`):** Allows components to react dynamically to user or API changes. States were implemented to store the landings fetched from the API (`desembarques`), control interface flows (`loading` and `error`), capture operator inputs (`busqueda` and `filtroEstado`), and persist critical batches (`prioritarios`).
* **Effects (`useEffect`):** Two effect hooks were used in `App.jsx`. The first asynchronously executes the `fetch` request to the server endpoint when the application mounts for the first time. The second is in charge of listening to changes in the priorities state to automatically update the browser's storage.
* **JSX:** JavaScript syntax extension that allowed combining programming logic with the HTML structure of the operations table and the search controls in a declarative and readable way.
* **Event Handling:** The operator's interactive actions were captured using `onChange` attributes in the species search box and the status selector, as well as an `onClick` event on the row button to toggle the batch's priority.

### Use of Artificial Intelligence (GitHub Copilot)
* **GitHub Copilot suggestion received (Transcription):**
     When initializing the priority batches state, Copilot suggested implementing lazy initialization:
     ```javascript
     const [prioritarios, setPrioritarios] = useState(() => {
       const guardados = localStorage.getItem('lotesPrioritarios');
       return guardados ? JSON.parse(guardados) : [];
     });
     ```
* **Acceptance/Modification comment:** I fully accepted GitHub Copilot's suggestion because it optimizes performance. By passing an anonymous function to `useState`, the `localStorage` read (which is a synchronous and expensive I/O operation) occurs only once when the component mounts, instead of executing unnecessarily on every render of the application.

---

## R5, R6, and R7. Secure Development Practices and AI Analysis

The project was analyzed using the **SonarLint** extension in Visual Studio Code to ensure code quality and application security against common FrontEnd development vulnerabilities.

### SonarLint Findings and Applied Fixes:

1.  **Finding 1: Code Smell / Potential Vulnerability (Cross-Site Scripting - XSS)**
    * *Description:* SonarLint warned about the risk of unsanitized content injection if the direct value of a raw text field (`input`) was bound in dynamic filtering or rendering operations in the DOM, violating zero-trust principles for user inputs.
    * *Applied Fix:* A security module was created in `src/utils/validator.js` with the `sanitizarEntrada()` function. This function uses a regular expression (`/[^a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]/g`) to remove any special characters or suspicious tags (`<script>`, `/`, etc.) before the text updates the component's state.

2.  **Finding 2: Code Smell (Maintainability - Component Key inside Loops)**
    * *Description:* When rendering the iterative list with `.map()`, SonarLint detected the absence of a unique and stable key for the table's child elements, warning that using the array index could break React's reconciliation algorithm and generate visual bugs when filtering elements.
    * *Applied Fix:* The `ListaDesembarques.jsx` file was corrected by explicitly assigning the unique identifier coming from the company's database: `<FilaDesembarque key={lote.id} lote={lote} />`, ensuring optimal and secure rendering.

### Other Security Practices Implemented (R6):
* **Use of Environment Variables:** The REST service URL (`http://localhost:3001/desembarques`) was not exposed ("hardcoded") in the source code. It was safely isolated through the `.env` file using the mandatory Vite prefix: `import.meta.env.VITE_API_URL`.
* **Defensive Error Handling:** The request was wrapped in `try/catch` blocks evaluating the `respuesta.ok` property. If the data server (`json-server`) crashes or responds with an error code, the state mutates to show a friendly message to the operator instead of collapsing the screen into a blank page.

## Author:
* **Yerko T. Hermosilla** - *FrontEnd Development & React Architecture* - [GitHub Profile](https://github.com/Khy-Lnk)

<img width="1908" height="881" alt="react-fishing-dashboard" src="https://github.com/user-attachments/assets/1a9b667f-e3f7-4897-a26b-3bfe8404cedc" />
