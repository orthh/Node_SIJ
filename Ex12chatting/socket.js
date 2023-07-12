const socketIO = require("socket.io");

// express server
module.exports = (server) => {
  // socketIO 객체
  const io = socketIO(server, { path: "/socket.io" });

  // 라우팅(-> 네임스페이스 : 경로)
  // 채팅 -> /chat
  // 실시간 알림 -> /alarm

  const chat = io.of("/chat"); // 채팅 관련 처리 네임스페이스

  chat.on("connection", (socket) => {
    console.log("chat 네임스페이스 접속 성공");
    // room 설정 -> 방이름(roomid) -> 클라이언트 요청경로(request)
    // console.log(socket.request);
    const ref = socket.request.headers.referer;
    const roomId = ref.split("/")[ref.split("/").length - 1];
    console.log(roomId);

    socket.join(roomId);

    socket.on("disconnect", () => {
      console.log("chat 네임스페이스에서 접속 해제");
    });

    socket.on("chat", (data) => {
      // data: 채팅관련데이터
    });
  });
};
