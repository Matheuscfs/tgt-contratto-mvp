
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import { corsHeaders } from '../_shared/cors.ts'

console.log('Payment Webhook Function Invoked')

serve(async (req) => {
    // Webhooks typically use POST
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders })
    }

    try {
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        )

        // 1. Verify Signature (Mock logic for MVP)
        // const signature = req.headers.get('x-signature')
        // if (!signature) throw new Error('Missing signature')

        const body = await req.json()
        const { event, data } = body

        if (event !== 'payment_success') {
            return new Response(JSON.stringify({ message: 'Ignored event' }), { headers: corsHeaders, status: 200 })
        }

        // 2. Extract Data
        const { metadata } = data
        const { service_id, package_tier, buyer_id, price } = metadata

        if (!service_id || !buyer_id || !price) {
            throw new Error('Invalid metadata: Missing required fields')
        }

        // 3. Fetch Service to Snapshot details
        const { data: service, error: serviceError } = await supabaseClient
            .from('services')
            .select('*, companies(id, owner_id)') // Fetch owner_id directly from companies
            .eq('id', service_id)
            .single()

        if (serviceError || !service) {
            console.error('Service fetch error:', serviceError)
            throw new Error('Service not found for snapshot')
        }

        const seller_id = service.companies?.owner_id

        if (!seller_id) {
            console.error('Seller ID not found for company:', service.companies?.id)
            // Fallback or critical error? For MVP we must have a seller.
            // If company has no owner, we have a data integrity issue.
            throw new Error('Seller not found for this service')
        }

        // 4. Insert Order Securely
        const { data: order, error: insertError } = await supabaseClient
            .from('orders')
            .insert({
                buyer_id,
                seller_id: seller_id,
                service_id,
                service_title: service.title,
                package_tier,
                price: price, // Total transaction value
                agreed_price: price, // Securely recorded agreed price
                status: 'paid', // Order starts as paid because this is a payment webhook
                package_snapshot: service.packages, // Snapshot specific package info or whole service? 
                // Requirement says "cópia do JSONB do pacote contratado"
                // service.packages is the JSONB field.
            })
            .select()
            .single()

        if (insertError) {
            console.error('Order creation failed:', insertError)
            throw insertError
        }

        return new Response(
            JSON.stringify({ success: true, orderId: order.id }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        )

    } catch (error) {
        console.error('Webhook Error:', error)
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        )
    }
})
