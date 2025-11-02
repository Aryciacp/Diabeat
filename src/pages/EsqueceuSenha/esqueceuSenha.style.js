// EM: esqueceuSenha.style.js (CORRIGIDO)
import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = StyleSheet.create({
    // 1. O container principal (ocupa a tela toda)
    container: {
        flex: 1, 
        backgroundColor: "#46A376", // Mesmo verde do Login
    },
    
    // 2. O ScrollView (é onde o conteúdo vai rolar)
    scrollContainer: {
        flexGrow: 1, // Garante que o conteúdo possa crescer
        justifyContent: 'space-between', // Joga o footer para o final
        alignItems: 'center', // Centraliza tudo
        paddingHorizontal: 15, // Padding lateral (para os inputs não colarem na borda)
        paddingVertical: 30, // Um espaço em cima e embaixo
    },

    // 3. O grupo do formulário (agora com 100% de largura)
    formGroup: {
        width: "100%", // Ocupa 100% da largura (que tem o padding de 15)
        alignItems: 'center', // Centraliza a logo
    },

    // 4. Texto "Recuperar Senha" (usando o mesmo estilo do 'welcomeText')
    titleText: {
        fontSize: FONT_SIZE.lg, 
        color: COLORS.white,
        fontWeight: 'bold',
        marginBottom: 25,
        alignSelf: 'flex-start', // Alinha à esquerda
    },

    // 5. Cada item do formulário
    form: {
        width: "100%",
        marginBottom: 15,
    },

    // 6. O rodapé (para o link "Voltar")
    footer: {
        width: "100%",
    },

    footerText: {
        textAlign: "center",
        color: COLORS.white, 
        fontSize: FONT_SIZE.md
    },
});