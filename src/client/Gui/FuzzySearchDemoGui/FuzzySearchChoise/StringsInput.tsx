import React, { useState } from "@rbxts/react";
import { FuzzySearchDemoGuiController } from "client/Controllers/FuzzySearchDemoGuiController";
import { SoundController } from "client/Controllers/SoundController";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";
import { HorizontalContainer } from "../Components/HorizontalContainer";
import { Input } from "../Components/Input";

export function StringsInput() {
	const [string_value, SetStringValue] = useState("");
	return (
		<HorizontalContainer>
			<Input
				PlaceholderText={"Add new strings separated by comas..."}
				Text={string_value}
				SetText={SetStringValue}
			/>
			<imagebutton
				key={"Add"}
				BackgroundColor3={FuzzySearchDemoGuiResources.ADD_BUTTON_COLOR}
				BorderSizePixel={0}
				Size={UDim2.fromOffset(50, 50)}
				Event={{
					MouseButton1Click: () => {
						SoundController.PlayClickSound();
						FuzzySearchDemoGuiController.AddString(string_value);
					},
				}}
			>
				<uicorner />
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				<imagelabel
					key={"Icon"}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					Size={UDim2.fromOffset(40, 40)}
					Image={FuzzySearchDemoGuiResources.ADD_ICON}
				/>
			</imagebutton>
		</HorizontalContainer>
	);
}
