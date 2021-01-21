import React from "react";
import { TypedNavigator } from "@react-navigation/native";
import { NavigationModule } from "../types";

type ToNavigationModule<T> = T extends TypedNavigator<infer ParamList, any, infer ScreenOptions, any, any>
	? NavigationModule<ParamList, ScreenOptions>
	: never;

/**
 * Method which adds screens to navigation manager
 * To be called outside of render
 *
 * @returns Navigator component with screens as children
 *
 * @param Navigator Navigator created from react-navigation
 * @param screens Navigation module containing all screens with options
 * @param navigatorOptions Options to be passed into Navigator wrapper
 */
export const createNavigatorScreens = <T extends TypedNavigator<any, any, any, any, any>>(
	Navigator: T,
	screens: ToNavigationModule<T>,
	options?: Omit<React.ComponentProps<T["Navigator"]>, "children">
) => {
	// const Nav = Map.Navigator;
	// const children = Object.entries(screens).map(([name, { component, options }], index) => {
	// 	return <Nav.Screen key={name} name={name} component={component} options={options} />;
	// });

	// return <Navigator.Navigator>{children.map((child) => child)}</Navigator.Navigator>;
};