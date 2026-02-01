/// <reference types="vite/client" />
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Supabase credentials missing! Check .env file.');
}

const getSupabase = () => {
    // Check global cache in development to prevent multiple instances during HMR
    if (import.meta.env.DEV) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const win = window as any;
        if (win._supabaseInstance) {
            return win._supabaseInstance;
        }
    }

    const isDev = import.meta.env.DEV;
    const isLocalIP = window.location.hostname.match(/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.|127\.0\.0\.1|localhost)/);

    const client = createClient(
        supabaseUrl || '',
        supabaseAnonKey || '',
        {
            auth: {
                persistSession: true,
                autoRefreshToken: true,
                detectSessionInUrl: true,
                storageKey: 'tgt-auth-session',
            },
        }
    );

    if (import.meta.env.DEV) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any)._supabaseInstance = client;
    }

    return client;
};

export const supabase = getSupabase();
