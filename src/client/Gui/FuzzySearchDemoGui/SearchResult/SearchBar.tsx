import React from "@rbxts/react";
import { useAtom } from "@rbxts/react-charm";
import { FuzzySearchDemoGuiController } from "client/Controllers/FuzzySearchDemoGuiController";
import { SoundController } from "client/Controllers/SoundController";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";
import { HorizontalContainer } from "../Components/HorizontalContainer";
import { Input } from "../Components/Input";

export function SearchBar(): JSX.Element {
	const search_query = useAtom(FuzzySearchDemoGuiController.GetSelectedSearchQuery);

	return (
		<HorizontalContainer>
			<Input
				PlaceholderText={"Type to search..."}
				Text={search_query}
				SetText={FuzzySearchDemoGuiController.SetSearchQuery}
			/>
			<imagebutton
				key={"Search"}
				BackgroundColor3={FuzzySearchDemoGuiResources.SEARCH_BUTTON_COLOR}
				BorderSizePixel={0}
				Size={UDim2.fromOffset(120, 50)}
				Event={{
					MouseButton1Click: () => {
						SoundController.PlayClickSound();
						FuzzySearchDemoGuiController.DoSearch();
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
					Position={UDim2.fromScale(0.083, 0.2)}
					Size={UDim2.fromOffset(40, 40)}
					Image={FuzzySearchDemoGuiResources.SEARCH_ICON}
				/>
				<textlabel
					key={"Text"}
					BackgroundTransparency={1}
					BorderSizePixel={0}
					Size={UDim2.fromOffset(50, 50)}
					FontFace={FuzzySearchDemoGuiResources.FONT}
					Text={"Find"}
					TextColor3={FuzzySearchDemoGuiResources.TEXT_COLOR}
					TextSize={FuzzySearchDemoGuiResources.TEXT_SIZE}
				/>
			</imagebutton>
		</HorizontalContainer>
	);
}
