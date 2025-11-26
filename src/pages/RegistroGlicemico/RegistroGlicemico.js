import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46A376', // Verde da marca
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    backButton: {
        marginRight: 15,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    // A mágica do "Card Branco" que sobe
    formArea: {
        flex: 1,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingHorizontal: 25,
        paddingTop: 30,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        color: '#333',
        fontWeight: 'bold',
        marginBottom: 8,
        marginLeft: 5,
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#eee',
    },
    inputDate: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#eee',
    },
    inputDateText: {
        fontSize: 16,
        color: '#333',
    },
    pickerContainer: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#eee',
        // Ajustes para o Picker no Android ficar bonito
        overflow: 'hidden',
    },
    picker: {
        width: '100%',
        color: '#333',
    },
    inputNotes: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        fontSize: 16,
        color: '#333',
        borderWidth: 1,
        borderColor: '#eee',
        textAlignVertical: 'top', // Para o texto começar em cima no multiline
        height: 100,
    },
    saveButtonContainer: {
        marginTop: 20,
    },
    cancelButtonText: {
        textAlign: 'center',
        color: '#999',
        fontSize: 16,
        marginBottom: 20,
    }
});