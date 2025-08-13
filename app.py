from flask import Flask, render_template, jsonify, request
from models.car_model import CarModel

app = Flask(__name__)
car_model = CarModel()

@app.route("/")
def home():
    return render_template("cars.html")

@app.route("/cars", methods=["GET"])
def get_cars():
    return jsonify(car_model.get_all())

@app.route("/cars/<int:car_id>", methods=["GET"])
def get_car(car_id):
    return jsonify(car_model.get_by_id(car_id))

@app.route("/cars", methods=["POST"])
def add_car():
    data = request.get_json()
    car_model.add(data)
    return jsonify({"message": "Car added"}), 201

@app.route("/cars/<int:car_id>", methods=["PUT"])
def update_car(car_id):
    data = request.get_json()
    car_model.update(car_id, data)
    return jsonify({"message": "Car updated"})

@app.route("/cars/<int:car_id>", methods=["DELETE"])
def delete_car(car_id):
    car_model.delete(car_id)
    return jsonify({"message": "Car deleted"})

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5001)
