import React from "@rbxts/react";
import { PropsWithChildren } from "@rbxts/react";

export function HorizontalContainer(props: PropsWithChildren): JSX.Element {
	return (
		<frame BackgroundTransparency={1} BorderSizePixel={0} Size={new UDim2(1.0, 0, 0.0, 50)}>
			<uilistlayout
				FillDirection={Enum.FillDirection.Horizontal}
				SortOrder={Enum.SortOrder.LayoutOrder}
				Padding={new UDim(0.0, 20)}
			/>
			{props.children}
		</frame>
	);
}
