// ARQUIVO: src/pages/Login/login.style.js

import { StyleSheet } from "react-native";
import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#46A376",
    },
    
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        paddingHorizontal: 20,
        paddingBottom: 50,
    },

    formGroup: {
        width: "100%",
        alignItems: "center",
        marginTop: 30,
    },

    welcomeText: {
        fontSize: 28,
        fontWeight: "bold",
        color: COLORS.white,
        marginBottom: 30,
        marginTop: 10,
    },

    form: {
        width: "100%",
        marginBottom: 15,
    },

    // --- ESTILOS DO BOTÃO GOOGLE ---
    googleButton: {
        backgroundColor: "#FFFFFF", // Fundo branco
        width: "100%",
        height: 50, // Mesma altura do botão padrão
        borderRadius: 6,
        flexDirection: "row", // Ícone lado a lado com texto
        justifyContent: "center",
        alignItems: "center",
        
        // Sombra suave para dar destaque
        elevation: 3, // Android
        shadowColor: "#000", // iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 10, // Espaço entre ícone e texto
        resizeMode: 'contain'
    },

    googleText: {
        color: "#333", // Texto cinza escuro (padrão Google)
        fontSize: 16,
        fontWeight: "bold",
    },

    // --- DIVISÓRIA "OU" ---
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    dividerLine: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255,255,255, 0.3)', // Linha branca transparente
    },
    dividerText: {
        color: '#FFF',
        paddingHorizontal: 10,
        fontSize: 14,
    },

    forgotPasswordContainer: {
        width: "100%",
        alignItems: "flex-end",
        marginTop: 5,
    },

    forgotPasswordText: {
        color: COLORS.white,
        fontSize: 14,
        fontWeight: "500",
    },

    footer: {
        width: "100%",
        alignItems: "center",
        marginTop: 20,
        marginBottom: 40,
    },

    footerText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "bold",
        textDecorationLine: "underline",
    }
});