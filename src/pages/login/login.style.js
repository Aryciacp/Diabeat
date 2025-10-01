import { COLORS, FONT_SIZE } from "../../constants/theme"

export const styles = {
    container: {
        width: "90%",
        flex: 1,
        padding: 40,
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        width: "100%",
        marginBottom: 30
    },
    formGroup: {
        width: "100%",
        marginTop: 40,
        marginBottom: 220
    },
    footer: {
        width: "80%",
        position: "absolute",
        bottom: 0,
        marginBottom: 40
    },
    footerText: {
        textAlign: "center",
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.md
    }
}