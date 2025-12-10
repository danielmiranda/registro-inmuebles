import { Layout, Typography, Alert, Spin, Select, Card, Space, Button, Modal, Form, InputNumber, Table, message } from 'antd';
import { PlusOutlined, ExclamationCircleOutlined, EyeOutlined } from '@ant-design/icons';
import { useEffect, useMemo, useState } from 'react';
import PersonaFormModal from './PersonaFormModal';
import { normalizeText } from '../utils/text';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;
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
  ciudadNombre?: string;
  departamentoNombre?: string;
}

interface Props {
  personaOptions: OptionItem[];
  inmuebleOptions: OptionItem[];
  titularidades: TitularidadRow[];
  selectedPersonaId: number | null;
  onChangePersona: (id: number | null) => void;
  loading: boolean;
  listLoading: boolean;
  formLoading: boolean;
  error: string | null;
  noData?: boolean;
  onCreate: (payload: { inmuebleId: number; numerador: number; denominador: number }) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
  onCreatePersona: (values: { cuit: string; nombre: string; apellido: string }) => Promise<void> | void;
}

const Titularidad: React.FC<Props> = ({
  personaOptions,
  inmuebleOptions,
  titularidades,
  selectedPersonaId,
  onChangePersona,
  loading,
  listLoading,
  formLoading,
  error,
  noData = false,
  onCreate,
  onDelete,
  onCreatePersona,
}) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm<{ inmuebleId: number; numerador: number; denominador: number }>();
  const [isPersonaModalOpen, setIsPersonaModalOpen] = useState(false);
  const [creatingPersona, setCreatingPersona] = useState(false);

  useEffect(() => {
    if (!isModalOpen) form.resetFields();
  }, [isModalOpen, form]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const openPersonaModal = () => setIsPersonaModalOpen(true);
  const closePersonaModal = () => setIsPersonaModalOpen(false);

  const handleCreate = async (values: { inmuebleId: number; numerador: number; denominador: number }) => {
    try {
      await onCreate(values);
      message.success('Titularidad creada');
      closeModal();
    } catch (e: any) {
      message.error(e?.message || 'Error al crear la titularidad');
    }
  };

  const inmuebleLabel = useMemo(() => {
    const map = new Map(inmuebleOptions.map(o => [o.value, o.label]));
    return (id: number) => map.get(id) || id;
  }, [inmuebleOptions]);

  const columns = useMemo(() => [
    { title: 'ID', dataIndex: 'id', key: 'id', width: 80 },
    { title: 'Inmueble', key: 'inmueble', render: (_: any, r: TitularidadRow) => inmuebleLabel(r.inmuebleId) },
    { title: 'Ciudad', key: 'ciudad', render: (_: any, r: TitularidadRow) => r.ciudadNombre ?? '-' },
    { title: 'Departamento', key: 'departamento', render: (_: any, r: TitularidadRow) => r.departamentoNombre ?? '-' },
    { title: 'Fracción', key: 'fraccion', render: (_: any, r: TitularidadRow) => `${r.numerador}/${r.denominador}` },
    { title: 'Porcentaje', dataIndex: 'porcentaje', key: 'porcentaje', render: (v: number) => `${v.toFixed(2)}%` },
    {
      title: 'Acciones', key: 'actions', width: 180,
      render: (_: any, record: TitularidadRow) => (
        <Space>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            onClick={() => navigate('/titularidades-inmueble', { state: { inmuebleId: record.inmuebleId } })}
          >
            Ver titulares
          </Button>
        </Space>
      )
    }
  ], [inmuebleLabel]);

  const confirmDelete = (record: TitularidadRow) => {
    confirm({
      title: '¿Eliminar titularidad?',
      icon: <ExclamationCircleOutlined />,
      content: `Se eliminará la titularidad sobre ${inmuebleLabel(record.inmuebleId)}.`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await onDelete(record.id);
          message.success('Titularidad eliminada');
        } catch (e: any) {
          message.error(e?.message || 'Error al eliminar');
        }
      }
    });
  };


  const handleCreatePersona = async (values: { cuit: string; nombre: string; apellido: string }) => {
    setCreatingPersona(true);
    try {
      await onCreatePersona(values);
      message.success('Persona creada exitosamente');
      closePersonaModal();
    } catch (e: any) {
      message.error(e?.message || 'Error al crear la persona');
    } finally {
      setCreatingPersona(false);
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

  return (
    <Layout style={{ padding: 24 }}>
      <Card style={{ marginBottom: 16 }}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Title level={3} style={{ margin: 0 }}>Inmuebles por Personas</Title>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <div>
              <span style={{ marginRight: 8 }}>Persona:</span>
              <Select
                showSearch
                placeholder="Seleccione una persona"
                value={selectedPersonaId as number | undefined}
                onChange={(v) => onChangePersona(v)}
                allowClear
                style={{ minWidth: 360 }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  normalizeText((option?.children as string) ?? '').includes(normalizeText(input))
                }
              >
                {personaOptions.map(o => (
                  <Option key={o.value} value={o.value}>{o.label}</Option>
                ))}
              </Select>
            </div>
            <Button icon={<PlusOutlined />} onClick={openPersonaModal}>Agregar persona</Button>
          </div>

          <div>
            <Button type="primary" icon={<PlusOutlined />} onClick={openModal} disabled={!selectedPersonaId}>Nueva titularidad</Button>
          </div>
        </Space>
      </Card>

      {selectedPersonaId == null ? (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
          <Alert message="Seleccione una persona para ver/gestionar sus titularidades" type="info" showIcon />
        </div>
      ) : (
        <Card>
          {listLoading ? (
            <div style={{ textAlign: 'center', padding: 24 }}><Spin /></div>
          ) : noData ? (
            <div style={{ textAlign: 'center', padding: 24 }}>
              <Title level={4} style={{ marginBottom: 12 }}>Esta persona no tiene titularidades</Title>
              <Button type="primary" icon={<PlusOutlined />} onClick={openModal}>Agregar titularidad</Button>
            </div>
          ) : (
            <Table
              rowKey="id"
              columns={columns as any}
              dataSource={titularidades}
              pagination={{ pageSize: 10 }}
            />
          )}
        </Card>
      )}

      <Modal title="Nueva titularidad" open={isModalOpen} onCancel={closeModal} footer={null} width={560} destroyOnClose>
        <Form form={form} layout="vertical" onFinish={handleCreate} autoComplete="off">
          <Form.Item label="Inmueble" name="inmuebleId" rules={[{ required: true, message: 'Seleccione un inmueble' }]}> 
            <Select showSearch placeholder="Seleccione un inmueble" optionFilterProp="children">
              {inmuebleOptions.map(o => (
                <Option key={o.value} value={o.value}>{o.label}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label="Numerador" name="numerador" rules={[{ required: true, message: 'Ingrese numerador' }, { type: 'number', min: 1, message: 'Debe ser mayor a 0' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Denominador" name="denominador" rules={[{ required: true, message: 'Ingrese denominador' }, { type: 'number', min: 1, message: 'Debe ser mayor a 0' }]}>
            <InputNumber min={1} style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
            <Button onClick={closeModal} style={{ marginRight: 8 }}>Cancelar</Button>
            <Button type="primary" htmlType="submit" loading={formLoading}>Guardar</Button>
          </Form.Item>
        </Form>
      </Modal>

      <PersonaFormModal
        open={isPersonaModalOpen}
        loading={creatingPersona}
        onCancel={closePersonaModal}
        onSubmit={handleCreatePersona}
      />
    </Layout>
  );
};

export default Titularidad;
