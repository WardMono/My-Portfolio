import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { recordView, snapshot } from './server/viewCount.js'
import chatHandler from './api/chat.js'

function chatApi() {
  return {
    name: 'chat-api',
    configureServer(server) {
      server.middlewares.use('/api/chat', (req, res) => {
        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end()
          return
        }
        let raw = ''
        req.on('data', (chunk) => { raw += chunk })
        req.on('end', async () => {
          try { req.body = raw ? JSON.parse(raw) : {} } catch { req.body = {} }
          const mock = {
            statusCode: 200,
            status(code) { this.statusCode = code; return this },
            json(body) {
              res.statusCode = this.statusCode
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify(body))
            },
            end() {
              res.statusCode = this.statusCode
              res.end()
            },
          }
          try {
            await chatHandler(req, mock)
          } catch (err) {
            res.statusCode = 500
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ error: 'Internal server error' }))
          }
        })
      })
    },
  }
}

function viewsApi() {
  return {
    name: 'views-api',
    configureServer(server) {
      server.middlewares.use('/api/views', (req, res) => {
        const send = (status, body) => {
          res.statusCode = status
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        }

        if (req.method === 'GET') {
          send(200, snapshot())
          return
        }

        if (req.method !== 'POST') {
          send(405, { error: 'Method not allowed' })
          return
        }

        let raw = ''
        req.on('data', (chunk) => { raw += chunk })
        req.on('end', async () => {
          let body = {}
          try { body = raw ? JSON.parse(raw) : {} } catch { body = {} }
          send(200, await recordView(body.sessionId, body.path))
        })
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [viewsApi(), chatApi(), react()],
})