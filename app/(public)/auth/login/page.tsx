import LoginContainer from '@/containers/LoginContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login',
  description: 'Timesheet login page',
};

export default function LoginPage() {
  return <LoginContainer />;
}
