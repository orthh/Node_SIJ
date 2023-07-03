const http = require("http");
const fs = require("fs").promises;

const server = http.createServer(async (req, res) => {
  // async + await => 비동기 방식 처리
  const file = await fs.readFile("./Ex03.html");

  res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
  res.write(file);
  res.end();
});

server.listen(8888).on("listening", () => {
  console.log("8888번 서버에서 연결 기다리는중 ...");
});
