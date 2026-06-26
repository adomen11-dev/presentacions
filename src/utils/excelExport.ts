import * as XLSX from "xlsx";
import { ModulePresentation } from "../types";

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
      ra.dataInici || "",
      ra.dataFinal || ""
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
