import mysql.connector

class Database:
    def connect(self):
        conn = mysql.connector.connect(
            host='localhost',
            database='consultajaime',
            user='root',
            password=''
        )
        return conn
