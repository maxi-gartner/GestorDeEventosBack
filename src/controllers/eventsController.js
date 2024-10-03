import eventService from "../services/eventService.js";
import authService from "../services/authService.js";
import CustomErrors from "../utils/customError.js";
import httResponse from "../utils/httResponse.js";
import catched from "../utils/catched.js";
import eventDTO from "../DTO/eventDTO.js";
import eventSchema from "../models/eventSchema.js";

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
    try {
      // Buscar el usuario
      const user = await authService.searchUserById(req.user._id);
      if (!user) {
        throw new CustomErrors("User not found", 404);
      }

      // Buscar el evento
      const event = await eventService.searchaEventById(req.params.eventId);
      if (!event) {
        throw new CustomErrors("Event not found", 404);
      }

      // Validar el registro en el evento
      const validation = await eventService.validateEventRegistration(
        event,
        user
      );
      if (!validation.success) {
        throw new CustomErrors(validation.error, 400);
      }

      // Registrar al usuario en el evento
      const registration = await eventService.registerToEvent(
        req.user._id,
        req.params.eventId
      );
      if (!registration.success) {
        throw new CustomErrors(registration.error, 400);
      }

      // Preparar la respuesta
      const responseFiltered = eventDTO(registration.data.event);
      httResponse(res, responseFiltered, "Event registered", 200);
    } catch (error) {
      throw new CustomErrors(error.message, 400);
    }
  },

  async voteEvent(req, res) {
    try {
      const user = await authService.searchUserById(req.user._id);
      const event = await eventService.searchaEventById(req.params.eventId);

      if (!user || !event)
        throw new CustomErrors("User or event not found", 400);

      const userRegistered = event.attendees.includes(user._id);
      if (!userRegistered) throw new CustomErrors("User not registered", 400);
      const userVoted = event.rating.voters.some(
        //some revisa cada uno de los objetos del array
        (voter) => voter.userId.equals(user._id) //compara los _id
      );
      if (userVoted) throw new CustomErrors("User already voted", 400);

      const votes = await eventService.averageRating(
        event.rating.voters,
        req.body.vote
      );

      const newVote = {
        totalRatings: votes,
        voters: [{ userId: user._id, vote: req.body.vote }],
      };

      const vote = await eventService.voteEvent(req.params.eventId, newVote);

      if (!vote) throw new CustomErrors("Vote not created", 400);

      const responseFiltered = eventDTO(vote.data);

      httResponse(res, responseFiltered, "Event voted", 200);
    } catch (error) {
      throw new CustomErrors(error.message, 400);
    }
  },

  async commentEvent(req, res) {
    try {
      const user = await authService.searchUserById(req.user._id);
      const event = await eventService.searchaEventById(req.params.eventId);

      if (!user || !event)
        throw new CustomErrors("User or event not found", 400);

      const userRegistered = event.attendees.includes(user._id);
      if (!userRegistered) throw new CustomErrors("User not registered", 400);

      const newComment = {
        userId: user._id,
        comment: req.body.comment,
      };
      const comment = await eventService.comentEvent(newComment, event._id);

      const responseFiltered = eventDTO(comment.data);

      httResponse(res, responseFiltered, "Event commented", 200);
    } catch {
      throw new CustomErrors("User not commented", 400);
    }
  },
};

export default {
  createEvent: catched(eventsController.createEvent),
  getEvents: catched(eventsController.getEvents),
  getOneEvent: catched(eventsController.getOneEvent),
  deleteEvent: catched(eventsController.deleteEvent),
  updateEvent: catched(eventsController.updateEvent),
  registerToEvent: catched(eventsController.registerToEvent),
  voteEvent: catched(eventsController.voteEvent),
  commentEvent: catched(eventsController.commentEvent),
};
