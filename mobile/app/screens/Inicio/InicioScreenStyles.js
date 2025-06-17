import { StyleSheet } from 'react-native';
import { colors, fonts } from '../../constants/theme';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7B1FA2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarContainer: {
    marginBottom: -20,
  },
  avatar: {
    width: 250,
    height: 250,
    tintColor: '#fff',
  },
  username: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 100,
  },
  button: {
      backgroundColor: colors.white,
      paddingVertical: 20,
      paddingHorizontal: 10,
      borderRadius: 10,
      width: '75%',
      marginTop: 20,
      marginBottom: 10,
      alignSelf: 'center',
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