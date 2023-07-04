const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const qs = require("querystring");

const server = http.createServer(async (req, res) => {
  // url 다루기!
  let reqUrl = req.url;
  let pathname = url.parse(reqUrl, true).pathname;

  console.log(req.method);

  if (req.method === "GET") {
    if (pathname === "/api/form") {
      const f = await fs.readFile("./Ex03getpost.html");
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });
      res.write(f);
      res.end();
    } else if (pathname === "/api/login") {
      let queryData = url.parse(reqUrl, true).query;
      res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });

      let html = `
      <html>
        <body>
          <h3>${queryData.id}</h3>
          <h3>${queryData.pw}</h3>
        </body>
      </html>
    `;
      res.write(html);
      res.end();
    }
  } else if (req.method === "POST") {
    if (pathname === "/api/login") {
      let body = "";
      // data 이벤트(data가 들어오는 이벤트)가 발생하면 함수 호출
      // 들어오는 데이터들을 하나로 묶어주는 작업
      req.on("data", (data) => {
        body += data;
      });

      // data 가 이제 더이상 들어오지 않을때 발생!
      req.on("end", () => {
        let { id, pw } = qs.parse(body);

        res.writeHead(200, { "Content-Type": "text/html; charset=UTF-8" });

        let html = `
          <html>
            <body>
              <h3>${id}</h3>
              <h3>${pw}</h3>
            </body>
          </html>
        `;
        res.write(html);
        res.end();
      });
    }
  }
});

server.listen(8888);
server.on("listening", () => {
  console.log("8888번 포트에서 서버 연결 기다리는중 ...");
});
