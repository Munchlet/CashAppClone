import React from "react";
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from "react-native";
import { s } from "react-native-size-matters";
import { ThemeType } from "../ThemeManager";

interface Props {
	testKey: string;
	text: string;
	disabled?: boolean;
	width?: number;
	onPress: () => void;
	theme?: ThemeType;
}

export default function Button({
	testKey,
	text,
	disabled = false,
	onPress,
	width = 100,
	theme = ThemeType.PRIMARY,
}: Props) {
	const containerStyle = [styles.container, { width: `${width}%` }];
	const textStyle = [styles.text];

	if (theme === ThemeType.SECONDARY) {
		containerStyle.push(styles.containerDisabled);
		textStyle.push(styles.textSecondary);
	}

	if (disabled) textStyle.push(styles.textDisabled);

	return (
		<TouchableOpacity
			testID={`test-button-${testKey}`}
			style={containerStyle}
			onPress={() => !disabled && onPress()}
			disabled={disabled}
		>
			<Text style={textStyle}>{text}</Text>
		</TouchableOpacity>
	);
}

interface Styles {
	containerDisabled: ViewStyle;
	container: ViewStyle;
	text: ViewStyle;
	textDisabled: ViewStyle;
	textSecondary: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
	containerDisabled: {
		backgroundColor: "rgba(244, 244, 244, 0.65)",
	},
	container: {
		backgroundColor: "#00d650",
		fontFamily: "GothamMed",
		borderRadius: 30,
		justifyContent: "center",
		alignItems: "center",
		height: s(38),
	},
	text: {
		color: "white",
		fontFamily: "GothamMed",
		fontSize: s(14),
	},
	textDisabled: {
		color: "rgba(244, 244, 244, 0.5)",
	},
	textSecondary: {
		color: "black",
	},
});
