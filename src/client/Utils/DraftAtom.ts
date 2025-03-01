import { Atom } from "@rbxts/charm";
import Immut from "@rbxts/immut";
import { Draft } from "@rbxts/immut/src/types-external";

export default function DraftAtom<T>(
	atom: Atom<T>,
	callback: (draft: Draft<T>) => Draft<T> | void,
) {
	atom((previous_data: T) => {
		return Immut.produce(previous_data, callback);
	});
}
