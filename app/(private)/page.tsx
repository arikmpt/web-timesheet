import DashboardContainer from '@/containers/DashboardContainer';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Timesheet dashboard page',
};

export default function DashboardPage() {
  return <DashboardContainer />;
}
