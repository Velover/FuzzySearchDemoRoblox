import React from "@rbxts/react";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";

export function DefaultStroke() {
	return (
		<uistroke
			ApplyStrokeMode={Enum.ApplyStrokeMode.Border}
			Color={FuzzySearchDemoGuiResources.STROKE_COLOR}
			Thickness={2}
		/>
	);
}
