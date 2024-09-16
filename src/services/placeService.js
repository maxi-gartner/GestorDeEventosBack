import placeSchema from "../models/placeSchema.js";

const placeService = {
  async createPlace(data) {
    try {
      const place = await placeSchema.create(data);
      return { success: true, data: place };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async getPlaces() {
    try {
      const places = await placeSchema.find();
      return { success: true, data: places };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async getOnePlace(id) {
    try {
      const place = await placeSchema.findById(id);
      return { success: true, data: place };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async deletePlace(id) {
    try {
      const place = await placeSchema.findByIdAndDelete(id);
      return { success: true, data: place };
    } catch (error) {
      return { success: false, error: error };
    }
  },

  async updatePlace(id, data) {
    try {
      const place = await placeSchema.findByIdAndUpdate(id, data, {
        new: true,
      });
      return { success: true, data: place };
    } catch (error) {
      return { success: false, error: error };
    }
  },
};

export default placeService;
