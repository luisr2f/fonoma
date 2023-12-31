import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Provider } from "react-redux";
import store from "./src/_redux/store";

import Exchange from "./src/pages/exchange";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Exchange" component={Exchange} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
