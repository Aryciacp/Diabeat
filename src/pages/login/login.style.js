// EM: login.style.js
import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    // 1. O container principal: ocupa 100% da tela
    container: {
        flex: 1, // <--- Ocupa a tela inteira
        backgroundColor: "#46A376", // Sua cor verde (ajuste se for outra)
        paddingHorizontal: 20, // Espaço nas laterais
    },

    // 2. O grupo do formulário: ocupa o "meio"
    formGroup: {
        flex: 1, // <--- "Cresce" para ocupar o espaço livre
        justifyContent: "center", // <--- Centraliza o formulário no meio da tela
        width: "100%",
    },

    // 3. Cada item do formulário
    form: {
        width: "100%",
        marginBottom: 20,
    },

    // 4. O rodapé: fica "naturalmente" embaixo
    footer: {
        width: "100%",
        paddingBottom: 40, // Um respiro na parte de baixo
    },

    footerText: {
        textAlign: "center",
        color: COLORS.white, // Mudei para branco para aparecer no fundo verde
        fontSize: FONT_SIZE.md
    },

    forgotPasswordContainer: {
        alignItems: "center",
        marginTop: 10,
        marginBottom: 20,
    },
    
    forgotPasswordText: {
        color: COLORS.white, // Mudei para branco
        fontSize: FONT_SIZE.md,
    }
}