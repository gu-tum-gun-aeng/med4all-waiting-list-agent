import axios from "axios"

import messageQueue from "./messageQueue"

const TOPIC = "patient.with-risk-score.main"
const DEAD_LETTER_QUEUE_TOPIC = "patient.with-risk-score.dlq"

const WAITING_LIST_API_URL = "http://localhost:8999/ps/patient/create"

messageQueue.init()

const run = async () => {
  await messageQueue.consume(TOPIC, processMessage)
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
  messageQueue.publish(DEAD_LETTER_QUEUE_TOPIC, message)
}

async function sendToWaitingListApi(data: string): Promise<void> {
  await axios.post(WAITING_LIST_API_URL, data)
}
