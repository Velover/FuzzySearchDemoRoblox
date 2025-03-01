import React from "@rbxts/react";
import { useAtom } from "@rbxts/react-charm";
import { FuzzySearchDemoGuiController } from "client/Controllers/FuzzySearchDemoGuiController";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";
import { Container } from "../Components/Container";
import { DefaultStroke } from "../Components/DefaultStroke";
import { DropDownMenu } from "../Components/DropDownMenu";
import { Header } from "../Components/Header";
import { Paragraph } from "../Components/Paragraph";
import { SubText } from "../Components/SubText";
import { NGramTextBox } from "./NGramTextBox";
import { StringsInput } from "./StringsInput";
import { StringsList } from "./StringsList";

export default function FuzzySearchChoise(): JSX.Element {
	const selected_algorithm = useAtom(FuzzySearchDemoGuiController.GetSelectedAlgorithmAtom);
	const selected_tokenization = useAtom(FuzzySearchDemoGuiController.GetSelectedTokenizationAtom);

	const is_tokenization_required = useAtom(FuzzySearchDemoGuiController.IsTokenizationRequiredAtom);
	const is_n_required = useAtom(FuzzySearchDemoGuiController.IsNRequiredAtom);

	// const []
	return (
		<frame
			key={"FuzzySearchChoise"}
			BackgroundColor3={FuzzySearchDemoGuiResources.BACKGROUND_COLOR}
			BorderSizePixel={0}
			Size={UDim2.fromScale(1.0, 1.0)}
		>
			<uicorner />
			<uilistlayout SortOrder={Enum.SortOrder.LayoutOrder} Padding={new UDim(0.0, 15)} />
			<uipadding
				PaddingBottom={new UDim(0.0, 25)}
				PaddingLeft={new UDim(0.0, 25)}
				PaddingRight={new UDim(0.0, 25)}
				PaddingTop={new UDim(0.0, 25)}
			/>
			<DefaultStroke />
			<uiflexitem FlexMode={Enum.UIFlexMode.Fill} />
			<Container>
				<Header Text="Fuzzy Search Demo" />
				<SubText Text="Test different fuzzy search algorithms on your data" />
			</Container>
			<Container>
				<Paragraph Text="Search Algorithm" />
				<DropDownMenu
					SetChoise={FuzzySearchDemoGuiController.SetAlgorithm}
					SelectedValue={selected_algorithm}
					Choises={FuzzySearchDemoGuiController.GetAlgorithms()}
				/>
			</Container>
			<Container Visible={is_tokenization_required}>
				<Paragraph Text="Tokenization" />
				<DropDownMenu
					SetChoise={FuzzySearchDemoGuiController.SetTokenization}
					SelectedValue={selected_tokenization}
					Choises={FuzzySearchDemoGuiController.GetTokenizations()}
				/>
			</Container>
			<Container Visible={is_n_required}>
				<Paragraph Text="NGram (default n = 3)" />
				<NGramTextBox />
			</Container>

			<Container>
				<Header Text="Strings to Search" />
				<StringsInput />
			</Container>
			<Container>
				<uiflexitem FlexMode={Enum.UIFlexMode.Fill} />
				<StringsList />
			</Container>
		</frame>
	);
}
