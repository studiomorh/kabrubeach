import { PDF_FOOTER } from '../constants.js'

export default {
    id: 'jantar',
    dashboardName: 'MENU JANTAR',
    sourcePdf: '/pdf/jantar.pdf',
    template: 'a4',
    title: 'JANTAR',
    date: '15.07.26',
    footer: PDF_FOOTER,
    pages: [
        {
            showLogo: true,
            showTitle: true,
            showDate: true,
            showFooter: true,
            showCenterLogo: false,
            sections: [
                {
                    id: 'couvert',
                    title: 'COUVERT',
                    items: [
                        {
                            id: 'jantar-couvert-1',
                            description:
                                'legumes caramelizados na baunilha | coalhada | foaccia grelhada',
                            price: '49',
                        },
                    ],
                },
                {
                    id: 'entradas',
                    title: 'ENTRADAS',
                    items: [
                        {
                            id: 'jantar-entrada-1',
                            description:
                                'tartar de mignon | aioli cítrico | crocante com especiarias',
                            price: '98',
                        },
                        {
                            id: 'jantar-entrada-2',
                            description:
                                'ceviche de olho de boi | leite de tigre de coco | fermentados',
                            price: '83',
                        },
                        {
                            id: 'jantar-entrada-3',
                            description:
                                'camarão grelhado | molho romesco | pangrattato',
                            price: '90',
                        },
                        {
                            id: 'jantar-entrada-4',
                            description:
                                'tofu defumado e grelhado | creme de abóbora | picles de quinoa',
                            price: '72',
                        },
                    ],
                },
                {
                    id: 'principais',
                    title: 'PRINCIPAIS',
                    items: [
                        {
                            id: 'jantar-principal-1',
                            description:
                                'mignon grelhado | arroz negro com sementes | folhas verdes',
                            price: '176',
                        },
                        {
                            id: 'jantar-principal-2',
                            description:
                                'olho de boi | mousseline de banana da terra | pangrattato',
                            price: '160',
                        },
                        {
                            id: 'jantar-principal-3',
                            description:
                                'frutos do mar grelhados | spaghetti | emulsão cítrica',
                            price: '229',
                        },
                        {
                            id: 'jantar-principal-4',
                            description:
                                'risoto de cogumelos | folhas tostadas | aioli de wasabi',
                            price: '127',
                        },
                    ],
                },
                {
                    id: 'sobremesa',
                    title: 'SOBREMESA',
                    items: [
                        {
                            id: 'jantar-sobremesa-1',
                            description:
                                'mousse de chocolate | crumble de chocolate | sable de baunilha',
                            price: '83',
                        },
                    ],
                },
            ],
        },
    ],
}
