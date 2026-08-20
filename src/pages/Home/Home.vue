<template>

    <div class="hero">
        <div class="overlay items-center pb-30 flex flex-col justify-end">
            <img src="/src/assets/images/nome.svg" alt="Logo" class="logo w-[180px] h-auto text-white" />
            <div class="beach tracking-[3px] text-white pt-2 text-[18px]">
                BEACH
            </div>
            <span class="line w-[110px] h-[1px] bg-white mt-3 mb-3"></span>
            <div class="beach tracking-[3px] text-white pt-2 text-[23px]">
                GUIA
            </div>

            <div class="arrow-down">
                <svg width="18" height="11" viewBox="0 0 18 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.5 1.5L9 8.5L16.5 1.5" stroke="white" stroke-width="3" stroke-linecap="round" />
                </svg>

            </div>
        </div>
        <div class="hero-content"></div>
    </div>


    <HeaderNav class="w-full" />


    <div class="content">
        <div class="section1">
            <button class="btn-primary">RESTAURANTE</button>
            <button class="btn-secondary">CONHECER</button>
        </div>
        <div class="section2 mt-5 ">
            <h4 class="text-start">
                O KA BRU Beach é um hotel boutique de seis quartos, à beira-mar. Com seus detalhes busca criar uma
                atmosfera
                casual que faz você se sentir em casa. Situado em meio a um encantador jardim tropical, disfrute da
                natureza em
                toda sua riqueza.
            </h4>
        </div>





        <div class="section3 mt-12 items-start">
            <h2 class="title">Como Chegar</h2>
            <h4 class="text-start text-[#565656] mt-5">O KA BRU Beach está localizado em uma área rural.
                <span class="font-semibold"> Na estrada até
                    Campinhos não há
                    sinal de internet.</span>
            </h4>
            <button class="btn-dark w-full mt-5">BAIXE AS INSTRUÇÕES OFF-LINE</button>
        </div>

        <div class="section4 mt-12 items-start">
            <h2 class="title">Funcionamento</h2>
            <div class="stuff pl-5 text-start text-[18px] flex flex-col gap-5 mt-6 text-[#565656]">
                <li>Recepção / 06:00h - 22:00h</li>
                <li>Check-in / a partir das 14:00h</li>
                <li>Check-out / até 11:00h</li>
                <li>Limpeza de quarto / 06:00h - 14:00h</li>
                <li>Café da manhã / 07:30h - 10:00h</li>
                <li>Almoço / 13:00h - 17:00h</li>
                <li>Café da tarde / 16:00h - 18:00h</li>
                <li>Jantar / 19:30h - 22:00h</li>
                <li>Bar / 11:00h - 22:00h</li>
            </div>
        </div>

        <div class="w-full flex justify-center items-center mt-12">
            <div class="line w-[110px] h-[1px] bg-[#565656] mt-3 mb-3"></div>
        </div>

        <div class="section5 mt-8" id="experience">
            <h2 class="title">Experiência KA BRU</h2>

            <div class="experience">
                <h3 class="text-start text-[#3b2f2b] text-[19px] tracking-[4px] mt-5">STAND UP PADDLE</h3>
                <div class="hora flex items-center gap-2 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7.5" cy="7.5" r="6.75" stroke="#968473" stroke-width="1.5" />
                        <path d="M10.5 10L7.5 8.5V3.5" stroke="#968473" stroke-width="1.5" stroke-linecap="round" />
                    </svg>

                    <h3 class="text-[#565656]">06:00h - 18:00h</h3>
                </div>

                <button class="btn-primary mt-4 tracking-[2px]">RESERVAR STAND-UP</button>

            </div>

            <div class="experience">
                <h3 class="text-start text-[#3b2f2b] text-[19px] tracking-[4px] mt-5">MASSOTERAPIA</h3>
                <div class="hora flex items-center gap-2 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7.5" cy="7.5" r="6.75" stroke="#968473" stroke-width="1.5" />
                        <path d="M10.5 10L7.5 8.5V3.5" stroke="#968473" stroke-width="1.5" stroke-linecap="round" />
                    </svg>

                    <h3 class="text-[#565656]">Horários agendados</h3>
                </div>

                <button class="btn-primary mt-4 tracking-[2px]">AGENDAR MASSOTERAPIA</button>

            </div>

            <div class="experience">
                <h3 class="text-start text-[#3b2f2b] text-[19px] tracking-[4px] mt-5">AULAS DE IOGA</h3>
                <div class="hora flex items-center gap-2 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7.5" cy="7.5" r="6.75" stroke="#968473" stroke-width="1.5" />
                        <path d="M10.5 10L7.5 8.5V3.5" stroke="#968473" stroke-width="1.5" stroke-linecap="round" />
                    </svg>

                    <h3 class="text-[#565656]">Horários agendados</h3>
                </div>

                <button class="btn-primary mt-4 tracking-[2px]">AGENDAR AULA</button>
                <button class="btn-secondary mt-4 tracking-[2px]">VER OPÇÕES DE MASSOTERAPIA/IOGA</button>

            </div>

            <div class="experience">
                <h3 class="text-start text-[#3b2f2b] text-[19px] tracking-[4px] mt-5">SERVIÇOS DE TRASLADO</h3>
                <div class="hora flex items-center gap-2 mt-2">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="7.5" cy="7.5" r="6.75" stroke="#968473" stroke-width="1.5" />
                        <path d="M10.5 10L7.5 8.5V3.5" stroke="#968473" stroke-width="1.5" stroke-linecap="round" />
                    </svg>

                    <h3 class="text-[#565656]">06:00h - 22:00h</h3>
                </div>

                <button class="btn-primary mt-4 tracking-[2px]">RESERVAR TAXI</button>
                <button class="btn-primary mt-4 tracking-[2px]">RESERVAR BARQUINHO</button>

            </div>

        </div>

        <div class="w-full flex justify-center items-center mt-12">
            <div class="line w-[110px] h-[1px] bg-[#565656] mt-3 mb-3"></div>
        </div>

        <div class="section5 mt-8" id="day-use">
            <h2 class="title">Day Use</h2>
            <h4 class="text-start mt-5">
                Conheça nossa outra unidade: KA BRU 1100, localizado em outra região da Península;
                Cassange.
            </h4>
            <h4 class="text-start mt-2">
                A opção de Day Use está aberta para todos que desejem aproveitar a tarde na beira da praia de Cassange,
                descobrir novos drinks e assistir o pôr-do-sol de Stand Up Paddle na Lagoa.
            </h4>

            <div class="info-table mt-4">

                <div class="flex gap-2 mt-3 items-center">
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.75" y="1.94922" width="10.5" height="12.9" stroke="#968473" stroke-width="1.5" />
                        <rect x="3.41797" y="0.75" width="5.16667" height="3.3" stroke="#968473" stroke-width="1.5" />
                    </svg>

                    <h3 class="text-[#968473]">13:00h às 17:00h - Almoço</h3>
                </div>

                <div class="flex gap-2 mt-2 items-center">
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.75" y="1.94922" width="10.5" height="12.9" stroke="#968473" stroke-width="1.5" />
                        <rect x="3.41797" y="0.75" width="5.16667" height="3.3" stroke="#968473" stroke-width="1.5" />
                    </svg>

                    <h3 class="text-[#968473]">19:00h às 21:30h - Jantar</h3>
                </div>


                <div class="flex gap-2 mt-2 items-center">
                    <h3 class="text-[20px] font-semibold">$</h3>
                    <h3 class="text-[#968473]">Consumação mínima R$ 250</h3>
                </div>


                <div class="flex gap-2 mt-2 items-center">
                    <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="13" height="14" fill="#968473" />
                        <rect x="12.5" y="10.5" width="3" height="3" transform="rotate(90 12.5 10.5)" fill="#968473"
                            stroke="white" />
                    </svg>

                    <h3 class="text-[#968473]">Reserva obrigatória</h3>
                </div>

                <h3 class="text-start text-[#3b2f2b] font-medium text-[21px] tracking-[3px] mt-8">KA BRU 1100</h3>

                <div class="fotos flex flex-col gap-2 mt-4">
                    <img src="/src/assets/images/fotos/1100-6.webp" alt="Restaurante" class="w-full h-auto">
                    <div class="flex flex-col gap-2">
                        <img src="/src/assets/images/fotos/1100-1.webp" alt="Restaurante" class="w-full h-auto">
                        <img src="/src/assets/images/fotos/1100-2.webp" alt="Restaurante" class="w-full h-auto">
                        <img src="/src/assets/images/fotos/1100-3.webp" alt="Restaurante" class="w-full h-auto">
                    </div>
                </div>

                <button class="btn-primary mt-4 tracking-[2px]">RESERVAR DAY USE</button>
            </div>
        </div>


        <div class="w-full flex justify-center items-center mt-12">
            <div class="line w-[110px] h-[1px] bg-[#565656] mt-3 mb-3"></div>
        </div>



        <div class="section6 mt-12" id="restaurant">
            <div class="fotos flex flex-col gap-2 mb-8">
                <img src="/src/assets/images/fotos/restaurante1.webp" alt="Restaurante" class="w-full h-auto">
                <div class="flex gap-2">
                    <img src="/src/assets/images/fotos/restaurante.webp" alt="Restaurante" class="w-full h-auto">
                    <img src="/src/assets/images/fotos/restaurante2.webp" alt="Restaurante" class="w-full h-auto">
                </div>
            </div>
            <h2 class="title">Restaurante</h2>
            <h4 class="text-start mt-3 text-[#565656]">
                Culinária brasileira integrada com a gastronomia clássica utilizando
                ingredientes locais e frescos. Do café da manhã ao jantar, o restaurante do Ka Bru
                procura atender a todos com um menu sustentável e personalizado, que muda diariamente
                de acordo com a disponibilidade dos nossos produtos.
            </h4>


            <!-- CAFÉ DA MANHÃ -->
            <div class="breakfast">
                <h3 class="text-start text-[#3b2f2b] text-[20px] tracking-[4px] mt-10">CAFÉ DA MANHÃ</h3>
                <h4 class="text-start mt-3 text-[#565656]">
                    Nosso café da manhã é personalizado diariamente, com tábuas de pães e frios,
                    bolos e opções a la carte. Nossa produção é 100% artesanal, utilizando produtos
                    frescos e locais.
                </h4>

                <div class="info-table mt-4">

                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="6.75" stroke="#968473" stroke-width="1.5" />
                            <path d="M10.5 10L7.5 8.5V3.5" stroke="#968473" stroke-width="1.5" stroke-linecap="round" />
                        </svg>

                        <h3 class="text-[#968473]">7:30h - 10:00h</h3>
                    </div>

                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.75 9.75H4.75V11.75V13.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                            <path d="M13.75 4.75L9.75 4.75L9.75 2.75L9.75 0.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                            <path d="M4.75 0.75L4.75 4.75L2.75 4.75L0.75 4.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                            <path d="M9.75 13.75L9.75 9.75L11.75 9.75L13.75 9.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                        </svg>


                        <h3 class="text-[#968473]">Café continental</h3>
                    </div>


                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.75" y="1.94922" width="10.5" height="12.9" stroke="#968473" stroke-width="1.5" />
                            <rect x="3.41797" y="0.75" width="5.16667" height="3.3" stroke="#968473"
                                stroke-width="1.5" />
                        </svg>
                        <h3 class="text-[#968473]">Pedidos à la carte</h3>

                    </div>
                    <div class="flex flex-col gap-1 ml-7 mt-2 text-start">
                        <li class="text-[#968473]">Sucos</li>
                        <li class="text-[#968473]">Frutas</li>
                        <li class="text-[#968473]">Pães e Acompanhamentos</li>
                        <li class="text-[#968473]">Pratos do dia</li>
                        <li class="text-[#968473]">Bolos e doces</li>
                        <li class="text-[#968473]">Cafés e chás</li>
                    </div>

                    <button class="btn-secondary w-full mt-4">VER CARDÁPIO</button>

                </div>
            </div>

            <!-- CAFÉ DA TARDE -->
            <div class="afternoon">
                <h3 class="text-start text-[#3b2f2b] text-[20px] tracking-[4px] mt-10">CAFÉ DA TARDE</h3>
                <h4 class="text-start mt-3 text-[#565656]">
                    Convidamos você a desfrutar do nosso café da tarde com bolos únicos todos os dias.
                </h4>

                <div class="info-table mt-4">
                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="6.75" stroke="#968473" stroke-width="1.5" />
                            <path d="M10.5 10L7.5 8.5V3.5" stroke="#968473" stroke-width="1.5" stroke-linecap="round" />
                        </svg>
                        <h3 class="text-[#968473]">16:00h - 18:00h</h3>
                    </div>

                    <div class="fotos flex flex-col gap-2 mt-4">
                        <img src="/src/assets/images/fotos/tarde1.webp" alt="Restaurante" class="w-full h-auto">
                        <div class="flex gap-2">
                            <img src="/src/assets/images/fotos/tarde2.webp" alt="Restaurante" class="w-full h-auto">
                            <img src="/src/assets/images/fotos/tarde5.webp" alt="Restaurante" class="w-full h-auto">
                        </div>
                    </div>
                </div>

            </div>


            <!-- ALMOÇO -->
            <div class="lunch">
                <h3 class="text-start text-[#3b2f2b] text-[20px] tracking-[4px] mt-10">ALMOÇO</h3>
                <h4 class="text-start mt-3 text-[#565656]">
                    Desfrute dos pool snacks na piscina ou na área da praia, ou reserve um horário
                    para aproveitar a área do restaurante.
                </h4>

                <div class="info-table mt-4">

                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="6.75" stroke="#968473" stroke-width="1.5" />
                            <path d="M10.5 10L7.5 8.5V3.5" stroke="#968473" stroke-width="1.5" stroke-linecap="round" />
                        </svg>

                        <h3 class="text-[#968473]">13:00h - 17:00h</h3>
                    </div>

                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.75 9.75H4.75V11.75V13.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                            <path d="M13.75 4.75L9.75 4.75L9.75 2.75L9.75 0.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                            <path d="M4.75 0.75L4.75 4.75L2.75 4.75L0.75 4.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                            <path d="M9.75 13.75L9.75 9.75L11.75 9.75L13.75 9.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                        </svg>


                        <h3 class="text-[#968473]">Menu diário</h3>
                    </div>


                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.75" y="1.94922" width="10.5" height="12.9" stroke="#968473" stroke-width="1.5" />
                            <rect x="3.41797" y="0.75" width="5.16667" height="3.3" stroke="#968473"
                                stroke-width="1.5" />
                        </svg>
                        <h3 class="text-[#968473]">Pedidos à la carte</h3>


                    </div>
                    <div class="flex flex-col gap-1 ml-7 mt-2 text-start">
                        <li class="text-[#968473]">Pool Snacks</li>
                        <li class="text-[#968473]">Entradas</li>
                        <li class="text-[#968473]">Principais</li>
                        <li class="text-[#968473]">Sobremesa</li>
                    </div>

                    <button class="btn-secondary w-full mt-4">CARDÁPIO DO DIA</button>
                    <button class="btn-primary w-full mt-2">RESERVAR PEDIDO DE ALMOÇO</button>

                </div>
            </div>



            <!-- JANTAR -->
            <div class="dinner">
                <h3 class="text-start text-[#3b2f2b] text-[20px] tracking-[4px] mt-10">JANTAR</h3>
                <h4 class="text-start mt-3 text-[#565656]">
                    Além dos jantares especiais, o menu diário conta sempre com ingredientes e produtos frescos do dia.
                </h4>

                <div class="info-table mt-4">

                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="7.5" cy="7.5" r="6.75" stroke="#968473" stroke-width="1.5" />
                            <path d="M10.5 10L7.5 8.5V3.5" stroke="#968473" stroke-width="1.5" stroke-linecap="round" />
                        </svg>

                        <h3 class="text-[#968473]">19:30h - 22:00h</h3>
                    </div>

                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.75 9.75H4.75V11.75V13.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                            <path d="M13.75 4.75L9.75 4.75L9.75 2.75L9.75 0.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                            <path d="M4.75 0.75L4.75 4.75L2.75 4.75L0.75 4.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                            <path d="M9.75 13.75L9.75 9.75L11.75 9.75L13.75 9.75" stroke="#968473" stroke-width="1.5"
                                stroke-linecap="round" />
                        </svg>


                        <h3 class="text-[#968473]">Menu diário</h3>
                    </div>


                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.75" y="1.94922" width="10.5" height="12.9" stroke="#968473" stroke-width="1.5" />
                            <rect x="3.41797" y="0.75" width="5.16667" height="3.3" stroke="#968473"
                                stroke-width="1.5" />
                        </svg>
                        <h3 class="text-[#968473]">Pedidos à la carte</h3>


                    </div>


                    <div class="flex gap-2 mt-2 items-center">
                        <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.75" y="1.94922" width="10.5" height="12.9" stroke="#968473" stroke-width="1.5" />
                            <rect x="3.41797" y="0.75" width="5.16667" height="3.3" stroke="#968473"
                                stroke-width="1.5" />
                        </svg>
                        <h3 class="text-[#968473]">Reserva obrigatória</h3>


                    </div>


                    <div class="flex flex-col gap-1 ml-7 mt-2 text-start">
                        <li class="text-[#968473]">Entradas</li>
                        <li class="text-[#968473]">Principais</li>
                        <li class="text-[#968473]">Sobremesas</li>
                        <li class="text-[#968473]">Menu degustação</li>
                        <li class="text-[#968473]">Sobremesas</li>
                        <li class="text-[#968473]">Harmonização de vinhos</li>

                    </div>

                    <h4 class="text-start leading-tight text-[15px] font-semibold mt-5 text-[#968473]">
                        Recomendamos fazer reserva com antecedência para que nossa cozinha consiga atender a todos.
                    </h4>

                    <button class="btn-secondary w-full mt-4">CARDÁPIO DO DIA</button>
                    <button class="btn-primary w-full mt-2">RESERVAR PEDIDO DE JANTAR</button>
                    <button class="btn-dark w-full mt-2">CARTA DE VINHOS</button>

                </div>
            </div>


            <!-- JANTAR ROMANTICO -->
            <div class="dinner-romantic">
                <h3 class="text-start text-[#3b2f2b] text-[20px] 
                tracking-[4px] mt-10">JANTAR ROMÂNTICO</h3>

                <div class="flex gap-2 mt-2 items-center">
                    <svg width="12" height="16" viewBox="0 0 12 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.75" y="1.94922" width="10.5" height="12.9" stroke="#565656" stroke-width="1.5" />
                        <rect x="3.41797" y="0.75" width="5.16667" height="3.3" stroke="#565656" stroke-width="1.5" />
                    </svg>
                    <h3 class="text-[#565656]">Sob reserva</h3>
                </div>

                <h4 class="text-start mt-3 text-[#565656]">
                    Desfrute de um jantar inesquecível à luz da lua no nosso píer exclusivo à beira-mar, o cenário
                    perfeito para um momento romântico.
                </h4>

                <div class="fotos mt-3">
                    <img src="/src/assets/images/fotos/jantarromantico1.jpg" alt="Foto 1"
                        class="w-full h-full object-cover">
                    <img src="/src/assets/images/fotos/jantarromantico2.jpg" alt="Foto 2"
                        class="w-full h-full object-cover">
                    <img src="/src/assets/images/fotos/jantarromantico3.jpg" alt="Foto 3"
                        class="w-full h-full object-cover mt-2">
                </div>


            </div>

        </div>

    </div>
</template>

<script>
import HeaderNav from '/src/components/layout/HeaderNav.vue'

export default {
    components: {
        HeaderNav
    }
}
</script>