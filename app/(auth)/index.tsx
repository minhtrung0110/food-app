import { Redirect } from 'expo-router';
import { ROUTES } from '@/constants/route';

export default function AuthIndex() {
  return <Redirect href={ROUTES.AUTH.gettingStarted} />;
}
