import React from "@rbxts/react";
import FuzzySearchChoise from "./FuzzySearchChoise";
import { usePxBinding } from "client/Hooks/usePx";
import SearchResult from "./SearchResult";

export default function FuzzySearchDemoGui(): JSX.Element {
	const px_binding = usePxBinding();
	return (
		<screengui ResetOnSpawn={false}>
			<frame
				key="Background"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={new Color3(0.0117647, 0.027451, 0.0705882)}
				BorderSizePixel={0}
				Position={UDim2.fromScale(0.5, 0.5)}
				Size={UDim2.fromScale(2, 2)}
			>
				<frame
					key="Content"
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={new Color3(0.0117647, 0.027451, 0.0705882)}
					BorderSizePixel={0}
					Position={UDim2.fromScale(0.5, 0.5)}
					Size={UDim2.fromOffset(1700, 900)}
				>
					<uicorner />
					<uilistlayout
						FillDirection={Enum.FillDirection.Horizontal}
						SortOrder={Enum.SortOrder.LayoutOrder}
						Padding={new UDim(0.0, 10)}
					/>
					<uiscale Scale={px_binding} />
					<FuzzySearchChoise />
					<SearchResult />
				</frame>
			</frame>
		</screengui>
	);
}
