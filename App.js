import PetsList from "./screens/PetsList";
import PetOverview from "./screens/PetOverview";
import AddPet from "./screens/AddPet";
import EditPet from "./screens/EditPet";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="PetList">
          <Stack.Screen
            name="PetsList"
            component={PetsList}
            options={{ title: "Pets List" }}
          />
          <Stack.Screen name="PetOverview" component={PetOverview} />
          <Stack.Screen name="Add Pet" component={AddPet} />
          <Stack.Screen name="Edit Pet" component={EditPet} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
