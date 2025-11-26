import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46A376', // <--- Verde Corrigido
    },
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingTop: 10,
        paddingBottom: 10,
        alignItems: 'center',
    },
    backButton: {
        padding: 5,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
        paddingTop: 40,
        marginTop: 20, 
    },
    imageWrapper: {
        alignItems: 'center',
        marginTop: -90, 
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
    bigImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        borderWidth: 4,
        borderColor: '#fff', 
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#333',
        marginBottom: 5,
    },
    badgesContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
        marginTop: 10,
        gap: 10,
    },
    badge: {
        backgroundColor: '#f0f9f4', // Um verde bem clarinho para o fundo do badge
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#46A376' // <--- Borda Verde Corrigido
    },
    badgeText: {
        color: '#46A376', // <--- Texto Verde Corrigido
        fontSize: 12,
        fontWeight: 'bold',
        marginLeft: 5
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#46A376', // <--- Título Verde Corrigido
        marginTop: 20,
        marginBottom: 10,
    },
    textItem: {
        fontSize: 15,
        color: '#555',
        marginBottom: 8,
        lineHeight: 22,
    },
    divider: {
        height: 1,
        backgroundColor: '#eee',
        marginVertical: 20,
    },
    instructionRow: {
        flexDirection: 'row',
        marginBottom: 12,
        paddingRight: 10,
    },
    stepNumber: {
        fontWeight: 'bold',
        marginRight: 10,
        color: '#46A376', // <--- Número do passo Verde Corrigido
        fontSize: 16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#46A376' // <--- Fundo Verde Corrigido
    }
});