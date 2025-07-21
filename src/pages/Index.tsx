import { useAuth } from '@/components/auth/AuthProvider';
import { DoctorDashboard } from '@/components/dashboard/DoctorDashboard';
import { PatientDashboard } from '@/components/dashboard/PatientDashboard';
import { AdminDashboard } from '@/components/dashboard/AdminDashboard';

const Index = () => {
  const { user } = useAuth();

  if (!user) {
    return null; // This will be handled by AppLayout
  }

  // Route to appropriate dashboard based on user role
  switch (user.role) {
    case 'doctor':
      return <DoctorDashboard />;
    case 'patient':
      return <PatientDashboard />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to MediCare EMR</h1>
          <p className="text-xl text-muted-foreground">Electronic Medical Records System</p>
        </div>
      );
  }
};

export default Index;
