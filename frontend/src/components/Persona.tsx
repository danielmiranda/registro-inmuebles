import { Layout, Typography, Spin, Alert, Table, Button, Modal, Space, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';
import type { ColumnsType } from 'antd/es/table';
import type { PersonaCreateUpdateDTO, PersonaResponseDTO } from './PersonaContainer';
import PersonaFormModal from './PersonaFormModal';

const { Title } = Typography;
const { confirm } = Modal;

interface PersonaProps {
  personas: PersonaResponseDTO[];
  loading: boolean;
  formLoading: boolean;
  error: string | null;
  noData?: boolean;
  onCreate: (values: PersonaCreateUpdateDTO) => Promise<void> | void;
  onUpdate: (id: number, values: PersonaCreateUpdateDTO) => Promise<void> | void;
  onDelete: (id: number) => Promise<void> | void;
}

const Persona: React.FC<PersonaProps> = ({ personas, loading, formLoading, error, noData = false, onCreate, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [current, setCurrent] = useState<PersonaResponseDTO | null>(null);

  const openCreate = () => {
    setIsEditing(false);
    setCurrent(null);
    setIsModalOpen(true);
  };

  const openEdit = (record: PersonaResponseDTO) => {
    setIsEditing(true);
    setCurrent(record);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCurrent(null);
  };

  const handleSubmit = async (values: PersonaCreateUpdateDTO) => {
    try {
      if (isEditing && current) {
        await onUpdate(current.id, values);
        message.success('Persona actualizada exitosamente');
      } else {
        await onCreate(values);
        message.success('Persona creada exitosamente');
      }
      closeModal();
    } catch (e: any) {
      message.error(e?.message || 'Ocurrió un error');
    }
  };

  const confirmDelete = (record: PersonaResponseDTO) => {
    confirm({
      title: '¿Eliminar persona?',
      icon: <ExclamationCircleOutlined />,
      content: `Se eliminará (lógico) a ${record.nombre} ${record.apellido}. Esta acción se puede revertir creando nuevamente la persona si corresponde.`,
      okText: 'Eliminar',
      okType: 'danger',
      cancelText: 'Cancelar',
      onOk: async () => {
        try {
          await onDelete(record.id);
          message.success('Persona eliminada');
        } catch (e: any) {
          message.error(e?.message || 'Error al eliminar');
        }
      },
    });
  };

  const columns: ColumnsType<PersonaResponseDTO> = useMemo(() => ([
    { title: 'ID', dataIndex: 'id', key: 'id', width: 90 },
    { title: 'CUIT', dataIndex: 'cuit', key: 'cuit' },
    { title: 'Nombre', dataIndex: 'nombre', key: 'nombre' },
    { title: 'Apellido', dataIndex: 'apellido', key: 'apellido' },
    {
      title: 'Acciones', key: 'actions', width: 160,
      render: (_: any, record: PersonaResponseDTO) => (
        <Space>
          <Button icon={<EditOutlined />} onClick={() => openEdit(record)}>Editar</Button>
          <Button danger icon={<DeleteOutlined />} onClick={() => confirmDelete(record)}>Eliminar</Button>
        </Space>
      )
    }
  ]), []);

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

  if (noData || (!loading && personas.length === 0)) {
    return (
      <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <div style={{ textAlign: 'center' }}>
          <Title level={2} style={{ marginBottom: 24 }}>No hay personas registradas</Title>
          <Button type="primary" icon={<PlusOutlined />} size="large" onClick={openCreate}>
            Cargar persona
          </Button>

          <PersonaFormModal
            open={isModalOpen}
            loading={formLoading}
            isEditing={isEditing}
            initialValues={isEditing && current ? { cuit: current.cuit, nombre: current.nombre, apellido: current.apellido } : undefined}
            onCancel={closeModal}
            onSubmit={handleSubmit}
          />
        </div>
      </Layout>
    );
  }

  return (
    <Layout style={{ padding: 24 }}>
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={openCreate} size="large">Nueva persona</Button>
      </div>

      <Table
        rowKey="id"
        columns={columns}
        dataSource={personas}
        pagination={{ pageSize: 10 }}
      />

      <PersonaFormModal
        open={isModalOpen}
        loading={formLoading}
        isEditing={isEditing}
        initialValues={isEditing && current ? { cuit: current.cuit, nombre: current.nombre, apellido: current.apellido } : undefined}
        onCancel={closeModal}
        onSubmit={handleSubmit}
      />
    </Layout>
  );
};

export default Persona;
