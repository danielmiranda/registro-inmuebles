import { useEffect, useState } from 'react';
import axios from 'axios';
import Cities from './Cities'; // Import the presentation component

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

const CitiesContainer = () => {
    const [cities, setCities] = useState<CiudadDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedCity, setSelectedCity] = useState<string>('');
    const [search, setSearch] = useState("");

    const handleSearch = (value: string) => {
        setSearch(value);
    };

    const normalizeText = (text: string) => {
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

    const options = cities.map(city => ({ value: city.nombre }));

    return (
        <Cities
            cities={filteredData}
            loading={loading}
            error={error}
            selectedCity={selectedCity}
            search={search}
            options={options}
            onSelectCity={setSelectedCity}
            onSearch={handleSearch}
        />
    );
};

export default CitiesContainer;
