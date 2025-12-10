import { Typography, ConfigProvider, theme, Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cities from './Ubicacion/CitiesContainer.tsx';
import InmuebleContainer from './Inmuebles/InmuebleContainer.tsx';
import PersonaContainer from './Personas/PersonaContainer.tsx';
import TitularidadContainer from './Titularidad/TitularidadContainer.tsx';
import AfectacionContainer from './Afectacion/AfectacionContainer.tsx';
import TitularidadPorInmuebleContainer from './Inmuebles/TitularidadPorInmuebleContainer.tsx';
import ReporteAfectacionContainer from './Reportes/ReporteAfectacionContainer.tsx';
import AppLayoutContainer from './components/layout/AppLayoutContainer.tsx';

const { Title } = Typography;

function Home() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', width: '100%', flexDirection: 'column', padding: 24, gap: 24 }}>

      <div style={{ width: '100%', maxWidth: 1200 }}>
        <Title level={3} style={{ margin: '16px 0' }}>Reporte de Afectaciones</Title>
        <ReporteAfectacionContainer />
      </div>
    </div>
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
        <AppLayoutContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/inmuebles" element={<InmuebleContainer />} />
            <Route path="/ciudades" element={<Cities />} />
            <Route path="/personas" element={<PersonaContainer />} />
            <Route path="/titularidades" element={<TitularidadContainer />} />
            <Route path="/titularidades-inmueble" element={<TitularidadPorInmuebleContainer />} />
            <Route path="/afectacion" element={<AfectacionContainer />} />
            <Route path="/reportes/afectacion" element={<ReporteAfectacionContainer />} />
          </Routes>
        </AppLayoutContainer>
      </Router>
    </ConfigProvider>
  )
}

export default App
