import requests
from termcolor import colored
# from config import config_
from datetime import datetime
import pytz
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from pymongo.errors import ConnectionFailure
import json





class processor():
    def __init__(self) -> None:
        self.db_url = 'mongodb+srv://jai:DFDPiDcPho1bIZRN@aiosint.shu261x.mongodb.net/?retryWrites=true&w=majority&appName=aiosint'
        self.db_client = MongoClient(self.db_url, server_api=ServerApi('1'))


    def load_options_data(self):
        with open('options.json', 'r') as file:
            data = json.load(file)
        return data
    
    def store_data(self, data):
        try:
            tz = pytz.timezone('Asia/Kolkata')
            current_time = datetime.now(tz).strftime('%Y-%m-%d %H:%M:%S')
            data['timestamp'] = current_time
            

            db = self.db_client.get_database('discord')
            collection = db.payment
            collection.insert_one(data)
            print(colored('Inserted into DB', 'yellow'))
            return True
        except ConnectionFailure as e:
            print(colored(f'Database connection failed: {e}', 'red'))
            return False
        except Exception as e:
            print(colored(f'An error occurred: {e}', 'red'))
            return False
        
    def fetch_all_payments(self):
        try:
            db = self.db_client.get_database('discord')
            collection = db.payment
            documents = list(collection.find({}, {'_id': 0}))  # Exclude the MongoDB ObjectId
            return documents
        except Exception as e:
            print(f"An error occurred while fetching payments: {e}")
            return []
        

    # def send_email(subject, body, to_email):
    #     msg = MIMEMultipart()
    #     msg['From'] = EMAIL_ADDRESS
    #     msg['To'] = to_email
    #     msg['Subject'] = subject

    #     msg.attach(MIMEText(body, 'plain'))

    #     try:
    #         server = smtplib.SMTP('smtp.gmail.com', 587)
    #         server.starttls()
    #         server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
    #         text = msg.as_string()
    #         server.sendmail(EMAIL_ADDRESS, to_email, text)
    #         server.quit()
    #         return True
    #     except Exception as e:
    #         print(f"Failed to send email: {e}")
    #         return False
        


        


        