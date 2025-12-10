import React from 'react';
import { Modal, Form, Input, Select, Button } from 'antd';

const { Option } = Select;

export interface InmuebleFormValues {
  matricula: string;
  nomenclatura: string;
  ciudadId: number;
  departamentoId: number;
}

interface InmuebleFormModalProps {
  open: boolean;
  loading?: boolean;
  isEditing?: boolean;
  initialValues?: Partial<InmuebleFormValues>;
  ciudadOptions: { value: number; label: string }[];
  departamentoOptions: { value: number; label: string }[];
  onCancel: () => void;
  onSubmit: (values: InmuebleFormValues) => void | Promise<void>;
}

const InmuebleFormModal: React.FC<InmuebleFormModalProps> = ({
  open,
  loading,
  isEditing = false,
  initialValues,
  ciudadOptions,
  departamentoOptions,
  onCancel,
  onSubmit,
}) => {
  const [form] = Form.useForm<InmuebleFormValues>();

  return (
    <Modal
      title={isEditing ? 'Editar Inmueble' : 'Agregar Nuevo Inmueble'}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={600}
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
          label="Matrícula"
          name="matricula"
          rules={[{ required: true, message: 'Ingrese la matrícula' }]}
        >
          <Input placeholder="Ingrese la matrícula del inmueble" />
        </Form.Item>

        <Form.Item
          label="Nomenclatura"
          name="nomenclatura"
          rules={[{ required: true, message: 'Ingrese la nomenclatura' }]}
        >
          <Input placeholder="Ingrese la nomenclatura" />
        </Form.Item>

        <Form.Item
          label="Ciudad"
          name="ciudadId"
          rules={[{ required: true, message: 'Seleccione una ciudad' }]}
        >
          <Select showSearch placeholder="Seleccione una ciudad" optionFilterProp="children">
            {ciudadOptions.map((o) => (
              <Option key={o.value} value={o.value}>{o.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          label="Departamento"
          name="departamentoId"
          rules={[{ required: true, message: 'Seleccione un departamento' }]}
        >
          <Select showSearch placeholder="Seleccione un departamento" optionFilterProp="children">
            {departamentoOptions.map((o) => (
              <Option key={o.value} value={o.value}>{o.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
          <Button onClick={onCancel} style={{ marginRight: 8 }}>
            Cancelar
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            {isEditing ? 'Guardar cambios' : 'Crear inmueble'}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default InmuebleFormModal;
