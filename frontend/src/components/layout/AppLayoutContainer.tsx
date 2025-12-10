import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { MenuProps } from 'antd';
import {
    HomeOutlined, ApartmentOutlined, TeamOutlined, IdcardOutlined, EnvironmentOutlined,
    HomeFilled
} from '@ant-design/icons';
import AppLayout, { type AppMenuItem } from './AppLayout';
import type { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Container component: holds state and navigation logic
export default function AppLayoutContainer({ children }: Props) {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const items: AppMenuItem[] = useMemo(() => [
    { key: '/', icon: <HomeFilled />, label: 'Inicio' },
    { key: '/titularidades', icon: <IdcardOutlined />, label: 'Inmuebles por Persona' },
    { key: '/titularidades-inmueble', icon: <TeamOutlined />, label: 'Titulares por Inmueble' },
    { key: '/afectacion', icon: <HomeOutlined />, label: 'Afectación Vivienda' },
    { key: '/inmuebles', icon: <ApartmentOutlined />, label: 'Inmuebles' },
    { key: '/ciudades', icon: <EnvironmentOutlined />, label: 'Ciudades' },
    { key: '/personas', icon: <TeamOutlined />, label: 'Personas' },
  ], []);

  const keys = items?.map(i => (i as any).key) as string[];
  const currentPath = location.pathname;
  const selected = keys.includes(currentPath)
    ? [currentPath]
    : keys.find(k => currentPath.startsWith(k) && k !== '/')
      ? [keys.find(k => currentPath.startsWith(k) && k !== '/') as string]
      : ['/'];

  const onClick: MenuProps['onClick'] = (info) => {
    navigate(info.key);
  };

  return (
    <AppLayout
      collapsed={collapsed}
      onCollapse={setCollapsed}
      menuItems={items}
      selectedKeys={selected}
      onMenuClick={onClick}
    >
      {children}
    </AppLayout>
  );
}
