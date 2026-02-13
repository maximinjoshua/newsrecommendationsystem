from kafka import KafkaConsumer
from pymilvus import MilvusClient
import json

consumer = KafkaConsumer('users',
                         bootstrap_servers=['localhost:9092'])

client = MilvusClient(
    uri="http://localhost:19530"
)

if __name__ == "__main__":

    while(True):
        for msg in consumer:
            message_value = msg.value
            message_value_dict = json.loads(message_value.decode('utf-8'))

            message_value_dict['orig_db_id'] = message_value_dict['id']
            del message_value_dict['id']

            res = client.insert(
                    collection_name="users",
                    data=message_value_dict
                )
            
            print(res, "response")
