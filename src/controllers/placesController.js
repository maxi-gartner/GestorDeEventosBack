export const placesController = {
  getPlaces: (req, res) => {
    res.status(200).send("Places");
  },

  getOnePlace: (req, res) => {
    res.status(200).send("Place");
  },

  createPlace: (req, res) => {},

  updatePlace: (req, res) => {
    res.status(200).send("Updated");
  },

  deletePlace: (req, res) => {
    res.status(200).send("Deleted");
  },
};

export default placesController;
