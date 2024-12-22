from flask import Flask, jsonify, request
from pymongo import MongoClient
import os

app = Flask(__name__)

# MongoDB connection string
client = MongoClient("mongodb+srv://naga:Naga@busdb.sehv2.mongodb.net/")
db = client.get_database("vvism")  # Replace with your DB name
collection = db.get_collection("timeTable")  # Replace with your collection name

# Example route to fetch data from MongoDB
@app.route('/', methods=['GET'])
def data():
    return jsonify({'data':'Connected'})
    
if __name__ == '__main__':
    app.run(debug=True)
