import { TypedNavigator } from "@react-navigation/native";
import React from "react";
import { NavigationModule } from "../typings";

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
	navigatorOptions?: Omit<React.ComponentProps<T["Navigator"]>, "children">
): (() => JSX.Element) => {
	const children = Object.entries(screens).map(([name, { component, options }], index) => (
		<Navigator.Screen key={name} name={name} component={component} options={options} />
	));

	return () => <Navigator.Navigator {...navigatorOptions}>{children.map(child => child)}</Navigator.Navigator>;
};

export const validateEmail = (email: string): boolean =>
	/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
		email
	);

export const validatePhone = (phone: string): boolean => /([0-9]*)/.test(phone);
