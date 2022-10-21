const multer = require('multer');
const path = require('path');
const AWS = require("aws-sdk");
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
dotenv.config();
 
AWS.config.update({
   accessKeyId: process.env.accessKeyId,
   secretAccessKey: process.env.secretAccessKey,
   region: 'ap-northeast-2',
});

const upload = multer({
   storage: multerS3({
      s3: new AWS.S3(),
      bucket: 'elice-8seconds',
      acl: "public-read-write",
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key(req, file, cb) {
         cb(null, `${Date.now()}_${path.basename(file.originalname)}`) // original 폴더안에 파일을 저장
      },
   }),
   limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = upload;