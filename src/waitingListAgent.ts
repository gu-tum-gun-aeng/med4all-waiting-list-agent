import axios from "axios"

import config from "./config"
import { TOPIC } from "./constants"
import messageQueue from "./messageQueue"

const WAITING_LIST_API_URL = config.waitingListApiUrl

const waitingListAgent = {
  consumePatientWithRiskScore: async () => {
    await messageQueue.consume(
      TOPIC.PATIENT_WITH_RISK_SCORE_MAIN,
      waitingListAgent.processMessage
    )
  },
  processMessage: async (message: string) => {
    try {
      await sendToWaitingListApi(message)
    } catch (error) {
      await sendToDeadLetterQueue(message)
    }
  },
}

async function sendToWaitingListApi(data: string): Promise<void> {
  await axios.post(WAITING_LIST_API_URL, data)
}

async function sendToDeadLetterQueue(message: string): Promise<void> {
  await messageQueue.publish(TOPIC.PATIENT_WITH_RISK_SCORE_DLQ, message)
}

export default waitingListAgent
