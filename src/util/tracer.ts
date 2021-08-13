import rTracer from "cls-rtracer"
import config from "config"

import { logger } from "./logger"

type Context = "route" | "external" | "log" | "test"
const logAppName = config.get("app.name")

/**
 * Tracer Wrapper function
 * @param fx (arg?: any) => Promise<any>
 * @param context route | externalApi
 * @param name string
 * @returns Promise<void>
 */
export const traceWrapperAsync = async <T>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fx: (arg?: any) => Promise<T>,
  context: Context,
  name: string,
  showStatus?: boolean
): Promise<T> => {
  const functionName = name ? name : fx.name
  const message = functionName.toUpperCase()
  const startTime = new Date()
  const requestId = rTracer.id()
  const target = `${logAppName}::${context}::${functionName}`
  const ctx = {
    request_id: requestId,
    target: target,
    // as used in fluentd
    "http.route": logAppName,
    "http.target": logAppName,
  }
  logger.trace(ctx, `[${message} - START]`, `${target}`)

  const result = await fx()
    .then((value) => {
      const endTime = new Date()
      logger.trace(
        {
          ...ctx,
          target: `${ctx.target}${showStatus ? "::success" : ""}`,
          elapsed_milliseconds: endTime.getTime() - startTime.getTime(),
        },
        `[${message} - END]`,
        target
      )
      return value
    })
    .catch((err) => {
      const endTime = new Date()
      logger.trace(
        {
          ...ctx,
          target: `${ctx.target}${showStatus ? "::failed" : ""}`,
          elapsed_milliseconds: endTime.getTime() - startTime.getTime(),
        },
        `[${message} - END]`,
        target
      )
      throw err
    })

  return result
}
