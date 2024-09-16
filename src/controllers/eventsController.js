import eventSchema from "../models/eventSchema.js";
import responses from "./responses.js";

const eventsController = {
  async getEvents(req, res) {
    try {
      const event = await eventSchema.find();
      return responses.success(res, event, "Events retrieved");
    } catch (error) {
      return responses.error(res, error, "Events not retrieved");
    }
  },

  async getOneEvent(req, res) {
    try {
      const event = await eventSchema.findById(req.params.id);
      if (!event) {
        return responses.error(res, null, "Event not found");
      }
      return responses.success(res, event, "Event retrieved");
    } catch (error) {
      return responses.error(res, error, "Event not retrieved");
    }
  },

  async createEvent(req, res) {
    try {
      const event = await eventSchema.create(req.body);
      responses.success(res, event, "Event created");
    } catch (error) {
      responses.error(res, error, "Event not created");
    }
  },

  async deleteEvent(req, res) {
    try {
      const event = await eventSchema.findByIdAndDelete(req.params.id);
      if (!event) {
        return responses.error(res, null, "Event not found");
      }
      return responses.success(res, event, "Event deleted");
    } catch (error) {
      return responses.error(res, error, "Event not deleted");
    }
  },
};

export default eventsController;
