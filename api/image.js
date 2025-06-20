const { imageSizeFromFile } = require("image-size/fromFile");
const config = require("../etc/config");
const axios = require("axios");

const { readFile } = require("node:fs/promises");
const { unlink } = require("node:fs/promises");
const {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} = require("@aws-sdk/client-s3");

const image = {
  post: async function (dto) {
    const file = dto.file;
    var s3Image = "";
    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      },
    });
    try {
      const dimensions = await imageSizeFromFile("./uploads/" + file.filename);
      if (dimensions.width > 60000 || dimensions.height > 60000) {
        return {
          status: 400,
          payload: { error: "image dimensions too large" },
        };
      } else {
        const command = new PutObjectCommand({
          Bucket: config.AWS_S3_BUCKET,
          Key: file.originalname,
          Body: await readFile("./uploads/" + file.filename),
        });
        try {
          const response = await client.send(command);
          s3Image = `https://gmep-meshy-api-images-2025-06-10.s3.us-east-1.amazonaws.com/${file.filename}`;
          await unlink("./uploads/" + file.filename);
        } catch (err) {
          if (
            err instanceof S3ServiceException &&
            err.name === "EntityTooLarge"
          ) {
            console.error("object too large (> 5GB)");
          } else {
            console.error(err);
          }
        }
      }
    } catch (err) {
      console.error(err);
      return {
        status: 400,
        payload: { error: "invalid image type" },
      };
    }

    var taskId = "";
    const headers = { Authorization: `Bearer ${config.API_KEY}` };
    const payload = {
      image_url: s3Image,
      enable_pbr: true,
      should_remesh: true,
      should_texture: true,
    };

    try {
      const response = await axios.post(
        "https://api.meshy.ai/openapi/v1/image-to-3d",
        payload,
        { headers }
      );
      taskId = response.data.result;
    } catch (error) {}

    return { status: 201, payload: { taskId: taskId } };
  },
};

module.exports = image;
