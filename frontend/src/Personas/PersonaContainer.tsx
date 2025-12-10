import { useEffect, useState } from 'react';
import axios from 'axios';
import Persona from './Persona.tsx';

export interface PersonaCreateUpdateDTO {
  cuit: string;
  nombre: string;
  apellido: string;
}

export interface PersonaResponseDTO {
  id: number;
  cuit: string;
  nombre: string;
  apellido: string;
}

const PersonaContainer = () => {
  const [personas, setPersonas] = useState<PersonaResponseDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [noData, setNoData] = useState<boolean>(false);

  const fetchPersonas = async () => {
    try {
      const response = await axios.get('/personas');
      setPersonas(response.data);
      setNoData(false);
      setError(null);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 400 && (err.response.data as any)?.message === 'No hay información disponible') {
        setPersonas([]);
        setNoData(true);
        setError(null);
      } else {
        setError('Error al cargar las personas');
      }
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchPersonas();
      setLoading(false);
    })();
  }, []);

  const handleCreate = async (values: PersonaCreateUpdateDTO) => {
    setFormLoading(true);
    try {
      await axios.post('/personas', values);
      await fetchPersonas();
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        throw new Error('Ya existe una persona con el CUIT especificado');
      }
      throw new Error('Error al crear la persona');
    } finally {
      setFormLoading(false);
    }
  };

  const handleUpdate = async (id: number, values: PersonaCreateUpdateDTO) => {
    setFormLoading(true);
    try {
      await axios.put(`/personas/${id}`, values);
      await fetchPersonas();
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        throw new Error('Ya existe una persona con el CUIT especificado');
      }
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        throw new Error('La persona no existe o fue eliminada');
      }
      throw new Error('Error al actualizar la persona');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setFormLoading(true);
    try {
      await axios.delete(`/personas/${id}`);
      await fetchPersonas();
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        throw new Error('La persona no existe o ya fue eliminada');
      }
      throw new Error('Error al eliminar la persona');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Persona
      personas={personas}
      loading={loading}
      formLoading={formLoading}
      error={error}
      noData={noData}
      onCreate={handleCreate}
      onUpdate={handleUpdate}
      onDelete={handleDelete}
    />
  );
};

export default PersonaContainer;
