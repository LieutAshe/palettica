"use client";
import { useState } from "react";
import { useColorContext } from "@/app/context/colorContext";

export default function CopyOptionsPopup() {
    const [open, setOpen] = useState(false);
    const { colors, textColor } = useColorContext();

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        setOpen(false);
    };

    const generateCSSVariables = () => {
        let cssVars = colors
            .map((c, i) => `--color-${i + 1}: ${c.hex}; // ${c.name}`)
            .join("\n");
        cssVars += `\n--text-color-heading: ${textColor[0].hex};\n--text-color-body: ${textColor[1].hex};`;
        return cssVars;
    };

    const generateHexList = () => {
        let hextList = colors.map((c) => c.hex).join(", ");
        hextList += `, ${textColor[0].hex}, ${textColor[1].hex}`;
        return hextList;
    };

    const generateJSON = () => {
        let jsonColors = colors.map(({ name, hex }) => ({ name, hex }));
        jsonColors.push(
            { name: "Text Heading Color", hex: textColor[0].hex },
            { name: "Text Body Color", hex: textColor[1].hex }
        );
        return JSON.stringify(
            jsonColors,
            null,
            2
        );
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
                        onClick={() => copyToClipboard(generateCSSVariables())}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Copy as CSS Variables
                    </button>
                    <button
                        onClick={() => copyToClipboard(generateHexList())}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Copy HEX Values
                    </button>
                    <button
                        onClick={() => copyToClipboard(generateJSON())}
                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Copy as JSON
                    </button>
                </div>
            )}
        </div>
    );
}
