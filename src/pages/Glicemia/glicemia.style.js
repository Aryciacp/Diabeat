// Em: src/pages/Glicemia/glicemia.style.js
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZE } from '../../constants/theme'; // Supondo que você tem isso

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContainer: {
        flex: 1,
    },
    infoContainer: {
        paddingHorizontal: width * 0.05, // 5% de padding lateral
        paddingBottom: 40,
    },
    headerTitle: {
        fontSize: FONT_SIZE.lg,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginVertical: 20,
    },
    chartContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    chart: {
        borderRadius: 16,
    },
    infoText: {
        fontSize: FONT_SIZE.md,
        color: '#555',
        textAlign: 'center',
        marginBottom: 5,
    },
    infoBold: {
        fontWeight: 'bold',
        color: '#333',
    },
    actionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#46A376', // Seu verde
        borderRadius: 10,
        paddingVertical: 15,
        width: '100%',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    actionButtonText: {
        color: '#fff',
        fontSize: FONT_SIZE.md,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});