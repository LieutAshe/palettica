import { Color } from "../context/colorContext";

export const generateCSSVariables = (colors: Color[], textColor: Color[]) => {
	let cssVars = colors
		.map((c, i) => `--color-${i + 1}: ${c.hex}; // ${c.name}`)
		.join("\n");
	cssVars += `\n--text-color-heading: ${textColor[0].hex};\n--text-color-body: ${textColor[1].hex};`;
	return cssVars;
};

export const generateHexList = (colors: Color[], textColor: Color[]) => {
	let hextList = colors.map((c) => c.hex).join(", ");
	hextList += `, ${textColor[0].hex}, ${textColor[1].hex}`;
	return hextList;
};

export const generateJSON = (colors: Color[], textColor: Color[]) => {
	let jsonColors = colors.map(({ name, hex }) => ({ name, hex }));
	jsonColors.push(
		{ name: "Text Heading Color", hex: textColor[0].hex },
		{ name: "Text Body Color", hex: textColor[1].hex }
	);
	return JSON.stringify(jsonColors, null, 2);
};
