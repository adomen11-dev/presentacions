import React, { useState, useEffect } from "react";
import { 
  ModulePresentation, 
  Objectiu, 
  RA, 
  Competencia, 
  SimpleRow 
} from "../types";
import { 
  CICLES_TEMPLATES, 
  MODULE_TEMPLATES, 
  CycleTemplate 
} from "../data/defaults";
import { getOfficialCurriculumData } from "../data/curriculumData";
import { 
  Save, 
  Plus, 
  Trash2, 
  Calendar, 
  Award, 
  BookOpen, 
  Clock, 
  FileSpreadsheet, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight, 
  Check, 
  GraduationCap, 
  MapPin, 
  Laptop, 
  BookMarked, 
  Layers, 
  FileText, 
  User, 
  ListTodo,
  ChevronDown,
  ChevronUp
} from "lucide-react";

interface ModuleFormProps {
  module: ModulePresentation;
  onUpdate: (updated: ModulePresentation) => void;
  onExportCSV: () => void;
  modules: ModulePresentation[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

const ensureIsoDate = (dateStr: string, defaultDate: string): string => {
  if (!dateStr) return defaultDate;
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    return dateStr;
  }
  // Try to parse DD/MM or DD-MM format
  const match = dateStr.match(/^(\d{1,2})[\/\-](\d{1,2})$/) || dateStr.match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{2,4})$/);
  if (match) {
    const day = match[1].padStart(2, '0');
    const month = match[2].padStart(2, '0');
    let year = "2026";
    if (match[3]) {
      year = match[3].length === 2 ? "20" + match[3] : match[3];
    } else {
      const mNum = parseInt(month, 10);
      if (mNum >= 1 && mNum <= 5) {
        year = "2027";
      }
    }
    const candidate = `${year}-${month}-${day}`;
    if (candidate < "2026-09-10") return "2026-09-10";
    if (candidate > "2027-05-14") return "2027-05-14";
    return candidate;
  }
  return defaultDate;
};

export default function ModuleForm({ 
  module, 
  onUpdate, 
  onExportCSV,
  modules,
  selectedId,
  onSelect,
  onDelete
}: ModuleFormProps) {
  // 1 to 10 step navigation, mapping exactly to the 10 sheets
  const [currentStep, setCurrentStep] = useState(1);

  // Sync state variables directly with the selected module's properties
  const [departament, setDepartament] = useState(module.departament);
  const [familiaProfessional, setFamiliaProfessional] = useState(module.familiaProfessional);
  const [cicleFormatiu, setCicleFormatiu] = useState(module.cicleFormatiu);
  const [codiModul, setCodiModul] = useState(module.codiModul);
  const [nomModul, setNomModul] = useState(module.nomModul);
  const [horesCentre, setHoresCentre] = useState(module.horesCentre);
  const [horesEmpresa, setHoresEmpresa] = useState(module.horesEmpresa);
  const [totalHores, setTotalHores] = useState(module.totalHores);
  const [professorat, setProfessorat] = useState(module.professorat);

  const [objectius, setObjectius] = useState<Objectiu[]>(module.objectius || []);
  const [ras, setRas] = useState<RA[]>(module.ras || []);
  const [competencies, setCompetencies] = useState<Competencia[]>(module.competencies || []);
  
  const [avaluacioPrimera, setAvaluacioPrimera] = useState(module.avaluacioPrimera || "");
  const [avaluacioSegona, setAvaluacioSegona] = useState(module.avaluacioSegona || "");

  const [metodologia, setMetodologia] = useState<SimpleRow[]>(module.metodologia || []);
  const [activitats, setActivitats] = useState<SimpleRow[]>(module.activitats || []);
  const [sortides, setSortides] = useState<SimpleRow[]>(module.sortides || []);
  const [espaisrecursos, setEspaisrecursos] = useState<SimpleRow[]>(module.espaisrecursos || []);
  const [bibliografia, setBibliografia] = useState<SimpleRow[]>(module.bibliografia || []);

  // Micro-Assistents d'Importació i Cleaners
  const [isObjImportOpen, setIsObjImportOpen] = useState(false);
  const [isRaImportOpen, setIsRaImportOpen] = useState(false);
  const [isCompImportOpen, setIsCompImportOpen] = useState(false);
  const [isActImportOpen, setIsActImportOpen] = useState(false);

  const [rawObjText, setRawObjText] = useState("");
  const [rawRaText, setRawRaText] = useState("");
  const [rawCompText, setRawCompText] = useState("");
  const [rawActText, setRawActText] = useState("");

  const [activeCleanerField, setActiveCleanerField] = useState<"avaluacioPrimera" | "avaluacioSegona" | "metodologia" | "espais" | "bibliografia" | null>(null);
  const [cleanerInputText, setCleanerInputText] = useState("");

  // Sync state if module changes (e.g., loaded from lists or changed id)
  useEffect(() => {
    setDepartament(module.departament);
    setFamiliaProfessional(module.familiaProfessional);
    setCicleFormatiu(module.cicleFormatiu);
    setCodiModul(module.codiModul);
    setNomModul(module.nomModul);
    setHoresCentre(module.horesCentre);
    setHoresEmpresa(module.horesEmpresa);
    setTotalHores(module.totalHores);
    setProfessorat(module.professorat);

    setObjectius(module.objectius || []);
    setRas(module.ras || []);
    setCompetencies(module.competencies || []);

    setAvaluacioPrimera(module.avaluacioPrimera || "");
    setAvaluacioSegona(module.avaluacioSegona || "");

    setMetodologia(module.metodologia || []);
    setActivitats(module.activitats || []);
    setSortides(module.sortides || []);
    setEspaisrecursos(module.espaisrecursos || []);
    setBibliografia(module.bibliografia || []);
  }, [module.id]);

  // Central update dispatcher
  const dispatchUpdate = (fields: Partial<ModulePresentation>) => {
    const updated = {
      ...module,
      departament: fields.departament !== undefined ? fields.departament : departament,
      familiaProfessional: fields.familiaProfessional !== undefined ? fields.familiaProfessional : familiaProfessional,
      cicleFormatiu: fields.cicleFormatiu !== undefined ? fields.cicleFormatiu : cicleFormatiu,
      codiModul: fields.codiModul !== undefined ? fields.codiModul : codiModul,
      nomModul: fields.nomModul !== undefined ? fields.nomModul : nomModul,
      horesCentre: fields.horesCentre !== undefined ? fields.horesCentre : horesCentre,
      horesEmpresa: fields.horesEmpresa !== undefined ? fields.horesEmpresa : horesEmpresa,
      totalHores: fields.totalHores !== undefined ? fields.totalHores : totalHores,
      professorat: fields.professorat !== undefined ? fields.professorat : professorat,
      objectius: fields.objectius !== undefined ? fields.objectius : objectius,
      ras: fields.ras !== undefined ? fields.ras : ras,
      competencies: fields.competencies !== undefined ? fields.competencies : competencies,
      avaluacioPrimera: fields.avaluacioPrimera !== undefined ? fields.avaluacioPrimera : avaluacioPrimera,
      avaluacioSegona: fields.avaluacioSegona !== undefined ? fields.avaluacioSegona : avaluacioSegona,
      metodologia: fields.metodologia !== undefined ? fields.metodologia : metodologia,
      activitats: fields.activitats !== undefined ? fields.activitats : activitats,
      sortides: fields.sortides !== undefined ? fields.sortides : sortides,
      espaisrecursos: fields.espaisrecursos !== undefined ? fields.espaisrecursos : espaisrecursos,
      bibliografia: fields.bibliografia !== undefined ? fields.bibliografia : bibliografia,
    };
    onUpdate(updated);
  };

  const handleFieldChange = (field: keyof ModulePresentation, value: any) => {
    if (field === "departament") {
      setDepartament(value);
      dispatchUpdate({ departament: value });
    } else if (field === "familiaProfessional") {
      setFamiliaProfessional(value);
      dispatchUpdate({ familiaProfessional: value });
    } else if (field === "cicleFormatiu") {
      setCicleFormatiu(value);
      dispatchUpdate({ cicleFormatiu: value });
    } else if (field === "codiModul") {
      setCodiModul(value);
      dispatchUpdate({ codiModul: value });
    } else if (field === "nomModul") {
      setNomModul(value);
      dispatchUpdate({ nomModul: value });
    } else if (field === "horesCentre") {
      const hc = Number(value) || 0;
      const th = hc + horesEmpresa;
      setHoresCentre(hc);
      setTotalHores(th);
      dispatchUpdate({ horesCentre: hc, totalHores: th });
    } else if (field === "horesEmpresa") {
      const he = Number(value) || 0;
      const th = horesCentre + he;
      setHoresEmpresa(he);
      setTotalHores(th);
      dispatchUpdate({ horesEmpresa: he, totalHores: th });
    } else if (field === "totalHores") {
      const th = Number(value) || 0;
      setTotalHores(th);
      dispatchUpdate({ totalHores: th });
    } else if (field === "professorat") {
      setProfessorat(value);
      dispatchUpdate({ professorat: value });
    } else if (field === "avaluacioPrimera") {
      setAvaluacioPrimera(value);
      dispatchUpdate({ avaluacioPrimera: value });
    } else if (field === "avaluacioSegona") {
      setAvaluacioSegona(value);
      dispatchUpdate({ avaluacioSegona: value });
    }
  };

  const handleSelectCycle = (cycle: CycleTemplate) => {
    setDepartament(cycle.department);
    setFamiliaProfessional(cycle.family);
    setCicleFormatiu(cycle.name);
    dispatchUpdate({
      departament: cycle.department,
      familiaProfessional: cycle.family,
      cicleFormatiu: cycle.name
    });
  };

  // 1-Click Select Module template & curriculum auto-population
  const handleSelectModuleTemplate = (tmplCodi: string) => {
    const selectedTmpl = MODULE_TEMPLATES.find(t => t.codiModul === tmplCodi && t.cicle === cicleFormatiu);
    if (!selectedTmpl) return;

    const hc = selectedTmpl.horesCentre;
    const he = selectedTmpl.horesEmpresa;
    const th = hc + he;

    setCodiModul(selectedTmpl.codiModul);
    setNomModul(selectedTmpl.nomModul);
    setHoresCentre(hc);
    setHoresEmpresa(he);
    setTotalHores(th);

    // Get official curriculum data matching this module
    const official = getOfficialCurriculumData(cicleFormatiu, selectedTmpl.codiModul);

    // Auto-populate Lists 100% cleanly
    const objs = official?.objectius || [
      { id: `obj-${Date.now()}-1`, codi: "a", text: `Identificar i analitzar els requisits legals i organitzatius de: ${selectedTmpl.nomModul}` },
      { id: `obj-${Date.now()}-2`, codi: "b", text: `Gestionar eficaçment la relació comercial i operativa propis de la matèria.` }
    ];
    setObjectius(objs);

    const rasList = official?.ras || [
      { id: `ra-${Date.now()}-1`, codi: "1", text: `Desenvolupa la comprensió inicial del mòdul professional i els seus components.`, ponderacio: 50, dataInici: "15/09", dataFinal: "31/12" },
      { id: `ra-${Date.now()}-2`, codi: "2", text: `Executa supòsits pràctics i resol incidències segons el protocol establert.`, ponderacio: 50, dataInici: "08/01", dataFinal: "31/05" }
    ];
    setRas(rasList);

    const comps = official?.competencies || [
      { id: `comp-${Date.now()}-1`, codi: "a", text: "Organitzar i supervisar els processos i procediments laborals de l'àrea comercial." },
      { id: `comp-${Date.now()}-2`, codi: "b", text: "Treballar en equip en condicions de seguretat laboral i qualitat de servei." }
    ];
    setCompetencies(comps);

    const acts = [
      { id: `act-${Date.now()}-1`, text: `Supòsit pràctic d'anàlisi de cas corporatiu de ${selectedTmpl.nomModul}.` },
      { id: `act-${Date.now()}-2`, text: "Presentació i treball cooperatiu de resolució i simulació de processos." }
    ];
    setActivitats(acts);

    const mets = [
      { id: `met-${Date.now()}-1`, text: "Metodologia d'aprenentatge basat en projectes de recerca i anàlisi activa." },
      { id: `met-${Date.now()}-2`, text: "Explicacions tècniques combinades amb resolució pràctica d'exercicis." }
    ];
    setMetodologia(mets);

    const sors = [
      { id: `sor-${Date.now()}-1`, text: "Visita programada a un eix logístic o empresa capdavantera del sector." }
    ];
    setSortides(sors);

    const esps = [
      { id: `esp-${Date.now()}-1`, text: "Aula polivalent d'institut equipada amb ordinador de l'alumne i projector." },
      { id: `esp-${Date.now()}-2`, text: "Campus virtual de l'institut (Moodle) per lliurament i seguiment d'activitats." }
    ];
    setEspaisrecursos(esps);

    const bibs = [
      { id: `bib-${Date.now()}-1`, text: `Llibre de text de ${selectedTmpl.nomModul}, McGraw-Hill o Editorial FP equivalent, Edició Recent.` }
    ];
    setBibliografia(bibs);

    dispatchUpdate({
      codiModul: selectedTmpl.codiModul,
      nomModul: selectedTmpl.nomModul,
      horesCentre: hc,
      horesEmpresa: he,
      totalHores: th,
      objectius: objs,
      ras: rasList,
      competencies: comps,
      activitats: acts,
      metodologia: mets,
      sortides: sors,
      espaisrecursos: esps,
      bibliografia: bibs
    });
  };

  // Item List Modifiers
  const addItemRow = (type: "objectius" | "ras" | "competencies" | "metodologia" | "activitats" | "sortides" | "espais" | "bibliografia") => {
    if (type === "objectius") {
      const nextLetter = String.fromCharCode(97 + (objectius.length % 26));
      const newItem: Objectiu = {
        id: "obj-" + Date.now(),
        codi: nextLetter,
        text: "Nou objectiu general del mòdul."
      };
      const nextList = [...objectius, newItem];
      setObjectius(nextList);
      dispatchUpdate({ objectius: nextList });
    } else if (type === "ras") {
      const nextNum = String(ras.length + 1);
      const newItem: RA = {
        id: "ra-" + Date.now(),
        codi: nextNum,
        text: "Nou Resultat d'Aprenentatge esperat.",
        ponderacio: ras.length === 0 ? 100 : 0,
        dataInici: "15/09",
        dataFinal: "15/12"
      };
      const nextList = [...ras, newItem];
      setRas(nextList);
      dispatchUpdate({ ras: nextList });
    } else if (type === "competencies") {
      const nextLetter = String.fromCharCode(97 + (competencies.length % 26));
      const newItem: Competencia = {
        id: "comp-" + Date.now(),
        codi: nextLetter,
        text: "Nova competència personal o professional."
      };
      const nextList = [...competencies, newItem];
      setCompetencies(nextList);
      dispatchUpdate({ competencies: nextList });
    } else {
      // methodology, activities, etc. (SimpleRow)
      const newItem: SimpleRow = {
        id: `row-${type}-${Date.now()}`,
        text: `Nova línia d'informació de ${type}.`
      };
      let nextList: SimpleRow[] = [];
      if (type === "metodologia") {
        nextList = [...metodologia, newItem];
        setMetodologia(nextList);
        dispatchUpdate({ metodologia: nextList });
      } else if (type === "activitats") {
        nextList = [...activitats, newItem];
        setActivitats(nextList);
        dispatchUpdate({ activitats: nextList });
      } else if (type === "sortides") {
        nextList = [...sortides, newItem];
        setSortides(nextList);
        dispatchUpdate({ sortides: nextList });
      } else if (type === "espais") {
        nextList = [...espaisrecursos, newItem];
        setEspaisrecursos(nextList);
        dispatchUpdate({ espaisrecursos: nextList });
      } else if (type === "bibliografia") {
        nextList = [...bibliografia, newItem];
        setBibliografia(nextList);
        dispatchUpdate({ bibliografia: nextList });
      }
    }
  };

  const removeItemRow = (
    type: "objectius" | "ras" | "competencies" | "metodologia" | "activitats" | "sortides" | "espais" | "bibliografia", 
    id: string
  ) => {
    if (type === "objectius") {
      const next = objectius.filter(x => x.id !== id);
      setObjectius(next);
      dispatchUpdate({ objectius: next });
    } else if (type === "ras") {
      const next = ras.filter(x => x.id !== id);
      setRas(next);
      dispatchUpdate({ ras: next });
    } else if (type === "competencies") {
      const next = competencies.filter(x => x.id !== id);
      setCompetencies(next);
      dispatchUpdate({ competencies: next });
    } else if (type === "metodologia") {
      const next = metodologia.filter(x => x.id !== id);
      setMetodologia(next);
      dispatchUpdate({ metodologia: next });
    } else if (type === "activitats") {
      const next = activitats.filter(x => x.id !== id);
      setActivitats(next);
      dispatchUpdate({ activitats: next });
    } else if (type === "sortides") {
      const next = sortides.filter(x => x.id !== id);
      setSortides(next);
      dispatchUpdate({ sortides: next });
    } else if (type === "espais") {
      const next = espaisrecursos.filter(x => x.id !== id);
      setEspaisrecursos(next);
      dispatchUpdate({ espaisrecursos: next });
    } else if (type === "bibliografia") {
      const next = bibliografia.filter(x => x.id !== id);
      setBibliografia(next);
      dispatchUpdate({ bibliografia: next });
    }
  };

  const updateItemRow = (
    type: "objectius" | "ras" | "competencies" | "metodologia" | "activitats" | "sortides" | "espais" | "bibliografia", 
    id: string, 
    field: string, 
    value: any
  ) => {
    if (type === "objectius") {
      const next = objectius.map(x => x.id === id ? { ...x, [field]: value } : x);
      setObjectius(next);
      dispatchUpdate({ objectius: next });
    } else if (type === "ras") {
      const next = ras.map(x => {
        if (x.id === id) {
          return { 
            ...x, 
            [field]: field === "ponderacio" ? (Number(value) || 0) : value 
          };
        }
        return x;
      });
      setRas(next);
      dispatchUpdate({ ras: next });
    } else if (type === "competencies") {
      const next = competencies.map(x => x.id === id ? { ...x, [field]: value } : x);
      setCompetencies(next);
      dispatchUpdate({ competencies: next });
    } else {
      // SimpleRow
      let next: SimpleRow[] = [];
      if (type === "metodologia") {
        next = metodologia.map(x => x.id === id ? { ...x, text: value } : x);
        setMetodologia(next);
        dispatchUpdate({ metodologia: next });
      } else if (type === "activitats") {
        next = activitats.map(x => x.id === id ? { ...x, text: value } : x);
        setActivitats(next);
        dispatchUpdate({ activitats: next });
      } else if (type === "sortides") {
        next = sortides.map(x => x.id === id ? { ...x, text: value } : x);
        setSortides(next);
        dispatchUpdate({ sortides: next });
      } else if (type === "espais") {
        next = espaisrecursos.map(x => x.id === id ? { ...x, text: value } : x);
        setEspaisrecursos(next);
        dispatchUpdate({ espaisrecursos: next });
      } else if (type === "bibliografia") {
        next = bibliografia.map(x => x.id === id ? { ...x, text: value } : x);
        setBibliografia(next);
        dispatchUpdate({ bibliografia: next });
      }
    }
  };

  const handleExtractCompetenciesOrObjectius = (rawText: string, isObjectiu: boolean) => {
    const lines = rawText.split("\n");
    const itemsToAppend: any[] = [];
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;
      // Patterns like a) Text content or a. Text content
      const match = line.match(/^([a-z])[\)\.]\s*(.+)/i);
      if (match) {
        const codi = match[1].toLowerCase();
        const text = match[2].trim();
        itemsToAppend.push({
          id: (isObjectiu ? "obj-" : "comp-") + Date.now() + "-" + Math.random().toString(36).substring(2, 5),
          codi,
          text
        });
      }
    }
    if (itemsToAppend.length > 0) {
      if (isObjectiu) {
        const nextList = [...objectius, ...itemsToAppend];
        setObjectius(nextList);
        dispatchUpdate({ objectius: nextList });
      } else {
        const nextList = [...competencies, ...itemsToAppend];
        setCompetencies(nextList);
        dispatchUpdate({ competencies: nextList });
      }
      return true;
    }
    return false;
  };

  const handleExtractRAs = (rawText: string) => {
    const lines = rawText.split("\n");
    const rAsToAppend: RA[] = [];
    let activeRa: RA | null = null;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      const raMatch = line.match(/^RA\s*(\d+)\.?\s*(.+)/i);
      if (raMatch) {
        if (activeRa) {
          rAsToAppend.push(activeRa);
        }
        activeRa = {
          id: "ra-" + Date.now() + "-" + Math.random().toString(36).substring(2, 5),
          codi: raMatch[1],
          text: raMatch[2].trim(),
          ponderacio: 0,
          dataInici: "15/09",
          dataFinal: "15/12"
        };
        continue;
      }

      if (activeRa) {
        const critMatch = line.match(/^(\d+\.\d+)\.?\s*(.+)/) || line.match(/^-\s*(.+)/);
        if (critMatch) {
          const prefix = critMatch[1] ? critMatch[1] : "";
          const body = critMatch[2] ? critMatch[2] : critMatch[1];
          activeRa.text += `\n- ${prefix} ${body.trim()}`;
        } else {
          activeRa.text += " " + line;
        }
      }
    }

    if (activeRa) {
      rAsToAppend.push(activeRa);
    }

    if (rAsToAppend.length > 0) {
      const currentLength = ras.length;
      const totalNew = rAsToAppend.length;
      const basePond = Math.floor(100 / (currentLength + totalNew || 1));
      
      const nextList = [...ras, ...rAsToAppend];
      const updatedList = nextList.map((r) => {
        if (r.ponderacio === 0) {
          return { ...r, ponderacio: basePond };
        }
        return r;
      });

      setRas(updatedList);
      dispatchUpdate({ ras: updatedList });
      return true;
    }
    return false;
  };

  const handleExtractActivities = (rawText: string) => {
    const lines = rawText.split("\n");
    const actsToAppend: SimpleRow[] = [];
    
    interface TempAct {
      codi: string;
      titol: string;
      hores: string;
      lines: string[];
    }
    const tempActs: TempAct[] = [];
    let activeTemp: TempAct | null = null;

    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line) continue;

      const actMatch = line.match(/^A(\d+)[:\.]?\s*(.+)/i);
      if (actMatch) {
        if (activeTemp) {
          tempActs.push(activeTemp);
        }
        let hores = "";
        const horesMatch = line.match(/(\d+)\s*h\b/i) || line.match(/\((\d+)\s*h\)/i);
        if (horesMatch) {
          hores = horesMatch[1] + " h.";
        }
        activeTemp = {
          codi: "A" + actMatch[1],
          titol: actMatch[2].replace(/\(\d+\s*h\.?\)/i, "").trim(),
          hores: hores,
          lines: []
        };
        continue;
      }

      if (activeTemp) {
        activeTemp.lines.push(line);
      }
    }

    if (activeTemp) {
      tempActs.push(activeTemp);
    }

    for (const ta of tempActs) {
      let fullText = `${ta.codi}: ${ta.titol}`;
      if (ta.hores) {
        fullText += ` (${ta.hores})`;
      }
      const descLines = ta.lines.filter(l => !/Descripció\s*general:/i.test(l) && !/Continguts:/i.test(l));
      if (descLines.length > 0) {
        fullText += ` - Descripció: ${descLines.join(" ")}`;
      }
      actsToAppend.push({
        id: "act-imported-" + Date.now() + "-" + Math.random().toString(36).substring(2, 5),
        text: fullText
      });
    }

    if (actsToAppend.length > 0) {
      const nextList = [...activitats, ...actsToAppend];
      setActivitats(nextList);
      dispatchUpdate({ activitats: nextList });
      return true;
    }
    return false;
  };

  const handleCleanTextPaste = (rawText: string, field: "avaluacioPrimera" | "avaluacioSegona" | "metodologia" | "espais" | "bibliografia") => {
    const cleanLine = (txt: string) => {
      return txt
        .replace(/<[^>]*>/g, "")
        .replace(/&nbsp;/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    };

    if (field === "avaluacioPrimera" || field === "avaluacioSegona") {
      const cleaned = rawText
        .split("\n")
        .map(cleanLine)
        .filter(Boolean)
        .join("\n");
      
      if (field === "avaluacioPrimera") {
        setAvaluacioPrimera(cleaned);
        dispatchUpdate({ avaluacioPrimera: cleaned });
      } else {
        setAvaluacioSegona(cleaned);
        dispatchUpdate({ avaluacioSegona: cleaned });
      }
    } else {
      const lines = rawText
        .split("\n")
        .map(cleanLine)
        .filter(Boolean);

      const newRows = lines.map(line => ({
        id: `row-${field}-imported-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        text: line
      }));

      if (field === "metodologia") {
        setMetodologia(newRows);
        dispatchUpdate({ metodologia: newRows });
      } else if (field === "espais") {
        setEspaisrecursos(newRows);
        dispatchUpdate({ espaisrecursos: newRows });
      } else if (field === "bibliografia") {
        setBibliografia(newRows);
        dispatchUpdate({ bibliografia: newRows });
      }
    }
  };

  const steps = [
    { num: 1, label: "1. Dades" },
    { num: 2, label: "2. Objectius" },
    { num: 3, label: "3. RAs" },
    { num: 4, label: "4. Competències" },
    { num: 5, label: "5. Avaluació" },
    { num: 6, label: "6. Metodologia" },
    { num: 7, label: "7. Activitats" },
    { num: 8, label: "8. Sortides" },
    { num: 9, label: "9. Espais / Recursos" },
    { num: 10, label: "10. Bibliografia" }
  ];

  const totalRasPonderacio = ras.reduce((sum, item) => sum + (item.ponderacio || 0), 0);

  return (
    <div id="module-editor-panel" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col h-full font-sans">
      
      {/* Dynamic Header Block with logo colors */}
      <div className="bg-gradient-to-r from-[#0052cc] to-blue-700 text-white p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-blue-800/15">
        <div>
          <span className="text-blue-200 text-xs font-bold uppercase tracking-wider">Editor de Programacions de 10 pestanyes</span>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight mt-0.5">
            {codiModul || "MXX"} - {nomModul || "Sense Títol"}
          </h1>
          <p className="text-xs text-blue-100/95 font-medium mt-1">
            {cicleFormatiu || "Tria un cicle formatiu per generar"}
          </p>
        </div>

        <button
          id="btn-export-csv-direct"
          onClick={onExportCSV}
          className="py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl transition-all flex items-center gap-2 text-xs sm:text-sm font-bold shadow-sm cursor-pointer"
        >
          <FileSpreadsheet className="w-4 h-4 text-white" />
          <span>Exporta a Excel</span>
        </button>
      </div>

      {/* 10 Step progress bar */}
      <div className="no-print bg-slate-50 border-b border-slate-100 p-3 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-2 min-w-[960px] max-w-5xl mx-auto">
          {steps.map((st) => {
            const isActive = currentStep === st.num;
            return (
              <button
                key={st.num}
                type="button"
                onClick={() => setCurrentStep(st.num)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold border transition-all cursor-pointer text-center ${
                  isActive 
                    ? "bg-[#0052cc] border-[#0052cc] text-white shadow-xs"
                    : "bg-white hover:bg-slate-100 text-slate-600 border-slate-200"
                }`}
              >
                {st.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor Main Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
        
        {/* PESTANYA 1: DADES */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100/40">
              <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-[#0052cc]" />
                Auto-omple amb un sol clic triant el cicle i mòdul:
              </span>
              <div className="flex flex-wrap gap-2">
                {CICLES_TEMPLATES.map((c, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectCycle(c)}
                    className={`py-1 px-2.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                      cicleFormatiu === c.name
                        ? "bg-[#0052cc] text-white border-blue-600"
                        : "bg-white hover:bg-slate-100 border-slate-200 text-slate-600"
                    }`}
                  >
                    {c.name.replace("CFGM ", "").replace("CFGS ", "")}
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Mòdul Oficial */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/50 space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-[#0052cc]" />
                <span>Mòdul Professional Oficial ({MODULE_TEMPLATES.filter(t => t.cicle === cicleFormatiu).length} disponibles)</span>
              </label>
              <select
                onChange={(e) => handleSelectModuleTemplate(e.target.value)}
                value={codiModul}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-extrabold text-slate-800 focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
              >
                <option value="">-- Selecciona el mòdul oficial per auto-omplir la resta de pestanyes --</option>
                {MODULE_TEMPLATES.filter(t => t.cicle === cicleFormatiu).map((t, idx) => (
                  <option key={idx} value={t.codiModul}>
                    {t.codiModul} - {t.nomModul} ({t.horesCentre}h centre)
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500 italic leading-relaxed">
                Això s'encarregarà d'omplir de forma fidel, automàtica i sense deixar camps buits, les taules d'Objectius generals, Resultats d'Aprenentatge (amb ponderacions i dates), Competències, Activitats, Metodologies, Recursos i Bibliografia oficials d'aquest mòdul.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Departament *</label>
                <input
                  type="text"
                  value={departament}
                  onChange={(e) => handleFieldChange("departament", e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] text-slate-800 font-bold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Família Professional *</label>
                <input
                  type="text"
                  value={familiaProfessional}
                  onChange={(e) => handleFieldChange("familiaProfessional", e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] text-slate-800 font-bold"
                  required
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Cicle Formatiu *</label>
                <input
                  type="text"
                  value={cicleFormatiu}
                  onChange={(e) => handleFieldChange("cicleFormatiu", e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] text-slate-800 font-bold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Codi mòdul *</label>
                <input
                  type="text"
                  value={codiModul}
                  onChange={(e) => handleFieldChange("codiModul", e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] text-slate-800 font-mono font-bold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Nom del Mòdul *</label>
                <input
                  type="text"
                  value={nomModul}
                  onChange={(e) => handleFieldChange("nomModul", e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] text-slate-800 font-bold"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hores Centre *</label>
                <input
                  type="number"
                  value={horesCentre}
                  onChange={(e) => handleFieldChange("horesCentre", e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] text-slate-800 font-semibold"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Hores Empresa *</label>
                <input
                  type="number"
                  value={horesEmpresa}
                  onChange={(e) => handleFieldChange("horesEmpresa", e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] text-slate-800 font-semibold"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Hores *</label>
                <input
                  type="number"
                  value={totalHores}
                  onChange={(e) => handleFieldChange("totalHores", e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 bg-slate-50 rounded-xl focus:outline-none text-slate-800 font-semibold"
                  min="0"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Professorat *</label>
                <input
                  type="text"
                  value={professorat}
                  onChange={(e) => handleFieldChange("professorat", e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] text-slate-800 font-semibold"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {/* PESTANYA 2: OBJECTIUS */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Objectius Generals del Mòdul (Pestanya 2)</h3>
                <p className="text-xs text-slate-500">Mapeja la taula amb columnes de l'Id i el text descriptiu.</p>
              </div>
              <button
                type="button"
                onClick={() => addItemRow("objectius")}
                className="py-1.5 px-3 bg-[#0052cc] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Afegir línia</span>
              </button>
            </div>

            <div className="space-y-3">
              {objectius.map((obj, idx) => (
                <div key={obj.id} className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl hover:border-slate-300 transition-all bg-white shadow-xs">
                  <div className="w-20">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Id lletra</label>
                    <input
                      type="text"
                      value={obj.codi}
                      onChange={(e) => updateItemRow("objectius", obj.id, "codi", e.target.value)}
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-mono font-bold text-[#0052cc]"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Text de l'objectiu</label>
                    <textarea
                      value={obj.text}
                      onChange={(e) => updateItemRow("objectius", obj.id, "text", e.target.value)}
                      rows={2}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-[#0052cc]"
                      placeholder="Indica el text complet d'aquest objectiu"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItemRow("objectius", obj.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg mt-5 transition-colors cursor-pointer"
                    title="Esborra línia"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Micro-Assistent d'Importació */}
            <div className="border border-dashed border-blue-200 rounded-xl bg-blue-50/10 overflow-hidden mt-4">
              <button
                type="button"
                onClick={() => setIsObjImportOpen(!isObjImportOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-blue-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0052cc]" />
                  <span>Aprofitar de la presentació anterior</span>
                </div>
                {isObjImportOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              
              {isObjImportOpen && (
                <div className="p-4 border-t border-dashed border-blue-150 space-y-3 bg-white">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    L'assistent local analitzarà el text per extreure les lletres identificatives i els objectius de forma immediata.
                  </p>
                  <textarea
                    value={rawObjText}
                    onChange={(e) => setRawObjText(e.target.value)}
                    placeholder="Enganxa aquí el fragment de text on surten les competències o objectius del curs passat (ex: h) Organitzar l'emmagatzematge...)"
                    rows={4}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setRawObjText("")}
                      className="px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg"
                    >
                      Neteja
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const success = handleExtractCompetenciesOrObjectius(rawObjText, true);
                        if (success) {
                          setRawObjText("");
                          setIsObjImportOpen(false);
                        }
                      }}
                      className="px-3 py-1.5 bg-[#0052cc] text-white font-bold rounded-lg text-[11px] hover:bg-blue-700 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Extreure i afegir</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* PESTANYA 3: RAs */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Resultats d'Aprenentatge (Pestanya 3)</h3>
                <p className="text-xs text-slate-500">Mapeja exactament la taula amb RAs, ponderació, dates d'inici i final.</p>
              </div>
              <button
                type="button"
                onClick={() => addItemRow("ras")}
                className="py-1.5 px-3 bg-[#0052cc] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Afegir línia RA</span>
              </button>
            </div>

            {/* Sum Warning indicator */}
            <div className={`p-3 rounded-lg text-xs font-bold flex items-center justify-between ${
              totalRasPonderacio === 100 
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200" 
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}>
              <span>Suma total de les ponderacions:</span>
              <span className="font-mono text-sm">{totalRasPonderacio}% (Ha d'ajustar a 100% idealment)</span>
            </div>

            <div className="space-y-4">
              {ras.map((ra) => (
                <div key={ra.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50/50 shadow-xs space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Codi RA *</label>
                      <input
                        type="text"
                        value={ra.codi}
                        onChange={(e) => updateItemRow("ras", ra.id, "codi", e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-center text-[#0052cc]"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Ponderació (%) *</label>
                      <input
                        type="number"
                        value={ra.ponderacio}
                        onChange={(e) => updateItemRow("ras", ra.id, "ponderacio", e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono font-bold text-center text-slate-800"
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Data d'Inici *</label>
                      <input
                        type="date"
                        min="2026-09-10"
                        max="2027-05-14"
                        value={ensureIsoDate(ra.dataInici, "2026-09-10")}
                        onChange={(e) => updateItemRow("ras", ra.id, "dataInici", e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center text-slate-700"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Data Final *</label>
                      <input
                        type="date"
                        min="2026-09-10"
                        max="2027-05-14"
                        value={ensureIsoDate(ra.dataFinal, "2027-05-14")}
                        onChange={(e) => updateItemRow("ras", ra.id, "dataFinal", e.target.value)}
                        className="w-full px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center text-slate-700"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 items-start">
                    <div className="flex-1">
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Text descriptiu del Resultat d'Aprenentatge</label>
                      <textarea
                        value={ra.text}
                        onChange={(e) => updateItemRow("ras", ra.id, "text", e.target.value)}
                        rows={2}
                        className="w-full px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-[#0052cc]"
                        placeholder="Defineix les habilitats que l'alumne consolidarà"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItemRow("ras", ra.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg mt-5 transition-colors cursor-pointer"
                      title="Esborra línia"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Micro-Assistent d'Importació de RAs */}
            <div className="border border-dashed border-blue-200 rounded-xl bg-blue-50/10 overflow-hidden mt-4">
              <button
                type="button"
                onClick={() => setIsRaImportOpen(!isRaImportOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-blue-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0052cc]" />
                  <span>Aprofitar de la presentació anterior</span>
                </div>
                {isRaImportOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              
              {isRaImportOpen && (
                <div className="p-4 border-t border-dashed border-blue-150 space-y-3 bg-white">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    L'assistent local analitzarà el text de l'any passat per extreure els Resultats d'Aprenentatge (RAs) detectats, preservant els actuals.
                  </p>
                  <textarea
                    value={rawRaText}
                    onChange={(e) => setRawRaText(e.target.value)}
                    placeholder="Enganxa aquí el bloc de RAs de l'any passat (ex: RA1. Relaciona la normativa d'emmagatzematge...)"
                    rows={4}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setRawRaText("")}
                      className="px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg"
                    >
                      Neteja
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const success = handleExtractRAs(rawRaText);
                        if (success) {
                          setRawRaText("");
                          setIsRaImportOpen(false);
                        }
                      }}
                      className="px-3 py-1.5 bg-[#0052cc] text-white font-bold rounded-lg text-[11px] hover:bg-blue-700 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Extreure i afegir</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* PESTANYA 4: COMPETÈNCIES */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Competències Professionals (Pestanya 4)</h3>
                <p className="text-xs text-slate-500">Mapeja la taula de competències de caràcter tècnic, personal i social.</p>
              </div>
              <button
                type="button"
                onClick={() => addItemRow("competencies")}
                className="py-1.5 px-3 bg-[#0052cc] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Afegir línia</span>
              </button>
            </div>

            <div className="space-y-3">
              {competencies.map((c) => (
                <div key={c.id} className="flex items-start gap-3 p-3 border border-slate-200 rounded-xl hover:border-slate-300 transition-all bg-white shadow-xs">
                  <div className="w-20">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Id lletra</label>
                    <input
                      type="text"
                      value={c.codi}
                      onChange={(e) => updateItemRow("competencies", c.id, "codi", e.target.value)}
                      className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded-lg text-xs text-center font-mono font-bold text-[#0052cc]"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Text de la competència</label>
                    <textarea
                      value={c.text}
                      onChange={(e) => updateItemRow("competencies", c.id, "text", e.target.value)}
                      rows={2}
                      className="w-full px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:border-[#0052cc]"
                      placeholder="Indica el text complet d'aquesta competència"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeItemRow("competencies", c.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg mt-5 transition-colors cursor-pointer"
                    title="Esborra línia"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Micro-Assistent d'Importació de Competències */}
            <div className="border border-dashed border-blue-200 rounded-xl bg-blue-50/10 overflow-hidden mt-4">
              <button
                type="button"
                onClick={() => setIsCompImportOpen(!isCompImportOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-blue-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0052cc]" />
                  <span>Aprofitar de la presentació anterior</span>
                </div>
                {isCompImportOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              
              {isCompImportOpen && (
                <div className="p-4 border-t border-dashed border-blue-150 space-y-3 bg-white">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    L'assistent local analitzarà el text per extreure les lletres identificatives i les competències de forma immediata.
                  </p>
                  <textarea
                    value={rawCompText}
                    onChange={(e) => setRawCompText(e.target.value)}
                    placeholder="Enganxa aquí el fragment de text on surten les competències o objectius del curs passat (ex: h) Organitzar l'emmagatzematge...)"
                    rows={4}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setRawCompText("")}
                      className="px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg"
                    >
                      Neteja
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const success = handleExtractCompetenciesOrObjectius(rawCompText, false);
                        if (success) {
                          setRawCompText("");
                          setIsCompImportOpen(false);
                        }
                      }}
                      className="px-3 py-1.5 bg-[#0052cc] text-white font-bold rounded-lg text-[11px] hover:bg-blue-700 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Extreure i afegir</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* PESTANYA 5: AVALUACIÓ */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="text-sm font-bold text-slate-800">Criteris i Condicions d'Avaluació (Pestanya 5)</h3>
              <p className="text-xs text-slate-500 mt-0.5">Mapeja directament les condicions generals de les convocatòries de l'institut.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Primera Convocatòria (Avaluació contínua) *</label>
                <textarea
                  value={avaluacioPrimera}
                  onChange={(e) => handleFieldChange("avaluacioPrimera", e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-blue-100 text-slate-700 leading-relaxed font-normal"
                  placeholder="Especifica els criteris i percentatges d'avaluació ordinaris per superar el curs de manera continuada..."
                  required
                />
                
                {/* Micro-Assistent de Neteja */}
                <div className="mt-2">
                  {activeCleanerField === "avaluacioPrimera" ? (
                    <div className="p-3 border border-dashed border-slate-300 bg-slate-50 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Filtre i Neteja de Text</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCleanerField(null);
                            setCleanerInputText("");
                          }}
                          className="text-[10px] text-slate-400 hover:text-slate-600 font-bold"
                        >
                          Tancar
                        </button>
                      </div>
                      <textarea
                        value={cleanerInputText}
                        onChange={(e) => setCleanerInputText(e.target.value)}
                        placeholder="Enganxa aquí el text brut de Word (amb HTML, espais, etc.)"
                        rows={3}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            handleCleanTextPaste(cleanerInputText, "avaluacioPrimera");
                            setActiveCleanerField(null);
                            setCleanerInputText("");
                          }}
                          className="px-2 py-1 bg-[#0052cc] hover:bg-blue-700 text-white rounded text-[10px] font-bold"
                        >
                          Netejar i substituir
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCleanerField("avaluacioPrimera");
                        setCleanerInputText("");
                      }}
                      className="text-[11px] text-[#0052cc] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Enganxa text net aquí</span>
                    </button>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Segona Convocatòria (Recuperació extraordinària) *</label>
                <textarea
                  value={avaluacioSegona}
                  onChange={(e) => handleFieldChange("avaluacioSegona", e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 text-xs sm:text-sm border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-blue-100 text-slate-700 leading-relaxed font-normal"
                  placeholder="Especifica el tipus d'exàmens o lliuraments de projectes necessaris per recuperar la matèria en segona convocatòria..."
                  required
                />

                {/* Micro-Assistent de Neteja */}
                <div className="mt-2">
                  {activeCleanerField === "avaluacioSegona" ? (
                    <div className="p-3 border border-dashed border-slate-300 bg-slate-50 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-slate-500 uppercase">Filtre i Neteja de Text</span>
                        <button
                          type="button"
                          onClick={() => {
                            setActiveCleanerField(null);
                            setCleanerInputText("");
                          }}
                          className="text-[10px] text-slate-400 hover:text-slate-600 font-bold"
                        >
                          Tancar
                        </button>
                      </div>
                      <textarea
                        value={cleanerInputText}
                        onChange={(e) => setCleanerInputText(e.target.value)}
                        placeholder="Enganxa aquí el text brut de Word (amb HTML, espais, etc.)"
                        rows={3}
                        className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
                      />
                      <div className="flex justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            handleCleanTextPaste(cleanerInputText, "avaluacioSegona");
                            setActiveCleanerField(null);
                            setCleanerInputText("");
                          }}
                          className="px-2 py-1 bg-[#0052cc] hover:bg-blue-700 text-white rounded text-[10px] font-bold"
                        >
                          Netejar i substituir
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveCleanerField("avaluacioSegona");
                        setCleanerInputText("");
                      }}
                      className="text-[11px] text-[#0052cc] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Enganxa text net aquí</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PESTANYA 6: METODOLOGIA */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Metodologia Didàctica (Pestanya 6)</h3>
                <p className="text-xs text-slate-500">Mapeja l'exposició de línies de text lliure sobre la presentació del mòdul.</p>
              </div>
              <button
                type="button"
                onClick={() => addItemRow("metodologia")}
                className="py-1.5 px-3 bg-[#0052cc] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Afegir línia</span>
              </button>
            </div>

            <div className="space-y-3">
              {metodologia.map((row) => (
                <div key={row.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={row.text}
                    onChange={(e) => updateItemRow("metodologia", row.id, "", e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700"
                    placeholder="Escrita o punt metodològic"
                  />
                  <button
                    type="button"
                    onClick={() => removeItemRow("metodologia", row.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Micro-Assistent de Neteja de Metodologia */}
              <div className="mt-2">
                {activeCleanerField === "metodologia" ? (
                  <div className="p-3 border border-dashed border-slate-300 bg-slate-50 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Filtre i Neteja de Metodologia</span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCleanerField(null);
                          setCleanerInputText("");
                        }}
                        className="text-[10px] text-slate-400 hover:text-slate-600 font-bold"
                      >
                        Tancar
                      </button>
                    </div>
                    <textarea
                      value={cleanerInputText}
                      onChange={(e) => setCleanerInputText(e.target.value)}
                      placeholder="Enganxa aquí el text brut de Word (cada línia serà una entrada neta de metodologia)"
                      rows={3}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          handleCleanTextPaste(cleanerInputText, "metodologia");
                          setActiveCleanerField(null);
                          setCleanerInputText("");
                        }}
                        className="px-2 py-1 bg-[#0052cc] hover:bg-blue-700 text-white rounded text-[10px] font-bold"
                      >
                        Netejar i substituir files
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCleanerField("metodologia");
                      setCleanerInputText("");
                    }}
                    className="text-[11px] text-[#0052cc] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Enganxa text net aquí</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PESTANYA 7: ACTIVITATS */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Activitats i Unitats de Treball (Pestanya 7)</h3>
                <p className="text-xs text-slate-500">Mapeja les línies d'activitats d'aprenentatge previstes.</p>
              </div>
              <button
                type="button"
                onClick={() => addItemRow("activitats")}
                className="py-1.5 px-3 bg-[#0052cc] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Afegir línia</span>
              </button>
            </div>

            <div className="space-y-3">
              {activitats.map((row) => (
                <div key={row.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={row.text}
                    onChange={(e) => updateItemRow("activitats", row.id, "", e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700"
                    placeholder="Definició d'activitats de classe"
                  />
                  <button
                    type="button"
                    onClick={() => removeItemRow("activitats", row.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Micro-Assistent d'Importació d'Activitats */}
            <div className="border border-dashed border-blue-200 rounded-xl bg-blue-50/10 overflow-hidden mt-4">
              <button
                type="button"
                onClick={() => setIsActImportOpen(!isActImportOpen)}
                className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-slate-700 hover:bg-blue-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#0052cc]" />
                  <span>Aprofitar de la presentació anterior</span>
                </div>
                {isActImportOpen ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>
              
              {isActImportOpen && (
                <div className="p-4 border-t border-dashed border-blue-150 space-y-3 bg-white">
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    L'assistent local analitzarà el text d'origen per extreure les unitats o activitats formatades com A1, A2 amb les seves respectives hores i descripcions.
                  </p>
                  <textarea
                    value={rawActText}
                    onChange={(e) => setRawActText(e.target.value)}
                    placeholder="Enganxa aquí el bloc d'activitats (ex: A1: Atenció al client (12 h.) - Descripció general: Supòsit pràctic d'atenció telefònica...)"
                    rows={4}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setRawActText("")}
                      className="px-3 py-1.5 text-[11px] font-bold text-slate-500 hover:bg-slate-50 rounded-lg"
                    >
                      Neteja
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        const success = handleExtractActivities(rawActText);
                        if (success) {
                          setRawActText("");
                          setIsActImportOpen(false);
                        }
                      }}
                      className="px-3 py-1.5 bg-[#0052cc] text-white font-bold rounded-lg text-[11px] hover:bg-blue-700 flex items-center gap-1.5"
                    >
                      <Check className="w-3.5 h-3.5" />
                      <span>Extreure i afegir</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

          </div>
        )}

        {/* PESTANYA 8: SORTIDES */}
        {currentStep === 8 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Sortides i Visites de Camp (Pestanya 8)</h3>
                <p className="text-xs text-slate-500">Mapeja les línies descriptives de visites tècniques obligatòries o voluntàries.</p>
              </div>
              <button
                type="button"
                onClick={() => addItemRow("sortides")}
                className="py-1.5 px-3 bg-[#0052cc] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Afegir línia</span>
              </button>
            </div>

            <div className="space-y-3">
              {sortides.map((row) => (
                <div key={row.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={row.text}
                    onChange={(e) => updateItemRow("sortides", row.id, "", e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700"
                    placeholder="Lloc de la visita i trimestre estimat"
                  />
                  <button
                    type="button"
                    onClick={() => removeItemRow("sortides", row.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PESTANYA 9: ESPAIS I RECURSOS */}
        {currentStep === 9 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Espais i Recursos Materials (Pestanya 9)</h3>
                <p className="text-xs text-slate-500">Mapeja l'assignació d'aules especials, projectors, programari o llicències.</p>
              </div>
              <button
                type="button"
                onClick={() => addItemRow("espais")}
                className="py-1.5 px-3 bg-[#0052cc] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Afegir línia</span>
              </button>
            </div>

            <div className="space-y-3">
              {espaisrecursos.map((row) => (
                <div key={row.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={row.text}
                    onChange={(e) => updateItemRow("espais", row.id, "", e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700"
                    placeholder="Aula informàtica, Moodle, llicència de simulador, etc."
                  />
                  <button
                    type="button"
                    onClick={() => removeItemRow("espais", row.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Micro-Assistent de Neteja d'Espais */}
              <div className="mt-2">
                {activeCleanerField === "espais" ? (
                  <div className="p-3 border border-dashed border-slate-300 bg-slate-50 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Filtre i Neteja de Recursos/Espais</span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCleanerField(null);
                          setCleanerInputText("");
                        }}
                        className="text-[10px] text-slate-400 hover:text-slate-600 font-bold"
                      >
                        Tancar
                      </button>
                    </div>
                    <textarea
                      value={cleanerInputText}
                      onChange={(e) => setCleanerInputText(e.target.value)}
                      placeholder="Enganxa aquí el text brut de Word (cada línia serà un recurs)"
                      rows={3}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          handleCleanTextPaste(cleanerInputText, "espais");
                          setActiveCleanerField(null);
                          setCleanerInputText("");
                        }}
                        className="px-2 py-1 bg-[#0052cc] hover:bg-blue-700 text-white rounded text-[10px] font-bold"
                      >
                        Netejar i substituir files
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCleanerField("espais");
                      setCleanerInputText("");
                    }}
                    className="text-[11px] text-[#0052cc] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Enganxa text net aquí</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PESTANYA 10: BIBLIOGRAFIA */}
        {currentStep === 10 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-slate-50 p-4 rounded-xl border border-slate-100">
              <div>
                <h3 className="text-sm font-bold text-slate-800">Bibliografia i Programari recomanat (Pestanya 10)</h3>
                <p className="text-xs text-slate-500">Mapeja llistats bibliogràfics de referència, llibres o webs de referència sectorial.</p>
              </div>
              <button
                type="button"
                onClick={() => addItemRow("bibliografia")}
                className="py-1.5 px-3 bg-[#0052cc] hover:bg-blue-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Afegir línia</span>
              </button>
            </div>

            <div className="space-y-3">
              {bibliografia.map((row) => (
                <div key={row.id} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={row.text}
                    onChange={(e) => updateItemRow("bibliografia", row.id, "", e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-xl text-xs sm:text-sm font-medium text-slate-700"
                    placeholder="Autor (Any). Títol del llibre. Editorial."
                  />
                  <button
                    type="button"
                    onClick={() => removeItemRow("bibliografia", row.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Micro-Assistent de Neteja de Bibliografia */}
              <div className="mt-2">
                {activeCleanerField === "bibliografia" ? (
                  <div className="p-3 border border-dashed border-slate-300 bg-slate-50 rounded-xl space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">Filtre i Neteja de Bibliografia</span>
                      <button
                        type="button"
                        onClick={() => {
                          setActiveCleanerField(null);
                          setCleanerInputText("");
                        }}
                        className="text-[10px] text-slate-400 hover:text-slate-600 font-bold"
                      >
                        Tancar
                      </button>
                    </div>
                    <textarea
                      value={cleanerInputText}
                      onChange={(e) => setCleanerInputText(e.target.value)}
                      placeholder="Enganxa aquí el text brut de Word (cada línia serà una referència bibliogràfica)"
                      rows={3}
                      className="w-full p-2 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-600 focus:outline-none focus:ring-1 focus:ring-[#0052cc]"
                    />
                    <div className="flex justify-end gap-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          handleCleanTextPaste(cleanerInputText, "bibliografia");
                          setActiveCleanerField(null);
                          setCleanerInputText("");
                        }}
                        className="px-2 py-1 bg-[#0052cc] hover:bg-blue-700 text-white rounded text-[10px] font-bold"
                      >
                        Netejar i substituir files
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setActiveCleanerField("bibliografia");
                      setCleanerInputText("");
                    }}
                    className="text-[11px] text-[#0052cc] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Enganxa text net aquí</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Navigation Buttons */}
      <div className="no-print p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
        <button
          type="button"
          onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
          disabled={currentStep === 1}
          className="py-1.5 px-4 bg-white border border-slate-200 text-slate-600 rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white transition-all cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Anterior</span>
        </button>

        <span className="text-xs text-slate-400 font-bold">
          Pestanya {currentStep} de 10
        </span>

        {currentStep < 10 ? (
          <button
            type="button"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="py-1.5 px-4 bg-[#0052cc] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 hover:bg-blue-700 transition-all cursor-pointer"
          >
            <span>Següent</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onExportCSV}
            className="py-1.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
          >
            <Check className="w-4 h-4" />
            <span>Generar i Exportar Excel</span>
          </button>
        )}
      </div>

    </div>
  );
}
