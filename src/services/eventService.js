import eventSchema from "../models/eventSchema.js";
import userSchema from "../models/userSchema.js";
import CustomErrors from "../utils/customError.js";

const eventService = {
  async createEvent(data) {
    const {
      place,
      date,
      name,
      photo,
      description,
      attendees = [],
      minimumAge,
      organizer,
    } = data;

    try {
      const event = await eventSchema.create({
        place,
        date,
        name,
        photo: photo || null,
        description,
        attendees,
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
      const events = await eventSchema.find();
      return { success: true, data: events };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to retrieve events", 400);
    }
  },

  async getOneEvent(id) {
    try {
      const event = await eventSchema
        .findById(id)
        .populate("organizer")
        .populate("attendees")
        .populate("place");
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

  async registerToEvent(userId, eventId) {
    try {
      const eventUpdate = await eventSchema.findByIdAndUpdate(
        eventId,
        { $push: { attendees: userId } },
        { new: true }
      );
      if (!eventUpdate) {
        throw new CustomErrors("Event not found", 404);
      }

      const userUpdate = await userSchema.findByIdAndUpdate(
        userId,
        { $push: { events: eventId } },
        { new: true }
      );
      if (!userUpdate) {
        throw new CustomErrors("User not found", 404);
      }

      return {
        success: true,
        data: {
          event: eventUpdate.populated("attendees"),
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
};

export default eventService;
