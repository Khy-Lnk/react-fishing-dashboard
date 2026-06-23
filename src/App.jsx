import { useState, useEffect } from 'react';
import './App.css';
import BuscadorFiltro from './components/BuscadorFiltro';
import ListaDesembarques from './components/ListaDesembarques';

function App() {
  const [desembarques, setDesembarques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NUEVO: Estados para manejar los filtros de búsqueda
  const [busqueda, setBusqueda] = useState('');
  const [filtroEstado, setFiltroEstado] = useState('');

  const [prioritarios, setPrioritarios] = useState(() => {
    const guardados = localStorage.getItem('lotesPrioritarios');
    return guardados ? JSON.parse(guardados) : [];
  });

  useEffect(() => {
    localStorage.setItem('lotesPrioritarios', JSON.stringify(prioritarios));
  }, [prioritarios]);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const url = import.meta.env.VITE_API_URL;
        const respuesta = await fetch(url);
        if (!respuesta.ok) throw new Error('Error al conectar con el servidor de la pesquera');
        
        const datos = await respuesta.json();
        setDesembarques(datos);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    obtenerDatos();
  }, []);

  const togglePrioridad = (id) => {
    if (prioritarios.includes(id)) {
      setPrioritarios(prioritarios.filter(favId => favId !== id));
    } else {
      setPrioritarios([...prioritarios, id]);
    }
  };

  // NUEVO: Lógica que cruza los datos con lo que el usuario busca (ignorando mayúsculas/minúsculas)
  const desembarquesFiltrados = desembarques.filter((lote) => {
    const coincideEspecie = lote.especie.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtroEstado === '' || lote.estado === filtroEstado;
    return coincideEspecie && coincideEstado;
  });

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: '0', color: '#004aad' }}>Panel de Desembarques</h1>
        <h2 style={{ margin: '0', color: '#555', fontSize: '1.2rem' }}>Pesquera Talcahuano Sur SpA</h2>
      </header>

      {/* Pasamos los estados y funciones al buscador */}
      <BuscadorFiltro 
        busqueda={busqueda} 
        setBusqueda={setBusqueda}
        filtroEstado={filtroEstado}
        setFiltroEstado={setFiltroEstado}
      />
      
      {loading && <p>Cargando lotes desde el muelle...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}
      
      {/* Pasamos la lista YA FILTRADA a la tabla */}
      {!loading && !error && (
        <ListaDesembarques 
          datos={desembarquesFiltrados} 
          prioritarios={prioritarios} 
          togglePrioridad={togglePrioridad} 
        />
      )}
    </main>
  );
}

export default App;