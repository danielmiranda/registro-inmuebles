import { Layout, Typography, Alert, Spin, Card, Space, Select, Button, Modal, Form, Input, DatePicker, message, InputNumber, Tag } from 'antd';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import PersonaFormModal from '../Personas/PersonaFormModal.tsx';

const { Title } = Typography;
const { Option } = Select;

export interface OptionItem { value: number; label: string }

export type EstadoAfectacion = 'BORRADOR' | 'PENDIENTE' | 'EN_REVISION' | 'APROBADA' | 'RECHAZADA' | 'CANCELADA';

interface Props {
  loading: boolean;
  listLoading: boolean;
  formLoading: boolean;
  error: string | null;
  noData?: boolean;
  personaOptions: OptionItem[];
  inmuebleOptions: OptionItem[];
  ciudadOptions: OptionItem[];
  departamentoOptions: OptionItem[];
  selectedPersonaId: number | null;
  titularInmuebleIds: number[];
  selectedInmuebleId: number | null;
  aprobadasByInmueble: Record<number, boolean>;
  personaHasAprobada: boolean;
  onChangePersona: (id: number | null) => void;
  onChangeInmueble: (id: number | null) => void;
  onReload: () => void;
  onCreateAfectacion: (payload: { personaId: number; inmuebleId: number; estado: EstadoAfectacion; nroExpediente: string; fecha: string; }) => Promise<void> | void;
  onCreatePersona: (values: { cuit: string; nombre: string; apellido: string }) => Promise<{ id: number } | void>;
  onCreateInmueble: (values: { matricula: string; nomenclatura: string; ciudadId: number; departamentoId: number }) => Promise<{ id: number } | void>;
  onCreateTitularidad: (values: { inmuebleId: number; numerador: number; denominador: number }) => Promise<void> | void;
  titularesInmueble: { id: number; personaId: number; numerador?: number; denominador?: number; porcentaje?: number }[];
  titularesInmuebleLoading: boolean;
}

const Afectacion: React.FC<Props> = ({
  loading,
  listLoading,
  formLoading,
  error,
  noData = false,
  personaOptions,
  inmuebleOptions,
  ciudadOptions,
  departamentoOptions,
  selectedPersonaId,
  titularInmuebleIds,
  selectedInmuebleId,
  onChangePersona,
  onChangeInmueble,
  onReload,
  onCreateAfectacion,
  onCreatePersona,
  onCreateInmueble,
  onCreateTitularidad,
  titularesInmueble,
  titularesInmuebleLoading,
  aprobadasByInmueble,
  personaHasAprobada,
}) => {
  const [afForm] = Form.useForm<{ personaId: number; inmuebleId: number; estado: EstadoAfectacion; nroExpediente: string; fecha: any }>();
  const [showPersonaModal, setShowPersonaModal] = useState(false);
  const [showInmuebleModal, setShowInmuebleModal] = useState(false);
  const [showTitularidadModal, setShowTitularidadModal] = useState(false);

  const [inmuebleForm] = Form.useForm<{ matricula: string; nomenclatura: string; ciudadId: number; departamentoId: number }>();
  const [titularidadForm] = Form.useForm<{ numerador: number; denominador: number }>();

  useEffect(() => {
    if (selectedPersonaId != null) {
      afForm.setFieldsValue({ personaId: selectedPersonaId });
    } else {
      afForm.setFieldsValue({ personaId: undefined });
    }
  }, [selectedPersonaId, afForm]);

  // Sincronizar el inmueble seleccionado arriba con el formulario (campo oculto)
  useEffect(() => {
    if (selectedInmuebleId != null) {
      afForm.setFieldsValue({ inmuebleId: selectedInmuebleId });
    } else {
      afForm.setFieldsValue({ inmuebleId: undefined });
    }
  }, [selectedInmuebleId, afForm]);

  // Al cambiar la persona, limpiar el inmueble seleccionado para evitar valores que ya no están en la lista filtrada
  useEffect(() => {
    // limpiar siempre inmueble al cambiar la persona en el formulario
    afForm.setFieldsValue({ inmuebleId: undefined });
    onChangeInmueble(null);
  }, [selectedPersonaId, afForm]);

  const estadoOptions: { value: EstadoAfectacion; label: string }[] = useMemo(() => ([
    { value: 'BORRADOR', label: 'Borrador' },
    { value: 'PENDIENTE', label: 'Pendiente' },
    { value: 'EN_REVISION', label: 'En revisión' },
    { value: 'APROBADA', label: 'Aprobada' },
    { value: 'RECHAZADA', label: 'Rechazada' },
    { value: 'CANCELADA', label: 'Cancelada' },
  ]), []);

  const personaId = Form.useWatch('personaId', afForm) as number | undefined;
  const inmuebleId = Form.useWatch('inmuebleId', afForm) as number | undefined;

  const selectedPersonaLabel = useMemo(() => {
    const found = personaOptions.find(o => o.value === (personaId ?? selectedPersonaId ?? -1));
    return found?.label || '';
  }, [personaOptions, personaId, selectedPersonaId]);

  const selectedInmuebleLabel = useMemo(() => {
    const found = inmuebleOptions.find(o => o.value === (inmuebleId ?? selectedInmuebleId ?? -1));
    return found?.label || '';
  }, [inmuebleOptions, inmuebleId, selectedInmuebleId]);

  const personaHasInmueble = selectedInmuebleId ? titularInmuebleIds.includes(selectedInmuebleId) : true;

  const submitAfectacion = async (values: { personaId: number; inmuebleId: number; estado: EstadoAfectacion; nroExpediente: string; fecha: any }) => {
    try {
      const fecha = values.fecha?.format ? values.fecha.format('YYYY-MM-DD') : values.fecha;
      await onCreateAfectacion({
        personaId: values.personaId,
        inmuebleId: values.inmuebleId,
        estado: values.estado,
        nroExpediente: values.nroExpediente,
        fecha,
      });
      message.success('Afectación creada');
      afForm.resetFields(['estado', 'nroExpediente', 'fecha']);
      // Refrescar el campo de persona para que se recarguen los inmuebles
      const currentPersonaId = afForm.getFieldValue('personaId') as number | undefined;
      if (currentPersonaId != null) {
        // Forzar refresco: deseleccionar y volver a seleccionar la misma persona
        onChangePersona(null);
        // Re-seleccionar en el siguiente ciclo de eventos para asegurar el disparo de efectos en el contenedor
        setTimeout(() => onChangePersona(currentPersonaId), 0);
      }
    } catch (e: any) {
      message.error(e?.message || 'No se pudo crear la afectación');
    }
  };

  const handleCreatePersona = async (values: { cuit: string; nombre: string; apellido: string }) => {
    try {
      const created = await onCreatePersona(values);
      if (created && (created as any).id) {
        afForm.setFieldsValue({ personaId: (created as any).id });
        message.success('Persona creada');
      }
      setShowPersonaModal(false);
    } catch (e: any) {
      message.error(e?.message || 'Error al crear persona');
    }
  };

  const handleCreateInmueble = async (values: { matricula: string; nomenclatura: string; ciudadId: number; departamentoId: number }) => {
    try {
      const created = await onCreateInmueble(values);
      if (created && (created as any).id) {
        afForm.setFieldsValue({ inmuebleId: (created as any).id });
        onChangeInmueble((created as any).id);
        message.success('Inmueble creado');
      }
      setShowInmuebleModal(false);
      inmuebleForm.resetFields();
    } catch (e: any) {
      message.error(e?.message || 'Error al crear inmueble');
    }
  };

  const handleCreateTitularidad = async (values: { numerador: number; denominador: number }) => {
    try {
      if (!selectedInmuebleId) throw new Error('Seleccione un inmueble');
      await onCreateTitularidad({ inmuebleId: selectedInmuebleId, numerador: values.numerador, denominador: values.denominador });
      message.success('Titularidad asociada');
      setShowTitularidadModal(false);
      titularidadForm.resetFields();
    } catch (e: any) {
      message.error(e?.message || 'Error al asociar titularidad');
    }
  };

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

  if (noData) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: 24 }}>No hay datos para mostrar</Title>
          <Button type="primary" size="large" onClick={onReload} icon={<PlusOutlined />}>Cargar datos</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout style={{ padding: 24, minHeight: '100vh' }}>
      <Title level={2}>Afectación de Vivienda (Bien de Familia)</Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card title="Datos base">
          <Space direction="vertical" style={{ width: '100%' }} size="middle">
            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label>Persona titular</label>
                <Space.Compact style={{ width: '100%' }}>
                  <Select
                    style={{ flex: 1 }}
                    placeholder="Buscar persona"
                    showSearch
                    allowClear
                    value={personaId}
                    filterOption={(input, option) => (option?.label as string).toLowerCase().includes(input.toLowerCase())}
                    options={personaOptions}
                    onChange={(v) => onChangePersona(v ?? null)}
                    loading={listLoading}
                  />
                  <Button onClick={() => setShowPersonaModal(true)} icon={<PlusOutlined />}>Nueva</Button>
                </Space.Compact>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8 }}>
              <div style={{ flex: 1 }}>
                <label>Inmueble</label>
                {/* Lista con check de los inmuebles de la persona */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                  <div style={{ flex: 1, maxHeight: 220, overflowY: 'auto', border: '1px solid #f0f0f0', borderRadius: 6 }}>
                    {(!personaId && !selectedPersonaId) ? (
                      <div style={{ padding: 12, color: '#999' }}>Seleccione una persona para ver sus inmuebles</div>
                    ) : (
                      <div>
                        {inmuebleOptions.length === 0 ? (
                          <div style={{ padding: 12, color: '#999' }}>La persona no tiene inmuebles asociados</div>
                        ) : (
                          inmuebleOptions.map(opt => {
                            const selected = selectedInmuebleId === opt.value;
                            const aprobada = !!aprobadasByInmueble[opt.value];
                            return (
                              <div
                                key={opt.value}
                                onClick={() => {
                                  afForm.setFieldsValue({ inmuebleId: opt.value });
                                  onChangeInmueble(opt.value);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  padding: '8px 12px',
                                  cursor: 'pointer',
                                  background: selected ? '#e6f7ff' : undefined,
                                  borderBottom: '1px solid #f5f5f5'
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <span style={{
                                    display: 'inline-block',
                                    width: 16,
                                    height: 16,
                                    border: '1px solid #1890ff',
                                    borderRadius: 3,
                                    background: selected ? '#1890ff' : 'transparent'
                                  }} />
                                  <span>{opt.label}</span>
                                </div>
                                {aprobada && (
                                  <Tag color="green">Afectación aprobada</Tag>
                                )}
                              </div>
                            );
                          })
                        )}
                      </div>
                    )}
                  </div>
                  <Button onClick={() => setShowInmuebleModal(true)} icon={<PlusOutlined />}>Nuevo</Button>
                </div>
                {/* Mensaje cuando el inmueble seleccionado no corresponde a titularidades de la persona */}
                {!personaHasInmueble && personaId && selectedInmuebleId && (
                  <div style={{ marginTop: 8 }}>
                    <Tag color="gold">La persona seleccionada no es titular de este inmueble</Tag>
                    <Button size="small" onClick={() => setShowTitularidadModal(true)} style={{ marginLeft: 8 }}>Asociar titularidad</Button>
                  </div>
                )}

                {personaHasAprobada && (
                  <div style={{ marginTop: 8 }}>
                    <Alert type="success" message="La persona ya posee una afectación aprobada. Sólo se permite una por persona." showIcon />
                  </div>
                )}

                {/* Grilla de titulares del inmueble seleccionado */}
                {selectedInmuebleId && (
                  <div style={{ marginTop: 12 }}>
                    <Title level={5} style={{ marginBottom: 8 }}>Titulares del inmueble</Title>
                    {/* Construir mapa de label de persona */}
                    {(() => {
                      const personaLabel = new Map(personaOptions.map(o => [o.value, o.label]));
                      const data = (titularesInmueble || []).map(t => ({
                        key: t.id,
                        id: t.id,
                        persona: personaLabel.get(t.personaId) || t.personaId,
                        fraccion: t.numerador != null && t.denominador != null ? `${t.numerador}/${t.denominador}` : '-',
                        porcentaje: t.porcentaje != null ? `${t.porcentaje.toFixed(2)}%` : '-',
                      }));
                      return (
                        <div>
                          <Spin spinning={titularesInmuebleLoading}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                              <thead>
                                <tr>
                                  <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Persona</th>
                                  <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Fracción</th>
                                  <th style={{ textAlign: 'left', borderBottom: '1px solid #ddd', padding: '8px' }}>Porcentaje</th>
                                </tr>
                              </thead>
                              <tbody>
                                {data.length === 0 ? (
                                  <tr>
                                    <td colSpan={3} style={{ padding: '12px', color: '#888' }}>Sin titulares para este inmueble</td>
                                  </tr>
                                ) : (
                                  data.map(row => (
                                    <tr key={row.key}>
                                      <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{row.persona}</td>
                                      <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{row.fraccion}</td>
                                      <td style={{ padding: '8px', borderBottom: '1px solid #f0f0f0' }}>{row.porcentaje}</td>
                                    </tr>
                                  ))
                                )}
                              </tbody>
                            </table>
                          </Spin>
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>
            </div>
          </Space>
        </Card>

        <Card title="Afectación">
          <Form form={afForm} layout="vertical" onFinish={submitAfectacion} initialValues={{ estado: 'APROBADA', fecha: dayjs() }} disabled={personaHasAprobada}>
            {/* Mostrar la persona seleccionada arriba como etiqueta y mantener el campo oculto para el valor */}
            <Form.Item label="Persona Iniciadora del Trámite">
              {selectedPersonaLabel ? (
                <Tag color="blue">{selectedPersonaLabel}</Tag>
              ) : (
                <Tag>Sin selección</Tag>
              )}
            </Form.Item>
            <Form.Item name="personaId" hidden rules={[{ required: true, message: 'Seleccione una persona en la parte superior' }]}>
              <Input type="hidden" readOnly />
            </Form.Item>
            <Form.Item label="Inmueble">
              {selectedInmuebleLabel ? (
                <Tag color="green">{selectedInmuebleLabel}</Tag>
              ) : (
                <Tag>Sin selección</Tag>
              )}
            </Form.Item>
            {/* Campo oculto para mantener el valor del inmueble seleccionado */}
            <Form.Item name="inmuebleId" hidden rules={[{ required: true, message: 'Seleccione un inmueble en la parte superior' }]}>
              <Input type="hidden" readOnly />
            </Form.Item>
            <Form.Item name="estado" label="Estado" rules={[{ required: true, message: 'Seleccione el estado' }]}>
              <Select placeholder="Seleccione">
                {estadoOptions.map(e => (
                  <Option key={e.value} value={e.value}>{e.label}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="nroExpediente" label="Nro. Expediente" rules={[{ required: true, message: 'Ingrese el nro. de expediente' }]}>
              <Input placeholder="EXP-123/2025" />
            </Form.Item>
            <Form.Item name="fecha" label="Fecha" rules={[{ required: true, message: 'Seleccione la fecha' }]}>
              <DatePicker style={{ width: '100%' }} format="DD/MM/YYYY" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={formLoading} disabled={personaHasAprobada}>Registrar afectación</Button>
            </Form.Item>
          </Form>
        </Card>
      </Space>

      {/* Modal crear persona (usa componente reutilizable) */}
      <PersonaFormModal
        open={showPersonaModal}
        loading={formLoading}
        onCancel={() => setShowPersonaModal(false)}
        onSubmit={handleCreatePersona}
      />

      {/* Modal crear inmueble */}
      <Modal title="Nuevo Inmueble" open={showInmuebleModal} onCancel={() => setShowInmuebleModal(false)} footer={null} destroyOnClose>
        <Form form={inmuebleForm} layout="vertical" onFinish={handleCreateInmueble}>
          <Form.Item name="matricula" label="Matrícula" rules={[{ required: true, message: 'Ingrese matrícula' }]}>
            <Input placeholder="MAT-0001" />
          </Form.Item>
          <Form.Item name="nomenclatura" label="Nomenclatura" rules={[{ required: true, message: 'Ingrese nomenclatura' }]}>
            <Input placeholder="NOM-123" />
          </Form.Item>
          <Form.Item name="ciudadId" label="Ciudad" rules={[{ required: true, message: 'Seleccione ciudad' }]}>
            <Select options={ciudadOptions} showSearch filterOption={(i,o)=> (o?.label as string).toLowerCase().includes(i.toLowerCase())} />
          </Form.Item>
          <Form.Item name="departamentoId" label="Departamento" rules={[{ required: true, message: 'Seleccione departamento' }]}>
            <Select options={departamentoOptions} showSearch filterOption={(i,o)=> (o?.label as string).toLowerCase().includes(i.toLowerCase())} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setShowInmuebleModal(false)} style={{ marginRight: 8 }}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={formLoading}>Crear</Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Modal asociar titularidad */}
      <Modal title="Asociar titularidad" open={showTitularidadModal} onCancel={() => setShowTitularidadModal(false)} footer={null} destroyOnClose>
        <Form form={titularidadForm} layout="vertical" onFinish={handleCreateTitularidad}>
          <Form.Item name="numerador" label="Numerador" rules={[{ required: true, message: 'Ingrese numerador' }, { type: 'number', min: 1 }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item name="denominador" label="Denominador" rules={[{ required: true, message: 'Ingrese denominador' }, { type: 'number', min: 1 }]}>
            <InputNumber style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={() => setShowTitularidadModal(false)} style={{ marginRight: 8 }}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={formLoading}>Asociar</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Afectacion;
