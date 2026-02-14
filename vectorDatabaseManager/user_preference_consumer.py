from kafka import KafkaConsumer
from pymilvus import MilvusClient
import json
import numpy as np

consumer = KafkaConsumer('user_preference',
                         bootstrap_servers=['localhost:9092'])

client = MilvusClient(
    uri="http://localhost:19530"
)

def scale_add_normalize(u, v, a, b, eps=1e-8):
    combined = a * u + b * v
    norm = np.linalg.norm(combined)
    return combined / max(norm, eps)

if __name__ == "__main__":

    while(True):
        for msg in consumer:
            message_value = msg.value
            message_value_dict = json.loads(message_value.decode('utf-8'))
            print(message_value_dict, "message_value_dict")

            user_record = client.query(
                    collection_name="users",
                    ids=message_value_dict["user_id"]
                )
            
            article_record = client.get(
                collection_name='articles',
                ids=message_value_dict["interacted_article"],
                output_fields=["id", "article_vector"]
            )

            user_data = user_record[0]
            user_preference_vector = np.array(user_data['user_preference_vector'])
            article_vector = np.array(article_record[0]['article_vector'])

            updated_preference_vector = scale_add_normalize(user_preference_vector, article_vector, 0.4, 0.6)

            user_data["user_preference_vector"] = updated_preference_vector 

            res = client.upsert(
                collection_name='users',
                data = user_data
            )
            print(res)
