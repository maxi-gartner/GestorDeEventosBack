import eventSchema from "../models/eventSchema.js";

const eventsController = {
  async getEvents(req, res) {
    try {
      const event = await eventSchema.find();
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
    }
  },

  async getOneEvent(req, res) {
    try {
      const event = await eventSchema.findById(req.params.id);
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
    }
  },

  async createEvent(req, res) {
    try {
      const {
        place,
        date,
        name,
        photo,
        description,
        attendees,
        minimumAge,
        organizer,
      } = req.body;
      const event = await eventSchema.create({
        place,
        date,
        name,
        photo,
        description,
        attendees,
        minimumAge,
        organizer,
      });
      res.status(200).json(event);
    } catch (error) {
      console.log(error);
    }
  },
};

export default eventsController;
