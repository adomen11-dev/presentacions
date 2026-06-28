import * as XLSX from "xlsx";
import { ModulePresentation } from "../types";

const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return "";
  const match = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) {
    const [_, year, month, day] = match;
    return `${day}/${month}/${year}`;
  }
  return dateStr;
};

export function exportToExcel(module: ModulePresentation) {
  // Create workbook
  const wb = XLSX.utils.book_new();

  // 1. Dades sheet
  const dadesRows = [
    ["Departament", module.departament || ""],
    ["Família professional", module.familiaProfessional || ""],
    ["Cicle Formatiu", module.cicleFormatiu || ""],
    ["Codi mòdul", `${module.codiModul || ""} - ${module.nomModul || ""}`],
    ["Hores centre", module.horesCentre || 0],
    ["Hores empresa", module.horesEmpresa || 0],
    ["Total hores", module.totalHores || 0],
    ["Professorat", module.professorat || ""]
  ];
  const wsDades = XLSX.utils.aoa_to_sheet(dadesRows);
  XLSX.utils.book_append_sheet(wb, wsDades, "Dades");

  // 2. Objectius sheet
  const objRows = [
    ["Id Objectiu", "Text de l'objectiu"],
    ...(module.objectius || []).map(o => [
      o.codi || "",
      o.text || ""
    ])
  ];
  const wsObj = XLSX.utils.aoa_to_sheet(objRows);
  XLSX.utils.book_append_sheet(wb, wsObj, "Objectius");

  // 3. RAs sheet
  const raRows = [
    ["Id. Resultats aprenentatge", "Text", "Ponderació (%)", "Data inici", "Data final"],
    ...(module.ras || []).map(ra => [
      ra.codi || "",
      ra.text || "",
      ra.ponderacio !== undefined ? `${ra.ponderacio}` : "",
      formatDateForDisplay(ra.dataInici || ""),
      formatDateForDisplay(ra.dataFinal || "")
    ])
  ];
  const wsRAs = XLSX.utils.aoa_to_sheet(raRows);
  XLSX.utils.book_append_sheet(wb, wsRAs, "RAs");

  // 4. Competències sheet
  const compRows = [
    ["Id. Competència", "Text de la competència"],
    ...(module.competencies || []).map(c => [
      c.codi || "",
      c.text || ""
    ])
  ];
  const wsComp = XLSX.utils.aoa_to_sheet(compRows);
  XLSX.utils.book_append_sheet(wb, wsComp, "Competències");

  // 5. Avaluació sheet
  const primLines = (module.avaluacioPrimera || "").split("\n").map(l => l.trim()).filter(Boolean);
  const segLines = (module.avaluacioSegona || "").split("\n").map(l => l.trim()).filter(Boolean);
  const maxLines = Math.max(primLines.length, segLines.length);

  const evalRows = [
    ["Primera convocatòria", "Segona convocatòria"]
  ];
  for (let i = 0; i < maxLines; i++) {
    evalRows.push([primLines[i] || "", segLines[i] || ""]);
  }
  // Fallback to avoid empty sheet
  if (evalRows.length === 1) {
    evalRows.push(["", ""]);
  }

  const wsEval = XLSX.utils.aoa_to_sheet(evalRows);
  XLSX.utils.book_append_sheet(wb, wsEval, "Avaluació");

  // 6. Metodologia sheet
  const metRows = [
    ["Informació metodologia"],
    ...(module.metodologia || []).map(row => [row.text || ""])
  ];
  const wsMet = XLSX.utils.aoa_to_sheet(metRows);
  XLSX.utils.book_append_sheet(wb, wsMet, "Metodologia");

  // 7. Activitats sheet
  const actRows = [
    ["Informació activitats"],
    ...(module.activitats || []).map(row => [row.text || ""])
  ];
  const wsAct = XLSX.utils.aoa_to_sheet(actRows);
  XLSX.utils.book_append_sheet(wb, wsAct, "Activitats");

  // 8. Sortides sheet
  const sortRows = [
    ["Informació sortides"],
    ...(module.sortides || []).map(row => [row.text || ""])
  ];
  const wsSort = XLSX.utils.aoa_to_sheet(sortRows);
  XLSX.utils.book_append_sheet(wb, wsSort, "Sortides");

  // 9. Espaisrecursos sheet
  const erRows = [
    ["Informació espai i recursos"],
    ...(module.espaisrecursos || []).map(row => [row.text || ""])
  ];
  const wsER = XLSX.utils.aoa_to_sheet(erRows);
  XLSX.utils.book_append_sheet(wb, wsER, "Espaisrecursos");

  // 10. Bibliografia sheet
  const bibRows = [
    ["Informació bibliografia"],
    ...(module.bibliografia || []).map(row => [row.text || ""])
  ];
  const wsBib = XLSX.utils.aoa_to_sheet(bibRows);
  XLSX.utils.book_append_sheet(wb, wsBib, "Bibliografia");

  // Set nice column widths
  wsDades["!cols"] = [{ wch: 30 }, { wch: 60 }];
  wsObj["!cols"] = [{ wch: 20 }, { wch: 80 }];
  wsRAs["!cols"] = [{ wch: 25 }, { wch: 60 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];
  wsComp["!cols"] = [{ wch: 20 }, { wch: 80 }];
  wsEval["!cols"] = [{ wch: 60 }, { wch: 60 }];
  wsMet["!cols"] = [{ wch: 100 }];
  wsAct["!cols"] = [{ wch: 100 }];
  wsSort["!cols"] = [{ wch: 100 }];
  wsER["!cols"] = [{ wch: 100 }];
  wsBib["!cols"] = [{ wch: 100 }];

  // File Name Formulation
  interface ModuleMapping {
    year: number;
    acronym: string;
  }

  const CYCLE_MAPS: Record<string, { prefix: string; modules: Record<string, ModuleMapping> }> = {
    ac: {
      prefix: "ACO",
      modules: {
        "0156": { year: 1, acronym: "ANG" },
        "1227": { year: 1, acronym: "GP" },
        "1228": { year: 1, acronym: "TM" },
        "1229": { year: 1, acronym: "GC" },
        "1231": { year: 1, acronym: "DPV" },
        "1233": { year: 1, acronym: "API" },
        "1234": { year: 1, acronym: "SAC" },
        "1235": { year: 1, acronym: "CE" },
        "1664": { year: 1, acronym: "DIG" },
        "1708": { year: 1, acronym: "SOS" },
        "1709": { year: 1, acronym: "IPOI" },
        "C056": { year: 1, acronym: "CAT" },
        "1226": { year: 2, acronym: "MAC" },
        "1230": { year: 2, acronym: "VT" },
        "1232": { year: 2, acronym: "PV" },
        "1710": { year: 2, acronym: "IPOII" },
        "1713": { year: 2, acronym: "SIN" },
        "OP":   { year: 2, acronym: "OP" }
      }
    },
    til: {
      prefix: "TIL",
      modules: {
        "0179": { year: 1, acronym: "ANG" },
        "0621": { year: 1, acronym: "GAT" },
        "0622": { year: 1, acronym: "TIM" },
        "0623": { year: 1, acronym: "GE" },
        "0625": { year: 1, acronym: "LEM" },
        "0626": { year: 1, acronym: "LAP" },
        "0627": { year: 1, acronym: "GAC" },
        "1665": { year: 1, acronym: "DIG" },
        "1708": { year: 1, acronym: "SOS" },
        "1709": { year: 1, acronym: "IPOI" },
        "C003": { year: 1, acronym: "FR" },
        "0624": { year: 2, acronym: "CTL" },
        "0628": { year: 2, acronym: "OTV" },
        "0629": { year: 2, acronym: "OTM" },
        "0630": { year: 2, acronym: "PRO" },
        "1710": { year: 2, acronym: "IPOII" },
        "C022": { year: 2, acronym: "OAS" },
        "OP1":  { year: 2, acronym: "OP1" },
        "OP2":  { year: 2, acronym: "OP2" }
      }
    },
    ci: {
      prefix: "CI",
      modules: {
        "0179": { year: 1, acronym: "ANG" },
        "0622": { year: 1, acronym: "TIM" },
        "0623": { year: 1, acronym: "GE" },
        "0625": { year: 1, acronym: "LEM" },
        "0627": { year: 1, acronym: "GAC" },
        "0823": { year: 1, acronym: "MKI" },
        "0827": { year: 1, acronym: "CDI" },
        "1665": { year: 1, acronym: "DIG" },
        "1708": { year: 1, acronym: "SOS" },
        "1709": { year: 1, acronym: "IPOI" },
        "C001": { year: 1, acronym: "FR" },
        "0822": { year: 2, acronym: "SIM" },
        "0824": { year: 2, acronym: "NI" },
        "0825": { year: 2, acronym: "FI" },
        "0826": { year: 2, acronym: "MPI" },
        "0828": { year: 2, acronym: "PRO" },
        "1710": { year: 2, acronym: "IPOII" },
        "OP1":  { year: 2, acronym: "OP1" },
        "OP2":  { year: 2, acronym: "OP2" }
      }
    },
    mip: {
      prefix: "MIP",
      modules: {
        "0179": { year: 1, acronym: "ANG" },
        "0623": { year: 1, acronym: "GE" },
        "0930": { year: 1, acronym: "PMK" },
        "0931": { year: 1, acronym: "MKD" },
        "1007": { year: 1, acronym: "DMC" },
        "1010": { year: 1, acronym: "IC" },
        "1110": { year: 1, acronym: "AC" },
        "1665": { year: 1, acronym: "DIG" },
        "1708": { year: 1, acronym: "SOS" },
        "1709": { year: 1, acronym: "IPOI" },
        "C076": { year: 1, acronym: "CAT" },
        "1009": { year: 2, acronym: "RP" },
        "1008": { year: 2, acronym: "MSC" },
        "1011": { year: 2, acronym: "TC" },
        "1012": { year: 2, acronym: "PRO" },
        "1109": { year: 2, acronym: "LLP" },
        "1710": { year: 2, acronym: "IPOII" },
        "OP":   { year: 2, acronym: "OP" }
      }
    },
    gvec: {
      prefix: "GVEC",
      modules: {
        "0179": { year: 1, acronym: "ANG" },
        "0623": { year: 1, acronym: "GE" },
        "0927": { year: 1, acronym: "GP" },
        "0928": { year: 1, acronym: "OEV" },
        "0930": { year: 1, acronym: "PMK" },
        "0931": { year: 1, acronym: "MKD" },
        "1010": { year: 1, acronym: "IC" },
        "1665": { year: 1, acronym: "DIG" },
        "1708": { year: 1, acronym: "SOS" },
        "1709": { year: 1, acronym: "IPOI" },
        "C076": { year: 1, acronym: "CAT" },
        "0625": { year: 2, acronym: "LE" },
        "0626": { year: 2, acronym: "LAP" },
        "0926": { year: 2, acronym: "AP" },
        "0929": { year: 2, acronym: "TVN" },
        "0932": { year: 2, acronym: "PRO" },
        "1710": { year: 2, acronym: "IPOII" },
        "OP":   { year: 2, acronym: "OP" }
      }
    }
  };

  const cFormatiu = (module.cicleFormatiu || "").toLowerCase();
  let cycleKey = "";
  if (cFormatiu.includes("comercial") || cFormatiu.includes("activitats")) {
    cycleKey = "ac";
  } else if (cFormatiu.includes("transport") || cFormatiu.includes("logíst")) {
    cycleKey = "til";
  } else if (cFormatiu.includes("internacional")) {
    cycleKey = "ci";
  } else if (cFormatiu.includes("màrqueting") || cFormatiu.includes("publicitat") || cFormatiu.includes("marketing")) {
    cycleKey = "mip";
  } else if (cFormatiu.includes("vendes") || cFormatiu.includes("espais") || cFormatiu.includes("gvec")) {
    cycleKey = "gvec";
  }

  const rawCodi = (module.codiModul || "").trim();
  const codeMatch = rawCodi.match(/^[A-Z0-9]+/i);
  const cleanCode = codeMatch ? codeMatch[0].toUpperCase() : rawCodi.toUpperCase().replace(/[^A-Z0-9]/g, "");

  let groupYear = "";
  let subjectAcronym = "";

  if (cycleKey && CYCLE_MAPS[cycleKey]) {
    const cfg = CYCLE_MAPS[cycleKey];
    const mapped = cfg.modules[cleanCode];
    if (mapped) {
      groupYear = `${cfg.prefix}${mapped.year}`;
      subjectAcronym = mapped.acronym;
    } else {
      groupYear = `${cfg.prefix}1`; // default to year 1
    }
  }

  // Fallback for acronym extraction if not mapped
  if (!subjectAcronym) {
    const parenMatch = (module.nomModul || "").match(/\(([A-Z0-9]{2,5})\)\s*$/i);
    if (parenMatch) {
      subjectAcronym = parenMatch[1].toUpperCase();
    } else {
      const words = (module.nomModul || "")
        .replace(/[^A-Za-z0-9À-ÿ\s]/g, "")
        .split(/\s+/);
      const ignored = ["de", "del", "la", "el", "els", "les", "d'", "i", "a", "en", "per", "al", "als"];
      const initials = words
        .filter(w => w && !ignored.includes(w.toLowerCase()))
        .map(w => w.charAt(0).toUpperCase())
        .join("")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^A-Z0-9]/g, "");
      subjectAcronym = initials.slice(0, 4) || "MOD";
    }
  }

  // Fallback for groupYear if not mapped
  if (!groupYear) {
    let cycleAbbr = "";
    const words = (module.cicleFormatiu || "")
      .replace(/CFGS|CFGM/gi, "")
      .trim()
      .split(/\s+/);
    const ignored = ["de", "del", "la", "el", "els", "les", "d'"];
    const filteredWords = words.filter(w => w && !ignored.includes(w.toLowerCase()));
    filteredWords.forEach(w => {
      if (w.toLowerCase() === "i") {
        cycleAbbr += "I";
      } else {
        const firstChar = w.charAt(0).toUpperCase();
        if (/[A-ZÀ-ÿ]/i.test(firstChar)) {
          cycleAbbr += firstChar;
        }
      }
    });
    cycleAbbr = cycleAbbr
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "");

    const digitMatch = (module.cicleFormatiu || "").match(/\d+/);
    if (digitMatch) {
      cycleAbbr += digitMatch[0];
    } else if (cycleAbbr && !/\d+$/.test(cycleAbbr)) {
      cycleAbbr += "1";
    }
    if (!cycleAbbr) {
      cycleAbbr = "MOD";
    }
    groupYear = `${cycleAbbr}1`;
  }

  const code = cleanCode || "0000";
  const fileName = `${groupYear}-${code}-${subjectAcronym}.xlsx`;

  // Trigger SheetJS file download
  XLSX.writeFile(wb, fileName);
}
