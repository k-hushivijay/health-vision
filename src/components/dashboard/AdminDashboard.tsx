import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Activity, 
  AlertTriangle, 
  Server,
  UserPlus,
  Settings,
  BarChart3,
  Shield,
  Database,
  Clock
} from 'lucide-react';

const systemStats = [
  { name: 'Total Users', value: 1247, change: '+12%', icon: Users },
  { name: 'Active Sessions', value: 89, change: '+5%', icon: Activity },
  { name: 'System Uptime', value: '99.9%', change: 'Stable', icon: Server },
  { name: 'Security Alerts', value: 3, change: '-2', icon: AlertTriangle },
];

const recentUsers = [
  { id: 1, name: 'Dr. John Wilson', role: 'doctor', status: 'active', joinDate: '2024-01-15' },
  { id: 2, name: 'Mary Johnson', role: 'patient', status: 'active', joinDate: '2024-01-14' },
  { id: 3, name: 'Dr. Lisa Chen', role: 'doctor', status: 'pending', joinDate: '2024-01-13' },
  { id: 4, name: 'Tom Anderson', role: 'patient', status: 'inactive', joinDate: '2024-01-12' },
];

const systemLogs = [
  { id: 1, action: 'User Login', user: 'Dr. Sarah Johnson', timestamp: '2024-01-16 09:15:32', level: 'info' },
  { id: 2, action: 'Failed Login Attempt', user: 'unknown@email.com', timestamp: '2024-01-16 09:12:45', level: 'warning' },
  { id: 3, action: 'Database Backup', user: 'System', timestamp: '2024-01-16 03:00:00', level: 'info' },
  { id: 4, action: 'Permission Change', user: 'Admin User', timestamp: '2024-01-16 08:30:15', level: 'info' },
];

export function AdminDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'default';
      case 'pending': return 'warning';
      case 'inactive': return 'secondary';
      default: return 'secondary';
    }
  };

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case 'warning': return 'warning';
      case 'error': return 'destructive';
      case 'info': return 'default';
      default: return 'secondary';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and user management</p>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {systemStats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change} from last month</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <UserPlus className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Add User</h3>
            <p className="text-sm text-muted-foreground">Create new account</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Settings className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">System Settings</h3>
            <p className="text-sm text-muted-foreground">Configure system</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <BarChart3 className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Analytics</h3>
            <p className="text-sm text-muted-foreground">View reports</p>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-md transition-shadow">
          <CardContent className="p-6 text-center">
            <Database className="h-8 w-8 text-primary mx-auto mb-2" />
            <h3 className="font-medium">Database</h3>
            <p className="text-sm text-muted-foreground">Manage data</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Users</CardTitle>
                <CardDescription>Newly registered users</CardDescription>
              </div>
              <Button size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      {user.role === 'doctor' ? (
                        <Shield className="h-5 w-5 text-primary" />
                      ) : (
                        <Users className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                      <p className="text-xs text-muted-foreground">Joined: {user.joinDate}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(user.status) as any}>
                    {user.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card>
          <CardHeader>
            <CardTitle>System Logs</CardTitle>
            <CardDescription>Recent system activities and events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{log.action}</p>
                      <Badge variant={getLogLevelColor(log.level) as any} className="text-xs">
                        {log.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{log.user}</p>
                    <p className="text-xs text-muted-foreground flex items-center mt-1">
                      <Clock className="h-3 w-3 mr-1" />
                      {log.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle>System Health</CardTitle>
          <CardDescription>Real-time system performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">CPU Usage</span>
                <span className="text-sm">45%</span>
              </div>
              <Progress value={45} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Memory Usage</span>
                <span className="text-sm">62%</span>
              </div>
              <Progress value={62} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">Storage Usage</span>
                <span className="text-sm">78%</span>
              </div>
              <Progress value={78} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}