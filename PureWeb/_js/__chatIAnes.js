// const textarea = document.getElementById('user_msg');

// // Quando a textarea estiver seleciona "focus" ele muda a cor da borda
// const inputContainer = document.querySelector('.input_container');

// textarea.addEventListener('focus', () => {
//     inputContainer.classList.add('focused');
// });

// textarea.addEventListener('blur', () => {
//     inputContainer.classList.remove('focused');
// });

// Função para mostrar e esconder uma tooltip especifica
function showTooltip_chat(tooltipId) {
    const tooltips = document.querySelectorAll(`#tp_ia-${tooltipId}`)
    tooltips.forEach(tooltip => {
        if (tooltip) {
            tooltip.style.display = 'block';
        }
    })
}

function hideTooltip_chat(tooltipId) {
    const tooltips = document.querySelectorAll(`#tp_ia-${tooltipId}`)
    tooltips.forEach(tooltip => {
        if (tooltip) {
            tooltip.style.display = 'none';
        }
    })
}

// Variável para rastrear o estado do popup
let popupActive = false;

// Função para copiar o texto com ID dinâmico
function copyText_chatIA(textID) {
    // Previne o comportamento padrão e garante que o popup só abra uma vez
    if (popupActive) return; 

    // Gera o ID dinamicamente e busca o conteúdo
    const elementID = `ianes_output_text_${textID}`;
    const contentElement = document.getElementById(elementID);

    // Verifica se o elemento existe
    if (!contentElement) {
        console.error(`Elemento com ID "${elementID}" não encontrado.`);
        return;
    }

    const textToCopy = contentElement.innerText;

    // Copia o texto para a área de transferência
    navigator.clipboard.writeText(textToCopy)
        .then(() => showPopup_textCopy())
        .catch(err => console.error('Erro ao copiar o texto: ', err));
}

// Função que exibe o popup e o efeito de loading
function showPopup_textCopy() {
    const popup = document.getElementById('popup_copyText');
    const loadingBar = document.getElementById('loading_bar'); // Acesse a barra de loading diretamente

    popupActive = true; // Marca o popup como ativo
    popup.style.display = 'block';
    loadingBar.style.width = '100%'; // Preenche a barra de loading

    // Começa a esvaziar a barra após 50ms
    setTimeout(() => {
        // Mantém a barra cheia por 2 segundos
        setTimeout(() => {
            loadingBar.style.transition = 'width 1s'; // Define a transição para o esvaziamento
            loadingBar.style.width = '0%'; // Reseta a barra

            // Esconde o popup após 2 segundos (dura o esvaziamento)
            setTimeout(() => {
                popup.style.display = 'none'; // Esconde o popup
                popupActive = false; // Marca o popup como inativo
            }, 1000); 
        }, 1000); // Espera 2 segundos após a barra estar cheia
    }, 50); // Começa a esvaziar após 50ms
}

// Função IMPORTANTE - Ela ajusta o tamanho do <main>
// Para sempre ter a altura da janela, menos 4vw (Cabeçalho)
function ajustarAltura_main() {
    const mainContent = document.getElementById("mainElement_chatIAnes");
    const alturaJanela = window.innerHeight;

    if (!mainContent) {
        console.warn("Elemento #mainElement_chatIAnes não encontrado.");
        return;
    }

    // Converte '4vw' para pixels
    const vwToPx = (4 * window.innerWidth) / 100;

    // Calcula a altura final
    const alturaMain = alturaJanela - vwToPx;

    // Aplica a altura calculada ao elemento
    mainContent.style.height = `${alturaMain}px`;

    console.log("Elemento Main:", mainContent);
    console.log("Altura da Janela:", alturaJanela);
    console.log("Altura Calculada para o Main:", alturaMain);
}

// Executa a função apenas quando o DOM estiver pronto
document.addEventListener("DOMContentLoaded", () => {
    ajustarAltura_main();
    window.onresize = ajustarAltura_main;
});
