# Architecture Documentation

## Current State: Monolithic MVP
The current application is built as a monolithic Single Page Application (SPA) using React and Supabase.

### Tech Stack
- **Frontend**: React 19, Vite, Tailwind CSS 4.
- **Backend/Data**: Supabase (PostgreSQL, Auth, Storage, Edge Functions).
- **Testing**: Vitest, React Testing Library.

## Future Roadmap: Microservices Architecture
To scale the platform, we plan to migrate to a microservices architecture as defined in the `projeto.md` vision.

### Target Services (Post-MVP)
1.  **Auth Service**: Dedicated authentication handling (currently Supabase Auth).
2.  **User Profile Service**: Management of user and company profiles.
3.  **Marketplace Service**: Core business logic for service listings.
4.  **Matching Service**: ElasticSearch-based search and matching engine.
5.  **Chat Service**: Real-time communication (WebSocket/MongoDB).
6.  **Payment Service**: Stripe/PayPal integrations.
7.  **Notification Service**: Centralized notification management.

### Migration Strategy
1.  **Stabilize MVP**: Ensure the current monolith is robust (Current Phase).
2.  **Decouple Modules**: Internally separate code into distinct modules (Auth, Marketplace, Chat).
3.  **Strangler Fig Pattern**: Gradually peel off services (e.g., extract Chat first) into separate deployments/Edge Functions.

## Verification Status
- **Build**: Passing.
- **Tests**: Passing (Unit/Integration).
- **Type Safety**: Strict TypeScript checked.
