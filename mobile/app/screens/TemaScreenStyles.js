import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', // centraliza verticalmente
    alignItems: 'center',     // centraliza horizontalmente
  },
  title: {
    marginTop: 80,
    fontSize: 34,
    color: colors.white,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
  },
  temasContainer: {
    width: '100%',
    alignItems: 'center',
  },
  temaButton: {
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: colors.white,
    borderRadius: 11,
    paddingVertical: 22,
    paddingHorizontal: 30,
    marginBottom: 28,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12,
    shadowRadius: 6,
    elevation: 3,
  },
  emoji: {
    fontSize: 38,
    marginBottom: 8, // espaço entre emoji e texto
    marginRight: 0,  // remove margem lateral
    textAlign: 'center',
  },
  temaText: {
    fontSize: 22,
    color: colors.purple,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;