import { Tabs } from 'expo-router';
import { IconCompass, IconMenu, IconReceipt, IconUser } from '@/components/atoms/Icons/outline';
import { COLOR } from '@/constants/Colors';
import { AppTabBar } from '@/components/molecules/navigation/AppTabBar';

export default function TabsLayout() {
  return (
    <Tabs
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true, // pro: mở keyboard thì ẩn tab bar
      }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <IconMenu height={38} width={38} color={focused ? COLOR.white : COLOR.neutral['100']} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused }) => (
            <IconCompass
              height={38}
              width={38}
              color={focused ? COLOR.white : COLOR.neutral['100']}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          tabBarIcon: ({ focused }) => (
            <IconReceipt
              height={38}
              width={38}
              color={focused ? COLOR.white : COLOR.neutral['100']}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <IconUser height={38} width={38} color={focused ? COLOR.white : COLOR.neutral['100']} />
          ),
        }}
      />
    </Tabs>
  );
}
