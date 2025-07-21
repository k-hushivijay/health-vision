import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Calendar, 
  FileText, 
  Upload, 
  Activity,
  Heart,
  Brain,
  AlertCircle,
  Clock,
  Plus,
  Download
} from 'lucide-react';

const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Sarah Johnson', date: '2024-01-20', time: '10:00 AM', type: 'Follow-up' },
  { id: 2, doctor: 'Dr. Mike Brown', date: '2024-01-25', time: '02:30 PM', type: 'Consultation' },
];

const recentDocuments = [
  { id: 1, name: 'Blood Test Results', date: '2024-01-15', type: 'Lab Report' },
  { id: 2, name: 'X-Ray Chest', date: '2024-01-10', type: 'Imaging' },
  { id: 3, name: 'Prescription', date: '2024-01-08', type: 'Medication' },
];

const healthMetrics = [
  { name: 'Blood Pressure', value: '120/80', status: 'normal', progress: 85 },
  { name: 'Heart Rate', value: '72 bpm', status: 'normal', progress: 90 },
  { name: 'Blood Sugar', value: '95 mg/dL', status: 'normal', progress: 80 },
  { name: 'Weight', value: '70 kg', status: 'stable', progress: 75 },
];

export function PatientDashboard() {
  const handleRiskAssessment = () => {
    // In real app, this would send data to AI API
    alert('Risk assessment feature would connect to AI API for health predictions');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Patient Dashboard</h1>
        <p className="text-muted-foreground">Monitor your health and manage appointments</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Book Appointment</h3>
            <p className="text-sm text-muted-foreground">Schedule with doctors</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Upload className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Upload Documents</h3>
            <p className="text-sm text-muted-foreground">Medical records & images</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">View Records</h3>
            <p className="text-sm text-muted-foreground">Medical history</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow bg-accent" onClick={handleRiskAssessment}>
          <CardContent className="p-6 text-center">
            <Brain className="h-8 w-8 text-accent-foreground mx-auto mb-2" />
            <h3 className="font-medium text-accent-foreground">Check My Risk</h3>
            <p className="text-sm text-accent-foreground/80">AI Health Assessment</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Health Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Health Metrics</CardTitle>
            <CardDescription>Your latest vitals and measurements</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {healthMetrics.map((metric) => (
              <div key={metric.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{metric.name}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-bold">{metric.value}</span>
                    <Badge variant={metric.status === 'normal' ? 'default' : 'secondary'}>
                      {metric.status}
                    </Badge>
                  </div>
                </div>
                <Progress value={metric.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled medical appointments</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Book New
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{appointment.doctor}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline">Confirmed</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Medical Documents</CardTitle>
              <CardDescription>Your latest test results and prescriptions</CardDescription>
            </div>
            <Button size="sm" variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Upload New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{doc.name}</p>
                    <p className="text-sm text-muted-foreground">{doc.type}</p>
                    <p className="text-sm text-muted-foreground">Uploaded: {doc.date}</p>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}