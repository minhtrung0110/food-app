import { Tabs } from 'expo-router';
import { View } from 'react-native';
import { IconCompass, IconMenu, IconReceipt, IconUser } from '@/components/atoms/Icons/outline';
import { COLOR } from '@/constants/Colors';

function TabIcon({ focused, icon, title }: any) {
  if (focused) {
    return (
      <View className="bg-primary-400 mt-4 flex min-h-14 w-full min-w-[65px] flex-1 flex-row items-center justify-center overflow-hidden rounded-full">
        {icon}
        {/*<Text className="text-secondary ml-2 text-base font-semibold">{title}</Text>*/}
      </View>
    );
  }

  return <View className="mt-4 size-full items-center justify-center rounded-full">{icon}</View>;
}

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
          width: '100%',
          height: '100%',
          // justifyContent: "center",
          alignItems: 'center',
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          paddingHorizontal: 10,
          height: 64,
          overflow: 'hidden',
          borderWidth: 1,
          borderColor: '#f8f8f8',
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'index',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <IconMenu
                  height={38}
                  width={38}
                  color={focused ? COLOR.white : COLOR.neutral['100']}
                />
              }
              title="Home"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <IconCompass
                  height={38}
                  width={38}
                  color={focused ? COLOR.white : COLOR.neutral['100']}
                />
              }
              title="Search"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="order"
        options={{
          title: 'Order',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <IconReceipt
                  height={38}
                  width={38}
                  color={focused ? COLOR.white : COLOR.neutral['100']}
                />
              }
              title="Order"
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <TabIcon
              focused={focused}
              icon={
                <IconUser
                  height={38}
                  width={38}
                  color={focused ? COLOR.white : COLOR.neutral['100']}
                />
              }
              title="Profile"
            />
          ),
        }}
      />
    </Tabs>
  );
}
