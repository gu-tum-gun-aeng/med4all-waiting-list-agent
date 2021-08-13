const config: {
  kafkaBrokerList: string[]
  kafkaGroupId: string
  waitingListApiUrl: string
  waitingListApiKey: string
} = {
  kafkaBrokerList: (process.env.KAFKA_BROKER_LIST || "").split(","),
  kafkaGroupId: process.env.KAFKA_GROUP_ID || "",
  waitingListApiUrl: process.env.WAITING_LIST_API_URL || "",
  waitingListApiKey: process.env.WAITING_LIST_API_KEY || "",
}

export default config
