import * as React from "react";
import {View, Text} from "react-native";

import {styleGlobal} from "../../_global/styleGlobal";

interface Props {
	text: string;
	type?: "error" | "info" | "confirm";
}

const Button: React.FC<Props> = ({text, type = "confirm"}) => {
	return (
		<View style={[styleGlobal.message, type === "error" && styleGlobal.messageError, type === "confirm" && styleGlobal.messageConfirm]}>
			<Text>{text}</Text>
		</View>
	);
};

export default Button;
