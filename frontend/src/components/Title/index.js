import React from "react";
import Typography from "@material-ui/core/Typography";

export default function Title(props) {
	return (
		<Typography variant="h5" color="primary" style={{ marginLeft: "-5px" }}>
			{props.children}
		</Typography>
	);
}
