# Campus Canteen Backend

Spring Boot backend for the Multi-Outlet Smart Campus Food Ordering System.

## Prerequisites

- Java 17 or higher
- Maven 3.6+
- MySQL 8.0+

## Setup Instructions

### 1. Database Setup

Create a MySQL database:
```sql
CREATE DATABASE campus_canteen;
```

Or let the application create it automatically (configured in `application.properties`).

### 2. Configuration

Update `src/main/resources/application.properties` with your MySQL credentials:
```properties
spring.datasource.username=your_username
spring.datasource.password=your_password
```

### 3. Run the Application

```bash
# Using Maven
./mvnw spring-boot:run

# Or on Windows
mvnw.cmd spring-boot:run
```

The application will start on `http://localhost:8080`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get JWT token

### Outlets & Menu
- `GET /api/outlets` - Get all outlets
- `GET /api/outlets/{id}/menu` - Get menu for outlet
- `PUT /api/menu/{id}/availability` - Update menu item availability (Staff only)

### Orders
- `POST /api/orders/place` - Place new order
- `GET /api/orders/user/{id}` - Get user's orders
- `GET /api/orders/outlet/{id}` - Get outlet's orders (Staff only)
- `PUT /api/orders/{id}/accept` - Accept order (Staff only)
- `PUT /api/orders/{id}/status` - Update order status (Staff only)

## Default Seed Data

The application includes seed data for:
- 3 Outlets (Main Canteen, Coffee House, Snack Corner)
- 15 Menu Items across all outlets

## Testing

Use the frontend application or tools like Postman to test the APIs.

Example login request:
```json
POST /api/auth/login
{
  "email": "user@example.com",
  "password": "password123"
}
```

## Tech Stack

- Spring Boot 3.2.2
- Spring Security with JWT
- Spring Data JPA
- MySQL
- Lombok
- Maven
