"use client";
import { useState } from "react";
import { useColorContext } from "@/app/context/colorContext";
import {
    generateCSSVariables,
    generateHexList,
    generateJSON,
} from "@/app/utils/copyValues";

export default function CopyOptionsPopup() {
    const [open, setOpen] = useState(false);
    const { colors, textColor } = useColorContext();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setOpen(false);
    };

    return (
        <div className="absolute top-2 right-2 z-50">
            {/* Trigger Icon */}
            <div
                onClick={() => setOpen((prev) => !prev)}
                className="cursor-pointer p-1 rounded-md bg-white/70 hover:bg-white transition text-gray-800 hover:text-black shadow"
            >
                📋
            </div>

            {/* Popup Menu */}
            {open && (
                <div
                    className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg text-sm border border-gray-200 animate-fade-in
          text-gray-800
        "
                >
                    <button
                        onClick={() => copyToClipboard(generateCSSVariables(colors, textColor))}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Copy as CSS Variables
                    </button>
                    <button
                        onClick={() => copyToClipboard(generateHexList(colors, textColor))}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Copy HEX Values
                    </button>
                    <button
                        onClick={() => copyToClipboard(generateJSON(colors, textColor))}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Copy as JSON
                    </button>
                </div>
            )}
        </div>
    );
}
