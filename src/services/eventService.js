import eventSchema from "../models/eventSchema.js";
import userSchema from "../models/userSchema.js";
import CustomErrors from "../utils/customError.js";
import mongoose from "mongoose";
import authService from "./authService.js";

const eventService = {
  async createEvent(data, organizer) {
    const { place, date, name, description, minimumAge, photo } = data;
    try {
      const event = await eventSchema.create({
        place,
        date,
        name,
        description,
        photo,
        minimumAge,
        organizer,
      });

      return { success: true, data: event };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to create event", 400);
    }
  },

  async getEvents() {
    try {
      const events = await eventSchema.find().populate("place");
      return { success: true, data: events };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to retrieve events", 400);
    }
  },

  async getOneEvent(id) {
    try {
      // Buscar el evento y poblar el campo 'place'
      const event = await eventSchema
        .findById(id)
        .populate("place")
        .populate("organizer");

      if (!event) {
        throw new CustomErrors("Event not found", 404);
      }

      return { success: true, data: event };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to retrieve event", 400);
    }
  },

  async deleteEvent(id) {
    try {
      const event = await eventSchema.findByIdAndDelete(id);
      return { success: true, data: event };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to delete event", 400);
    }
  },

  async updateEvent(id, data) {
    try {
      const event = await eventSchema.findByIdAndUpdate(id, data, {
        new: true,
      });
      return { success: true, data: event };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to update event", 400);
    }
  },

  async searchaEventById(id) {
    return await eventSchema.findById(id);
  },

  async validateEventRegistration(event, user) {
    if (!event) {
      throw new CustomErrors("Event not found", 404);
    }
    if (!user) {
      throw new CustomErrors("User not found", 404);
    }

    if (!Array.isArray(event.attendees)) {
      throw new CustomErrors("Event attendees is not an array", 400);
    }

    if (user.age < event.minimumAge) {
      throw new CustomErrors("User is too young to attend this event", 400);
    }

    if (event.attendees.includes(user._id)) {
      throw new CustomErrors("User is already registered for this event", 400);
    }

    if (event.attendees.length >= event.capacity) {
      throw new CustomErrors("Event is full", 400);
    }

    return { success: true };
  },

  async isRegistered(event, userId) {
    if (!event || !event.attendees) {
      return false;
    }
    const objectIdUser = new mongoose.Types.ObjectId(userId);

    const isUserRegistered = event.attendees.some((attendee) => {
      return attendee.equals(objectIdUser);
    });

    return isUserRegistered;
  },
  async registerToEvent(userId, eventId) {
    try {
      // Buscar el evento y el usuario antes de intentar actualizar
      const event = await eventSchema.findById(eventId);
      const user = await userSchema.findById(userId);

      if (!event) {
        throw new CustomErrors("Event not found", 404);
      }
      if (!user) {
        throw new CustomErrors("User not found", 404);
      }

      // Actualizar el evento y el usuario
      const eventUpdate = await eventSchema.findByIdAndUpdate(
        eventId,
        { $push: { attendees: userId } },
        { new: true }
      );
      const userUpdate = await userSchema.findByIdAndUpdate(
        userId,
        { $push: { events: eventId } },
        { new: true }
      );

      // Verificando que los dos se actualicen correctamente
      if (!eventUpdate) {
        throw new CustomErrors("Failed to update event", 400);
      }
      if (!userUpdate) {
        throw new CustomErrors("Failed to update user", 400);
      }

      return {
        success: true,
        data: {
          event: eventUpdate,
          user: userUpdate,
        },
      };
    } catch (error) {
      throw new CustomErrors(
        error.message || "Failed to register for event",
        400
      );
    }
  },

  async averageRating(voters, vote) {
    try {
      const existingVotes = voters.map((voter) => voter.vote);
      const totalVotes = existingVotes.length + 1;
      const newTotal =
        existingVotes.reduce((acc, vote) => acc + vote, 0) + vote;

      const result = newTotal / totalVotes;
      return result;
    } catch (error) {
      throw new CustomErrors(
        error.message || "Failed to calculate average rating",
        400
      );
    }
  },

  async voteEvent(eventId, vote) {
    try {
      const event = await eventSchema.findByIdAndUpdate(
        eventId,
        {
          $set: { "rating.totalRatings": vote.totalRatings },
          $push: { "rating.voters": vote.voters },
        },
        { new: true }
      );

      return { success: true, data: event };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to vote for event", 400);
    }
  },

  async comentEvent(data, eventId) {
    try {
      const event = await eventSchema.findByIdAndUpdate(
        eventId,
        {
          $push: { comments: { userId: data.userId, comment: data.comment } },
        },
        { new: true }
      );

      return { success: true, data: event };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to add comment", 400);
    }
  },

  async unsubscribe(eventId, user) {
    try {
      await userSchema.updateOne(
        { _id: user._id },
        { $pull: { events: eventId } }
      );
      await eventSchema.updateOne(
        { _id: eventId },
        { $pull: { attendees: user._id } }
      );
      const currentUserState = await authService.getUserByEmail(user.email);
      return currentUserState;
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to unsubscribe", 400);
    }
  },
};

export default eventService;
