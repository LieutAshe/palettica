import { useEffect, useState } from "react";
import {
	generateCSSVariables,
	generateHexList,
	generateJSON,
} from "../utils/copyValues";
import { useColorContext } from "../context/colorContext";
import { set } from "mongoose";

export default function Copy() {
	const { colors, textColor } = useColorContext();
	const [cssVars, setCssVars] = useState("");
	const [hexList, setHexList] = useState("");
	const [json, setJson] = useState("");
	const [code, setCode] = useState("");
	const [codeType, setCodeType] = useState("css");
	const [coloredCode, setColoredCode] = useState(<></>);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
	};

	const resetToCSS = () => {
		console.log("Resetting to CSS");
		const css = generateCSSVariables(colors, textColor);
		setCssVars(css);
		setCodeType("");
        handleCodeTypeChange("css", css);
	};

	const handleCodeTypeChange = (paramCodeType?: string, paramCss?: string) => {
		const paramcodeType = paramCodeType || codeType;
        const css = paramCss || cssVars;
        switch (paramcodeType) {
			case "hex":
				setColoredCode(colorizeCode(hexList, "hex"));
                setCode(hexList);
				break;
			case "json":
				setColoredCode(colorizeCode(json, "json"));
                setCode(json);
				break;
			case "css":
			default:
				setColoredCode(colorizeCode(css, "css"));
                setCode(css);
				break;
		}
	};

	useEffect(() => {
		setHexList(generateHexList(colors, textColor));
		setJson(generateJSON(colors, textColor));
		resetToCSS();
	}, [colors, textColor]);

	useEffect(() => {
        handleCodeTypeChange();
    }, [codeType]);

	const colorizeCode = (code: string, codeType: string) => {
		const lines = code.trim().split("\n");

		if (codeType === "css" || codeType === "json") {
			return (
				<>
					{lines.map((line, index) => {
						const match = line.match(/#(?:[0-9a-fA-F]{6})/);
						if (match) {
							const color = match[0];
							return (
								<div
									key={index}
                                    className="flex items-center gap-2"
									style={{ fontFamily: "monospace" }}
								>
									<div className="h-4 w-4 border border-gray-50 rounded-lg" style={{backgroundColor: color}}></div>{line}
								</div>
							);
						}
						return (
							<div
								key={index}
								style={{ fontFamily: "monospace" }}
							>
								{line}
							</div>
						);
					})}
				</>
			);
		}

		if (codeType === "hex") {
			return (
				<div style={{ fontFamily: "monospace" }}>
					{lines.map((line, lineIdx) => {
						const colors = line
							.split(",")
							.map((color) => color.trim())
							.filter(Boolean);
						return (
							<span key={lineIdx}>
								{colors.map((hex, i) => {
									if (/^#(?:[0-9a-fA-F]{6})$/.test(hex)) {
										return (
											<div
												key={i}
                                                className="inline-flex items-center gap-2"
												style={{
													marginRight:
														i < colors.length - 1
															? 8
															: 0,
												}}
											>
												<div className="h-4 w-4 border border-gray-50 rounded-lg" style={{backgroundColor: hex}}></div>{hex}
												{i < colors.length - 1
													? ","
													: ""}
											</div>
										);
									}
									return null;
								})}
							</span>
						);
					})}
				</div>
			);
		}

		return <div>Unsupported code type</div>;
	};

	return (
		<section className="h-full w-full bg-gray-800 rounded-lg border-2 border-gray-600 p-4 flex flex-col items-center justify-center relative">
			<ul className="w-full absolute top-0 left-0 flex">
				<li>
					<button
						onClick={() => {
							setCodeType("css");
						}}
						className="w-fit text-left px-4 py-2 hover:bg-gray-900 bg-gray-700 text-white"
					>
						CSS
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							setCodeType("hex");
						}}
						className="w-fit text-left px-4 py-2 hover:bg-gray-900 bg-gray-700 text-white"
					>
						Hex
					</button>
				</li>
				<li>
					<button
						onClick={() => {
							setCodeType("json");
						}}
						className="w-fit text-left px-4 py-2 hover:bg-gray-900 bg-gray-700 text-white"
					>
						JSON
					</button>
				</li>
				<li className="ml-auto">
					<button
						onClick={() => {
							copyToClipboard(code);
						}}
						className="w-fit text-left px-4 py-2 hover:bg-gray-900 bg-gray-700 text-white"
					>
						Copy
					</button>
				</li>
			</ul>
			<div className="w-full h-full overflow-y-auto mt-7">
				<pre className="text-white whitespace-pre-wrap break-words p-2">
					<code>{coloredCode}</code>
				</pre>
			</div>
		</section>
	);
}
