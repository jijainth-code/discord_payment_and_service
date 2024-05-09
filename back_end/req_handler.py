from flask import Flask, request, jsonify , send_file
from flask_cors import CORS  # Import CORS from flask_cors
from flask_socketio import SocketIO, emit
import json  # This line imports the json module
from termcolor import colored
import time
from data_processor import processor


app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
processor_instance = processor()





@app.route('/get-options', methods=['GET'])
def get_options():
    options_data = processor_instance.load_options_data()
    return jsonify(options_data)

@app.route('/process-payment', methods=['POST'])
def process_payment():
    data = request.get_json()  # Get the JSON data sent by the frontend
    print(colored(data , 'green'))  # For debugging purposes, to see what's received 


    #HERE SET UP GOOGLE PAY ! 





    success = processor_instance.store_data(data)

    if success:
        return jsonify({'status': 'success', 'message': 'Payment processed successfully!'}), 200
    else:
        return jsonify({'status': 'error', 'message': 'Failed to process payment'}), 500


@app.route('/fetch-payments', methods=['GET'])
def fetch_payments():
    
    payments = processor_instance.fetch_all_payments()
    print(colored('fetched the invoices' , 'blue'))
    return jsonify(payments)









if __name__ == '__main__':
    socketio.run( app , port=8080, debug=True)