export const eventsController = {
  getEvents: (req, res) => {
    res.status(200).send("Events");
  },
  getOneEvent: (req, res) => {
    res.status(200).send("Event");
  },
  createEvent: (req, res) => {
    res.status(200).send("Created");
  },
  updateEvent: (req, res) => {
    res.status(200).send("Updated");
  },
  deleteEvent: (req, res) => {
    res.status(200).send("Deleted");
  },
};
export default eventsController;
