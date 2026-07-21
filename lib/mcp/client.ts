import { Client } from '@modelcontextprotocol/sdk/client'
import { StreamableHTTPClientTransport } from '@modelcontextprotocol/sdk/client/streamableHttp'
import { CallToolResultSchema, ListToolsResultSchema } from '@modelcontextprotocol/sdk/types'

export interface MCPClientConfig {
  serverUrl?: string
}

export function createMCPClient(config?: MCPClientConfig) {
  const serverUrl = config?.serverUrl || process.env.OPEN_METEO_MCP_URL || 'http://localhost:3000/mcp'

  const client = new Client(
    { name: 'city-explorer-client', version: '0.1.0' },
    { capabilities: {} }
  )

  const transport = new StreamableHTTPClientTransport(new URL(serverUrl))

  async function connect() {
    await client.connect(transport)
  }

  async function disconnect() {
    await transport.close()
  }

  async function callTool(toolName: string, args: Record<string, unknown>) {
    const result = await client.callTool({ name: toolName, arguments: args }, CallToolResultSchema)
    if (result.isError) {
      const message = (result as { content: { type: string; text?: string }[] }).content.find((item) => item.type === 'text')?.text || 'Tool call failed'
      throw new Error(message)
    }
    return result as { content: { type: string; text?: string }[]; isError?: boolean }
  }

  async function listTools() {
    return client.request({ method: 'tools/list', params: {} }, ListToolsResultSchema)
  }

  return { connect, disconnect, callTool, listTools, client }
}
