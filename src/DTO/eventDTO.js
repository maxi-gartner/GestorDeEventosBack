function eventDTO(event) {
  if (!event || !event.place) {
    throw new Error(
      "El objeto evento es indefinido o no contiene la propiedad place"
    );
  }
  //console.log(event);

  return {
    data: {
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
    },
  };
}

export default eventDTO;
