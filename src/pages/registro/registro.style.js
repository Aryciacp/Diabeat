// ARQUIVO: src/pages/Registro/registro.style.js

import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#46A376", // Verde do App
    },
    
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 50, // AJUSTE 1: Empurra tudo um pouco pra cima
    },

    // Grupo do formulário (Logo + Inputs)
    formGroup: {
        width: "100%",
        alignItems: "center",
        // Removemos o flex: 1 daqui para ele não empurrar o footer lá pra baixo sozinho
    },

    welcomeText: {
        fontSize: 22,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 20,
        marginTop: 10,
    },

    form: {
        width: "100%",
        marginBottom: 15, // Espaço entre os inputs
    },

    // RODAPÉ (AJUSTADO PARA SUBIR)
    footer: {
        width: "100%",
        alignItems: "center",
        marginTop: 10,    // AJUSTE 2: Diminui distância do botão "Cadastrar"
        marginBottom: 40, // AJUSTE 3: Levanta o footer do fundo da tela
    },

    footerText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline", // Adicionei sublinhado para parecer link
    }
});