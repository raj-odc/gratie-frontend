import type { NextApiRequest, NextApiResponse } from 'next'
import { PutObjectCommand, S3Client, } from "@aws-sdk/client-s3";
import { randomUUID } from 'crypto';


// upload file as base64
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  let fileID = randomUUID();
  const fileData = Buffer.from(req.body.data, 'base64');

  const accessKeyID = process.env.B2_ACCESS_KEY_ID!;
  const secretKey = process.env.B2_SECRET_KEY!;

  const client = new S3Client({
    region: "eu-central-003", endpoint: "https://s3.eu-central-003.backblazeb2.com",
    credentials: { accessKeyId: accessKeyID, secretAccessKey: secretKey }
  });


  const command = new PutObjectCommand({
    Bucket: "gratie",
    ContentType: req.body.contentType,
    Key: fileID,
    Body: fileData,
  });

  try {
    const response = await client.send(command);
    const url = `https://gratie.s3.eu-central-003.backblazeb2.com/${fileID}`;
    res.status(200).json({ url: url })
  } catch (e) {
    res.status(500).json(e)
  }


}