declare module "react-native-screen-keyboard";

import { DefaultNavigatorOptions, ParamListBase } from "@react-navigation/native";
import { StackNavigationOptions } from "@react-navigation/stack";

export interface ValidateRegistrationResult {
	parsedText?: string;
	success: boolean;
}

export type NavigationModule<ParamList extends ParamListBase, OptionsType = StackNavigationOptions> = Record<keyof ParamList, {
	component: React.ComponentType<any>;
	options?: DefaultNavigatorOptions<OptionsType, ParamList>["screenOptions"];
}

