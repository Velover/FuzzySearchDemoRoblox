import React from "@rbxts/react";
import { useAtom } from "@rbxts/react-charm";
import { FuzzySearchDemoGuiController } from "client/Controllers/FuzzySearchDemoGuiController";
import { CheckMark } from "../Components/CheckMark";

export function AsciifyCheckMark() {
	const is_asciify_enabled = useAtom(FuzzySearchDemoGuiController.IsAsciifyEnabledAtom);
	return (
		<CheckMark
			key={"AsciifyCheckmark"}
			Value={is_asciify_enabled}
			SetValue={FuzzySearchDemoGuiController.SetAsciifyEnabled}
		/>
	);
}
