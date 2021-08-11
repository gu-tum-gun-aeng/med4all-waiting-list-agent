import axios from "axios"

import messageQueue from "./messageQueue"

const WAITING_LIST_API_URL = "http://localhost:8999/ps/patient/create"

const TOPIC = "patient.with-risk-score.main"
const DEAD_LETTER_QUEUE_TOPIC = "patient.with-risk-score.dlq"

const waitingListAgent = {
  consumePatientWithRiskScore: async () => {
    await messageQueue.consume(
      TOPIC,
      waitingListAgent.processMessage
    )
  },
  processMessage: async (message: string) => {
    try {
      sendToWaitingListApi(message)
    } catch (error) {
      console.error(error)
      await sendToDeadLetterQueue(message)
    }
  }
}

async function sendToWaitingListApi(data: string): Promise<void> {
  await axios.post(WAITING_LIST_API_URL, data)
}

async function sendToDeadLetterQueue(message: string): Promise<void> {
  messageQueue.publish(DEAD_LETTER_QUEUE_TOPIC, message)
}

export default waitingListAgent
