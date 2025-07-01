'use client';
import { createContext, useContext, useState } from 'react';

type Color = {
    name: string;
    hex: string;
};

type ColorContextType = {
    colors: Color[];
    setColors: (colors: Color[]) => void;
    textColor: Color[];
    setTextColor: (colors: Color[]) => void;
    colorCount: number;
    setColorCount: (count: number) => void;
};

const ColorContext = createContext<ColorContextType | undefined>(undefined);

export const ColorProvider = ({ children }: { children: React.ReactNode }) => {
    const [colors, setColors] = useState<Color[]>([
        { name: 'Default Red', hex: '#ff0000' },
        { name: 'Default Green', hex: '#00ff00' },
        { name: 'Default Blue', hex: '#0000ff' },
    ]);
    const [textColor, setTextColor] = useState<Color[]>([
        { name: 'Default Text Heading', hex: '#030712' },
        { name: 'Default Text Body', hex: '#101828 ' },
    ]);
    const [colorCount, setColorCount] = useState<number>(0);

    return (
        <ColorContext.Provider value={{ colors, setColors, colorCount, setColorCount, textColor, setTextColor }}>
            {children}
        </ColorContext.Provider>
    );
};

export const useColorContext = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error('useColorContext must be used within a ColorProvider');
    }
    return context;
};