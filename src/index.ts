import { Kafka } from "kafkajs"
import { v4 as uuidv4 } from "uuid"

const TOPIC = "patient.with-risk-score.main"
const CLIENT_ID = `med4all-waiting-list-agent-${uuidv4()}`
const BROKER_LIST = ["localhost:9092"]
const GROUP_ID = "test-group"

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKER_LIST,
})

const consumer = kafka.consumer({ groupId: GROUP_ID })

const run = async () => {
  // Consuming
  await consumer.connect()
  await consumer.subscribe({ topic: TOPIC, fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message?.value?.toString(),
      })
    },
  })
}

run().catch(console.error)
