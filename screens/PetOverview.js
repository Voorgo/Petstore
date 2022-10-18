import { View, Text, StyleSheet } from "react-native";
import { useLayoutEffect } from "react";

const PetOverview = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      title: route.params.name.toUpperCase(),
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>
          Id:{" "}
          <Text style={{ fontSize: 20, fontWeight: "400" }}>
            {route.params.id}
          </Text>
        </Text>
        <Text style={styles.text}>
          Name:{" "}
          <Text
            style={{
              textTransform: "capitalize",
              fontSize: 20,
              fontWeight: "400",
            }}
          >
            {route.params.name}
          </Text>
        </Text>
        <Text style={styles.text}>
          Status:{" "}
          <Text style={{ fontSize: 20, fontWeight: "400" }}>
            {route.params.status}
          </Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
  },
  card: {
    alignSelf: "center",
    padding: 20,
    marginTop: 50,
    borderRadius: 10,
    maxHeight: "100%",
    maxWidth: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
    backgroundColor: "white",
  },
  text: {
    fontSize: 22,
    fontWeight: "600",
  },
});

export default PetOverview;
