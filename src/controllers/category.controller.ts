import { Response } from "express";
import CategoryModel from "../models/category.model";
import { categorySchema, TCategory } from "../validators/category.schema";
import response from "../utils/response";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      await categorySchema.validate(req.body);
      const result = await CategoryModel.create(req.body);
      response.success(res, result, "success create category");
    } catch (error) {
      response.error(res, error, "failed create category");
    }
  },
  async findAll(req: IReqUser, res: Response) {
    const { page = 1, limit = 10, search } = req.query as unknown as IPaginationQuery;

    try {
      const query = {};
      if (search) {
        Object.assign(query, {
          $or: [
            {
              name: { $regex: search, $options: "i" },
            },
            {
              description: { $regex: search, $options: "i" },
            },
          ],
        });
      }
      const count = await CategoryModel.countDocuments(query);
      const result = await CategoryModel.find(query)
        .limit(limit)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 })
        .exec();
      response.pagination(res, "success find all category", { total: count, totalPages: Math.ceil(count / limit), currentPages: page }, result);
    } catch (error) {
      response.error(res, error, "failed find all category");
    }
  },
  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoryModel.findById(id);
      response.success(res, result, "success find one category");
    } catch (error) {
      response.error(res, error, "failed find one category");
    }
  },
  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoryModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      response.success(res, result, "success update category");
    } catch (error) {
      response.error(res, error, "failed update category");
    }
  },
  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await CategoryModel.findByIdAndDelete(id);
      response.success(res, result, "success remove category");
    } catch (error) {
      response.error(res, error, "failed remove category");
    }
  },
};
