# 🚀 Project Setup Guide

Follow the steps below to set up and run the project on your local machine.  

---

## 1. Install XAMPP
1. Download **XAMPP** from the official website:  
   👉 [https://www.apachefriends.org/download.html](https://www.apachefriends.org/download.html)  
2. Install XAMPP by following the setup wizard.  

---

## 2. Start Required Services
1. Open **XAMPP Control Panel**.  
2. Click **Start** for:
   - **Apache**
   - **MySQL (SQL Server)**  

---

## 3. Import SQL Database
1. Open **phpMyAdmin** (usually available at [http://localhost/phpmyadmin](http://localhost/phpmyadmin)).  
2. Create a new database (e.g., `project_db`).  
3. Import the provided `.sql` file into the new database.  

---

## 4. Install Python Dependencies
Make sure **Python 3.x** and **pip** are installed on your system.  

Run the following command inside the project folder:

```bash
pip install -r requirements.txt
