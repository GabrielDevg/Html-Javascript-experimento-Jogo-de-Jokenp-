const botoesOpcao = document.querySelectorAll('.btn_opcao');
const elEscolhaUsuario = document.getElementById('escolha_usuario');
const elEscolhaComputador = document.getElementById('escolha_computador');
const elMensagemResultado = document.getElementById('mensagem_resultado');
const elVitorias = document.getElementById('vitorias');
const elEmpates = document.getElementById('empates');
const elDerrotas = document.getElementById('derrotas');
const btnReiniciar = document.getElementById('btn_reiniciar');
const somEntrada = new Audio("Olá, sou Leo. estou aqui para jogar Jokenpô com vo.mp3");
let podeFalar = true;
const frases_derrota = [
  "hahaha você é tipo um joker poop no Jokenpô, entendeu? ah, acho que você não entendeu...",
  "Tente novamente!",
  "Muito Horrivel!kkkkkkk!",
  "Você não tem aura, meu irmão"
];
const frases_vitoria = [
  "Não acredito nisso...",
  "Boa!",
  "Caramba, tu manda bem demais",
  "Sorte de principiante",
  "Preciso de água"
];
const frases_empate = [
"Já podemos jogar",
"Tô esperando...",
"Grup, grup, grup, água gostosa!",
"zzz Dormindo zzz"
];


window.addEventListener("load", () => {
  somEntrada.play().catch(() => {

    document.body.addEventListener("click", () => {
      somEntrada.play();
    }, { once: true }); 
  });
});


function clicar() {
  if (podeFalar === true) {

    if (placar.vitorias < placar.derrotas){
    podeFalar = false;
    const indice = Math.floor(Math.random() * frases_derrota.length);
    const fraseSorteada = frases_derrota[indice];

  
    const mensagem = new SpeechSynthesisUtterance(fraseSorteada);
    mensagem.lang = "pt-BR";
    window.speechSynthesis.speak(mensagem);
    }
   
    setTimeout(() => {
      podeFalar = true;
    },10000);

    if(placar.vitorias > placar.derrotas){
    podeFalar = false;
    const indice = Math.floor(Math.random() * frases_vitoria.length);
    const fraseSorteada = frases_vitoria[indice];

    const mensagem = new SpeechSynthesisUtterance(fraseSorteada);
    mensagem.lang = "pt-BR";
    window.speechSynthesis.speak(mensagem);
    }
   
    setTimeout(() => {
      podeFalar = true;
    },10000);
  }
     if(placar.vitorias == placar.derrotas){
    podeFalar = false;
    const indice = Math.floor(Math.random() * frases_empate.length);
    const fraseSorteada = frases_empate[indice];

    const mensagem = new SpeechSynthesisUtterance(fraseSorteada);
    mensagem.lang = "pt-BR";
    window.speechSynthesis.speak(mensagem);
    }
   
    setTimeout(() => {
      podeFalar = true;
    },10000);

};




const opcoesValidas = ['tesoura✌️', 'papel✋', 'pedra✊'];
let placar = { vitorias: 0, empates: 0, derrotas: 0 };



function obterEscolhaComputador() {
    const indiceAleatorio = Math.floor(Math.random() * opcoesValidas.length);
    return opcoesValidas[indiceAleatorio];
}

function formatarPalavra(palavra) {
    return palavra.charAt(0).toUpperCase() + palavra.slice(1);
}

function jogar(escolhaUsuario) {
    const escolhaComputador = obterEscolhaComputador();
    const img = document.getElementById('leo');
    elEscolhaUsuario.textContent = formatarPalavra(escolhaUsuario);
    elEscolhaComputador.textContent = formatarPalavra(escolhaComputador);

    // Reinicia a animação CSS do texto de resultado
    elMensagemResultado.classList.remove('animar-resultado', 'vitoria', 'derrota', 'empate');
    void elMensagemResultado.offsetWidth; // Força o reflow para reiniciar a animação
    elMensagemResultado.classList.add('animar-resultado');

    if (escolhaUsuario === escolhaComputador) {
        elMensagemResultado.textContent = 'Empate!';
        elMensagemResultado.classList.add('empate');
        placar.empates++;
        img.src = "./3.png"
    } else if (
        (escolhaUsuario === 'pedra✊' && escolhaComputador === 'tesoura✌️') ||
        (escolhaUsuario === 'papel✋' && escolhaComputador === 'pedra✊') ||
        (escolhaUsuario === 'tesoura✌️' && escolhaComputador === 'papel✋')
    ) {
        elMensagemResultado.textContent = 'Você venceu!';
        elMensagemResultado.classList.add('vitoria');
        placar.vitorias++;
        img.src = "./2.png"
    } else {
        elMensagemResultado.textContent = 'Você perdeu!';
        elMensagemResultado.classList.add('derrota');
        placar.derrotas++;
        img.src = "./1.png"
    }

    atualizarPlacar();
}

function atualizarPlacar() {
    elVitorias.textContent = placar.vitorias;
    elEmpates.textContent = placar.empates;
    elDerrotas.textContent = placar.derrotas;
}

function reiniciarJogo() {
    placar = { vitorias: 0, empates: 0, derrotas: 0 };
    atualizarPlacar();
    elEscolhaUsuario.textContent = '-';
    elEscolhaComputador.textContent = '-';
    elMensagemResultado.classList.remove('vitoria', 'derrota', 'empate');
    elMensagemResultado.textContent = 'Aguardando sua jogada...';
}

// Eventos HTML5 de clique nos botões
botoesOpcao.forEach(botao => {
    botao.addEventListener('click', () => {
        const escolha = botao.getAttribute('data-escolha');
        jogar(escolha);
    });
});

btnReiniciar.addEventListener('click', reiniciarJogo);
