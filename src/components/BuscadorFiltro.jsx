import { sanitizarEntrada } from '../utils/validator';

export default function BuscadorFiltro({ busqueda, setBusqueda, filtroEstado, setFiltroEstado }) {
  
  // Manejador del evento cuando el usuario escribe (R1, R5)
  const manejarCambioTexto = (e) => {
    const textoCrudo = e.target.value;
    const textoSeguro = sanitizarEntrada(textoCrudo); // Saneamos antes de guardar
    setBusqueda(textoSeguro);
  };

  return (
    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
      <h3 style={{ marginTop: '0' }}>Filtros de Búsqueda</h3>
      
      {/* Input para texto */}
      <input 
        type="text" 
        placeholder="Buscar por especie..." 
        value={busqueda}
        onChange={manejarCambioTexto}
        style={{ marginRight: '10px', padding: '8px', width: '200px', borderRadius: '4px', border: '1px solid #ccc' }}
      />
      
      {/* Selector para estado */}
      <select 
        value={filtroEstado} 
        onChange={(e) => setFiltroEstado(e.target.value)}
        style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
      >
        <option value="">Todos los estados</option>
        <option value="procesado">Procesado</option>
        <option value="pendiente">Pendiente</option>
        <option value="rechazado">Rechazado</option>
      </select>
    </div>
  );
}