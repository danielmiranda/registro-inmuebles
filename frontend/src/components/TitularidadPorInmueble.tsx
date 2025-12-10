import React, { useEffect, useMemo, useState } from 'react';
import { Layout, Typography, Alert, Spin, Card, Space, Select, Button, Table, InputNumber, Tag, Modal, message } from 'antd';
import { PlusOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import InmuebleFormModal, { type InmuebleFormValues } from './InmuebleFormModal';

const { Title, Text } = Typography;
const { Option } = Select;
const { confirm } = Modal;

export interface OptionItem { value: number; label: string }

export interface TitularidadRow {
  id: number;
  personaId: number;
  inmuebleId: number;
  numerador: number;
  denominador: number;
  porcentaje: number;
}

export interface TitularidadDraftRow {
  personaId: number;
  numerador: number;
  denominador: number;
}

interface Props {
  loading: boolean;
  listLoading: boolean;
  formLoading: boolean;
  error: string | null;
  noData?: boolean;
  selectedInmuebleId: number | null;
  inmuebleOptions: OptionItem[];
  personaOptions: OptionItem[];
  titulares: TitularidadRow[];
  ciudadOptions: OptionItem[];
  departamentoOptions: OptionItem[];
  onChangeInmueble: (id: number | null) => void;
  onCreateInmueble: (values: InmuebleFormValues) => Promise<{ id: number } | void> | void;
  onSubmitTitularidades: (rows: TitularidadDraftRow[]) => Promise<void> | void;
  onDeleteTitularidad: (id: number) => Promise<void> | void;
}

const TitularidadPorInmueble: React.FC<Props> = ({
  loading,
  listLoading,
  formLoading,
  error,
  noData = false,
  selectedInmuebleId,
  inmuebleOptions,
  personaOptions,
  titulares,
  ciudadOptions,
  departamentoOptions,
  onChangeInmueble,
  onCreateInmueble,
  onSubmitTitularidades,
  onDeleteTitularidad,
}) => {
  const [showInmuebleModal, setShowInmuebleModal] = useState(false);
  const [draftRows, setDraftRows] = useState<TitularidadDraftRow[]>([]);
  const [personaToAdd, setPersonaToAdd] = useState<number | undefined>(undefined);

  const personaLabel = useMemo(() => {
    const map = new Map(personaOptions.map(o => [o.value, o.label]));
    return (id: number) => map.get(id) || id;
  }, [personaOptions]);

  useEffect(() => {
    // Clear draft when inmueble changes
    setDraftRows([]);
    setPersonaToAdd(undefined);
  }, [selectedInmuebleId]);

  const addPersona = () => {
    if (!personaToAdd) return;
    if (draftRows.some(r => r.personaId === personaToAdd)) {
      message.warning('La persona ya fue agregada');
      return;
    }
    setDraftRows([...draftRows, { personaId: personaToAdd, numerador: 1, denominador: 1 }]);
    setPersonaToAdd(undefined);
  };

  const removeDraft = (personaId: number) => setDraftRows(draftRows.filter(r => r.personaId !== personaId));

  const updateDraft = (personaId: number, patch: Partial<TitularidadDraftRow>) => {
    setDraftRows(draftRows.map(r => (r.personaId === personaId ? { ...r, ...patch } : r)));
  };

  const totalFraccion = useMemo(() => draftRows.reduce((acc, r) => acc + (r.numerador > 0 && r.denominador > 0 ? r.numerador / r.denominador : 0), 0), [draftRows]);
  const totalPct = totalFraccion * 100;
  const isTotalOk = Math.abs(totalFraccion - 1) < 1e-9 && draftRows.length > 0; // exactly 100%

  const submitDraft = async () => {
    if (!isTotalOk) return;
    await onSubmitTitularidades(draftRows);
    setDraftRows([]);
    message.success('Titularidades guardadas');
  };

  const confirmDelete = (record: TitularidadRow) => {
    confirm({
      title: '¿Eliminar titularidad?',
      icon: <ExclamationCircleOutlined />,
      content: `Se eliminará la titularidad de ${personaLabel(record.personaId)} (${record.numerador}/${record.denominador}).`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        await onDeleteTitularidad(record.id);
        message.success('Titularidad eliminada');
      }
    });
  };

  const titularesColumns = [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Persona', key: 'persona', render: (_: any, r: TitularidadRow) => personaLabel(r.personaId) },
    { title: 'Fracción', key: 'fraccion', render: (_: any, r: TitularidadRow) => `${r.numerador}/${r.denominador}` },
    { title: 'Porcentaje', dataIndex: 'porcentaje', key: 'porcentaje', render: (v: number) => `${v.toFixed(2)}%` },
    { title: 'Acciones', key: 'actions', width: 130, render: (_: any, r: TitularidadRow) => (
      <Button danger icon={<DeleteOutlined />} onClick={() => confirmDelete(r)}>Eliminar</Button>
    )},
  ];

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spin size="large" />
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Alert message={error} type="error" />
      </Layout>
    );
  }

  return (
    <Layout style={{ padding: 24 }}>
      <Card style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={3} style={{ margin: 0 }}>Asociar titularidades a Inmuebles</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div>
              <span style={{ marginRight: 8 }}>Inmueble:</span>
              <Select
                showSearch
                placeholder="Seleccione un inmueble"
                value={selectedInmuebleId as number | undefined}
                onChange={(v) => onChangeInmueble(v)}
                allowClear
                style={{ minWidth: 360 }}
                optionFilterProp="children"
                filterOption={(input, option) => String(option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
              >
                {inmuebleOptions.map(o => (
                  <Option key={o.value} value={o.value}>{o.label}</Option>
                ))}
              </Select>
            </div>
            <Button icon={<PlusOutlined />} onClick={() => setShowInmuebleModal(true)}>Crear inmueble</Button>
          </div>
        </Space>
      </Card>

      {selectedInmuebleId == null ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Alert message="Seleccione un inmueble para gestionar sus titularidades" type="info" showIcon />
        </div>
      ) : (
        <Space direction="vertical" style={{ width: '100%' }} size={16}>
          <Card title="Agregar titulares (hasta completar 100%)">
            <Space direction="vertical" style={{ width: '100%' }} size={12}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <Select
                  showSearch
                  placeholder="Seleccione una persona"
                  value={personaToAdd as number | undefined}
                  onChange={setPersonaToAdd}
                  style={{ minWidth: 360 }}
                  optionFilterProp="children"
                  filterOption={(input, option) => String(option?.children ?? '').toLowerCase().includes(input.toLowerCase())}
                >
                  {personaOptions.map(o => (
                    <Option key={o.value} value={o.value}>{o.label}</Option>
                  ))}
                </Select>
                <Button type="primary" icon={<PlusOutlined />} onClick={addPersona} disabled={!personaToAdd}>Agregar</Button>
              </div>

              {draftRows.length === 0 ? (
                <Alert message="Agregue personas y defina su fracción" type="info" />
              ) : (
                <Table
                  rowKey={(r) => r.personaId}
                  pagination={false}
                  dataSource={draftRows}
                  columns={[
                    { title: 'Persona', key: 'persona', render: (_: any, r: TitularidadDraftRow) => personaLabel(r.personaId) },
                    { title: 'Numerador', key: 'numerador', width: 160, render: (_: any, r: TitularidadDraftRow) => (
                      <InputNumber min={1} value={r.numerador} onChange={(v) => updateDraft(r.personaId, { numerador: Number(v) || 0 })} style={{ width: '100%' }} />
                    )},
                    { title: 'Denominador', key: 'denominador', width: 160, render: (_: any, r: TitularidadDraftRow) => (
                      <InputNumber min={1} value={r.denominador} onChange={(v) => updateDraft(r.personaId, { denominador: Number(v) || 0 })} style={{ width: '100%' }} />
                    )},
                    { title: 'Porcentaje', key: 'porcentaje', width: 140, render: (_: any, r: TitularidadDraftRow) => {
                      const pct = r.denominador > 0 ? (r.numerador / r.denominador) * 100 : 0;
                      return <span>{pct.toFixed(2)}%</span>;
                    }},
                    { title: 'Acciones', key: 'actions', width: 120, render: (_: any, r: TitularidadDraftRow) => (
                      <Button danger icon={<DeleteOutlined />} onClick={() => removeDraft(r.personaId)}>Quitar</Button>
                    )},
                  ]}
                />
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <Text>Total:</Text> {isNaN(totalPct) ? '0.00%' : totalPct.toFixed(2) + '%'} {' '}
                  {isTotalOk ? <Tag color="green">100% OK</Tag> : <Tag color="orange">Debe sumar 100%</Tag>}
                </div>
                <div>
                  <Button type="primary" onClick={submitDraft} loading={formLoading} disabled={!isTotalOk}>Guardar titularidades</Button>
                </div>
              </div>
            </Space>
          </Card>

          <Card title="Titulares actuales del inmueble">
            {listLoading ? (
              <div style={{ textAlign: 'center', padding: 24 }}><Spin /></div>
            ) : noData ? (
              <div style={{ textAlign: 'center', padding: 24 }}>
                <Title level={5} style={{ margin: 0 }}>El inmueble no tiene titulares registrados</Title>
              </div>
            ) : (
              <Table rowKey="id" columns={titularesColumns as any} dataSource={titulares} pagination={{ pageSize: 10 }} />
            )}
          </Card>
        </Space>
      )}

      <InmuebleFormModal
        open={showInmuebleModal}
        loading={formLoading}
        onCancel={() => setShowInmuebleModal(false)}
        onSubmit={async (values) => {
          try {
            const created = await onCreateInmueble(values);
            setShowInmuebleModal(false);
            if (created && (created as any).id) {
              message.success('Inmueble creado');
            }
          } catch (e: any) {
            message.error(e?.message || 'No se pudo crear el inmueble');
          }
        }}
        ciudadOptions={ciudadOptions}
        departamentoOptions={departamentoOptions}
      />
    </Layout>
  );
};

export default TitularidadPorInmueble;
