
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log('Create Checkout Session Function Invoked')

serve(async (req) => {
    // Handle CORS
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        const { service_id, package_tier, user_id } = await req.json()

        if (!service_id || !package_tier) {
            throw new Error('Missing service_id or package_tier')
        }

        // 1. Fetch Service Details securely from DB (bypass RLS with service_role)
        const { data: service, error: serviceError } = await supabaseClient
            .from('services')
            .select('*, companies(company_name)')
            .eq('id', service_id)
            .single()

        if (serviceError || !service) {
            throw new Error('Service not found')
        }

        // 2. Determine price based on tier
        let price = 0
        let title = service.title
        let description = ''

        // Parse packages JSONB if it exists, otherwise use base price
        // Type definition from project: packages: { basic: { price: number }, ... }
        const packages = service.packages as any

        if (packages && packages[package_tier]) {
            price = packages[package_tier].price
            description = packages[package_tier].description || `${package_tier} package`
        } else {
            // Fallback or Error if tier invalid
            // For MVP, if package structure missing, maybe rely on base price?
            // But requirements say 'create-checkout-session' receives tier.
            if (package_tier === 'basic' && service.price) {
                price = service.price
            } else {
                // If we can't find the price, we must fail secure.
                throw new Error('Invalid package tier or price not found')
            }
        }

        console.log(`Creating session for: ${title} (${package_tier}) - Price: ${price}`)

        // 3. Create Checkout Session (Mock/Stripe/Asaas)
        // For MVP Sprint 1, we will simulate a session creation returning a "payment link"
        // In production, calling Stripe API here.

        const sessionData = {
            sessionId: `sess_${crypto.randomUUID()}`,
            paymentUrl: `https://mock-payment-provider.com/pay?id=${crypto.randomUUID()}&amount=${price}`,
            amount: price,
            currency: 'BRL',
            metadata: {
                service_id,
                package_tier,
                buyer_id: user_id, // passed from client? Better to verify auth token.
                // In real app, we get user from Authorization header
            }
        }

        // Return the session
        return new Response(
            JSON.stringify(sessionData),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        )

    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
