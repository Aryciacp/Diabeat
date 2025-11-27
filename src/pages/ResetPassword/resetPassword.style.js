// EM: src/pages/ResetPassword/resetPassword.style.js

import { Dimensions } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme";

const { width } = Dimensions.get('window');

export const styles = {
    container: {
        flex: 1,
        backgroundColor: "#46A376", // Fundo Verde
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
    },
    
    // Logo
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    logo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },

    // --- O CARD BRANCO ---
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 25,
        width: '100%',
        
        // Sombra para dar profundidade
        elevation: 8, // Android
        shadowColor: "#000", // iOS
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },

    // Textos
    titleText: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 5,
    },
    subtitleText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 25,
    },

    // Inputs
    form: {
        marginBottom: 15,
        width: "100%",
    },
    label: {
        color: "#444", // Cinza escuro (contraste com fundo branco)
        marginBottom: 6,
        fontWeight: "600",
        fontSize: 14,
        marginLeft: 4,
    },
    inputBackground: {
        backgroundColor: "#F5F5F5", // Cinza bem claro para o input
        borderColor: "#E0E0E0",
        borderWidth: 1,
    },

    // Botões
    buttonContainer: {
        marginTop: 15,
        width: "100%",
    },
    mainButton: {
        backgroundColor: '#46A376',
        width: '100%',
        borderRadius: 12,
        paddingVertical: 14,
    },
    backButton: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    },
    backText: {
        color: "#999",
        fontSize: 16,
    }
};