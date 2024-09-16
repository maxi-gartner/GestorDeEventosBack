import placeService from "../services/placeService.js";
import responses from "./responses.js";

const placesController = {
  async createPlace(req, res) {
    const result = await placeService.createPlace(req.body);
    if (!result.success) {
      return responses.error(res, result.error, "Place not created");
    }
    return responses.success(res, result.data, "Place created");
  },

  async getPlaces(req, res) {
    const result = await placeService.getPlaces();
    if (!result.success) {
      return responses.error(res, result.error, "Places not retrieved");
    }
    return responses.success(res, result.data, "Places retrieved");
  },

  async getOnePlace(req, res) {
    const result = await placeService.getOnePlace(req.params.id);
    if (!result.success) {
      return responses.error(res, result.error, "Place not found");
    }
    return responses.success(res, result.data, "Place retrieved");
  },

  async deletePlace(req, res) {
    const result = await placeService.deletePlace(req.params.id);
    if (!result.success) {
      return responses.error(res, result.error, "Place not deleted");
    }
    return responses.success(res, result.data, "Place deleted");
  },

  async updatePlace(req, res) {
    const result = await placeService.updatePlace(req.params.id, req.body);
    if (!result.success) {
      return responses.error(res, result.error, "Place not updated");
    }
    return responses.success(res, result.data, "Place updated");
  },
};

export default placesController;
