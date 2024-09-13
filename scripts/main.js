const html = seletor('html');
const timer = seletor('#timer');
const banner = seletor('.app__image');
const titulo = seletor('.app__title');

const botoes = document.querySelectorAll('.app__card-button');
const botaoStartPause = seletor('#start-pause span');
const botaoStartPauseImagem = seletor('.app__card-primary-butto-icon');
const botaoFoco = seletor('.app__card-button--foco');
const botaoDescansoCurto = seletor('.app__card-button--curto');
const botaoDescansoLongo = seletor('.app__card-button--longo');
const botaoCheckBoxMusica = seletor('#alternar-musica');
const botaoVolumeSlider = seletor('#volume-slider');

const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;
const audioPlay = new Audio('./sons/play.wav');
const audioPause = new Audio('./sons/pause.mp3');
const audioBeep = new Audio('./sons/beep.mp3');

const tempoDeFoco = 5;
// const tempoDeFoco = 45*60;
const tempoDescansoCurto = 5*60;
const tempoDescansoLongo = 15*60;

let tempoCorrido = tempoDeFoco;
const contagemRegressiva = () => {
    if (tempoCorrido <= 0) {
        audioBeep.play();
        alert('Tempo finalizado!');
        const focoAtivo = html.getAttribute('data-contexto') === 'foco';
        if (focoAtivo) {
            const evento = new CustomEvent('FocoFinalizado');
            document.dispatchEvent(evento);
        }
        zerar();
        return
    }
    tempoCorrido--;
    mostrarTempo();
    console.log(tempoCorrido);
}
let intervalo = null;

function startPause() {
    if (intervalo) {
        audioPause.play();
        zerar();
        return
    }
    audioPlay.play();
    intervalo = setInterval(contagemRegressiva, 1000);
    botaoStartPause.textContent = 'Pausar';
    botaoStartPauseImagem.setAttribute('src', './imagens/pause.png');
}

function zerar() {
    clearInterval(intervalo);
    botaoStartPause.textContent = 'Começar';
    botaoStartPauseImagem.setAttribute('src', './imagens/play_arrow.png');
    intervalo = null;
}

function mudaContexto(contexto) {
    mostrarTempo();
    botoes.forEach((contexto) => {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `./imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML =
                `Hora de entrar na <strong class="app__title-strong">MATRIX</strong>.`
            break;

        case "descanso-curto":
            titulo.innerHTML =
                `O telefone está <strong class="app__title-strong">tocando</strong>!`
            break;

        case "descanso-longo":
            titulo.innerHTML =
                `Já parou para admira-la, sua <strong class="app__title-strong">beleza</strong>?`
            break;

        default:
            break;
    }
}

botaoStartPause.addEventListener('click', startPause);
botaoFoco.addEventListener('click', () => {
    tempoCorrido = tempoDeFoco;
    mudaContexto('foco');
    botoes[0].classList.add('active');
});
botaoDescansoCurto.addEventListener('click', () => {
    tempoCorrido = tempoDescansoCurto;
    mudaContexto('descanso-curto');
    botoes[1].classList.add('active');
});
botaoDescansoLongo.addEventListener('click', () => {
    tempoCorrido = tempoDescansoLongo;
    mudaContexto('descanso-longo');
    botoes[2].classList.add('active');
});
botaoCheckBoxMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.currentTime = 0;
        musica.play();
    } else {
        musica.pause();
    }
});
botaoVolumeSlider.addEventListener('change', (e) => {
    musica.volume = e.currentTarget.value;
});
function mostrarTempo() {
    const tempo = new Date(tempoCorrido * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${tempoFormatado}`;
}

function seletor(texto) {
    return document.querySelector(texto);
}

mostrarTempo();