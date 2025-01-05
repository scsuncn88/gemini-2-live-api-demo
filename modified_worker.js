export default {
  async fetch(request, env, ctx) {
    // 从请求的URL获取token参数
    const url = new URL(request.url);
    const tokenParam = url.searchParams.get("token");
    const expectedToken = env.AUTH_TOKEN;

    // 检查请求头或URL参数中的授权信息
    if (!tokenParam || tokenParam !== expectedToken) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (request.headers.get("Upgrade") !== "websocket") {
      return new Response("Expected WebSocket connection", { status: 400 });
    }

    const pathAndQuery = url.pathname + url.search;

    // 从环境变量中获取 API key
    const apiKey = env.GEMINI_API_KEY;

    // 根据 Gemini API 的认证方式，将 API key 添加为查询参数
    const targetUrl = `wss://generativelanguage.googleapis.com${pathAndQuery}&api_key=${encodeURIComponent(apiKey)}`;

    console.log('Target WebSocket connection initiated.');

    const [client, proxy] = new WebSocketPair();
    proxy.accept();

    let pendingMessages = [];

    const connectPromise = new Promise((resolve, reject) => {
      const targetWebSocket = new WebSocket(targetUrl);
      console.log('Initial targetWebSocket readyState:', targetWebSocket.readyState);

      targetWebSocket.addEventListener("open", () => {
        console.log('Connected to Gemini server');
        console.log('targetWebSocket readyState after open:', targetWebSocket.readyState);

        console.log(`Processing ${pendingMessages.length} pending messages`);
        for (const message of pendingMessages) {
          try {
            targetWebSocket.send(message);
            console.log('Sent pending message:', typeof message === 'string' ? message.slice(0, 100) : 'Binary data');
          } catch (error) {
            console.error('Error sending pending message:', error);
          }
        }
        pendingMessages = [];
        resolve(targetWebSocket);
      });

      proxy.addEventListener("message", async (event) => {
        console.log('Received message from client:', {
          dataPreview: typeof event.data === 'string' ? event.data.slice(0, 200) : 'Binary data',
          dataType: typeof event.data,
          timestamp: new Date().toISOString()
        });

        if (targetWebSocket.readyState === WebSocket.OPEN) {
          try {
            targetWebSocket.send(event.data);
            console.log('Successfully sent message to Gemini');
          } catch (error) {
            console.error('Error sending to Gemini:', error);
          }
        } else {
          console.log('Connection not ready, queueing message');
          pendingMessages.push(event.data);
        }
      });

      targetWebSocket.addEventListener("message", (event) => {
        console.log('Received message from Gemini:', {
          dataPreview: typeof event.data === 'string' ? event.data.slice(0, 200) : 'Binary data',
          dataType: typeof event.data,
          timestamp: new Date().toISOString()
        });

        try {
          if (proxy.readyState === WebSocket.OPEN) {
            proxy.send(event.data);
            console.log('Successfully forwarded message to client');
          }
        } catch (error) {
          console.error('Error forwarding to client:', error);
        }
      });

      targetWebSocket.addEventListener("close", (event) => {
        console.log('Gemini connection closed:', {
          code: event.code,
          reason: event.reason || 'No reason provided',
          wasClean: event.wasClean,
          timestamp: new Date().toISOString(),
          readyState: targetWebSocket.readyState
        });
        if (proxy.readyState === WebSocket.OPEN) {
          proxy.close(event.code, event.reason);
        }
      });

      proxy.addEventListener("close", (event) => {
        console.log('Client connection closed:', {
          code: event.code,
          reason: event.reason || 'No reason provided',
          wasClean: event.wasClean,
          timestamp: new Date().toISOString()
        });
        if (targetWebSocket.readyState === WebSocket.OPEN) {
          targetWebSocket.close(event.code, event.reason);
        }
      });

      targetWebSocket.addEventListener("error", (error) => {
        console.error('Gemini WebSocket error:', {
          error: error.message || 'Unknown error',
          timestamp: new Date().toISOString(),
          readyState: targetWebSocket.readyState
        });
      });
    });

    ctx.waitUntil(connectPromise);

    return new Response(null, {
      status: 101,
      webSocket: client,
    });
  },
};
