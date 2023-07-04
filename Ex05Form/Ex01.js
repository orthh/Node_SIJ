const http = require("http");
const fs = require("fs").promises;
const url = require("url");

const server = http.createServer(async (req, res) => {
  // url 다루기!
  let reqUrl = req.url;
  let pathname = url.parse(reqUrl, true).pathname;
  if (pathname === "/form") {
    const f = await fs.readFile("./Ex01.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.write(f);
    res.end();
  } else if (pathname === "/home") {
    let queryData = url.parse(reqUrl, true).query; // 사용자입력값

    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    let html = "<html>";
    html += "<body>";
    html += "<h3>" + queryData.query + "</h3>";
    html += "<h3>" + queryData.data + "</h3>";
    html += "</body>";
    html += "</html>";

    res.write(html);
    res.end();
  }
});

server.listen(8888);
server.on("listening", () => {
  console.log("8888번 포트에서 서버 연결 기다리는중 ...");
});
