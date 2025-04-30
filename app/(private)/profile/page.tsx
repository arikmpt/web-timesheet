import ProfileContainer from '@/containers/ProfileContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Timesheet profile page',
};

export default function ProfilePage() {
  return <ProfileContainer />;
}
