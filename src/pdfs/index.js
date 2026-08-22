import almoco from './data/almoco.js'
import chefstable from './data/chefstable.js'
import drinks from './data/drinks.js'
import jantar from './data/jantar.js'
import manha from './data/manha.js'
import vinhos from './data/vinhos.js'

export const menuPdfs = [almoco, jantar, manha, drinks, vinhos, chefstable]

export const menuPdfById = Object.fromEntries(
    menuPdfs.map((menu) => [menu.id, menu])
)

export const menuPdfByDashboardName = Object.fromEntries(
    menuPdfs.map((menu) => [menu.dashboardName, menu])
)

export function getMenuPdf(key) {
    return menuPdfById[key] || menuPdfByDashboardName[key] || null
}

export { almoco, chefstable, drinks, jantar, manha, vinhos }
