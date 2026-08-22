const MONTHS = [
  'JANEIRO',
  'FEVEREIRO',
  'MARÇO',
  'ABRIL',
  'MAIO',
  'JUNHO',
  'JULHO',
  'AGOSTO',
  'SETEMBRO',
  'OUTUBRO',
  'NOVEMBRO',
  'DEZEMBRO',
]

const WEEKDAYS = [
  'DOMINGO',
  'SEGUNDA-FEIRA',
  'TERÇA-FEIRA',
  'QUARTA-FEIRA',
  'QUINTA-FEIRA',
  'SEXTA-FEIRA',
  'SÁBADO',
]

export function formatMenuDate(value = new Date()) {
  const date = value instanceof Date ? value : new Date(value)
  const day = String(date.getDate()).padStart(2, '0')
  return {
    date: `${day}/${MONTHS[date.getMonth()]}/${date.getFullYear()}`,
    day: WEEKDAYS[date.getDay()],
  }
}
