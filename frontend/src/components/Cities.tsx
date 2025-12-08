import { useEffect, useState } from 'react';
import { Table, Spin, Alert, Layout, Typography, AutoComplete } from 'antd';
import axios from 'axios';

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

const Cities = () => {
    const [cities, setCities] = useState<CiudadDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string>('');

    const [search, setSearch] = useState("");

    const handleSearch = (value) => {
        setSearch(value);
    };

    const normalizeText = (text) => {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
    };

    const filteredData = cities.filter(item =>
        normalizeText(item.nombre).includes(normalizeText(search))
    );

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('/ciudades');
        setCities(response.data);
      } catch (err) {
        setError('Error al cargar las ciudades');
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

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

  const options = cities.map(city => ({ value: city.nombre }));

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
        placeholder="Seleccione una ciudad"
        onSelect={setSelectedCity}
        onSearch={handleSearch}
        style={{ width: 300, marginBottom: 16 }}
        showSearch={{
            filterOption: (inputValue, option) =>
                normalizeText(option!.value).includes(normalizeText(inputValue)),
        }}
      />
      <Title level={2}>Lista de Ciudades</Title>
      <Table
        dataSource={filteredData}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </Layout>
  );
};

export default Cities;