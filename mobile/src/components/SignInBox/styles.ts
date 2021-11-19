import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

export const styles = StyleSheet.create({
  container: {
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: getBottomSpace() + 32,
  },
  title: {
    fontSize: 20,
    color: '#1D1D1D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
