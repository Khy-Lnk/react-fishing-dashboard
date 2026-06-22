import FilaDesembarque from './FilaDesembarque';

export default function ListaDesembarques() {
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
        {/* Renderizamos 3 filas de prueba estáticas para ver cómo luce */}
        <FilaDesembarque />
        <FilaDesembarque />
        <FilaDesembarque />
      </tbody>
    </table>
  );
}