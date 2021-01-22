import React from "react";
import { fireEvent, render } from "@testing-library/react-native";
import EmailRegistrationScreen from "../../screens/Registration/EmailRegistrationScreen";
import "@testing-library/jest-native/extend-expect";

test("mount component", async () => {
	const { debug, getByTestId, getByText, queryByTestId, toJSON } = render(<EmailRegistrationScreen />);
	const input = getByTestId("test-input-email-phone");
	expect(input).toBeDefined();
	// const keyboard = getByTestId("test-virtual-keyboard");
	const nextButton = getByText("Next");
	expect(nextButton).toBeDisabled();

	fireEvent.changeText(input, "1234");
	console.log(JSON.stringify(toJSON().children[0]));
	expect(input).toHaveTextContent("1234");
	expect(nextButton).toBeEnabled();
	console.log(toJSON());
	// console.log(prettyDOM(input))
	// fireEvent.changeText(input, "abcd");
	// expect(input).toHaveTextContent("");
	// expect(nextButton).toBeDisabled();
	// debug("WHY?!");

	// fireEvent.press(nextButton);
});
