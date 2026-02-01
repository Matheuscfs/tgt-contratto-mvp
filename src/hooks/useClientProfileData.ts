import { useQuery } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { UserProfile, Booking, Favorite, Conversation } from '../types';

interface ClientProfileData {
    profile: UserProfile | null;
    bookings: Booking[];
    favorites: Favorite[];
    conversations: Conversation[];
}

export const useClientProfileData = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['client-profile-data', userId],
        queryFn: async (): Promise<ClientProfileData> => {
            if (!userId) {
                return { profile: null, bookings: [], favorites: [], conversations: [] };
            }

            // Parallel Fetching
            const [profileRes, bookingsRes, messagesRes, favoritesRes] = await Promise.all([
                // 1. Profile
                supabase.from('profiles').select('*').eq('id', userId).single(),

                // 2. Bookings
                supabase
                    .from('bookings')
                    .select('*, companies(name)')
                    .eq('client_id', userId)
                    .order('created_at', { ascending: false }),

                // 3. Messages (for conversations)
                supabase
                    .from('messages')
                    .select('*')
                    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
                    .order('created_at', { ascending: false }),

                // 4. Favorites
                supabase
                    .from('favorites')
                    .select(`
            *,
            company:companies(id, name, logo_url, description, category, rating, review_count, city, state)
          `)
                    .eq('user_id', userId)
            ]);

            // Process Profile
            // If error is code PGRST116 (0 rows), it's fine, return null or partial
            const profile = profileRes.data as UserProfile | null;

            // Process Bookings
            const bookings = (bookingsRes.data || []) as Booking[];

            // Process Favorites
            const favorites = (favoritesRes.data || []) as unknown as Favorite[];

            // Process Messages -> Conversations
            const msgs = messagesRes.data || [];
            const conversations: Conversation[] = [];

            if (msgs.length > 0) {
                const contactIds = new Set<string>();
                const rawConvos: { contactId: string; lastMessage: string; date: string; unread: boolean; }[] = [];

                for (const m of msgs) {
                    const otherId = m.sender_id === userId ? m.receiver_id : m.sender_id;
                    if (!contactIds.has(otherId)) {
                        contactIds.add(otherId);
                        rawConvos.push({
                            contactId: otherId,
                            lastMessage: m.content,
                            date: m.created_at,
                            unread: m.receiver_id === userId && !m.read
                        });
                    }
                }

                // Fetch company names for these contacts
                const contactIdArray = Array.from(contactIds);
                if (contactIdArray.length > 0) {
                    const { data: companies } = await supabase
                        .from('companies')
                        .select('id, name, profile_id')
                        .in('profile_id', contactIdArray);

                    // Merge names
                    conversations.push(...rawConvos.map(c => {
                        const comp = companies?.find((co) => co.profile_id === c.contactId);
                        return {
                            ...c,
                            name: comp?.name || 'Empresa Desconhecida'
                        };
                    }));
                }
            }

            return {
                profile,
                bookings,
                favorites,
                conversations
            };
        },
        enabled: !!userId,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
