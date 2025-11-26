import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46A376', // Verde da Marca
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff',
    },
    // Card Branco (Efeito Folha)
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
    scrollContainer: {
        paddingBottom: 40
    }
});