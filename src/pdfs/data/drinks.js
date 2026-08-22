import { PDF_FOOTER } from '../constants.js'

export default {
    id: 'drinks',
    dashboardName: 'MENU DRINKS',
    sourcePdf: '/pdf/drinks.pdf',
    template: 'a4',
    title: 'DRINKS',
    date: '',
    footer: PDF_FOOTER,
    pages: [
        {
            showLogo: true,
            showTitle: true,
            showDate: false,
            showFooter: true,
            showCenterLogo: false,
            sections: [
                {
                    id: 'autorais',
                    title: 'AUTORAIS',
                    items: [
                        {
                            id: 'drinks-autoral-1',
                            name: 'KA BRU HONEY',
                            description: 'gin | mel de cacau | limão',
                            price: '57',
                        },
                        {
                            id: 'drinks-autoral-2',
                            name: 'GINGER GIN',
                            description: 'gin | gengibre | limão | tônica',
                            price: '47',
                        },
                        {
                            id: 'drinks-autoral-3',
                            name: 'VANILLA SUNSET',
                            description: 'aperol | gin | fava de baunilha',
                            price: '69',
                        },
                        {
                            id: 'drinks-autoral-4',
                            name: 'BRAZILIAN GOLDEN',
                            description:
                                'limão taiti | limão siciliano | maracujá | baunilha | cachaça',
                            price: '47',
                        },
                        {
                            id: 'drinks-autoral-5',
                            name: 'COCONUT MOJITO',
                            description: 'bacardi ouro | leite de coco | limão',
                            price: '69',
                        },
                    ],
                },
                {
                    id: 'classicos',
                    title: 'CLÁSSICOS',
                    items: [
                        {
                            id: 'drinks-classico-1',
                            name: 'CAIPIRINHA',
                            description: 'vodka 47 | cachaça 37 | sakê 37',
                            price: '',
                        },
                        {
                            id: 'drinks-classico-2',
                            name: 'ESPRESSO MARTINI',
                            description: 'vodka | amarula | espresso',
                            price: '57',
                        },
                        {
                            id: 'drinks-classico-3',
                            name: 'GABRIELA',
                            description: 'maracujá | limão | cachaça de especiarias',
                            price: '47',
                        },
                        {
                            id: 'drinks-classico-4',
                            name: 'NEGRONI',
                            description:
                                'campari | gin | vermute | óleo da casca da laranja',
                            price: '69',
                        },
                        {
                            id: 'drinks-classico-5',
                            name: 'MARGARITA',
                            description: 'tequila | cointreau | limão | borda de sal',
                            price: '57',
                        },
                        {
                            id: 'drinks-classico-6',
                            name: 'DAIQUIRI',
                            description: 'bacardi ouro | sabor maracujá ou limão',
                            price: '49',
                        },
                        {
                            id: 'drinks-classico-7',
                            name: 'MIMOSA',
                            description: 'espumante | suco de laranja',
                            price: '65',
                        },
                        {
                            id: 'drinks-classico-8',
                            name: 'APEROL SPRITZ',
                            description: 'aperol | espumante',
                            price: '55',
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
            showCenterLogo: false,
            sections: [
                {
                    id: 'straight-on-ice',
                    title: 'STRAIGHT ON ICE',
                    titleLines: ['STRAIGHT', 'ON ICE'],
                    items: [
                        { id: 'drinks-ice-1', name: 'WHISKY JACK DANIELS', price: '57' },
                        { id: 'drinks-ice-2', name: 'WHISKY JACK DANIELS honey', price: '63' },
                        { id: 'drinks-ice-3', name: 'VODKA ABSOLUT', price: '67' },
                        { id: 'drinks-ice-4', name: 'CAMPARI', price: '47' },
                        { id: 'drinks-ice-5', name: 'TEQUILA JOSE CUERVO', price: '47' },
                        { id: 'drinks-ice-6', name: 'CACHAÇA ypioca', price: '47' },
                        {
                            id: 'drinks-ice-7',
                            name: 'CACHAÇA de especiarias da casa',
                            price: '55',
                        },
                        {
                            id: 'drinks-ice-8',
                            name: 'CACHAÇA de baunilha da casa',
                            price: '55',
                        },
                        { id: 'drinks-ice-9', name: 'SAKE', price: '37' },
                        { id: 'drinks-ice-10', name: 'GIN HENDRIX', price: '59' },
                        { id: 'drinks-ice-11', name: 'AMARULA', price: '57' },
                    ],
                },
                {
                    id: 'cervejas',
                    title: 'CERVEJAS',
                    items: [
                        { id: 'drinks-beer-1', name: 'HEINEKEN long neck', price: '35' },
                        {
                            id: 'drinks-beer-2',
                            name: 'HEINEKEN long neck | sem álcool',
                            price: '35',
                        },
                        { id: 'drinks-beer-3', name: 'CORONA', price: '35' },
                        { id: 'drinks-beer-4', name: 'MICHELOB ULTRA low kcal', price: '35' },
                        { id: 'drinks-beer-5', name: 'BUDWEISER lata | zero', price: '35' },
                    ],
                },
                {
                    id: 'nao-alcoolicas',
                    title: 'NÃO ALCOÓLICAS',
                    titleLines: ['NÃO', 'ALCOÓLICAS'],
                    items: [
                        { id: 'drinks-soft-1', name: 'SUCO DO DIA', price: '20' },
                        { id: 'drinks-soft-2', name: 'CHÁ DO DIA', price: '20' },
                        { id: 'drinks-soft-3', name: 'GINGER INFUSION TCHAI', price: '30' },
                        { id: 'drinks-soft-4', name: 'LIMONADA SUÍÇA', price: '45' },
                        { id: 'drinks-soft-5', name: 'ELIXIR', price: '20' },
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
            sections: [
                {
                    id: 'basicos',
                    title: 'BÁSICOS',
                    items: [
                        { id: 'drinks-basic-1', name: 'ÁGUA', price: '15' },
                        { id: 'drinks-basic-2', name: 'ÁGUA com gás', price: '15' },
                        { id: 'drinks-basic-3', name: 'ÁGUA DE COCO', price: '20' },
                        { id: 'drinks-basic-4', name: 'COCA COLA', price: '15' },
                        { id: 'drinks-basic-5', name: 'COCA COLA zero', price: '15' },
                        { id: 'drinks-basic-6', name: 'GUARANÁ', price: '15' },
                        { id: 'drinks-basic-7', name: 'GUARANÁ zero', price: '15' },
                        { id: 'drinks-basic-8', name: 'ÁGUA TÔNICA', price: '15' },
                        { id: 'drinks-basic-9', name: 'ÁGUA TÔNICA zero', price: '15' },
                    ],
                },
                {
                    id: 'cafes',
                    title: 'CAFÉS',
                    items: [
                        { id: 'drinks-cafe-1', name: 'café coado', price: '15' },
                        { id: 'drinks-cafe-2', name: 'café espresso', price: '15' },
                        {
                            id: 'drinks-cafe-3',
                            name: 'café espresso com leite',
                            price: '20',
                        },
                        {
                            id: 'drinks-cafe-4',
                            name: 'cappuccino com leite',
                            price: '25',
                        },
                        {
                            id: 'drinks-cafe-5',
                            name: 'com chocolate',
                            price: '35',
                            indent: true,
                        },
                        {
                            id: 'drinks-cafe-6',
                            name: 'cappuccino com leite vegetal',
                            price: '25',
                        },
                        {
                            id: 'drinks-cafe-7',
                            name: 'com baunilha baiana',
                            price: '35',
                            indent: true,
                        },
                    ],
                },
            ],
        },
    ],
}
