// Em: src/pages/Exames/exames.style.js (COMPLETO)

import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZE } from '../../constants/theme'; // Certifique-se que você tem essas constantes

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9F9F9', // Um fundo branco/cinza claro
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: '#FFF',
        borderBottomWidth: 1,
        borderBottomColor: '#EEE',
    },
    headerTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 'bold',
        color: '#333',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        padding: 20,
    },
    itemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
    },
    itemIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#E8F5E9', // Verde claro
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
    },
    itemContent: {
        flex: 1, // Ocupa o espaço
    },
    itemTitle: {
        fontSize: FONT_SIZE.md,
        fontWeight: 'bold',
        color: '#333',
    },
    itemSubtitle: {
        fontSize: FONT_SIZE.sm,
        color: '#777',
        marginTop: 2,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: width * 0.5,
    },
    emptyText: {
        fontSize: FONT_SIZE.md,
        fontWeight: 'bold',
        color: '#555',
    },
    emptySubtitle: {
        fontSize: FONT_SIZE.sm,
        color: '#888',
        marginTop: 5,
    },
    floatingButton: {
        position: 'absolute',
        bottom: 100, // (Para ficar acima da barra de abas flutuante)
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#46A376', // Seu verde
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },

    // --- ESTILOS DO MODAL (POP-UP) ---

    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
    },
    previewContainer: {
        width: '100%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#EEE',
        borderRadius: 10,
    },
    previewImage: {
        width: '100%',
        height: '100%',
    },
    modalTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalButton: {
        width: '100%',
        backgroundColor: '#46A376',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    modalButtonText: {
        color: '#FFF',
        fontSize: FONT_SIZE.md,
        fontWeight: 'bold',
    },
});