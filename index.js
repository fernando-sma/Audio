// Fazemos que o código só funcione apos o carregamento completo da pagina
window.addEventListener('DOMContentLoaded', function () {
    // Instanciamos o nosso botão
    var btn_gravacao = document.querySelector('#btn_gravar_audio');
    // Crio a variavel que amarzenara a transcrição do audio
    var transcricao_audio = '';
    // Seto o valor false para a variavel esta_gravando para fazermos a validação se iniciou a gravação
    var esta_gravando = false;
    // Verificamos se o navegador tem suporte ao Speech API
    if (window.SpeechRecognition || window.webkitSpeechRecognition) {
        // Como não sabemos qual biblioteca usada pelo navegador 
        // Atribuimos a api retornada pelo navegador
        var speech_api = window.SpeechRecognition || window.webkitSpeechRecognition;
        // Criamos um novo objeto com a API Speech
        var recebe_audio = new speech_api();
        // Defino se a gravação sera continua ou não
        // Caso deixamos ela definida como false a gravação tera um tempo estimado 
        // de 4 a 5 segundos
        recebe_audio.continuous = true;
        // Especifico se o resultado final pode ser alterado ou não pela compreenção da api
        recebe_audio.interimResults = true;
        // Especifico o idioma utilizado pelo usuario
        recebe_audio.lang = "pt-BR";
        // uso o metodo onstart para setar a minha variavel esta_gravando como true
        // e modificar o texto do botão
        recebe_audio.onstart = function () {
            esta_gravando = true;
            btn_gravacao.innerHTML = 'Gravando! Parar gravação.';
        };
        // uso o metodo onend para setar a minha variavel esta_gravando como false
        // e modificar o texto do botão
        recebe_audio.onend = function () {
            esta_gravando = false;
            btn_gravacao.innerHTML = 'Iniciar Gravação';
        };


        recebe_audio.onerror = function (event) {
            console.log(event.error);
        };

        // Com o metodo onresult posso capturar a transcrição do resultado 
        recebe_audio.onresult = function (event) {
            // Defino a minha variavel interim_transcript como vazia
            var interim_transcript = '';
            // Utilizo o for para contatenar os resultados da transcrição 
            for (var i = event.resultIndex; i < event.results.length; i++) {
                // verifico se o parametro isFinal esta setado como true com isso identico se é o final captura
                if (event.results[i].isFinal) {
                    // Contateno o resultado final da transcrição
                    transcricao_audio += event.results[i][0].transcript;
                } else {
                    // caso ainda não seja o resultado final vou contatenado os resultados obtidos
                    interim_transcript += event.results[i][0].transcript;
                }
                // Verifico qual das variaveis não esta vazia e atribuo ela no variavel resultado
                var resultado = transcricao_audio || interim_transcript;
                // Escrevo o resultado no campo da textarea
                document.getElementById('campo_texto').innerHTML = resultado;
            }

        };
        // Capturamos a ação do click no botão e iniciamos a gravação ou a paramos
        // dependendo da variavel de controle esta_gravando
        btn_gravacao.addEventListener('click', function (e) {
            // Verifico se esta gravando ou não
            if (esta_gravando) {
                // Se estiver gravando mando parar a gravação
                recebe_audio.stop();
                // Dou um retun para sair da função
                return;
            }
            // Caso não esteja capturando o audio inicio a transcrição
            recebe_audio.start();


        }, false);

    } else {
        // Caso não o navegador não apresente suporte ao Speech API apresentamos a seguinte mensagem
        console.log('navegador não apresenta suporte a web speech api');
        // alert('Este navegador não apresenta suporte para essa funcionalidade ainda');
    }

}, false);

function conferir() {
    console.log(document.getElementById("campo_texto").value);

    if (document.getElementById("campo_texto").value == "vermelho") {
        var x = document.getElementById("texto").style.color = "red";
    }
    if (document.getElementById("campo_texto").value == "azul") {
        var x = document.getElementById("texto").style.color = "blue";
    }
    if (document.getElementById("campo_texto").value == "verde") {
        var x = document.getElementById("texto").style.color = "green";
    }
    if (document.getElementById("campo_texto").value == "branco") {
        var x = document.getElementById("texto").style.color = "white";
    }
    if (document.getElementById("campo_texto").value == "preto") {
        var x = document.getElementById("texto").style.color = "black";
    }

    var x = document.getElementById("texto").style.color = document.getElementById("campo_texto").value;
}

function falar(){

var u = new SpeechSynthesisUtterance();
u.text = document.getElementById("campo_texto").value;
u.lang = 'pt-BR';
u.rate = 1;
u.pitch = 1;
u.volume = 1;
speechSynthesis.speak(u);
u.onend = function(event){
    alert("Hehe")
}



}