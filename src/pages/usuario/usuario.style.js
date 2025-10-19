import { COLORS, FONT_SIZE } from "../../constants/theme";

export const styles = {
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
    },
    header: {
        backgroundColor: "#46A376",
        width: "100%",
        height: 140,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 20,
    },
    profileContainer: {
        alignItems: "center",
    },
    avatarPlaceholder: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#E0E0E0",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 10,
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
    },
    userName: {
        fontSize: FONT_SIZE.lg,
        color: "#fff",
        fontWeight: "600",
    },
    editIcon: {
        marginLeft: 5,
    },
    infoContainer: {
        width: "90%",
        marginTop: 20,
    },
    input: {
        width: "100%",
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        padding: 12,
        marginBottom: 15,
        fontSize: FONT_SIZE.md,
        color: "#333",
    },
    sectionTitle: {
        fontSize: FONT_SIZE.md,
        fontWeight: "bold",
        color: "#46A376",
        marginBottom: 8,
        marginTop: 10,
    },
    showPasswordButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        marginBottom: 10,
        gap: 6,
    },
    showPasswordText: {
        color: "#46A376",
        fontSize: FONT_SIZE.sm,
    },
    saveButton: {
        backgroundColor: "#46A376",
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
    },
    saveButtonText: {
        color: "#fff",
        fontSize: FONT_SIZE.md,
        fontWeight: "600",
    },
};
