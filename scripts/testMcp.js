import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const serverProcess = spawn('node', [path.join(rootDir, 'mcp-server', 'index.js')], {
  stdio: ['pipe', 'pipe', 'inherit']
});

let messageId = 1;

function sendRpc(method, params = {}) {
  const msg = {
    jsonrpc: '2.0',
    id: messageId++,
    method,
    params
  };
  serverProcess.stdin.write(JSON.stringify(msg) + '\n');
}

let buffer = '';
serverProcess.stdout.on('data', (chunk) => {
  buffer += chunk.toString('utf8');
  const lines = buffer.split('\n');
  buffer = lines.pop(); // keep last unfinished piece

  for (const line of lines) {
    if (!line.trim()) continue;
    try {
      const response = JSON.parse(line);
      handleResponse(response);
    } catch (e) {
      // not JSON or debug log
    }
  }
});

function handleResponse(res) {
  if (res.id === 1) {
    console.log('✔ MCP Server Initialized successfully!');
    sendRpc('tools/list');
  } else if (res.id === 2) {
    console.log(`✔ Tools registered (${res.result.tools.length}):`, res.result.tools.map(t => t.name).join(', '));
    sendRpc('tools/call', { name: 'search_components', arguments: { query: 'aurora' } });
  } else if (res.id === 3) {
    const data = JSON.parse(res.result.content[0].text);
    console.log(`✔ search_components found ${data.totalMatches} match:`, data.components[0].name);
    sendRpc('tools/call', { name: 'suggest_ui_for_project', arguments: { targetDir: 'D:/MY PROJECTS/test-zeura-site' } });
  } else if (res.id === 4) {
    const data = JSON.parse(res.result.content[0].text);
    console.log(`✔ suggest_ui_for_project recommendations (${data.recommendations.length}):`);
    data.recommendations.slice(0, 3).forEach(r => console.log(`   • [${r.section}] ${r.name} (${r.slug})`));
    sendRpc('tools/call', { name: 'list_themes', arguments: {} });
  } else if (res.id === 5) {
    const data = JSON.parse(res.result.content[0].text);
    console.log(`✔ list_themes returned ${data.length} themes!`);
    console.log('\n🎉 ALL MCP TOOLS VERIFIED SUCCESSFULLY!');
    serverProcess.kill();
    process.exit(0);
  }
}

sendRpc('initialize', {
  protocolVersion: '2024-11-05',
  capabilities: {},
  clientInfo: { name: 'test-client', version: '1.0.0' }
});
