import eventService from "../services/eventService.js";
import responses from "./responses.js";

const eventsController = {
  async createEvent(req, res) {
    try {
      const result = await eventService.createEvent(req.body);

      if (!result.success) {
        return responses.error(res, result.error, "Event not created");
      }

      return responses.success(res, result.data, "Event created");
    } catch (error) {
      return responses.error(res, error.message, "Error creating event");
    }
  },

  async getEvents(req, res) {
    const result = await eventService.getEvents();
    if (!result.success) {
      return responses.error(res, result.error, "Events not retrieved");
    }
    return responses.success(res, result.data, "Events retrieved");
  },

  async getOneEvent(req, res) {
    const result = await eventService.getOneEvent(req.params.id);
    if (!result.success) {
      return responses.error(res, result.error, "Event not found");
    }
    return responses.success(res, result.data, "Event retrieved");
  },

  async deleteEvent(req, res) {
    const result = await eventService.deleteEvent(req.params.id);
    if (!result.success) {
      return responses.error(res, result.error, "Event not deleted");
    }
    return responses.success(res, result.data, "Event deleted");
  },

  async updateEvent(req, res) {
    const result = await eventService.updateEvent(req.params.id, req.body);
    if (!result.success) {
      return responses.error(res, result.error, "Event not updated");
    }
    return responses.success(res, result.data, "Event updated");
  },

  async registerToEvent(req, res) {
    const result = await eventService.registerToEvent(
      req.params.userId,
      req.params.eventId
    );
    if (!result.success) {
      return responses.error(
        res,
        result.error,
        "User not registered for event"
      );
    }
    return responses.success(
      res,
      result.data,
      "User successfully registered for event"
    );
  },
};

export default eventsController;
