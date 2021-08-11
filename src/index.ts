import messageQueue from "./messageQueue"
import waitingListAgent from "./waitingListAgent"

messageQueue.initialize()

const run = async () => {
  await waitingListAgent.consumePatientWithRiskScore()
}
run().catch(console.error)
