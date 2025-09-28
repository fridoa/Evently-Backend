import mongoose, { ObjectId } from "mongoose";
import { TEvent } from "../validators/event.schema";
import generateUniqueSlug from "../utils/slug";

export interface IEvent extends Omit<TEvent, "category" | "createdBy"> {
  category: ObjectId;
  createdBy: ObjectId;
}

const { Schema } = mongoose;

const EventSchema = new Schema<IEvent>(
  {
    name: {
      type: String,
      required: true,
    },
    startDate: {
      type: String,
      required: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    banner: {
      type: String,
      required: true,
    },
    isFeatured: {
      type: Boolean,
      required: true,
    },
    isOnline: {
      type: Boolean,
      required: true,
    },
    isPublish: {
      type: Boolean,
      default: false,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    slug: {
      type: String,
      unique: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    location: {
      region: {
        type: Number,
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        default: [0, 0],
      },
    },
  },
  {
    timestamps: true,
  }
);

EventSchema.index({ name: "text", description: "text" });

EventSchema.pre("save", async function (next) {
  if (this.isModified("name") || this.isNew) {
    this.slug = await generateUniqueSlug(this.name, this.constructor as mongoose.Model<any>);
  }
  next();
});

const EventModel = mongoose.model("Event", EventSchema);

export default EventModel;
