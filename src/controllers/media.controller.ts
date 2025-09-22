import { Response } from "express";
import { IReqUser } from "../utils/interfaces";
import uploader from "../utils/uploader";
import response from "../utils/response";

export default {
  async single(req: IReqUser, res: Response) {
    if (!req.file) {
      return response.error(res, null, "File not found");
    }

    try {
      const result = await uploader.uploadSingle(req.file as Express.Multer.File);
      response.success(res, result, "File uploaded successfully");
    } catch {
      response.error(res, null, "File upload failed");
    }
  },
  async multiple(req: IReqUser, res: Response) {
    if (!req.files || req.files.length === 0) {
      return response.error(res, null, "Files not found");
    }

    try {
      const result = await uploader.uploadMultiple(req.files as Express.Multer.File[]);
      response.success(res, result, "Files uploaded successfully");
    } catch {
      response.error(res, null, "Files upload failed");
    }
  },
  async remove(req: IReqUser, res: Response) {
    const { publicId } = req.body as { publicId: string };
    try {
      const result = await uploader.remove(publicId);
      response.success(res, result, "File removed successfully");
    } catch {
      response.error(res, null, "File remove failed");
    }
  },
};
