class ChatController {
  hello(req, res) {
    res.send("hello world");
  }
}

module.exports = new ChatController();
