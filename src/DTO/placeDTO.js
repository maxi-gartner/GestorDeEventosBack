function placeDTO(place) {
  return {
    data: {
      id: place._id,
      name: place.name,
      address: place.address,
      photo: place.photo || null,
      date: place.date,
      ocupancy: place.ocupancy,
      createdAt: place.createdAt,
      updatedAt: place.updatedAt,
    },
  };
}

export default placeDTO;
