export const MENU_OPTIONS = [
  { id: 'almoco', dashboardName: 'MENU ALMOÇO', tabLabel: 'ALMOÇO' },
  { id: 'jantar', dashboardName: 'MENU JANTAR', tabLabel: 'JANTAR' },
  { id: 'manha', dashboardName: 'MENU CAFÉ DA MANHÃ', tabLabel: 'MANHÃ' },
  { id: 'drinks', dashboardName: 'MENU DRINKS', tabLabel: 'DRINKS' },
  { id: 'vinhos', dashboardName: 'MENU VINHOS', tabLabel: 'VINHOS' },
  { id: 'chefstable', dashboardName: 'CHEFS TABLE', tabLabel: 'CHEFS TABLE' },
]

export const menuByDashboardName = Object.fromEntries(
  MENU_OPTIONS.map((menu) => [menu.dashboardName, menu])
)

export const menuById = Object.fromEntries(MENU_OPTIONS.map((menu) => [menu.id, menu]))
