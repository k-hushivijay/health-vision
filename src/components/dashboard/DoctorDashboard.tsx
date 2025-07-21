import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  Calendar, 
  Activity, 
  Search,
  Plus,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

const mockPatients = [
  { id: 1, name: 'John Smith', age: 45, diagnosis: 'Hypertension', lastVisit: '2024-01-15', status: 'stable' },
  { id: 2, name: 'Sarah Davis', age: 32, diagnosis: 'Diabetes', lastVisit: '2024-01-14', status: 'needs-attention' },
  { id: 3, name: 'Mike Johnson', age: 58, diagnosis: 'Heart Disease', lastVisit: '2024-01-13', status: 'critical' },
  { id: 4, name: 'Emily Brown', age: 29, diagnosis: 'Asthma', lastVisit: '2024-01-12', status: 'stable' },
];

const upcomingAppointments = [
  { id: 1, patient: 'John Smith', time: '09:00 AM', type: 'Follow-up' },
  { id: 2, patient: 'Sarah Davis', time: '10:30 AM', type: 'Consultation' },
  { id: 3, patient: 'Mike Johnson', time: '02:00 PM', type: 'Emergency' },
];

export function DoctorDashboard() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = mockPatients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.id.toString().includes(searchTerm)
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'destructive';
      case 'needs-attention': return 'warning';
      case 'stable': return 'accent';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'critical': return AlertCircle;
      case 'needs-attention': return Clock;
      case 'stable': return CheckCircle;
      default: return Activity;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Doctor Dashboard</h1>
        <p className="text-muted-foreground">Manage your patients and appointments</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockPatients.length}</div>
            <p className="text-xs text-muted-foreground">Active patients</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
            <p className="text-xs text-muted-foreground">Scheduled for today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Cases</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockPatients.filter(p => p.status === 'critical').length}
            </div>
            <p className="text-xs text-muted-foreground">Needs immediate attention</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Patient List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Patient List</CardTitle>
                <CardDescription>Search and manage your patients</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Patient
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, diagnosis, or ID..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredPatients.map((patient) => {
                const StatusIcon = getStatusIcon(patient.status);
                return (
                  <div key={patient.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarFallback>
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{patient.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Age: {patient.age} • ID: {patient.id}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Last visit: {patient.lastVisit}
                        </p>
                      </div>
                    </div>
                    <div className="text-right space-y-2">
                      <Badge variant={getStatusColor(patient.status) as any}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {patient.status.replace('-', ' ')}
                      </Badge>
                      <p className="text-sm font-medium">{patient.diagnosis}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Today's Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Appointments</CardTitle>
            <CardDescription>Your scheduled appointments for today</CardDescription>
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
                      <p className="font-medium">{appointment.patient}</p>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appointment.time}</p>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}