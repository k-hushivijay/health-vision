import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'doctor' | 'patient' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;        // ✅ Added optional phone number
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, phone?: string) => Promise<void>; // ✅ phone optional
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock users for demo
const mockUsers: Record<UserRole, User> = {
  doctor: {
    id: '1',
    name: 'Dr. Sarah Johnson',
    email: 'dr.johnson@hospital.com',
    role: 'doctor'
  },
  patient: {
    id: '2',
    name: 'John Smith',
    email: 'john.smith@email.com',
    role: 'patient'
  },
  admin: {
    id: '3',
    name: 'Admin User',
    email: 'admin@hospital.com',
    role: 'admin'
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, phone?: string) => {
    // Mock login - in a real app this would be an API call
    const role: UserRole = email.includes('dr.')
      ? 'doctor'
      : email.includes('admin')
      ? 'admin'
      : 'patient';

    // Attach phone if provided
    setUser({
      ...mockUsers[role],
      email,
      phone: phone || undefined,
    });
  };

  const logout = () => setUser(null);

  const switchRole = (role: UserRole) => {
    setUser(mockUsers[role]);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
