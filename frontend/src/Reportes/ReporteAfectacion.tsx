import { Card, Col, DatePicker, Empty, Flex, Row, Select, Space, Spin, Table, Typography, message } from 'antd';
import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const { Title, Text } = Typography;

interface AfectacionDTO {
  id: number;
  personaId: number;
  inmuebleId: number;
  estado: 'BORRADOR' | 'PENDIENTE' | 'EN_REVISION' | 'APROBADA' | 'RECHAZADA' | 'CANCELADA';
  nroExpediente: string;
  fecha: string; // ISO yyyy-MM-dd
}

interface InmuebleDTO {
  id: number;
  matricula: string;
  nomenclatura: string;
  ciudadId: number;
  departamentoId: number;
}

interface DepartamentoDTO { id: number; nombre: string }

type YearMonth = { year: number; month: number };

function ymKey(ym: YearMonth) {
  return `${ym.year}-${String(ym.month).padStart(2, '0')}`;
}

const monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

const ReporteAfectacion = () => {
  const [loading, setLoading] = useState(true);
  const [afectaciones, setAfectaciones] = useState<AfectacionDTO[]>([]);
  const [inmuebles, setInmuebles] = useState<InmuebleDTO[]>([]);
  const [departamentos, setDepartamentos] = useState<DepartamentoDTO[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Filtros (opcionales)
  const [filterYear, setFilterYear] = useState<number | undefined>(undefined);
  const [filterMonth, setFilterMonth] = useState<number | undefined>(undefined);
  const [filterDepartamentoId, setFilterDepartamentoId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [aRes, iRes, dRes] = await Promise.all([
          axios.get('/afectaciones'),
          axios.get('/inmuebles'),
          axios.get('/departamentos'),
        ]);
        setAfectaciones(aRes.data);
        setInmuebles(iRes.data);
        setDepartamentos(dRes.data);
        setError(null);
      } catch (err: any) {
        if (axios.isAxiosError(err) && err.response?.status === 400 && (err.response.data as any)?.message === 'No hay información disponible') {
          setAfectaciones([]);
          setError(null);
        } else {
          console.error(err);
          setError('Error al cargar datos');
          message.error('Error al cargar datos del reporte');
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const inmueblesById = useMemo(() => {
    const map = new Map<number, InmuebleDTO>();
    inmuebles.forEach(i => map.set(i.id, i));
    return map;
  }, [inmuebles]);

  const departamentosById = useMemo(() => {
    const map = new Map<number, DepartamentoDTO>();
    departamentos.forEach(d => map.set(d.id, d));
    return map;
  }, [departamentos]);

  const filtered = useMemo(() => {
    return afectaciones.filter(a => {
      const d = new Date(a.fecha);
      const y = d.getFullYear();
      const m = d.getMonth() + 1;
      if (filterYear && y !== filterYear) return false;
      if (filterMonth && m !== filterMonth) return false;
      if (filterDepartamentoId) {
        const inm = inmueblesById.get(a.inmuebleId);
        if (!inm || inm.departamentoId !== filterDepartamentoId) return false;
      }
      return true;
    });
  }, [afectaciones, filterYear, filterMonth, filterDepartamentoId, inmueblesById]);

  // Agrupaciones
  const dataByYear = useMemo(() => {
    const map = new Map<number, number>();
    filtered.forEach(a => {
      const y = new Date(a.fecha).getFullYear();
      map.set(y, (map.get(y) ?? 0) + 1);
    });
    return Array.from(map.entries()).sort((a,b)=>a[0]-b[0]).map(([year, count]) => ({ key: String(year), year, count }));
  }, [filtered]);

  const dataByMonth = useMemo(() => {
    const map = new Map<string, { ym: YearMonth; count: number }>();
    filtered.forEach(a => {
      const d = new Date(a.fecha);
      const ym = { year: d.getFullYear(), month: d.getMonth() + 1 };
      const key = ymKey(ym);
      const item = map.get(key) ?? { ym, count: 0 };
      item.count += 1;
      map.set(key, item);
    });
    return Array.from(map.values())
      .sort((a,b)=> a.ym.year === b.ym.year ? a.ym.month - b.ym.month : a.ym.year - b.ym.year)
      .map(v => ({ key: ymKey(v.ym), year: v.ym.year, month: v.ym.month, monthName: monthNames[v.ym.month-1], count: v.count }));
  }, [filtered]);

  const dataByDepartamento = useMemo(() => {
    const map = new Map<number, number>();
    filtered.forEach(a => {
      const inm = inmueblesById.get(a.inmuebleId);
      if (!inm) return;
      const depId = inm.departamentoId;
      map.set(depId, (map.get(depId) ?? 0) + 1);
    });
    return Array.from(map.entries())
      .map(([depId, count]) => ({ key: String(depId), departamentoId: depId, departamento: departamentosById.get(depId)?.nombre ?? `ID ${depId}` , count }))
      .sort((a,b)=> a.departamento.localeCompare(b.departamento));
  }, [filtered, inmueblesById, departamentosById]);

  const yearsAvailable = useMemo(() => {
    const set = new Set<number>();
    afectaciones.forEach(a => set.add(new Date(a.fecha).getFullYear()));
    return Array.from(set.values()).sort((a,b)=>a-b);
  }, [afectaciones]);

  const monthOptions = useMemo(() => monthNames.map((name, idx) => ({ value: idx+1, label: name })), []);

  if (loading) {
    return <Flex align="center" justify="center" style={{ minHeight: '60vh' }}><Spin /></Flex>;
  }

  const noData = afectaciones.length === 0;

  return (
    <Space direction="vertical" style={{ width: '100%', padding: 16 }} size={16}>
      <Title level={2}>Reporte de Afectaciones de Vivienda</Title>
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
              onChange={(v) => setFilterYear(v)}
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
              onChange={(v) => setFilterMonth(v)}
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
              onChange={(v) => setFilterDepartamentoId(v)}
              optionFilterProp="label"
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
              <Table
                dataSource={dataByYear}
                pagination={false}
                size="small"
                columns={[
                  { title: 'Año', dataIndex: 'year' },
                  { title: 'Cantidad', dataIndex: 'count' },
                ]}
              />
            </Card>
          </Col>
          <Col span={24} md={12}>
            <Card title="Cantidad por Mes (Año-Mes)">
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
            </Card>
          </Col>
          <Col span={24}>
            <Card title="Cantidad por Departamento">
              <Table
                dataSource={dataByDepartamento}
                pagination={false}
                size="small"
                columns={[
                  { title: 'Departamento', dataIndex: 'departamento' },
                  { title: 'Cantidad', dataIndex: 'count' },
                ]}
              />
            </Card>
          </Col>
        </Row>
      )}
    </Space>
  );
};

export default ReporteAfectacion;
