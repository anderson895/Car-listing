import mysql.connector

class Database:
    def connect(self):
        conn = mysql.connector.connect(
            host='auth-db1873.hstgr.io',
            database='u841289135_data_listing',
            user='u841289135_data_listing',
            password='Data_listing2025@',
            port=3306
        )
        return conn



# import mysql.connector

# class Database:
#     def connect(self):
#         conn = mysql.connector.connect(
#             host='localhost',
#             database='consultajaime',
#             user='root',
#             password=''
#         )
#         return conn
# import mysql.connector

# try:
#     conn = mysql.connector.connect(
#         host='auth-db1873.hstgr.io',
#         database='u841289135_data_listing',
#         user='u841289135_data_listing',
#         password='Data_listing2025@',
#         port=3306
#     )
#     print("Connected successfully!")
# except mysql.connector.Error as err:
#     print("Error:", err)
