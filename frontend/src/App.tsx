import { Layout, Typography, ConfigProvider, theme, Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cities from './components/CitiesContainer';
import InmuebleContainer from './Inmuebles/InmuebleContainer.tsx';
import PersonaContainer from './Personas/PersonaContainer.tsx';
import TitularidadContainer from './components/TitularidadContainer';
import AfectacionContainer from './components/AfectacionContainer';
import TitularidadPorInmuebleContainer from './Inmuebles/TitularidadPorInmuebleContainer.tsx';

const { Title } = Typography;

function Home() {
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
      <Title level={1}>Registro Inmuebles</Title>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
        <Link to="/titularidades">Inmuebles por Persona</Link>
        <Link to="/titularidades-inmueble">Listar y Asociar Titulares a un Inmueble</Link>
        <Link to="/afectacion">Afectación a Vivienda (Bien de Familia)</Link>
          <p>Tablas parametricas</p>
        <Link to="/inmuebles">Ver Inmuebles</Link>
        <Link to="/ciudades">Ver Ciudades</Link>
        <Link to="/personas">Ver Personas</Link>



      </div>
    </Layout>
  );
}

function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('app-theme');
    if (saved === 'dark') return true;
    if (saved === 'light') return false;
    // Fallback to system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('app-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  // Compute Ant Design algorithm based on theme
  const algorithm = useMemo(() => (isDark ? theme.darkAlgorithm : theme.defaultAlgorithm), [isDark]);


  return (
    <ConfigProvider theme={{ algorithm }}>
      {/* Toggle colocado fijo en la esquina superior derecha */}
      <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1000 }}>
        <Button
          type="text"
          shape="circle"
          icon={isDark ? <SunOutlined /> : <MoonOutlined />}
          onClick={() => setIsDark(!isDark)}
          style={{
              backgroundColor: isDark ? "#333" : "#BBB",
              color: isDark ? "#fff" : "#000",
              border: "0"
          }}
        />
      </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inmuebles" element={<InmuebleContainer />} />
          <Route path="/ciudades" element={<Cities />} />
          <Route path="/personas" element={<PersonaContainer />} />
          <Route path="/titularidades" element={<TitularidadContainer />} />
          <Route path="/titularidades-inmueble" element={<TitularidadPorInmuebleContainer />} />
          <Route path="/afectacion" element={<AfectacionContainer />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
