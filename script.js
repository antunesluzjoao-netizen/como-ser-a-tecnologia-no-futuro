document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. SEÇÕES EXPANSÍVEIS (ACCORDION INTERATIVO)
       ========================================================================== */
    const headers = document.querySelectorAll(".accordion-header");
    
    headers.forEach(header => {
        header.addEventListener("click", () => {
            const painel = document.getElementById(header.getAttribute("aria-controls"));
            const estaExpandido = header.getAttribute("aria-expanded") === "true";
            
            header.setAttribute("aria-expanded", !estaExpandido);
            
            if (!estaExpandido) {
                painel.removeAttribute("hidden");
                painel.style.maxHeight = painel.scrollHeight + "px";
            } else {
                painel.style.maxHeight = "0";
                setTimeout(() => {
                    if (header.getAttribute("aria-expanded") === "false") {
                        painel.setAttribute("hidden", "");
                    }
                }, 300);
            }
        });
    });

    /* ==========================================================================
       2. QUIZ INTERATIVO
       ========================================================================== */
    const btnVerificarQuiz = document.getElementById("btn-verificar-quiz");
    const quizResultado = document.getElementById("quiz-resultado");
    
    btnVerificarQuiz.addEventListener("click", () => {
        const p1 = document.querySelector('input[name="p1"]:checked');
        const p2 = document.querySelector('input[name="p2"]:checked');
        
        if (!p1 || !p2) {
            quizResultado.style.color = "var(--cor-vermelho-escarlate)";
            quizResultado.textContent = "Por favor, responda a todas as perguntas antes de enviar.";
            return;
        }
        
        let acertos = 0;
        if (p1.value === "correto") acertos++;
        if (p2.value === "correto") acertos++;
        
        if (acertos === 2) {
            quizResultado.style.color = "var(--cor-verde-claro)";
            quizResultado.textContent = "Excelente! Você acertou todas as 2 questões. Está pronto para o futuro!";
        } else {
            quizResultado.style.color = "var(--cor-laranja-princeton)";
            quizResultado.textContent = `Você acertou ${acertos} de 2 questões. Revise o texto acima para aprender mais!`;
        }
    });

    /* ==========================================================================
       3. FORMULÁRIO DE INSCRIÇÃO DESTACADO
       ========================================================================== */
    const formCadastro = document.getElementById("cadastro-futuro");
    const formMensagem = document.getElementById("form-mensagem");
    
    formCadastro.addEventListener("submit", (e) => {
        e.preventDefault();
        
        formMensagem.style.color = "var(--cor-azul-eletrico)";
        formMensagem.textContent = "Processando sua inscrição na matriz tecnológica...";
        
        setTimeout(() => {
            formMensagem.style.color = "var(--cor-verde-claro)";
            formMensagem.textContent = "Inscrição confirmada com sucesso! Bem-vindo ao AgroFuturo.";
            formCadastro.reset();
        }, 1500);
    });

    /* ==========================================================================
       4. CAIXA FLUTUANTE DE ACESSIBILIDADE
       ========================================================================== */
    const btnAumentarFonte = document.getElementById("btn-aumentar-fonte");
    const btnDiminuirFonte = document.getElementById("btn-diminuir-fonte");
    const btnAlternarTema = document.getElementById("btn-alternar-tema");
    const btnOuvir = document.getElementById("btn-ouvir");
    const btnPararOuvir = document.getElementById("btn-parar-ouvir");
    
    let tamanhoFonteAtual = 100;
    
    btnAumentarFonte.addEventListener("click", () => {
        if (tamanhoFonteAtual < 130) {
            tamanhoFonteAtual += 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });
    
    btnDiminuirFonte.addEventListener("click", () => {
        if (tamanhoFonteAtual > 80) {
            tamanhoFonteAtual -= 10;
            document.documentElement.style.fontSize = `${tamanhoFonteAtual}%`;
        }
    });
    
    btnAlternarTema.addEventListener("click", () => {
        document.body.classList.toggle("modo-claro");
    });
    
    // Leitura por Voz via SpeechSynthesis API
    let sinteseVoz = window.speechSynthesis;
    let utterance = null;
    
    btnOuvir.addEventListener("click", () => {
        sinteseVoz.cancel();
        
        const artigos = document.querySelectorAll(".coluna-conteudo .card-artigo");
        let textoCompleto = "";
        
        artigos.forEach(artigo => {
            textoCompleto += artigo.innerText + " ";
        });
        
        if (!textoCompleto.trim()) return;
        
        utterance = new SpeechSynthesisUtterance(textoCompleto);
        utterance.lang = "pt-BR";
        utterance.rate = 1.0;
        
        utterance.onstart = () => {
            btnOuvir.disabled = true;
            btnPararOuvir.disabled = false;
        };
        
        utterance.onend = () => {
            btnOuvir.disabled = false;
            btnPararOuvir.disabled = true;
        };
        
        utterance.onerror = () => {
            btnOuvir.disabled = false;
            btnPararOuvir.disabled = true;
        };
        
        sinteseVoz.speak(utterance);
    });
    
    btnPararOuvir.addEventListener("click", () => {
        sinteseVoz.cancel();
        btnOuvir.disabled = false;
        btnPararOuvir.disabled = true;
    });
    
    window.addEventListener("beforeunload", () => {
        sinteseVoz.cancel();
    });
});