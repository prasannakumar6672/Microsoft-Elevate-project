import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '../types';
import { authService } from '../services/authService';
import { tokenStore } from '../services/tokenStore';

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<{ role: string }>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

interface RegisterData {
    name: string;
    email: string;
    phone?: string;
    password: string;
    city?: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const login = useCallback(async (email: string, password: string) => {
        const data = await authService.login(email, password);
        tokenStore.set(data.access_token, data.refresh_token);
        const userData: User = {
            id: data.user_id,
            name: data.name,
            email,
            role: data.role as 'citizen' | 'official',
            region: data.region,
        };
        setUser(userData);
        setIsAuthenticated(true);
        return { role: data.role };
    }, []);

    const register = useCallback(async (formData: RegisterData) => {
        const data = await authService.register(formData);
        tokenStore.set(data.access_token, data.refresh_token);
        const userData: User = {
            id: data.user_id,
            name: data.name,
            email: formData.email,
            role: 'citizen',
        };
        setUser(userData);
        setIsAuthenticated(true);
    }, []);

    const logout = useCallback(() => {
        tokenStore.clear();
        setUser(null);
        setIsAuthenticated(false);
    }, []);

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
