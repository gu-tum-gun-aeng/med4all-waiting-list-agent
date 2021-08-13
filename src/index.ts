import Dotenv from "dotenv"
Dotenv.config()

import messageQueue from "./messageQueue"
import { logger } from "./util/logger"
import waitingListAgent from "./waitingListAgent"

logger.info("Start Application")

messageQueue.initialize()

const run = async () => {
  await waitingListAgent.consumePatientWithRiskScore()
  logger.info("Terminating Application")
}
run().catch(console.error)
