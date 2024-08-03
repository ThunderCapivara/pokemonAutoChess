/**
 * IMPORTANT:
 * ---------
 * Do not manually edit this file if you'd like to host your server on Colyseus Cloud
 *
 * If you're self-hosting (without Colyseus Cloud), you can manually
 * instantiate a Colyseus Server as documented here:
 *
 * See: https://docs.colyseus.io/server/api/#constructor-options
 */
import { listen } from "@colyseus/tools"

import { RedisDriver, RedisPresence } from "colyseus"
import { nanoid } from "nanoid"
// Import Colyseus config
import app from "./app.config"
import { initializeMetrics } from "./metrics"

if (process.env.NODE_APP_INSTANCE) {
  initializeMetrics()
  app.options = {
    presence: new RedisPresence(process.env.REDIS_URI),
    driver: new RedisDriver(process.env.REDIS_URI)
  }
  listen(app)
  console.log(app.options)
} else {
  listen(app, 9000)
}
