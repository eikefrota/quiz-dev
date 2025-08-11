import { StyleSheet, Dimensions } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.92;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: 'transparent',
  },
  title: {
    fontSize: 32,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 18,
    textAlign: 'center',
    marginTop: 70,
    letterSpacing: 1,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 40,
    paddingTop: 10,
    width: '100%',
  },
  temasGrid: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
  },
  temaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 18,
    marginBottom: 6,
    width: CARD_WIDTH,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.10,
    shadowRadius: 6,
    elevation: 2,
  },
  emojiCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f3e6fa',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 18,
  },
  emoji: {
    fontSize: 28,
    textAlign: 'center',
  },
  temaText: {
    fontSize: 21,
    color: colors.purple,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: 2,
  },
});

export default styles;