import { useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { Entypo } from "@expo/vector-icons";
import {
  Menu,
  Portal,
  Paragraph,
  Dialog,
  Button as Btn,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import deletePet from "../utils/deletePet";

const PetRow = ({
  pet,
  index,
  setRender,
  successModal,
  setMessage,
  setDisabled,
}) => {
  const [visible, setVisible] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const navigation = useNavigation();

  const hideDialog = () => setVisibleModal(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={[styles.container, styles.boxWithShadow]}>
      <Text style={styles.index}>{index + 1}</Text>
      <Text style={[styles.textSize, { textTransform: "capitalize" }]}>
        {pet.name}
      </Text>
      <Text
        style={[styles.textSize, { textAlign: "center", alignItems: "center" }]}
      >
        {pet.status}
      </Text>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <Pressable
            android_ripple={{ color: "#ebebeb", radius: 16 }}
            onPress={openMenu}
          >
            <Entypo
              name="dots-three-vertical"
              size={24}
              color="black"
              style={styles.actions}
            />
          </Pressable>
        }
      >
        <Menu.Item
          onPress={() => {
            navigation.navigate("PetOverview", pet);
            closeMenu();
          }}
          title="View"
        />
        <Menu.Item
          onPress={() => {
            navigation.navigate("Edit Pet", pet);
            closeMenu();
          }}
          title="Edit"
        />
        <Menu.Item
          onPress={() => {
            setVisibleModal(true);
            setVisible(false);
          }}
          title="Delete"
        />
      </Menu>
      <Portal>
        <Dialog visible={visibleModal}>
          <Dialog.Content>
            <Paragraph
              style={{ fontSize: 20, fontWeight: "700", alignSelf: "center" }}
            >
              Delete pet?
            </Paragraph>
            <Dialog.Actions>
              <Btn onPress={hideDialog}>Cancel</Btn>
              <Btn
                onPress={() => {
                  deletePet(
                    pet.id,
                    setRender,
                    successModal,
                    setMessage,
                    setDisabled
                  );
                  setVisibleModal(false);
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
    flex: 1,
    flexDirection: "row",
    marginTop: 10,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: "white",
    justifyContent: "space-between",
  },
  boxWithShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },
  textSize: {
    fontSize: 18,
    flex: 2,
    textAlign: "left",
  },
  index: {
    fontSize: 18,
    flex: 1,
  },
  actions: {
    padding: 4,
  },
});

export default PetRow;
