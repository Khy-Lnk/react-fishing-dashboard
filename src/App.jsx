import { useState, useEffect } from 'react';
import './App.css';
import BuscadorFiltro from './components/BuscadorFiltro';
import ListaDesembarques from './components/ListaDesembarques';

function App() {
  const [desembarques, setDesembarques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // NUEVO: Estado para los lotes prioritarios. Inicializa leyendo el localStorage.
  const [prioritarios, setPrioritarios] = useState(() => {
    const guardados = localStorage.getItem('lotesPrioritarios');
    return guardados ? JSON.parse(guardados) : [];
  });

  // NUEVO: Cada vez que "prioritarios" cambie, guardamos el arreglo en localStorage
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

  // NUEVO: Función para agregar o quitar un ID de la lista de prioritarios
  const togglePrioridad = (id) => {
    if (prioritarios.includes(id)) {
      // Si ya estaba, lo quitamos (lo filtramos fuera del arreglo)
      setPrioritarios(prioritarios.filter(favId => favId !== id));
    } else {
      // Si no estaba, lo agregamos al arreglo
      setPrioritarios([...prioritarios, id]);
    }
  };

  return (
    <main style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto' }}>
      <header style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: '0', color: '#004aad' }}>Panel de Desembarques</h1>
        <h2 style={{ margin: '0', color: '#555', fontSize: '1.2rem' }}>Pesquera Talcahuano Sur SpA</h2>
      </header>

      <BuscadorFiltro />
      
      {loading && <p>Cargando lotes desde el muelle...</p>}
      {error && <p style={{ color: 'red', fontWeight: 'bold' }}>Error: {error}</p>}
      
      {!loading && !error && (
        <ListaDesembarques 
          datos={desembarques} 
          prioritarios={prioritarios} 
          togglePrioridad={togglePrioridad} 
        />
      )}
    </main>
  );
}

export default App;