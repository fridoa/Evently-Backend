import { Response } from "express";
import { IReqUser } from "../utils/interfaces";
import uploader from "../utils/uploader";

export default {
  async single(req: IReqUser, res: Response) {
    if (!req.file) {
      return res.status(400).json({
        message: "No file uploaded",
        data: null,
      });
    }

    try {
      const result = await uploader.uploadSingle(req.file as Express.Multer.File);
      res.status(200).json({
        message: "File uploaded successfully",
        data: result,
      });
    } catch {
      res.status(500).json({
        message: "File upload failed",
        data: null,
      });
    }
  },
  async multiple(req: IReqUser, res: Response) {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        message: "No files uploaded",
        data: null,
      });
    }

    try {
      const result = await uploader.uploadMultiple(req.files as Express.Multer.File[]);
      res.status(200).json({
        message: "Files uploaded successfully",
        data: result,
      });
    } catch {
      res.status(500).json({
        message: "Files upload failed",
        data: null,
      });
    }
  },
  async remove(req: IReqUser, res: Response) {
    const { publicId } = req.body as { publicId: string };
    try {
      await uploader.remove(publicId);
      res.status(200).json({
        message: "File removed successfully",
        data: null,
      });
    } catch {
      res.status(500).json({
        message: "File removal failed",
        data: null,
      });
    }
  },
};
