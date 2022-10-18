const fetchPets = (setPets, status) => {
  const fetchPets = () => {
    const arr = [];
    for (let i = 60; i <= 90; i++) {
      arr.push(
        fetch(`https://petstore.swagger.io/v2/pet/${i}`).then((res) =>
          res.json()
        )
      );
    }
    return arr;
  };
  if (status === "all") {
    Promise.all(fetchPets())
      .then((res) => {
        const results = res.filter(
          (pet) =>
            (pet.hasOwnProperty("id") &&
              pet.status !== "" &&
              pet.status === "available") ||
            pet.status === "sold" ||
            pet.status === "pending"
        );
        setPets(results);
      })
      .catch((error) => console.log(error));
  } else if (status === "available") {
    Promise.all(fetchPets())
      .then((res) => {
        const results = res.filter(
          (pet) =>
            pet.hasOwnProperty("id") &&
            pet.status !== "" &&
            pet.status === "available"
        );
        setPets(results);
      })
      .catch((error) => console.log(error));
  } else if (status === "pending") {
    Promise.all(fetchPets())
      .then((res) => {
        const results = res.filter(
          (pet) =>
            pet.hasOwnProperty("id") &&
            pet.status !== "" &&
            pet.status === "pending"
        );
        setPets(results);
      })
      .catch((error) => console.log(error));
  } else {
    Promise.all(fetchPets())
      .then((res) => {
        const results = res.filter(
          (pet) =>
            pet.hasOwnProperty("id") &&
            pet.status !== "" &&
            pet.status === "sold"
        );
        setPets(results);
      })
      .catch((error) => console.log(error));
  }
};

export default fetchPets;
