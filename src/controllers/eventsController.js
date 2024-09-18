import eventService from "../services/eventService.js";
import authService from "../services/authService.js";
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
    try {
      const user = await authService.searchUserById(req.params.userId);
      const event = await eventService.searchaEventById(req.params.eventId);

      if (!user || !event) {
        return responses.error(res, "User or event not found");
      }

      const validation = await eventService.validateEventRegistration(
        event,
        user
      );

      if (!validation.success) {
        return responses.error(res, validation.error);
      }

      const registration = await eventService.registerToEvent(
        req.params.userId,
        req.params.eventId
      );

      if (!registration.success) {
        return responses.error(
          res,
          registration.error,
          "User not registered for event"
        );
      }

      return responses.success(
        res,
        registration.data,
        "User successfully registered for event"
      );
    } catch (error) {
      return responses.error(res, error.message, "Error registering to event");
    }
  },
};

export default eventsController;
