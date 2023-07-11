import storeUser from '@fishprovider/cross/stores/user';
import { ErrorType } from '@fishprovider/utils/constants/error';
import { StyleSheet } from 'react-native';

import { LoginMethods } from '~constants/user';
import { loginOAuth, logout } from '~libs/auth';
import Button from '~ui/Button';
import Text from '~ui/Text';
import View from '~ui/View';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 10,
    height: 1,
    width: '80%',
  },
});

export default function Account() {
  const {
    email,
  } = storeUser.useStore((state) => ({
    email: state.info?.email,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account</Text>
      <View style={styles.separator} />

      <Text>{email || ErrorType.accountNotFound}</Text>
      <View style={styles.separator} />

      <Button
        themeInverse
        onPress={() => loginOAuth(LoginMethods.google)}
      >
        Login with Google
      </Button>
      <View style={styles.separator} />

      <Button
        themeInverse
        onPress={() => loginOAuth(LoginMethods.apple)}
      >
        Login with Apple
      </Button>
      <View style={styles.separator} />

      <Button themeInverse onPress={logout}>Logout</Button>
    </View>
  );
}
