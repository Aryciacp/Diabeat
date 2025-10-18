import { COLORS, FONT_SIZE } from "../../constants/theme"

export const styles = {
    container: {
        width: "100%",
        flex: 1,
        padding: 10,
        justifyContent: "center",
        alignItems: "center"
        
    },
    form: {
        width: "100%",
        marginBottom: 20
    },
    formGroup: {
        width: "100%",
        marginTop: 10,
        marginBottom: 40
    },
    footer: {
        width: "900%",
        position: "absolute",
        bottom: 0,
        marginBottom:-80
    },
    footerText: {
        textAlign: "center",
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.md
    }
}