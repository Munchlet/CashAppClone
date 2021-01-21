import React, { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, useWindowDimensions, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VirtualKeyboard } from "react-native-screen-keyboard";
import { s } from "react-native-size-matters";
import Button from "../../shared/components/Button";
import { ThemeType } from "../../shared/ThemeManager";
import SafeScreen from "./SafeScreen";

// interface Props extends StackNavigationProp {}

enum SelectedMethod {
	Phone,
	Email,
}

export default function EmailRegistrationScreen() {
	const keyboardRef = useRef<VirtualKeyboard>(null);
	const inputRef = useRef<TextInput>(null);
	const [method, setMethod] = useState<SelectedMethod>(SelectedMethod.Phone);
	const [value, setValue] = useState<string>("");
	const window = useWindowDimensions();

	const onKeyPressed = (key: any) => {
		console.log(key);
		switch (key) {
			case "custom":
				setMethod(SelectedMethod.Email);
				if (inputRef.current) inputRef.current.focus();
				break;
			case "back":
				setValue((prev) => prev.slice(0, -1));
				break;
			default:
				setValue((prev) => `${prev}${key}`);
		}
	};

	const onInputChange = (text: string) => setValue(text);

	useEffect(() => {
		Keyboard.dismiss();
	}, []);

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "space-between" }}>
			<SafeScreen style={styles.topContainer}>
				<Text style={styles.header}>Enter your phone or email</Text>
				<TextInput
					ref={inputRef}
					style={styles.textInput}
					onChangeText={onInputChange}
					value={value}
					placeholder="Phone or Email"
					// showSoftInputOnFocus={false}
					onFocus={() => {
						// for iOS?
						if (method === SelectedMethod.Phone) {
							Keyboard.dismiss();
							return false;
						}
					}}
				/>
			</SafeScreen>

			{method === SelectedMethod.Phone ? (
				<View style={styles.bottomContainer}>
					<VirtualKeyboard
						keyStyle={{ backgroundColor: "white", borderRightWidth: 0, borderBottomWidth: 0 }}
						style={styles.keyboard}
						onRef={(ref: any) => (keyboardRef.current = ref)}
						onKeyDown={onKeyPressed}
						keyboard={[
							[1, 2, 3],
							[4, 5, 6],
							[7, 8, 9],
							["ABC", 0, 1],
						]}
					/>
					<View style={{ alignItems: "center" }}>
						<Button width={90} text="Next" onPress={() => {}}></Button>
					</View>
				</View>
			) : (
				<View
					style={[
						styles.bottomContainer,
						{
							flexDirection: "row",
							height: s(50),
							alignItems: "flex-end",
							paddingHorizontal: 20,
							justifyContent: "space-evenly",
						},
					]}
				>
					<View style={{ flex: 1, alignItems: "center" }}>
						<Button
							width={90}
							theme={ThemeType.SECONDARY}
							text="Use Phone"
							onPress={() => {
								console.log(`good`)
								setMethod(SelectedMethod.Phone);
								if (inputRef.current) inputRef.current.blur();
								Keyboard.dismiss();
							}}
						></Button>
					</View>
					<View style={{ flex: 1, alignItems: "center" }}>
						<Button width={90} text="Next" onPress={() => {}} disabled={value.length < 1}></Button>
					</View>
				</View>
			)}
		</SafeAreaView>
	);
}

interface Styles {
	header: ViewStyle;
	keyboard: ViewStyle;
	textInput: ViewStyle;
	topContainer: ViewStyle;
	bottomContainer: ViewStyle;
	button: ViewStyle;
	buttonText: ViewStyle;
	subtitle: ViewStyle;
}

const styles = StyleSheet.create<Styles>({
	header: {
		fontFamily: "GothamMed",
		fontSize: 26,
	},
	keyboard: {},
	textInput: {
		width: "100%",
		height: 30,
		fontSize: 24,
		marginTop: 20,
	},
	topContainer: {
		paddingTop: 66,
		paddingLeft: 36,
		flexBasis: 140,
		flex: 1,
	},
	bottomContainer: {
		marginBottom: 20,
	},
	button: {
		marginTop: 20,
		minWidth: "86%",
		backgroundColor: "limegreen",
		justifyContent: "center",
		alignItems: "center",
		height: s(36),
		borderRadius: 30,
	},
	buttonText: {
		fontFamily: "GothamMed",
		color: "white",
		fontSize: 18,
	},
	subtitle: {
		marginVertical: 16,
		fontSize: 18,
		color: "grey",
	},
});