# MySQL Setup Guide for Campus Canteen Backend

## Problem
The backend failed to start with error: `Communications link failure` - This means MySQL is not installed or not running.

## Solution: Install MySQL

### Option 1: Install MySQL Community Server (Recommended)

1. **Download MySQL**
   - Go to: https://dev.mysql.com/downloads/mysql/
   - Download "MySQL Installer for Windows"
   - Choose the "mysql-installer-community" version

2. **Install MySQL**
   - Run the installer
   - Choose "Developer Default" or "Server only"
   - Set root password to: `root` (or remember what you set)
   - Keep default port: `3306`
   - Complete the installation

3. **Start MySQL Service**
   - Open Services (Win + R, type `services.msc`)
   - Find "MySQL80" or "MySQL"
   - Right-click → Start
   - Set to "Automatic" startup

4. **Verify MySQL is Running**
   ```bash
   mysql -u root -p
   # Enter password: root
   ```

### Option 2: Use XAMPP (Easier for Beginners)

1. **Download XAMPP**
   - Go to: https://www.apachefriends.org/
   - Download for Windows
   - Install it

2. **Start MySQL**
   - Open XAMPP Control Panel
   - Click "Start" next to MySQL
   - MySQL will run on port 3306

3. **No password needed** - XAMPP MySQL has no password by default

### Option 3: Use Docker (If you have Docker)

```bash
docker run --name mysql-canteen -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 -d mysql:8.0
```

## After Installing MySQL

### Update Backend Configuration

If you used a different password or XAMPP (no password), update:
`backend/src/main/resources/application.properties`

**For XAMPP (no password):**
```properties
spring.datasource.password=
```

**For MySQL with custom password:**
```properties
spring.datasource.password=your_password_here
```

### Run the Backend Again

Once MySQL is running, restart the backend in VS Code:
1. Stop the current run (if still running)
2. Run again (F5 or Run button)

The application will:
- Automatically create the `campus_canteen` database
- Create all tables
- Load seed data
- Start on port 8080

## Quick Test

After backend starts, test it:
```bash
curl http://localhost:8080/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"password\":\"pass123\",\"role\":\"Student\"}"
```

## Troubleshooting

**If MySQL won't start:**
- Check if port 3306 is already in use
- Try restarting your computer
- Check Windows Services for MySQL

**If still getting connection errors:**
- Verify MySQL is running: `netstat -an | findstr 3306`
- Check username/password in application.properties
- Make sure firewall isn't blocking port 3306
