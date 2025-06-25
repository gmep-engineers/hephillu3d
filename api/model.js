const config = require("../etc/config");

const { readFile } = require("node:fs/promises");
const { unlink } = require("node:fs/promises");
const {
  PutObjectCommand,
  S3Client,
  S3ServiceException,
} = require("@aws-sdk/client-s3");

const model = {
  post: async function (conn, dto) {
    const file = dto.file;
    var s3File = "";
    const client = new S3Client({
      region: "us-east-1",
      credentials: {
        accessKeyId: config.AWS_ACCESS_KEY_ID,
        secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
      },
    });
    try {
      const storedFilename =
        file.filename.slice(0, 6) + "_" + file.originalname;
      const command = new PutObjectCommand({
        Bucket: config.AWS_S3_BUCKET,
        Key: storedFilename,
        Body: await readFile("./uploads/" + file.filename),
      });
      try {
        await client.send(command);
        s3File = `https://gmep-meshy-api-images-2025-06-10.s3.us-east-1.amazonaws.com/${storedFilename}`;
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
    } catch (err) {
      console.error(err);
      return {
        status: 400,
        payload: { error: "invalid image type" },
      };
    }
    return { status: 201, payload: { s3File: s3File } };
  },
};
module.exports = model;
