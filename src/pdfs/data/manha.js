import { BREAKFAST_FOOTER } from '../constants.js'

export default {
    id: 'manha',
    dashboardName: 'MENU CAFÉ DA MANHÃ',
    sourcePdf: '/pdf/manha.pdf',
    template: 'breakfast',
    title: 'MENU CAFÉ DA MANHÃ',
    footer: BREAKFAST_FOOTER,
    columns: [
        {
            id: 'comidas',
            heading: 'COMIDAS',
            intro:
                'Uma seleção cuidadosa de frutas da estação, pães artesanais e pratos preparados na hora — para abrir o dia com leveza e sofisticação.',
            sections: [
                {
                    id: 'frutas',
                    title: 'FRUTAS',
                    items: [
                        {
                            id: 'manha-frutas-1',
                            name: 'Seleção de frutas exóticas da estação',
                            description: 'Prato de frutas tropicais - serve duas pessoas',
                        },
                    ],
                },
                {
                    id: 'tabua',
                    title: 'TÁBUA ARTESANAL PARA COMPARTILHAR',
                    items: [
                        {
                            id: 'manha-tabua-1',
                            name: 'Pães do dia, de produção artesanal da casa, acompanhados de manteiga e geleia',
                            description: 'Seleção de doces · Seleção de frios',
                        },
                    ],
                },
                {
                    id: 'pratos',
                    title: 'PRATOS À ESCOLHA - 1 por pessoa',
                    groupLabel: 'OVOS CAIPIRA',
                    groupTag: 'SIGNATURE',
                    items: [
                        { id: 'manha-ovos-1', name: 'Omelete plain' },
                        { id: 'manha-ovos-2', name: 'Omelete com recheio' },
                        { id: 'manha-ovos-3', name: 'Ovos mexidos' },
                        { id: 'manha-ovos-4', name: 'Sunny side up' },
                        { id: 'manha-ovos-5', name: 'Ovos cozidos' },
                        { id: 'manha-ovos-6', name: 'Ovos com cuscuz' },
                    ],
                },
                {
                    id: 'tapioca',
                    title: 'TAPIOCA ARTESANAL',
                    divider: true,
                    items: [
                        { id: 'manha-tapioca-1', name: 'Tapioca | Ovo' },
                        { id: 'manha-tapioca-2', name: 'Tapioca com recheio' },
                        {
                            id: 'manha-tapioca-3',
                            description: 'Recheios: presunto parma | queijo | tomate',
                        },
                    ],
                },
            ],
        },
        {
            id: 'bebidas',
            heading: 'BEBIDAS',
            intro:
                'Uma seleção de cafés, chás e sucos frescos, com smoothies preparados na hora com frutas da estação.',
            sections: [
                {
                    id: 'quentes',
                    title: 'BEBIDAS QUENTES - à escolha',
                    items: [
                        { id: 'manha-quente-1', name: 'Café coado' },
                        { id: 'manha-quente-2', name: 'Café expresso' },
                        { id: 'manha-quente-3', name: 'Capuccino com leite' },
                        { id: 'manha-quente-4', name: 'Capuccino com leite vegetal' },
                        { id: 'manha-quente-5', name: 'Chá' },
                    ],
                },
                {
                    id: 'frescas',
                    title: 'BEBIDAS FRESCAS - à escolha',
                    items: [
                        { id: 'manha-fresca-1', name: 'Suco detox' },
                        { id: 'manha-fresca-2', name: 'Laranja fresca' },
                    ],
                },
                {
                    id: 'smoothies',
                    title: 'SMOOTHIES DO DIA - 1 por pessoa',
                    items: [
                        {
                            id: 'manha-smoothie-1',
                            name: 'Açaí',
                            description: 'açaí · frutas vermelhas · banana · mel',
                        },
                        {
                            id: 'manha-smoothie-2',
                            name: 'Mango Lacie',
                            description: 'manga · iogurte · mel',
                        },
                        {
                            id: 'manha-smoothie-3',
                            name: 'Morango Mix',
                            description: 'morango · mel de cacau · leite de aveia',
                        },
                        {
                            id: 'manha-smoothie-4',
                            name: 'Açaí',
                            description:
                                'maracujá · manga · laranja · gengibre · mel · cúrcuma',
                        },
                    ],
                },
            ],
        },
    ],
}
