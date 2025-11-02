// EM: src/pages/MudarSenha/MudarSenha.style.js
// (É basicamente uma cópia do login.style.js)

import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    container: {
        flex: 1, 
        backgroundColor: "#46A376", 
    },
    scrollContainer: {
        flexGrow: 1, 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        paddingHorizontal: 15, 
        paddingVertical: 30, 
    },
    formGroup: {
        width: "100%", 
        alignItems: 'center', 
    },
    welcomeText: {
        fontSize: FONT_SIZE.lg, 
        color: COLORS.white,
        fontWeight: 'bold',
        marginBottom: 25,
        alignSelf: 'flex-start', 
    },
    form: {
        width: "100%",
        marginBottom: 15,
    },
    footer: {
        width: "100%",
    },
    footerText: {
        textAlign: "center",
        color: COLORS.white, 
        fontSize: FONT_SIZE.md
    },
}