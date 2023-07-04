const http = require("http");
const fs = require("fs").promises;
const url = require("url");

const server = http.createServer(async (req, res) => {
  // url 다루기!
  let reqUrl = req.url;
  let pathname = url.parse(reqUrl, true).pathname;

  if (pathname === "/api/home") {
    const f = await fs.readFile("./Ex04.html");
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.write(f);
    res.end();
  } else if (pathname === "/api/Ex04Operation") {
    let queryData = url.parse(reqUrl, true).query;
    let { num1, ope, num2 } = queryData;
    num1 = Number(num1);
    num2 = Number(num2);
    let result = 0;
    if (ope === "+") {
      result = num1 + num2;
    } else if (ope === "-") {
      result = num1 - num2;
    } else if (ope === "*") {
      result = num1 * num2;
    } else {
      result = num1 / num2;
    }
    let html = `
      <html>
      <body>
        <h2>${num1} ${ope} ${num2} = ${result}</h2>
      </body>
      </html>
    `;
    res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
    res.write(html);
    res.end();
  }
});

server.listen(8888);
server.on("listening", () => {
  console.log("8888번 포트에서 서버 연결 기다리는중 ...");
});
