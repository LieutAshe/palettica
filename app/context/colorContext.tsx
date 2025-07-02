'use client';
import { createContext, useContext, useState } from 'react';

export type Color = {
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
        { name: 'Golf Green', hex: '#009b75' },
        { name: 'Valley Hills', hex: '#848a83' },
        { name: 'Limeade', hex: '#5f9727' },
    ]);
    const [textColor, setTextColor] = useState<Color[]>([
        { name: 'Default Text Heading', hex: '#f9fafb' },
        { name: 'Default Text Body', hex: '#e2e8f0' },
    ]);
    const [colorCount, setColorCount] = useState<number>(3);

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