import React, { useState } from "@rbxts/react";
import { useAtom } from "@rbxts/react-charm";
import { FuzzySearchDemoGuiController } from "client/Controllers/FuzzySearchDemoGuiController";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";
import { DefaultStroke } from "../Components/DefaultStroke";

function Value(props: { Value: string }) {
	const [delete_hovered, SetDeleteHovered] = useState(false);
	return (
		<textlabel
			BackgroundColor3={FuzzySearchDemoGuiResources.PRIMARY_COLOR}
			BorderSizePixel={0}
			Text={props.Value}
			Size={new UDim2(1.0, 0, 0.0, 50)}
			FontFace={FuzzySearchDemoGuiResources.FONT}
			TextColor3={FuzzySearchDemoGuiResources.TEXT_COLOR}
			TextSize={FuzzySearchDemoGuiResources.TEXT_SIZE}
			TextXAlignment={Enum.TextXAlignment.Left}
		>
			<uicorner />
			<uipadding
				PaddingBottom={new UDim(0.0, 20)}
				PaddingLeft={new UDim(0.0, 20)}
				PaddingRight={new UDim(0.0, 20)}
				PaddingTop={new UDim(0.0, 20)}
			/>
			<DefaultStroke />
			<imagebutton
				key={"Delete"}
				AnchorPoint={new Vector2(1, 0.5)}
				BackgroundColor3={FuzzySearchDemoGuiResources.SELECTED_DELETE_BUTTON_COLOR}
				BackgroundTransparency={delete_hovered ? 0 : 1}
				BorderSizePixel={0}
				Position={UDim2.fromScale(1.0, 0.5)}
				Size={UDim2.fromOffset(35, 35)}
				Image={FuzzySearchDemoGuiResources.TRASH_BIN_ICON}
				Event={{
					MouseEnter: () => SetDeleteHovered(true),
					MouseLeave: () => SetDeleteHovered(false),
					MouseButton1Click: () => FuzzySearchDemoGuiController.RemoveString(props.Value),
				}}
			>
				<uicorner />
			</imagebutton>
		</textlabel>
	);
}

export function StringsList() {
	const strings_list = useAtom(FuzzySearchDemoGuiController.GetStringsListAtom);
	return (
		<scrollingframe
			Active={true}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={UDim2.fromScale(1.0, 1.0)}
			AutomaticCanvasSize={Enum.AutomaticSize.Y}
			CanvasSize={UDim2.fromScale(0.0, 0.0)}
			ScrollingDirection={Enum.ScrollingDirection.Y}
			VerticalScrollBarInset={Enum.ScrollBarInset.ScrollBar}
		>
			<uipadding
				PaddingBottom={new UDim(0.0, 5)}
				PaddingLeft={new UDim(0.0, 5)}
				PaddingRight={new UDim(0.0, 5)}
				PaddingTop={new UDim(0.0, 5)}
			/>
			<uilistlayout SortOrder={Enum.SortOrder.LayoutOrder} Padding={new UDim(0.0, 12)} />
			{strings_list.map((value, i) => (
				<Value key={i} Value={value} />
			))}
		</scrollingframe>
	);
}
