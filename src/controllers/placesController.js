import placeService from "../services/placeService.js";
import httResponse from "../utils/httResponse.js";
import CustomErrors from "../utils/customError.js";
import catched from "../utils/catched.js";
import placeDTO from "../DTO/placeDTO.js";

const placesController = {
  async createPlace(req, res) {
    const result = await placeService.createPlace(req.body);
    if (!result.success) throw new CustomErrors(result.error, 400);
    const responseFiltered = placeDTO(result.data);
    httResponse(res, responseFiltered, "Place created", 200);
  },

  async getPlaces(req, res) {
    const result = await placeService.getPlaces();
    if (!result.success) throw new CustomErrors(result.error, 400);
    const responseFiltered = result.data.map(placeDTO);
    httResponse(res, responseFiltered, "Places retrieved", 200);
  },

  async getOnePlace(req, res) {
    const result = await placeService.getOnePlace(req.params.id);
    if (!result.success) throw new CustomErrors(result.error, 404);
    const responseFiltered = placeDTO(result.data);
    httResponse(res, responseFiltered, "Place retrieved", 200);
  },

  async deletePlace(req, res) {
    const result = await placeService.deletePlace(req.params.id);
    if (!result.success) throw new CustomErrors(result.error, 404);
    httResponse(res, result, "Place deleted", 200);
  },

  async updatePlace(req, res) {
    const result = await placeService.updatePlace(req.params.id, req.body);
    if (!result.success) throw new CustomErrors(result.error, 400);
    const responseFiltered = placeDTO(result.data);
    httResponse(res, responseFiltered, "Place updated", 200);
  },
};

export default {
  createPlace: catched(placesController.createPlace),
  getPlaces: catched(placesController.getPlaces),
  getOnePlace: catched(placesController.getOnePlace),
  deletePlace: catched(placesController.deletePlace),
  updatePlace: catched(placesController.updatePlace),
};
