import React from "@rbxts/react";
import { useAtom } from "@rbxts/react-charm";
import { FuzzySearchDemoGuiController } from "client/Controllers/FuzzySearchDemoGuiController";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";
import { DefaultStroke } from "../Components/DefaultStroke";

function TextValue(props: { Value: string; Score: number }): JSX.Element {
	return (
		<textlabel
			BackgroundColor3={FuzzySearchDemoGuiResources.PRIMARY_COLOR}
			BorderSizePixel={0}
			Size={new UDim2(1.0, 0, 0.0, 50)}
			Text={props.Value}
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
			<textlabel
				key={"Score"}
				AnchorPoint={new Vector2(1, 0.5)}
				BackgroundColor3={FuzzySearchDemoGuiResources.SCORE_COLOR}
				BorderSizePixel={0}
				Position={UDim2.fromScale(1.0, 0.5)}
				Size={UDim2.fromOffset(120, 30)}
				FontFace={FuzzySearchDemoGuiResources.FONT}
				Text={`Score: ${"%.2f".format(props.Score)}`}
				TextColor3={FuzzySearchDemoGuiResources.SCORE_TEXT_COLOR}
				TextSize={FuzzySearchDemoGuiResources.TEXT_SIZE}
			>
				<uicorner CornerRadius={new UDim(1.0, 0)} />
			</textlabel>
		</textlabel>
	);
}

export function ScoresList(): JSX.Element {
	const search_results = useAtom(FuzzySearchDemoGuiController.GetSearchResultsAtom);

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
			<uilistlayout SortOrder={Enum.SortOrder.LayoutOrder} Padding={new UDim(0.0, 12)} />
			{search_results.map(([score, value]) => (
				<TextValue Value={value} Score={score} />
			))}
		</scrollingframe>
	);
}
