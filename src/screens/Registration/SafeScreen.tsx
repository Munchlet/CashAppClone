import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";
import { ScaledSheet } from "react-native-size-matters";

interface Props {
	children: React.ReactNode;
	style: ViewStyle;
}
export default function SafeScreen(props: Props) {
	return <View style={[styles.container, props.style]}>{props.children}</View>;
}

interface Styles {
	container: ViewStyle;
}

const styles = ScaledSheet.create<Styles>({
	container: {
		paddingTop: "66@vs",
		paddingLeft: "36@s",
	},
});
