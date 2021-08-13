import { Consumer, Kafka, Producer } from "kafkajs"
import { v4 as uuidv4 } from "uuid"

import config from "./config"
import { traceWrapperAsync } from "./util/tracer"

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
    await consumer.subscribe({ topic: topic })

    await consumer.run({
      eachMessage: async ({ message }) => {
        await traceWrapperAsync(
          async () => {
            if (message.value === null) {
              return
            }

            cb(message.value.toString())
          },
          "route",
          `${topic}::consume`
        )
      },
    })
    // TODO: disconnect consumer here
  },
  publish: async (topic: string, message: string): Promise<void> => {
    await producer.connect()
    await traceWrapperAsync(
      async () => {
        await producer.send({
          topic,
          messages: [{ value: message }],
        })
      },
      "external",
      `${topic}::publish`
    )
    await producer.disconnect()
  },
}

export default messageQueue
