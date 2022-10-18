const deletePet = async (
  id,
  setRender,
  successModal,
  setMessage,
  setDisabled
) => {
  await fetch(`https://petstore.swagger.io/v2/pet/${id}`, {
    method: "delete",
    headers: {
      accept: " application/json",
      api_key: "special-key",
    },
  })
    .then((res) => {
      setRender((prev) => !prev);
      successModal(true);
      setTimeout(() => {
        successModal(false);
      }, 1000);
      setDisabled(0);
      if (res.status === 200) {
        setMessage("Success");
      } else {
        setMessage("Error");
      }
    })
    .catch((error) => setMessage("Error"));
};

export default deletePet;
