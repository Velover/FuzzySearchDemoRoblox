import React from "@rbxts/react";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";
import { DefaultStroke } from "./DefaultStroke";

export function Input(props: {
	PlaceholderText: string;
	Text: string;
	SetText: (value: string) => void;
}): JSX.Element {
	return (
		<textbox
			BackgroundColor3={FuzzySearchDemoGuiResources.PRIMARY_COLOR}
			BorderSizePixel={0}
			ClipsDescendants={true}
			Size={new UDim2(1.0, 0, 0.0, 50)}
			ClearTextOnFocus={false}
			CursorPosition={-1}
			FontFace={FuzzySearchDemoGuiResources.FONT}
			PlaceholderText={props.PlaceholderText}
			Text={props.Text}
			TextColor3={FuzzySearchDemoGuiResources.TEXT_COLOR}
			TextSize={FuzzySearchDemoGuiResources.TEXT_SIZE}
			TextXAlignment={Enum.TextXAlignment.Left}
			Event={{
				FocusLost: (textbox) => {
					const input = textbox.Text;
					textbox.Text = props.Text;
					props.SetText(input);
				},
			}}
		>
			<uicorner />
			<uipadding
				PaddingBottom={new UDim(0.0, 20)}
				PaddingLeft={new UDim(0.0, 20)}
				PaddingRight={new UDim(0.0, 20)}
				PaddingTop={new UDim(0.0, 20)}
			/>
			<DefaultStroke />
			<uiflexitem FlexMode={Enum.UIFlexMode.Fill} />
		</textbox>
	);
}
