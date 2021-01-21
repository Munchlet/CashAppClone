import React from "react";
import VirtualKeypad from "../shared/components/VirtualKeypad";
import { View } from "react-native";

export default function Test() {
	return (
		<View style={{ flex: 1 }}>
			<View style={{ flex: 1 }}></View>
			<View style={{ height: 300 }}>
				<VirtualKeypad onKeyPressed={(key) => console.log(key)} keys={
					[
						[1, 2, 3],
						[4, 5, 6],
						[7, 8, 9],
						["ABC", 0, "NEXT"],
					]
				} vibration={true} />
			</View>
		</View>
	);
}
