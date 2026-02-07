import { kafka } from "../connections/kafka.connection.js"

export const publishToTopic = async (topic, message, key) => {
    const producer = kafka.producer()

    await producer.connect()
    await producer.send({
        topic: topic,
        messages: [
            {
                key: JSON.stringify(key),
                value: JSON.stringify(message)
            }
        ]
    })

    return await producer.disconnect()
}

export const createKafkaTopic = async (topicConfigs, otherConfigs) => {
    const admin = kafka.admin()

    await admin.connect()
    await admin.createTopics({
        ...otherConfigs,
        topics: [
            ...topicConfigs
        ]
    })
    return await admin.disconnect()
}