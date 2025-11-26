import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#46A376', 
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginTop: 20,
        marginBottom: 10, // Diminuí a margem de baixo para caber os filtros
        borderRadius: 25,
        paddingHorizontal: 15,
        height: 50,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    searchIcon: { marginRight: 10 },
    searchInput: { flex: 1, fontSize: 16, color: '#333' },
    
    // --- ESTILOS DOS FILTROS (NOVO) ---
    filterContainer: {
        paddingHorizontal: 20,
        paddingBottom: 10,
        height: 50, // Altura fixa para o scroll horizontal
    },
    filterChip: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        marginRight: 10,
        borderWidth: 1,
        borderColor: '#fff',
        backgroundColor: 'transparent', // Fundo padrão transparente
    },
    filterChipSelected: {
        backgroundColor: '#fff', // Fundo branco quando selecionado
        borderColor: '#fff',
    },
    filterText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 14,
    },
    filterTextSelected: {
        color: '#46A376', // Texto verde quando selecionado
    },
    // ----------------------------------

    loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContent: { paddingHorizontal: 20, paddingBottom: 100 },
    card: {
        backgroundColor: '#fff', borderRadius: 15, marginBottom: 15,
        flexDirection: 'row', alignItems: 'center', padding: 10,
        elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1, shadowRadius: 2,
    },
    cardImage: { width: 60, height: 60, borderRadius: 30, marginRight: 15, backgroundColor: '#eee' },
    textContainer: { flex: 1, justifyContent: 'center' },
    cardTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    arrowButton: {
        backgroundColor: '#46A376', width: 35, height: 35, borderRadius: 10,
        justifyContent: 'center', alignItems: 'center', marginLeft: 10,
    },
    emptyText: { textAlign: 'center', color: '#fff', marginTop: 50, fontSize: 16 }
});