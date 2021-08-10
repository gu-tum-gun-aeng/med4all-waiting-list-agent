import Dotenv from "dotenv"
Dotenv.config()

import config from "./config"

console.log("Hello World")
console.log(`Hello First ENV ${config.hello}`)
