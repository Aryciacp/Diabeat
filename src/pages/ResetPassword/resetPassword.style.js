import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    // 1. O container principal: ocupa 100% da tela
    container: {
        flex: 1,
        backgroundColor: "#46A376",
        paddingHorizontal: 20,
    },

    // 2. O grupo do formulário: centralizado vertical e horizontalmente
    formGroup: {
        flex: 1,
        justifyContent: "center", // centraliza verticalmente
        alignItems: "center", // centraliza horizontalmente
        width: "100%",
    },

    // 3. Cada item do formulário
    form: {
        width: "80%", // menor que 100% pra ficar centralizado e não colar nas bordas
        marginBottom: 20,
    },
    
    // 4. O container do botão
    buttonContainer: {
        width: "80%", // mesma largura dos inputs
        marginTop: 20,
    },

    // 5. O rodapé
    footer: {
        width: "100%",
        paddingBottom: 40,
    },

    footerText: {
        textAlign: "center",
        color: "#FFF",
        fontSize: 16
    },
};
