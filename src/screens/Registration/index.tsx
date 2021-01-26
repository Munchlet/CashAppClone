import { RouteProp } from "@react-navigation/native";
import { createStackNavigator, StackNavigationProp } from "@react-navigation/stack";
import { NavigationModule } from "typings";
import EmailScreen from "./EmailRegistrationScreen";

type RegistrationParamList = {
	EmailRegistration: undefined;
	PhoneRegistration: undefined;
	ConfirmationCodeRegistration: undefined;
	BankCountryRegistration: undefined;
	UniqueCashTagRegistration: undefined;
	ZipCodeRegistration: undefined;
};

export const RegistrationStack = createStackNavigator<RegistrationParamList>();

export type RegistrationNavigationProp<T extends keyof RegistrationParamList = never> = StackNavigationProp<
	RegistrationParamList,
	T
>;

export interface RootStackScreenProps<T extends keyof RegistrationParamList> {
	navigation: RegistrationNavigationProp<T>;
	route: RouteProp<RegistrationParamList, T>;
}

export const RegistrationScreens: NavigationModule<RegistrationParamList> = {
	EmailRegistration: {
		component: EmailScreen,
		options: {
			headerShown: false,
		},
	},
	PhoneRegistration: {
		component: EmailScreen,
	},
	ConfirmationCodeRegistration: {
		component: EmailScreen,
	},
	BankCountryRegistration: {
		component: EmailScreen,
	},
	UniqueCashTagRegistration: {
		component: EmailScreen,
	},
	ZipCodeRegistration: {
		component: EmailScreen,
	},
};
