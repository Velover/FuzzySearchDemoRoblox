import React from "@rbxts/react";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";

export function SubText(props: { Text: string }) {
	return (
		<textlabel
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={new UDim2(1.0, 0, 0.0, 35)}
			FontFace={FuzzySearchDemoGuiResources.FONT}
			Text={props.Text}
			TextColor3={FuzzySearchDemoGuiResources.SUB_TEXT_COLOR}
			TextSize={FuzzySearchDemoGuiResources.TEXT_SIZE}
			TextXAlignment={Enum.TextXAlignment.Left}
		/>
	);
}
