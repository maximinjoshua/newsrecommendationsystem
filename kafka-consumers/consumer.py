from kafka import KafkaConsumer
from sentence_transformers import SentenceTransformer
from pymilvus import MilvusClient
import json

consumer = KafkaConsumer('articles.raw',
                         group_id='my-group',
                         bootstrap_servers=['localhost:9092'])

model = SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

client = MilvusClient(
    uri="http://localhost:19530"
)

if __name__ == "__main__":

    while(True):
        for msg in consumer:
            message_value = msg.value
            message_value_dict = json.loads(message_value.decode('utf-8'))

            print(message_value_dict, "message value")
            article_text = message_value_dict['short_description']

            article_text_vector = model.encode(article_text)
            print(len(article_text_vector), "article text vector")
            message_value_dict['article_vector'] = article_text_vector

            res = client.insert(
                    collection_name="articles",
                    data=message_value_dict
                )
            
            print(res, "response")
