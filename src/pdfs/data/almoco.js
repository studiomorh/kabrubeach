import { PDF_FOOTER } from '../constants.js'

export default {
    id: 'almoco',
    dashboardName: 'MENU ALMOÇO',
    sourcePdf: '/pdf/almoco.pdf',
    template: 'a4',
    title: 'ALMOÇO',
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
                    id: 'entrada',
                    title: 'ENTRADAS',
                    items: [
                        {
                            id: 'almoco-entrada-1',
                            description: 'pão de queijo | toffee de alho assado',
                            price: '76',
                        },
                        {
                            id: 'almoco-entrada-2',
                            description:
                                'milanesa de mignon | fonduta de parmesão | pangrattato',
                            price: '98',
                        },
                        {
                            id: 'almoco-entrada-3',
                            description: 'chicken wings | barbecue de goiabada',
                            price: '89',
                        },
                        {
                            id: 'almoco-entrada-4',
                            description: 'duo de pastel queijo | camarão',
                            price: '96',
                        },
                        {
                            id: 'almoco-entrada-5',
                            description:
                                'crudo de peixe | cítrico de mel de cacau | pesto de sementes',
                            price: '83',
                        },
                    ],
                },
                {
                    id: 'saladas',
                    title: 'SALADAS',
                    items: [
                        {
                            id: 'almoco-salada-1',
                            description: 'cesar salad | camarão',
                            price: '136',
                        },
                        {
                            id: 'almoco-salada-2',
                            description: 'poke do dia',
                            price: '121',
                        },
                    ],
                },
                {
                    id: 'sanduiches',
                    title: 'SANDUICHES',
                    items: [
                        {
                            id: 'almoco-sanduiche-1',
                            description:
                                'mignon 80gr | cebola caramelizada | queijo mineiro',
                            price: '98',
                        },
                        {
                            id: 'almoco-sanduiche-2',
                            description: 'mc fish | aioli de wasabi | folhas verdes',
                            price: '83',
                        },
                        {
                            id: 'almoco-sanduiche-3',
                            description: 'mini acarajé | camarão grelhado',
                            price: '90',
                        },
                    ],
                },
                {
                    id: 'principal-compartilhar',
                    title: 'PRINCIPAL PARA COMPARTILHAR',
                    titleLines: ['PRINCIPAL PARA', 'COMPARTILHAR'],
                    items: [
                        {
                            id: 'almoco-share-1',
                            description: 'moqueca de peixe',
                            price: '254',
                        },
                        {
                            id: 'almoco-share-2',
                            description: 'moqueca frutos do mar',
                            price: '321',
                        },
                        {
                            id: 'almoco-share-3',
                            description: 'bobó de camarão',
                            price: '313',
                        },
                        {
                            id: 'almoco-share-4',
                            description: 'arroz caldoso de polvo | aioli defumado',
                            price: '315',
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
                    id: 'principal-individuais',
                    title: 'PRINCIPAL INDIVIDUAIS',
                    titleLines: ['PRINCIPAL', 'INDIVIDUAIS'],
                    items: [
                        {
                            id: 'almoco-individual-1',
                            description:
                                'peixe branco | folhas verdes grelhadas | aioli de limão',
                            price: '160',
                        },
                        {
                            id: 'almoco-individual-2',
                            description:
                                'mignon grelhado | batata frita com ervas frescas',
                            price: '176',
                        },
                        {
                            id: 'almoco-individual-3',
                            description:
                                'spaghetti de frutos do mar | vinho branco com limão siciliano',
                            price: '228',
                        },
                    ],
                },
                {
                    id: 'guarnicoes',
                    title: 'GUARNIÇÕES | ON SIDE',
                    titleLines: ['GUARNIÇÕES', '| ON SIDE'],
                    items: [
                        { id: 'almoco-side-1', description: 'arroz branco', price: '69' },
                        { id: 'almoco-side-2', description: 'arroz de coco', price: '72' },
                        { id: 'almoco-side-3', description: 'batata frita', price: '72' },
                        {
                            id: 'almoco-side-4',
                            description: 'batata frita trufada',
                            price: '79',
                        },
                        {
                            id: 'almoco-side-5',
                            description: 'chips de batata doce',
                            price: '72',
                        },
                        { id: 'almoco-side-6', description: 'focaccia', price: '39' },
                    ],
                },
                {
                    id: 'sobremesa',
                    title: 'SOBREMESA',
                    items: [
                        {
                            id: 'almoco-sobremesa-1',
                            description:
                                'mousse de chocolate | crumble de especiarias | sablet de baunilha',
                            price: '98',
                        },
                        {
                            id: 'almoco-sobremesa-2',
                            description:
                                'sorbet de mel de cacau com cumaru | frutas da estação',
                            price: '83',
                        },
                        {
                            id: 'almoco-sobremesa-3',
                            description:
                                'sorvete de baunilha da mata atlântica | bolo de leite grelhado | sablet de chocolate branco',
                            price: '90',
                        },
                    ],
                },
            ],
        },
    ],
}
