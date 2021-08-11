const config: {
  kafkaBrokerList: string[]
  kafkaGroupId: string
  waitingListApiUrl: string
} = {
  kafkaBrokerList: (process.env.KAFKA_BROKER_LIST || "").split(","),
  kafkaGroupId: process.env.KAFKA_GROUP_ID || "",
  waitingListApiUrl: process.env.WAITING_LIST_API_URL || "",
}

export default config
