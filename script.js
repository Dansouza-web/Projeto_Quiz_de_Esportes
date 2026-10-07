const questions = [
    {
        question: "Qual é o Esporte Mais Praticado no Mundo?",
        answers: [
            { text: "Futebol", correct: true },
            { text: "Basquete", correct: false },
            { text: "Vôlei", correct: false },
            { text: "Tênis", correct: false },
        ]
    },
    {
        question: "Qual país venceu a Copa do Mundo de 2022?",
        answers: [
            { text: "Brasil", correct: false },
            { text: "Argentina", correct: true },
            { text: "França", correct: false },
            { text: "Croácia", correct: false },
        ]
    },
    {
        question: "Quantos jogadores cada equipe possui em campo no futebol?",
        answers: [
            { text: "9 jogadores", correct: false },
            { text: "10 jogadores", correct: false },
            { text: "11 jogadores", correct: true },
            { text: "12 jogadores", correct: false }
        ]
    },
    {
        question: "Em qual país surgiu o judô?",
        answers: [
            { text: "China", correct: false },
            { text: "Japão", correct: true },
            { text: "Brasil", correct: false },
            { text: "Coreia do Sul", correct: false },
        ]
    },
    {
        question: "Qual destes é um dos quatro Grand Slams do tênis?",
        answers: [
            { text: "Wimbledon", correct: true },
            { text: "Davis Cup", correct: false },
            { text: "Super Bowl", correct: false },
            { text: "NBA Finals", correct: false },
        ]
    },
    {
        question: "Qual país é considerado o criador do voleibol?",
        answers: [
            { text: "Brasil", correct: false },
            { text: "Itália", correct: false },
            { text: "Estados Unidos", correct: true },
            { text: "Japão", correct: false },
        ]
    }
];
const questionElement = document.getElementById("question");
const botaorespostas = document.getElementById("botao-resposta");
const ProximoBotao = document.getElementById("proximobotao");
let questaoatualindex = 0;
let pontuacao = 0;
function ComecarQuiz() {
    questaoatualindex = 0;
    pontuacao = 0;
    ProximoBotao.innerHTML = "Próximo";
    showQuestion();
}
function showQuestion() {
    resetState();
    let QuestaoAtual = questions[questaoatualindex];
    let questaonumero = questaoatualindex + 1;
    questionElement.innerHTML =
        questaonumero + ". " + QuestaoAtual.question;
    QuestaoAtual.answers.forEach(element => {
        const botao = document.createElement("button");
        botao.innerHTML = element.text;
        botao.classList.add("btn");
        botaorespostas.appendChild(botao);
        if (element.correct) {
            botao.dataset.correct = element.correct;
        }
        botao.addEventListener("click", selecionarResposta);
    });
}
function resetState() {
    ProximoBotao.style.display = "none";
    while (botaorespostas.firstChild) {
        botaorespostas.removeChild(
            botaorespostas.firstChild
        );
    }
}
function selecionarResposta(e) {
    const selecionebotao = e.target;
    const iscorrect =
        selecionebotao.dataset.correct === "true";
    if (iscorrect) {
        selecionebotao.classList.add("Correto");
        pontuacao++;
    } else {
        selecionebotao.classList.add("Incorreto");
    }
    Array.from(botaorespostas.children).forEach(botao => {
        if (botao.dataset.correct === "true") {
            botao.classList.add("Correto");
        }
        botao.disabled = true;
    });
    ProximoBotao.style.display = "block";
}
function handleProximoBotao() {
    questaoatualindex++;
    if (questaoatualindex < questions.length) {
        showQuestion();

    } else {

        showScore();
    }
}
function showScore() {
    resetState();
    questionElement.innerHTML =
        `Você Acertou ${pontuacao} de ${questions.length}. Parabéns!`;
    ProximoBotao.innerHTML = "Jogar Denovo";
    ProximoBotao.style.display = "block";
}
ProximoBotao.addEventListener("click", () => {
    if (questaoatualindex < questions.length) {

        handleProximoBotao();

    } else {

        ComecarQuiz();
    }
});
ComecarQuiz();