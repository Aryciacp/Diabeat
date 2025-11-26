import { StyleSheet } from 'react-native';
import { COLORS, FONT_SIZE } from '../../constants/theme';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    warningIconContainer: {
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#D32F2F', // Vermelho alerta
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
        lineHeight: 24,
    },
    buttonContainer: {
        width: '100%',
        gap: 15, // Espaço entre botões
    },
});