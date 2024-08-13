document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('botao'); // Botão que será movido
    const container = document.getElementById('container'); // Contêiner onde o botão se move
    const imagem = document.getElementById('imagem'); // Imagem que será exibida quando o botão for clicado
    const btnIniciar = document.getElementById('btniniciar'); // Botão para iniciar e parar o jogo
    const btnaudio = document.getElementById('btnaudio'); // Botão para tocar e pausar o áudio
    const audio = document.getElementById('audio'); // Elemento de áudio
    const imagemContainer = document.getElementById('imagemContainer'); // Contêiner da imagem nova e botões adicionais
    const repetir = document.getElementById('repetir'); // Botão para repetir o jogo
    const info = document.getElementById('info'); // Botão para mais informações sobre o dorama

    // Lista de imagens e seus links para mais informções
    const imagens = [
        { src: "imagens/BIG MOUTH.jpg", link: "https://mydramalist.com/685801-big-mouse" },
        { src: "imagens/Boong Soon.jpg", link: "https://mydramalist.com/18894-strong-woman-do-bong-soon" },
        { src: "imagens/Dorama do dia_ The Good Bad Mother.jpg", link: "https://mydramalist.com/733003-bad-mother" },
        { src: "imagens/download (1).jpg", link: "https://mydramalist.com/685259-semantic-error" },
        { src: "imagens/Flower of Evil.jpg", link: "https://mydramalist.com/54625-flower-of-evil" },
    ];

    const buttonSize = 100;

    // Variáveis para controle do jogo e da interação
    let isJogoAtivo = false; // Indica se o jogo está ativo
    let moveInterval; // Intervalo para mover o botão

    // Obter uma posição aleatória
    function getRandomPosition() {
        const containerRect = container.getBoundingClientRect();
        const x = Math.floor(Math.random() * (containerRect.width - buttonSize));
        const y = Math.floor(Math.random() * (containerRect.height - buttonSize));
        return { x, y }; 
    }

    // Mover o botão para uma nova posição aleatória
    function moveButton() {
        const { x, y } = getRandomPosition(); 
        button.style.left = `${x}px`; 
        button.style.top = `${y}px`; 
    }

    // Escolher uma imagem aleatória da lista
    function escolherImagemAleatoria() {
        const indiceAleatorio = Math.floor(Math.random() * imagens.length); 
        return imagens[indiceAleatorio]; // Retorna a imagem correspondente
    }

    // Iniciar a interação do jogo
    function iniciarInteracao() {
        isJogoAtivo = true; // Define o jogo como ativo
        moveInterval = setInterval(moveButton, 2000); // Move o botão a cada 2 segundos

        // Clique no botão
        button.addEventListener('click', function() {
            if (isJogoAtivo) {
                // Para o movimento do botão
                clearInterval(moveInterval);

                // Escolhe uma imagem aleatória
                const imagemEscolhida = escolherImagemAleatoria();

                // Define o src da nova imagem e o link do botão de informações
                imagem.src = imagemEscolhida.src;
                imagem.style.display = 'block'; // Mostra a nova imagem
                imagemContainer.style.display = 'flex'; // Mostra o contêiner da imagem
                info.href = imagemEscolhida.link; // Atualiza o link do botão de informações

                // Esconde o botão
                button.style.display = 'none';

                // Atualiza o botão "Iniciar" para "Parar"
                btnIniciar.textContent = 'Parar Jogo';
            }
        });
    }

    // Parar a interação do jogo
    function pararInteracao() {
        isJogoAtivo = false; // Define o jogo como inativo
        clearInterval(moveInterval); // Para o intervalo de movimento do botão
        button.style.display = 'block'; // Mostra o botão novamente
        imagem.style.display = 'none'; // Esconde a nova imagem
        imagemContainer.style.display = 'none'; // Esconde o contêiner da imagem
        btnIniciar.textContent = 'Iniciar Jogo'; // Atualiza o texto do botão para "Iniciar Jogo"
    }

    // Reiniciar o jogo
    function reiniciarJogo() {
        pararInteracao(); // Para a interação e reinicia o jogo
        button.style.left = '0px'; // Reseta a posição do botão
        button.style.top = '0px';  // Reseta a posição do botão
        iniciarInteracao(); // Reinicia a interação
    }

    // Mostrar o botão novamente se a nova imagem estiver oculta
    function mostrarBotao() {
        if (imagem.style.display === 'none' || imagem.style.display === '') {
            button.style.display = 'block'; // Mostra o botão
        }
    }

    // Adiciona um listener para o botão "Iniciar" / "Parar"
    btnIniciar.addEventListener('click', function() {
        if (isJogoAtivo) {
            pararInteracao(); // Se o jogo está ativo, para a interação
        } else {
            iniciarInteracao(); // Se o jogo não está ativo, inicia a interação
            btnIniciar.textContent = 'Parar Jogo'; // Atualiza o texto do botão para "Parar Jogo"
        }
    });

    // Adiciona um listener para o botão de áudio
    btnaudio.addEventListener('click', function() {
        if (audio.paused) {
            audio.play(); // Reproduz o áudio se estiver pausado
            btnaudio.textContent = 'Pause'; // Atualiza o texto do botão para "Pause"
        } else {
            audio.pause(); // Pausa o áudio se estiver tocando
            btnaudio.textContent = 'Play'; // Atualiza o texto do botão para "Play"
        }
    });

    // Adiciona um listener para o botão "Repetir Jogo"
    repetir.addEventListener('click', function() {
        reiniciarJogo(); // Para a interação e reinicia o jogo
        btnIniciar.textContent = 'Parar Jogo'; // Atualiza o texto do botão "Iniciar" para "Parar Jogo"
    });

    // Verifica periodicamente se a nova imagem desapareceu para mostrar o botão novamente
    setInterval(mostrarBotao, 1000); // Verifica a cada 1 segundo
});
