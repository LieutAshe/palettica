import colorNames from "@/data/color-names.json";

type Color = {
    name: string;
    hex: string;
};

const getLuminance = (hex: string): number => {
  const c = hex.replace('#', '');
  const rgb = [
    parseInt(c.slice(0, 2), 16) / 255,
    parseInt(c.slice(2, 4), 16) / 255,
    parseInt(c.slice(4, 6), 16) / 255,
  ].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));

  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2];
};

function shuffle<T>(array: T[]): T[] {
  return array
    .map((a) => [a, Math.random()] as const)
    .sort((a, b) => a[1] - b[1])
    .map(([a]) => a);
}

export function getRandomColorPalette(count: number): Color[] {
  if (count <= 0) return [];

  //Base color
  const baseIndex = Math.floor(Math.random() * colorNames.length);
  const baseColor = colorNames[baseIndex];
  const baseLuminance = getLuminance(baseColor.hex);

  // 2️⃣ Filter + sort colors by luminance similarity or contrast
  const palette = colorNames
    .filter((c, i) => i !== baseIndex) // avoid repeating base color
    .map((c) => ({
      ...c,
      diff: Math.abs(getLuminance(c.hex) - baseLuminance),
    }))
    .sort((a, b) => a.diff - b.diff); // small diff = similar; large = contrast

  // 3️⃣ You can customize selection strategy:
  // 👉 For harmonious palette, take colors with close luminance
  // 👉 For bold/contrast palette, pick from farther end of sorted array
  const relatedColors = shuffle(palette.slice(0, 20)).slice(0, count - 1);

  return [baseColor, ...relatedColors];
}

export function getReadableTextColors(
    bgHex: string
): { name: string; hex: string }[] {
    const hex = bgHex.replace("#", "");

    const r = parseInt(hex.substring(0, 2), 16) / 255;
    const g = parseInt(hex.substring(2, 4), 16) / 255;
    const b = parseInt(hex.substring(4, 6), 16) / 255;

    const [R, G, B] = [r, g, b].map((c) =>
        c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    );

    const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

    const isLightBg = luminance > 0.5;

    // You can customize these colors to match your theme
    const headingColor = isLightBg ? "#0f172a" : "#f9fafb"; // slate-900 or slate-50
    const bodyColor = isLightBg ? "#334155" : "#e2e8f0"; // slate-700 or slate-200

    return [
        { name: "Auto Text Heading", hex: headingColor },
        { name: "Auto Text Body", hex: bodyColor },
    ];
}