import React, { useState } from "react";
import { ModulePresentation } from "../types";
import {
  FileSpreadsheet,
  Printer,
  Award,
  BookOpen,
  Clock,
  Calendar,
  GraduationCap,
  ListTodo,
  Sparkles,
  Layers,
  FileText,
  MapPin,
  Laptop,
  BookMarked,
  User
} from "lucide-react";

interface ModulePreviewProps {
  module: ModulePresentation;
  onExportCSV: () => void;
  modules?: ModulePresentation[];
  selectedId?: string | null;
  onSelect?: (id: string) => void;
}

const formatDateForDisplay = (dateStr: string): string => {
  if (!dateStr) return "-";
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

type TabKey = 
  | "dades" 
  | "objectius" 
  | "ras" 
  | "competencies" 
  | "avaluacio" 
  | "metodologia" 
  | "activitats" 
  | "sortides" 
  | "espais" 
  | "bibliografia";

export default function ModulePreview({ 
  module, 
  onExportCSV,
  modules = [],
  selectedId = null,
  onSelect
}: ModulePreviewProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("dades");

  const handlePrint = () => {
    window.print();
  };

  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "dades", label: "1. Dades", icon: <GraduationCap className="w-4 h-4" /> },
    { key: "objectius", label: "2. Objectius", icon: <ListTodo className="w-4 h-4" /> },
    { key: "ras", label: "3. RAs", icon: <Sparkles className="w-4 h-4" /> },
    { key: "competencies", label: "4. Competències", icon: <Award className="w-4 h-4" /> },
    { key: "avaluacio", label: "5. Avaluació", icon: <FileText className="w-4 h-4" /> },
    { key: "metodologia", label: "6. Metodologia", icon: <BookOpen className="w-4 h-4" /> },
    { key: "activitats", label: "7. Activitats", icon: <Layers className="w-4 h-4" /> },
    { key: "sortides", label: "8. Sortides", icon: <MapPin className="w-4 h-4" /> },
    { key: "espais", label: "9. Espais i Recursos", icon: <Laptop className="w-4 h-4" /> },
    { key: "bibliografia", label: "10. Bibliografia", icon: <BookMarked className="w-4 h-4" /> },
  ];

  return (
    <div id="module-preview-card" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden flex flex-col h-full font-sans">
      
      {/* Header Actions */}
      <div className="no-print p-4 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          {modules.length > 0 && onSelect && (
            <div className="flex items-center gap-2">
              <label htmlFor="preview-module-select" className="text-xs font-bold text-slate-500 whitespace-nowrap">Mòdul actiu:</label>
              <select
                id="preview-module-select"
                value={selectedId || module.id}
                onChange={(e) => onSelect(e.target.value)}
                className="py-1 px-3 bg-white border border-slate-200 rounded-lg text-xs font-semibold focus:outline-none focus:border-[#0052cc] text-slate-700"
              >
                {modules.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.codiModul || "MXX"} - {m.nomModul}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="flex gap-2 w-full sm:w-auto justify-end">
          <button
            id="btn-print-preview"
            onClick={handlePrint}
            className="py-1.5 px-3 bg-slate-800 hover:bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Imprimeix / PDF</span>
          </button>
          
          <button
            id="btn-export-csv-preview"
            onClick={onExportCSV}
            className="py-1.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Exporta a Excel</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden min-h-[500px]">
        
        {/* Navigation Sidebar (tabs) */}
        <div className="no-print w-full md:w-64 bg-slate-50/50 border-r border-slate-100 p-3 space-y-1 flex md:flex-col overflow-x-auto md:overflow-y-auto whitespace-nowrap md:whitespace-normal shrink-0">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 mb-2 hidden md:block">
            Pestanyes oficials Excel
          </div>
          {tabs.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`w-full text-left py-2 px-3 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#0052cc] text-white shadow-xs"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content Area */}
        <div id="printable-area" className="flex-1 p-6 md:p-8 overflow-y-auto print:p-0 print:overflow-visible bg-white">
          
          {/* Header block for Printable layout */}
          <div className="hidden print:flex flex-col gap-2 pb-6 mb-6 border-b border-slate-200">
            <span className="text-xs font-bold text-slate-400 tracking-wider">PROGRAMACIÓ OFICIAL DE MÒDUL PROFESSIONAL</span>
            <h1 className="text-xl font-bold text-slate-900">
              {module.codiModul} - {module.nomModul}
            </h1>
            <p className="text-xs text-slate-600 font-medium">
              {module.cicleFormatiu} • {module.familiaProfessional} ({module.departament})
            </p>
          </div>

          {/* Active Tab rendering */}
          
          {/* 1. DADES */}
          {activeTab === "dades" && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-[#0052cc]" />
                  <span>Informació General del Mòdul (Pestanya 1)</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Cicle Formatiu</span>
                    <span className="text-sm font-semibold text-slate-800">{module.cicleFormatiu || "N/A"}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Família Professional</span>
                    <span className="text-sm font-semibold text-slate-800">{module.familiaProfessional || "N/A"}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Departament</span>
                    <span className="text-sm font-semibold text-slate-800">{module.departament || "N/A"}</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Mòdul Professional</span>
                    <span className="text-sm font-bold text-[#0052cc]">{module.codiModul || "N/A"} - {module.nomModul || "N/A"}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border-t border-slate-100 pt-6">
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-center">
                  <Clock className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Hores Centre</span>
                  <span className="text-lg font-mono font-bold text-slate-800">{module.horesCentre || 0} h</span>
                </div>
                <div className="bg-slate-50/70 p-4 rounded-xl border border-slate-100 text-center">
                  <Clock className="w-5 h-5 text-slate-400 mx-auto mb-1.5" />
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Hores Empresa</span>
                  <span className="text-lg font-mono font-bold text-slate-800">{module.horesEmpresa || 0} h</span>
                </div>
                <div className="bg-[#0052cc]/5 p-4 rounded-xl border border-[#0052cc]/10 text-center">
                  <Clock className="w-5 h-5 text-[#0052cc] mx-auto mb-1.5" />
                  <span className="text-[10px] uppercase font-bold text-[#0052cc]/70 block">Total Hores</span>
                  <span className="text-lg font-mono font-extrabold text-[#0052cc]">{module.totalHores || 0} h</span>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                <User className="w-5 h-5 text-slate-400" />
                <div className="flex-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Professorat assignat</span>
                  <span className="text-sm font-semibold text-slate-800">{module.professorat || "Docent sense assignar"}</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. OBJECTIUS */}
          {activeTab === "objectius" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-[#0052cc]" />
                <span>Objectius Generals del Mòdul (Pestanya 2)</span>
              </h3>

              {module.objectius && module.objectius.length > 0 ? (
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4 w-28 text-center border-r border-slate-200">Id Objectiu</th>
                        <th className="py-3 px-4">Text de l'objectiu</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {module.objectius.map((obj) => (
                        <tr key={obj.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-3 px-4 text-center font-bold text-[#0052cc] font-mono border-r border-slate-100">
                            {obj.codi || "-"}
                          </td>
                          <td className="py-3 px-4 leading-relaxed text-slate-700 font-normal">
                            {obj.text}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No hi ha cap objectiu registrat per a aquest mòdul.
                </div>
              )}
            </div>
          )}

          {/* 3. RAs */}
          {activeTab === "ras" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#0052cc]" />
                <span>Resultats d'Aprenentatge (Pestanya 3)</span>
              </h3>

              {module.ras && module.ras.length > 0 ? (
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4 w-20 text-center border-r border-slate-200">Id RA</th>
                        <th className="py-3 px-4">Text del Resultat d'Aprenentatge</th>
                        <th className="py-3 px-4 w-24 text-center border-l border-slate-200">Ponderació</th>
                        <th className="py-3 px-4 w-28 text-center border-l border-slate-100">Data Inici</th>
                        <th className="py-3 px-4 w-28 text-center border-l border-slate-100">Data Final</th>
                        <th className="py-3 px-4 w-24 text-center border-l border-slate-100">% Curs</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {module.ras.map((ra) => (
                        <tr key={ra.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-3.5 px-4 text-center font-bold text-[#0052cc] font-mono border-r border-slate-100">
                            {ra.codi || "-"}
                          </td>
                          <td className="py-3.5 px-4 leading-relaxed text-slate-700 font-normal">
                            {ra.text}
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold text-slate-800 font-mono border-l border-slate-100">
                            {ra.ponderacio}%
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-600 font-mono border-l border-slate-100">
                            <span className="block">{formatDateForDisplay(ra.dataInici)}</span>
                            <span className="inline-block mt-0.5 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-sans font-bold">
                              Setmana {getWeekNumFromDate(ra.dataInici) || 1}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center text-slate-600 font-mono border-l border-slate-100">
                            <span className="block">{formatDateForDisplay(ra.dataFinal)}</span>
                            <span className="inline-block mt-0.5 text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded font-sans font-bold">
                              Setmana {getWeekNumFromDate(ra.dataFinal) || 33}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-center border-l border-slate-100 font-mono">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-100">
                              {calculateCoursePercentage(ra.dataInici, ra.dataFinal)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No hi ha cap Resultat d'Aprenentatge registrat per a aquest mòdul.
                </div>
              )}
            </div>
          )}

          {/* 4. COMPETÈNCIES */}
          {activeTab === "competencies" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#0052cc]" />
                <span>Competències Professionals (Pestanya 4)</span>
              </h3>

              {module.competencies && module.competencies.length > 0 ? (
                <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                  <table className="w-full text-left text-xs sm:text-sm border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[11px]">
                        <th className="py-3 px-4 w-28 text-center border-r border-slate-200">Id Competència</th>
                        <th className="py-3 px-4">Text de la competència</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                      {module.competencies.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50/40 transition-colors">
                          <td className="py-3 px-4 text-center font-bold text-[#0052cc] font-mono border-r border-slate-100">
                            {c.codi || "-"}
                          </td>
                          <td className="py-3 px-4 leading-relaxed text-slate-700 font-normal">
                            {c.text}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No hi ha cap competència registrada per a aquest mòdul.
                </div>
              )}
            </div>
          )}

          {/* 5. AVALUACIÓ */}
          {activeTab === "avaluacio" && (
            <div className="space-y-6">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#0052cc]" />
                <span>Criteris i Condicions d'Avaluació (Pestanya 5)</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100/50 text-blue-700 text-xs font-bold rounded-lg uppercase tracking-wider">
                    Primera Convocatòria (Avaluació contínua)
                  </div>
                  <div className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-wrap bg-white p-4 rounded-xl border border-slate-100 min-h-[160px]">
                    {module.avaluacioPrimera || "No s'han definit condicions per a la primera convocatòria."}
                  </div>
                </div>

                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/50 space-y-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100/50 text-indigo-700 text-xs font-bold rounded-lg uppercase tracking-wider">
                    Segona Convocatòria (Recuperació extraordinària)
                  </div>
                  <div className="text-sm text-slate-700 leading-relaxed font-normal whitespace-pre-wrap bg-white p-4 rounded-xl border border-slate-100 min-h-[160px]">
                    {module.avaluacioSegona || "No s'han definit condicions per a la segona convocatòria."}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. METODOLOGIA */}
          {activeTab === "metodologia" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-[#0052cc]" />
                <span>Metodologia Didàctica (Pestanya 6)</span>
              </h3>

              {module.metodologia && module.metodologia.length > 0 ? (
                <div className="space-y-2">
                  {module.metodologia.map((row, idx) => (
                    <div key={row.id || idx} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-slate-700 font-normal leading-relaxed">
                      {row.text}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No s'ha registrat cap línia d'informació de metodologia.
                </div>
              )}
            </div>
          )}

          {/* 7. ACTIVITATS */}
          {activeTab === "activitats" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-[#0052cc]" />
                <span>Activitats i Unitats de Treball (Pestanya 7)</span>
              </h3>

              {module.activitats && module.activitats.length > 0 ? (
                <div className="space-y-2">
                  {module.activitats.map((row, idx) => (
                    <div key={row.id || idx} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-slate-700 font-normal leading-relaxed">
                      {row.text}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No s'ha registrat cap línia d'informació d'activitats.
                </div>
              )}
            </div>
          )}

          {/* 8. SORTIDES */}
          {activeTab === "sortides" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0052cc]" />
                <span>Sortides Previstes (Pestanya 8)</span>
              </h3>

              {module.sortides && module.sortides.length > 0 ? (
                <div className="space-y-2">
                  {module.sortides.map((row, idx) => (
                    <div key={row.id || idx} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-slate-700 font-normal leading-relaxed">
                      {row.text}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No s'ha registrat cap línia d'informació de sortides.
                </div>
              )}
            </div>
          )}

          {/* 9. ESPAIS I RECURSOS */}
          {activeTab === "espais" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-[#0052cc]" />
                <span>Espais i Recursos Materials (Pestanya 9)</span>
              </h3>

              {module.espaisrecursos && module.espaisrecursos.length > 0 ? (
                <div className="space-y-2">
                  {module.espaisrecursos.map((row, idx) => (
                    <div key={row.id || idx} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-slate-700 font-normal leading-relaxed">
                      {row.text}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No s'ha registrat cap línia d'informació d'espais i recursos.
                </div>
              )}
            </div>
          )}

          {/* 10. BIBLIOGRAFIA */}
          {activeTab === "bibliografia" && (
            <div className="space-y-4">
              <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-[#0052cc]" />
                <span>Bibliografia i Programari recomanat (Pestanya 10)</span>
              </h3>

              {module.bibliografia && module.bibliografia.length > 0 ? (
                <div className="space-y-2">
                  {module.bibliografia.map((row, idx) => (
                    <div key={row.id || idx} className="p-3 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-slate-700 font-normal leading-relaxed">
                      {row.text}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 border border-dashed border-slate-200 rounded-xl">
                  No s'ha registrat cap línia d'informació de bibliografia.
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
