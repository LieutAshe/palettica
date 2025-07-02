"use client";
import { useColorContext } from "@/app/context/colorContext";
import Image from "next/image";
import { useState, useRef } from "react";

export default function Mockups() {
	const [currentSlide, setCurrentSlide] = useState(0);
	const touchStartX = useRef(0);
	const touchEndX = useRef(0);

	const slides = [
		<div
			key="cards"
			className="flex items-center justify-center w-full space-x-2 p-5 
            lg:p-2 shadow-lg shadow-gray-800 bg-zinc-700
            border rounded-lg rotate-3 sm:rotate-[8deg] scale-75 sm:scale-95 transition-transform duration-500"
		>
			{cardWithImage(0)}
			{cardWithImage(1)}
		</div>,
		<div
			key="buttons"
			className="flex flex-col items-center justify-center w-full space-x-2 p-5 h-full
            shadow-lg shadow-gray-800 bg-zinc-700
            border rounded-lg -rotate-2 sm:-rotate-[4deg] scale-75 sm:scale-95 transition-transform duration-500
            lg:-ml-5
            "
		>
			<div className="flex flex-col items-center justify-center">
				{buttons()}
				{colorLabels()}
				{badges()}
			</div>
		</div>,
		<div
			key="chat-bubbles"
			className="flex items-center justify-center w-full space-x-2 px-5
			p-4
			shadow-lg shadow-gray-800 bg-zinc-700
			border rounded-lg -rotate-2 sm:-rotate-[4deg] scale-75 sm:scale-90 transition-transform duration-500
			"
		>
			{chatBubbles()}
		</div>,
		<div
			key="nav"
			className="flex flex-col items-center justify-between w-full
            p-4 lg:justify-center
            shadow-lg shadow-gray-800 bg-zinc-700
			border rounded-lg scale-75 sm:scale-95 transition-transform duration-500
            "
		>
			{nav()}
            {palettica()}
		</div>,
	];

	const nextSlide = () =>
		setCurrentSlide((prev) => (prev + 1) % slides.length);
	const prevSlide = () =>
		setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

	const handleTouchStart = (e: React.TouchEvent) => {
		touchStartX.current = e.touches[0].clientX;
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchMove = (e: React.TouchEvent) => {
		touchEndX.current = e.touches[0].clientX;
	};

	const handleTouchEnd = () => {
		const delta = touchStartX.current - touchEndX.current;
		if (Math.abs(delta) > 50) {
			delta > 0 ? nextSlide() : prevSlide();
		}
	};

	return (
		<section
			className="bg-zinc-700 h-[50dvh] flex items-center justify-center relative overflow-hidden select-none
                rounded-b-3xl md:rounded-b-2xl lg:rounded-br-none
                lg:fixed lg:rounded-l-xl lg:top-0 lg:right-0 lg:h-full lg:w-[60%] lg:p-8
            "
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
		>
			<div className="hidden lg:grid grid-cols-2 grid-rows-2 gap-4 w-full h-full">
				{slides}
			</div>
			<div
				className="w-full transition-all duration-500 ease-in-out mt-8
                sm:w-4/5 md:w-3/5 lg:w-2/5 xl:w-1/3 2xl:w-1/4
                lg:hidden
            "
			>
				{slides[currentSlide]}
			</div>

			<div
				className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3
                lg:hidden
                "
			>
				{slides.map((_, i) => (
					<button
						key={i}
						onClick={() => setCurrentSlide(i)}
						className={`w-1 h-1 rounded-full ${
							currentSlide === i ? "bg-white" : "bg-gray-400"
						}`}
					/>
				))}
			</div>
		</section>
	);
}

function cardWithImage(pos: number) {
	const { colors, textColor } = useColorContext();
	return (
		<div
			className="shadow-md rounded-lg p-3 w-full shadow-gray-800 h-full"
			style={{ backgroundColor: colors[pos].hex }}
		>
			<img
				src="/person.jpg"
				alt="Mockup"
				className="w-full aspect-square object-cover rounded-lg"
			/>
			<h2
				className="text-lg font-semibold mt-2"
				style={{ color: textColor[0].hex }}
			>
				Card {pos + 1}
			</h2>
			<p
				className="text-sm line-clamp-3 sm:line-clamp-4"
				style={{ color: textColor[1].hex }}
			>
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
				dolorem, labore quaerat, fugit quis quas praesentium nostrum
				explicabo, repellat vel impedit fuga ducimus enim? Modi possimus
				corrupti aspernatur accusantium perspiciatis?
			</p>
		</div>
	);
}

function buttons() {
	const { colors, textColor } = useColorContext();
	return (
		<div className="flex items-center justify-center space-x-2">
			<button
				className="px-4 py-2 rounded-lg transition shadow-md shadow-gray-800"
				style={{
					backgroundColor: colors[0].hex,
					color: textColor[0].hex,
				}}
			>
				Button 1
			</button>
			<button
				className="px-4 py-2 rounded-lg transition shadow-md shadow-gray-800"
				style={{
					backgroundColor: colors[1].hex,
					color: textColor[1].hex,
				}}
			>
				Button 2
			</button>
		</div>
	);
}

function colorLabels() {
	const { colors, textColor } = useColorContext();

	return (
		<div className="flex items-center justify-center space-x-2 mt-4">
			<span
				className="px-3 py-1 text-sm rounded-full shadow-md shadow-gray-800"
				style={{
					backgroundColor: colors[0].hex,
					color: textColor[0].hex,
				}}
			>
				Primary Tag
			</span>
			<span
				className="px-3 py-1 text-sm rounded-full shadow-md shadow-gray-800"
				style={{
					backgroundColor: colors[1].hex,
					color: textColor[1].hex,
				}}
			>
				Accent Tag
			</span>
		</div>
	);
}

function chatBubbles() {
	const { colors, textColor } = useColorContext();

	return (
		<div className="flex flex-col space-y-2 w-full">
			{/* Incoming Message */}
			<div
				className="self-start px-4 py-2 rounded-2xl rounded-bl-none text-sm shadow-md shadow-gray-800"
				style={{
					backgroundColor: colors[1].hex,
					color: textColor[1].hex,
				}}
			>
				Hey there!
			</div>

			{/* Outgoing Message */}
			<div
				className="self-end text-right max-w-3/4 px-2 py-2 rounded-2xl rounded-br-none text-sm shadow-md shadow-gray-800"
				style={{
					backgroundColor: colors[0].hex,
					color: textColor[0].hex,
				}}
			>
				Hello! Your palette looks great!
			</div>

			<div
				className="self-start max-w-4/5 px-4 py-2 rounded-2xl rounded-bl-none text-sm shadow-md shadow-gray-800"
				style={{
					backgroundColor: colors[1].hex,
					color: textColor[1].hex,
				}}
			>
				Thanks! I just love these colors.
			</div>

			<div
				className="self-end text-right max-w-3/4 px-2 py-2 rounded-2xl rounded-br-none text-sm shadow-md shadow-gray-800"
				style={{
					backgroundColor: colors[0].hex,
					color: textColor[0].hex,
				}}
			>
				Me too! They really pop.
			</div>
		</div>
	);
}

function badges() {
	const { colors, textColor } = useColorContext();

	return (
		<div className="flex gap-4 items-center mt-4">
			{/* Notification Badge */}
			<div className="relative">
				<button
					className="rounded-full px-4 py-2 text-sm shadow-md shadow-gray-800"
					style={{
						color: textColor[0].hex,
						backgroundColor: colors[0].hex,
					}}
				>
					Inbox
				</button>
				<span
					className="absolute -top-2 -right-2 px-2 py-0.5 text-xs font-bold rounded-full shadow-md shadow-gray-800"
					style={{
						backgroundColor: colors[1].hex,
						color: textColor[0].hex,
					}}
				>
					5
				</span>
			</div>

			{/* Label Badge */}
			<div
				className="text-xs font-medium px-3 py-1 rounded-full shadow-md shadow-gray-800"
				style={{
					backgroundColor: colors[1].hex,
					color: textColor[1].hex,
				}}
			>
				Featured
			</div>
		</div>
	);
}

function nav() {
	const { colors, textColor } = useColorContext();

	return (
		<nav
			className="flex items-center justify-between p-4 rounded-lg shadow-md
            shadow-gray-800"
			style={{
				backgroundColor: colors[0].hex,
				color: textColor[0].hex,
			}}
		>
			<div className="text-white text-sm lg:text-lg font-bold mr-2">Palettica</div>
			<div className="flex space-x-4 text-sm lg:text-md">
				<button
					className="px-2 py-1 lg:px-3 lg:py-2 rounded-lg transition"
					style={{
						backgroundColor: colors[0].hex,
						color: textColor[0].hex,
					}}
				>
					Home
				</button>
				<button
					className="px-2 py-1 lg:px-3 lg:py-2 rounded-lg transition"
					style={{
						backgroundColor: colors[1].hex,
						color: textColor[1].hex,
					}}
				>
					About
				</button>
			</div>
		</nav>
	);
}

function palettica() {
    const { colors, textColor } = useColorContext();
    return (
        <div
            className="flex items-center justify-center w-fit p-4 m-2 rounded-2xl shadow-md shadow-gray-800"
            style={{ backgroundColor: colors[0].hex, color: textColor[0].hex }}
        >
            <Image src={"/logo.png"} alt="Palettica Logo" width={35} height={35} />
            <h1 className="pl-2 text-base sm:text-lg md:text-xl lg:text-2xl font-bold">Palettica</h1>
        </div>
    );
}