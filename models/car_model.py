from database import Database

class CarModel(Database):
    def get_all(self):
        conn = self.connect()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM cars")
        rows = cursor.fetchall()
        conn.close()
        return rows

    def get_by_id(self, car_id):
        conn = self.connect()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM cars WHERE car_id=%s", (car_id,))
        row = cursor.fetchone()
        conn.close()
        return row

    def add(self, data):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO cars (car_name, car_description, car_category, car_image)
            VALUES (%s, %s, %s, %s)
        """, (data['car_name'], data['car_description'], data['car_category'], data['car_image']))
        conn.commit()
        conn.close()

    def update(self, car_id, data):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("""
            UPDATE cars
            SET car_name=%s, car_description=%s, car_category=%s, car_image=%s
            WHERE car_id=%s
        """, (data['car_name'], data['car_description'], data['car_category'], data['car_image'], car_id))
        conn.commit()
        conn.close()

    def delete(self, car_id):
        conn = self.connect()
        cursor = conn.cursor()
        cursor.execute("DELETE FROM cars WHERE car_id=%s", (car_id,))
        conn.commit()
        conn.close()
