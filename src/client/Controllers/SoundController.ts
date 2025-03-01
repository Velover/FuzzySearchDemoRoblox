import { SoundService } from "@rbxts/services";

export namespace SoundController {
	const hover_sound_id = "rbxassetid://15675032796";
	const click_sound_id = "rbxassetid://6042053626";

	const click_sound = new Instance("Sound");
	click_sound.SoundId = click_sound_id;

	const hover_sound = new Instance("Sound");
	hover_sound.SoundId = hover_sound_id;

	//hardcoded ahh way
	export function PlayHoverSound() {
		SoundService.PlayLocalSound(hover_sound);
	}

	export function PlayClickSound() {
		SoundService.PlayLocalSound(click_sound);
	}
}
