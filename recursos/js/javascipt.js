// Acessa os botões e o iframe
const playButton = document.getElementById('play-btn');
const gameIframe = document.getElementById('game-iframe');
const changeBgButton = document.getElementById('change-bg-btn');

// Adiciona o evento de clique no botão de "Play"
playButton.addEventListener('click', function() {
    // Esconde o botão "Play"
    playButton.style.display = 'none';
    
    // Exibe o iframe do jogo
    gameIframe.style.display = 'block';

    // Exibe o botão de mudar fundo
    changeBgButton.style.display = 'block';
});
