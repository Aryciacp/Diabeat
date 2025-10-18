import { COLORS, FONT_SIZE } from "../../constants/theme"

export const styles = {
    btn: {
        backgroundColor: "#64CD9A",
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2 
    },
    btnText: {
        color: "#FFFFFF", // letra branca
        fontSize: FONT_SIZE.md,
        fontWeight: "400"
    }
};