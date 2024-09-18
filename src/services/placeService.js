import placeSchema from "../models/placeSchema.js";
import CustomErrors from "../utils/customError.js";

const placeService = {
  async createPlace(data) {
    try {
      const place = await placeSchema.create(data);
      return { success: true, data: place };
    } catch (error) {
      throw new CustomErrors("Failed to create place", 400);
    }
  },

  async getPlaces() {
    try {
      const places = await placeSchema.find();
      return { success: true, data: places };
    } catch (error) {
      throw new CustomErrors("Failed to retrieve places", 400);
    }
  },

  async getOnePlace(id) {
    try {
      const place = await placeSchema.findById(id);
      if (!place) throw new CustomErrors("Place not found", 404);
      return { success: true, data: place };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to retrieve place", 404);
    }
  },

  async deletePlace(id) {
    try {
      const place = await placeSchema.findByIdAndDelete(id);
      if (!place) throw new CustomErrors("Place not found", 404);
      return { success: true, data: place };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to delete place", 404);
    }
  },

  async updatePlace(id, data) {
    try {
      const place = await placeSchema.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!place) throw new CustomErrors("Place not found", 404);
      return { success: true, data: place };
    } catch (error) {
      throw new CustomErrors(error.message || "Failed to update place", 400);
    }
  },
};

export default placeService;
