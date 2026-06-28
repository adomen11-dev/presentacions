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

interface WeekInfo {
  num: number;
  label: string;
  start: string;
  end: string;
  isHoliday: boolean;
}

const COURSE_WEEKS: WeekInfo[] = [
  { num: 1, label: "Setmana 1", start: "2026-09-10", end: "2026-09-11", isHoliday: false },
  { num: 2, label: "Setmana 2", start: "2026-09-14", end: "2026-09-18", isHoliday: false },
  { num: 3, label: "Setmana 3", start: "2026-09-21", end: "2026-09-25", isHoliday: false },
  { num: 4, label: "Setmana 4", start: "2026-09-28", end: "2026-10-02", isHoliday: false },
  { num: 5, label: "Setmana 5", start: "2026-10-05", end: "2026-10-09", isHoliday: false },
  { num: 6, label: "Setmana 6", start: "2026-10-12", end: "2026-10-16", isHoliday: false },
  { num: 7, label: "Setmana 7", start: "2026-10-19", end: "2026-10-23", isHoliday: false },
  { num: 8, label: "Setmana 8", start: "2026-10-26", end: "2026-10-30", isHoliday: false },
  { num: 9, label: "Setmana 9", start: "2026-11-02", end: "2026-11-06", isHoliday: false },
  { num: 10, label: "Setmana 10", start: "2026-11-09", end: "2026-11-13", isHoliday: false },
  { num: 11, label: "Setmana 11", start: "2026-11-16", end: "2026-11-20", isHoliday: false },
  { num: 12, label: "Setmana 12", start: "2026-11-23", end: "2026-11-27", isHoliday: false },
  { num: 13, label: "Setmana 13", start: "2026-11-30", end: "2026-12-04", isHoliday: false },
  { num: 14, label: "Setmana 14", start: "2026-12-07", end: "2026-12-11", isHoliday: false },
  { num: 15, label: "Setmana 15", start: "2026-12-14", end: "2026-12-18", isHoliday: false },
  { num: 16, label: "Setmana 16", start: "2026-12-21", end: "2026-12-25", isHoliday: false },
  { num: 0, label: "Vacances Nadal", start: "2026-12-28", end: "2027-01-08", isHoliday: true },
  { num: 17, label: "Setmana 17", start: "2027-01-11", end: "2027-01-15", isHoliday: false },
  { num: 18, label: "Setmana 18", start: "2027-01-18", end: "2027-01-22", isHoliday: false },
  { num: 19, label: "Setmana 19", start: "2027-01-25", end: "2027-01-29", isHoliday: false },
  { num: 20, label: "Setmana 20", start: "2027-02-01", end: "2027-02-05", isHoliday: false },
  { num: 21, label: "Setmana 21", start: "2027-02-08", end: "2027-02-12", isHoliday: false },
  { num: 22, label: "Setmana 22", start: "2027-02-15", end: "2027-02-19", isHoliday: false },
  { num: 23, label: "Setmana 23", start: "2027-02-22", end: "2027-02-26", isHoliday: false },
  { num: 24, label: "Setmana 24", start: "2027-03-01", end: "2027-03-05", isHoliday: false },
  { num: 25, label: "Setmana 25", start: "2027-03-08", end: "2027-03-12", isHoliday: false },
  { num: 26, label: "Setmana 26", start: "2027-03-15", end: "2027-03-19", isHoliday: false },
  { num: 0, label: "Vacances Setmana Santa", start: "2027-03-22", end: "2027-03-26", isHoliday: true },
  { num: 27, label: "Setmana 27", start: "2027-03-29", end: "2027-04-02", isHoliday: false },
  { num: 28, label: "Setmana 28", start: "2027-04-05", end: "2027-04-09", isHoliday: false },
  { num: 29, label: "Setmana 29", start: "2027-04-12", end: "2027-04-16", isHoliday: false },
  { num: 30, label: "Setmana 30", start: "2027-04-19", end: "2027-04-23", isHoliday: false },
  { num: 31, label: "Setmana 31", start: "2027-04-26", end: "2027-04-30", isHoliday: false },
  { num: 32, label: "Setmana 32", start: "2027-05-03", end: "2027-05-07", isHoliday: false },
  { num: 33, label: "Setmana 33", start: "2027-05-10", end: "2027-05-14", isHoliday: false }
];

const getWeekNumFromDate = (dateStr: string): number => {
  if (!dateStr) return 1;
  const cleanDate = dateStr.split('T')[0];
  for (const w of COURSE_WEEKS) {
    if (cleanDate >= w.start && cleanDate <= w.end) {
      return w.num;
    }
  }
  let closestWeek = COURSE_WEEKS.find(w => !w.isHoliday) || COURSE_WEEKS[0];
  let minDiff = Infinity;
  const targetTime = new Date(cleanDate).getTime();
  for (const w of COURSE_WEEKS) {
    if (w.isHoliday) continue;
    const startDiff = Math.abs(new Date(w.start).getTime() - targetTime);
    if (startDiff < minDiff) {
      minDiff = startDiff;
      closestWeek = w;
    }
  }
  return closestWeek.num;
};

const calculateCoursePercentage = (dataInici: string, dataFinal: string): string => {
  let startW = getWeekNumFromDate(dataInici || "2026-09-10");
  let endW = getWeekNumFromDate(dataFinal || "2027-05-14");
  
  if (startW === 0) {
    const cleanDate = (dataInici || "2026-09-10").split('T')[0];
    startW = cleanDate <= "2027-01-03" ? 16 : 17;
  }
  if (endW === 0) {
    const cleanDate = (dataFinal || "2027-05-14").split('T')[0];
    endW = cleanDate <= "2027-01-03" ? 16 : 17;
  }
  
  const span = Math.max(1, endW - startW + 1);
  const percentage = (span / 33) * 100;
  return percentage.toFixed(0) + "%";
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
    ["Id. Resultats aprenentatge", "Text", "Ponderació (%)", "Data inici", "Data final", "Setmana Inici", "Setmana Final", "% Curs"],
    ...(module.ras || []).map(ra => [
      ra.codi || "",
      ra.text || "",
      ra.ponderacio !== undefined ? `${ra.ponderacio}` : "",
      formatDateForDisplay(ra.dataInici || ""),
      formatDateForDisplay(ra.dataFinal || ""),
      getWeekNumFromDate(ra.dataInici || "2026-09-10") || 1,
      getWeekNumFromDate(ra.dataFinal || "2027-05-14") || 33,
      calculateCoursePercentage(ra.dataInici, ra.dataFinal)
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
  const safeCodi = (module.codiModul || "MODUL").replace(/[^a-z0-9]/gi, "_").toUpperCase();
  const safeName = (module.nomModul || "Presentacio").replace(/[^a-z0-9]/gi, "_").toLowerCase();
  const fileName = `Programacio_${safeCodi}_${safeName}.xlsx`;

  // Trigger SheetJS file download
  XLSX.writeFile(wb, fileName);
}
