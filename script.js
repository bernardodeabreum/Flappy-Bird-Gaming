let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//declaração das imagens
let bird = new Image()
bird.src = "images/bird.png"
let bg = new Image()
bg.src = "images/bg.png"
let chao = new Image()
chao.src = "images/chao.png"
let canocima = new Image()
canocima.src = "images/canocima.png"
let canobaixo = new Image()
canobaixo.src = "images/canobaixo.png"

//declaração de variaveis
let eec = 100
let constant
let bX = 33
let bY = 200
let gravity = 1.4
let score = 0
let cano = []
cano[0] = {
    x: canvas.clientWidth,
    y: 0
}

//carregando sons
let fly = new Audio()
fly.src = "sounds/fly.mp3"
let scoreSOM = new Audio()
scoreSOM.src = "sounds/score.mp3"

//captura de tela
document.addEventListener("keydown", voa)

//voando
function voa() {
    bY = bY - 26
    fly.play()
}

function jogo() {
    //drawImage(imagem, X, Y)
    ctx.drawImage(bg, 0, 0)

    //criando canos
    for (let i = 0; i < cano.length; i++) {
        //posicao do cano de baixo
        constant = canocima.height + eec;
        //configurando cano de cima
        ctx.drawImage(canocima, cano[i].x, cano[i].y)
        //configurando cano de baixo
        ctx.drawImage(canobaixo, cano[i].x, cano[i].y + constant)
        //movimentacao do cano
        cano[i].x = cano[i].x - 1
        //criar novos canos
        if (cano[i].x == 125) {
            cano.push({
                x: canvas.width,
                y: Math.floor(Math.random() * canocima.height) - canocima.height
            })
        }
        //passaro entre as bordas dos canos
        if (bX + bird.width >= cano[i].x && bX <= cano[i].x + canocima.width
            //passaro colide com o cano de baixo ou cano de cima
            && (bY + bird.height >= cano[i].y + constant || bY <= cano[i].y + canocima.height)
            //passaro colidiu com o chao
            || (bY + bird.height >= canvas.height - chao.height)) {
            location.reload()
        }

        //marcando pontos
        if (cano[i].x == 5) {
            scoreSOM.play()
            score = score + 1
        }
    }

    //desenhando o chao
    ctx.drawImage(chao, 0, canvas.height - chao.height)

    //desenhando o passaro
    ctx.drawImage(bird, bX, bY)
    bY += gravity

    //criando o placar
    ctx.fillStyle = "#000"
    ctx.font = "20px Verdana"
    ctx.fillText("Placar: " + score, 10, canvas.height - 20)
    requestAnimationFrame(jogo);
}


jogo()