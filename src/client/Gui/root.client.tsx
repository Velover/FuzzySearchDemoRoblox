import { createPortal, createRoot } from "@rbxts/react-roblox";
import FuzzySearchDemoGui from "./FuzzySearchDemoGui";
import React, { StrictMode } from "@rbxts/react";
import { Players } from "@rbxts/services";

function App() {
	return <FuzzySearchDemoGui />;
}
const root = createRoot(new Instance("Folder"));
root.render(
	<StrictMode>{createPortal(<App />, Players.LocalPlayer.WaitForChild("PlayerGui"))}</StrictMode>,
);
