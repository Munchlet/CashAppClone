import React, { useEffect, useRef, useState } from "react";
import { Keyboard, StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { VirtualKeyboard } from "react-native-screen-keyboard";
import { s } from "react-native-size-matters";
import Button from "../../shared/components/Button";
import { ThemeType } from "../../shared/ThemeManager";
import SafeScreen from "./SafeScreen";
import { validateEmail, validatePhone } from "../../utils/Helper";
import { ValidateRegistrationResult } from "../../typings";

// interface Props extends StackNavigationProp {}

type SelectedMethod = "phone" | "email";

export default function EmailRegistrationScreen() {
	const keyboardRef = useRef<VirtualKeyboard>(null);
	const inputRef = useRef<TextInput>(null);
	const [method, setMethod] = useState<SelectedMethod>("phone");
	const [value, setValue] = useState<string>("");
	const [placeholder, setPlaceholder] = useState<string>("Phone or Email");
	const [disableButton, setDisableButton] = useState<boolean>(true);

	useEffect(() => {
		Keyboard.dismiss();
	}, []);

	const onKeyPressed = (key: string) => {
		switch (key) {
			case "custom":
				setMethod("email");
				setPlaceholder("Email");
				setValue("");
				if (inputRef.current) inputRef.current.focus();
				break;
			case "back":
				setValue(prev => prev.slice(0, -1));
				break;
			default:
				setValue(prev => `${prev}${key}`);
		}
	};

	const onInputChange = (text: string): void => {
		let result = validateInput(text);
		switch (method) {
			case "email":
				result = validateInput(text);
				setValue(text);
				break;
			case "phone":
				// won't happen, only used for testing
				setValue(result.parsedText ?? text);
				break;
		}

		setDisableButton(!result.success);
	};

	const onNextClick = (): void => {
		const { success } = validateInput(value);
		if (!success) return console.log("Failed");
	};

	const onUsePhoneClick = (): void => {
		setMethod("phone");
		setPlaceholder("Phone or Email");
		setValue("");
		if (inputRef.current) inputRef.current.blur();
		Keyboard.dismiss();
	};

	const validateInput = (text: string): ValidateRegistrationResult => {
		if (text.length < 1) return { success: false };
		switch (method) {
			case "phone":
				const parsedText = text.replace(/\D/g, "");
				if (validatePhone(text)) return { success: true, parsedText };
				break;
			case "email":
				if (validateEmail(text)) return { success: true };
				break;
		}

		return { success: false };
	};

	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: "white", justifyContent: "space-between" }}>
			<SafeScreen style={styles.topContainer}>
				<Text style={styles.header}>Enter your phone or email</Text>
				<TextInput
					testID="test-input-email-phone"
					ref={inputRef}
					style={styles.textInput}
					onChangeText={onInputChange}
					value={value}
					placeholder={placeholder}
					// showSoftInputOnFocus={false}
					onFocus={() => {
						// for iOS?
						if (method === "phone") {
							// Keyboard.dismiss();
							return false;
						}
					}}
				/>
			</SafeScreen>

			{method === "phone" ? (
				<View style={styles.bottomContainer}>
					<VirtualKeyboard
						testID="test-virtual-keyboard"
						keyStyle={{ backgroundColor: "white", borderRightWidth: 0, borderBottomWidth: 0 }}
						style={styles.keyboard}
						onRef={(ref: any) => (keyboardRef.current = ref)}
						onKeyDown={onKeyPressed}
						// keyboard={[
						// 	[1, 2, 3],
						// 	[4, 5, 6],
						// 	[7, 8, 9],
						// 	["abc", 0, 1],
						// ]}
					/>
					<View style={{ alignItems: "center", marginTop: 20 }}>
						<Button
							testKey="phone-next"
							width={90}
							text="Next"
							onPress={onNextClick}
							disabled={disableButton}
						></Button>
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
							testKey="use-phone"
							width={90}
							theme={ThemeType.SECONDARY}
							text="Use Phone"
							onPress={onUsePhoneClick}
						></Button>
					</View>
					<View style={{ flex: 1, alignItems: "center" }}>
						<Button
							testKey="email-next"
							width={90}
							text="Next"
							onPress={onNextClick}
							disabled={disableButton}
						></Button>
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
		marginBottom: 26,
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
