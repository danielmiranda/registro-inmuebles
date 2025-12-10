import { Card, Col, Empty, Flex, Row, Segmented, Select, Space, Spin, Table, Typography } from 'antd';
import React from 'react';

const { Title, Text } = Typography;

export type YearMonthRow = { key: string; year: number; count: number };
export type MonthRow = { key: string; year: number; month: number; monthName: string; count: number };
export type DepartamentoRow = { key: string; departamentoId: number; departamento: string; count: number };

export interface DepartamentoDTO { id: number; nombre: string }

type Option = { value: number; label: string };

export type ViewMode = 'tabla' | 'grafico';

interface Props {
  // Filters and options
  yearsAvailable: number[];
  monthOptions: Option[];
  departamentos: DepartamentoDTO[];
  filterYear?: number;
  filterMonth?: number;
  filterDepartamentoId?: number;
  onChangeYear: (v: number | undefined) => void;
  onChangeMonth: (v: number | undefined) => void;
  onChangeDepartamento: (v: number | undefined) => void;

  // View mode
  viewMode: ViewMode;
  onChangeViewMode: (v: ViewMode) => void;

  // Data
  loading: boolean;
  error: string | null;
  noData: boolean;
  dataByYear: YearMonthRow[];
  dataByMonth: MonthRow[];
  dataByDepartamento: DepartamentoRow[];
}

type BarItem = { key: string; label: string; value: number };
const BarList = ({ items }: { items: BarItem[] }) => {
  if (!items.length) {
    return <Empty description="Sin datos para mostrar" />;
  }
  const max = Math.max(1, ...items.map(i => i.value));
  const chartHeight = 200;
  return (
    <div style={{ width: '100%', overflowX: 'auto', paddingBottom: 8 }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 12,
          height: chartHeight + 48, // espacio para labels/valores
        }}
      >
        {items.map(i => (
          <div key={i.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 52 }} title={`${i.label}: ${i.value}`}>
            <Text style={{ marginBottom: 6 }} strong>{i.value}</Text>
            <div
              style={{
                height: chartHeight,
                width: 28,
                background: '#f0f0f0',
                borderRadius: 6,
                display: 'flex',
                alignItems: 'flex-end',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: `${(i.value / max) * 100}%`,
                  width: '100%',
                  background: '#1677ff',
                  borderRadius: 6,
                  transition: 'height 0.2s ease',
                }}
              />
            </div>
            <Text
              style={{
                marginTop: 6,
                maxWidth: 64,
                textAlign: 'center',
                fontSize: 12,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              title={i.label}
            >
              {i.label}
            </Text>
          </div>
        ))}
      </div>
    </div>
  );
};

const ReporteAfectacionView: React.FC<Props> = ({
  yearsAvailable,
  monthOptions,
  departamentos,
  filterYear,
  filterMonth,
  filterDepartamentoId,
  onChangeYear,
  onChangeMonth,
  onChangeDepartamento,
  viewMode,
  onChangeViewMode,
  loading,
  error,
  noData,
  dataByYear,
  dataByMonth,
  dataByDepartamento,
}) => {
  if (loading) {
    return <Flex align="center" justify="center" style={{ minHeight: '60vh' }}><Spin /></Flex>;
  }

  return (
    <Space direction="vertical" style={{ width: '100%', padding: 16 }} size={16}>
      <Card size="small">
        <Space wrap>
          <div>
            <Text strong>Año:</Text>
            <Select
              allowClear
              placeholder="Todos"
              style={{ width: 160, marginLeft: 8 }}
              options={yearsAvailable.map(y => ({ value: y, label: String(y) }))}
              value={filterYear}
              onChange={(v) => onChangeYear(v)}
            />
          </div>
          <div>
            <Text strong>Mes:</Text>
            <Select
              allowClear
              placeholder="Todos"
              style={{ width: 180, marginLeft: 8 }}
              options={monthOptions}
              value={filterMonth}
              onChange={(v) => onChangeMonth(v)}
            />
          </div>
          <div>
            <Text strong>Departamento:</Text>
            <Select
              allowClear
              showSearch
              placeholder="Todos"
              style={{ width: 260, marginLeft: 8 }}
              options={departamentos.map(d => ({ value: d.id, label: d.nombre }))}
              value={filterDepartamentoId}
              onChange={(v) => onChangeDepartamento(v)}
              optionFilterProp="label"
            />
          </div>
          <div>
            <Text strong>Vista:</Text>
            <Segmented
              style={{ marginLeft: 8 }}
              options={[
                { label: 'Tabla', value: 'tabla' },
                { label: 'Gráfico', value: 'grafico' },
              ]}
              value={viewMode}
              onChange={(v) => onChangeViewMode(v as ViewMode)}
            />
          </div>
        </Space>
      </Card>

      {error && <Text type="danger">{error}</Text>}

      {noData ? (
        <Empty description="No hay afectaciones registradas" />
      ) : (
        <Row gutter={[16, 16]}>
          <Col span={24} md={12}>
            <Card title="Cantidad por Año">
              {viewMode === 'tabla' ? (
                <Table
                  dataSource={dataByYear}
                  pagination={false}
                  size="small"
                  columns={[
                    { title: 'Año', dataIndex: 'year' },
                    { title: 'Cantidad', dataIndex: 'count' },
                  ]}
                />
              ) : (
                <BarList items={dataByYear.map(d => ({ key: d.key, label: String(d.year), value: d.count }))} />
              )}
            </Card>
          </Col>
          <Col span={24} md={12}>
            <Card title="Cantidad por Mes (Año-Mes)">
              {viewMode === 'tabla' ? (
                <Table
                  dataSource={dataByMonth}
                  pagination={false}
                  size="small"
                  columns={[
                    { title: 'Año', dataIndex: 'year' },
                    { title: 'Mes', dataIndex: 'monthName' },
                    { title: 'Cantidad', dataIndex: 'count' },
                  ]}
                />
              ) : (
                <BarList items={dataByMonth.map(d => ({ key: d.key, label: `${d.monthName} ${d.year}`, value: d.count }))} />
              )}
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Cantidad por Departamento">
              {viewMode === 'tabla' ? (
                <Table
                  dataSource={dataByDepartamento}
                  pagination={false}
                  size="small"
                  columns={[
                    { title: 'Departamento', dataIndex: 'departamento' },
                    { title: 'Cantidad', dataIndex: 'count' },
                  ]}
                />
              ) : (
                <BarList items={dataByDepartamento.map(d => ({ key: d.key, label: d.departamento, value: d.count }))} />
              )}
            </Card>
          </Col>
        </Row>
      )}
    </Space>
  );
};

export default ReporteAfectacionView;
