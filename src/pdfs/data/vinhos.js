import { PDF_CORKAGE, PDF_FOOTER } from '../constants.js'

export default {
    id: 'vinhos',
    dashboardName: 'MENU VINHOS',
    sourcePdf: '/pdf/vinhos.pdf',
    template: 'a4',
    title: 'VINHOS',
    date: '',
    footer: PDF_FOOTER,
    corkage: PDF_CORKAGE,
    pages: [
        {
            showLogo: true,
            showTitle: true,
            showDate: false,
            showFooter: true,
            showCenterLogo: true,
            showCorkage: true,
            sections: [
                {
                    id: 'branco',
                    title: 'BRANCO',
                    items: [
                        {
                            id: 'vinhos-branco-1',
                            name: 'D.V CATENA CHARDONNAY',
                            subtitle: 'ARGENTINA 2022',
                            price: '378',
                        },
                        {
                            id: 'vinhos-branco-2',
                            name: 'BEBBER SAUVIGNON BLANC',
                            subtitle: 'BRASIL 2024',
                            price: '249',
                        },
                        {
                            id: 'vinhos-branco-3',
                            name: 'UVVA SAUVIGNON BLANC',
                            subtitle: 'CHAPADA DIAMANTINA, BRAZIL 2024',
                            price: '358',
                        },
                        {
                            id: 'vinhos-branco-4',
                            name: 'UVVA CHARDONNAY',
                            subtitle: 'CHAPADA DIAMANTINA, BRAZIL 2023',
                            price: '399',
                        },
                        {
                            id: 'vinhos-branco-5',
                            name: 'CASA EVA CHARDONNAY',
                            subtitle: 'BRASIL 2026',
                            price: '208',
                        },
                        {
                            id: 'vinhos-branco-6',
                            name: 'CASA EVA SAUVIGNON BLANC',
                            subtitle: 'BRASIL 2026',
                            price: '208',
                        },
                        {
                            id: 'vinhos-branco-7',
                            name: 'CASA EVA VIOGNIER',
                            subtitle: 'BRASIL 2026',
                            price: '268',
                        },
                    ],
                },
                {
                    id: 'rose',
                    title: 'ROSÉ',
                    items: [
                        {
                            id: 'vinhos-rose-1',
                            name: 'BEBBER MARSELAN & MALBEC',
                            subtitle: 'BRASIL 2024',
                            price: '249',
                        },
                        {
                            id: 'vinhos-rose-2',
                            name: 'CASA EVA ROSÉ',
                            subtitle: 'BRASIL 2026',
                            price: '186',
                        },
                    ],
                },
            ],
        },
        {
            showLogo: false,
            showTitle: false,
            showDate: false,
            showFooter: true,
            showCenterLogo: true,
            showCorkage: true,
            sections: [
                {
                    id: 'tinto',
                    title: 'TINTO',
                    items: [
                        {
                            id: 'vinhos-tinto-1',
                            name: 'D.V CATENA CABERNET - MALBEC',
                            subtitle: 'ARGENTINA 2024',
                            price: '319',
                        },
                        {
                            id: 'vinhos-tinto-2',
                            name: 'LATITUD 33 MALBEC',
                            subtitle: 'ARGENTINA 2024',
                            price: '189',
                        },
                        {
                            id: 'vinhos-tinto-3',
                            name: 'LA TOURNÉE SYRAH',
                            subtitle: 'FRANÇA 2022',
                            price: '325',
                        },
                        {
                            id: 'vinhos-tinto-4',
                            name: 'GOES 2000 BLEND',
                            subtitle: 'BRASIL 2023',
                            price: '149',
                        },
                        {
                            id: 'vinhos-tinto-5',
                            name: 'SMASH MALBEC',
                            subtitle: 'ARGENTINA 2024',
                            price: '136',
                        },
                        {
                            id: 'vinhos-tinto-6',
                            name: 'CASA EVA PINOT NOIR',
                            subtitle: 'BRASIL 2026',
                            price: '268',
                        },
                    ],
                },
                {
                    id: 'espumante',
                    title: 'ESPUMANTE / CHAMPAGNE',
                    align: 'center',
                    sidebarTitle: 'BRANCO',
                    items: [
                        {
                            id: 'vinhos-espumante-1',
                            name: 'CHANDON RÉSERVE BRUT',
                            subtitle: 'BRASIL - 750ml',
                            price: '378',
                        },
                        {
                            id: 'vinhos-espumante-2',
                            name: 'CHANDON RÉSERVE BRUT MINI',
                            subtitle: 'BRASIL - 750ml',
                            price: '249',
                        },
                    ],
                },
            ],
        },
    ],
}
