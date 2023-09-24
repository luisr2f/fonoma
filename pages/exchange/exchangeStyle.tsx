import {StyleSheet} from "react-native";
import Colors from "../../_global/colors";

export const style = StyleSheet.create({
	totalCnt: {
		paddingVertical: 30,
		paddingHorizontal: 12,
	},
	from: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
	},
	elem: {
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "flex-start",
		marginTop: 8,
	},
	fromText: {
		fontSize: 32,
		textAlign: "right",
	},
	toText: {
		fontSize: 42,
		textAlign: "right",
	},
	value: {
		flex: 1,		
	},
	currencyCtn: {
		width: 60,
		borderRadius: 6,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	currencyText: {
		fontSize: 18,
		paddingLeft: 12,
		textAlign: "center",
	},
	line: {
		borderTopWidth: 1,
		borderColor: Colors.gray,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 12,
		marginTop: 24,
	},
	lineBlock: {
		backgroundColor: Colors.white,
		marginTop: -12,
		paddingHorizontal: 20,
	},
	lineText: {
		fontSize: 16,
	},
});
