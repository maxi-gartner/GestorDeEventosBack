import placeSchema from "../models/placeSchema.js";
import responses from "./responses.js";

const placesController = {
  async createPlace(req, res) {
    try {
      const { name, address, photo, date, ocupancy } = req.body;
      const place = await placeSchema.create({
        name,
        address,
        photo,
        date,
        ocupancy,
      });
      return responses.success(res, place, "Place created");
    } catch (error) {
      return responses.error(res, error, "Place not created");
    }
  },

  async getPlaces(req, res) {
    try {
      const places = await placeSchema.find();
      return responses.success(res, places, "Places retrieved");
    } catch (error) {
      return responses.error(res, error, "user not retrieved");
    }
  },

  async getOnePlace(req, res) {
    try {
      const place = await placeSchema.findById(req.params.id);
      return responses.success(res, place, "Place retrieved");
    } catch (error) {
      return responses.error(res, error, "Place not retrieved");
    }
  },

  async deletePlace(req, res) {
    try {
      const place = await placeSchema.findByIdAndDelete(req.params.id);
      if (!place) {
        return responses.error(res, null, "Place not found");
      }
      return responses.success(res, place, "Place deleted");
    } catch (error) {
      return responses.error(res, error, "Place not deleted");
    }
  },
};

export default placesController;
