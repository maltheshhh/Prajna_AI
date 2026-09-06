import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthState, KSPUser, UserRole } from '@/types';

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<KSPUser | null>(null);
  const [role, setRole] = useState<UserRole | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize session on mount
  useEffect(() => {
    const storedAuth = sessionStorage.getItem('ksp_auth');
    if (storedAuth) {
      try {
        const { user: storedUser, isAuthenticated: storedIsAuth } = JSON.parse(storedAuth);
        setIsAuthenticated(storedIsAuth);
        setUser(storedUser);
        setRole(storedUser?.role || null);
      } catch (e) {
        console.error('Failed to parse auth session', e);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (psId: string, password: string, selectedRole: UserRole = 'investigator', officerName?: string): Promise<boolean> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Simulate biometric and user validation
        const mockUser: KSPUser = {
          id: 'USR-001',
          psId: psId || 'KA/BLR/C/HSR-001',
          name: officerName || 'SI Rajesh Kumar',
          rank: selectedRole === 'supervisor' ? 'Superintendent (SP)' : selectedRole === 'policymaker' ? 'HQ Director' : selectedRole === 'analyst' ? 'Crime Analyst' : 'Sub-Inspector',
          role: selectedRole,
          district: 'Bengaluru Urban',
          station: 'HSR Layout PS',
          biometricVerified: true,
          lastLogin: new Date().toISOString(),
        };

        setIsAuthenticated(true);
        setUser(mockUser);
        setRole(mockUser.role);

        sessionStorage.setItem(
          'ksp_auth',
          JSON.stringify({ user: mockUser, isAuthenticated: true, token: `mock_jwt_${Date.now()}` })
        );

        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setRole(null);
    sessionStorage.removeItem('ksp_auth');
  };

  const switchRole = (newRole: UserRole) => {
    if (user) {
      const updatedUser = { ...user, role: newRole };
      setUser(updatedUser);
      setRole(newRole);
      sessionStorage.setItem(
        'ksp_auth',
        JSON.stringify({ user: updatedUser, isAuthenticated: true })
      );
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#071D3A] text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-t-transparent border-white"></div>
          <span className="font-mono text-sm tracking-wider">SECURE KSP GATEWAY...</span>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
