document.addEventListener('DOMContentLoaded', function () {
    var cores = [
        { nome: 'azul', cor: '#0000FF' },
        { nome: 'vermelho', cor: '#FF0000' },
        { nome: 'verde', cor: '#00FF00' },
        { nome: 'amarelo', cor: '#FFFF00' },
        { nome: 'roxo', cor: '#800080' },
        { nome: 'laranja', cor: '#FFA500' }
    ];

    var jogador1 = {
        nome: '',
        bolinhas: 10
    };

    var jogador2 = {
        nome: '',
        bolinhas: 10
    };

    var currentPlayer = 1;

    var colorCircles = {};

    function sortearCor() {
        var corSorteada = cores[Math.floor(Math.random() * cores.length)];
    
        var messageArea = document.getElementById('messageArea');
        var mensagem = '';
    
        if (corSorteada.nome === 'amarelo') {
            if (currentPlayer === 1) {
                jogador1.bolinhas--;
                mensagem = 'Jogador 1 (' + jogador1.nome + ') sorteou a cor amarela. Uma bola foi eliminada do seu montante.';
            } else if (currentPlayer === 2) {
                jogador2.bolinhas--;
                mensagem = 'Jogador 2 (' + jogador2.nome + ') sorteou a cor amarela. Uma bola foi eliminada do seu montante.';
            }
        } else {
            if (colorCircles[corSorteada.nome].filled) {
                if (currentPlayer === 1) {
                    jogador1.bolinhas++;
                    mensagem = 'Jogador 1 (' + jogador1.nome + ') sorteou a cor ' + corSorteada.nome + '. O círculo da cor ' + corSorteada.nome + ' já está preenchido. Uma bola foi adicionada ao seu montante.';
                } else if (currentPlayer === 2) {
                    jogador2.bolinhas++;
                    mensagem = 'Jogador 2 (' + jogador2.nome + ') sorteou a cor ' + corSorteada.nome + '. O círculo da cor ' + corSorteada.nome + ' já está preenchido. Uma bola foi adicionada ao seu montante.';
                }
                colorCircles[corSorteada.nome].style.backgroundColor = '';
                colorCircles[corSorteada.nome].filled = false;
            } else {
                if (currentPlayer === 1) {
                    jogador1.bolinhas--;
                    mensagem = 'Jogador 1 (' + jogador1.nome + ') sorteou a cor ' + corSorteada.nome + '. Uma bola foi subtraída do seu montante.';
                } else if (currentPlayer === 2) {
                    jogador2.bolinhas--;
                    mensagem = 'Jogador 2 (' + jogador2.nome + ') sorteou a cor ' + corSorteada.nome + '. Uma bola foi subtraída do seu montante.';
                }
                colorCircles[corSorteada.nome].style.backgroundColor = corSorteada.cor;
                colorCircles[corSorteada.nome].filled = true;
            }
        }
    
        document.getElementById('player1Count').innerText = jogador1.bolinhas;
        document.getElementById('player2Count').innerText = jogador2.bolinhas;
    
        if (currentPlayer === 1) {
            currentPlayer = 2;
            mensagem += '\nVez de Jogador 2 (' + jogador2.nome + ')';
            document.getElementById('sortearButton').style.backgroundColor = 'lime';
        } else if (currentPlayer === 2) {
            currentPlayer = 1;
            mensagem += '\nVez de Jogador 1 (' + jogador1.nome + ')';
            document.getElementById('sortearButton').style.backgroundColor = 'dodgerblue';
        }
    
        messageArea.innerText = mensagem;
    
        if (jogador1.bolinhas === 0) {
            messageArea.innerText = 'Jogador 1 (' + jogador1.nome + ') perdeu todas as suas bolinhas! Jogador 1 (' + jogador1.nome + ') é o vencedor!';
            document.getElementById('sortearButton').disabled = true;
        } else if (jogador2.bolinhas === 0) {
            messageArea.innerText = 'Jogador 2 (' + jogador2.nome + ') perdeu todas as suas bolinhas! Jogador 2 (' + jogador2.nome + ') é o vencedor!';
            document.getElementById('sortearButton').disabled = true;
        }
    }
    
    
    

    setupGame();

    function setupGame() {
        cores.forEach(function (cor, index) {
            var colorCircle = document.getElementById('colorCircle' + (index + 1));
            colorCircles[cor.nome] = colorCircle;
        });

        document.getElementById('sortearButton').addEventListener('click', sortearCor);
        var player1NameInput = document.getElementById('player1Name');
        var player2NameInput = document.getElementById('player2Name');

        document.getElementById('startGameButton').addEventListener('click', function () {
            var player1Name = player1NameInput.value;
            var player2Name = player2NameInput.value;

            if (player1Name && player2Name) {
                jogador1.nome = player1Name;
                jogador2.nome = player2Name;

                document.getElementById('player1NameDisplay').innerText = jogador1.nome;
                document.getElementById('player2NameDisplay').innerText = jogador2.nome;

                document.getElementById('player1').style.display = 'none';
                document.getElementById('player2').style.display = 'none';
                document.getElementById('gameBoard').style.display = 'block';

                document.getElementById('sortearButton').innerText = 'Vez de ' + jogador1.nome;
                document.getElementById('sortearButton').style.backgroundColor = 'dodgerblue';
            } else {
                alert('Por favor, informe os nomes dos jogadores.');
            }
        });
    }
});

function startGame() {
    var player1Name = document.getElementById('player1Name').value;
    var player2Name = document.getElementById('player2Name').value;

    if (player1Name === '' || player2Name === '') {
        alert('Digite o nome dos dois jogadores para iniciar o jogo!');
        return;
    }

    jogador1.nome = player1Name;
    jogador2.nome = player2Name;

    document.getElementById('player1NameDisplay').innerText = jogador1.nome;
    document.getElementById('player2NameDisplay').innerText = jogador2.nome;

    currentPlayer = 1;

    document.getElementById('player1Count').innerText = jogador1.bolinhas;
    document.getElementById('player2Count').innerText = jogador2.bolinhas;

    document.getElementById('playerSection').style.display = 'none';
    document.getElementById('gameBoard').style.display = 'block';

    // Inicializa as propriedades 'filled' para cada cor
    cores.forEach(function (cor) {
        colorCircles[cor.nome].filled = false;
    });

    document.getElementById('sortearButton').innerText = 'Vez de ' + jogador1.nome;
    document.getElementById('sortearButton').style.backgroundColor = 'dodgerblue';
}

