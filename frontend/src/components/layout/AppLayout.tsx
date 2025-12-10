import { Layout, Menu, Typography } from 'antd';
import type { MenuProps } from 'antd';
import type { ReactNode } from 'react';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

export type AppMenuItem = Required<MenuProps>['items'][number];

type AppLayoutProps = {
  collapsed: boolean;
  onCollapse: (value: boolean) => void;
  menuItems: AppMenuItem[];
  selectedKeys: string[];
  onMenuClick: MenuProps['onClick'];
  children: ReactNode;
};

// Presentational component (dumb): only renders UI based on props
export default function AppLayout({
  collapsed,
  onCollapse,
  menuItems,
  selectedKeys,
  onMenuClick,
  children,
}: AppLayoutProps) {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={220}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: collapsed ? 'center' : 'flex-start', paddingInline: 12 }}>
          <Title level={collapsed ? 5 : 4} style={{ color: '#fff', margin: 0 }}>
            {collapsed ? 'RI' : 'Reg. Inmuebles'}
          </Title>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          items={menuItems}
          selectedKeys={selectedKeys}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>

        <Content style={{ margin: 16 }}>
          <div style={{ padding: 16, background: 'var(--ant-color-bg-container)', borderRadius: 8 }}>
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
