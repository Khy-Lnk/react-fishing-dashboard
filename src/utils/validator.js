// Función para sanear la entrada del usuario (Cumple R5 y R6)
export const sanitizarEntrada = (texto) => {
  if (!texto) return "";
  // Expresión regular: Solo permite letras (incluyendo acentos), números y espacios.
  // Elimina símbolos como < > / que se usan para inyectar código malicioso.
  return texto.replace(/[^a-zA-Z0-9 áéíóúÁÉÍÓÚñÑ]/g, "");
};
