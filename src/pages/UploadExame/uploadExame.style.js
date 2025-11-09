// Em: src/pages/UploadExame/uploadExame.style.js (ARQUIVO NOVO)
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZE } from '../../constants/theme';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
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
    scrollContainer: {
        padding: 20,
    },
    formGroup: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: FONT_SIZE.md,
        color: '#333',
        fontWeight: '500',
        marginBottom: 8,
    },
    input: {
        width: '100%',
        height: 50, 
        backgroundColor: '#F9F9F9',
        borderWidth: 1,
        borderColor: "#EEE",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: FONT_SIZE.md,
        color: '#333',
        justifyContent: 'center',
    },
});