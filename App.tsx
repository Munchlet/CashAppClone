import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useFonts } from "expo-font";
import { RegistrationStack, RegistrationScreens } from "./src/screens/Registration";
import { NavigationContainer } from "@react-navigation/native";
import { createNavigatorScreens } from "./src/utils/Helper";
import EmailRegistrationScreen from "./src/screens/Registration/EmailRegistrationScreen";
import Test from "./src/screens/Test";

export default function App() {
	const [loaded, error] = useFonts({
		Gotham: require("./assets/fonts/GothamPro.ttf"),
		GothamBold: require("./assets/fonts/GothamPro-Bold.ttf"),
		GothamMed: require("./assets/fonts/GothamPro-Medium.ttf"),
	});

	if (!loaded)
		return (
			<View>
				<Text>Loading...</Text>
			</View>
		);

	const RegistrationNavigator = createNavigatorScreens(RegistrationStack, RegistrationScreens, {
		screenOptions: {
			headerShown: false,
		},
	});

	return (
		<NavigationContainer>
			{/* <RegistrationNavigator /> */}
			<RegistrationStack.Navigator screenOptions={{ headerShown: false }}>
				{/* <RegistrationStack.Screen name="EmailRegistration" component={EmailRegistrationScreen} /> */}
				<RegistrationStack.Screen name="EmailRegistration" component={Test} />
			</RegistrationStack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
	},
});
