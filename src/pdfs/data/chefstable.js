import { PDF_FOOTER } from '../constants.js'

export default {
    id: 'chefstable',
    dashboardName: 'CHEFS TABLE',
    sourcePdf: '/pdf/chefstable.pdf',
    template: 'chefs-table',
    title: 'CHEFS TABLE',
    hostedBy: 'HOSTED BY LUCAS OLIVEIRA',
    guests: 'Nome & Nome',
    date: '10.10.2026',
    footer: PDF_FOOTER,
    courses: [
        {
            id: 'chefs-course-1',
            title: 'LOREM IPSUM',
            description: 'Opção 1 | Opção 2 | Opção 3',
        },
        {
            id: 'chefs-course-2',
            title: 'LOREM IPSUM',
            description: 'Opção 1 | Opção 2 | Opção 3',
        },
        {
            id: 'chefs-course-3',
            title: 'LOREM IPSUM',
            description: 'Opção 1 | Opção 2 | Opção 3',
        },
        {
            id: 'chefs-course-4',
            title: 'LOREM IPSUM',
            description: 'Opção 1 | Opção 2 | Opção 3',
        },
        {
            id: 'chefs-course-5',
            title: 'LOREM IPSUM',
            description: 'Opção 1 | Opção 2 | Opção 3',
        },
        {
            id: 'chefs-course-6',
            title: 'LOREM IPSUM',
            description: 'Opção 1 | Opção 2 | Opção 3',
        },
    ],
}
