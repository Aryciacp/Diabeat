// ARQUIVO: src/pages/MudarSenha/MudarSenha.style.js

import { StyleSheet, Dimensions } from "react-native";
import { COLORS } from "../../constants/theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#46A376", // Fundo Verde
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: "center",
        padding: 20,
        paddingBottom: 40,
    },
    
    // Logo
    logoContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    logo: {
        width: 140,
        height: 140,
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
        fontSize: 22,
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
        color: "#444",
        marginBottom: 6,
        fontWeight: "600",
        fontSize: 14,
        marginLeft: 4,
    },
    inputBackground: {
        backgroundColor: "#F5F5F5",
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
        fontWeight: "500",
    }
});