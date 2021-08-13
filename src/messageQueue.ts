import { Consumer, Kafka, Producer } from "kafkajs"
import { v4 as uuidv4 } from "uuid"

import config from "./config"

let kafka: Kafka
let producer: Producer
let consumer: Consumer

const CLIENT_ID = `med4all-waiting-list-agent-${uuidv4()}`
const BROKER_LIST = config.kafkaBrokerList
const GROUP_ID = config.kafkaGroupId

const messageQueue = {
  initialize: () => {
    kafka = new Kafka({
      clientId: CLIENT_ID,
      brokers: BROKER_LIST,
      ssl: true,
    })
    producer = kafka.producer()
    consumer = kafka.consumer({ groupId: GROUP_ID })
  },
  consume: async (topic: string, cb: (message: string) => Promise<void>) => {
    await consumer.connect()
    await consumer.subscribe({ topic: topic, fromBeginning: true })

    await consumer.run({
      eachMessage: async ({ message }) => {
        if (message.value === null) {
          return
        }

        cb(message.value.toString())
      },
    })
    // TODO: disconnect consumer here
  },
  publish: async (topic: string, message: string): Promise<void> => {
    await producer.connect()
    await producer.send({
      topic,
      messages: [{ value: message }],
    })
    await producer.disconnect()
  },
}

export default messageQueue
