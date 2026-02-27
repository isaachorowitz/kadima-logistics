#!/usr/bin/env node
import { spawn } from "child_process";

const RESERVED_PORTS = new Set([6665, 6666, 6667, 6668, 6669, 6697]);

function randomPort() {
  let port;
  do {
    port = 10000 + Math.floor(Math.random() * 55000);
  } while (RESERVED_PORTS.has(port));
  return port;
}

const port = randomPort();
console.log(`Starting dev server on http://localhost:${port}`);
spawn("npx", ["next", "dev", "-p", String(port)], {
  stdio: "inherit",
  shell: true,
});
