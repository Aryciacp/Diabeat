// Em: src/pages/HistoricoGlicemia/HistoricoGlicemia.style.js

import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZE } from '../../constants/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    scrollContainer: {
        padding: 20,
        paddingBottom: 100,
    },
    headerTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
        marginTop: 10,
    },
    // --- Filtros ---
    filterContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 25,
    },
    filterButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9', // Verde bem clarinho
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#46A376',
        flex: 1,
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    filterButtonActive: {
        backgroundColor: '#46A376',
    },
    filterText: {
        color: '#46A376',
        marginLeft: 8,
        fontWeight: '600',
        fontSize: 14,
    },
    filterTextActive: {
        color: '#FFF',
    },

    // --- Gráfico ---
    chartTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#666',
        marginBottom: 10,
    },
    chartContainer: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 10,
        marginBottom: 25,
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },

    // --- Lista ---
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    historyItem: {
        backgroundColor: '#FFF',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginBottom: 12,
        elevation: 2,
        borderLeftWidth: 5,
        borderLeftColor: '#46A376', // Barra lateral verde
    },
    timeContainer: {
        marginRight: 15,
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: '#EEE',
        paddingRight: 15,
        width: 60,
    },
    timeText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    dataContainer: {
        flex: 1,
    },
    valueText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    contextText: {
        fontSize: 13,
        color: '#666',
        marginTop: 2,
    },
    editButton: {
        backgroundColor: '#46A376',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
    },
    editButtonText: {
        color: '#FFF',
        fontSize: 12,
        fontWeight: 'bold',
    },

    // --- Modal de Edição ---
    modalBackdrop: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    modalContainer: {
        width: '100%',
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        elevation: 5,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#46A376',
    },
    label: {
        color: '#666',
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: '#DDD',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: '#F9F9F9',
        color: '#333',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});