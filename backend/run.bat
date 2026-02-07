@echo off
echo Starting Campus Canteen Backend...
echo.
echo Note: This requires Java 17+ to be installed and in your PATH
echo.

REM Check if Java is installed
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Java is not installed or not in PATH
    echo Please install Java 17 or higher
    pause
    exit /b 1
)

echo Java found! Checking for Maven...
echo.

REM Try to use Maven if available
mvn -version >nul 2>&1
if %errorlevel% equ 0 (
    echo Maven found! Running with Maven...
    mvn spring-boot:run
) else (
    echo Maven not found!
    echo.
    echo Please install Maven or use an IDE like IntelliJ IDEA to run the application.
    echo.
    echo Download Maven from: https://maven.apache.org/download.cgi
    echo Or use IntelliJ IDEA: Right-click CanteenApplication.java and select "Run"
    pause
)
