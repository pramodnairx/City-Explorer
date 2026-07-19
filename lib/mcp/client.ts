export interface MCPClientConfig {
  serverUrl?: string
  apiKey?: string
}

export function createMCPClient(_config?: MCPClientConfig) {
  // TODO: Initialize the actual MCP client when integration is ready.
  // This may involve WebSocket or HTTP calls to an MCP server.
  return {
    callTool: async (_toolName: string, _params: Record<string, unknown>) => {
      // TODO: Implement tool invocation through the MCP protocol.
      throw new Error('MCP client not implemented yet')
    },
  }
}
