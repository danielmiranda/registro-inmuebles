import { Table, Spin, Alert, Layout, Typography, Form, Input, Select, Button, Modal, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useMemo, useState } from 'react';

const { Title } = Typography;
const { Option } = Select;

interface InmuebleResponseDTO {
    id: number;
    matricula: string;
    nomenclatura: string;
    ciudadId: number;
    departamentoId: number;
}

interface InmuebleProps {
    inmuebles: InmuebleResponseDTO[];
    ciudadOptions: { value: number; label: string }[];
    departamentoOptions: { value: number; label: string }[];
    loading: boolean;
    formLoading: boolean;
    error: string | null;
    noData?: boolean;
    onSubmit: (values: any) => void;
}

const Inmueble: React.FC<InmuebleProps> = ({
    inmuebles,
    ciudadOptions,
    departamentoOptions,
    loading,
    formLoading,
    error,
    noData = false,
    onSubmit
}) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const ciudadLabel = useMemo(() => {
        const map = new Map(ciudadOptions.map(o => [o.value, o.label]));
        return (id: number) => map.get(id) || id;
    }, [ciudadOptions]);

    const departamentoLabel = useMemo(() => {
        const map = new Map(departamentoOptions.map(o => [o.value, o.label]));
        return (id: number) => map.get(id) || id;
    }, [departamentoOptions]);

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Matrícula',
            dataIndex: 'matricula',
            key: 'matricula',
        },
        {
            title: 'Nomenclatura',
            dataIndex: 'nomenclatura',
            key: 'nomenclatura',
        },
        {
            title: 'Ciudad ID',
            dataIndex: 'ciudadId',
            key: 'ciudadId',
        },
        {
            title: 'Ciudad',
            key: 'ciudadNombre',
            render: (_: any, r: InmuebleResponseDTO) => ciudadLabel(r.ciudadId),
        },
        {
            title: 'Departamento ID',
            dataIndex: 'departamentoId',
            key: 'departamentoId',
        },
        {
            title: 'Departamento',
            key: 'departamentoNombre',
            render: (_: any, r: InmuebleResponseDTO) => departamentoLabel(r.departamentoId),
        },
    ];

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = async (values: any) => {
        try {
            await onSubmit(values);
            message.success('Inmueble creado exitosamente');
            setIsModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Error al crear el inmueble');
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

    // Estado vacío cuando el backend indica que no hay información disponible o la lista está vacía
    if (noData || (!loading && inmuebles.length === 0)) {
        return (
            <Layout style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
                <div style={{ textAlign: 'center' }}>
                    <Title level={2} style={{ marginBottom: 24 }}>No hay inmuebles registrados</Title>
                    <Button type="primary" icon={<PlusOutlined />} size="large" onClick={showModal}>
                        Cargar inmueble
                    </Button>

                    <Modal
                        title="Agregar Nuevo Inmueble"
                        open={isModalVisible}
                        onCancel={handleCancel}
                        footer={null}
                        width={600}
                    >
                        <Form
                            form={form}
                            layout="vertical"
                            onFinish={handleSubmit}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Matrícula"
                                name="matricula"
                                rules={[
                                    { required: true, message: 'Por favor ingrese la matrícula' },
                                    { min: 1, message: 'La matrícula debe tener al menos 1 carácter' }
                                ]}
                            >
                                <Input placeholder="Ingrese la matrícula del inmueble" />
                            </Form.Item>

                            <Form.Item
                                label="Nomenclatura"
                                name="nomenclatura"
                                rules={[
                                    { required: true, message: 'Por favor ingrese la nomenclatura' },
                                    { min: 1, message: 'La nomenclatura debe tener al menos 1 carácter' }
                                ]}
                            >
                                <Input placeholder="Ingrese la nomenclatura del inmueble" />
                            </Form.Item>

                            <Form.Item
                                label="Ciudad"
                                name="ciudadId"
                                rules={[{ required: true, message: 'Por favor seleccione una ciudad' }]}
                            >
                                <Select placeholder="Seleccione una ciudad">
                                    {ciudadOptions.map(option => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item
                                label="Departamento"
                                name="departamentoId"
                                rules={[{ required: true, message: 'Por favor seleccione un departamento' }]}
                            >
                                <Select placeholder="Seleccione un departamento">
                                    {departamentoOptions.map(option => (
                                        <Option key={option.value} value={option.value}>
                                            {option.label}
                                        </Option>
                                    ))}
                                </Select>
                            </Form.Item>

                            <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                                <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                                    Cancelar
                                </Button>
                                <Button type="primary" htmlType="submit" loading={formLoading}>
                                    Crear Inmueble
                                </Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </div>
            </Layout>
        );
    }

    return (
        <Layout style={{ padding: '24px' }}>
            <div style={{ marginBottom: 16 }}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={showModal}
                    size="large"
                >
                    Agregar INMUEBLE
                </Button>
            </div>

            <Title level={2}>Lista de Inmuebles</Title>
            <Table
                dataSource={inmuebles}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />

            <Modal
                title="Agregar Nuevo Inmueble"
                open={isModalVisible}
                onCancel={handleCancel}
                footer={null}
                width={600}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Matrícula"
                        name="matricula"
                        rules={[
                            { required: true, message: 'Por favor ingrese la matrícula' },
                            { min: 1, message: 'La matrícula debe tener al menos 1 carácter' }
                        ]}
                    >
                        <Input placeholder="Ingrese la matrícula del inmueble" />
                    </Form.Item>

                    <Form.Item
                        label="Nomenclatura"
                        name="nomenclatura"
                        rules={[
                            { required: true, message: 'Por favor ingrese la nomenclatura' },
                            { min: 1, message: 'La nomenclatura debe tener al menos 1 carácter' }
                        ]}
                    >
                        <Input placeholder="Ingrese la nomenclatura del inmueble" />
                    </Form.Item>

                    <Form.Item
                        label="Ciudad"
                        name="ciudadId"
                        rules={[{ required: true, message: 'Por favor seleccione una ciudad' }]}
                    >
                        <Select placeholder="Seleccione una ciudad">
                            {ciudadOptions.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Departamento"
                        name="departamentoId"
                        rules={[{ required: true, message: 'Por favor seleccione un departamento' }]}
                    >
                        <Select placeholder="Seleccione un departamento">
                            {departamentoOptions.map(option => (
                                <Option key={option.value} value={option.value}>
                                    {option.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item style={{ textAlign: 'right', marginBottom: 0 }}>
                        <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                            Cancelar
                        </Button>
                        <Button type="primary" htmlType="submit" loading={formLoading}>
                            Crear Inmueble
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>
    );
};

export default Inmueble;