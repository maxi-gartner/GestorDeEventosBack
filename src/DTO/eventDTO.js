function eventDTO(event) {
  return {
    data: {
      id: event._id,
      place: event.place,
      date: event.date,
      name: event.name,
      photo: event.photo || null,
      description: event.description,
      attendees: event.attendees || [],
      minimumAge: event.minimumAge,
      organizer: event.organizer,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
      rating: event.rating,
      comments: event.comments,
    },
  };
}

export default eventDTO;
