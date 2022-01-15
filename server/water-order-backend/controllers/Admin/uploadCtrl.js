var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

const upload = {
  /** 上传临时资源 **/
  setTemp: (req, res, callback) => {
    console.log('接收到上传文件请求');
    var form = new formidable.IncomingForm({
      keepExtensions: true,
      uploadDir: path.join(__dirname, '../../public/images/temp'),
    });

    form.encoding = 'utf-8';

    form.parse(req, function (err, fileds, file) {
      if (err) callback(err);
      console.log('success');
      fs.rename(file.file.filepath, form.uploadDir + `\\${file.file.originalFilename}`, (err) => {
        if (err)
          res.json(200, {
            data: `images/temp/${file.file.newFilename}`,
            success: true,
          });
        else
          res.json(200, {
            data: `images/temp/${file.file.originalFilename}`,
            success: true,
          });
      });
    });
  },

  /** 上传头像 **/
  setAvatar: (req, res, callback) => {
    console.log('接收到上传文件请求');
    var form = new formidable.IncomingForm({
      keepExtensions: true,
      uploadDir: path.join(__dirname, '../../public/images/avatar'),
    });

    form.encoding = 'utf-8';

    form.parse(req, function (err, fileds, file) {
      if (err) callback(err);
      console.log('success');
      fs.rename(file.file.filepath, form.uploadDir + `\\${file.file.originalFilename}`, (err) => {
        if (err)
          res.json(200, {
            data: `images/avatar/${file.file.newFilename}`,
            success: true,
          });
        else
          res.json(200, {
            data: `images/avatar/${file.file.originalFilename}`,
            success: true,
          });
      });
    });
  },
};

module.exports = upload;
