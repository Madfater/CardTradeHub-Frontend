import React, { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';
import Cookies from 'js-cookie';

interface AuthContextType {
  userId: number | null;
  setUserId?: Dispatch<SetStateAction<number | null>>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<number | null>(() => {
    return parseInt(Cookies.get('userId')!, 10) || null;
  });

  useEffect(() => {
    Cookies.set('userId', userId != null ? String(userId) : 'null');
  }, [userId]);

  const handleSetUserId = (newUserId: number) => {
    setUserId(newUserId);
  };

  const logout = () => {
    Cookies.remove('userId');
    setUserId(null);
  };

  return (
    <AuthContext.Provider value={{ userId, setUserId: handleSetUserId as Dispatch<SetStateAction<number | null>> , logout}}>
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
