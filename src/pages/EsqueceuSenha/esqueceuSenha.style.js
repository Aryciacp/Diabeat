// EM: esqueceuSenha.style.js
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE } from "../../constants/theme";

// Usamos StyleSheet.create para melhor performance e detecção de erros
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#46A376", // Assumindo o mesmo fundo verde
        paddingHorizontal: 20,
    },
    formGroup: {
        flex: 1, // "Cresce" para ocupar o espaço
        justifyContent: "center", // Centraliza o conteúdo verticalmente
        width: "100%",
    },
    form: {
        width: "100%",
        marginBottom: 30,
    },
    // Este é o "footer" para o link de "Voltar"
    footer: {
        width: "100%",
        paddingBottom: 40,
        alignItems: "center", // Centraliza o link de voltar
    },
    footerText: {
        textAlign: "center",
        color: "#FFF", // Cor branca para fundo verde
        fontSize: FONT_SIZE.md,
    }
});