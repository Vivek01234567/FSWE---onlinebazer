# FreshMart — 32. Online Grocery Store

A modern, full-stack, enterprise-grade Online Grocery Store allowing customers to browse, search, and purchase groceries with automated discounts, scheduled deliveries, real-time live order tracking via STOMP WebSockets, and complete inventory management for store admins.

---

## 🚀 Technologies Used

### **Frontend**
- **React.js 18 + Vite**: High-performance UI rendering and ultra-fast HMR
- **React Router v6**: Dynamic client-side and role-based protected routing (`/checkout`, `/my-orders`, `/admin`)
- **Zustand**: Lightweight global state management for authentication, cart items, delivery schedule, and applied promo coupons with `localStorage` persistence
- **Axios**: HTTP API communication with automated JWT Bearer request interceptors
- **CSS3 / Vanilla Design System**: Curated Blue/Cyan and Fresh Emerald palette (`#0284c7`, `#10b981`), Inter typography, card surfaces, status badges, and dark navy contrast sections
- **Lucide React**: Crisp vector iconography
- **STOMP / SockJS**: Real-time bidirectional WebSocket client for live order tracking and status synchronization
- **Razorpay Checkout JS**: Seamless online payment modal integration with server signature verification

### **Backend**
- **Java 21 + Spring Boot 3.2.5**: Modern enterprise RESTful backend
- **Spring Web**: High-throughput REST API controllers
- **Spring Security + BCrypt + JWT**: Stateless token authentication with role-based authorization (`ROLE_CUSTOMER`, `ROLE_ADMIN`)
- **Spring Data MongoDB**: Connected directly to MongoDB Atlas cluster (`online_grocery_store`)
- **Spring WebSocket + STOMP**: Bidirectional message broker broadcasting live order milestones to `/topic/orders/{orderId}` and `/topic/admin/orders`
- **Redis & In-Memory Fallback**: Resilient caching layer and sliding-window rate limiting with thread-safe in-memory fallback
- **Razorpay Java Service**: Payment order generation and HMAC-SHA256 signature verification
- **SpringDoc OpenAPI 3 / Swagger UI**: Interactive API documentation at `/swagger-ui.html`
- **Apache Maven**: Build automation and dependency lifecycle management

---

## ⚙️ Configuration (`backend/src/main/resources/application.yml`)

```yaml
server:
  port: 8080

spring:
  application:
    name: grocery-backend
  data:
    mongodb:
      uri: ${MONGODB_URI:mongodb://localhost:27017/onlinebazer}
      auto-index-creation: true
    redis:
      host: ${REDIS_HOST:localhost}
      port: ${REDIS_PORT:6379}
      timeout: 2000ms
  cache:
    type: none

app:
  jwt:
    secret: ${JWT_SECRET}
    expiration-ms: 604800000 # 7 days
  razorpay:
    key-id: ${RAZORPAY_KEY_ID:}
    key-secret: ${RAZORPAY_KEY_SECRET:}
    webhook-secret: ${RAZORPAY_WEBHOOK_SECRET:}
    currency: INR

springdoc:
  api-docs:
    path: /api-docs
  swagger-ui:
    path: /swagger-ui.html
```

Set `JWT_SECRET` and any required payment credentials in your environment; do not commit real credentials. Use a securely generated JWT secret of at least 32 bytes.


---

## 📦 Project Structure

```
onlinebazer/
├── backend/
│   ├── src/main/java/com/freshmart/grocery/
│   │   ├── config/              # Security, WebSocket, Razorpay, Swagger, DataSeeder
│   │   ├── controller/          # Auth, Product, Order, Coupon, Payment, Admin APIs
│   │   ├── dto/                 # Request & Response payload transfer objects
│   │   ├── model/               # User, Product, Order, OrderItem, Coupon, Address, Slot
│   │   ├── repository/          # MongoRepository interfaces
│   │   ├── security/            # JwtTokenProvider, JwtAuthenticationFilter
│   │   ├── service/             # Business logic, Stock management, Cache & Rate limiter
│   │   └── websocket/           # WebSocketOrderService for STOMP broadcasting
│   ├── src/main/resources/
│   │   └── application.yml      # Atlas MongoDB, Redis, JWT & Razorpay credentials
│   └── pom.xml
└── frontend/
    ├── src/
    │   ├── api/                 # Axios client with JWT interceptor & API endpoints
    │   ├── components/          # Navbar, Footer, ProductCard, CartDrawer, SlotPicker
    │   ├── pages/               # Home, Catalog, Detail, Checkout, Track, Orders, Admin
    │   ├── services/            # STOMP / SockJS WebSocket client
    │   ├── store/               # Zustand stores (useAuthStore, useCartStore)
    │   ├── index.css            # Custom CSS3 design system with Inter font
    │   ├── App.jsx              # React Router v6 setup
    │   └── main.jsx
    ├── index.html               # Inter font & Razorpay JS SDK script
    ├── package.json
    └── vite.config.js           # Vite dev server with proxy to /api and /ws
```

---

## 🏃‍♂️ How to Run Locally

### **1. Run Backend**
```bash
cd backend
mvn spring-boot:run
```
- Server starts on: `http://localhost:8080`
- Interactive Swagger UI: `http://localhost:8080/swagger-ui.html`

### **2. Run Frontend**
```bash
cd frontend
npm install
npm run dev
```
- Client runs on: `http://localhost:5173`

---

## 🛒 Features & Workflows

1. **Product Catalog & Filtering**:
   - 8 Categories: *Fresh Produce, Dairy & Eggs, Bakery & Bread, Beverages, Pantry & Staples, Snacks & Confectionery, Meat & Seafood, Organic & Health*.
   - Filter by keyword search, category, 100% certified organic, and in-stock items.
   - Sort by price (low/high), customer rating, or discount percentage.

2. **Shopping Cart & Discount Coupons**:
   - Slide-out Cart Drawer with quantity stepper controls.
   - Dynamic threshold progress bar for unlocking FREE delivery (orders over ₹499).
   - Promotional coupons: `FRESH20` (20% OFF), `SUPERGROCERY` (₹100 OFF), `FIRST50` (₹50 OFF).

3. **Scheduled Deliveries**:
   - Date selection: *Today, Tomorrow, Day After*.
   - Slot selection: *Morning (07:00-10:00 AM), Afternoon (12:00-03:00 PM), Evening (05:00-08:00 PM)* and *Express 45-Min Delivery*.

4. **Real-Time Live Order Tracking**:
   - 5-stage progress pipeline: `PLACED` ➔ `CONFIRMED` ➔ `PACKING` ➔ `OUT_FOR_DELIVERY` ➔ `DELIVERED`.
   - Simulated Radar Map with live GPS coordinates, vehicle marker, and ETA countdown.
   - STOMP WebSocket subscriber receives live server-pushed updates instantly.

5. **Admin Inventory Portal (`/admin`)**:
   - Revenue, Orders, Catalog, and Low Stock KPI metric cards.
   - Live Order Management: update order status with instant STOMP notification to customer.
   - Product Inventory Control: add new products, adjust stock counts inline, edit prices, or remove products.
