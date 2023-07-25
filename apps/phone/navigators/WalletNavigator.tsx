import { FontAwesome } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';

import UserController from '~controllers/UserController';
import DemoDrawer from '~views/DemoDrawer';

const Drawer = createDrawerNavigator();

function UserIcon() {
  const navigation = useNavigation<any>();
  return (
    <FontAwesome
      name="user"
      size={20}
      style={{ marginRight: 15, color: 'green' }}
      onPress={() => navigation.navigate('User')}
    />
  );
}

export default function WalletNavigator() {
  return (
    <UserController>
      <Drawer.Navigator>
        <Drawer.Screen
          name="Wallet"
          component={DemoDrawer}
          options={{
            headerRight: UserIcon,
          }}
        />
        <Drawer.Screen
          name="Deposit"
          component={DemoDrawer}
          options={{
            headerRight: UserIcon,
          }}
        />
        <Drawer.Screen
          name="Withdraw"
          component={DemoDrawer}
          options={{
            headerRight: UserIcon,
          }}
        />
        <Drawer.Screen
          name="Transfer"
          component={DemoDrawer}
          options={{
            headerRight: UserIcon,
          }}
        />
        <Drawer.Screen
          name="Invest"
          component={DemoDrawer}
          options={{
            headerRight: UserIcon,
          }}
        />
      </Drawer.Navigator>
    </UserController>
  );
}
