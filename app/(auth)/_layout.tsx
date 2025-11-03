import React from 'react';
import { Stack } from 'expo-router';

const AuthLayout = () => {
  return (
    <>
      <Stack initialRouteName={'getting-started'} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="getting-started" />
        <Stack.Screen name="login" />
        {/* thêm signup, phone, address nếu bạn muốn cũng ở nhóm (auth) */}
      </Stack>
    </>
  );
};

export default AuthLayout;
