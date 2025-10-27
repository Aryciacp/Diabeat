import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    // 1. O container principal: ocupa 100% da tela
    container: {
        flex: 1,
        backgroundColor: "#46A376", // O seu fundo verde
        paddingHorizontal: 20,
    },

    // 2. O grupo do formulário: ocupa o "meio"
    formGroup: {
        flex: 1, // "Cresce" para ocupar o espaço livre
        justifyContent: "center", // Centraliza o formulário no meio
        width: "100%",
    },

    // 3. Cada item do formulário
    form: {
        width: "100%",
        marginBottom: 20,
    },
    
    // 4. O container do botão
    buttonContainer: {
        width: "100%",
        marginTop: 20, // Um espaço extra antes do botão
    },

    // 5. O rodapé: fica "naturalmente" embaixo
    footer: {
        width: "100%",
        paddingBottom: 40, // Um respiro na parte de baixo
    },

    footerText: {
        textAlign: "center",
        color: "#FFF", // Texto branco
        fontSize: 16
    },
}