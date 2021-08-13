import Dotenv from "dotenv"
Dotenv.config()

import messageQueue from "./messageQueue"
import { logger } from "./util/logger"
import waitingListAgent from "./waitingListAgent"

logger.info("Start Application")

messageQueue.initialize()

const run = async () => {
  await waitingListAgent.consumePatientWithRiskScore()
}
run().catch(console.error)

logger.info("Terminating Application")
