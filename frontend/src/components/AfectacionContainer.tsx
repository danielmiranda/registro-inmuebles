import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Afectacion from './Afectacion';

export interface PersonaDTO {
  id: number;
  cuit: string;
  nombre: string;
  apellido: string;
}

export interface InmuebleDTO {
  id: number;
  matricula: string;
  nomenclatura: string;
  ciudadId: number;
  departamentoId: number;
}

export type EstadoAfectacion =
  | 'BORRADOR' | 'PENDIENTE' | 'EN_REVISION' | 'APROBADA' | 'RECHAZADA' | 'CANCELADA';

export interface AfectacionCreateDTO {
  personaId: number;
  inmuebleId: number;
  estado: EstadoAfectacion;
  nroExpediente: string;
  fecha: string; // ISO yyyy-MM-dd
}

interface TitularidadDTO {
  id: number;
  personaId: number;
  inmuebleId: number;
  numerador?: number;
  denominador?: number;
  porcentaje?: number;
}

interface CiudadDTO { id: number; nombre: string }
interface DepartamentoDTO { id: number; nombre: string }

const AfectacionContainer = () => {
  const [personas, setPersonas] = useState<PersonaDTO[]>([]);
  const [inmuebles, setInmuebles] = useState<InmuebleDTO[]>([]);
  const [titularidades, setTitularidades] = useState<TitularidadDTO[]>([]);
  const [ciudades, setCiudades] = useState<CiudadDTO[]>([]);
  const [departamentos, setDepartamentos] = useState<DepartamentoDTO[]>([]);

  const [selectedPersonaId, setSelectedPersonaId] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [listLoading, setListLoading] = useState<boolean>(false);
  const [formLoading, setFormLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [noData, setNoData] = useState<boolean>(false);

  // Titulares del inmueble seleccionado (grilla debajo del selector de inmueble)
  const [selectedInmuebleId, setSelectedInmuebleId] = useState<number | null>(null);
  const [titularesInmueble, setTitularesInmueble] = useState<TitularidadDTO[]>([]);
  const [titularesInmuebleLoading, setTitularesInmuebleLoading] = useState<boolean>(false);

  const fetchBaseData = async () => {
    setLoading(true);
    try {
      const [pRes, iRes, cRes, dRes] = await Promise.all([
        axios.get('/personas'),
        axios.get('/inmuebles'),
        axios.get('/ciudades'),
        axios.get('/departamentos'),
      ]);
      setPersonas(pRes.data);
      setInmuebles(iRes.data);
      setCiudades(cRes.data);
      setDepartamentos(dRes.data);
      setNoData(false);
      setError(null);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 400 && (err.response.data as any)?.message === 'No hay información disponible') {
        setPersonas([]);
        setInmuebles([]);
        setCiudades([]);
        setDepartamentos([]);
        setNoData(true);
        setError(null);
      } else {
        setError('Error al cargar datos');
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchTitularidades = async (personaId: number) => {
    setListLoading(true);
    try {
      const res = await axios.get('/titularidades', { params: { personaId } });
      setTitularidades(res.data);
      setError(null);
    } catch (err: any) {
      // Si no hay titularidades, sólo vaciar lista; no es un error bloqueante para el formulario
      if (axios.isAxiosError(err) && err.response?.status === 400 && (err.response.data as any)?.message === 'No hay información disponible') {
        setTitularidades([]);
      } else {
        setError('Error al cargar titularidades de la persona');
      }
    } finally {
      setListLoading(false);
    }
  };

  const fetchTitularesByInmueble = async (inmuebleId: number) => {
    setTitularesInmuebleLoading(true);
    try {
      const res = await axios.get('/titularidades', { params: { inmuebleId } });
      setTitularesInmueble(res.data);
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 400 && (err.response.data as any)?.message === 'No hay información disponible') {
        setTitularesInmueble([]);
      } else {
        // no elevar error a nivel de pantalla principal; sólo dejar la grilla vacía
        setTitularesInmueble([]);
      }
    } finally {
      setTitularesInmuebleLoading(false);
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
    }
  }, [selectedPersonaId]);

  // Cuando cambia el inmueble seleccionado (propagado desde la vista), cargar titulares del inmueble
  useEffect(() => {
    if (selectedInmuebleId != null) {
      fetchTitularesByInmueble(selectedInmuebleId);
    } else {
      setTitularesInmueble([]);
    }
  }, [selectedInmuebleId]);

  const titularInmuebleIds = useMemo(() => new Set(titularidades.map(t => t.inmuebleId)), [titularidades]);

  // Mostrar sólo los inmuebles asociados a la persona seleccionada.
  // Si no hay persona seleccionada, mostrar todos.
  const inmuebleOptions = useMemo(() => {
    const list =
      selectedPersonaId != null
        ? inmuebles.filter(i => titularInmuebleIds.has(i.id))
        : inmuebles;
    return list.map(i => ({ value: i.id, label: `${i.matricula} - ${i.nomenclatura}` }));
  }, [inmuebles, selectedPersonaId, titularInmuebleIds]);

  const personaOptions = useMemo(() => personas.map(p => ({ value: p.id, label: `${p.nombre} ${p.apellido} (${p.cuit})` })), [personas]);

  const handleCrearAfectacion = async (payload: AfectacionCreateDTO) => {
    setFormLoading(true);
    try {
      await axios.post('/afectaciones', payload);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const msg = (err.response?.data as any)?.message || 'Error al crear la afectación';
        throw new Error(msg);
      }
      throw new Error('Error al crear la afectación');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCreatePersona = async (values: { cuit: string; nombre: string; apellido: string }) => {
    setFormLoading(true);
    try {
      const res = await axios.post('/personas', values);
      await fetchBaseData();
      const created: PersonaDTO = res.data;
      setSelectedPersonaId(created.id);
      return created;
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response?.status === 409) {
        throw new Error('Ya existe una persona con el CUIT especificado');
      }
      throw new Error('Error al crear la persona');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCreateInmueble = async (values: { matricula: string; nomenclatura: string; ciudadId: number; departamentoId: number }) => {
    setFormLoading(true);
    try {
      const res = await axios.post('/inmuebles', values);
      await fetchBaseData();
      const created: InmuebleDTO = res.data;
      return created;
    } catch (err) {
      throw new Error('Error al crear el inmueble');
    } finally {
      setFormLoading(false);
    }
  };

  const handleCreateTitularidad = async (values: { inmuebleId: number; numerador: number; denominador: number }) => {
    if (selectedPersonaId == null) throw new Error('Seleccione una persona');
    setFormLoading(true);
    try {
      await axios.post('/titularidades', {
        personaId: selectedPersonaId,
        inmuebleId: values.inmuebleId,
        numerador: values.numerador,
        denominador: values.denominador,
      });
      await fetchTitularidades(selectedPersonaId);
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 409) throw new Error('La titularidad ya existe');
        const msg = (err.response?.data as any)?.message || 'Error al crear la titularidad';
        throw new Error(msg);
      }
      throw new Error('Error al crear la titularidad');
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <Afectacion
      loading={loading}
      listLoading={listLoading}
      formLoading={formLoading}
      error={error}
      noData={noData}
      personaOptions={personaOptions}
      inmuebleOptions={inmuebleOptions}
      ciudadOptions={ciudades.map(c => ({ value: c.id, label: c.nombre }))}
      departamentoOptions={departamentos.map(d => ({ value: d.id, label: d.nombre }))}
      selectedPersonaId={selectedPersonaId}
      onChangePersona={setSelectedPersonaId}
      selectedInmuebleId={selectedInmuebleId}
      onChangeInmueble={setSelectedInmuebleId}
      onReload={fetchBaseData}
      onCreateAfectacion={handleCrearAfectacion}
      onCreatePersona={handleCreatePersona}
      onCreateInmueble={handleCreateInmueble}
      titularInmuebleIds={[...titularInmuebleIds]}
      onCreateTitularidad={handleCreateTitularidad}
      titularesInmueble={titularesInmueble}
      titularesInmuebleLoading={titularesInmuebleLoading}
    />
  );
};

export default AfectacionContainer;
