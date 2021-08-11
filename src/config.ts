const config: {
  hello: string
} = {
  hello: process.env.HELLO || "",
}

export default config
