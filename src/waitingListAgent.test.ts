import axios from "axios"
import sinon from "sinon"

import messageQueue from "./messageQueue"
import waitingListAgent from "./waitingListAgent"

afterEach(() => {
  sinon.restore()
})

test("waitingListAgent.processMessage should call axios.post once", async () => {
  const axiosStub = sinon.stub(axios, "post")

  axiosStub.returns(Promise.resolve({ result: "success"}))

  await waitingListAgent.processMessage("blahblah")

  expect(axiosStub.callCount).toBe(1)
})

test("waitingListAgent.processMessage should call messageQueue.publish once if axios.post return in failure", async () => {
  const axiosStub = sinon.stub(axios, "post")
  const messageQueueStub = sinon.stub(messageQueue, "publish")

  axiosStub.throws(new Error("Server not found"))
  messageQueueStub.returns(Promise.resolve())

  await waitingListAgent.processMessage("blahblah")

  expect(messageQueueStub.callCount).toBe(1)
})
