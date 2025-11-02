// login.style.js (AJUSTADO - textos brancos)
import { COLORS, FONT_SIZE } from "../../constants/theme";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");
const isSmallScreen = height < 700;

export const styles = {
    container: {
        flex: 1,
        backgroundColor: "#46A376",
    },

    keyboardView: {
        flex: 1,
    },

    scrollContainer: {
        flexGrow: 1,
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: width * 0.05,
        paddingVertical: isSmallScreen ? 15 : 35,
    },

    formGroup: {
        width: "100%",
        alignItems: "center",
        marginTop: isSmallScreen ? 40 : height * 0.12,
        marginBottom: isSmallScreen ? 25 : 45,
    },

    // “Bem-vindo”
    welcomeText: {
        fontSize: isSmallScreen ? FONT_SIZE.md : FONT_SIZE.lg,
        color: "#FFFFFF", // forçado pra branco
        fontWeight: "bold",
        marginBottom: 25,
        alignSelf: "flex-start",
    },

    form: {
        width: "100%",
        marginBottom: 25,
        gap: 20,
    },

    input: {
        height: isSmallScreen ? 50 : 60,
        borderRadius: 10,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 15,
        fontSize: FONT_SIZE.lg,
        elevation: 2,
    },

    // “Esqueceu a senha?”
    forgotPasswordContainer: {
        width: "100%",
        alignItems: "flex-end",
        marginTop: -5,
        marginBottom: 25,
    },

    forgotPasswordText: {
        color: "#FFFFFF", // forçado pra branco
        fontSize: FONT_SIZE.md,
        fontWeight: "500",
    },

    // “Ou se cadastre”
    footer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
    },

    footerText: {
        textAlign: "center",
        color: "#FFFFFF", // forçado pra branco
        fontSize: FONT_SIZE.md,
        opacity: 0.9,
    },
};
