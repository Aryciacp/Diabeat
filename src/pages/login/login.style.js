// login.style.js (LOGO MAIS BAIXA + INPUTS MAIORES)
import { COLORS, FONT_SIZE } from "../../constants/theme";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const isSmallScreen = height < 700;

export const styles = {
    // Container principal
    container: {
        flex: 1,
        backgroundColor: "#46A376",
    },

    // KeyboardAvoidingView
    keyboardView: {
        flex: 1,
    },

    // ScrollView — mantém a rolagem suave e os espaçamentos equilibrados
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: width * 0.05,
        paddingVertical: isSmallScreen ? 15 : 35,
    },

    // Logo e boas-vindas (mais pra baixo agora)
    formGroup: {
        width: "100%",
        alignItems: "center",
        marginTop: isSmallScreen ? 40 : height * 0.12, // joga a logo mais pra baixo
        marginBottom: isSmallScreen ? 25 : 45,
    },

    welcomeText: {
        fontSize: isSmallScreen ? FONT_SIZE.md : FONT_SIZE.lg,
        color: COLORS.white,
        fontWeight: "bold",
        marginBottom: 25,
        alignSelf: "flex-start",
    },

    // Formulário — inputs maiores
    form: {
        width: "100%",
        marginBottom: 25,
        gap: 30, // mais espaçamento entre campos
    },

    // Inputs personalizados (se estiver usando TextBox, esse estilo pode ser aplicado dentro dele)
    input: {
        height: isSmallScreen ? 50 : 60, // inputs mais altos
        borderRadius: 10,
        backgroundColor: COLORS.white,
        paddingHorizontal: 15,
        fontSize: FONT_SIZE.lg, // texto maior nos inputs
        elevation: 2,
    },

    // "Esqueceu a senha"
    forgotPasswordContainer: {
        width: "100%",
        alignItems: "flex-end",
        marginTop: -5,
        marginBottom: 25,
    },

    forgotPasswordText: {
        color: COLORS.white,
        fontSize: FONT_SIZE.md,
        fontWeight: "500",
    },

    // Rodapé
    footer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },

    footerText: {
        textAlign: "center",
        color: COLORS.white,
        fontSize: FONT_SIZE.md,
        opacity: 0.9,
    },
};
