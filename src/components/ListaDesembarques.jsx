import FilaDesembarque from './FilaDesembarque';

// Ahora recibimos las nuevas funciones desde App
export default function ListaDesembarques({ datos, prioritarios, togglePrioridad }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
      <thead>
        <tr style={{ backgroundColor: '#004aad', color: 'white' }}>
          <th style={{ padding: '10px' }}>ID</th>
          <th style={{ padding: '10px' }}>Especie</th>
          <th style={{ padding: '10px' }}>Embarcación</th>
          <th style={{ padding: '10px' }}>Fecha</th>
          <th style={{ padding: '10px' }}>Kilos</th>
          <th style={{ padding: '10px' }}>Estado</th>
          <th style={{ padding: '10px' }}>Acción</th>
        </tr>
      </thead>
      <tbody>
        {datos.map((lote) => (
          <FilaDesembarque 
            key={lote.id} 
            lote={lote} 
            // Comprobamos si el ID de este lote está en el arreglo de guardados
            esPrioritario={prioritarios.includes(lote.id)} 
            togglePrioridad={togglePrioridad} 
          />
        ))}
      </tbody>
    </table>
  );
}