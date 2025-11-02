// Arquivo: usuario.style.js (Mesclado e Corrigido)
import { COLORS, FONT_SIZE } from "../../constants/theme";
import { Dimensions } from "react-native"; 

const { width, height } = Dimensions.get("window"); 

export const styles = {
    // Container principal da tela
    container: {
        flex: 1, 
        backgroundColor: "#fff", 
    },

    // Cabeçalho com fundo verde
    header: {
        width: "100%", 
        paddingVertical: height * 0.03, 
        paddingHorizontal: width * 0.05, 
        backgroundColor: "#46A376",
        flexDirection: "row", 
        alignItems: "center", 
    },

    profileContainer: {
        flexDirection: "row",
        alignItems: "center",
        flex: 1, 
    },
    avatarPlaceholder: {
        width: width * 0.15, 
        height: width * 0.15,
        borderRadius: (width * 0.15) / 2, 
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },
    nameContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginLeft: width * 0.03, 
    },
    userName: {
        color: "#fff",
        fontSize: FONT_SIZE.medium + 2, 
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

    // Container das informações (agora sem 'alignItems')
    infoContainer: {
        flexGrow: 1,
        paddingHorizontal: width * 0.05, // 5% de padding lateral
        paddingTop: height * 0.03,
        paddingBottom: height * 0.05, // Mais espaço no final
        // 'alignItems: "center"' foi removido para usarmos 100% da largura
    },

    // --- NOVOS ESTILOS ADICIONADOS ---
    formGroup: {
        width: "100%", // Ocupa 100% do infoContainer (que tem 5% de padding)
        marginBottom: height * 0.02, // Espaço entre os grupos
    },
    label: {
        fontSize: FONT_SIZE.md,
        color: '#333',
        fontWeight: '500',
        marginBottom: 6,
        marginLeft: 4,
    },
    // --- FIM DOS NOVOS ESTILOS ---

    // Input de texto (agora com 100% de largura e sem margem)
    input: {
        width: "100%", // 100% do formGroup
        height: height * 0.065, 
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#C7C7C7",
        borderRadius: 10,
        paddingHorizontal: 16,
        // 'marginBottom' foi movido para 'formGroup'
        fontSize: FONT_SIZE.medium,
        color: "#333",
    },

    // Container do Picker (agora com 100% de largura e sem margem)
    pickerContainer: {
        width: "100%", // 100% do formGroup
        height: height * 0.065,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#C7C7C7",
        borderRadius: 10,
        // 'paddingHorizontal' foi removido para o Picker centralizar
        // 'marginBottom' foi movido para 'formGroup'
        justifyContent: "center",
    },

    // Estilo para o input/picker quando estiver desabilitado
    disabledInput: {
        backgroundColor: '#F0F0F0', // Fundo cinza
        color: '#999',
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
    
    // Botão "Alterar Senha"
    passwordButton: {
        backgroundColor: '#6c757d', // Cor cinza
    },
};