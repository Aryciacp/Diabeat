// Em: src/pages/RegistroGlicemico/RegistroGlicemico.style.js

import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZE } from '../../constants/theme'; 

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#46A376", // fundo verde do topo
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: FONT_SIZE.lg,
        color: COLORS.white,
        fontWeight: 'bold',
    },
    // área branca agora igual à caixa de observação
    formArea: {
        flex: 1,
        width: '100%',
        backgroundColor: "#fff", // antes era COLORS.white — agora o mesmo branco puro da observação
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40,
    },
    formGroup: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: FONT_SIZE.md,
        color: '#333',
        marginBottom: 8,
        fontWeight: '500',
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: FONT_SIZE.md,
        color: '#333',
    },
    inputDate: { 
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: 'center',
    },
    inputDateText: {
        color: '#333',
        fontSize: FONT_SIZE.md,
    },
    pickerContainer: { 
        width: '100%',
        height: 50,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        justifyContent: "center",
    },
    picker: {
        width: '100%',
        color: '#333',
    },
    inputNotes: { 
        width: "100%", 
        minHeight: 100, 
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 10, 
        fontSize: FONT_SIZE.md,
        color: "#333",
        textAlignVertical: 'top',
    },
    saveButtonContainer: {
        marginTop: 20,
        width: '100%',
    },
    cancelButtonText: {
        textAlign: "center",
        color: '#6c757d',
        fontSize: FONT_SIZE.md,
        marginTop: 15,
    },
});
