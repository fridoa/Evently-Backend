import { Response } from "express";
import * as Yup from "yup";

type Pagination = {
  totalPages: number;
  currentPages: number;
  total: number;
};

export default {
  success(res: Response, data: any, message: string) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
    });
  },
  error(res: Response, error: unknown, message: string) {
    if (error instanceof Yup.ValidationError) {
      return res.status(400).json({
        meta: {
          status: 400,
          message,
        },
        data: error.errors,
      });
    }
  },
  unauthorized(res: Response, message: string = "unauthorize") {
    res.status(401).json({
      meta: {
        status: 401,
        message,
      },
      data: null,
    });
  },

  pagination(res: Response, message: string, pagination: Pagination, data: any[]) {
    res.status(200).json({
      meta: {
        status: 200,
        message,
      },
      data,
      pagination,
    });
  },
};
