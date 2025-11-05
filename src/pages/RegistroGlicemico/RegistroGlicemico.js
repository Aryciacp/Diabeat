// Em: src/pages/RegistroGlicemico/RegistroGlicemico.style.js

import { StyleSheet, Dimensions } from 'react-native';
// Certifique-se que você tem 'COLORS' e 'FONT_SIZE' no seu 'theme.js'
import { COLORS, FONT_SIZE } from '../../constants/theme'; 

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#46A376", // Fundo verde da tela toda (para o header)
    },
    // O ScrollView agora começa no topo
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'flex-start', // Alinha o conteúdo ao topo
        alignItems: 'center',
    },
    // O cabeçalho verde
    header: {
        width: '100%',
        paddingVertical: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: FONT_SIZE.lg, // Ajuste se precisar de um tamanho maior
        color: COLORS.white,
        fontWeight: 'bold',
    },
    // A área branca do formulário
    formArea: {
        flex: 1, // Ocupa o restante do espaço
        width: '100%',
        backgroundColor: COLORS.white, // Fundo branco do formulário
        borderTopLeftRadius: 30, // Bordas arredondadas no topo
        borderTopRightRadius: 30,
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 40, // Espaço para não tocar a barra inferior
    },
    formGroup: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        fontSize: FONT_SIZE.md,
        color: '#333', // Cor de texto mais escura
        marginBottom: 8,
        fontWeight: '500', 
    },
    // Estilo padrão do Input (para Valor)
    input: {
        width: '100%',
        height: 50, 
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: "#ccc", // Borda cinza
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: FONT_SIZE.md,
        color: '#333',
    },
    // Estilo para o campo de Data/Hora (para parecer um input)
    inputDate: { 
        width: '100%',
        height: 50,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 15,
        justifyContent: 'center', // Centraliza o texto verticalmente
    },
    inputDateText: {
        color: '#333',
        fontSize: FONT_SIZE.md,
    },
    // Estilo para o <Picker> de Contexto
    pickerContainer: { 
        width: '100%',
        height: 50,
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        justifyContent: "center",
    },
    picker: {
        width: '100%',
        color: '#333',
    },
    // Estilo para o campo "Observação" (multi-linha)
    inputNotes: { 
        width: "100%", 
        minHeight: 100, 
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 10, 
        fontSize: FONT_SIZE.medium,
        color: "#333",
        textAlignVertical: 'top', 
    },
    saveButtonContainer: {
        marginTop: 20,
        width: '100%',
    },
    cancelButtonText: {
        textAlign: "center",
        color: '#6c757d', // Cor cinza
        fontSize: FONT_SIZE.md,
        marginTop: 15,
    },
});