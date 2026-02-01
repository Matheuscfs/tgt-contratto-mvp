import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useToast } from '../../contexts/ToastContext';

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const ClientLoginPage: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [portalError, setPortalError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { addToast } = useToast();
    const { signInWithGoogle } = useAuth();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            await signInWithGoogle();
        } catch (err) {
            const error = err as Error;
            console.error('Google login error:', error);
            addToast(error.message || "Erro ao conectar com Google. Tente novamente.", "error");
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setPortalError(null); // Clear previous portal errors

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            if (data.session) {
                const metadataType = data.session.user.user_metadata.type as string;

                if (metadataType === 'company') {
                    // Company user trying to login via client portal
                    // Sign them out immediately to clear the session
                    await supabase.auth.signOut();

                    // Set portal error to trigger friendly UI message
                    setPortalError('WRONG_PORTAL_TYPE');
                } else {
                    // Valid client login
                    addToast('Login realizado com sucesso!', 'success');
                    navigate('/');
                }
            }
        } catch (err: unknown) {
            const error = err as Error;
            console.error('Login error:', error);
            // Generic error message for security (prevents user enumeration)
            addToast('Credenciais inválidas. Verifique seu e-mail e senha.', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 p-10 bg-white shadow-lg rounded-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Área do Cliente
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Ainda não tem conta?{' '}
                        <Link to="/cadastro/cliente" className="font-medium text-brand-primary hover:text-brand-primary/80">
                            Cadastre-se grátis
                        </Link>
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="rounded-sharp shadow-sm -space-y-px">
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            label="E-mail"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="rounded-t-sharp"
                        />
                        <Input
                            id="password"
                            name="password"
                            type="password"
                            label="Senha"
                            autoComplete="current-password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="rounded-b-sharp"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <Link to="/auth/forgot-password" className="font-medium text-brand-primary hover:text-brand-primary/80">
                            Esqueceu sua senha?
                        </Link>
                    </div>

                    {/* Portal Error Message */}
                    {portalError === 'WRONG_PORTAL_TYPE' && (
                        <div className="rounded-md bg-amber-50 border border-amber-200 p-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-amber-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3 flex-1">
                                    <p className="text-sm font-medium text-amber-800">
                                        Este login pertence a uma conta de empresa.
                                    </p>
                                    <div className="mt-3">
                                        <Link
                                            to="/login/empresa"
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-brand-primary hover:bg-brand-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
                                        >
                                            Acessar Área de Empresas
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div>
                        <Button type="submit" className="w-full" isLoading={isLoading}>
                            Entrar
                        </Button>
                    </div>
                </form>

                <div className="relative flex py-2 items-center">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="flex-shrink mx-4 text-gray-400 text-xs">ou</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
                    className="w-full inline-flex items-center justify-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors"
                    disabled={isLoading}
                >
                    <GoogleIcon />
                    Entrar com Google
                </button>

                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-600">
                        Você é um profissional?{' '}
                        <Link to="/login/empresa" className="font-medium text-brand-primary hover:text-brand-primary/80">
                            Faça login aqui
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ClientLoginPage;
