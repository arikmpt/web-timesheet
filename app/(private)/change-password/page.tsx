import ChangePasswordContainer from '@/containers/ChangePasswordContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Change Password',
  description: 'Timesheet change password page',
};

export default function ChangePasswordPage() {
  return <ChangePasswordContainer />;
}
