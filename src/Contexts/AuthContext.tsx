// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';

interface AuthContextType {
  userId: string | null;
  setUserId?: Dispatch<SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string | null>(null);

  const handleSetUserId = (newUserId: string) => {
    setUserId(newUserId);
  };

  return (
    <AuthContext.Provider value={{ userId, setUserId: handleSetUserId as  Dispatch<SetStateAction<string | null>>}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
