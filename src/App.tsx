import React, { useState, useEffect } from "react";
import * as mammoth from "mammoth";
import { ModulePresentation } from "./types";
import { MODULE_TEMPLATES, CICLES_TEMPLATES } from "./data/defaults";
import { getOfficialCurriculumData } from "./data/curriculumData";
import { exportToExcel } from "./utils/excelExport";
import ModuleForm from "./components/ModuleForm";
import ModulePreview from "./components/ModulePreview";
import {
  FileSpreadsheet,
  BookOpen,
  Eye,
  Edit3,
  Layers,
  GraduationCap,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Trash2,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Info,
  Settings,
  Activity,
  MapPin,
  Award,
  CheckSquare,
  Square
} from "lucide-react";

// Helper to guarantee that all 10 sheets' fields exist on a module
const ensureModuleFields = (m: any): ModulePresentation => {
  return {
    id: m.id || "mod-" + Date.now(),
    departament: m.departament || "Comerç i Màrqueting",
    familiaProfessional: m.familiaProfessional || "Comerç i Màrqueting",
    cicleFormatiu: m.cicleFormatiu || "",
    codiModul: m.codiModul || "",
    nomModul: m.nomModul || "",
    horesCentre: Number(m.horesCentre) || 0,
    horesEmpresa: Number(m.horesEmpresa) || 0,
    totalHores: (Number(m.horesCentre) || 0) + (Number(m.horesEmpresa) || 0),
    professorat: m.professorat || "Docent del mòdul",

    objectius: Array.isArray(m.objectius) ? m.objectius.map((o: any) => ({
      id: o.id || "obj-" + Math.random().toString(36).substr(2, 9),
      codi: o.codi || "",
      text: o.text || ""
    })) : [],
    
    ras: Array.isArray(m.ras) ? m.ras.map((r: any) => ({
      id: r.id || "ra-" + Math.random().toString(36).substr(2, 9),
      codi: r.codi || "",
      text: r.text || r.descripcio || "",
      ponderacio: Number(r.ponderacio) || 0,
      dataInici: r.dataInici || "",
      dataFinal: r.dataFinal || ""
    })) : [],

    competencies: Array.isArray(m.competencies) ? m.competencies.map((c: any) => ({
      id: c.id || "comp-" + Math.random().toString(36).substr(2, 9),
      codi: c.codi || "",
      text: c.text || c.descripcio || ""
    })) : [],

    avaluacioPrimera: m.avaluacioPrimera || (Array.isArray(m.avaluacio) ? m.avaluacio.map((a: any) => `${a.concepte || ""}: ${a.percentatge || 0}%`).join("\n") : "") || "Per superar el mòdul professional cal superar independentment tots els RAs amb una qualificació mínima de 5.\nLa nota final es calcularà aplicant les ponderacions establertes pels resultats d'aprenentatge.",
    avaluacioSegona: m.avaluacioSegona || "En cas de no superar algun RA, l'estudiant haurà de realitzar la Prova de Segona convocatòria dels continguts no assolits.\nLa data i condicions de la prova extraordinària de recuperació estaran publicades al campus virtual de l'institut.",

    metodologia: Array.isArray(m.metodologia) ? m.metodologia.map((row: any, idx: number) => ({
      id: row.id || "met-" + idx,
      text: typeof row === 'string' ? row : (row.text || "")
    })) : (typeof m.metodologia === "string" && m.metodologia ? [{ id: "met-1", text: m.metodologia }] : [
      { id: "met-1", text: "La plataforma Moodle s’utilitzarà per penjar apunts, exercicis i comunicacions de l'aula." },
      { id: "met-2", text: "Al llarg del curs es faran un conjunt d'activitats d'aprenentatge actives i pràctiques." }
    ]),

    activitats: Array.isArray(m.activitats) ? m.activitats.map((row: any, idx: number) => ({
      id: row.id || "act-" + idx,
      text: typeof row === 'string' ? row : (row.text || row.descripcio || row.nom || "")
    })) : [
      { id: "act-1", text: "Taller d'atenció al client i gestió de queixes a l'aula." },
      { id: "act-2", text: "Treballs de simulació de casos reals d'empresa i aprenentatge guiat." }
    ],

    sortides: Array.isArray(m.sortides) ? m.sortides.map((row: any, idx: number) => ({
      id: row.id || "sort-" + idx,
      text: typeof row === 'string' ? row : (row.text || row.descripcio || "")
    })) : [
      { id: "sort-1", text: "Visita al Mercat de proveïdors o Plataforma Logística de la comarca." }
    ],

    espaisrecursos: Array.isArray(m.espaisrecursos) ? m.espaisrecursos.map((row: any, idx: number) => ({
      id: row.id || "er-" + idx,
      text: typeof row === 'string' ? row : (row.text || row.nom || "")
    })) : [
      { id: "er-1", text: "Aula de teoricopràctica amb projector i connexió estable a Internet." },
      { id: "er-2", text: "Campus virtual corporatiu Moodle per compartir materials i lliuraments." }
    ],

    bibliografia: Array.isArray(m.bibliografia) ? m.bibliografia.map((row: any, idx: number) => ({
      id: row.id || "bib-" + idx,
      text: typeof row === 'string' ? row : (row.text || "")
    })) : [
      { id: "bib-1", text: "Gestió Comercial de la Botiga, Ed. Santillana FP, 2024" },
      { id: "bib-2", text: "Marxandatge i Màrqueting del Punt de Venda, McGraw-Hill, 2023" }
    ]
  };
};

// Preload standard samples
const INITIAL_SAMPLES: any[] = [
  {
    id: "sample-1",
    departament: "Comerç i Màrqueting",
    familiaProfessional: "Comerç i Màrqueting",
    cicleFormatiu: "CFGS Màrqueting i Publicitat",
    codiModul: "0931",
    nomModul: "Màrqueting digital",
    horesCentre: 132,
    horesEmpresa: 33,
    totalHores: 165,
    professorat: "Maria Soler / Joan Vila",
    objectius: [
      { id: "s1-obj-1", codi: "a", text: "Dissenyar, demanar i optimitzar campanyes publicitàries i comercials en entorns digitals." },
      { id: "s1-obj-2", codi: "b", text: "Identificar les preferències de compra del segment de consumidors digitals triat." },
      { id: "s1-obj-3", codi: "c", text: "Gestionar l'entorn de canals de xarxes socials i posicionament en cercadors." }
    ],
    ras: [
      { id: "s1-ra-1", codi: "1", text: "Dissenya i executa el llançament de llocs web corporatius optimitzats per a SEO.", ponderacio: 40, dataInici: "15/09", dataFinal: "31/10" },
      { id: "s1-ra-2", codi: "2", text: "Implementa accions de Social Media i campanyes d'email màrqueting eficients.", ponderacio: 30, dataInici: "01/11", dataFinal: "22/12" },
      { id: "s1-ra-3", codi: "3", text: "Avalua la rendibilitat digital mitjançant mètriques clau i indicadors KPIs.", ponderacio: 30, dataInici: "08/01", dataFinal: "28/02" }
    ],
    competencies: [
      { id: "s1-comp-1", codi: "a", text: "Obtenir, tractar i organitzar la informació de recerca comercial digital." },
      { id: "s1-comp-2", codi: "b", text: "Planificar i gestionar la campanya de publicitat en línia corporativa." }
    ],
    avaluacioPrimera: "L'avaluació és contínua basada en projectes. Per aprovar el mòdul és requisit indispensable tenir superats tots els Resultats d'Aprenentatge (RAs) amb un mínim de 5 de manera individual.\nLa ponderació general del mòdul es calcula mitjançant la mitjana ponderada de cadascun dels RAs.",
    avaluacioSegona: "Els alumnes que no superin algun dels RAs durant el curs disposaran d'una prova de recuperació extraordinària.\nLa prova contindrà activitats equivalents per avaluar els continguts i capacitats de cada RA no assolit.",
    metodologia: [
      { id: "s1-met-1", text: "Metodologia activa d'aprenentatge basat en projectes reals (ABP)." },
      { id: "s1-met-2", text: "Treball pràctic guiat utilitzant simulacions i anàlisi de casos reals." }
    ],
    activitats: [
      { id: "s1-act-1", text: "Creació d'un pla de màrqueting digital per a un negoci local de proximitat." },
      { id: "s1-act-2", text: "Taller pràctic d'optimització SEO d'un bloc o lloc web corporatiu." }
    ],
    sortides: [
      { id: "s1-sort-1", text: "Visita guiada a una agència de comunicació i publicitat digital de la ciutat." }
    ],
    espaisrecursos: [
      { id: "s1-er-1", text: "Aula d'informàtica dotada d'ordinadors d'última generació i connexió a Internet." },
      { id: "s1-er-2", text: "Eines digitals de gestió i analítica: Google Analytics, Canva, Moodle." }
    ],
    bibliografia: [
      { id: "s1-bib-1", text: "Màrqueting Digital i Xarxes Socials, McGraw-Hill, Edició 2024." },
      { id: "s1-bib-2", text: "Guia Pràctica de SEO i SEM, Ed. Santillana, 2023." }
    ]
  },
  {
    id: "sample-2",
    departament: "Comerç i Màrqueting",
    familiaProfessional: "Comerç i Màrqueting",
    cicleFormatiu: "CFGM Activitats Comercials",
    codiModul: "1231",
    nomModul: "Dinamització del punt de venda",
    horesCentre: 99,
    horesEmpresa: 66,
    totalHores: 165,
    professorat: "Carme Riera / Jordi Pons",
    objectius: [
      { id: "s2-obj-1", codi: "a", text: "Dissenyar presentacions visuals de marxandatge atractives i funcionals al lineal." },
      { id: "s2-obj-2", codi: "b", text: "Organitzar i supervisar els elements físics i espais de venda del petit comerç." }
    ],
    ras: [
      { id: "s2-ra-1", codi: "1", text: "Organitza visualment la presentació de productes en prestatges i lineals d'exposició.", ponderacio: 50, dataInici: "15/09", dataFinal: "10/11" },
      { id: "s2-ra-2", codi: "2", text: "Dissenya i munta aparadors promocionals seguint campanyes específicas temporals.", ponderacio: 50, dataInici: "11/11", dataFinal: "22/12" }
    ],
    competencies: [
      { id: "s2-comp-1", codi: "a", text: "Aplicar tècniques d'aparadorisme i disseny d'interiors de la botiga." },
      { id: "s2-comp-2", codi: "b", text: "Controlar i dinamitzar les promocions comercials de proximitat." }
    ],
    avaluacioPrimera: "S'avaluarà cada unitat de contingut per separat amb fitxes d'observació de les pràctiques.\nLa nota mitjana requereix haver obtingut una nota de 5 o superior a cada RA del mòdul.",
    avaluacioSegona: "Recuperació mitjançant el lliurament i la defensa d'un projecte d'aparadorisme pendent.\nExamen teoricopràctic dels conceptes no superats durant el curs.",
    metodologia: [
      { id: "s2-met-1", text: "Pràctiques al taller de comerç muntant aparadors i lineals simulats." },
      { id: "s2-met-2", text: "Visites guiades a diferents eixos comercials de referència." }
    ],
    activitats: [
      { id: "s2-act-1", text: "Disseny i muntatge pràctic d'un aparador temàtic de Nadal de forma grupal." },
      { id: "s2-act-2", text: "Taller d'organització d'estocs i implantació de marxandatge visual." }
    ],
    sortides: [
      { id: "s2-sort-1", text: "Visita guiada a eixos comercials d'aparadorisme destacat a Barcelona." }
    ],
    espaisrecursos: [
      { id: "s2-er-1", text: "Aula-taller de comerç equipada amb aparadors reals simulats de fusta." },
      { id: "s2-er-2", text: "Materials varis d'ambientació, cartolines, teles, focus regulables." }
    ],
    bibliografia: [
      { id: "s2-bib-1", text: "Dinamització del Punt de Venda, McGraw-Hill, Edició 2023." }
    ]
  }
];

// Offline plain-text parser using regex and string scanning
function parseSyllabusDocument(text: string): Partial<ModulePresentation> {
  const lines = text.split("\n");
  
  const cleanHtml = (str: string): string => {
    return str
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  let departament = "Comerç i Màrqueting";
  let familiaProfessional = "Comerç i Màrqueting";
  let cicleFormatiu = "";
  let codiModul = "";
  let nomModul = "";
  let horesCentre = 0;
  let horesTotals = 0;
  let professorat = "";

  const objectius: { id: string; codi: string; text: string }[] = [];
  const ras: { id: string; codi: string; text: string; ponderacio: number; dataInici: string; dataFinal: string }[] = [];
  const competencies: { id: string; codi: string; text: string }[] = [];
  
  let metodologiaText = "";
  let avaluacioText = "";
  
  const recursosList: string[] = [];
  const bibliografiaList: string[] = [];
  const sortidesList: string[] = [];

  // Section Tracking
  type Section = "general" | "objectius" | "competencies" | "ras" | "avaluacio" | "metodologia" | "recursos" | "bibliografia" | "sortides" | "activitats";
  let currentSection: Section = "general";

  // RA and Activity tracking
  let activeRa: typeof ras[number] | null = null;
  
  interface ParsedActivity {
    codi: string;
    titol: string;
    hores: string;
    descripcio: string;
    continguts: string;
  }
  const parsedActivities: ParsedActivity[] = [];
  let activeActivity: ParsedActivity | null = null;
  let activitySubMode: "none" | "desc" | "cont" = "none";

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const line = cleanHtml(rawLine);
    if (!line) continue;

    // Detect section transitions
    if (/estratègies\s*metodològiques|estrategies\s*metodologiques/i.test(line)) {
      currentSection = "metodologia";
      activeActivity = null;
      continue;
    } else if (/avaluació\s*i\s*qualificació|avaluacio\s*i\s*qualificacio/i.test(line)) {
      currentSection = "avaluacio";
      activeActivity = null;
      continue;
    } else if (/espais,\s*equipaments\s*i\s*recursos|espais\s*i\s*recursos/i.test(line)) {
      currentSection = "recursos";
      activeActivity = null;
      continue;
    } else if (/bibliografia/i.test(line)) {
      currentSection = "bibliografia";
      activeActivity = null;
      continue;
    } else if (/sortides\s*complementàries|sortides/i.test(line)) {
      currentSection = "sortides";
      activeActivity = null;
      continue;
    } else if (/objectius\s*generals|objectius/i.test(line)) {
      currentSection = "objectius";
      activeActivity = null;
      continue;
    } else if (/competències\s*professionals|competències|competencies/i.test(line)) {
      currentSection = "competencies";
      activeActivity = null;
      continue;
    }

    // --- 1. DETECCIO DE DADES GENERALS ---
    if (/Departament:/i.test(line)) {
      const match = line.match(/Departament:\s*(.+)/i);
      if (match) departament = match[1].trim();
    }
    if (/Cicle\s*Formatiu:/i.test(line)) {
      const match = line.match(/Cicle\s*Formatiu:\s*(.+)/i);
      if (match) cicleFormatiu = match[1].trim();
    }
    if (/Mòdul\s*Professional:/i.test(line)) {
      const match = line.match(/Mòdul\s*Professional:\s*(.+)/i);
      if (match) {
        const fullMod = match[1].trim();
        const parts = fullMod.split(/[,–-]/);
        if (parts.length >= 2) {
          codiModul = parts[0].trim();
          nomModul = parts.slice(1).join("-").trim();
        } else {
          const firstWordMatch = fullMod.match(/^(\w+)\s+(.+)$/);
          if (firstWordMatch) {
            codiModul = firstWordMatch[1].trim();
            nomModul = firstWordMatch[2].trim();
          } else {
            nomModul = fullMod;
          }
        }
      }
    }
    if (/Hores\s*centre\s*educatiu:/i.test(line)) {
      const match = line.match(/Hores\s*centre\s*educatiu:\s*(\d+)/i);
      if (match) horesCentre = parseInt(match[1], 10);
    }
    if (/Hores\s*totals:/i.test(line)) {
      const match = line.match(/Hores\s*totals:\s*(\d+)/i);
      if (match) horesTotals = parseInt(match[1], 10);
    }
    if (/Realitzat\s*per:/i.test(line)) {
      const match = line.match(/Realitzat\s*per:\s*(.+)/i);
      if (match) professorat = match[1].trim();
    } else if (/Nom\s*i\s*cognom/i.test(line)) {
      for (let j = i + 1; j < Math.min(lines.length, i + 5); j++) {
        const nextLine = cleanHtml(lines[j]);
        if (nextLine && !nextLine.includes(":") && nextLine.length > 3) {
          professorat = nextLine;
          break;
        }
      }
    }

    // --- 2. EXTRACCIÓ DE RAs I CRITERIS ---
    const raMatch = line.match(/^RA\s*(\d+)\.?\s*(.+)/i);
    if (raMatch) {
      currentSection = "ras";
      activeActivity = null;
      const newRa = {
        id: "ra-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
        codi: raMatch[1],
        text: raMatch[2].trim(),
        ponderacio: 0,
        dataInici: "15/09",
        dataFinal: "10/11"
      };
      ras.push(newRa);
      activeRa = newRa;
      continue;
    }

    if (currentSection === "ras" && activeRa) {
      const critMatch = line.match(/^(\d+\.\d+)\.?\s*(.+)/);
      if (critMatch) {
        activeRa.text += `\n- ${critMatch[1]} ${critMatch[2].trim()}`;
        continue;
      }
    }

    if (currentSection === "objectius" || currentSection === "competencies") {
      const letterMatch = line.match(/^([a-z])\)\s*(.+)/i) || line.match(/^([a-z])\.\s*(.+)/i);
      if (letterMatch) {
        const codiVal = letterMatch[1].toLowerCase();
        const textVal = letterMatch[2].trim();
        if (currentSection === "objectius") {
          objectius.push({
            id: "obj-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
            codi: codiVal,
            text: textVal
          });
        } else {
          competencies.push({
            id: "comp-" + Date.now() + "-" + Math.random().toString(36).substr(2, 5),
            codi: codiVal,
            text: textVal
          });
        }
        continue;
      }
    }

    // --- 3. PARSEIG DE LES ACTIVITATS (AEA) ---
    const actMatch = line.match(/^A(\d+):\s*(.+)/i);
    if (actMatch) {
      currentSection = "activitats";
      let hores = "";
      const horesMatch = line.match(/(\d+)\s*h\b/i);
      if (horesMatch) {
        hores = horesMatch[1] + " h.";
      }
      
      if (activeActivity) {
        parsedActivities.push(activeActivity);
      }

      activeActivity = {
        codi: "A" + actMatch[1],
        titol: actMatch[2].replace(/\(\d+\s*h\.?\)/i, "").trim(),
        hores: hores,
        descripcio: "",
        continguts: ""
      };
      activitySubMode = "none";
      continue;
    }

    if (currentSection === "activitats" && activeActivity) {
      if (/Descripció\s*general:/i.test(line)) {
        activitySubMode = "desc";
        const rest = line.replace(/Descripció\s*general:/i, "").trim();
        if (rest) activeActivity.descripcio += rest + " ";
        continue;
      }
      if (/Continguts:/i.test(line)) {
        activitySubMode = "cont";
        const rest = line.replace(/Continguts:/i, "").trim();
        if (rest) activeActivity.continguts += rest + " ";
        continue;
      }

      if (activitySubMode === "desc") {
        activeActivity.descripcio += line.trim() + " ";
      } else if (activitySubMode === "cont") {
        activeActivity.continguts += line.trim() + " ";
      }
      continue;
    }

    // --- 4. SECCIONS DE TEXT LLIURE ---
    if (currentSection === "metodologia") {
      metodologiaText += line + "\n";
    } else if (currentSection === "avaluacio") {
      avaluacioText += line + "\n";
    } else if (currentSection === "recursos") {
      recursosList.push(line);
    } else if (currentSection === "bibliografia") {
      bibliografiaList.push(line);
    } else if (currentSection === "sortides") {
      sortidesList.push(line);
    }
  }

  if (activeActivity) {
    parsedActivities.push(activeActivity);
  }

  if (ras.length > 0) {
    const basePond = Math.floor(100 / ras.length);
    const remainder = 100 - (basePond * ras.length);
    ras.forEach((ra, idx) => {
      ra.ponderacio = idx === 0 ? (basePond + remainder) : basePond;
    });
  }

  const metodologiaRows = metodologiaText
    .split(/\n{2,}/)
    .map(p => p.trim())
    .filter(Boolean)
    .map((text, idx) => ({
      id: "met-parsed-" + idx + "-" + Date.now(),
      text
    }));

  let formulaLine = "";
  const evalLines = avaluacioText.split("\n");
  const filteredEvalLines: string[] = [];
  for (const el of evalLines) {
    const t = el.trim();
    if (!t) continue;
    if (/RA\d+\s*\*/i.test(t) || /QF\s*=/i.test(t) || /Qualificació\s*Final\s*=/i.test(t)) {
      formulaLine = t;
    } else {
      filteredEvalLines.push(el);
    }
  }

  let avaluacioPrimera = filteredEvalLines.join("\n").trim();
  if (formulaLine) {
    avaluacioPrimera = `FÓRMULA DE QUALIFICACIÓ FINAL: ${formulaLine}\n\n${avaluacioPrimera}`;
  }
  const avaluacioSegona = "Els alumnes que no assoleixin els RAs disposaran d'una prova escrita o de lliurament pràctic de recuperació extraordinària.\nLa data de recuperació de segona convocatòria es fixarà al campus de l'institut.";

  const activitatsRows = parsedActivities.map((act, idx) => {
    let fullText = `${act.codi}: ${act.titol}`;
    if (act.hores) fullText += ` (${act.hores})`;
    if (act.descripcio.trim()) fullText += `\nDescripció general: ${act.descripcio.trim()}`;
    if (act.continguts.trim()) fullText += `\nContinguts: ${act.continguts.trim()}`;
    return {
      id: "act-parsed-" + idx + "-" + Date.now(),
      text: fullText
    };
  });

  const recursosRows = recursosList.map((text, idx) => ({
    id: "er-parsed-" + idx + "-" + Date.now(),
    text
  }));

  const bibliografiaRows = bibliografiaList.map((text, idx) => ({
    id: "bib-parsed-" + idx + "-" + Date.now(),
    text
  }));

  const sortidesRows = sortidesList.map((text, idx) => ({
    id: "sort-parsed-" + idx + "-" + Date.now(),
    text
  }));

  return {
    departament: departament || "Comerç i Màrqueting",
    familiaProfessional: familiaProfessional || "Comerç i Màrqueting",
    cicleFormatiu: cicleFormatiu || "CFGS Comerç Internacional",
    codiModul: codiModul || "0625",
    nomModul: nomModul || "Mòdul Professional Importat",
    horesCentre: horesCentre || 99,
    horesEmpresa: Math.max(0, horesTotals - horesCentre) || 66,
    totalHores: horesTotals || (horesCentre + (Math.max(0, horesTotals - horesCentre) || 66)),
    professorat: professorat || "Docent del mòdul",
    objectius: objectius.length > 0 ? objectius : [],
    ras: ras.length > 0 ? ras : [],
    competencies: competencies.length > 0 ? competencies : [],
    avaluacioPrimera: avaluacioPrimera || "Per superar el mòdul professional cal superar independentment tots els RAs amb una qualificació mínima de 5.",
    avaluacioSegona: avaluacioSegona || "Els alumnes que no assoleixin els RAs disposaran d'una prova escrita de recuperació extraordinària.",
    metodologia: metodologiaRows.length > 0 ? metodologiaRows : [],
    activitats: activitatsRows.length > 0 ? activitatsRows : [],
    sortides: sortidesRows.length > 0 ? sortidesRows : [],
    espaisrecursos: recursosRows.length > 0 ? recursosRows : [],
    bibliografia: bibliografiaRows.length > 0 ? bibliografiaRows : []
  };
}

export default function App() {
  const [modules, setModules] = useState<ModulePresentation[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedCycle, setSelectedCycle] = useState<string | null>(null);
  const [onboardingStep, setOnboardingStep] = useState<1 | 2>(1);
  const [viewMode, setViewMode] = useState<"edit" | "preview">("edit");
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [moduleToDelete, setModuleToDelete] = useState<ModulePresentation | null>(null);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [importText, setImportText] = useState("");
  const [importMode, setImportMode] = useState<"create" | "overwrite">("create");

  // Step 1 or Step 2 for Staging Area
  const [importStep, setImportStep] = useState<1 | 2>(1);
  const [parsedData, setParsedData] = useState<any | null>(null);
  const [selectedMetadata, setSelectedMetadata] = useState(true);
  const [selectedRAs, setSelectedRAs] = useState<Record<string, boolean>>({});
  const [selectedCompetencies, setSelectedCompetencies] = useState<Record<string, boolean>>({});
  const [selectedObjectius, setSelectedObjectius] = useState<Record<string, boolean>>({});
  const [selectedActivities, setSelectedActivities] = useState<Record<string, boolean>>({});
  const [selectedMetodologia, setSelectedMetodologia] = useState(true);
  const [selectedAvaluacio, setSelectedAvaluacio] = useState(true);
  const [selectedRecursos, setSelectedRecursos] = useState<Record<string, boolean>>({});
  const [selectedBibliografia, setSelectedBibliografia] = useState<Record<string, boolean>>({});
  const [selectedSortides, setSelectedSortides] = useState<Record<string, boolean>>({});

  const handleAnalyzeImportText = () => {
    if (!importText.trim()) {
      showFeedback("error", "Enganxa el text de la presentació abans de processar!");
      return;
    }

    try {
      const parsed = parseSyllabusDocument(importText);
      setParsedData(parsed);
      setSelectedMetadata(true);

      const rasSel: Record<string, boolean> = {};
      (parsed.ras || []).forEach((r: any) => { rasSel[r.id] = true; });
      setSelectedRAs(rasSel);

      const compSel: Record<string, boolean> = {};
      (parsed.competencies || []).forEach((c: any) => { compSel[c.id] = true; });
      setSelectedCompetencies(compSel);

      const objSel: Record<string, boolean> = {};
      (parsed.objectius || []).forEach((o: any) => { objSel[o.id] = true; });
      setSelectedObjectius(objSel);

      const actSel: Record<string, boolean> = {};
      (parsed.activitats || []).forEach((a: any) => { actSel[a.id] = true; });
      setSelectedActivities(actSel);

      setSelectedMetodologia(true);
      setSelectedAvaluacio(true);

      const recSel: Record<string, boolean> = {};
      (parsed.espaisrecursos || []).forEach((r: any) => { recSel[r.id] = true; });
      setSelectedRecursos(recSel);

      const bibSel: Record<string, boolean> = {};
      (parsed.bibliografia || []).forEach((b: any) => { bibSel[b.id] = true; });
      setSelectedBibliografia(bibSel);

      const sortSel: Record<string, boolean> = {};
      (parsed.sortides || []).forEach((s: any) => { sortSel[s.id] = true; });
      setSelectedSortides(sortSel);

      setImportStep(2);
      showFeedback("success", "S'ha completat l'anàlisi de contingut. Si us plau, revisa i confirma les dades.");
    } catch (e) {
      console.error(e);
      showFeedback("error", "Error en analitzar el text. Revisa el format del document.");
    }
  };

  const handleConfirmImport = () => {
    if (!parsedData) return;

    try {
      // Build base object
      const isOverwriting = importMode === "overwrite" && activeModule;
      const baseObj = isOverwriting ? activeModule : {
        id: "module-imported-" + Date.now(),
        departament: "Comerç i Màrqueting",
        familiaProfessional: "Comerç i Màrqueting",
        cicleFormatiu: "",
        codiModul: "",
        nomModul: "",
        horesCentre: 0,
        horesEmpresa: 0,
        totalHores: 0,
        professorat: "Docent del mòdul",
        objectius: [],
        ras: [],
        competencies: [],
        avaluacioPrimera: "",
        avaluacioSegona: "",
        metodologia: [],
        activitats: [],
        sortides: [],
        espaisrecursos: [],
        bibliografia: []
      };

      const finalMetadata = selectedMetadata ? {
        departament: parsedData.departament,
        familiaProfessional: parsedData.familiaProfessional,
        cicleFormatiu: parsedData.cicleFormatiu,
        codiModul: parsedData.codiModul,
        nomModul: parsedData.nomModul,
        horesCentre: parsedData.horesCentre,
        horesEmpresa: parsedData.horesEmpresa,
        totalHores: parsedData.totalHores,
        professorat: parsedData.professorat
      } : {
        departament: baseObj.departament,
        familiaProfessional: baseObj.familiaProfessional,
        cicleFormatiu: baseObj.cicleFormatiu,
        codiModul: baseObj.codiModul,
        nomModul: baseObj.nomModul,
        horesCentre: baseObj.horesCentre,
        horesEmpresa: baseObj.horesEmpresa,
        totalHores: baseObj.totalHores,
        professorat: baseObj.professorat
      };

      // Handle collections replacing or keeping depending on selection
      const finalRAs = Object.values(selectedRAs).some(v => v)
        ? (parsedData.ras || []).filter((r: any) => selectedRAs[r.id])
        : baseObj.ras;

      const finalCompetencies = Object.values(selectedCompetencies).some(v => v)
        ? (parsedData.competencies || []).filter((c: any) => selectedCompetencies[c.id])
        : baseObj.competencies;

      const finalObjectius = Object.values(selectedObjectius).some(v => v)
        ? (parsedData.objectius || []).filter((o: any) => selectedObjectius[o.id])
        : baseObj.objectius;

      const finalActivities = Object.values(selectedActivities).some(v => v)
        ? (parsedData.activitats || []).filter((a: any) => selectedActivities[a.id])
        : baseObj.activitats;

      const finalMetodologia = selectedMetodologia
        ? (parsedData.metodologia || [])
        : baseObj.metodologia;

      const finalRecursos = Object.values(selectedRecursos).some(v => v)
        ? (parsedData.espaisrecursos || []).filter((r: any) => selectedRecursos[r.id])
        : baseObj.espaisrecursos;

      const finalBibliografia = Object.values(selectedBibliografia).some(v => v)
        ? (parsedData.bibliografia || []).filter((b: any) => selectedBibliografia[b.id])
        : baseObj.bibliografia;

      const finalSortides = Object.values(selectedSortides).some(v => v)
        ? (parsedData.sortides || []).filter((s: any) => selectedSortides[s.id])
        : baseObj.sortides;

      let finalAvaluacioPrimera = baseObj.avaluacioPrimera;
      let finalAvaluacioSegona = baseObj.avaluacioSegona;
      if (selectedAvaluacio) {
        finalAvaluacioPrimera = parsedData.avaluacioPrimera;
        finalAvaluacioSegona = parsedData.avaluacioSegona;
      }

      const finalMod = ensureModuleFields({
        ...baseObj,
        ...finalMetadata,
        ras: finalRAs,
        competencies: finalCompetencies,
        objectius: finalObjectius,
        activitats: finalActivities,
        metodologia: finalMetodologia,
        espaisrecursos: finalRecursos,
        bibliografia: finalBibliografia,
        sortides: finalSortides,
        avaluacioPrimera: finalAvaluacioPrimera,
        avaluacioSegona: finalAvaluacioSegona
      });

      if (isOverwriting) {
        const updatedList = modules.map(m => m.id === activeModule.id ? finalMod : m);
        saveModules(updatedList);
        setSelectedId(finalMod.id);
        showFeedback("success", `Mòdul ${finalMod.codiModul} actualitzat amb èxit amb les dades seleccionades!`);
      } else {
        const updatedList = [finalMod, ...modules];
        saveModules(updatedList);
        setSelectedId(finalMod.id);
        setViewMode("edit");
        showFeedback("success", `Mòdul ${finalMod.codiModul} importat amb èxit de forma correcta!`);
      }

      setIsImportModalOpen(false);
      setImportText("");
      setParsedData(null);
      setImportStep(1);
    } catch (e) {
      console.error(e);
      showFeedback("error", "S'ha produït un error en desar les dades de l'importador.");
    }
  };

  // Load from localStorage or populate defaults
  useEffect(() => {
    const stored = localStorage.getItem("cm_modules");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const completed = parsed.map(ensureModuleFields);
          setModules(completed);
          return;
        }
      } catch (e) {
        console.error("Error carregant de localStorage", e);
      }
    }
    // Default initial load
    const completedSamples = INITIAL_SAMPLES.map(ensureModuleFields);
    setModules(completedSamples);
    localStorage.setItem("cm_modules", JSON.stringify(completedSamples));
  }, []);

  // Save changes to state and localStorage
  const saveModules = (updatedList: ModulePresentation[]) => {
    setModules(updatedList);
    localStorage.setItem("cm_modules", JSON.stringify(updatedList));
  };

  // Helper for flash feedback messages
  const showFeedback = (type: "success" | "error", message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  // Update single module on the fly
  const handleUpdateModule = (updated: ModulePresentation) => {
    const updatedList = modules.map((m) => (m.id === updated.id ? updated : m));
    saveModules(updatedList);
  };

  // Delete module
  const handleDeleteModule = (id: string) => {
    const target = modules.find((m) => m.id === id);
    if (!target) return;
    setModuleToDelete(target);
  };

  const confirmDeleteModule = () => {
    if (!moduleToDelete) return;
    const updatedList = modules.filter((m) => m.id !== moduleToDelete.id);
    saveModules(updatedList);
    if (selectedId === moduleToDelete.id) {
      setSelectedId(null);
      setSelectedCycle(null);
      setOnboardingStep(1);
    }
    setModuleToDelete(null);
    showFeedback("success", "El mòdul s'ha eliminat correctament.");
  };

  // Export module to exact multi-sheet Excel format
  const handleExportCSV = (module: ModulePresentation) => {
    try {
      exportToExcel(module);
      showFeedback("success", `S'ha descarregat l'Excel amb les 10 pestanyes de ${module.codiModul}!`);
    } catch (error) {
      console.error(error);
      showFeedback("error", "Error generant el fitxer d'Excel.");
    }
  };

  const activeModule = modules.find((m) => m.id === selectedId) || null;

  const handleDocxUpload = (e: React.ChangeEvent<HTMLInputElement>, isOverwrite: boolean = false) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const arrayBuffer = event.target?.result as ArrayBuffer;
      try {
        const result = await mammoth.extractRawText({ arrayBuffer });
        const text = result.value;
        
        if (!text || !text.trim()) {
          showFeedback("error", "No s'ha pogut extreure text d'aquest fitxer .docx o està buit.");
          return;
        }

        const parsed = parseSyllabusDocument(text);
        
        if (isOverwrite && activeModule) {
          // Merge / overwrite fields on the active module
          const updatedMod = {
            ...activeModule,
            ...parsed,
            // Ensure lists are properly assigned
            objectius: parsed.objectius && parsed.objectius.length > 0 ? parsed.objectius : activeModule.objectius,
            ras: parsed.ras && parsed.ras.length > 0 ? parsed.ras : activeModule.ras,
            competencies: parsed.competencies && parsed.competencies.length > 0 ? parsed.competencies : activeModule.competencies,
            avaluacioPrimera: parsed.avaluacioPrimera || activeModule.avaluacioPrimera,
            avaluacioSegona: parsed.avaluacioSegona || activeModule.avaluacioSegona,
            metodologia: parsed.metodologia && parsed.metodologia.length > 0 ? parsed.metodologia : activeModule.metodologia,
            activitats: parsed.activitats && parsed.activitats.length > 0 ? parsed.activitats : activeModule.activitats,
            sortides: parsed.sortides && parsed.sortides.length > 0 ? parsed.sortides : activeModule.sortides,
            espaisrecursos: parsed.espaisrecursos && parsed.espaisrecursos.length > 0 ? parsed.espaisrecursos : activeModule.espaisrecursos,
            bibliografia: parsed.bibliografia && parsed.bibliografia.length > 0 ? parsed.bibliografia : activeModule.bibliografia
          };
          
          handleUpdateModule(updatedMod);
          showFeedback("success", `S'ha actualitzat el mòdul ${activeModule.codiModul} amb les dades de l'arxiu .docx!`);
        } else {
          // Create a new module
          const newMod = ensureModuleFields({
            id: "module-docx-" + Date.now(),
            ...parsed,
            cursAcademic: "2026-2027",
            grup: "A"
          });
          
          const updatedList = [newMod, ...modules];
          saveModules(updatedList);
          setSelectedId(newMod.id);
          showFeedback("success", `S'ha importat el nou mòdul ${newMod.codiModul || ""} correctament des del fitxer .docx!`);
        }
      } catch (err) {
        console.error("Error parsing .docx:", err);
        showFeedback("error", "Error llegint o processant el fitxer .docx.");
      }
    };
    reader.readAsArrayBuffer(file);
    e.target.value = "";
  };

  return (
    <div className="min-h-screen bg-[#f4f7fc] text-slate-800 font-sans flex flex-col antialiased selection:bg-[#0052cc]/15 selection:text-[#0052cc]">
      
      {/* Header */}
      <header className="no-print bg-white border-b border-slate-100 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Brand block */}
          <div 
            onClick={() => {
              setSelectedId(null);
              setSelectedCycle(null);
              setOnboardingStep(1);
            }}
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="h-10 w-10 bg-[#0052cc] text-white flex items-center justify-center rounded-xl font-serif font-black text-xl shadow-md border border-blue-400/20">
              CM
            </div>
            <div>
              <h1 className="text-md sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-1.5 leading-none uppercase">
                Planificador de Mòduls FP
              </h1>
              <span className="text-[11px] text-[#0052cc] font-extrabold uppercase tracking-widest mt-1 block">
                Comerç i Màrqueting - ViB
              </span>
            </div>
          </div>

          {/* Actions & Navigation when a module is selected */}
          {activeModule && (
            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <button
                onClick={() => {
                  setSelectedId(null);
                  setSelectedCycle(null);
                  setOnboardingStep(1);
                }}
                className="py-1.5 px-3 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg text-xs font-bold transition-all border border-slate-200"
              >
                ← Canvia de mòdul
              </button>

              <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
                <button
                  onClick={() => setViewMode("edit")}
                  className={`py-1 px-3 rounded-md text-xs font-bold flex items-center gap-1 transition-all ${
                    viewMode === "edit"
                      ? "bg-[#0052cc] text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Edit3 className="w-3 h-3" />
                  <span>Editor</span>
                </button>
                <button
                  onClick={() => setViewMode("preview")}
                  className={`py-1 px-3 rounded-md text-xs font-bold flex items-center gap-1 transition-all ${
                    viewMode === "preview"
                      ? "bg-[#0052cc] text-white shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  <Eye className="w-3 h-3" />
                  <span>Presentació</span>
                </button>
              </div>

              <button
                onClick={() => handleExportCSV(activeModule)}
                className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-xs cursor-pointer"
              >
                <FileSpreadsheet className="w-3.5 h-3.5" />
                <span>Exporta Excel</span>
              </button>

              <label
                className="py-1.5 px-3 bg-blue-50 hover:bg-blue-100 text-[#0052cc] border border-blue-200/30 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                title="Importa o sobreescriu el mòdul actual des d'un fitxer de Word (.docx)"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Importa .docx</span>
                <input
                  type="file"
                  accept=".docx"
                  onChange={(e) => handleDocxUpload(e, true)}
                  className="hidden"
                />
              </label>

              <button
                onClick={() => handleDeleteModule(activeModule.id)}
                className="py-1.5 px-3 bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200 rounded-lg text-xs font-bold flex items-center gap-1 transition-all cursor-pointer"
                title="Esborra aquest mòdul de la llista"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Esborra</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Feedback banner */}
      {feedback && (
        <div className="no-print bg-slate-900 text-white py-2 px-4 shadow-lg text-center font-medium text-sm flex items-center justify-center gap-2 z-50 animate-fade-in">
          {feedback.type === "success" ? (
            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col gap-6 h-auto lg:h-[calc(100vh-80px)] overflow-y-auto lg:overflow-hidden print:p-0 print:h-auto print:overflow-visible font-sans">
        
        {/* Onboarding selection screen (Step-by-step Selection) */}
        {!activeModule ? (
          <section className="flex-1 flex flex-col justify-center items-center py-6">
            
            <div className="text-center max-w-xl mb-10">
              <span className="px-3 py-1 bg-[#0052cc]/10 text-[#0052cc] text-xs font-bold uppercase tracking-wider rounded-full">
                Planificació Curricular Pas a Pas
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-3 tracking-tight">
                Planificador de Comerç i Màrqueting
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Eina simplificada per a la creació de presentacions dels mòduls professionals de la família professional de Comerç i Màrqueting.
              </p>
              
              <div className="mt-5 flex flex-col items-center justify-center">
                <div className="w-full max-w-md border-2 border-dashed border-blue-200 hover:border-[#0052cc] rounded-2xl bg-blue-50/10 p-5 text-center transition-all group relative cursor-pointer">
                  <input
                    type="file"
                    accept=".docx"
                    onChange={(e) => handleDocxUpload(e, false)}
                    className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                  />
                  <div className="flex flex-col items-center justify-center gap-2">
                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-[#0052cc] flex items-center justify-center group-hover:bg-[#0052cc] group-hover:text-white transition-all">
                      <FileText className="w-5 h-5" />
                    </div>
                    <p className="text-xs font-bold text-slate-700">
                      Carrega presentació antiga (.docx)
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Arrossega el teu fitxer de Word o fes-hi clic per analitzar-lo localment de cop
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {onboardingStep === 1 ? (
              <div className="w-full max-w-4xl space-y-8">
                {/* Saved Modules list */}
                {modules.length > 0 && (
                  <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl shadow-xs space-y-4">
                    <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                      <Layers className="w-5 h-5 text-[#0052cc]" />
                      <h3 className="font-extrabold text-slate-800 text-md">Les teves presentacions guardades</h3>
                      <span className="bg-[#0052cc]/10 text-[#0052cc] px-2 py-0.5 rounded-full text-xs font-extrabold">
                        {modules.length}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {modules.map((m) => (
                        <div
                          key={m.id}
                          className="p-4 bg-white border border-slate-200 hover:border-blue-300 rounded-xl shadow-xs transition-all flex flex-col justify-between h-44 group relative"
                        >
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-start gap-2">
                              <span className="px-2 py-0.5 bg-blue-50 text-[10px] font-extrabold text-[#0052cc] rounded truncate max-w-[120px]" title={m.cicleFormatiu}>
                                {m.cicleFormatiu}
                              </span>
                              <span className="px-2 py-0.5 bg-slate-100 text-[10px] font-bold text-slate-600 rounded">
                                Mòdul {m.codiModul}
                              </span>
                            </div>
                            <h4 className="text-xs font-extrabold text-slate-900 line-clamp-2">
                              {m.nomModul}
                            </h4>
                            <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
                              Docent: {m.professorat || "No indicat"}
                            </p>
                          </div>

                          <div className="flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5 mt-2">
                            <button
                              onClick={() => {
                                setSelectedId(m.id);
                                showFeedback("success", `S'ha carregat el mòdul ${m.codiModul}!`);
                              }}
                              className="text-xs font-extrabold text-[#0052cc] flex items-center gap-1 hover:underline cursor-pointer"
                            >
                              <span>Obre la presentació</span>
                              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                            </button>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteModule(m.id);
                              }}
                              className="p-1.5 hover:bg-rose-50 text-rose-500 hover:text-rose-600 rounded-lg transition-colors cursor-pointer"
                              title="Esborra aquest mòdul"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
                  <span className="h-6 w-6 bg-[#0052cc] text-white flex items-center justify-center rounded-full text-xs font-bold">1</span>
                  <h3 className="font-extrabold text-slate-800 text-lg">Tria el teu Cicle Formatiu</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {CICLES_TEMPLATES.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedCycle(c.name);
                        setOnboardingStep(2);
                      }}
                      className="p-5 bg-white border border-slate-200 hover:border-[#0052cc] hover:bg-blue-50/5 rounded-2xl shadow-xs hover:shadow-md transition-all text-left flex flex-col justify-between h-40 group cursor-pointer"
                    >
                      <div className="h-10 w-10 bg-blue-50 text-[#0052cc] rounded-xl flex items-center justify-center group-hover:bg-[#0052cc] group-hover:text-white transition-all">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-900 group-hover:text-[#0052cc] transition-colors line-clamp-2">
                          {c.name}
                        </h4>
                        <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold mt-2">
                          {c.family}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="w-full max-w-4xl space-y-6">
                <div className="flex justify-between items-center border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 bg-[#0052cc] text-white flex items-center justify-center rounded-full text-xs font-bold">2</span>
                    <h3 className="font-extrabold text-slate-800 text-lg">Tria el Mòdul Professional</h3>
                  </div>
                  <button
                    onClick={() => setOnboardingStep(1)}
                    className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Tria un altre cicle
                  </button>
                </div>

                <p className="text-xs text-slate-500 font-semibold bg-blue-50/50 border border-blue-100 p-3 rounded-xl">
                  Cicle seleccionat: <strong className="text-[#0052cc]">{selectedCycle}</strong>
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {MODULE_TEMPLATES.filter(t => t.cicle === selectedCycle).map((t) => {
                    const existing = modules.find(m => m.cicleFormatiu === selectedCycle && m.codiModul === t.codiModul);
                    return (
                      <div
                        key={t.codiModul}
                        onClick={() => {
                          if (existing) {
                            setSelectedId(existing.id);
                            showFeedback("success", `S'ha carregat el mòdul ${t.codiModul} - ${t.nomModul}!`);
                          } else {
                            const formattedUfs = t.unitatsFormatives.map((uf, i) => ({
                              id: `uf-${Date.now()}-${i}`,
                              nom: uf.nom,
                              hores: uf.hores
                            }));
                            const official = getOfficialCurriculumData(selectedCycle!, t.codiModul);
                            const newMod = ensureModuleFields({
                              id: "module-" + Date.now(),
                              departament: "Comerç i Màrqueting",
                              familiaProfessional: "Comerç i Màrqueting",
                              cicleFormatiu: selectedCycle,
                              codiModul: t.codiModul,
                              nomModul: t.nomModul,
                              horesCentre: t.horesCentre,
                              horesEmpresa: t.horesEmpresa,
                              totalHores: t.horesCentre + t.horesEmpresa,
                              professorat: "Docent del mòdul",
                              descripcio: official?.descripcio || t.descripcio || "",
                              cursAcademic: "2026-2027",
                              grup: "A",
                              unitatsFormatives: formattedUfs,
                              objectius: official?.objectius || undefined,
                              ras: official?.ras || undefined,
                              competencies: official?.competencies || undefined,
                              avaluacio: [
                                { concepte: "Exàmens i proves teoricopràctiques", percentatge: 40 },
                                { concepte: "Projectes i entregues d'activitats", percentatge: 50 },
                                { concepte: "Assistència, puntualitat i participació", percentatge: 10 }
                              ],
                              metodologia: "Metodologia activa basada en projectes (ABP) i aprenentatge guiat.",
                              materials: "Ordinador de l'aula, apunts virtuals i programari específic.",
                              observacions: "L'avaluació contínua requereix l'assistència regular a l'aula."
                            });
                            const updatedList = [newMod, ...modules];
                            saveModules(updatedList);
                            setSelectedId(newMod.id);
                            showFeedback("success", `Mòdul creat correctament basat en el currículum de la Generalitat!`);
                          }
                        }}
                        className="p-4 bg-white border border-slate-200 hover:border-[#0052cc] rounded-xl shadow-xs hover:shadow-sm transition-all text-left flex flex-col justify-between h-38 group cursor-pointer"
                      >
                        <div>
                          <div className="flex justify-between items-center w-full">
                            <span className="px-2 py-0.5 bg-blue-50 text-[10px] font-extrabold text-[#0052cc] rounded">
                              Mòdul {t.codiModul}
                            </span>
                            {existing && (
                              <div className="flex items-center gap-1.5">
                                <span className="px-2 py-0.5 bg-emerald-50 text-[9px] font-extrabold text-emerald-700 rounded flex items-center gap-1">
                                  <Check className="w-3 h-3" />
                                  Modificat
                                </span>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteModule(existing.id);
                                  }}
                                  className="p-1 hover:bg-rose-50 text-rose-500 hover:text-rose-600 rounded-md transition-colors cursor-pointer z-10"
                                  title="Esborra aquesta presentació"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                          <h4 className="text-sm font-extrabold text-slate-900 mt-2 line-clamp-1 group-hover:text-[#0052cc] transition-colors">
                            {t.nomModul}
                          </h4>
                          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1 font-medium">
                            {t.horesCentre}h centre • {t.horesEmpresa}h empresa
                          </p>
                        </div>
                        <div className="text-[11px] font-extrabold text-[#0052cc] flex items-center gap-1 mt-3">
                          <span>{existing ? "Continua editant" : "Comença a editar"}</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </section>
        ) : (
          /* Editor / Presentation View */
          <section className="flex-1 h-auto lg:h-full overflow-y-auto lg:overflow-hidden flex flex-col print:overflow-visible print:h-auto">
            <div className="flex-1 h-full overflow-hidden print:h-auto print:overflow-visible">
              {viewMode === "edit" ? (
                <ModuleForm
                  module={activeModule}
                  onUpdate={handleUpdateModule}
                  onExportCSV={() => handleExportCSV(activeModule)}
                  modules={modules}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                  onDelete={handleDeleteModule}
                />
              ) : (
                <ModulePreview
                  module={activeModule}
                  onExportCSV={() => handleExportCSV(activeModule)}
                  modules={modules}
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              )}
            </div>
          </section>
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {moduleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in no-print">
          <div className="bg-white rounded-2xl border border-slate-150 shadow-2xl max-w-md w-full p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-rose-50 rounded-xl text-rose-600 shrink-0">
                <Trash2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">Eliminar Mòdul Professional</h3>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Vols eliminar la presentació de <strong className="text-slate-800">{moduleToDelete.codiModul} - {moduleToDelete.nomModul}</strong>?
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-3 justify-end">
              <button
                onClick={() => setModuleToDelete(null)}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl"
              >
                Cancel·la
              </button>
              <button
                onClick={confirmDeleteModule}
                className="px-5 py-2 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
              >
                Esborra
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import syllabus from .doc Modal */}
      {false && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in no-print">
          <div className={`bg-white rounded-2xl border border-slate-150 shadow-2xl w-full flex flex-col max-h-[90vh] overflow-hidden transition-all duration-300 ${importStep === 2 ? 'max-w-4xl' : 'max-w-2xl'} p-6`}>
            
            {/* Modal Header */}
            <div className="flex items-start gap-4 pb-4 border-b border-slate-100 shrink-0">
              <div className="p-3 bg-blue-50 rounded-xl text-[#0052cc] shrink-0">
                <FileText className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-bold text-slate-900">
                  {importStep === 1 
                    ? "Assistent d'Importació de Presentacions (.doc)" 
                    : "Zona de Previsualització i Confirmació (Staging Area)"}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {importStep === 1 
                    ? "Enganxa el contingut textual del teu document de Word (.doc) antic. L'assistent el processarà de manera 100% local." 
                    : "S'han detectat dades estructurades amb èxit! Selecciona quins elements desitges bolcar a l'editor de la presentació."}
                </p>
              </div>
            </div>

            {/* Modal Body */}
            {importStep === 1 ? (
              <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Contingut de la presentació antiga *</label>
                  <textarea
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    placeholder={`Enganxa aquí el text o taules del teu document d'origen...

Exemple d'estructura reconeguda:
Departament: Comerç i Màrqueting
Cicle Formatiu: CFGS Comerç Internacional
Mòdul Professional: 0625, Logística d'Emmagatzematge
Hores centre educatiu: 99
Hores totals: 165
Realitzat per: Àngel Domènech Segovia

RA1. Organitza el magatzem i classifica...
1.1 Defineix els sistemes de magatzem...
1.2 ...

ESTRATÈGIES METODOLÒGIQUES
La metodologia activa...

AVALUACIÓ I QUALIFICACIÓ
RA1*0,15 + RA2*0,25 + ...`}
                    className="w-full h-80 p-4 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#0052cc] focus:ring-2 focus:ring-blue-100 text-xs font-mono text-slate-700 leading-relaxed"
                  />
                </div>

                {activeModule && (
                  <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4 space-y-3">
                    <h4 className="text-xs font-bold text-[#0052cc] uppercase tracking-wider">Mode d'importació</h4>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <label className="flex items-center gap-2 text-xs text-slate-700 font-bold cursor-pointer">
                        <input
                          type="radio"
                          name="importMode"
                          checked={importMode === "overwrite"}
                          onChange={() => setImportMode("overwrite")}
                          className="text-[#0052cc] focus:ring-[#0052cc] w-4 h-4"
                        />
                        <span>Actualitza i sobreescriu el mòdul actual ({activeModule.codiModul})</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs text-slate-700 font-bold cursor-pointer">
                        <input
                          type="radio"
                          name="importMode"
                          checked={importMode === "create"}
                          onChange={() => setImportMode("create")}
                          className="text-[#0052cc] focus:ring-[#0052cc] w-4 h-4"
                        />
                        <span>Crea una nova presentació</span>
                      </label>
                    </div>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {importMode === "overwrite" 
                        ? "Avís: Sobreescriuràs totes les pestanyes del mòdul actiu amb les dades extretes."
                        : "Crea un element totalment nou a la teva llista d'esborranys."}
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto py-4 space-y-6 pr-1">
                {/* Warning notification */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-amber-800">
                  <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-600" />
                  <div>
                    <span className="font-bold">Revisió estructurada:</span> Activa o desactiva cadascun dels camps o llistes mitjançant els botons de selecció. Les dades s'integraran de forma instantània a la teva presentació en confirmar.
                  </div>
                </div>

                {/* Secció 1: Metadades generals */}
                <div className="border border-slate-150 rounded-xl overflow-hidden bg-white shadow-xs">
                  <div className="bg-slate-50 border-b border-slate-150 px-4 py-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Settings className="w-4 h-4 text-slate-500" />
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Secció Metadades del Mòdul</span>
                    </div>
                    <label className="flex items-center gap-2 text-xs font-bold text-[#0052cc] cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedMetadata}
                        onChange={(e) => setSelectedMetadata(e.target.checked)}
                        className="rounded text-[#0052cc] focus:ring-[#0052cc] w-4 h-4 cursor-pointer"
                      />
                      <span>Importar dades generals</span>
                    </label>
                  </div>
                  <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 font-medium">Mòdul Professional:</span>
                      <p className="font-bold text-slate-800">{parsedData?.codiModul || "—"} - {parsedData?.nomModul || "—"}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Cicle Formatiu:</span>
                      <p className="font-bold text-slate-800">{parsedData?.cicleFormatiu || "—"}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Departament:</span>
                      <p className="font-medium text-slate-700">{parsedData?.departament || "—"}</p>
                    </div>
                    <div>
                      <span className="text-slate-400 font-medium">Hores:</span>
                      <p className="font-bold text-slate-800">
                        {parsedData?.horesCentre || 0} h. Centre + {parsedData?.horesEmpresa || 0} h. Empresa = {parsedData?.totalHores || 0} h. Totals
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 font-medium">Docent / Realitzat per:</span>
                      <p className="font-bold text-slate-800">{parsedData?.professorat || "—"}</p>
                    </div>
                  </div>
                </div>

                {/* Secció 2: Resultats d'Aprenentatge (RAs) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#0052cc]" />
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Resultats d'Aprenentatge ({parsedData?.ras?.length || 0})</h4>
                    </div>
                    <button 
                      onClick={() => {
                        const allChecked = Object.values(selectedRAs).every(v => v);
                        const next = !allChecked;
                        const nextSel = { ...selectedRAs };
                        (parsedData?.ras || []).forEach((r: any) => { nextSel[r.id] = next; });
                        setSelectedRAs(nextSel);
                      }}
                      className="text-[10px] text-[#0052cc] hover:underline font-bold"
                    >
                      {Object.values(selectedRAs).every(v => v) ? "Desselecciona tots" : "Selecciona tots"}
                    </button>
                  </div>
                  {parsedData?.ras && parsedData.ras.length > 0 ? (
                    <div className="space-y-2">
                      {parsedData.ras.map((ra: any) => (
                        <div key={ra.id} className={`border rounded-xl p-3.5 transition-all ${selectedRAs[ra.id] ? 'border-blue-150 bg-blue-50/10' : 'border-slate-150 bg-slate-50/30 opacity-70'}`}>
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={!!selectedRAs[ra.id]}
                              onChange={(e) => setSelectedRAs(prev => ({ ...prev, [ra.id]: e.target.checked }))}
                              className="rounded text-[#0052cc] focus:ring-[#0052cc] w-4 h-4 mt-0.5 cursor-pointer"
                            />
                            <div className="space-y-1.5 flex-1">
                              <div className="flex items-center gap-2">
                                <span className="bg-[#0052cc]/10 text-[#0052cc] font-extrabold text-[10px] px-1.5 py-0.5 rounded-md">RA {ra.codi}</span>
                                <span className="text-[10px] text-slate-400 font-bold">Ponderació inicial: {ra.ponderacio}%</span>
                              </div>
                              <div className="text-xs text-slate-800 font-bold whitespace-pre-line leading-relaxed">{ra.text}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No s'ha detectat cap Resultat d'Aprenentatge (RA).</p>
                  )}
                </div>

                {/* Secció 3: Activitats d'Aprenentatge (AEAs) */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-[#0052cc]" />
                      <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">Activitats d'Aprenentatge ({parsedData?.activitats?.length || 0})</h4>
                    </div>
                    <button 
                      onClick={() => {
                        const allChecked = Object.values(selectedActivities).every(v => v);
                        const next = !allChecked;
                        const nextSel = { ...selectedActivities };
                        (parsedData?.activitats || []).forEach((a: any) => { nextSel[a.id] = next; });
                        setSelectedActivities(nextSel);
                      }}
                      className="text-[10px] text-[#0052cc] hover:underline font-bold"
                    >
                      {Object.values(selectedActivities).every(v => v) ? "Desselecciona tots" : "Selecciona tots"}
                    </button>
                  </div>
                  {parsedData?.activitats && parsedData.activitats.length > 0 ? (
                    <div className="space-y-2">
                      {parsedData.activitats.map((act: any) => (
                        <div key={act.id} className={`border rounded-xl p-3.5 transition-all ${selectedActivities[act.id] ? 'border-blue-150 bg-blue-50/10' : 'border-slate-150 bg-slate-50/30 opacity-70'}`}>
                          <div className="flex items-start gap-2.5">
                            <input
                              type="checkbox"
                              checked={!!selectedActivities[act.id]}
                              onChange={(e) => setSelectedActivities(prev => ({ ...prev, [act.id]: e.target.checked }))}
                              className="rounded text-[#0052cc] focus:ring-[#0052cc] w-4 h-4 mt-0.5 cursor-pointer"
                            />
                            <div className="space-y-1.5 flex-1 text-xs text-slate-700">
                              <div className="text-slate-800 font-bold whitespace-pre-line leading-relaxed">{act.text}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No s'han detectat activitats (AEA).</p>
                  )}
                </div>

                {/* Secció 4: Textos Lliures - Metodologia i Avaluació */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Metodologia */}
                  <div className={`border rounded-xl overflow-hidden transition-all ${selectedMetodologia ? 'border-blue-150 bg-blue-50/10' : 'border-slate-150 bg-slate-50/30 opacity-70'}`}>
                    <div className="bg-slate-50/80 border-b border-slate-150 px-4 py-2.5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Metodologia</span>
                      <input
                        type="checkbox"
                        checked={selectedMetodologia}
                        onChange={(e) => setSelectedMetodologia(e.target.checked)}
                        className="rounded text-[#0052cc] focus:ring-[#0052cc] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div className="p-3.5 text-xs text-slate-600 space-y-2 max-h-48 overflow-y-auto leading-relaxed">
                      {parsedData?.metodologia && parsedData.metodologia.length > 0 ? (
                        parsedData.metodologia.map((m: any) => (
                          <p key={m.id} className="whitespace-pre-line bg-white p-2 rounded-lg border border-slate-100">{m.text}</p>
                        ))
                      ) : (
                        <p className="italic text-slate-400">No s'han trobat paràgrafs de metodologia.</p>
                      )}
                    </div>
                  </div>

                  {/* Avaluació */}
                  <div className={`border rounded-xl overflow-hidden transition-all ${selectedAvaluacio ? 'border-blue-150 bg-blue-50/10' : 'border-slate-150 bg-slate-50/30 opacity-70'}`}>
                    <div className="bg-slate-50/80 border-b border-slate-150 px-4 py-2.5 flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">Avaluació i Fórmula</span>
                      <input
                        type="checkbox"
                        checked={selectedAvaluacio}
                        onChange={(e) => setSelectedAvaluacio(e.target.checked)}
                        className="rounded text-[#0052cc] focus:ring-[#0052cc] w-4 h-4 cursor-pointer"
                      />
                    </div>
                    <div className="p-3.5 text-xs text-slate-600 space-y-2 max-h-48 overflow-y-auto leading-relaxed">
                      {parsedData?.avaluacioPrimera ? (
                        <div className="whitespace-pre-line bg-white p-2 rounded-lg border border-slate-100">{parsedData.avaluacioPrimera}</div>
                      ) : (
                        <p className="italic text-slate-400">No s'han trobat paràgrafs d'avaluació.</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Secció 5: Recursos, Sortides i Bibliografia */}
                <div className="space-y-4">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Altres dades extretes</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Recursos */}
                    <div className="border border-slate-150 rounded-xl p-3.5 space-y-2.5 bg-white">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Recursos i Espais ({parsedData?.espaisrecursos?.length || 0})</span>
                      {parsedData?.espaisrecursos && parsedData.espaisrecursos.length > 0 ? (
                        <div className="space-y-2 max-h-36 overflow-y-auto">
                          {parsedData.espaisrecursos.map((r: any) => (
                            <label key={r.id} className="flex items-start gap-2 text-xs text-slate-600 font-medium cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!selectedRecursos[r.id]}
                                onChange={(e) => setSelectedRecursos(prev => ({ ...prev, [r.id]: e.target.checked }))}
                                className="rounded text-[#0052cc] focus:ring-[#0052cc] w-3.5 h-3.5 mt-0.5 cursor-pointer"
                              />
                              <span>{r.text}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">No s'han trobat recursos.</p>
                      )}
                    </div>

                    {/* Bibliografia */}
                    <div className="border border-slate-150 rounded-xl p-3.5 space-y-2.5 bg-white">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Bibliografia ({parsedData?.bibliografia?.length || 0})</span>
                      {parsedData?.bibliografia && parsedData.bibliografia.length > 0 ? (
                        <div className="space-y-2 max-h-36 overflow-y-auto">
                          {parsedData.bibliografia.map((b: any) => (
                            <label key={b.id} className="flex items-start gap-2 text-xs text-slate-600 font-medium cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!selectedBibliografia[b.id]}
                                onChange={(e) => setSelectedBibliografia(prev => ({ ...prev, [b.id]: e.target.checked }))}
                                className="rounded text-[#0052cc] focus:ring-[#0052cc] w-3.5 h-3.5 mt-0.5 cursor-pointer"
                              />
                              <span>{b.text}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">No s'ha trobat bibliografia.</p>
                      )}
                    </div>

                    {/* Sortides */}
                    <div className="border border-slate-150 rounded-xl p-3.5 space-y-2.5 bg-white">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Sortides ({parsedData?.sortides?.length || 0})</span>
                      {parsedData?.sortides && parsedData.sortides.length > 0 ? (
                        <div className="space-y-2 max-h-36 overflow-y-auto">
                          {parsedData.sortides.map((s: any) => (
                            <label key={s.id} className="flex items-start gap-2 text-xs text-slate-600 font-medium cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!selectedSortides[s.id]}
                                onChange={(e) => setSelectedSortides(prev => ({ ...prev, [s.id]: e.target.checked }))}
                                className="rounded text-[#0052cc] focus:ring-[#0052cc] w-3.5 h-3.5 mt-0.5 cursor-pointer"
                              />
                              <span>{s.text}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">No s'han trobat sortides.</p>
                      )}
                    </div>
                  </div>

                  {/* Competències i Objectius extrets */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Objectius */}
                    <div className="border border-slate-150 rounded-xl p-3.5 space-y-2 bg-white">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Objectius generals ({parsedData?.objectius?.length || 0})</span>
                      {parsedData?.objectius && parsedData.objectius.length > 0 ? (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {parsedData.objectius.map((o: any) => (
                            <label key={o.id} className="flex items-start gap-2 text-xs text-slate-600 font-medium cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!selectedObjectius[o.id]}
                                onChange={(e) => setSelectedObjectius(prev => ({ ...prev, [o.id]: e.target.checked }))}
                                className="rounded text-[#0052cc] focus:ring-[#0052cc] w-3.5 h-3.5 mt-0.5 cursor-pointer"
                              />
                              <span><strong>{o.codi})</strong> {o.text}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">No s'han trobat objectius.</p>
                      )}
                    </div>

                    {/* Competències */}
                    <div className="border border-slate-150 rounded-xl p-3.5 space-y-2 bg-white">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Competències ({parsedData?.competencies?.length || 0})</span>
                      {parsedData?.competencies && parsedData.competencies.length > 0 ? (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {parsedData.competencies.map((c: any) => (
                            <label key={c.id} className="flex items-start gap-2 text-xs text-slate-600 font-medium cursor-pointer">
                              <input
                                type="checkbox"
                                checked={!!selectedCompetencies[c.id]}
                                onChange={(e) => setSelectedCompetencies(prev => ({ ...prev, [c.id]: e.target.checked }))}
                                className="rounded text-[#0052cc] focus:ring-[#0052cc] w-3.5 h-3.5 mt-0.5 cursor-pointer"
                              />
                              <span><strong>{c.codi})</strong> {c.text}</span>
                            </label>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[11px] text-slate-400 italic">No s'han trobat competències.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Footer */}
            <div className="pt-4 border-t border-slate-100 flex gap-3 justify-end shrink-0">
              {importStep === 1 ? (
                <>
                  <button
                    onClick={() => {
                      setIsImportModalOpen(false);
                      setImportText("");
                    }}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl cursor-pointer"
                  >
                    Cancel·la
                  </button>
                  <button
                    onClick={handleAnalyzeImportText}
                    className="px-5 py-2 text-sm font-bold text-white bg-[#0052cc] hover:bg-blue-700 rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Analitzar contingut</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setImportStep(1)}
                    className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-50 rounded-xl cursor-pointer"
                  >
                    Tornar enrere
                  </button>
                  <button
                    onClick={handleConfirmImport}
                    className="px-5 py-2 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center gap-2 shadow-sm cursor-pointer"
                  >
                    <Check className="w-4 h-4" />
                    <span>Confirmar i importar seleccionats</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
