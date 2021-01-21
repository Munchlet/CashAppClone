import React from "react";
import { View, Text, Vibration, StyleSheet, ViewStyle, Platform } from "react-native";
import Ripple from "react-native-material-ripple";

type KeyType = number | string;

export interface Props {
	keys?: KeyType[][];
	onKeyPressed: (key: KeyType) => any;
	keysFn?: (Function | null)[][];
	vibration?: boolean;
}

const DEFAULT_KEYS = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	["", 0, ""],
];

const DEFAULT_KEYSFN = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

export default function VirtualKeypad({
	keys = DEFAULT_KEYS,
	keysFn = DEFAULT_KEYSFN,
	onKeyPressed,
	vibration = false,
}: Props) {
	const renderKey = (value: KeyType, row: number, column: number) => {
		return (
			<Ripple
				rippleColor={"#000"}
				key={column}
				onPress={() => {
					if (vibration) Vibration.vibrate(50);
					if (keysFn[row][column]) keysFn[row][column]!();
					else onKeyPressed(value);
				}}
				style={styles.keyContainer}
			>
				<Text style={styles.key}>{value}</Text>
			</Ripple>
		);
	};
	return (
		<View style={styles.container}>
			{keys.map((row, rowIndex) => (
				<View style={styles.keyRow} key={rowIndex}>
					{row.map((value, columnIndex) => renderKey(value, rowIndex, columnIndex))}
				</View>
			))}
		</View>
	);
}

interface Styles {
	container: ViewStyle;
	keyRow: ViewStyle;
	keyContainer: ViewStyle;
	key: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
	container: {
		width: "100%",
		flex: 1,
	},
	keyRow: {
		flex: 1,
		flexDirection: "row",
	},
	keyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF",
		borderRightColor: "#e8e8e8",
		borderRightWidth: 1,
		borderBottomColor: "#e8e8e8",
		borderBottomWidth: 1,
	},
	key: {
		...Platform.select({
			ios: {
				fontFamily: "HelveticaNeue",
			},
			android: {
				fontFamily: "Roboto",
			},
		}),
		fontWeight: "400",
		fontSize: 25,
		textAlign: "center",
		color: "#222222",
	},
});
