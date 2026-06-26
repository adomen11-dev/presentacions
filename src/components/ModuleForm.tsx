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
  ListTodo 
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
                        type="text"
                        value={ra.dataInici}
                        onChange={(e) => updateItemRow("ras", ra.id, "dataInici", e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center text-slate-700"
                        placeholder="Ex: 15/09"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">Data Final *</label>
                      <input
                        type="text"
                        value={ra.dataFinal}
                        onChange={(e) => updateItemRow("ras", ra.id, "dataFinal", e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-center text-slate-700"
                        placeholder="Ex: 10/11"
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
                <p className="text-xs text-slate-500">Mapeja l'exposició de línies de text lliure sobre la programació didàctica.</p>
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
