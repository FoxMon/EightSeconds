const ApiError = require("../utils/ApiError");
const { dataService } = require("../services");

module.exports = {
  // 데이터 불러오기
  async loadData(req, res, next) {
    const { dataName } = req.params;
    try {
      const data = await dataService.readData(dataName);

      res.status(200).json({
        success: true,
        status: 200,
        message: "data load success.",
        datas: data,
      });
    } catch (err) {
      next(err);
    }
  }
};
