import eventSchema from "../models/eventSchema.js";
import userSchema from "../models/userSchema.js";

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
      return { success: false, error: error.message };
    }
  },

  async getEvents() {
    try {
      const events = await eventSchema.find();
      return { success: true, data: events };
    } catch (error) {
      return { success: false, error: error };
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
      return { success: false, error: error };
    }
  },

  async deleteEvent(id) {
    try {
      const event = await eventSchema.findByIdAndDelete(id);
      return { success: true, data: event };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async updateEvent(id, data) {
    try {
      const event = await eventSchema.findByIdAndUpdate(id, data, {
        new: true,
      });
      return { success: true, data: event };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async searchaEventById(id) {
    return await eventSchema.findById(id);
  },

  async validateEventRegistration(event, user) {
    if (!event) {
      return { success: false, error: "Event not found" };
    }
    if (!user) {
      return { success: false, error: "User not found" };
    }

    if (!Array.isArray(event.attendees)) {
      return { success: false, error: "Event attendees is not an array" };
    }

    if (user.age < event.minimumAge) {
      return { success: false, error: "User is too young" };
    }

    if (event.attendees.includes(user._id)) {
      return { success: false, error: "User already registered" };
    }

    if (event.attendees.length >= event.capacity) {
      return { success: false, error: "Event is full" };
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
        return { success: false, error: "Event not found" };
      }

      const userUpdate = await userSchema.findByIdAndUpdate(
        userId,
        { $push: { events: eventId } },
        { new: true }
      );
      if (!userUpdate) {
        return { success: false, error: "User not found" };
      }

      return {
        success: true,
        data: {
          event: eventUpdate,
          user: userUpdate,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
};

export default eventService;
