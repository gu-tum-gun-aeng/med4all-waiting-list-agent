import Dotenv from "dotenv"
Dotenv.config()

import messageQueue from "./messageQueue"
import { logger } from "./util/logger"
import waitingListAgent from "./waitingListAgent"

logger.info("Start Application")

const run = async () => {
  await messageQueue.initialize()
  await waitingListAgent.consumePatientWithRiskScore()
  logger.info("Terminating Application")
}
run().catch(logger.error)
