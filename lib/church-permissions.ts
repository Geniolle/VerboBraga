import {
  ChurchAuthorityRow,
  getChurchAuthorityByEmail,
  listChurchDatabaseTables,
} from '@/lib/db'

export type ChurchTabConfig = {
  id: string
  title: string
  columnsInfo: string
  extraTableCandidates?: string[]
  permissionColumns: string[]
}

export type ChurchTabAccess = ChurchTabConfig & {
  tableName: string | null
  tableExists: boolean
  hasPermission: boolean
  canView: boolean
}

export type ChurchFeatureAccess = {
  canAddMusic: boolean
}

const PERM = {
  global: [
    'user_all',
    'geral_departamentos',
    'departamentos_manager',
    'departamentos_coordenador',
    'departamentos_pastoreio',
  ],
  ministros: ['manager_ministros', 'coordenador_ministros', 'colaborador_ministros'],
  auxiliar: ['manager_auxiliar', 'coordenador_auxiliar', 'colaborador_auxiliar'],
  recados: ['manager_recados', 'coordenador_recados', 'colaborador_recados'],
  oracao: ['manager_oracao', 'coordenador_oracao', 'colaborador_oracao'],
  tesouraria: ['manager_tesouraria', 'coordenador_tesouraria', 'colaborador_tesouraria'],
  centrodecura: ['manager_centrodecura', 'coordenador_centrodecura', 'colaborador_centrodecura'],
  comunicacao: ['manager_comunicacao', 'coordenador_comunicacao', 'colaborador_comunicacao'],
  criancas: ['manager_criancas', 'coordenador_criancas', 'colaborador_criancas'],
  diaconato: ['manager_diaconato', 'coordenador_diaconato', 'colaborador_diaconato'],
  louvor: ['manager_louvor', 'coordenador_louvor', 'colaborador_louvor'],
  verbocafe: ['manager_verbocafe', 'coordenador_verbocafe', 'colaborador_verbocafe'],
  verboshop: ['manager_verboshop', 'coordenador_verboshop', 'colaborador_verboshop'],
  casais: ['manager_casais', 'coordenador_casais', 'colaborador_casais'],
  jovens: ['manager_jovens', 'coordenador_jovens', 'colaborador_jovens'],
  compras: ['manager_compras', 'coordenador_compras', 'colaborador_compras'],
  discipulado: ['manager_discipulado', 'coordenador_discipulado', 'colaborador_discipulado'],
  eventos: ['manager_eventos', 'coordenador_eventos', 'colaborador_eventos'],
} as const

function unique(values: string[]) {
  return Array.from(new Set(values))
}

function mergePermissions(...groups: ReadonlyArray<ReadonlyArray<string>>) {
  return unique([...PERM.global, ...groups.flat()])
}

const ANY_DEPARTMENT_PERMISSIONS = unique([
  ...PERM.ministros,
  ...PERM.auxiliar,
  ...PERM.recados,
  ...PERM.oracao,
  ...PERM.tesouraria,
  ...PERM.centrodecura,
  ...PERM.comunicacao,
  ...PERM.criancas,
  ...PERM.diaconato,
  ...PERM.louvor,
  ...PERM.verbocafe,
  ...PERM.verboshop,
  ...PERM.casais,
  ...PERM.jovens,
  ...PERM.compras,
  ...PERM.discipulado,
  ...PERM.eventos,
])

const ALL_TAB_PERMISSIONS = unique([...PERM.global, ...ANY_DEPARTMENT_PERMISSIONS])

export const CHURCH_TABS: ChurchTabConfig[] = [
  {
    id: 'agenda_verbo_braga',
    title: 'AGENDA VERBO BRAGA',
    columnsInfo: '44 columns: ID_CALENDAR TÍTULO DA AGENDA',
    extraTableCandidates: ['igreja_appagendadepartamentos'],
    permissionColumns: mergePermissions(PERM.eventos, PERM.comunicacao),
  },
  {
    id: 'app_ensaio',
    title: 'APP_ENSAIO',
    columnsInfo: '24 columns: ID_TABLE ENSAIO',
    extraTableCandidates: ['igreja_app_ensaio'],
    permissionColumns: mergePermissions(PERM.louvor),
  },
  {
    id: 'app_anual_global',
    title: 'AppAnualGlobal',
    columnsInfo: '364 columns: DATA DATA',
    extraTableCandidates: ['igreja_appanualglobal'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'app_discipulado',
    title: 'AppDiscipulado',
    columnsInfo: '29 columns: Carimbo de data/hora Carimbo de data/hora',
    extraTableCandidates: ['igreja_appdiscipulado'],
    permissionColumns: mergePermissions(PERM.discipulado),
  },
  {
    id: 'app_mensal_global',
    title: 'AppMensalGlobal',
    columnsInfo: '354 columns: DATA DATA',
    extraTableCandidates: ['igreja_appmensalglobal'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'app_musicas',
    title: 'AppMusicas',
    columnsInfo: '18 columns: MÚSICA MÚSICA',
    extraTableCandidates: ['igreja_appmusicas'],
    permissionColumns: mergePermissions(PERM.louvor, PERM.comunicacao),
  },
  {
    id: 'app_reporte',
    title: 'AppReporte',
    columnsInfo: '14 columns: _ComputedKey DATA',
    extraTableCandidates: ['igreja_appreporte'],
    permissionColumns: mergePermissions(PERM.criancas, PERM.comunicacao),
  },
  {
    id: 'ausencias',
    title: 'AUSÊNCIAS',
    columnsInfo: '9 columns: _ComputedKey DATA INÍCIO',
    extraTableCandidates: ['igreja_ausencias'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'bp_algoritimo',
    title: 'BP ALGORITIMO',
    columnsInfo: '25 columns: ID_TABLE NOME',
    extraTableCandidates: ['igreja_bp_algoritimo', 'igreja_log_algoritimo'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'bp_autority',
    title: 'BP AUTORITY',
    columnsInfo: '66 columns: _ComputedKey NOME',
    extraTableCandidates: ['igreja_bp_autority'],
    permissionColumns: mergePermissions(PERM.eventos),
  },
  {
    id: 'bp_colaborador',
    title: 'BP COLABORADOR',
    columnsInfo: '22 columns: FUNC_CRIANÇAS FUNC_CRIANÇAS',
    extraTableCandidates: ['igreja_bp_colaborador'],
    permissionColumns: mergePermissions(PERM.eventos),
  },
  {
    id: 'bp_escala',
    title: 'BP ESCALA',
    columnsInfo: '17 columns: _RowNumber DATA',
    extraTableCandidates: ['igreja_bp_escala', 'igreja_t_appanualglobal'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'bp_funcao',
    title: 'BP FUNÇÃO',
    columnsInfo: '17 columns: FUNÇÃO COLABORADOR FUNÇÃO COLABORADOR',
    extraTableCandidates: ['igreja_bp_funcao'],
    permissionColumns: mergePermissions(PERM.eventos),
  },
  {
    id: 'bp_service',
    title: 'BP SERVICE',
    columnsInfo: '232 columns: NOME NOME',
    extraTableCandidates: ['igreja_bp_service'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'db_mercadorias',
    title: 'DB_MERCADORIAS',
    columnsInfo: '11 columns: ID_TABLE PRODUTO',
    extraTableCandidates: ['igreja_db_mercadorias'],
    permissionColumns: mergePermissions(PERM.compras, PERM.verbocafe, PERM.verboshop),
  },
  {
    id: 'departamentos',
    title: 'DEPARTAMENTOS',
    columnsInfo: '12 columns: DEPARTAMENTO DEPARTAMENTO',
    extraTableCandidates: ['igreja_departamentos'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'entradas',
    title: 'ENTRADAS',
    columnsInfo: '17 columns: DATA DATA',
    extraTableCandidates: ['igreja_entradas'],
    permissionColumns: mergePermissions(PERM.tesouraria),
  },
  {
    id: 'fornecedor',
    title: 'FORNECEDOR',
    columnsInfo: '4 columns: NOME NOME',
    extraTableCandidates: ['igreja_fornecedor'],
    permissionColumns: mergePermissions(PERM.compras, PERM.tesouraria),
  },
  {
    id: 'frequencia_dos_cultos',
    title: 'FREQUENCIA DOS CULTOS',
    columnsInfo: '12 columns: DATA DATA',
    extraTableCandidates: ['igreja_appfrequenciamembresia', 'igreja_frequencia_dos_cultos'],
    permissionColumns: mergePermissions(PERM.diaconato),
  },
  {
    id: 'gerenciar_caixas',
    title: 'GERENCIAR CAIXAS',
    columnsInfo: '7 columns: _RowNumber CAIXA BANCO',
    extraTableCandidates: ['igreja_gerenciar_caixas'],
    permissionColumns: mergePermissions(PERM.tesouraria),
  },
  {
    id: 'grafico_frequencia',
    title: 'Grafico_Frequencia',
    columnsInfo: '5 columns: _RowNumber VALOR',
    extraTableCandidates: ['igreja_grafico_frequencia'],
    permissionColumns: mergePermissions(PERM.diaconato),
  },
  {
    id: 'id_departamentos',
    title: 'ID_DEPARTAMENTOS',
    columnsInfo: '7 columns: DEPARTAMENTOS DEPARTAMENTOS',
    extraTableCandidates: ['igreja_id_departamentos'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'id_recados',
    title: 'ID_RECADOS',
    columnsInfo: '5 columns: ID ID',
    extraTableCandidates: ['igreja_id_recados'],
    permissionColumns: mergePermissions(PERM.recados),
  },
  {
    id: 'id_whatsapp',
    title: 'ID_Whatsapp',
    columnsInfo: '6 columns: USERID USERID',
    extraTableCandidates: ['igreja_id_whatsapp'],
    permissionColumns: mergePermissions(PERM.comunicacao),
  },
  {
    id: 'localidade',
    title: 'LOCALIDADE',
    columnsInfo: '3 columns: LOCALIDADE LOCALIDADE',
    extraTableCandidates: ['igreja_localidade'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'log_algoritimo',
    title: 'LOG ALGORITIMO',
    columnsInfo: '13 columns: Log ID Data de Execução',
    extraTableCandidates: ['igreja_log_algoritimo'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'organizador',
    title: 'ORGANIZADOR',
    columnsInfo: '3 columns: Title Title',
    extraTableCandidates: ['igreja_organizador'],
    permissionColumns: mergePermissions(PERM.eventos),
  },
  {
    id: 'pcvv',
    title: 'PCVV',
    columnsInfo: '3 columns: PLANO DE CONTA PLANO DE CONTA',
    extraTableCandidates: ['igreja_pcvv'],
    permissionColumns: mergePermissions(PERM.tesouraria),
  },
  {
    id: 'recados',
    title: 'RECADOS',
    columnsInfo: '5 columns: _RowNumber TÍTULO',
    extraTableCandidates: ['igreja_recados'],
    permissionColumns: mergePermissions(PERM.recados),
  },
  {
    id: 'report_musicas',
    title: 'REPORT MUSICAS',
    columnsInfo: '15 columns: MÚSICAS MÚSICAS',
    extraTableCandidates: ['igreja_report_musicas'],
    permissionColumns: mergePermissions(PERM.louvor, PERM.comunicacao),
  },
  {
    id: 'saidas',
    title: 'SAÍDAS',
    columnsInfo: '25 columns: _ComputedKey DATA',
    extraTableCandidates: ['igreja_saidas'],
    permissionColumns: mergePermissions(PERM.tesouraria, PERM.compras),
  },
  {
    id: 'salas_criancas',
    title: 'SALAS CRIANÇAS',
    columnsInfo: '4 columns: Title Title',
    extraTableCandidates: ['igreja_salas_criancas'],
    permissionColumns: mergePermissions(PERM.criancas),
  },
  {
    id: 'salas_ocorrencia',
    title: 'Salas Ocorrencia',
    columnsInfo: '3 columns: Untitled Text Untitled Text',
    extraTableCandidates: ['igreja_salas_ocorrencia'],
    permissionColumns: mergePermissions(PERM.criancas),
  },
  {
    id: 'send_whatsapp',
    title: 'SendWhatsApp',
    columnsInfo: '4 columns: GRUPO GRUPO',
    extraTableCandidates: ['igreja_sendwhatsapp'],
    permissionColumns: mergePermissions(PERM.comunicacao),
  },
  {
    id: 'separador',
    title: 'SEPARADOR',
    columnsInfo: '3 columns: Row ID Title',
    extraTableCandidates: ['igreja_separador'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'status_recados',
    title: 'STATUS RECADOS',
    columnsInfo: '3 columns: Row ID STATUS',
    extraTableCandidates: ['igreja_status_recados'],
    permissionColumns: mergePermissions(PERM.recados),
  },
  {
    id: 'status_ws',
    title: 'STATUS WS',
    columnsInfo: '4 columns: STATUS STATUS',
    extraTableCandidates: ['igreja_status_ws'],
    permissionColumns: mergePermissions(PERM.comunicacao),
  },
  {
    id: 'status',
    title: 'STATUS',
    columnsInfo: '6 columns: STATUS STATUS',
    extraTableCandidates: ['igreja_status'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'stock',
    title: 'Stock',
    columnsInfo: '13 columns: TITULOS TITULOS',
    extraTableCandidates: ['igreja_stock'],
    permissionColumns: mergePermissions(PERM.compras, PERM.verbocafe, PERM.verboshop),
  },
  {
    id: 'takeway_respostas',
    title: 'TakeWay_Respostas',
    columnsInfo: '8 columns: _RowNumber Carimbo de data/hora',
    extraTableCandidates: ['igreja_takeway_respostas'],
    permissionColumns: mergePermissions(PERM.verbocafe),
  },
  {
    id: 'takeway',
    title: 'TAKEWAY',
    columnsInfo: '24 columns: ID_MENU ID_MENU',
    extraTableCandidates: ['igreja_takeway'],
    permissionColumns: mergePermissions(PERM.verbocafe),
  },
  {
    id: 'tipo_frequencia',
    title: 'TIPO FREQUENCIA',
    columnsInfo: '4 columns: TIPO TIPO',
    extraTableCandidates: ['igreja_tipo_frequencia'],
    permissionColumns: mergePermissions(PERM.diaconato),
  },
  {
    id: 'titulo_da_agenda',
    title: 'TÍTULO DA AGENDA',
    columnsInfo: '4 columns: Title Title',
    extraTableCandidates: ['igreja_titulo_da_agenda'],
    permissionColumns: mergePermissions(PERM.eventos),
  },
  {
    id: 'type',
    title: 'TYPE',
    columnsInfo: '5 columns: TYPE TYPE',
    extraTableCandidates: ['igreja_type'],
    permissionColumns: ALL_TAB_PERMISSIONS,
  },
  {
    id: 'url_links',
    title: 'URL LINKS',
    columnsInfo: '5 columns: URL MEMBRESIA URL MEMBRESIA',
    extraTableCandidates: ['igreja_url_links'],
    permissionColumns: mergePermissions(PERM.comunicacao),
  },
  {
    id: 'whatsapp',
    title: 'Whatsapp',
    columnsInfo: '17 columns: ID_TABLE GRUPO DE COMUNICAÇÃO',
    extraTableCandidates: ['igreja_whatsapp'],
    permissionColumns: mergePermissions(PERM.comunicacao),
  },
]

function normalizeToken(value: string) {
  return value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function sanitizeTableKey(label: string) {
  return label
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function isTruthy(value: string | number | boolean | null | undefined) {
  if (value === null || value === undefined) return false
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return value !== 0
  return ['true', '1', 'yes', 'sim', 'x'].includes(String(value).trim().toLowerCase())
}

function hasAnyPermission(row: ChurchAuthorityRow, keys: ReadonlyArray<string>) {
  return keys.some((key) => isTruthy(row[key]))
}

function hasGlobalPermission(row: ChurchAuthorityRow) {
  return hasAnyPermission(row, PERM.global)
}

function getTabCandidates(tab: ChurchTabConfig) {
  const base = sanitizeTableKey(tab.title)
  return unique([
    ...(tab.extraTableCandidates ?? []),
    base,
    `igreja_${base}`,
  ])
}

async function getDatabaseTables() {
  return listChurchDatabaseTables()
}

function buildTableMap(tableNames: string[]) {
  const map = new Map<string, string>()
  for (const tableName of tableNames) {
    const key = normalizeToken(tableName)
    if (!map.has(key)) {
      map.set(key, tableName)
    }
  }
  return map
}

function resolveTableName(tableMap: Map<string, string>, candidates: string[]) {
  for (const candidate of candidates) {
    const resolved = tableMap.get(normalizeToken(candidate))
    if (resolved) return resolved
  }
  return null
}

function hasTabPermission(
  tab: ChurchTabConfig,
  authorityRow: ChurchAuthorityRow | null,
  isAdmin: boolean
) {
  if (isAdmin) return true
  if (!authorityRow) return false
  if (hasGlobalPermission(authorityRow)) return true
  if (tab.permissionColumns.length === 0) return true
  return hasAnyPermission(authorityRow, tab.permissionColumns)
}

function canAddMusicFeature(
  authorityRow: ChurchAuthorityRow | null,
  isAdmin: boolean
) {
  if (isAdmin) return true
  if (!authorityRow) return false

  return (
    isTruthy(authorityRow.user_all) ||
    isTruthy(authorityRow.manager_louvor) ||
    isTruthy(authorityRow.coordenador_louvor)
  )
}

export async function getChurchFeatureAccessForUser(
  email?: string | null,
  isAdmin = false
): Promise<ChurchFeatureAccess> {
  const authorityRow = await getChurchAuthorityByEmail(email)

  return {
    canAddMusic: canAddMusicFeature(authorityRow, isAdmin),
  }
}

export async function getChurchTabsForUser(
  email?: string | null,
  isAdmin = false
): Promise<ChurchTabAccess[]> {
  const [authorityRow, tableNames] = await Promise.all([
    getChurchAuthorityByEmail(email),
    getDatabaseTables(),
  ])

  const tableMap = buildTableMap(tableNames)

  return CHURCH_TABS.map((tab) => {
    const tableName = resolveTableName(tableMap, getTabCandidates(tab))
    const tableExists = Boolean(tableName)
    const hasPermission = hasTabPermission(tab, authorityRow, isAdmin)
    const canView = isAdmin || hasPermission

    return {
      ...tab,
      tableName,
      tableExists,
      hasPermission,
      canView,
    }
  })
}

export async function getChurchTabByIdForUser(
  tabId: string,
  email?: string | null,
  isAdmin = false
) {
  const tabs = await getChurchTabsForUser(email, isAdmin)
  return tabs.find((tab) => tab.id === tabId) ?? null
}

export async function getChurchTabByTableForUser(
  tableName: string,
  email?: string | null,
  isAdmin = false
) {
  const normalized = normalizeToken(tableName)
  const tabs = await getChurchTabsForUser(email, isAdmin)

  return (
    tabs.find(
      (tab) =>
        tab.tableName !== null &&
        normalizeToken(tab.tableName) === normalized
    ) ?? null
  )
}
