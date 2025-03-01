import { useEventListener } from "@rbxts/pretty-react-hooks";
import React, { createContext, useContext, useState } from "@rbxts/react";
import { UserInputService } from "@rbxts/services";
import { SoundController } from "client/Controllers/SoundController";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";
import { DefaultStroke } from "./DefaultStroke";

const choise_context = createContext<{
	SelectedValue: string;
	HighlightedText?: string;
	Close: () => void;
	SetHighlightedText: (value?: string) => void;
	SetChoise: (value: string) => void;
}>(undefined!);

function Choise(props: { Text: string }): JSX.Element {
	const choise_data = useContext(choise_context);
	assert(choise_data);

	const is_highlighted = (choise_data.HighlightedText ?? choise_data.SelectedValue) === props.Text;
	const is_selected = choise_data.SelectedValue === props.Text;
	return (
		<textbutton
			//required
			BackgroundColor3={FuzzySearchDemoGuiResources.HIGHLIGHTED_BACKGROUND_COLOR}
			BackgroundTransparency={is_highlighted ? 0 : 1}
			BorderSizePixel={0}
			Size={new UDim2(1.0, 0, 0.0, 40)}
			ZIndex={2}
			Text={""}
			AutoButtonColor={false}
			Event={{
				MouseEnter: () => {
					choise_data.SetHighlightedText(props.Text);
					SoundController.PlayHoverSound();
				},
				MouseButton1Up: () => {
					SoundController.PlayClickSound();
					choise_data.SetChoise(props.Text);
				},
			}}
		>
			<uicorner />
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				SortOrder={Enum.SortOrder.LayoutOrder}
				VerticalAlignment={Enum.VerticalAlignment.Center}
				Padding={new UDim(0.0, 10)}
			/>
			<uipadding PaddingLeft={new UDim(0.0, 10)} />
			<imagelabel
				key={"Checkmark"}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Size={UDim2.fromOffset(25, 25)}
				ImageColor3={
					is_highlighted
						? FuzzySearchDemoGuiResources.HIGHLIGHTED_TEXT_COLOR
						: FuzzySearchDemoGuiResources.TEXT_COLOR
				}
				ZIndex={2}
				ImageTransparency={is_selected ? 0 : 1}
				Image={FuzzySearchDemoGuiResources.CHECK_MARK_ICON}
			/>
			<textlabel
				key={"Text"}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Size={UDim2.fromScale(1.0, 1.0)}
				ZIndex={2}
				FontFace={FuzzySearchDemoGuiResources.FONT}
				Text={props.Text}
				TextColor3={
					is_highlighted
						? FuzzySearchDemoGuiResources.HIGHLIGHTED_TEXT_COLOR
						: FuzzySearchDemoGuiResources.TEXT_COLOR
				}
				TextSize={16}
				TextXAlignment={Enum.TextXAlignment.Left}
			/>
		</textbutton>
	);
}

export function DropDownMenu(props: {
	SetChoise: (value: string) => void;
	SelectedValue: string;
	Choises: string[];
}) {
	const [is_opened, SetIsOpened] = useState(false);
	const [highlighted_text, SetHighlightedText] = useState<string>();
	const Close = () => SetIsOpened(false);

	useEventListener(
		UserInputService.InputEnded,
		(input) => {
			const should_be_closed =
				input.UserInputType === Enum.UserInputType.MouseButton1 ||
				input.UserInputType === Enum.UserInputType.Touch ||
				input.KeyCode === Enum.KeyCode.ButtonB;
			if (should_be_closed) SetIsOpened(false);
		},
		{ connected: is_opened },
	);

	return (
		<textbutton
			BackgroundColor3={FuzzySearchDemoGuiResources.PRIMARY_COLOR}
			BorderSizePixel={0}
			Size={new UDim2(1.0, 0, 0.0, 50)}
			FontFace={FuzzySearchDemoGuiResources.FONT}
			Text={props.SelectedValue}
			TextColor3={FuzzySearchDemoGuiResources.TEXT_COLOR}
			TextSize={FuzzySearchDemoGuiResources.TEXT_SIZE}
			TextXAlignment={Enum.TextXAlignment.Left}
			Event={{
				MouseButton1Click: () => {
					SoundController.PlayClickSound();
					SetIsOpened(true);
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
			<imagelabel
				key={"DropDownArrow"}
				AnchorPoint={new Vector2(1, 0.5)}
				BackgroundTransparency={1}
				BorderSizePixel={0}
				Position={UDim2.fromScale(1.0, 0.5)}
				Size={UDim2.fromOffset(25, 25)}
				Image={FuzzySearchDemoGuiResources.ARROW_DOWN_ICON}
				ImageColor3={new Color3(0.611765, 0.639216, 0.686275)}
			/>
			<frame
				key="List"
				AutomaticSize={Enum.AutomaticSize.Y}
				BackgroundColor3={FuzzySearchDemoGuiResources.PRIMARY_COLOR}
				BorderSizePixel={0}
				Position={UDim2.fromOffset(-20, 40)}
				Size={new UDim2(1.0, 40, 1.0, 40)}
				Visible={is_opened}
				ZIndex={2}
			>
				<uicorner />
				<uilistlayout SortOrder={Enum.SortOrder.LayoutOrder} />
				<uipadding
					PaddingBottom={new UDim(0.0, 10)}
					PaddingLeft={new UDim(0.0, 10)}
					PaddingRight={new UDim(0.0, 10)}
					PaddingTop={new UDim(0.0, 10)}
				/>
				<DefaultStroke />
				<choise_context.Provider
					value={{
						HighlightedText: highlighted_text,
						SelectedValue: props.SelectedValue,
						Close: Close,
						SetChoise: props.SetChoise,
						SetHighlightedText: SetHighlightedText,
					}}
				>
					{props.Choises.map((choise) => (
						<Choise Text={choise} />
					))}
				</choise_context.Provider>
			</frame>
		</textbutton>
	);
}
