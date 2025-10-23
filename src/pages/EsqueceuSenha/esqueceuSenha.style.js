import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    container: {
        width: "90%",
        flex: 1,
        padding: 40,
        justifyContent: "center",
        alignItems: "center",
    },
    formGroup: {
        width: "100%",
        marginTop: 10,
        marginBottom: 200,
    },
    form: {
        width: "100%",
        marginBottom: 30,
    },
    footer: {
        width: "80%",
        position: "absolute",
        bottom: 0,
        marginBottom: 40,
    },
    footerText: {
        textAlign: "center",
        color: COLORS.dark_gray,
        fontSize: FONT_SIZE.md,
    },
    backContainer: {
        alignItems: "center",
        marginTop: 20,
    },
    backText: {
        color: "#FFFFFF",
        fontSize: FONT_SIZE.md,
        textDecorationLine: "underline",
    },
    sendButtonContainer: {
        width: "100%",
        marginTop: 10,
    },
};
