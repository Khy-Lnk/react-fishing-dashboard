// Recibimos las nuevas props
export default function FilaDesembarque({ lote, esPrioritario, togglePrioridad }) {
  // Un color de fondo condicional para resaltar la fila
  const estiloFila = {
    backgroundColor: esPrioritario ? '#fff9c4' : 'transparent',
    transition: 'background-color 0.3s'
  };

  return (
    <tr style={estiloFila}>
      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{lote.id}</td>
      <td style={{ padding: '8px', borderBottom: '1px solid #ddd', fontWeight: 'bold' }}>{lote.especie}</td>
      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{lote.embarcacion}</td>
      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{lote.fecha}</td>
      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>{lote.kilos} kg</td>
      <td style={{ padding: '8px', borderBottom: '1px solid #ddd', textTransform: 'capitalize' }}>
        {lote.estado}
      </td>
      <td style={{ padding: '8px', borderBottom: '1px solid #ddd' }}>
        <button 
          onClick={() => togglePrioridad(lote.id)}
          style={{ 
            cursor: 'pointer', 
            backgroundColor: esPrioritario ? '#fbc02d' : '#f0f0f0', 
            border: '1px solid #ccc', 
            padding: '5px',
            fontWeight: esPrioritario ? 'bold' : 'normal'
          }}
        >
          {esPrioritario ? '⭐ Prioritario' : 'Marcar Prioridad'}
        </button>
      </td>
    </tr>
  );
}