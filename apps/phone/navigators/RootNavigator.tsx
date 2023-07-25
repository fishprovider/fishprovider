import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import BaseController from '~controllers/BaseController';
import Strategies from '~views/Strategies';

import UserAccountNavigator from './UserAccountNavigator';
import UserWalletNavigator from './UserWalletNavigator';

const Tab = createBottomTabNavigator();

function StrategiesIcon(props: any) {
  return <FontAwesome {...props} name="rocket" />;
}

function BankIcon(props: any) {
  return <FontAwesome {...props} name="bank" />;
}

function AccountIcon(props: any) {
  return <FontAwesome {...props} name="bar-chart" />;
}

export default function RootNavigator() {
  return (
    <BaseController>
      <Tab.Navigator>
        <Tab.Screen
          name="Strategies"
          component={Strategies}
          options={{
            tabBarIcon: StrategiesIcon,
          }}
        />
        <Tab.Screen
          name="UserWalletNavigator"
          component={UserWalletNavigator}
          options={{
            tabBarLabel: 'Wallet',
            tabBarIcon: BankIcon,
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="UserAccountNavigator"
          component={UserAccountNavigator}
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: AccountIcon,
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </BaseController>
  );
}
