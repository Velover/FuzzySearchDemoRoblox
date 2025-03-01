import React, { PropsWithChildren } from "@rbxts/react";

export function Container(props: PropsWithChildren<{ Visible?: boolean }>) {
	return (
		<frame
			Visible={props.Visible}
			AutomaticSize={Enum.AutomaticSize.Y}
			BackgroundTransparency={1}
			BorderSizePixel={0}
			Size={UDim2.fromScale(1.0, 0.0)}
		>
			<uilistlayout SortOrder={Enum.SortOrder.LayoutOrder} />
			{props.children}
		</frame>
	);
}
