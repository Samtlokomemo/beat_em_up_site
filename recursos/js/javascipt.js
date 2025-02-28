document.getElementById('play-btn').addEventListener('click', function() {
    // Define o src do iframe quando o botão Play for clicado
    var iframe = document.getElementById('game-iframe');
    iframe.src = 'recursos/jogo/index.html';  // Caminho do seu jogo
    
    // Mostra o iframe e o botão de mudar fundo
    iframe.style.display = 'block';
    document.getElementById('change-bg-btn').style.display = 'block';


    
    // Oculta o botão de Play
    this.style.display = 'none';
    
    document.getElementById('container-game').classList.add('game-container');
});
