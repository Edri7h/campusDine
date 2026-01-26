# Multi-Outlet Smart Campus Food Ordering System

## Overview

The **Multi-Outlet Smart Campus Food Ordering System** is a centralized web application designed for college campuses with multiple food outlets. The system enables students and faculty to digitally place food orders from different campus outlets, choose between **quick orders** or **scheduled orders**, and receive food deliveries at their rooms or designated campus locations.

Each outlet independently manages its menu, order queue, and delivery workflow using its own staff, eliminating the need for external delivery services. The platform focuses on scalability, maintainability, and real-world campus workflows.

---

## Problem Statement

Traditional campus canteen systems rely heavily on manual ordering, leading to:

- Long queues during peak hours  
- Order mismanagement and delays  
- Lack of order tracking for users  
- Difficulty for outlets to manage demand and availability  

With multiple food outlets operating independently across campus, there is no unified system to streamline ordering, scheduling, and delivery.

---

## Proposed Solution

This project introduces a **multi-outlet, role-based food ordering platform** where:

- Users select a specific outlet before ordering   
- Orders can be placed instantly or scheduled for a future time  
- Each outlet receives, processes, and delivers its own orders  
- Delivery is handled internally by outlet staff  
- Order and delivery statuses are updated in real time  

The system is designed with a **modern frontend stack**, a **robust backend architecture**, and **scalable data storage**, suitable for real-world deployment.

---

## Key Objectives

- Digitize food ordering across multiple campus outlets  
- Reduce congestion and waiting time at physical counters  
- Enable scheduled meal ordering (lunch, dinner, etc.)  
- Provide real-time order tracking and status updates  
- Allow outlets to manage availability and order queues efficiently  

---


## User Roles

- **Student** – Places food orders and tracks delivery  
- **Faculty** – Places food orders with scheduling options  
- **Outlet Staff** – Manages orders, delivery, and menu availability  
- **Admin** – Oversees outlets, users, and system activity  

---

## Core Features

### User (Student / Faculty)
- Secure authentication and authorization  
- View and select available campus outlets  
- Browse outlet-specific menus  
- Place quick or scheduled orders  
- Provide delivery details (room number, hostel, name)  
- Track order and delivery status  
- View order history  

---

### Outlet Staff (Canteen Staff)
- View new incoming orders  
- Accept or reject orders  
- Manage order queue  
- Update order status:
  - Accepted  
  - Preparing  
  - Out for Delivery  
  - Delivered  
- Enable or disable menu items based on availability  

---

### Admin
- Manage campus outlets  
- Manage outlet staff accounts  
- Monitor overall system activity and orders  

---

## Technology Stack

### Frontend
- React.js  
- TypeScript  
- Tailwind CSS  
- ShadCN UI  
- React Router DOM  
- Redux Toolkit (State Management)  
- Zod (Schema Validation)  

### Backend
- Java  
- Spring Boot  
- Spring Security  
- RESTful APIs  

### Databases & Caching
- MySQL – Primary relational database  
- Redis – Caching and performance optimization  

### Design & Collaboration
- Figma – UI/UX design and flow diagrams  
- Git & GitHub – Version control  

---

## System Architecture (High-Level)

- Frontend communicates with backend via REST APIs  
- Backend handles:
  - Authentication and authorization  
  - Business logic  
  - Role-based access control  
- MySQL stores persistent application data  
- Redis caches frequently accessed data such as menus and outlet status  

---

## Database Design (Brief)

### Users
- `user_id` (PK)  
- `name`  
- `email` (unique)  
- `password`  
- `role` (Student, Faculty, Staff, Admin)  

---

### Outlets
- `outlet_id` (PK)  
- `outlet_name`  
- `location`  
- `status` (Open / Closed)  

---

### Menu_Items
- `item_id` (PK)  
- `outlet_id` (FK)  
- `item_name`  
- `price`  
- `availability_status`  

---

### Orders
- `order_id` (PK)  
- `user_id` (FK)  
- `outlet_id` (FK)  
- `order_type` (Quick / Scheduled)  
- `scheduled_time` (nullable)  
- `delivery_location`  
- `total_amount`  
- `order_status`  
- `order_date`  

---

### Order_Items
- `order_item_id` (PK)  
- `order_id` (FK)  
- `item_id` (FK)  
- `quantity`  



---
## API Design (Exposed Endpoints)

All APIs follow RESTful conventions and exchange data in JSON format. Authentication is handled using token-based authorization.

### Authentication APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Authenticate user and generate token |

POST /api/auth/register  
Request Payload:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "Student"
}

Response:
{
  "message": "User registered successfully",
  "userId": 101
}

POST /api/auth/login  
Request Payload:
{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "token": "jwt-token-string",
  "role": "Student"
}

### Outlet & Menu APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | /api/outlets | Fetch all available outlets |
| GET | /api/outlets/{id}/menu | Fetch menu of a specific outlet |
| PUT | /api/menu/{id}/availability | Enable or disable a menu item (Outlet Staff) |

GET /api/outlets  
Request Payload: None

Response:
[
  {
    "outlet_id": 1,
    "outlet_name": "Main Canteen",
    "location": "Academic Block",
    "status": "Open"
  }
]

GET /api/outlets/{id}/menu  
Request Payload: None

Response:
[
  {
    "item_id": 11,
    "item_name": "Veg Thali",
    "price": 80,
    "availability_status": true
  }
]

PUT /api/menu/{id}/availability  
Request Payload:
{
  "availability_status": false
}

Response:
{
  "message": "Menu item availability updated"
}

### Order APIs

| Method | Endpoint | Description |
|------|---------|-------------|
| POST | /api/orders/place | Place a new food order |
| GET | /api/orders/user/{id} | View order history of a user |
| GET | /api/orders/outlet/{id} | View orders received by an outlet |

POST /api/orders/place  
Request Payload:
{
  "user_id": 101,
  "outlet_id": 1,
  "order_type": "Scheduled",
  "scheduled_time": "2026-01-30T13:00:00",
  "delivery_location": "Hostel A - Room 203",
  "items": [
    {
      "item_id": 11,
      "quantity": 2
    }
  ]
}

Response:
{
  "message": "Order placed successfully",
  "order_id": 5001,
  "status": "Placed"
}

GET /api/orders/user/{id}  
Request Payload: None

Response:
[
  {
    "order_id": 5001,
    "outlet_name": "Main Canteen",
    "status": "Preparing",
    "total_amount": 160
  }
]

GET /api/orders/outlet/{id}  
Request Payload: None

Response:
[
  {
    "order_id": 5001,
    "user_id": 101,
    "delivery_location": "Hostel A - Room 203",
    "status": "Placed"
  }
]

### Order Management APIs (Outlet Staff)

| Method | Endpoint | Description |
|------|---------|-------------|
| PUT | /api/orders/{id}/accept | Accept an incoming order |
| PUT | /api/orders/{id}/status | Update order delivery status |

PUT /api/orders/{id}/accept  
Request Payload: None

Response:
{
  "message": "Order accepted",
  "status": "Accepted"
}

PUT /api/orders/{id}/status  
Request Payload:
{
  "status": "OutForDelivery"
}

Response:
{
  "message": "Order status updated successfully"
}


## Installation & Setup (Development)

### Frontend
```bash
cd frontend
npm install
npm run dev

### Backend

cd backend
./mvnw spring-boot:run










## Deployment Strategy

The application is designed with a production-ready deployment strategy, separating frontend and backend concerns to ensure scalability, security, and maintainability.

---

### Backend Deployment

- The backend service will be containerized using **Docker** to ensure consistency across development and production environments.
- Docker images will include the Spring Boot application along with necessary runtime dependencies.
- The containerized backend will be deployed on an **AWS EC2 instance**.
- Environment variables will be used to manage sensitive configuration such as database credentials and JWT secrets.
- MySQL will be hosted as a managed or self-hosted service and connected securely to the backend.
- Redis will be used as an in-memory cache layer to optimize performance for frequently accessed data.

**Backend Stack**
- Docker
- AWS EC2
- Java + Spring Boot
- MySQL
- Redis

---

### Frontend Deployment

- The frontend application will be deployed on **Vercel**.
- Vercel provides automatic builds, CDN distribution, and environment variable management.
- The frontend will communicate with the backend using secure HTTPS-based REST APIs.
- Separate environment configurations will be maintained for development and production.

**Frontend Stack**
- React + TypeScript
- Tailwind CSS
- ShadCN UI
- Vercel Hosting

---

### Deployment Workflow (High-Level)

1. Backend code is built and packaged into a Docker image  
2. Docker image is deployed to an AWS EC2 instance  
3. MySQL and Redis services are connected to the backend  
4. Frontend code is built and deployed via Vercel  
5. Frontend consumes backend APIs using environment-specific URLs  

---

### Deployment Note

This deployment plan represents the intended production architecture. Actual deployment steps may be refined during implementation while maintaining the overall system design.
