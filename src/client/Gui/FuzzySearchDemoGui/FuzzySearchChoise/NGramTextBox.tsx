import React from "@rbxts/react";
import { Input } from "../Components/Input";
import { useAtom } from "@rbxts/react-charm";
import { FuzzySearchDemoGuiController } from "client/Controllers/FuzzySearchDemoGuiController";

export function NGramTextBox(): JSX.Element {
	const selected_n = useAtom(FuzzySearchDemoGuiController.GetSelectedNAtom);
	return (
		<Input
			PlaceholderText={"3"}
			Text={`${selected_n}`}
			SetText={(value: string) => {
				const n = tonumber(value.match("%d+")[0]);
				if (n === undefined) return;
				FuzzySearchDemoGuiController.SetN(n);
			}}
		/>
	);
}
