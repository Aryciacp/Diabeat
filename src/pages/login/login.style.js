// EM: login.style.js (CORRIGIDO)
import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    // 1. O container principal (ocupa a tela toda)
    container: {
        flex: 1, 
        backgroundColor: "#46A376", 
    },
    
    // 2. O KeyboardAvoidingView (só precisa ocupar o espaço)
    keyboardView: {
        flex: 1,
    },

    // 3. O ScrollView (é onde o conteúdo vai rolar)
    scrollContainer: {
        flexGrow: 1, // Garante que o conteúdo possa crescer
        justifyContent: 'space-between', // Joga o footer para o final
        alignItems: 'center', // Centraliza tudo
        paddingHorizontal: 15, // O padding lateral que você queria (para os inputs não colarem na borda)
        paddingVertical: 30, // Um espaço em cima e embaixo
    },

    // 4. O grupo do formulário (agora com 100% de largura)
    formGroup: {
        width: "100%", // Ocupa 100% da largura (que tem o padding de 15)
        alignItems: 'center', // Centraliza a logo
    },

    welcomeText: {
        fontSize: FONT_SIZE.lg, 
        color: COLORS.white,
        fontWeight: 'bold',
        marginBottom: 25,
        alignSelf: 'flex-start', // Alinha o "Bem-Vindo" à esquerda
    },

    form: {
        width: "100%",
        marginBottom: 15,
    },

    // 5. O rodapé
    footer: {
        width: "100%",
        // REMOVEMOS 'marginTop: auto'. O 'justifyContent: space-between'
        // no scrollContainer vai cuidar disso.
    },

    footerText: {
        textAlign: "center",
        color: COLORS.white, 
        fontSize: FONT_SIZE.md
    },

    // 6. "Esqueceu a senha"
    forgotPasswordContainer: {
        width: '100%',
        alignItems: "flex-end", // Alinha à direita
        marginTop: -5,
        marginBottom: 20,
    },
    
    forgotPasswordText: {
        color: COLORS.white, 
        fontSize: FONT_SIZE.md,
    }
}