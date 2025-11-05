// Em: src/pages/Glicemia/glicemia.style.js
import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONT_SIZE } from '../../constants/theme';

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
    paddingHorizontal: width * 0.06, // 6% lateral
    paddingTop: 20,
    paddingBottom: 80, // espaço extra embaixo para botões
    minHeight: height, // garante que o conteúdo ocupe a altura da tela e permita scroll natural
  },
  headerTitle: {
    fontSize: FONT_SIZE.lg,
    fontWeight: '700',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  chartContainer: {
    width: '100%',
    alignItems: 'center',      // centraliza horizontalmente o gráfico
    justifyContent: 'center',  // mantém o conteúdo do container centralizado verticalmente dentro do próprio bloco
    marginBottom: 12,
    paddingVertical: 10,
  },
  chart: {
    borderRadius: 16,
    alignSelf: 'center',
  },
  infoText: {
    fontSize: FONT_SIZE.md,
    color: '#555',
    textAlign: 'center',
    marginBottom: 6,
  },
  infoBold: {
    fontWeight: '700',
    color: '#333',
  },

  // "Inputs" / botões: empurrados mais pra baixo e com largura controlada
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#46A376',
    borderRadius: 12,
    paddingVertical: 14,
    width: '92%',      // mantém margem lateral consistente
    alignSelf: 'center',
    marginTop: 18,     // espaçamento entre botões
    marginBottom: 6,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: FONT_SIZE.md,
    fontWeight: '700',
    marginLeft: 10,
  },

  // caso precise posicionar um grupo final de botões mais embaixo ainda
  bottomSpacer: {
    height: 24, // use esse view como spacer se quiser mais espaço abaixo
  },
});
