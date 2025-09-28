import { Response } from "express";
import { IPaginationQuery, IReqUser } from "../utils/interfaces";
import response from "../utils/response";
import { eventSchema, TEvent } from "../validators/event.schema";
import EventModel from "../models/event.model";
import { FilterQuery } from "mongoose";

export default {
  async create(req: IReqUser, res: Response) {
    try {
      const payload = { ...req.body, createdBy: req.user?.id } as TEvent;
      await eventSchema.validate(payload);
      const result = new EventModel(payload);
      await result.save();
      response.success(res, result, "Event created successfully");
    } catch (error) {
      response.error(res, error, "failed create event");
    }
  },
  async findAll(req: IReqUser, res: Response) {
    try {
      const { page = 1, limit = 10, search } = req.query as unknown as IPaginationQuery;
      const query: FilterQuery<TEvent> = {};
      if (search) {
        Object.assign(query, {
          $text: {
            $search: search,
          },
        });
      }

      const [count, result] = await Promise.all([
        EventModel.countDocuments(query),
        EventModel.find(query)
          .limit(limit)
          .skip((page - 1) * limit)
          .sort({ createdAt: -1 })
          .exec(),
      ]);
      response.pagination(res, "success find all events", { total: count, totalPages: Math.ceil(count / limit), currentPage: page }, result);
    } catch (error) {
      response.error(res, error, "failed find all events");
    }
  },
  async findOne(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await EventModel.findById(id);
      response.success(res, result, "success find one event");
    } catch (error) {
      response.error(res, error, "failed find one event");
    }
  },
  async update(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await EventModel.findByIdAndUpdate(id, req.body, { new: true });
      response.success(res, result, "success update event");
    } catch (error) {
      response.error(res, error, "failed update event");
    }
  },
  async remove(req: IReqUser, res: Response) {
    try {
      const { id } = req.params;
      const result = await EventModel.findByIdAndDelete(id, { new: true });
      response.success(res, result, "success remove event");
    } catch (error) {
      response.error(res, error, "failed remove event");
    }
  },
  async findBySlug(req: IReqUser, res: Response) {
    try {
      const { slug } = req.params;
      const result = await EventModel.findOne({ slug });
      response.success(res, result, "success find one by slug event");
    } catch (error) {
      response.error(res, error, "failed find one by slug event");
    }
  },
};
