import { ErrorType } from '@fishbot/utils/constants/error';
import { StyleSheet } from 'react-native';
import { Button } from 'tamagui';

import EditScreenInfo from '~components/EditScreenInfo';
import { Text, View } from '~components/Themed';

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
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

export default function UserScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {ErrorType.userNotFound}
      </Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/user.tsx" />
      <Button themeInverse>Hello</Button>
    </View>
  );
}
