import { Table, Spin, Alert, Layout, Typography, AutoComplete } from 'antd';
import { normalizeText } from '../utils/text';

const { Title } = Typography;

interface CiudadDTO {
    id: number;
    nombre: string;
    codigoCiudad: number;
    departamento: {
        id: number;
        nombre: string;
        codigoDepartamento: number;
        region: {
            id: number;
            nombre: string;
            provincia: {
                id: number;
                nombre: string;
                codigoProvincia: number;
            };
        };
    };
}

interface CitiesProps {
    cities: CiudadDTO[];
    loading: boolean;
    error: string | null;
    selectedCity: string;
    search: string;
    options: { value: string }[];
    onSelectCity: (value: string) => void;
    onSearch: (value: string) => void;
    onChange: (value: string) => void;
}


const Cities: React.FC<CitiesProps> = ({
                                           cities,
                                           loading,
                                           error,
                                           selectedCity,
                                           options,
                                           onSelectCity,
                                           onSearch,
                                           onChange
                                       }) => {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
        },
        {
            title: 'Código Ciudad',
            dataIndex: 'codigoCiudad',
            key: 'codigoCiudad',
        },
        {
            title: 'Departamento',
            dataIndex: ['departamento', 'nombre'],
            key: 'departamento',
        },
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
        <Layout style={{ padding: '24px' }}>
            <AutoComplete
                options={options}
                placeholder="Selecciona una ciudad"
                onSelect={onSelectCity}
                onChange={onChange}
                onSearch={onSearch}
                style={{ width: 300, marginBottom: 16 }}
                showSearch={{
                    filterOption: (inputValue, option) =>
                        normalizeText(option!.value).includes(normalizeText(inputValue)),
                }}
            />
            {selectedCity && (
                <Typography.Text style={{ display: 'block', marginBottom: 16 }}>
                    Ciudad Seleccionada: {selectedCity}
                </Typography.Text>
            )}
            <Title level={2}>Lista de Ciudades</Title>
            <Table
                dataSource={cities}
                columns={columns}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </Layout>
    );
};

export default Cities;
