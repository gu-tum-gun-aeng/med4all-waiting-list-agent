import axios from "axios"
import { Kafka } from "kafkajs"
import { v4 as uuidv4 } from "uuid"

import { mockWaitingListApiRequest } from "./mocks"
import { Patient } from "./models"
import { WaitingListApiRequest } from "./models"

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

      try {
        const patientData = parseData(rawMessage)
        await sendToWaitingListApi(patientData!)
      } catch (error) {
        console.error(error)
        await sendToDeadLetterQueue(rawMessage)
      }
    },
  })
}

run().catch(console.error)

function parseData(message: string): Patient | undefined {
  try {
    const data: Patient = JSON.parse(message)
    return data
  } catch (error) {
    return
  }
}

async function sendToDeadLetterQueue(message: string): Promise<void> {
  await producer.connect()
  await producer.send({
    topic: DEAD_LETTER_QUEUE_TOPIC,
    messages: [{ value: message }],
  })
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function sendToWaitingListApi(_data: Patient): Promise<void> {
  // TODO: remove mock and transform Patient data to fit api body
  const requestData: WaitingListApiRequest = mockWaitingListApiRequest  
  await axios.post(WAITING_LIST_API_URL, requestData)
}
