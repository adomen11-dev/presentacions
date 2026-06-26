export interface Objectiu {
  id: string;
  codi: string; // e.g. "a", "b", "c"
  text: string;
}

export interface RA {
  id: string;
  codi: string; // e.g. "1", "2", "3"
  text: string;
  ponderacio: number; // percentage e.g. 25
  dataInici: string; // e.g. "15/09"
  dataFinal: string; // e.g. "10/11"
}

export interface Competencia {
  id: string;
  codi: string; // e.g. "a", "b", "c"
  text: string;
}

export interface SimpleRow {
  id: string;
  text: string;
}

export interface ModulePresentation {
  id: string;
  
  // Pestanya 1: Dades
  departament: string;
  familiaProfessional: string;
  cicleFormatiu: string;
  codiModul: string;
  nomModul: string;
  horesCentre: number;
  horesEmpresa: number;
  totalHores: number;
  professorat: string;

  // Pestanya 2: Objectius
  objectius: Objectiu[];

  // Pestanya 3: RAs
  ras: RA[];

  // Pestanya 4: Competències
  competencies: Competencia[];

  // Pestanya 5: Avaluació
  avaluacioPrimera: string; // Text condicions Primera convocatòria
  avaluacioSegona: string;  // Text condicions Segona convocatòria

  // Pestanyes 6 a 10 (Llistes unicolumna de text lliure)
  metodologia: SimpleRow[];
  activitats: SimpleRow[];
  sortides: SimpleRow[];
  espaisrecursos: SimpleRow[];
  bibliografia: SimpleRow[];
}
