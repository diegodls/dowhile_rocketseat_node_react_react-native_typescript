import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme';

export const styles = StyleSheet.create({
  backDrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'relative',
    zIndex: 999,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    height: 'auto',
    backgroundColor: COLORS.BLACK_TERTIARY,
    padding: 15,
  },
  title: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  message: {
    fontSize: 20,
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },

  error: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
});
