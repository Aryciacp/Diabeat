import { COLORS, FONT_SIZE } from "../../constants/theme";
import { Dimensions } from "react-native"; // pra pegar largura/altura da tela

const { width, height } = Dimensions.get("window"); // largura e altura da tela

export const styles = {
    // Container principal da tela
    container: {
        flex: 1, // ocupa toda a tela
        backgroundColor: "#fff", // fundo branco
    },

    // Cabeçalho com fundo verde
    header: {
        width: "100%", // ocupa toda a largura
        paddingVertical: height * 0.03, // padding relativo à altura da tela
        paddingHorizontal: width * 0.05, // padding relativo à largura da tela
        backgroundColor: "#46A376",
        flexDirection: "row", // elementos na horizontal
        alignItems: "center", // alinha verticalmente
    },

    // Container do avatar e nome
    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1, // ocupa espaço restante
    },

    // Avatar do usuário
    avatarPlaceholder: {
        width: width * 0.15, // tamanho relativo à largura da tela
        height: width * 0.15,
        borderRadius: (width * 0.15) / 2, // circular
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },

    // Container do nome e ícone de edição
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: width * 0.03, // margem relativa
    },

    userName: {
        color: "#fff",
        fontSize: FONT_SIZE.medium + 2, // ajusta o tamanho do texto
        fontWeight: "bold",
    },

    editIcon: {
        marginLeft: width * 0.02,
    },

    // Scroll container da tela
    scrollContainer: {
        flex: 1,
        width: "100%",
    },

    // Container das informações do perfil
    infoContainer: {
        flexGrow: 1,
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.03, // distancia do header
        alignItems: "center",
    },

    // Input de texto
    // Input de texto (agora responsivo)
    input: {
        width: width * 0.9, // 90% da largura da tela
        height: height * 0.065, // altura proporcional à tela
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#C7C7C7",
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: height * 0.02,
        fontSize: FONT_SIZE.medium,
        color: "#333",
        alignSelf: "center", // centraliza na tela
    },

    // Container do Picker (dropdown) responsivo também
    pickerContainer: {
        width: width * 0.9, // 90% da largura da tela
        maxWidth: 460,      // mantém consistência com o input
        height: height * 0.065,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#C7C7C7",
        borderRadius: 10,
        paddingHorizontal: 16,
        marginBottom: height * 0.02,
        justifyContent: "center",
        alignSelf: "center", // centraliza também
    },

    // Botão salvar
    saveButton: {
        width: "100%",
        height: height * 0.065,
        backgroundColor: "#2E7D5A",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height * 0.015,
    },

    saveButtonText: {
        color: "#fff",
        fontSize: FONT_SIZE.medium,
        fontWeight: "bold",
    },


};
