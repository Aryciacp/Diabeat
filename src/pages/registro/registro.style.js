// EM: src/pages/registro/registro.style.js (CORRIGIDO E AJUSTADO)
import { FONT_SIZE } from "../../constants/theme";
import { Dimensions } from "react-native";

const { height } = Dimensions.get("window");
const isSmallScreen = height < 700;

export const styles = {
    // Container principal
    container: {
        flex: 1,
        backgroundColor: "#46A376", // mesmo verde do login e mudar senha
    },

    // ScrollView — área rolável
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: isSmallScreen ? 20 : 35,
    },

    // Agrupamento da logo e do formulário
    formGroup: {
        width: "100%",
        alignItems: "center",
        marginTop: isSmallScreen ? 20 : height * 0.06, // diminui o espaçamento
        marginBottom: isSmallScreen ? 25 : 45,
    },

    // “Cadastro”
    welcomeText: {
        fontSize: isSmallScreen ? FONT_SIZE.md : FONT_SIZE.lg,
        color: "#FFFFFF", // branco fixo, independente do tema
        fontWeight: "bold",
        marginBottom: 25,
        alignSelf: "flex-start",
    },

    // Inputs do formulário
    form: {
        width: "100%",
        marginBottom: 25,
    },

    // Rodapé (“Já tenho uma conta”)
    footer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },

    footerText: {
        textAlign: "center",
        color: "#FFFFFF", // branco fixo
        fontSize: FONT_SIZE.md,
        opacity: 1,
    },
};
