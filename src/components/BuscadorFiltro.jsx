export default function BuscadorFiltro() {
  return (
    <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px' }}>
      <h3>Filtros de Búsqueda</h3>
      <input 
        type="text" 
        placeholder="Buscar por especie..." 
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <select style={{ padding: '5px' }}>
        <option value="">Todos los estados</option>
        <option value="procesado">Procesado</option>
        <option value="pendiente">Pendiente</option>
        <option value="rechazado">Rechazado</option>
      </select>
    </div>
  );
}