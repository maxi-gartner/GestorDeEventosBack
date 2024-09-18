import eventService from "../services/eventService.js";
import authService from "../services/authService.js";
import CustomErrors from "../utils/customError.js";
import httResponse from "../utils/httResponse.js";
import catched from "../utils/catched.js";
import eventDTO from "../DTO/eventDTO.js";

const eventsController = {
  async createEvent(req, res) {
    const result = await eventService.createEvent(req.body);
    if (!result.success) throw new CustomErrors(result.error, 400);
    const responseFiltered = eventDTO(result.data);
    httResponse(res, responseFiltered, "Event created", 200);
  },

  async getEvents(req, res) {
    const result = await eventService.getEvents();
    if (!result.success) throw new CustomErrors(result.error, 400);
    const responseFiltered = result.data.map(eventDTO);
    httResponse(res, responseFiltered, "Events retrieved", 200);
  },

  async getOneEvent(req, res) {
    const result = await eventService.getOneEvent(req.params.id);
    if (!result.success) throw new CustomErrors(result.error, 400);
    const responseFiltered = eventDTO(result.data);
    httResponse(res, responseFiltered, "Event retrieved", 200);
  },

  async deleteEvent(req, res) {
    const result = await eventService.deleteEvent(req.params.id);
    if (!result.success) throw new CustomErrors(result.error, 400);
    const responseFiltered = eventDTO(result.data);
    httResponse(res, responseFiltered, "Event deleted", 200);
  },

  async updateEvent(req, res) {
    const result = await eventService.updateEvent(req.params.id, req.body);
    if (!result.success) throw new CustomErrors(result.error, 400);
    const responseFiltered = eventDTO(result.data);
    httResponse(res, responseFiltered, "Event updated", 200);
  },

  async registerToEvent(req, res) {
    const user = await authService.searchUserById(req.params.userId);
    const event = await eventService.searchaEventById(req.params.eventId);

    if (!user || !event) throw new CustomErrors("User or event not found", 400);
    const validation = await eventService.validateEventRegistration(
      event,
      user
    );

    if (!validation.success) throw new CustomErrors(validation.error, 400);
    const registration = await eventService.registerToEvent(
      req.params.userId,
      req.params.eventId
    );

    if (!registration.success) throw new CustomErrors(registration.error, 400);

    const responseFiltered = eventDTO(registration.data.event);
    httResponse(res, responseFiltered, "Event registered", 200);
  },
};

export default {
  createEvent: catched(eventsController.createEvent),
  getEvents: catched(eventsController.getEvents),
  getOneEvent: catched(eventsController.getOneEvent),
  deleteEvent: catched(eventsController.deleteEvent),
  updateEvent: catched(eventsController.updateEvent),
  registerToEvent: catched(eventsController.registerToEvent),
};
