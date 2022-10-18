import { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, FlatList } from "react-native";
import PetRow from "../components/PetRow";
import fetchPets from "../utils/fetchPets";
import AddButton from "../components/AddButton";
import { useIsFocused } from "@react-navigation/native";

const PetsList = () => {
  const [pets, setPets] = useState([]);
  const [disabled, setDisabled] = useState(0);
  const [render, setRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const isFocused = useIsFocused();
  const fetchPet = () => {
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

  useEffect(() => {
    Promise.all(fetchPet())
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
  }, [isFocused, render]);

  return (
    <View style={styles.container}>
      <View style={styles.filter}>
        <View style={styles.buttonContainer}>
          <Button
            title="All"
            style={styles.buttons}
            disabled={disabled === 0}
            onPress={() => {
              fetchPets(setPets, "all");
              setDisabled(0);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Available"
            style={styles.buttons}
            disabled={disabled === 1}
            onPress={() => {
              fetchPets(setPets, "available");
              setDisabled(1);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Pending"
            disabled={disabled === 2}
            onPress={() => {
              fetchPets(setPets, "pending");
              setDisabled(2);
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Sold"
            disabled={disabled === 3}
            onPress={() => {
              fetchPets(setPets, "sold");
              setDisabled(3);
            }}
          />
        </View>
      </View>
      {pets.length > 0 ? (
        <View style={{ flex: 1 }}>
          <FlatList
            style={styles.contentContainer}
            data={pets}
            renderItem={({ item, index }) => (
              <PetRow
                pet={item}
                key={index}
                index={index}
                setRender={setRender}
                successModal={setVisible}
                setMessage={setMessage}
                setDisabled={setDisabled}
              />
            )}
          />
        </View>
      ) : (
        <Text style={{ marginTop: 10, fontSize: 18, textAlign: "center" }}>
          No pets to show.
        </Text>
      )}
      <AddButton />
      <View style={[styles.modal, { display: visible ? "flex" : "none" }]}>
        <Text
          style={{
            fontSize: 22,
            fontWeight: "800",
            color: message === "Success" ? "#226911" : "red",
          }}
        >
          {message}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  contentContainer: {
    paddingBottom: 15,
  },
  filter: {
    flexDirection: "row",
    marginTop: 20,
    paddingBottom: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 1,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 4,
  },
  modal: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    backgroundColor: "#fafafa",
    paddingHorizontal: 40,
    paddingVertical: 26,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 6,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    borderRadius: 10,
  },
});

export default PetsList;
