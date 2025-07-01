"use client";
import { useEffect, useState } from "react";
import { useColorContext } from "@/app/context/colorContext";
import {
	getRandomColorPalette,
	getReadableTextColors,
} from "@/app/utils/colors";
import CopyOptionsPopup from "../utils/copy";

export default function ColorGenerator() {
	const { setColors, setColorCount, setTextColor } = useColorContext();

	const [colorsLocal, setColorsLocal] = useState([
		{
			name: "Default Color",
			hex: "#000000",
		},
	]);
	const [colorCount, setColorCountLocal] = useState(3);

	const generateColors = () => {
		const newColors = getRandomColorPalette(colorCount);
		setColorsLocal(newColors);
		setColors(newColors);
		setTextColor(getReadableTextColors(newColors[0].hex));
		fetch("/api/buttonIncrement", {
			method: "POST"
		})
			.then((res) => res.json())
			.then((data) => {
				console.log("Button count updated:", data);
			})
			.catch((error) => {
				console.error("Error updating button count:", error);
			});
	};

	const setColorCounts = (count: number) => {
		setColorCountLocal(count);
		setColorCount(count);
	};

	useEffect(() => {
		generateColors();
	}, []);

	return (
		<section
			className="bg-gray-100
                flex flex-col items-center justify-center  
                fixed bottom-0 left-0 w-full p-6 pt-4 rounded-t-3xl h-[50dvh]"
		>
			<h1 className="text-2xl font-bold text-slate-700">
				Color Generator
			</h1>
			{CopyOptionsPopup()}
			<div className="h-[40dvh] flex flex-wrap max-w-full items-center justify-center space-x-1 m-2 mb-2">
				{colorsLocal.map((color, index) => (
					<div key={index}>
						{colorCard(color.hex, color.name, colorsLocal.length)}
					</div>
				))}
			</div>
			<div className="flex items-center justify-center w-full h-fit space-x-4">
				<ul
					className="flex space-x-3 rounded-lg items-center h-fit
                bg-slate-300 border-1 border-slate-400"
				>
					{Array.from({ length: 4 }, (_, index) => (
						<li
							key={index}
							className={`w-10 h-10 m-0.5 rounded-lg flex items-center justify-center
                                    transition duration-300 ${
										colorCount === index + 2
											? "bg-slate-100 shadow shadow-slate-500"
											: ""
									}`}
							onClick={() => setColorCounts(index + 2)}
						>
							<span className={`text-sm text-slate-800`}>
								{index + 2}
							</span>
						</li>
					))}
				</ul>
				<button
					className="bg-slate-800 text-slate-100 font-bold py-2 px-4 rounded border-0
                        hover:bg-slate-700 hover:text-slate-200 transition duration-300 hover:scale-95"
					type="button"
					onClick={generateColors}
				>
					<span className="hidden sm:block">Generate Colors</span>
					<span className="block sm:hidden">Generate</span>
				</button>
			</div>
		</section>
	);
}

function colorCard(color: string, name: string, count: number) {
	const hexColor = color.includes("#") ? color : `#${color}`;
	return (
		<div className="h-24 w-22 rounded-lg text-center flex flex-col items-center gap-2">
			<div
				className={`w-20 rounded-lg ${
					count > 3 ? `h-10` : `h-20 aspect-square`
				}`}
				style={{ backgroundColor: hexColor }}
			/>
			<div className="text-slate-800 text-xs leading-tight">
				<div className="font-medium">{hexColor}</div>
				<div className="text-[0.9rem]">{name}</div>
			</div>
		</div>
	);
}
