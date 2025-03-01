import { OnStart } from "@flamework/core";
import { Component, BaseComponent } from "@flamework/components";

@Component({
	tag: "Temp",
})
export class Temp extends BaseComponent<{}, Instance> implements OnStart {
	onStart() {
		this.instance.Destroy();
	}
}
