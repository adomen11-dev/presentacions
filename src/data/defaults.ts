import { ModulePresentation } from "../types";

export interface CycleTemplate {
  name: string;
  family: string;
  department: string;
}

export const CICLES_TEMPLATES: CycleTemplate[] = [
  {
    name: "CFGM Activitats Comercials",
    family: "Comerç i Màrqueting",
    department: "Comerç i Màrqueting",
  },
  {
    name: "CFGS Transport i Logística",
    family: "Comerç i Màrqueting",
    department: "Comerç i Màrqueting",
  },
  {
    name: "CFGS Comerç Internacional",
    family: "Comerç i Màrqueting",
    department: "Comerç i Màrqueting",
  },
  {
    name: "CFGS Màrqueting i Publicitat",
    family: "Comerç i Màrqueting",
    department: "Comerç i Màrqueting",
  },
  {
    name: "CFGS Gestió de Vendes i Espais Comercials",
    family: "Comerç i Màrqueting",
    department: "Comerç i Màrqueting",
  },
];

export interface ModuleTemplate {
  cicle: string;
  codiModul: string;
  nomModul: string;
  horesCentre: number;
  horesEmpresa: number;
  unitatsFormatives: { nom: string; hores: number }[];
  descripcio?: string;
}

export const MODULE_TEMPLATES: ModuleTemplate[] = [
  // ==================== CFGM ACTIVITATS COMERCIALS (AC) ====================
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1226",
    nomModul: "Màrqueting en l’activitat comercial",
    horesCentre: 99,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Màrqueting mix i consumidor", hores: 50 },
      { nom: "UF2: Recerca comercial básica", hores: 49 },
    ],
    descripcio: "Executar les accions de màrqueting definides per l'organització comercial, identificant les necessitats de productes dels clients.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1227",
    nomModul: "Gestió d’un petit comerç",
    horesCentre: 99,
    horesEmpresa: 86,
    unitatsFormatives: [
      { nom: "UF1: Constitució i viabilitat del negoci", hores: 50 },
      { nom: "UF2: Gestió administrativa i tresoreria", hores: 49 },
    ],
    descripcio: "Realitzar projectes de viabilitat i posada en marxa per compte propi d'un petit negoci comercial al detall, administrant-lo eficaçment.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1228",
    nomModul: "Tècniques de magatzem",
    horesCentre: 66,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Organització i recepció", hores: 33 },
      { nom: "UF2: Valoració i inventaris", hores: 33 },
    ],
    descripcio: "Organitzar les operacions d'emmagatzematge de mercaderies en condicions que en garanteixin la conservació i l'optimització de recursos.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1229",
    nomModul: "Gestió de compres",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Selecció de proveïdors i negociació", hores: 33 },
      { nom: "UF2: Control d'aprovisionament i estocs", hores: 33 },
    ],
    descripcio: "Garantir l'aprovisionament del petit negoci, preveient les necessitats de compra per mantener el nivell de servei requerit.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1230",
    nomModul: "Venda tècnica",
    horesCentre: 99,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Argumentari de vendes i negociació", hores: 50 },
      { nom: "UF2: Tancament i atenció postvenda", hores: 49 },
    ],
    descripcio: "Realitzar la venda de productes i/o serveis de manera especialitzada a través de diferents canals comercials, adaptant-se a cada client.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1231",
    nomModul: "Dinamització del punt de venda",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Marxandatge visual i animació lineal", hores: 50 },
      { nom: "UF2: Disseny d'espais i aparadorisme", hores: 49 },
    ],
    descripcio: "Realitzar activitats d'animació i marxandatge del punt de venda per optimitzar el rendiment del lineal i transmetre una bona imatge.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1232",
    nomModul: "Processos de venda",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Atenció i assessorament de vendes", hores: 50 },
      { nom: "UF2: Tècniques de facturació i caixa", hores: 49 },
    ],
    descripcio: "Atendre al client amb excel·lència i realitzar tots els processos tècnics, operatius i administratius lligats a la transacció.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1233",
    nomModul: "Aplicacions informàtiques per al comerç",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Ofimàtica, fulls de càlcul i bases de dades", hores: 50 },
      { nom: "UF2: Programari de TPV i gestió comercial", hores: 49 },
    ],
    descripcio: "Realitzar la gestió comercial i administrativa mitjançant maquinari i programari específic per automatitzar les tasques de botiga.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1234",
    nomModul: "Serveis d’atenció comercial",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Protocols d'atenció i relació amb clients", hores: 33 },
      { nom: "UF2: Gestió de queixes i fidelització comercial", hores: 33 },
    ],
    descripcio: "Gestionar el servei de reclamacions i atenció, assegurant el nivell de satisfacció plena de l'usuari i la bona reputació de l'empresa.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1235",
    nomModul: "Comerç electrònic",
    horesCentre: 66,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Creació i gestió de botiga en línia", hores: 33 },
      { nom: "UF2: Promoció digital i xarxes de venda", hores: 33 },
    ],
    descripcio: "Planificar i desenvolupar accions de comerç electrònic i màrqueting digital per expandir les vendes a internet i plataformes socials.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "C056",
    nomModul: "Català / Aranès professional",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Comunicació professional escrita i oral", hores: 66 },
    ],
    descripcio: "Desenvolupament de capacitats comunicatives professionals adaptades al comerç, atenció al client i redacció comercial corporativa.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "0156",
    nomModul: "Anglès professional",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Anglès sectorial i atenció al client estranger", hores: 66 },
    ],
    descripcio: "Interpretar documents senzills i utilitzar fórmules de comunicació bàsiques en llengua anglesa en l'àmbit comercial.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1664",
    nomModul: "Digitalització aplicada als sectors productius",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Eines digitals col·laboratives i IA al comerç", hores: 33 },
    ],
    descripcio: "Comprensió de l'evolució tecnològica de la digitalització i l'ús correcte d'eines, gestió de dades i ciberseguretat aplicada al comerç.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1708",
    nomModul: "Sostenibilitat aplicada al sistema productiu",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Economia circular i petjada ecològica comercial", hores: 33 },
    ],
    descripcio: "Aplicar protocols i mesures preventives de sostenibilitat mediambiental, gestió de residus de l'activitat comercial i economia circular.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1709",
    nomModul: "Itinerari personal per a l'ocupabilitat I",
    horesCentre: 99,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Drets laborals, riscos i salut en botigues", hores: 99 },
    ],
    descripcio: "Coneixement del marc de drets i deures laborals, equips de treball col·laboratius i prevenció de riscos professionals.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1710",
    nomModul: "Itinerari personal per a l'ocupabilitat II",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Recerca activa d'ocupació i emprenedoria", hores: 66 },
    ],
    descripcio: "Orientació acadèmica i professional, anàlisi d'itineraris d'inserció laboral en el sector del comerç i gestió d'autoocupació.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "1713",
    nomModul: "Projecte intermodular",
    horesCentre: 198,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Disseny global del projecte d'establiment", hores: 198 },
    ],
    descripcio: "Integrar competències de disseny d'espai comercial, aprovisionament i màrqueting en la creació global d'una empresa simulada.",
  },
  {
    cicle: "CFGM Activitats Comercials",
    codiModul: "MOP5",
    nomModul: "Mòdul professional optatiu",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Contentings d'actualització comercial i marxandatge", hores: 66 },
    ],
    descripcio: "Espai formatiu d'adaptació sectorial triat pel centre per aprofundir en aspectes d'actualització comercial.",
  },

  // ==================== CFGS TRANSPORT I LOGÍSTICA (TIL) ====================
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0621",
    nomModul: "0621. Gestió administrativa del transport i la logística (GAT)",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Tramitació administrativa de serveis terrestres", hores: 50 },
      { nom: "UF2: Gestió operativa de flotes de transport", hores: 49 },
    ],
    descripcio: "Gestió i organització administrativa de les empreses de transport i logística sota les normatives de capacitat professional vigents.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0622",
    nomModul: "0622. Transport internacional de mercaderies (TIM)",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Incoterms i contractes de transport internacional", hores: 50 },
      { nom: "UF2: Operativa multimodal i duanes", hores: 49 },
    ],
    descripcio: "Gestió, contractació, anàlisi de rutes, costos i documentació dels transports internacionals multimodals.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0623",
    nomModul: "0623. Gestió econòmica i financera de l'empresa (GEF)",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Viabilitat financera i fiscalitat del transport", hores: 50 },
      { nom: "UF2: Comptabilitat de costos d'explotació i finançament", hores: 49 },
    ],
    descripcio: "Realitzar projectes de viabilitat econòmica, comptabilitat de costos, anàlisi de rutes i finançament d'inversions de flotes.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0624",
    nomModul: "0624. Comercialització del transport i la logística (CTL)",
    horesCentre: 66,
    horesEmpresa: 53,
    unitatsFormatives: [
      { nom: "UF1: Màrqueting mix dels serveis de transport", hores: 33 },
      { nom: "UF2: Contractació, vendes i negociació de serveis", hores: 33 },
    ],
    descripcio: "Organització de departaments comercials, planificació de vendes, captació, contractació de serveis logístics i negociació.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0625",
    nomModul: "0625. Logística d'emmagatzematge (LEM)",
    horesCentre: 66,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Disseny de magatzems i gestió de fluxos", hores: 33 },
      { nom: "UF2: Control d'existències, embalatge i seguretat", hores: 33 },
    ],
    descripcio: "Organitzar i supervisar les condicions d'emmagatzematge, disseny layouts, i sistemes de manipulació òptims de mercaderies.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0626",
    nomModul: "0626. Logística d'aprovisionament (LAP)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Previsions de compra i selecció de proveïdors", hores: 33 },
      { nom: "UF2: Control i gestió dels fluxos d'entrada", hores: 33 },
    ],
    descripcio: "Disseny d'aprovisionament integrat en plans de producció, coordinant quantitat, qualitat i terminis de lliurament.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0627",
    nomModul: "0627. Gestió administrativa del comerç internacional (GCI)",
    horesCentre: 132,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Operacions d'exportació, importació i duanes", hores: 66 },
      { nom: "UF2: Documentació i legislació internacional", hores: 66 },
    ],
    descripcio: "Gestió dels tràmits de mercaderies d'importació i exportació, aranzels i dipòsits duaners.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0628",
    nomModul: "0628. Organització del transport de viatgers (OTV)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Planificació de línies i horaris de viatgers", hores: 33 },
      { nom: "UF2: Gestió de qualitat i relació amb viatgers", hores: 33 },
    ],
    descripcio: "Elaborar els plans de transport de viatgers, assignar recursos, rutes, horaris, i complir requisits de seguretat.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0629",
    nomModul: "0629. Organització del transport de mercaderies (OTM)",
    horesCentre: 66,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Planificació d'enviaments de mercaderies", hores: 33 },
      { nom: "UF2: Atenció d'incidències, flotes terrestres i rutes", hores: 33 },
    ],
    descripcio: "Organitzar el transport terrestre de mercaderies, rutes, coordinació de flotes, manteniment i temps de conducció.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "C022",
    nomModul: "C022. Organització d'altres serveis de transport (AST)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Transport especial, frigorífic i mercaderies perilloses ADR", hores: 66 },
    ],
    descripcio: "Gestió administrativa, operacions i seguretat de transports especials, mercaderies ADR, i transport de càrrega excepcional.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0179",
    nomModul: "0179. Anglès professional (ANG)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Business English for logistics and shipping", hores: 66 },
    ],
    descripcio: "Atenció al client internacional i gestió de correspondència operativa de transport en llengua anglesa.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "C002",
    nomModul: "C002. Segona llengua estrangera per al transport i la logística (SLE)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Comunicació professional bàsica en llengua estrangera", hores: 66 },
    ],
    descripcio: "Gestió bàsica de relacions amb clients estrangers, formularis de comandes i transport internacional.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "1665",
    nomModul: "1665. Digitalització aplicada als sectors productius (DIG)",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Programari de gestió de magatzems WMS i rutes", hores: 33 },
    ],
    descripcio: "Sistemes digitals col·laboratius ERP, SGA, control de flotes GPS i tiralínies per a optimització de transport i emmagatzematge.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "1708",
    nomModul: "1708. Sostenibilitat aplicada al sistema productiu (SOS)",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Logística verda, reducció d'emissions CO2 i combustibles", hores: 33 },
    ],
    descripcio: "Logística verda, anàlisi d'impacte ambiental del transport per carretera, optimització de rutes sostenibles i estalvi energètic.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "1709",
    nomModul: "1709. Itinerari personal per a l'ocupabilitat I (IP1)",
    horesCentre: 99,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Drets del treball, riscos laborals i salut", hores: 99 },
    ],
    descripcio: "Comprendre el marc legal de relacions laborals i la gestió integral de prevenció de riscos en entorns de magatzem i transport.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "1710",
    nomModul: "1710. Itinerari personal per a l'ocupabilitat II (IP2)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Orientació laboral i creació de projectes emprenedors", hores: 66 },
    ],
    descripcio: "Inserció professional al sector de la logística, recerca de feina i planificació del pla d'empresa propi.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "0630",
    nomModul: "0630. Projecte intermodular (PRJ)",
    horesCentre: 198,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Disseny integrat de projecte logístic i comercial", hores: 198 },
    ],
    descripcio: "Integrar coneixements de rutes, magatzem, administració i finançament en la creació del disseny d'una operadora logística real.",
  },
  {
    cicle: "CFGS Transport i Logística",
    codiModul: "MOP1",
    nomModul: "MOP1. Mòdul professional optatiu (OPT)",
    horesCentre: 99,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Formació optativa seleccionada pel centre", hores: 99 },
    ],
    descripcio: "Continguts optatius de formació sectorial logístics adaptats al territori del centre educatiu.",
  },

  // ==================== CFGS MÀRQUETING I PUBLICITAT (MIP) ====================
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "0623",
    nomModul: "0623. Gestió econòmica i financera de l'empresa (GEF)",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Disseny i creació d'una empresa comercial", hores: 50 },
      { nom: "UF2: Gestió de tresoreria, impostos i comptabilitat", hores: 49 },
    ],
    descripcio: "Anàlisi comptable, recursos financers, subvencions i impostos per garantir la viabilitat de l'agència de publicitat.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "0930",
    nomModul: "0930. Polítiques de màrqueting (PMA)",
    horesCentre: 99,
    horesEmpresa: 99,
    unitatsFormatives: [
      { nom: "UF1: Polítiques de producte i preu mix", hores: 50 },
      { nom: "UF2: Polítiques de distribució i promoció", hores: 49 },
    ],
    descripcio: "Brífings i informes comercials, combinació òptima de variables de màrqueting mix, i anàlisi estratègica del comportament del client.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "0931",
    nomModul: "0931. Màrqueting digital (MDI)",
    horesCentre: 132,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Disseny web i gestió d'E-commerce", hores: 66 },
      { nom: "UF2: Optimització SEO, SEM i gestió de Social Media", hores: 66 },
    ],
    descripcio: "Estratègies de màrqueting digital, creació de pàgines web corporatives, optimització en cercadors i anàlisi de campanyes en xarxes socials.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1007",
    nomModul: "1007. Disseny i elaboració de material de comunicació (DMC)",
    horesCentre: 99,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Programes d'edició gràfica i vectors (Illustrator, Canva)", hores: 50 },
      { nom: "UF2: Maquetació de catàlegs, cartells i continguts audiovisuals", hores: 49 },
    ],
    descripcio: "Elaboració de materials publipromocionals en diversos suports digitals i físics utilitzant programari de disseny professional.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1008",
    nomModul: "1008. Mitjans i suports de comunicació (MSC)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Investigació de mitjans publicitaris (TV, premsa, digital)", hores: 33 },
      { nom: "UF2: Elaboració del pla de mitjans i control d'emissions", hores: 33 },
    ],
    descripcio: "Elaborar el pla de mitjans publicitaris, definint ràdio, TV, diaris o anuncis digitals per l'execució òptima d'una campanya.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1009",
    nomModul: "1009. Relacions públiques i organització d'esdeveniments de màrqueting (RPO)",
    horesCentre: 66,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Estratègies de relacions públiques corporatives", hores: 33 },
      { nom: "UF2: Logística i disseny d'actes, fires i esdeveniments", hores: 33 },
    ],
    descripcio: "Dissenyar la política de RRPP de l'empresa, organitzar protocols de relació corporativa, i gestionar esdeveniments publicitaris reals.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1010",
    nomModul: "1010. Investigació comercial (ICO)",
    horesCentre: 99,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Mostreig, fonts de dades i mètodes estadístics", hores: 50 },
      { nom: "UF2: Elaboració de qüestionaris de mercat i informes", hores: 49 },
    ],
    descripcio: "Disseny d'investigacions de mercat de qualitat mitjançant l'aplicació d'estadística i dades d'informació de mercats (SIM).",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1011",
    nomModul: "1011. Treball de camp en la investigació comercial (TCC)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Coordinació i selecció d'equips de camp", hores: 33 },
      { nom: "UF2: Control d'enquestes i processament de respostes", hores: 33 },
    ],
    descripcio: "Coordinar enquestadors, passar qüestionaris reals d'opinió i auditar les dades per a investigacions de mercat.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1109",
    nomModul: "1109. Llançament de productes i serveis (LPS)",
    horesCentre: 66,
    horesEmpresa: 53,
    unitatsFormatives: [
      { nom: "UF1: Disseny d'argumentari de vendes i innovació", hores: 33 },
      { nom: "UF2: Control del llançament al canal comercial", hores: 33 },
    ],
    descripcio: "Anàlisi i planificació del llançament d'un nou producte al mercat, dissenyany les fases del seu posicionament de vendes.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1110",
    nomModul: "1110. Atenció al client, consumidor i usuari (ACC)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Gestió de l'atenció, reclamacions i dades de clients", hores: 33 },
      { nom: "UF2: Mesura de satisfacció i fidelització de marca", hores: 33 },
    ],
    descripcio: "Gestionar l'atenció al client i dades CRM corporatius per augmentar la imatge positiva, resolent de forma proactiva les queixes.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "C076",
    nomModul: "C076. Català / Aranès professional (CAT)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Català instrumental per a relacions comercials i publicitat", hores: 66 },
    ],
    descripcio: "Capacitats de redacció corporativa de materials publicitaris i d'atenció al client amb rigor i ortografia excel·lent.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "0179",
    nomModul: "0179. Anglès professional (ANG)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Business English for marketing and advertising campaigns", hores: 66 },
    ],
    descripcio: "Comunicació professional de vendes, brífings de campanyes, i negociació comercial en llengua anglesa.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1665",
    nomModul: "1665. Digitalització aplicada als sectors productius (DIG)",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: IA generativa, Big Data de mercats i CRM cloud", hores: 33 },
    ],
    descripcio: "Ús d'eines digitals, cloud computing, big data comercial, integracions IA, i protecció de dades digitals.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1708",
    nomModul: "1708. Sostenibilitat aplicada al sistema productiu (SOS)",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Màrqueting verd i responsabilitat social corporativa", hores: 33 },
    ],
    descripcio: "Màrqueting ètic i verd, sostenibilitat de materials de comunicació (RSC) i normatives ambientals de l'activitat mercantil.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1709",
    nomModul: "1709. Itinerari personal per a l'ocupabilitat I (IP1)",
    horesCentre: 99,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Salut laboral, relacions laborals i riscos en agències", hores: 99 },
    ],
    descripcio: "Normativa laboral, prevenció de riscos en agències i d'ergonomia informàtica, d'acord amb la legislació laboral.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1710",
    nomModul: "1710. Itinerari personal per a l'ocupabilitat II (IP2)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Orientació professional i desenvolupament d'un pla d'agència", hores: 66 },
    ],
    descripcio: "Processos d'inserció laboral activa, currículums creatius, xarxes professionals, i emprenedoria mercantil pròpia.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "1012",
    nomModul: "1012. Projecte intermodular (PRJ)",
    horesCentre: 198,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Disseny integrat del projecte de màrqueting i campanya", hores: 198 },
    ],
    descripcio: "Desenvolupament integrat d'un pla de màrqueting i llançament d'una campanya publicitària real per a una agència simulada.",
  },
  {
    cicle: "CFGS Màrqueting i Publicitat",
    codiModul: "MOP2",
    nomModul: "MOP2. Mòdul professional optatiu (OPT)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Formació optativa de disseny web i UX digital", hores: 66 },
    ],
    descripcio: "Especialització optativa en matèries seleccionades pel centre per respondre a les necessitats digitals actuals.",
  },

  // ==================== CFGS GESTIÓ DE VENDES I ESPAIS COMERCIALS (GVEC) ====================
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0623",
    nomModul: "0623. Gestió econòmica i financera de l'empresa (GEF)",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Creació d'establiments comercials i tràmits fiscals", hores: 50 },
      { nom: "UF2: Gestió administrativa de vendes i control econòmic", hores: 49 },
    ],
    descripcio: "Comptabilitat, impostos comercials, pressupostos de l'establiment i gestió de tresoreria de vendes.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0625",
    nomModul: "0625. Logística d'emmagatzematge (LEM)",
    horesCentre: 66,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Disseny de layouts comercials i recepció de càrregues", hores: 33 },
      { nom: "UF2: Valoració d'existències comercials i codis de barra", hores: 33 },
    ],
    descripcio: "Disseny de layouts, emmagatzematge físic, optimització de fluxos de reposició, i gestió d'existències al lineal.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0626",
    nomModul: "0626. Logística d'aprovisionament (LAP)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Compres de mercaderies, rotació i estocs", hores: 33 },
      { nom: "UF2: Control d'entrades, transports i terminis", hores: 33 },
    ],
    descripcio: "Planificació de compres, negociació amb proveïdors, control logístic de la cadena de distribució.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0926",
    nomModul: "0926. Aparadorisme i disseny d'espais comercials (ADE)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Distribució física interna, itineraris i il·luminació", hores: 33 },
      { nom: "UF2: Tècniques artístiques d'escaparatisme professional", hores: 33 },
    ],
    descripcio: "Dinamitzar l'espai interior, definir especificacions de disseny, muntar aparadors artístics i definir imatges corporatives.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0927",
    nomModul: "0927. Gestió de productes i promocions al punt de venda (GPP)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Marxandatge visual de productes al lineal", hores: 33 },
      { nom: "UF2: Accions promocionals de vendes i control", hores: 33 },
    ],
    descripcio: "Marxandatge del lineal, càlcul de rendibilitats d'assortiment de productes, i implantació d'accions promocionals.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0928",
    nomModul: "0928. Organització d'equips de vendes (OEV)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Selecció, formació i lideratge del venedor", hores: 33 },
      { nom: "UF2: Programació, rutes i sistemes de retribució", hores: 33 },
    ],
    descripcio: "Gestionar i dimensionar la força de vendes, sistemes de retribució de venedors, incentius, formació i motivació d'equips.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0929",
    nomModul: "0929. Tècniques de venda i negociació (TVN)",
    horesCentre: 99,
    horesEmpresa: 53,
    unitatsFormatives: [
      { nom: "UF1: Procés de venda presencial i habilitats socials", hores: 50 },
      { nom: "UF2: Negociació de grans comptes i contractació", hores: 49 },
    ],
    descripcio: "Disseny d'argumentaris de venda, tancament d'acords comercials, gestió de la negociació complexa i atenció al client.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0930",
    nomModul: "0930. Polítiques de màrqueting (PMA)",
    horesCentre: 99,
    horesEmpresa: 99,
    unitatsFormatives: [
      { nom: "UF1: Producte, preu, distribució i màrqueting mix", hores: 50 },
      { nom: "UF2: Auditories de mercat i informes estratègics", hores: 49 },
    ],
    descripcio: "Estudis comercials de màrqueting, definició del màrqueting mix comercial dels productes i gestió d'imatge.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0931",
    nomModul: "0931. Màrqueting Digital (MDI)",
    horesCentre: 132,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Disseny d'E-commerce i botigues en línia", hores: 66 },
      { nom: "UF2: Eines SEO, SEM, campanyes web i gestió analítica", hores: 66 },
    ],
    descripcio: "Gestió del lloc web, e-commerce, promocions en línia, posicionament digital i analítica web.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "1010",
    nomModul: "1010. Investigació comercial (ICO)",
    horesCentre: 99,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Recollida d'informació, mostreig i fonts SIM", hores: 50 },
      { nom: "UF2: Qüestionaris de mercat, anàlisi de dades i informes", hores: 49 },
    ],
    descripcio: "Disseny d'investigacions comercials, mostreig estadístic, anàlisi de dades de mercats de vendes.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "C076",
    nomModul: "C076. Català / Aranès professional (CAT)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Llengua catalana aplicada a l'atenció de botigues i negociació", hores: 66 },
    ],
    descripcio: "Desenvolupament de capacitats de comunicació professional escrita i oral per a relacions comercials en català.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0179",
    nomModul: "0179. Anglès professional (ANG)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Professional English for sales representation and retail", hores: 66 },
    ],
    descripcio: "Comunicació professional de vendes, negociació comercial amb estrangers i gestió documental en anglès.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "1664",
    nomModul: "1664. Digitalització aplicada als sectors productius (DIG)",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: ERP de vendes cloud, ciberseguretat de TPV i analítica", hores: 33 },
    ],
    descripcio: "Ús de fulls de càlcul avançats, programari cloud ERP de vendes, SGA i seguretat informàtica del client.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "1708",
    nomModul: "1708. Sostenibilitat aplicada al sistema productiu (SOS)",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Disseny sostenible de botigues i economia de residus", hores: 33 },
    ],
    descripcio: "Sostenibilitat ambiental del punt de venda, envasos ecològics, reciclatge comercial i protocols RSC d'empresa comercial.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "1709",
    nomModul: "1709. Itinerari personal per a l'ocupabilitat I (IP1)",
    horesCentre: 99,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Drets del treball, riscos i salut en espais de venda", hores: 99 },
    ],
    descripcio: "Marc de drets i deures laborals d'equips comercials, seguretat ocupacional en magatzems i línies comercials.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "1710",
    nomModul: "1710. Itinerari personal per a l'ocupabilitat II (IP2)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Inserció laboral activa i disseny del pla de negoci de botiga", hores: 66 },
    ],
    descripcio: "Tècniques de recerca de feina activa al sector, preparació de proves de selecció comercial, i plans d'empresa.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "0932",
    nomModul: "0932. Projecte intermodular de gestió de vendes i espais comercials (PRJ)",
    horesCentre: 198,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Projecte integral de disseny d'un espai i pla de negoci", hores: 198 },
    ],
    descripcio: "Dissenyar completament una gran superfície o un establiment comercial real simulant totes les facetes mercantils.",
  },
  {
    cicle: "CFGS Gestió de Vendes i Espais Comercials",
    codiModul: "MOP3",
    nomModul: "MOP3. Mòdul professional optatiu (OPT)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Optativa del sector comercial, disseny i marxandatge visual", hores: 66 },
    ],
    descripcio: "Espai opcional del centre enfocat a l'aparadorisme avançat i disseny 3D de botigues segons necessitats territorials.",
  },

  // ==================== CFGS COMERÇ INTERNACIONAL (CI) ====================
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0622",
    nomModul: "0622. Transport internacional de mercaderies (TIM)",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Incoterms i contractes de transport internacional", hores: 50 },
      { nom: "UF2: Operativa multimodal i duanes", hores: 49 },
    ],
    descripcio: "Gestió, contractació, rutes, duanes i documentació dels transports internacionals multimodals sota Incoterms.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0623",
    nomModul: "0623. Gestió econòmica i financera de l'empresa (GEF)",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Disseny econòmic-fiscal de l'empresa exportadora", hores: 50 },
      { nom: "UF2: Control comptable de costos i viabilitat comercial", hores: 49 },
    ],
    descripcio: "Control de comptabilitat, impostos, costos d'importació i exportació, i anàlisi de recursos financers de l'empresa.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0625",
    nomModul: "0625. Logística d'emmagatzematge (LEM)",
    horesCentre: 66,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Gestió de magatzems internacionals i estocs", hores: 33 },
      { nom: "UF2: Valoració de mercaderies d'entrada i expedició", hores: 33 },
    ],
    descripcio: "Organitzar el magatzem de forma eficient, layouts duaners, expedicions internacionals i rotacions d'existències.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0627",
    nomModul: "0627. Gestió administrativa del comerç internacional (GCI)",
    horesCentre: 132,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Tràmits d'exportació i importació duanera", hores: 66 },
      { nom: "UF2: Gestió documental i autoritzacions d'importació", hores: 66 },
    ],
    descripcio: "Realitzar la gestió d'operacions d'exportació i importació, regulacions legals d'entrada, dipòsits duaners i aranzels.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0822",
    nomModul: "0822. Sistema d'informació de mercats (SIM)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Obtenció de dades i fonts d'informació exteriors", hores: 33 },
      { nom: "UF2: Anàlisi estadística i bases SIM de mercats", hores: 33 },
    ],
    descripcio: "Anàlisi i obtenció d'informació de mercats exteriors mitjançant tècniques d'investigació per a la presa de decisions del pla de màrqueting.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0823",
    nomModul: "0823. Màrqueting internacional (MIN)",
    horesCentre: 99,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Selecció de països de destí i mix exterior", hores: 50 },
      { nom: "UF2: Posicionament i disseny del pla de màrqueting mix", hores: 49 },
    ],
    descripcio: "Disseny de les polítiques de producte, preu, distribució i comunicació comercial més adequades per a l'entrada en mercats mundials.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0824",
    nomModul: "0824. Negociació internacional (NIN)",
    horesCentre: 66,
    horesEmpresa: 66,
    unitatsFormatives: [
      { nom: "UF1: Habilitats de negociació multicultural", hores: 33 },
      { nom: "UF2: Redacció i tancament de contractes comercials", hores: 33 },
    ],
    descripcio: "Fases i mètodes de negociació amb operadors de diferents cultures, disseny d'ofertes comercials i formalització de contractes mercantils.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0825",
    nomModul: "0825. Finançament internacional (FIN)",
    horesCentre: 66,
    horesEmpresa: 53,
    unitatsFormatives: [
      { nom: "UF1: Anàlisi del mercat de divises i canvi", hores: 33 },
      { nom: "UF2: Gestió de crèdits a l'exportació i ajuts", hores: 33 },
    ],
    descripcio: "Gestió financera, mitjans de cobrament i pagament internacionals, gestió de riscos de canvi en divises, garanties i finançaments.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0826",
    nomModul: "0826. Mitjans de pagament internacional (MPI)",
    horesCentre: 66,
    horesEmpresa: 33,
    unitatsFormatives: [
      { nom: "UF1: Crèdits documentaris, remeses i xecs", hores: 33 },
      { nom: "UF2: Tràmits de documentació i garanties financeres", hores: 33 },
    ],
    descripcio: "Identificar i processar remeses simples, crèdits documentaris confirmats sota la normativa de pagaments internacionals.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0827",
    nomModul: "0827. Comerç digital internacional (CDI)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: E-commerce transfronterer i plataformes de vendes globals", hores: 66 },
    ],
    descripcio: "Botigues virtuals internacionals, facturació electrònica d'exportacions, i campanyes de publicitat web mundials.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0179",
    nomModul: "0179. Anglès professional (ANG)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Business English for international trade transactions", hores: 66 },
    ],
    descripcio: "Comunicació formal de negociacions internacionals escrites i orals amb proveïdors mundials en llengua anglesa.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "C001",
    nomModul: "C001. Segona llengua estrangera per al comerç internacional (SLE)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Comunicació empresarial bàsica en segona llengua", hores: 66 },
    ],
    descripcio: "Atenció bàsica i gestió de formularis d'exportació en segona llengua estrangera.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "1665",
    nomModul: "1665. Digitalització aplicada als sectors productius (DIG)",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: ERP de comerç exterior cloud i plataformes de duana", hores: 33 },
    ],
    descripcio: "Fulls de càlcul aplicats a càlcul d'aranzels, gestió digital ERP de comandes i plataformes de duanes.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "1708",
    nomModul: "1708. Sostenibilitat aplicada al sistema productiu (SOS)",
    horesCentre: 33,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Cadena de subministrament verda i petjada de CO2", hores: 33 },
    ],
    descripcio: "Aplicar protocols de protecció mediambiental en l'embalatge, distribució, reducció de petjada d'importacions i responsabilitat social.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "1709",
    nomModul: "1709. Itinerari personal per a l'ocupabilitat I (IP1)",
    horesCentre: 99,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Drets laborals, riscos i seguretat", hores: 99 },
    ],
    descripcio: "Coneixement del marc normatiu laboral d'empreses, prevenció de riscos laborals i resolució de conflictes laborals.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "1710",
    nomModul: "1710. Itinerari personal per a l'ocupabilitat II (IP2)",
    horesCentre: 66,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Recerca activa de feina internacional i habilitats", hores: 66 },
    ],
    descripcio: "Tècniques de recerca de feina activa internacional, emprenedoria i gestió de petites empresas d'importació.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "0828",
    nomModul: "0828. Projecte intermodular (PRJ)",
    horesCentre: 198,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Disseny de pla de negoci i expansió internacional", hores: 198 },
    ],
    descripcio: "Integració dels mòduls d'import/export, negociació i finançament en la planificació simulada d'una importadora real.",
  },
  {
    cicle: "CFGS Comerç Internacional",
    codiModul: "MOP4",
    nomModul: "MOP4. Mòdul professional optatiu (OPT)",
    horesCentre: 99,
    horesEmpresa: 0,
    unitatsFormatives: [
      { nom: "UF1: Formació optativa sectorial de comerç internacional", hores: 99 },
    ],
    descripcio: "Especialització opcional lligada a canvis legals, digitalització o actualitzacions de divises digitals.",
  }
];

export const AVALUACIO_SCHEMAS = [
  {
    name: "Estàndard Comerç i Màrqueting (Teòric-Pràctic)",
    items: [
      { concepte: "Projectes reals de màrqueting i casos pràctics", percentatge: 50 },
      { concepte: "Proves de contingut individuals (Exàmens)", percentatge: 40 },
      { concepte: "Actitud, puntualitat i participació activa a l'aula", percentatge: 10 },
    ],
  },
  {
    name: "Basat completament en Projectes (ABP)",
    items: [
      { concepte: "Treball de recerca / Desenvolupament de projecte", percentatge: 60 },
      { concepte: "Defensa oral del projecte i qualitat del material", percentatge: 30 },
      { concepte: "Coavaluació de l'equip de treball", percentatge: 10 },
    ],
  },
  {
    name: "Perfil Logístic / Tècnic d'Examen",
    items: [
      { concepte: "Exercicis i resolució de supòsits reals a l'aula", percentatge: 30 },
      { concepte: "Proves de coneixement escrites o digitals", percentatge: 60 },
      { concepte: "Participació diària i qualitat d'entregues", percentatge: 10 },
    ],
  },
];

export const METHODOLOGY_TEMPLATES = [
  "Metodologia activa basada en projectes (ABP) on l'alumne resol reptes reals de comerç i màrqueting o distribucions logístiques mitjançant el treball col·laboratiu en equips d'investigació.",
  "Classes conceptuals i simulacions guiades mitjançant programari de gestió de magatzem, ofimàtica o gestors de contingut e-commerce d'ús diari a les empreses actuals.",
  "Enfocament pràctic mitjançant tallers a l'aula taller (muntatges d'aparador, jocs de rol de venda presencial) i anàlisis de camp del teixit comercial local.",
];

export const MATERIALS_TEMPLATES = [
  "Ordinador portàtil de l'aula, connexió a internet, entorn Moodle/Classroom, i programari lliure (Canva, WordPress, simuladors d'estocs, fulls de càlcul).",
  "Material d'ús físic a l'aula taller (focus d'il·luminació, decoració, maniquins per a aparadors, cartolines, argumentaris de venda impresos).",
  "Apunts teòrics preparats pel departament en format digital, normatives legals actuals de comerç i transport, i exemples de plans de màrqueting corporatius.",
];

export const RECUPERACIO_TEMPLATES = [
  "Avaluació contínua. En cas de suspendre una unitat formativa (UF), s'haurà de realitzar una prova o lliurar un treball de compensació global abans d'acabar la convocatòria ordinària.",
  "Per a poder superar el mòdul s'ha d'obtenir una nota mínima de 5 a cadascuna de les UFs per separat. Hi haurà una única convocatòria extraordinària de síntesi per a les parts pendents.",
  "Recuperació d'UFs mitjançant un examen teòric-pràctic individual a final de trimestre sobre els resultats d'aprenentatge essencials.",
];

export const DEFAULT_NEW_MODULE = (): ModulePresentation => ({
  id: "temp-" + Date.now(),
  departament: "Comerç i Màrqueting",
  familiaProfessional: "Comerç i Màrqueting",
  cicleFormatiu: "CFGM Activitats Comercials",
  codiModul: "1231",
  nomModul: "Dinamització del punt de venda",
  horesCentre: 99,
  horesEmpresa: 66,
  totalHores: 165,
  professorat: "Docent del mòdul",
  
  // Noves pestanyes per l'exportació completa de l'excel demanat
  objectius: [
    { id: "obj-1", codi: "a", text: "Definir accions comercials bàsiques adaptades al tipus de negoci local." },
    { id: "obj-2", codi: "b", text: "Comprendre i gestionar l'aprovisionament de mercaderies d'un punt de venda." },
    { id: "obj-3", codi: "c", text: "Dissenyar presentacions visuals efectives per als articles al lineal." }
  ],
  ras: [
    { id: "ra-1", codi: "1", text: "Analitza i classifica els principals canals de distribució de mercaderies.", ponderacio: 50, dataInici: "15/09", dataFinal: "10/11" },
    { id: "ra-2", codi: "2", text: "Determina la distribució d'un espai comercial d'acord amb els fluxos de clients.", ponderacio: 50, dataInici: "11/11", dataFinal: "22/12" }
  ],
  competencies: [
    { id: "comp-1", codi: "a", text: "Organitzar el magatzem i el punt de venda amb eficàcia operativitat." },
    { id: "comp-2", codi: "b", text: "Resoldre problemes de comunicació amb compradors i clients d'entorns multiculturals." }
  ],
  avaluacioPrimera: "L'avaluació contínua requereix el lliurament i superació de cadascun dels Resultats d'Aprenentatge (RAs) establerts.\nLa qualificació mínima de cada RA per fer mitjana ponderada ha de ser igual o superior a 5.",
  avaluacioSegona: "Els alumnes que no assoleixin els RAs disposaran d'una prova escrita o de lliurament pràctic de recuperació extraordinària.\nLa data de recuperació de segona convocatòria es fixarà al campus de l'institut.",
  metodologia: [
    { id: "met-1", text: "Metodologia activa i col·laborativa basada en la resolució de casos pràctics i projectes simulats d'empresa comercial." }
  ],
  activitats: [
    { id: "act-1", text: "Anàlisi d'un comerç real de proximitat i breu informe sobre disseny d'aparador." },
    { id: "act-2", text: "Taller d'atenció al client i simulació de reclamació i resolució de queixes." }
  ],
  sortides: [
    { id: "sort-1", text: "Visita guiada al Mercat de proveïdors o Plataforma Logística regional de la comarca." }
  ],
  espaisrecursos: [
    { id: "er-1", text: "Aula estàndard de teoricopràctica equipada amb ordinadors de l'alumne i projector." },
    { id: "er-2", text: "Canva per a disseny de marxandatge i programari de fulls de càlcul per inventari d'estoc." }
  ],
  bibliografia: [
    { id: "bib-1", text: "Gestió Comercial de la Botiga, Ed. Santillana FP, Edició 2024." },
    { id: "bib-2", text: "Marxandatge i Màrqueting del Punt de Venda, McGraw-Hill, Edició 2023." }
  ]
});
