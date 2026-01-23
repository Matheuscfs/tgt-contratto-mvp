title Service Marketplace System Architecture

// Actors
Clients Web [icon: monitor, label: "Clients (Web)"]
Clients Mobile [icon: smartphone, label: "Clients (Mobile)"]
Professionals Web [icon: monitor, label: "Professionals (Web)"]
Professionals Mobile [icon: smartphone, label: "Professionals (Mobile)"]
Admins Dashboard [icon: layout, label: "Admins (Dashboard)"]

// Edge Layer
Edge Layer [icon: cloud] {
  Cloudflare CDN [icon: cloudflare]
  Load Balancer [icon: aws-elb]
  API Gateway [icon: aws-api-gateway]
}

// Backend Cluster (Microservices)
Backend Cluster [icon: server, color: blue] {
  Auth Service [icon: key]
  User Profile Service [icon: user]
  Marketplace Service [icon: shopping-bag, label: "Marketplace/Order Service"]
  Matching Service [icon: search]
  Chat Service [icon: message-square]
  Payment Service [icon: credit-card]
  Notification Service [icon: bell]
  Ratings Reviews Service [icon: star, label: "Ratings & Reviews"]
  Analytics Reporting Service [icon: bar-chart-2, label: "Analytics/Reporting"]
  "Multi-Tenancy Manager" [icon: layers]
}

// Data Layer
Data Layer [icon: database, color: green] {
  PostgreSQL [icon: postgres]
  MongoDB [icon: mongodb]
  Redis [icon: redis]
  S3 Bucket [icon: aws-s3]
  Elasticsearch [icon: elasticsearch]
}

// External Integrations
External Integrations [icon: globe, color: orange] {
  Stripe [icon: stripe]
  PayPal [icon: paypal]
  Twilio [icon: twilio]
  SendGrid [icon: sendgrid]
}

// Connections: Actors to Edge Layer
Clients Web > Cloudflare CDN
Clients Mobile > Cloudflare CDN
Professionals Web > Cloudflare CDN
Professionals Mobile > Cloudflare CDN

// Edge Layer flow
Cloudflare CDN > Load Balancer
Load Balancer > API Gateway

// API Gateway to Backend Cluster

// Backend Cluster to Data Layer
Auth Service <> PostgreSQL
User Profile Service <> PostgreSQL
Marketplace Service <> PostgreSQL
Marketplace Service <> S3 Bucket: portfolio images/invoices
Matching Service <> PostgreSQL
Matching Service <> Elasticsearch: search/match
Chat Service <> MongoDB: chat history
Chat Service <> Redis: real-time presence/cache
Payment Service <> PostgreSQL
Payment Service <> S3 Bucket: invoices
Notification Service <> PostgreSQL
Notification Service <> Redis: queue/cache
Ratings Reviews Service <> PostgreSQL
Analytics Reporting Service <> PostgreSQL
Analytics Reporting Service <> Redis: cache

// Real-time Chat (WebSocket)
Clients Web <-- Chat Service: websocket
Clients Mobile <-- Chat Service: websocket
Professionals Web <-- Chat Service: websocket
Professionals Mobile <-- Chat Service: websocket

// Payment Integrations
Payment Service > Stripe: payments/escrow
Payment Service > PayPal: payments/escrow

// Notification Integrations
Notification Service > Twilio: SMS
Notification Service > SendGrid: Email

// Admins Dashboard connections

// Multi-Tenancy
"Multi-Tenancy Manager" <> PostgreSQL

// Optional: Notification to Admins
Notification Service > Admins Dashboard: admin alerts
API Gateway > Backend Cluster
Cloudflare CDN < Admins Dashboard
Analytics Reporting Service < Admins Dashboard