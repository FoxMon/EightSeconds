const { chatService } = require("../services");

module.exports = {
  async showChatLog(req, res, next) {
    const { roomId } = req.params;

    try {
      const chatLog = await chatService.getChatLog(roomId);

      res.status(200).json({
        success: true,
        status: 200,
        message: "success loading chat logs",
        datas: chatLog,
      });
    } catch (err) {
      next(err);
    }
  },
};
