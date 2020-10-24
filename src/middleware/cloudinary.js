const cloudinary = require("cloudinary").v2;

module.exports = (req, res, next) => {
  console.log(req.files);
  if (req.files === null) return res.status(400).send("upload farm product");

  //cloudinary config
  cloudinary.config({
    cloud_name: "dlecos9op",
    api_key: 983418221254412,
    api_secret: "8FVZTP4Lzz1apRqj9KpUVLFsHYM",
  });

  //getting the file from express uploader
  const file = req.files.file;

  //cloudinary image props
  const properties = {
    public_id: req.body.publicId,
    quality: "90",
    width: 250,
    crop: "scale",
  };

  //starting uploads
  cloudinary.uploader.upload(file.tempFilePath, properties, (err, result) => {
    if (!err) {
      req.imageData = {
        url: result.url,
        publicId: result.public_id,
      };
      next();
    } else {
      console.log(err);
      throw new BadRequestError("error upload uploading your file");
    }
  });
};
