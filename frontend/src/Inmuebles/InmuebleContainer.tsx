import { useEffect, useState } from 'react';
import axios from 'axios';
import Inmueble from './Inmueble.tsx'; // Import the presentation component

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

interface DepartamentoDTO {
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
}

interface InmuebleDTO {
    matricula: string;
    nomenclatura: string;
    ciudadId: number;
    departamentoId: number;
}

interface InmuebleResponseDTO {
    id: number;
    matricula: string;
    nomenclatura: string;
    ciudadId: number;
    departamentoId: number;
}

const InmuebleContainer = () => {
    const [inmuebles, setInmuebles] = useState<InmuebleResponseDTO[]>([]);
    const [ciudades, setCiudades] = useState<CiudadDTO[]>([]);
    const [departamentos, setDepartamentos] = useState<DepartamentoDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [formLoading, setFormLoading] = useState(false);
    const [noData, setNoData] = useState(false);

    const fetchInmuebles = async () => {
        try {
            const response = await axios.get('/inmuebles');
            setInmuebles(response.data);
            setNoData(false);
        } catch (err: any) {
            // Mostrar botón para cargar inmueble cuando el backend indica que no hay información disponible
            if (axios.isAxiosError(err) && err.response?.status === 400 && (err.response.data as any)?.message === 'No hay información disponible') {
                setInmuebles([]);
                setNoData(true);
                setError(null);
            } else {
                setError('Error al cargar los inmuebles');
            }
        }
    };

    const fetchCiudades = async () => {
        try {
            const response = await axios.get('/ciudades');
            setCiudades(response.data);
        } catch (err) {
            setError('Error al cargar las ciudades');
        }
    };

    const fetchDepartamentos = async () => {
        try {
            const response = await axios.get('/departamentos');
            setDepartamentos(response.data);
        } catch (err) {
            setError('Error al cargar los departamentos');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await Promise.all([fetchInmuebles(), fetchCiudades(), fetchDepartamentos()]);
            setLoading(false);
        };

        fetchData();
    }, []);

    const handleSubmit = async (values: InmuebleDTO) => {
        setFormLoading(true);
        try {
            await axios.post('/inmuebles', values);
            await fetchInmuebles(); // Refresh the list
        } catch (err) {
            setError('Error al crear el inmueble');
        } finally {
            setFormLoading(false);
        }
    };

    const ciudadOptions = ciudades.map(ciudad => ({
        value: ciudad.id,
        label: ciudad.nombre
    }));

    const departamentoOptions = departamentos.map(departamento => ({
        value: departamento.id,
        label: departamento.nombre
    }));

    return (
        <Inmueble
            inmuebles={inmuebles}
            ciudadOptions={ciudadOptions}
            departamentoOptions={departamentoOptions}
            loading={loading}
            formLoading={formLoading}
            error={error}
            noData={noData}
            onSubmit={handleSubmit}
        />
    );
};

export default InmuebleContainer;