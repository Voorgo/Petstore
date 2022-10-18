import { useState, useEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import {
  TextInput,
  Dialog,
  Portal,
  Paragraph,
  Button as Btn,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { useNavigation } from "@react-navigation/native";

const AddPet = () => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState(null);
  const [items, setItems] = useState([
    { label: "Available", value: "available" },
    { label: "Pending", value: "pending" },
    { label: "Sold", value: "sold" },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("available");
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const navigation = useNavigation();

  const addPet = async () => {
    if (name.trim()) {
      await fetch("https://petstore.swagger.io/v2/pet", {
        method: "post",
        headers: {
          accept: " application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: number,
          category: {
            id: 0,
            name: "string",
          },
          name: name,
          photoUrls: ["string"],
          tags: [
            {
              id: 0,
              name: "string",
            },
          ],
          status: value,
        }),
      })
        .then((res) => {
          if (res.status === 200) {
            setVisible(true);
            setMessage("Success");
          } else {
            setVisible(true);
            setMessage("Error");
          }
        })
        .catch((error) => setMessage("Error"));
    } else {
      alert("Please Enter Name");
    }
  };

  const fetchPets = () => {
    const arr = [];
    for (let i = 60; i <= 80; i++) {
      arr.push(
        fetch(`https://petstore.swagger.io/v2/pet/${i}`).then((res) =>
          res.json()
        )
      );
    }
    return arr;
  };

  useEffect(() => {
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
        results.length > 0
          ? setNumber(results[results.length - 1].id + 1)
          : setNumber(60);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <View style={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={(text) => setName(text)}
        activeUnderlineColor="#2196F3"
        maxLength={10}
        style={styles.gap}
      />
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.gap}
      />
      <View style={[styles.gap, { alignSelf: "center", minWidth: "50%" }]}>
        <Button title="Add Pet" onPress={addPet} />
      </View>
      <Portal>
        <Dialog visible={visible}>
          <Dialog.Content>
            <Paragraph
              style={{ fontSize: 20, fontWeight: "700", alignSelf: "center" }}
            >
              {message}
            </Paragraph>
            <Dialog.Actions>
              <Btn
                onPress={() => {
                  navigation.navigate("PetsList");
                }}
              >
                OK
              </Btn>
            </Dialog.Actions>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  gap: {
    marginVertical: 10,
  },
});

export default AddPet;
