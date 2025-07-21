import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Stethoscope, Shield, User } from 'lucide-react';
import { useAuth } from './AuthProvider';
export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {
    login,
    switchRole
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };
  const quickLogin = (role: 'doctor' | 'patient' | 'admin') => {
    switchRole(role);
  };
  return <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-primary/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-primary">ValueKare EMR</h1>
          </div>
          <p className="text-muted-foreground">Electronic Medical Records & Patient Navigation</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login to Your Account</CardTitle>
            <CardDescription>
              Enter your credentials to access the EMR system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="demo">Quick Demo</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" type="password" placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} required />
                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="demo" className="space-y-4">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Quick access for demo purposes
                </p>
                <div className="space-y-2">
                  <Button onClick={() => quickLogin('doctor')} variant="outline" className="w-full justify-start">
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Login as Doctor
                  </Button>
                  <Button onClick={() => quickLogin('patient')} variant="outline" className="w-full justify-start">
                    <User className="h-4 w-4 mr-2" />
                    Login as Patient
                  </Button>
                  <Button onClick={() => quickLogin('admin')} variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Login as Admin
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>;
}