import React from "@rbxts/react";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";

export function Header(props: { Text: string }) {
	return (
		<textlabel
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={new UDim2(1.0, 0, 0.0, 40)}
			FontFace={FuzzySearchDemoGuiResources.FONT}
			Text={props.Text}
			TextColor3={FuzzySearchDemoGuiResources.TEXT_COLOR}
			TextSize={FuzzySearchDemoGuiResources.HEADER_TEXT_SIZE}
			TextXAlignment={Enum.TextXAlignment.Left}
		/>
	);
}
