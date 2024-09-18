function userDTO(user) {
  return {
    name: user.name,
    lastname: user.lastname,
    photo: user.photo || null,
    email: user.email,
    age: user.age,
    genre: user.genre,
    events: user.events,
    role: user.role,
  };
}

export default userDTO;
