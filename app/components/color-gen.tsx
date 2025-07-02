"use client";
import { useEffect, useState } from "react";
import { useColorContext, Color } from "@/app/context/colorContext";
import {
	getRandomColorPalette,
	getReadableTextColors,
} from "@/app/utils/colors";
import CopyOptionsPopup from "../utils/copy";
import Copy from "./copy";

export default function ColorGenerator() {
	const {
		setColors,
		setColorCount,
		setTextColor,
		colorCount,
		colors,
		textColor,
	} = useColorContext();

	const generateColors = () => {
		const newColors = getRandomColorPalette(colorCount);
		setColors(newColors);
		setTextColor(getReadableTextColors(newColors[0].hex));
		fetch("/api/buttonIncrement", {
			method: "POST",
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
		setColorCount(count);
	};

	return (
		<section
			className="bg-gray-200
                flex items-center justify-center  
                fixed bottom-0 left-0 w-full p-6 pt-4 rounded-t-3xl h-[50dvh]
				md:rounded-t-2xl 
				lg:rounded-t-none lg:rounded-r-xl
				lg:top-0 lg:left-0 lg:h-full lg:w-[40%] lg:p-0 lg:px-2
				lg:flex-col
				"
			>
			<div className="sm:hidden">
				<CopyOptionsPopup />
			</div>
			<div className="flex flex-col items-center justify-center w-full h-full mx-auto
				sm:w-[50%]
				lg:w-auto lg:h-[50dvh] lg:mt-14 lg:mb-2 lg:p-2
			">
				<h1 className="text-2xl font-bold text-slate-700">
					Color Generator
				</h1>
				<ColorCard colors={colors} />
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
			</div>
			<div className="hidden sm:block w-[50%] h-full
				lg:w-full lg:m-2 lg:h-[40dvh]
			">
				<Copy />
			</div>
		</section>
	);
}

interface ColorCardProps {
	colors: Color[];
}

function ColorCard({ colors }: ColorCardProps) {
	return (
		<div
			className="h-full w-full flex flex-wrap 
		items-center justify-center content-center
		m-1"
		>
			<div className="flex flex-wrap justify-center">
				{colors.map((color) => (
					<div
						key={color.name}
						className={`
					${colors.length > 3 ? `h-[50%]` : `h-[90%]`}
					w-22 rounded-lg text-center 
					flex flex-col items-center gap-2`}
					>
						<div
							className={`w-20 rounded-lg ${
								colors.length > 3
									? `h-10 lg:h-20`
									: `h-20 aspect-square`
							}`}
							style={{ backgroundColor: color.hex }}
						/>
						<div className="text-slate-800 text-xs leading-tight">
							<div
								className={`${
									colors.length > 3 ? `text-xs` : `text-sm`
								}`}
							>
								{color.hex}
							</div>
							<div
								className={`${
									colors.length > 3 ? `text-xs` : `text-sm`
								}`}
							>
								{color.name}
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
