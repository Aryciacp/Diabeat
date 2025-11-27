// ARQUIVO: src/pages/DeletarConta/DeletarConta.style.js

import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#46A376", // Fundo Verde
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    // --- CARD BRANCO ---
    card: {
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 30,
        width: '100%',
        alignItems: 'center',
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },

    warningIconContainer: {
        marginBottom: 20,
        backgroundColor: '#FFEBEE', 
        padding: 20,
        borderRadius: 60,
    },

    title: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 10,
        textAlign: "center",
    },

    description: {
        fontSize: 15,
        color: "#666",
        textAlign: "center",
        marginBottom: 25,
        lineHeight: 22,
    },

    // --- ESTILO DOS BLOQUINHOS (OTP) ---
    otpContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 30,
    },
    otpBox: {
        width: 45, // Tamanho do quadrado
        height: 50,
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        backgroundColor: '#F9F9F9',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    otpBoxFilled: {
        borderColor: '#D32F2F', // Fica vermelho quando preenchido (alerta de perigo)
        backgroundColor: '#FFF',
    },

    buttonContainer: {
        width: '100%',
    }
});