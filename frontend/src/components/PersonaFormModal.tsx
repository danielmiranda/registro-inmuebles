import React from 'react';
import { Modal, Form, Input, Button } from 'antd';

export interface PersonaFormValues {
  cuit: string;
  nombre: string;
  apellido: string;
}

interface PersonaFormModalProps {
  open: boolean;
  loading?: boolean;
  isEditing?: boolean;
  initialValues?: Partial<PersonaFormValues>;
  onCancel: () => void;
  onSubmit: (values: PersonaFormValues) => void | Promise<void>;
}

const PersonaFormModal: React.FC<PersonaFormModalProps> = ({
  open,
  loading,
  isEditing = false,
  initialValues,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<PersonaFormValues>();

  return (
    <Modal
      title={isEditing ? 'Editar Persona' : 'Agregar Persona'}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={520}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        autoComplete="off"
        initialValues={initialValues}
      >
        <Form.Item
          label="CUIT"
          name="cuit"
          rules={[
            { required: true, message: 'Ingrese el CUIT' },
            { min: 3, message: 'CUIT muy corto' },
          ]}
        >
          <Input placeholder="20-12345678-3" />
        </Form.Item>
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: 'Ingrese el nombre' }]}
        >
          <Input placeholder="Nombre" />
        </Form.Item>
        <Form.Item
          label="Apellido"
          name="apellido"
          rules={[{ required: true, message: 'Ingrese el apellido' }]}
        >
          <Input placeholder="Apellido" />
        </Form.Item>
        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEditing ? 'Guardar cambios' : 'Crear persona'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default PersonaFormModal;
