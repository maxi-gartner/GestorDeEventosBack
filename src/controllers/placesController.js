import placeSchema from "../models/placeSchema.js";

const placesController = {
  async getPlaces(req, res) {
    try {
      const places = await placeSchema.find();
      res.status(200).json(places);
    } catch (error) {
      console.log(error);
    }
  },
  async getOnePlace(req, res) {
    try {
      const place = await placeSchema.findById(req.params.id);
      res.status(200).json(place);
    } catch (error) {
      console.log(error);
    }
  },
  async createPlace(req, res) {
    try {
      const place = await placeSchema.create(req.body);
      res.status(200).json(place);
    } catch (error) {
      console.log(error);
    }
  },
};

export default placesController;
