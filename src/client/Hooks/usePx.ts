import { useAsyncEffect, useCamera, useEventListener } from "@rbxts/pretty-react-hooks";
import { useBinding } from "@rbxts/react";

/**
 * @see https://discord.com/channels/476080952636997633/476080952636997635/1146857136358432900
 */
function CalculateScale(viewport: Vector2, base_resolution: Vector2, dominant_axis: number) {
	const width = math.log(viewport.X / base_resolution.X, 2);
	const height = math.log(viewport.Y / base_resolution.Y, 2);
	const centered = width + (height - width) * dominant_axis;

	return 2 ** centered;
}

/**
 * @param dominant_axis 0 - prefer width, 1 - prefer height, defaults to .5
 */
export function usePxBinding(
	base_resolution: Vector2 = new Vector2(1920, 1080),
	dominant_axis: number = 0.5,
	min: number = 0,
) {
	const camera = useCamera();

	const [scale_binding, SetScale] = useBinding(
		CalculateScale(camera.ViewportSize, base_resolution, dominant_axis),
	);

	useEventListener(camera.GetPropertyChangedSignal("ViewportSize"), () => {
		SetScale(math.max(CalculateScale(camera.ViewportSize, base_resolution, dominant_axis), min));
	});

	useAsyncEffect(async () => {
		task.wait(0.5);
		SetScale(math.max(CalculateScale(camera.ViewportSize, base_resolution, dominant_axis), min));
	}, []);

	return scale_binding;
}
