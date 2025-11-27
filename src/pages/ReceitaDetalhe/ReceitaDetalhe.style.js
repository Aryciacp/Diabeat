// ARQUIVO: src/pages/ReceitaDetalhe/ReceitaDetalhe.style.js

import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');
const PRIMARY_COLOR = '#46A376'; // Seu verde padrão
const BG_COLOR = '#F8F9FA'; // Um cinza muito clarinho para o fundo geral
const TEXT_COLOR = '#333333';
const SOFT_TEXT = '#666666';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: BG_COLOR,
    },

    // --- IMAGEM DE FUNDO E HEADER ---
    imageContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: width,
        height: 400, // Aumentei um pouco a altura da imagem
    },
    recipeImage: {
        width: '100%',
        height: '100%',
    },
    // O novo degradê substitui o overlay chapado
    topGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 120, // Só escurece o topo onde fica o botão voltar e a status bar
    },

    // --- BOTÃO VOLTAR ---
    backButton: {
        position: 'absolute',
        // Ajuste fino para ficar alinhado com a status bar
        top: Platform.OS === 'ios' ? 50 : 45, 
        left: 25,
        width: 40,
        height: 40,
        // Fundo "vidro fosco" (blur) no iOS, semi-transparente no Android
        backgroundColor: Platform.OS === 'ios' ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.25)',
        borderRadius: 14, // Bordas mais quadradas, mais moderno
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        // Adiciona efeito de Blur no iOS (opcional, fica muito bonito)
        ...Platform.select({
            ios: {
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.15,
                shadowRadius: 3.84,
                backdropFilter: 'blur(10px)', 
            },
        }),
    },

    // --- SCROLL E CORPO DO CONTEÚDO ---
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentBody: {
        backgroundColor: '#FFFFFF',
        // Bordas superiores BEM arredondadas
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        paddingHorizontal: 28, // Mais espaço lateral
        paddingTop: 12,
        minHeight: height - 300,
        // Sombra mais difusa e elegante
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -5 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 15, // Sombra forte no Android para destacar
    },

    // "Puxador" visual
    handleBarContainer: {
        alignItems: 'center',
        paddingVertical: 10,
        marginBottom: 5,
    },
    handleBar: {
        width: 50,
        height: 5,
        backgroundColor: '#E0E0E0',
        borderRadius: 3,
    },

    // --- TÍTULO E BADGES ---
    title: {
        fontSize: 28, // Fonte bem maior
        fontWeight: '800', // Extra negrito
        color: TEXT_COLOR,
        textAlign: 'left', // Alinhado à esquerda fica mais moderno
        marginBottom: 18,
        marginTop: 5,
        lineHeight: 34, // Melhor leitura se quebrar linha
    },
    badgesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10, // Espaço entre os badges (React Native moderno)
        marginBottom: 25,
    },
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#E8F5E9', // Verde bem clarinho
        paddingVertical: 8,
        paddingHorizontal: 14,
        borderRadius: 16,
    },
    badgeText: {
        color: PRIMARY_COLOR,
        fontWeight: '700',
        fontSize: 13,
        marginLeft: 6,
    },

    divider: {
        height: 1,
        backgroundColor: '#EEEEEE', // Divisor mais sutil
        marginVertical: 25,
    },

    // --- SEÇÕES ---
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: TEXT_COLOR,
        marginLeft: 10,
    },
    sectionSubtitle: {
        fontSize: 14,
        color: SOFT_TEXT,
        marginBottom: 20,
        marginLeft: 2,
    },

    // --- LISTA DE INGREDIENTES ---
    ingredientsList: {
        paddingLeft: 5,
    },
    ingredientItem: {
        flexDirection: 'row',
        alignItems: 'flex-start', // Alinha no topo caso o texto quebre linha
        marginBottom: 16, // Mais espaço entre os itens
        paddingRight: 10,
    },
    // O novo "check" verde
    checkIconContainer: {
        width: 22,
        height: 22,
        borderRadius: 11,
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 14,
        marginTop: 2, // Pequeno ajuste para alinhar com o texto
    },
    textItem: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24, // Leitura confortável
        flex: 1,
    },

    // --- LISTA DE INSTRUÇÕES ---
    instructionsList: {
        marginTop: 5,
    },
    instructionRow: {
        flexDirection: 'row',
        marginBottom: 25, // Bastante espaço entre os passos
    },
    stepNumberContainer: {
        width: 32,
        height: 32,
        borderRadius: 12, // Quadrado arredondado
        backgroundColor: PRIMARY_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
        // Sombra sutil no número
        shadowColor: PRIMARY_COLOR,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 4,
    },
    stepNumber: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    stepTextContainer: {
        flex: 1,
        backgroundColor: '#F5F7F6', // Fundo cinza claro para o texto do passo
        padding: 15,
        borderRadius: 16,
        borderTopLeftRadius: 4, // Dá um estilo de "balão de fala"
    },
    stepText: {
        fontSize: 16,
        color: '#444',
        lineHeight: 24,
        textAlign: 'left',
    },
});