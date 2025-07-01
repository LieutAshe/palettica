"use client";
import { useColorContext } from "@/app/context/colorContext";
import { useState, useRef } from "react";

export default function Mockups() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const slides = [
        <div
            key="cards"
            className="flex items-center justify-center w-full h-4/5 space-x-2 px-5 pt-10"
        >
            {cardWithImage(0)}
            {cardWithImage(1)}
        </div>,
        <div
            key="buttons"
            className="flex flex-col items-center justify-center w-full h-4/5 space-x-2 px-5"
        >
            <div className="flex flex-col items-center justify-center">
            {buttons()}
            {colorLabels()}
            {badges()}
            </div>

        </div>,
        <div
            key="chat-bubbles"
            className="flex items-center justify-center w-full h-4/5 space-x-2 px-5 pt-10"
        >
            {chatBubbles()}
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
            className="bg-zinc-700 h-[50dvh] rounded-b-3xl flex items-center justify-center relative overflow-hidden select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="w-full transition-all duration-500 ease-in-out">
                {slides[currentSlide]}
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-3">
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

            <button
                onClick={prevSlide}
                className="hidden md:flex items-center justify-center absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-black rounded-full shadow"
                aria-label="Previous"
            >
                ‹
            </button>
            <button
                onClick={nextSlide}
                className="hidden md:flex items-center justify-center absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-white text-black rounded-full shadow"
                aria-label="Next"
            >
                ›
            </button>
        </section>
    );
}

function cardWithImage(pos: number) {
    const { colors, textColor } = useColorContext();
    return (
        <div
            className="shadow-md rounded-lg p-3 w-full shadow-gray-800"
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
                className="text-sm line-clamp-4"
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
        <div className="flex items-center justify-center space-x-2 mt-4">
            <button
                className="px-4 py-2 rounded-lg transition"
                style={{
                    backgroundColor: colors[0].hex,
                    color: textColor[0].hex,
                }}
            >
                Button 1
            </button>
            <button
                className="px-4 py-2 rounded-lg transition"
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
                className="px-3 py-1 text-sm rounded-full"
                style={{
                    backgroundColor: colors[0].hex,
                    color: textColor[0].hex,
                }}
            >
                Primary Tag
            </span>
            <span
                className="px-3 py-1 text-sm rounded-full"
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
        <div className="flex flex-col space-y-3">
            {/* Incoming Message */}
            <div
                className="self-start px-4 py-2 rounded-2xl rounded-bl-none text-sm shadow-md"
                style={{
                    backgroundColor: colors[1].hex,
                    color: textColor[1].hex,
                }}
            >
                Hey there!
            </div>

            {/* Outgoing Message */}
            <div
                className="self-end max-w-3/4 px-4 py-2 rounded-2xl rounded-br-none text-sm shadow-md"
                style={{
                    backgroundColor: colors[0].hex,
                    color: textColor[0].hex,
                }}
            >
                Hello! Your palette looks great!
            </div>

            <div
                className="self-start max-w-3/4 px-4 py-2 rounded-2xl rounded-bl-none text-sm shadow-md"
                style={{
                    backgroundColor: colors[1].hex,
                    color: textColor[1].hex,
                }}
            >
                Thanks! I just love these colors.
            </div>

            <div
                className="self-end max-w-3/4 px-4 py-2 rounded-2xl rounded-br-none text-sm shadow-md"
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
                <button className="rounded-full px-4 py-2 text-sm shadow-md shadow-gray-800"
                    style={{color: textColor[0].hex, backgroundColor: colors[0].hex}}
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
