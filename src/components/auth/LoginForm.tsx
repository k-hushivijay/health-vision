import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Stethoscope, Shield, User } from 'lucide-react';
import { useAuth } from './AuthProvider';
import axios from 'axios';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  // phone OTP states
  const [phoneMode, setPhoneMode] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [phoneOtp, setPhoneOtp] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);

  const { login, switchRole } = useAuth();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) {
      alert('Please verify the OTP sent to your phone.');
      return;
    }
    await login('', '', phone); // adjust if your login function needs different args
  };

  const sendPhoneOtp = async () => {
    setOtpLoading(true);
    try {
      await axios.post('/api/send-otp', { phone });
      setOtpSent(true);
    } catch {
      alert('Failed to send OTP. Try again.');
    }
    setOtpLoading(false);
  };

  const verifyPhoneOtp = async () => {
    setOtpLoading(true);
    try {
      const res = await axios.post('/api/verify-otp', { phone, otp: phoneOtp });
      if (res.data.success) setOtpVerified(true);
      else alert('Invalid OTP');
    } catch {
      alert('Verification failed.');
    }
    setOtpLoading(false);
  };

  const quickLogin = (role: 'doctor' | 'patient' | 'admin') => {
    switchRole(role);
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
            <CardDescription>Choose your preferred login method</CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="aadhaar">Family Head</TabsTrigger>
                <TabsTrigger value="demo">Quick Demo</TabsTrigger>
              </TabsList>

              {/* ---- Combined Login Tab ---- */}
              <TabsContent value="login">
                {!phoneMode ? (
                  // ---------- Email + Password Login ----------
                  <form onSubmit={handleEmailLogin} className="space-y-4">
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
                      <Label htmlFor="password">Password</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                      />
                      <div className="flex justify-between text-sm">
                        <a
                          href="/forgot-password"
                          className="text-primary hover:underline"
                        >
                          Forgot Password?
                        </a>
                        <button
                          type="button"
                          className="text-primary hover:underline"
                          onClick={() => setPhoneMode(true)}
                        >
                          Login with Phone OTP
                        </button>
                      </div>
                    </div>

                    <Button type="submit" className="w-full">
                      Login
                    </Button>
                  </form>
                ) : (
                  // ---------- Phone + OTP Login ----------
                  <form onSubmit={handlePhoneLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex gap-2">
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="Enter your phone number"
                          value={phone}
                          onChange={e => setPhone(e.target.value)}
                          required
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={sendPhoneOtp}
                          disabled={otpLoading || phone.length < 10}
                        >
                          {otpLoading ? 'Sending…' : otpSent ? 'Resend' : 'Send OTP'}
                        </Button>
                      </div>
                    </div>

                    {otpSent && (
                      <div className="space-y-2">
                        <Label htmlFor="phone-otp">Enter OTP</Label>
                        <div className="flex gap-2">
                          <Input
                            id="phone-otp"
                            type="text"
                            placeholder="6-digit OTP"
                            value={phoneOtp}
                            onChange={e => setPhoneOtp(e.target.value)}
                            required
                          />
                          <Button
                            type="button"
                            variant="outline"
                            onClick={verifyPhoneOtp}
                            disabled={otpLoading}
                          >
                            {otpLoading ? 'Verifying…' : 'Verify'}
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="flex justify-end text-sm">
                      <button
                        type="button"
                        className="text-primary hover:underline"
                        onClick={() => setPhoneMode(false)}
                      >
                        Back to Email Login
                      </button>
                    </div>

                    <Button type="submit" className="w-full" disabled={!otpVerified}>
                      Login
                    </Button>
                  </form>
                )}
              </TabsContent>

              {/* ---- Aadhaar & Demo tabs stay as before ---- */}
              <TabsContent value="aadhaar">…</TabsContent>
              <TabsContent value="demo">…</TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
