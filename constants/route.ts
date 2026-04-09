export const ROUTES = {
  AUTH: {
    gettingStarted: `/(auth)/getting-started`,
    signIn: `/(auth)/(flow)/(sso)/sign-in`,
    signUp: `/(auth)/(flow)/(sso)/sign-up`,
    forgotPassword: `/(auth)/(flow)/password-recovery`,
    forgotReset: `/(auth)/(flow)/password-reset`,
    phoneVerify: `/(auth)/(flow)/phone-verify`,
    verifyIdentity: `/(auth)/(flow)/verify-identity`,
  },
  TABS: {
    index: '/(tabs)',
    search: '/(tabs)/search',
    order: '/(tabs)/order',
    profile: '/(tabs)/profile',
  },
  EXTRA: {
    findLocation: '/(extra)/find-location',
    restaurant: (id: number | string) => `/(extra)/restaurant/${id}`,
    confirmOrder: '/(extra)/confirm-order',
  },
};
