import { StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  content: {
    paddingTop: 135,
    paddingBottom: 184,
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesTitle: {
    fontSize: 22,
    fontFamily: FONTS.BOLD,
    color: COLORS.GRAY_TERTIARY,
    marginBottom: 20,
  },
  noMessagesSubTitle: {
    fontSize: 18,
    fontFamily: FONTS.BOLD,
    color: COLORS.GRAY_SECONDARY,
    marginBottom: 20,
  },
});
