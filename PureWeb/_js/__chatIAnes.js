const textarea = document.getElementById('user_msg');

// Quando a textarea estiver seleciona "focus" ele muda a cor da borda
const inputContainer = document.querySelector('.input_container');

textarea.addEventListener('focus', () => {
    inputContainer.classList.add('focused');
});

textarea.addEventListener('blur', () => {
    inputContainer.classList.remove('focused');
});

function ajustarAltura_body() {
    const body = document.body;
    const alturaJanela = window.innerHeight;

    body.style.height = `${alturaJanela}px`;
    body.style.margin = '0';
    body.style.boxSizing = 'border-box';
}

// Executa a função ao carregar a página e ao redimensionar a janela
window.onload = ajustarAltura_body;
window.onresize = ajustarAltura_body;