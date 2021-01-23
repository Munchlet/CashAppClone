import React from "react";
import { fireEvent, render, cleanup } from "@testing-library/react-native";
import EmailRegistrationScreen from "../../screens/Registration/EmailRegistrationScreen";
import "@testing-library/jest-native/extend-expect";

afterEach(cleanup);

describe("<EmailRegistrationScreen />", () => {
	it("should mount component", () => {
		const { toJSON } = render(<EmailRegistrationScreen />);
		expect(toJSON()).toMatchSnapshot();
	});

	it("should properly render input and keyboard", () => {
		const { debug, getByTestId, getByText, queryByTestId, toJSON } = render(<EmailRegistrationScreen />);
		const input = getByTestId("test-input-email-phone");
		expect(input).toBeDefined();
		// const keyboard = getByTestId("test-virtual-keyboard");
		// expect(keyboard).toBeDefined();
	});

	it("should validate input", () => {
		const { debug, getByTestId, getByText, queryByTestId, toJSON } = render(<EmailRegistrationScreen />);
		const input = getByTestId("test-input-email-phone");
		fireEvent.changeText(input, "1234");
		expect(input.props.value).toBe("1234");
		fireEvent.changeText(input, "abcd");
		expect(input.props.value).toBe("");
	});
});