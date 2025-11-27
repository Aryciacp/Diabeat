// EM: src/pages/EsqueceuSenha/esqueceuSenha.style.js

import { Dimensions } from "react-native";

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
        marginTop: 20,
    },
    logo: {
        width: 180, // Um pouco maior para destaque
        height: 180,
        resizeMode: 'contain',
    },

    // --- O CARD BRANCO ---
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 25,
        width: '100%',
        
        // Sombras
        elevation: 8,
        shadowColor: "#000",
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
        marginBottom: 10,
    },
    subtitleText: {
        fontSize: 14,
        color: "#666",
        textAlign: "center",
        marginBottom: 30,
        lineHeight: 20,
    },

    // Inputs
    form: {
        marginBottom: 20,
        width: "100%",
    },
    label: {
        color: "#444",
        marginBottom: 8,
        fontWeight: "600",
        fontSize: 14,
        marginLeft: 4,
    },
    inputBackground: {
        backgroundColor: "#F5F5F5", // Cinza claro
        borderColor: "#E0E0E0",
        borderWidth: 1,
    },

    // Botões
    buttonContainer: {
        marginTop: 10,
        width: "100%",
    },
    mainButton: {
        backgroundColor: '#46A376', // Verde do App
        width: '100%',
        borderRadius: 12,
        paddingVertical: 14,
    },

    // Links
    linkContainer: {
        marginTop: 20,
        alignItems: 'center',
        padding: 10,
    },
    linkText: {
        color: "#666",
        fontSize: 14,
    },
    linkBold: {
        color: "#46A376", // Verde destaque
        fontWeight: "bold",
        textDecorationLine: 'underline'
    },

    // Rodapé
    footer: {
        marginTop: 30,
        alignItems: 'center',
        paddingBottom: 20,
    },
    footerText: {
        color: "#FFF", // Branco (contraste com o fundo verde)
        fontSize: 16,
        fontWeight: "500",
    }
};