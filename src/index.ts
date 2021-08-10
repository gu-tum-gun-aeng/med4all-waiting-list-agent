import axios from "axios"
import { Kafka } from "kafkajs"
import { v4 as uuidv4 } from "uuid"

const TOPIC = "patient.with-risk-score.main"
const DEAD_LETTER_QUEUE_TOPIC = "patient.with-risk-score.dlq"
const CLIENT_ID = `med4all-waiting-list-agent-${uuidv4()}`
const BROKER_LIST = ["localhost:9092"]
const GROUP_ID = "test-group"

const WAITING_LIST_API_URL = "http://localhost:8999/ps/patient/create"

const kafka = new Kafka({
  clientId: CLIENT_ID,
  brokers: BROKER_LIST,
})

const producer = kafka.producer()
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
      
      const rawMessage = message?.value?.toString() || ""
      processMessage(rawMessage)
    },
  })
}

run().catch(console.error)

export async function processMessage(message: string): Promise<void> {
  try {
    await sendToWaitingListApi(message)
  } catch (error) {
    console.error(error)
    await sendToDeadLetterQueue(message)
  }
}

async function sendToDeadLetterQueue(message: string): Promise<void> {
  await producer.connect()
  await producer.send({
    topic: DEAD_LETTER_QUEUE_TOPIC,
    messages: [{ value: message }],
  })
}

async function sendToWaitingListApi(data: string): Promise<void> {
  await axios.post(WAITING_LIST_API_URL, data)
}
