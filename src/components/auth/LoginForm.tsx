import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Stethoscope, Shield, User, KeyRound } from 'lucide-react';
import { useAuth } from './AuthProvider';
import axios from 'axios';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // Aadhaar states
  const [aadhaar, setAadhaar] = useState('');
  const [otp, setOtp] = useState('');
  const [otpStep, setOtpStep] = useState(false);
  const [loading, setLoading] = useState(false);

  const { login, switchRole } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password, phone);
  };

  const quickLogin = (role: 'doctor' | 'patient' | 'admin') => {
    switchRole(role);
  };

  // ---- Aadhaar OTP handlers ----
  const requestOtp = async () => {
    setLoading(true);
    await axios.post('/api/aadhaar/send-otp', { aadhaar });
    setLoading(false);
    setOtpStep(true);
  };

  const verifyOtp = async () => {
    setLoading(true);
    const res = await axios.post('/api/aadhaar/verify-otp', { aadhaar, otp });
    setLoading(false);
    if (res.data.success) {
      // Mark user as family_head or log them in with special role
      switchRole('admin'); // or custom 'family_head'
    } else {
      alert('Invalid OTP. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light to-primary/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Heart className="h-12 w-12 text-primary mr-2" />
            <h1 className="text-3xl font-bold text-primary">ValueKare EMR</h1>
          </div>
          <p className="text-muted-foreground">
            Electronic Medical Records & Patient Navigation
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Login to Your Account</CardTitle>
            <CardDescription>
              Choose your preferred login method
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="aadhaar">Family Head</TabsTrigger>
                <TabsTrigger value="demo">Quick Demo</TabsTrigger>
              </TabsList>

              {/* ---- Normal Email/Phone Login ---- */}
              <TabsContent value="login" className="space-y-4">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      required
                    />
                    <div className="flex justify-end">
                      <a
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Forgot Password?
                      </a>
                    </div>
                  </div>

                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </form>
              </TabsContent>

              {/* ---- Aadhaar / Family Head Login ---- */}
              <TabsContent value="aadhaar" className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Verify your Aadhaar to login as Family Head
                </p>

                {!otpStep ? (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="aadhaar">Aadhaar Number</Label>
                      <Input
                        id="aadhaar"
                        type="text"
                        maxLength={12}
                        placeholder="12-digit Aadhaar"
                        value={aadhaar}
                        onChange={e => setAadhaar(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={requestOtp}
                      disabled={loading || aadhaar.length !== 12}
                    >
                      {loading ? 'Sending OTP...' : 'Send OTP'}
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="otp">Enter OTP</Label>
                      <Input
                        id="otp"
                        type="text"
                        placeholder="6-digit OTP"
                        value={otp}
                        onChange={e => setOtp(e.target.value)}
                        required
                      />
                    </div>
                    <Button
                      className="w-full"
                      onClick={verifyOtp}
                      disabled={loading}
                    >
                      {loading ? 'Verifying...' : 'Verify & Login'}
                    </Button>
                  </>
                )}
              </TabsContent>

              {/* ---- Quick Demo ---- */}
              <TabsContent value="demo" className="space-y-4">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Quick access for demo purposes
                </p>
                <div className="space-y-2">
                  <Button
                    onClick={() => quickLogin('doctor')}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Stethoscope className="h-4 w-4 mr-2" />
                    Login as Doctor
                  </Button>
                  <Button
                    onClick={() => quickLogin('patient')}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Login as Patient
                  </Button>
                  <Button
                    onClick={() => quickLogin('admin')}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Login as Admin
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
