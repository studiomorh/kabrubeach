<template>
    <div class="weather-widget mt-6 text-start">
        <div v-if="loading" class="text-[#968473] text-[15px]">
            Carregando previsão...
        </div>

        <div v-else-if="error" class="text-[#968473] text-[15px]">
            Não foi possível carregar a previsão agora. Tente novamente em instantes.
        </div>

        <div v-else>
            <div class="current">
                <div class="flex items-start justify-between gap-4">
                    <div>
                        <h3 class="text-[#3b2f2b] text-[13px] tracking-[3px]">AGORA · CAMPINHOS</h3>
                        <div class="flex items-end gap-3 mt-2">
                            <span class="text-[#3b2f2b] text-[48px] leading-none font-medium">{{ currentTemp }}°</span>
                            <span class="text-[#565656] text-[16px] pb-1">{{ currentLabel }}</span>
                        </div>
                    </div>
                    <div class="text-[#968473] mt-1" aria-hidden="true">
                        <svg v-if="icon === 'sun'" width="42" height="42" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.5">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"
                                stroke-linecap="round" />
                        </svg>
                        <svg v-else-if="icon === 'cloud'" width="42" height="42" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                            <path d="M7 18h10a4 4 0 0 0 0-8 6 6 0 0 0-11.3-1.7A3.5 3.5 0 0 0 7 18z" />
                        </svg>
                        <svg v-else-if="icon === 'rain'" width="42" height="42" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                            <path d="M7 16h10a4 4 0 0 0 0-8 6 6 0 0 0-11.3-1.7A3.5 3.5 0 0 0 7 16z" />
                            <path d="M8 19v2M12 18v3M16 19v2" />
                        </svg>
                        <svg v-else width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.5" stroke-linecap="round">
                            <path d="M5 16h12a3.5 3.5 0 0 0 0-7 5.5 5.5 0 0 0-10.6-1.5A3 3 0 0 0 5 16z" />
                            <path d="M8 8c.4-1.2 1-2 2.2-2.6M16 7.2c.8-.4 1.8-.4 2.6.2" />
                        </svg>
                    </div>
                </div>

                <div class="flex flex-wrap gap-x-5 gap-y-2 mt-4 text-[#968473] text-[15px]">
                    <span>Sensação {{ feelsLike }}°</span>
                    <span>Vento {{ windSpeed }} km/h</span>
                    <span>Umidade {{ humidity }}%</span>
                </div>
            </div>

            <div class="marine mt-6">
                <h3 class="text-[#3b2f2b] text-[13px] tracking-[3px]">MARÉ E MAR</h3>
                <div class="flex flex-col gap-2 mt-3 text-[#968473] text-[15px]">
                    <div class="flex justify-between gap-4">
                        <span>Ondas</span>
                        <span>{{ waveHeight }}</span>
                    </div>
                    <div class="flex justify-between gap-4">
                        <span>Temperatura da água</span>
                        <span>{{ seaTemp }}</span>
                    </div>
                    <div class="flex justify-between gap-4">
                        <span>Preamar</span>
                        <span>{{ highTide }}</span>
                    </div>
                    <div class="flex justify-between gap-4">
                        <span>Baixamar</span>
                        <span>{{ lowTide }}</span>
                    </div>
                </div>
            </div>

            <div class="forecast mt-6">
                <h3 class="text-[#3b2f2b] text-[13px] tracking-[3px]">PRÓXIMOS DIAS</h3>
                <div class="flex justify-between gap-2 mt-3">
                    <div v-for="day in days" :key="day.date" class="flex flex-col items-center flex-1">
                        <span class="text-[#3b2f2b] text-[12px] tracking-[1px]">{{ day.label }}</span>
                        <span class="text-[#3b2f2b] text-[16px] mt-2">{{ day.max }}°</span>
                        <span class="text-[#968473] text-[14px]">{{ day.min }}°</span>
                    </div>
                </div>
            </div>

            <p class="text-[#968473] text-[12px] mt-5 leading-tight">
                Dados de
                <a href="https://open-meteo.com" target="_blank" rel="noopener noreferrer" class="underline">Open-Meteo</a>.
                A maré na costa é aproximada e não substitui a tábua náutica.
            </p>
        </div>
    </div>
</template>

<script>
const LAT = -13.9043
const LON = -38.9679
const TZ = 'America/Bahia'

const WEATHER_LABELS = {
    0: 'Céu limpo',
    1: 'Predominante limpo',
    2: 'Parcialmente nublado',
    3: 'Nublado',
    45: 'Neblina',
    48: 'Neblina',
    51: 'Garoa fraca',
    53: 'Garoa',
    55: 'Garoa forte',
    61: 'Chuva fraca',
    63: 'Chuva',
    65: 'Chuva forte',
    80: 'Pancadas de chuva',
    81: 'Pancadas de chuva',
    82: 'Pancadas fortes',
    95: 'Trovoada',
    96: 'Trovoada',
    99: 'Trovoada'
}

function weatherIcon(code) {
    if (code === 0 || code === 1) return 'sun'
    if (code >= 51) return 'rain'
    if (code === 45 || code === 48) return 'fog'
    return 'cloud'
}

function weatherLabel(code) {
    return WEATHER_LABELS[code] || 'Condição variável'
}

function formatHour(iso) {
    if (!iso) return '—'
    const match = String(iso).match(/T(\d{2}:\d{2})/)
    return match ? match[1] : '—'
}

function weekdayLabel(iso, index) {
    if (index === 0) return 'HOJE'
    const [year, month, day] = iso.split('-').map(Number)
    const date = new Date(Date.UTC(year, month - 1, day, 15))
    return date.toLocaleDateString('pt-BR', {
        weekday: 'short',
        timeZone: TZ
    }).replace('.', '').toUpperCase()
}

function tideExtremes(times, levels) {
    if (!times?.length || !levels?.length) return { high: null, low: null }

    let high = { time: times[0], value: levels[0] }
    let low = { time: times[0], value: levels[0] }

    times.forEach((time, i) => {
        const value = levels[i]
        if (value == null) return
        if (value > high.value) high = { time, value }
        if (value < low.value) low = { time, value }
    })

    return { high, low }
}

export default {
    data() {
        return {
            loading: true,
            error: false,
            currentTemp: null,
            feelsLike: null,
            humidity: null,
            windSpeed: null,
            currentLabel: '',
            icon: 'sun',
            waveHeight: '—',
            seaTemp: '—',
            highTide: '—',
            lowTide: '—',
            days: []
        }
    },
    mounted() {
        this.loadWeather()
    },
    methods: {
        async loadWeather() {
            this.loading = true
            this.error = false

            const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=${encodeURIComponent(TZ)}&forecast_days=5`
            const marineUrl = `https://marine-api.open-meteo.com/v1/marine?latitude=${LAT}&longitude=${LON}&current=wave_height,sea_surface_temperature,sea_level_height_msl&hourly=sea_level_height_msl&timezone=${encodeURIComponent(TZ)}&forecast_days=1&cell_selection=sea`

            try {
                const [forecastRes, marineRes] = await Promise.all([
                    fetch(forecastUrl),
                    fetch(marineUrl)
                ])

                if (!forecastRes.ok) throw new Error('forecast')

                const forecast = await forecastRes.json()
                const marine = marineRes.ok ? await marineRes.json() : null

                const current = forecast.current || {}
                this.currentTemp = Math.round(current.temperature_2m)
                this.feelsLike = Math.round(current.apparent_temperature)
                this.humidity = Math.round(current.relative_humidity_2m)
                this.windSpeed = Math.round(current.wind_speed_10m)
                this.currentLabel = weatherLabel(current.weather_code)
                this.icon = weatherIcon(current.weather_code)

                this.days = (forecast.daily?.time || []).map((date, index) => ({
                    date,
                    label: weekdayLabel(date, index),
                    max: Math.round(forecast.daily.temperature_2m_max[index]),
                    min: Math.round(forecast.daily.temperature_2m_min[index])
                }))

                if (marine?.current) {
                    this.waveHeight = marine.current.wave_height != null
                        ? `${marine.current.wave_height.toFixed(1)} m`
                        : '—'
                    this.seaTemp = marine.current.sea_surface_temperature != null
                        ? `${Math.round(marine.current.sea_surface_temperature)}°`
                        : '—'

                    const tides = tideExtremes(marine.hourly?.time, marine.hourly?.sea_level_height_msl)
                    this.highTide = formatHour(tides.high?.time)
                    this.lowTide = formatHour(tides.low?.time)
                }
            } catch {
                this.error = true
            } finally {
                this.loading = false
            }
        }
    }
}
</script>
