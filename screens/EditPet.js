import { useState, useLayoutEffect } from "react";
import { View, Button, StyleSheet } from "react-native";
import {
  TextInput,
  Dialog,
  Portal,
  Paragraph,
  Button as Btn,
} from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";

const EditPet = ({ route, navigation }) => {
  const [name, setName] = useState(route.params.name);
  const [items, setItems] = useState([
    { label: "Available", value: "available" },
    { label: "Pending", value: "pending" },
    { label: "Sold", value: "sold" },
  ]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(route.params.status);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");

  const editPet = async () => {
    if (name.trim()) {
      await fetch("https://petstore.swagger.io/v2/pet", {
        method: "put",
        headers: {
          accept: " application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: route.params.id,
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
            console.log(route.params.id);
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

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Edit ${route.params.name.toUpperCase()}`,
    });
  }, [navigation]);
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
        <Button title="Edit Pet" onPress={editPet} />
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

export default EditPet;
