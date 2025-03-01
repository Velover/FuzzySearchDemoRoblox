import React from "@rbxts/react";
import { FuzzySearchDemoGuiResources } from "client/Resources/FuzzySearchDemoGuiResources";
import { Container } from "../Components/Container";
import { DefaultStroke } from "../Components/DefaultStroke";
import { Header } from "../Components/Header";
import { Paragraph } from "../Components/Paragraph";
import { SubText } from "../Components/SubText";
import { AsciifyCheckMark } from "./AsciifyCheckMark";
import { ScoresList } from "./ScoresList";
import { SearchBar } from "./SearchBar";

export default function SearchResult(): JSX.Element {
	return (
		<frame
			key={"SearchResult"}
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
				<Paragraph Text="@rbxts/asciify" />
				<SubText Text="Improves search for multilanguage strings " />
				<AsciifyCheckMark />
			</Container>
			<Container>
				<Paragraph Text="Search Term" />
				<SearchBar />
			</Container>
			<Container>
				<Header Text="Search Results" />
				<SubText Text="Matches ordered by relevance score" />
			</Container>
			<Container>
				<uiflexitem FlexMode={Enum.UIFlexMode.Fill} />
				<ScoresList />
			</Container>
		</frame>
	);
}
