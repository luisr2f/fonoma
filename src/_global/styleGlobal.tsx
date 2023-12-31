import { StyleSheet } from "react-native";

import Colors from "./colors";

export const styleGlobal = StyleSheet.create({
	scrollView: {
		padding: 12,
		paddingVertical: 20,
		backgroundColor: Colors.white
	},
	scrollButton: {
		height: 200,
	},
	field: {
		marginBottom: 20,
	},
	center: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	// button
	btnCnt: {
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginTop: 20,
	},
	btn: {
		height: 44,
		marginTop: 12,
		borderRadius: 6,
		backgroundColor: Colors.primary,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	btnIcon: {
		height: 44,
		borderRadius: 6,
		backgroundColor: Colors.gray,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: 50,
	},
	btnSubmit: {
		minWidth: 220,
	},

	btnTxt: {
		color: Colors.white,
		fontSize: 14,
		textTransform: "uppercase",
		marginHorizontal: 12,
	},
	btnDisable: { backgroundColor: Colors.grayMin },
	// END button

	// textInput
	textInputLabel: { color: Colors.black, fontSize: 14, paddingBottom: 6, paddingLeft: 6 },
	textInputCntMain: { marginBottom: 10 },
	textInputCntMainError: { marginBottom: 6 },
	textInputCnt: {
		alignSelf: "center",
		flexDirection: "row",
		paddingHorizontal: 6,
		borderRadius: 6,
		borderWidth: 1,
		borderColor: Colors.gray,
		backgroundColor: Colors.white,
		height: 40,
	},
	textInputError: { borderColor: Colors.red, borderWidth: 1.5 },
	textInputTextError: { color: Colors.red, fontSize: 14, paddingBottom: 6, paddingTop: 2, paddingLeft: 6 },
	textInput: {
		flex: 1,
		paddingHorizontal: 8,
		color: Colors.black,
	},
	// END textInput

	selectList: {
		backgroundColor: Colors.white, borderRadius: 6, borderWidth:1, borderColor: Colors.gray
	},
	selectListError: {
		borderColor: Colors.red,
	},

	message: {
		padding: 12,
		borderRadius: 6,
		marginBottom: 6,
	
	},
	messageTextError: {
		color: Colors.red,
	},
	messageError: {
		borderColor: Colors.red,
		backgroundColor: Colors.redMin,
		color: Colors.black,
	},
	messageConfirm: {
		borderColor: Colors.green,
		backgroundColor: Colors.greenMin,
		color: Colors.black,
	},
});
