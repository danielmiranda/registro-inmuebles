import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Titularidad from './Titularidad.tsx';

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

interface CiudadDTO {
  id: number;
  nombre: string;
  codigoCiudad: number;
}

interface DepartamentoDTO {
  id: number;
  nombre: string;
  codigoDepartamento: number;
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
  const [ciudades, setCiudades] = useState<CiudadDTO[]>([]);
  const [departamentos, setDepartamentos] = useState<DepartamentoDTO[]>([]);

  const [selectedPersonaId, setSelectedPersonaId] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [noData, setNoData] = useState<boolean>(false);

    const fetchBaseData = async () => {
        setLoading(true);
        try {
            const [pRes, iRes, cRes, dRes] = await Promise.allSettled([
                axios.get('/personas'),
                axios.get('/inmuebles'),
                axios.get('/ciudades'),
                axios.get('/departamentos'),
            ]);

            // Personas
            if (pRes.status === 'fulfilled') {
                setPersonas(pRes.value.data);
            } else if (axios.isAxiosError(pRes.reason) && pRes.reason.response?.status === 400 && (pRes.reason.response.data as any)?.message === 'No hay información disponible') {
                setPersonas([]);
            } else if (pRes.status === 'rejected') {
                // Si falló distinto a "no hay info", mostrar error relacionado con personas
                setError('Error al cargar personas');
            }

            // Inmuebles
            if (iRes.status === 'fulfilled') {
                setInmuebles(iRes.value.data);
            } else if (axios.isAxiosError(iRes.reason) && iRes.reason.response?.status === 400 && (iRes.reason.response.data as any)?.message === 'No hay información disponible') {
                setInmuebles([]);
            } else if (iRes.status === 'rejected') {
                // Si falló distinto a "no hay info", mostrar error relacionado con inmuebles
                setError(prev => prev ?? 'Error al cargar inmuebles');
            }

            // Ciudades
            if (cRes.status === 'fulfilled') {
                setCiudades(cRes.value.data);
            } else if (axios.isAxiosError(cRes.reason) && cRes.reason.response?.status === 400 && (cRes.reason.response.data as any)?.message === 'No hay información disponible') {
                setCiudades([]);
            } else if (cRes.status === 'rejected') {
                setError(prev => prev ?? 'Error al cargar ciudades');
            }

            // Departamentos
            if (dRes.status === 'fulfilled') {
                setDepartamentos(dRes.value.data);
            } else if (axios.isAxiosError(dRes.reason) && dRes.reason.response?.status === 400 && (dRes.reason.response.data as any)?.message === 'No hay información disponible') {
                setDepartamentos([]);
            } else if (dRes.status === 'rejected') {
                setError(prev => prev ?? 'Error al cargar departamentos');
            }

            // Si ambos vacíos por falta de datos, puedes setear un noData general si te sirve para la UI
            // setNoData(personas.length === 0 && inmuebles.length === 0);
        } finally {
            setLoading(false);
        }
    };

  const fetchTitularidades = async (personaId: number) => {
    setListLoading(true);
    try {
      const res = await axios.get('/titularidades', { params: { personaId } });
      // Enriquecer con ciudad y departamento (nombres)
      const inmueblesMap = new Map(inmuebles.map(i => [i.id, i]));
      const ciudadMap = new Map(ciudades.map(c => [c.id, c.nombre]));
      const deptoMap = new Map(departamentos.map(d => [d.id, d.nombre]));

      const enriched = res.data.map((t: TitularidadResponseDTO) => {
        const inm = inmueblesMap.get(t.inmuebleId);
        const ciudadNombre = inm ? ciudadMap.get(inm.ciudadId) : undefined;
        const departamentoNombre = inm ? deptoMap.get(inm.departamentoId) : undefined;
        return { ...t, ciudadNombre, departamentoNombre } as any;
      });
      setTitularidades(enriched);
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

  const handleCreatePersona = async (values: { cuit: string; nombre: string; apellido: string }) => {
    setFormLoading(true);
    try {
      await axios.post('/personas', values);
      // Refrescar listado de personas para que aparezca en el Select
      const pRes = await axios.get('/personas');
      setPersonas(pRes.data);
      const newItemPersona = pRes.data.find((p: any) => p.cuit === values.cuit);
      if (newItemPersona) setSelectedPersonaId(newItemPersona.id);
      setError(null);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        throw new Error('Ya existe una persona con el CUIT especificado');
      }
      throw new Error('Error al crear la persona');
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
      onCreatePersona={handleCreatePersona}
    />
  );
};

export default TitularidadContainer;
