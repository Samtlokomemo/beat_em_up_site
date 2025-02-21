// Função para mudar o fundo
function changeBackground() {
    const gameContainer = document.querySelector('.game-container'); // Seleciona o container do jogo usando a classe

    // Definir uma lista de possíveis fundos (cores, gradientes ou imagens)
    const backgrounds = [
        'linear-gradient(45deg, #ff6347, #ffb6c1)', // Gradiente quente
        'linear-gradient(45deg, #00bfff, #1e90ff)', // Gradiente azul
        'linear-gradient(45deg, #32cd32, #98fb98)', // Gradiente verde
        'url("images/background1.jpg")', // Imagem 1
        'url("images/background2.jpg")'  // Imagem 2
    ];

    // Escolher um fundo aleatório da lista
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    const selectedBackground = backgrounds[randomIndex];

    // Alterar somente o fundo do container do jogo
    gameContainer.style.background = selectedBackground; // Muda o fundo do container do jogo
}

// Adiciona o evento de clique no botão
document.getElementById('change-bg-btn').addEventListener('click', changeBackground);
