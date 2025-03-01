import React from "@rbxts/react";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";
import { DefaultStroke } from "./DefaultStroke";
import { SoundController } from "client/Controllers/SoundController";

export function CheckMark(props: {
	Value: boolean;
	SetValue: (value: boolean) => void;
}): JSX.Element {
	return (
		<imagebutton
			BackgroundColor3={FuzzySearchDemoGuiResources.PRIMARY_COLOR}
			BorderSizePixel={0}
			Size={UDim2.fromOffset(40, 40)}
			Event={{
				MouseButton1Click: () => {
					SoundController.PlayClickSound();
					props.SetValue(!props.Value);
				},
			}}
		>
			<uicorner />
			<DefaultStroke />
			<imagelabel
				Visible={props.Value}
				key={"Icon"}
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromOffset(30, 30)}
				Image={FuzzySearchDemoGuiResources.CHECK_MARK_ICON}
			/>
		</imagebutton>
	);
}
