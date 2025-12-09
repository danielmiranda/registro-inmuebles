import { Layout, Typography, ConfigProvider, theme, Button } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Cities from './components/CitiesContainer';

const { Title } = Typography;

function Home() {
  return (
    <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', flexDirection: 'column' }}>
      <Title level={1}>Registro Inmuebles</Title>
      <Link to="/ciudades">Ver Ciudades</Link>
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
          <Route path="/ciudades" element={<Cities />} />
        </Routes>
      </Router>
    </ConfigProvider>
  )
}

export default App
