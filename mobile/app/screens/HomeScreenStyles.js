import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: fonts.bold,
    marginBottom: 40,
    color: colors.primary,
    textAlign: 'center',
  },
  button: {
    backgroundColor: colors.white,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 12,
    width: '80%',
    marginTop: 30,
  },
  buttonText: {
    color: colors.purple,
    fontSize: 22,
    fontFamily: fonts.bold,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default styles;