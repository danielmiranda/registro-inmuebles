import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Titularidad from './Titularidad';

export interface PersonaResponseDTO {
  id: number;
  cuit: string;
  nombre: string;
  apellido: string;
}

export interface InmuebleResponseDTO {
  id: number;
  matricula: string;
  nomenclatura: string;
  ciudadId: number;
  departamentoId: number;
}

export interface TitularidadResponseDTO {
  id: number;
  personaId: number;
  inmuebleId: number;
  numerador: number;
  denominador: number;
  porcentaje: number;
}

export interface TitularidadCreateDTO {
  inmuebleId: number;
  numerador: number;
  denominador: number;
}

const TitularidadContainer = () => {
  const [personas, setPersonas] = useState<PersonaResponseDTO[]>([]);
  const [inmuebles, setInmuebles] = useState<InmuebleResponseDTO[]>([]);
  const [titularidades, setTitularidades] = useState<TitularidadResponseDTO[]>([]);

  const [selectedPersonaId, setSelectedPersonaId] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [noData, setNoData] = useState<boolean>(false);

  const fetchBaseData = async () => {
    setLoading(true);
    try {
      const [pRes, iRes] = await Promise.all([
        axios.get('/personas'),
        axios.get('/inmuebles'),
      ]);
      setPersonas(pRes.data);
      setInmuebles(iRes.data);
      setError(null);
    } catch (err: any) {
      setError('Error al cargar datos base (personas/inmuebles)');
    } finally {
      setLoading(false);
    }
  };

  const fetchTitularidades = async (personaId: number) => {
    setListLoading(true);
    try {
      const res = await axios.get('/titularidades', { params: { personaId } });
      setTitularidades(res.data);
      setNoData(false);
      setError(null);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 400 && (err.response.data as any)?.message === 'No hay información disponible') {
        setTitularidades([]);
        setNoData(true);
        setError(null);
      } else {
        setError('Error al cargar las titularidades');
      }
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchBaseData();
  }, []);

  useEffect(() => {
    if (selectedPersonaId != null) {
      fetchTitularidades(selectedPersonaId);
    } else {
      setTitularidades([]);
      setNoData(false);
    }
  }, [selectedPersonaId]);

  const handleCreate = async (payload: TitularidadCreateDTO) => {
    if (selectedPersonaId == null) return;
    setFormLoading(true);
    try {
      await axios.post('/titularidades', {
        personaId: selectedPersonaId,
        inmuebleId: payload.inmuebleId,
        numerador: payload.numerador,
        denominador: payload.denominador,
      });
      await fetchTitularidades(selectedPersonaId);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 404) {
          throw new Error('Persona o inmueble no encontrado');
        }
        if (err.response?.status === 409) {
          throw new Error('Ya existe una titularidad para esa persona en ese inmueble');
        }
        if (err.response?.status === 400) {
          const msg = (err.response.data as any)?.message || 'Validación fallida';
          throw new Error(msg);
        }
      }
      throw new Error('Error al crear la titularidad');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (selectedPersonaId == null) return;
    setFormLoading(true);
    try {
      await axios.delete(`/titularidades/${id}`);
      await fetchTitularidades(selectedPersonaId);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 404) {
        throw new Error('La titularidad no existe o ya fue eliminada');
      }
      throw new Error('Error al eliminar la titularidad');
    } finally {
      setFormLoading(false);
    }
  };

  const personaOptions = useMemo(() => personas.map(p => ({
    value: p.id,
    label: `${p.nombre} ${p.apellido} (${p.cuit})`
  })), [personas]);

  const inmuebleOptions = useMemo(() => inmuebles.map(i => ({
    value: i.id,
    label: `${i.matricula} - ${i.nomenclatura}`
  })), [inmuebles]);

  return (
    <Titularidad
      personaOptions={personaOptions}
      inmuebleOptions={inmuebleOptions}
      titularidades={titularidades}
      selectedPersonaId={selectedPersonaId}
      onChangePersona={setSelectedPersonaId}
      loading={loading}
      listLoading={listLoading}
      formLoading={formLoading}
      error={error}
      noData={noData}
      onCreate={handleCreate}
      onDelete={handleDelete}
    />
  );
};

export default TitularidadContainer;
