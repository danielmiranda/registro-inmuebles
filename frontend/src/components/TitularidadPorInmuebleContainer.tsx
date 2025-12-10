import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import TitularidadPorInmueble, { type TitularidadDraftRow } from './TitularidadPorInmueble';

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

interface CiudadDTO {
  id: number;
  nombre: string;
}

interface DepartamentoDTO {
  id: number;
  nombre: string;
}

export interface TitularidadResponseDTO {
  id: number;
  personaId: number;
  inmuebleId: number;
  numerador: number;
  denominador: number;
  porcentaje: number;
}

const TitularidadPorInmuebleContainer = () => {
  const [personas, setPersonas] = useState<PersonaDTO[]>([]);
  const [inmuebles, setInmuebles] = useState<InmuebleDTO[]>([]);
  const [ciudades, setCiudades] = useState<CiudadDTO[]>([]);
  const [departamentos, setDepartamentos] = useState<DepartamentoDTO[]>([]);

  const [titularidades, setTitularidades] = useState<TitularidadResponseDTO[]>([]);
  const [selectedInmuebleId, setSelectedInmuebleId] = useState<number | null>(null);

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

      if (pRes.status === 'fulfilled') setPersonas(pRes.value.data);
      if (iRes.status === 'fulfilled') setInmuebles(iRes.value.data);
      if (cRes.status === 'fulfilled') setCiudades(cRes.value.data);
      if (dRes.status === 'fulfilled') setDepartamentos(dRes.value.data);

      if (pRes.status === 'rejected') setError(prev => prev ?? 'Error al cargar personas');
      if (iRes.status === 'rejected') setError(prev => prev ?? 'Error al cargar inmuebles');
    } finally {
      setLoading(false);
    }
  };

  const fetchTitularidades = async (inmuebleId: number) => {
    setListLoading(true);
    try {
      const res = await axios.get('/titularidades', { params: { inmuebleId } });
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
    if (selectedInmuebleId != null) fetchTitularidades(selectedInmuebleId);
    else setTitularidades([]);
  }, [selectedInmuebleId]);

  const handleCreateInmueble = async (values: { matricula: string; nomenclatura: string; ciudadId: number; departamentoId: number }) => {
    setFormLoading(true);
    try {
      const res = await axios.post('/inmuebles', values);
      const created = res.data;
      const list = await axios.get('/inmuebles');
      setInmuebles(list.data);
      setSelectedInmuebleId(created.id);
      return { id: created.id };
    } finally {
      setFormLoading(false);
    }
  };

  const handleSubmitTitularidades = async (rows: TitularidadDraftRow[]) => {
    if (selectedInmuebleId == null) return;
    setFormLoading(true);
    try {
      // Create each titularidad for the selected inmueble
      for (const r of rows) {
        await axios.post('/titularidades', {
          personaId: r.personaId,
          inmuebleId: selectedInmuebleId,
          numerador: r.numerador,
          denominador: r.denominador,
        });
      }
      await fetchTitularidades(selectedInmuebleId);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteTitularidad = async (id: number) => {
    if (selectedInmuebleId == null) return;
    setFormLoading(true);
    try {
      await axios.delete(`/titularidades/${id}`);
      await fetchTitularidades(selectedInmuebleId);
    } finally {
      setFormLoading(false);
    }
  };

  const personaOptions = useMemo(() => personas.map(p => ({
    value: p.id,
    label: `${p.nombre} ${p.apellido} (${p.cuit})`,
  })), [personas]);

  const inmuebleOptions = useMemo(() => inmuebles.map(i => ({
    value: i.id,
    label: `${i.matricula} - ${i.nomenclatura}`,
  })), [inmuebles]);

  const ciudadOptions = useMemo(() => ciudades.map(c => ({ value: c.id, label: c.nombre })), [ciudades]);
  const departamentoOptions = useMemo(() => departamentos.map(d => ({ value: d.id, label: d.nombre })), [departamentos]);

  return (
    <TitularidadPorInmueble
      loading={loading}
      listLoading={listLoading}
      formLoading={formLoading}
      error={error}
      noData={noData}
      selectedInmuebleId={selectedInmuebleId}
      inmuebleOptions={inmuebleOptions}
      personaOptions={personaOptions}
      titulares={titularidades}
      onChangeInmueble={setSelectedInmuebleId}
      onCreateInmueble={handleCreateInmueble}
      onSubmitTitularidades={handleSubmitTitularidades}
      onDeleteTitularidad={handleDeleteTitularidad}
      ciudadOptions={ciudadOptions}
      departamentoOptions={departamentoOptions}
    />
  );
};

export default TitularidadPorInmuebleContainer;
