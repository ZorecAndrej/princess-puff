/**
 * Accessibility check for color contrast ratios
 * Verifies WCAG AA compliance (4.5:1 for normal text, 3:1 for large text)
 */

interface ColorPair {
  foreground: string;
  background: string;
  name: string;
  largeText?: boolean;
}

// Convert hex to RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : { r: 0, g: 0, b: 0 };
}

// Calculate relative luminance
function getLuminance(rgb: { r: number; g: number; b: number }): number {
  const { r, g, b } = rgb;
  const rsRGB = r / 255;
  const gsRGB = g / 255;
  const bsRGB = b / 255;

  const r2 = rsRGB <= 0.03928 ? rsRGB / 12.92 : Math.pow((rsRGB + 0.055) / 1.055, 2.4);
  const g2 = gsRGB <= 0.03928 ? gsRGB / 12.92 : Math.pow((gsRGB + 0.055) / 1.055, 2.4);
  const b2 = bsRGB <= 0.03928 ? bsRGB / 12.92 : Math.pow((bsRGB + 0.055) / 1.055, 2.4);

  return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
}

// Calculate contrast ratio
function getContrastRatio(color1: string, color2: string): number {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const lum1 = getLuminance(rgb1);
  const lum2 = getLuminance(rgb2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

// Princess Puff color combinations to test
const colorPairs: ColorPair[] = [
  // Primary combinations
  { foreground: '#000000', background: '#FFFFFF', name: 'Black on White' },
  { foreground: '#FFFFFF', background: '#000000', name: 'White on Black' },
  { foreground: '#D4A574', background: '#000000', name: 'Gold on Black' },
  { foreground: '#D4A574', background: '#FFFFFF', name: 'Gold on White' },
  { foreground: '#000000', background: '#D4A574', name: 'Black on Gold' },
  { foreground: '#FFFFFF', background: '#D4A574', name: 'White on Gold' },

  // Gray combinations
  { foreground: '#CCCCCC', background: '#000000', name: 'Gray on Black' },
  { foreground: '#CCCCCC', background: '#FFFFFF', name: 'Gray on White' },
  { foreground: '#000000', background: '#CCCCCC', name: 'Black on Gray' },

  // Error/Success states
  { foreground: '#EF4444', background: '#FFFFFF', name: 'Error on White' },
  { foreground: '#EF4444', background: '#000000', name: 'Error on Black' },
  { foreground: '#10B981', background: '#FFFFFF', name: 'Success on White' },
  { foreground: '#10B981', background: '#000000', name: 'Success on Black' },

  // Button states
  { foreground: '#000000', background: '#D4A574', name: 'Primary Button (Black on Gold)' },
  { foreground: '#D4A574', background: '#000000', name: 'Secondary Button (Gold on Black)' },
];

// Check all color combinations
export function checkAccessibility() {
  console.log('Princess Puff Accessibility Check - WCAG AA Compliance\n');
  console.log('Required ratios: 4.5:1 (normal text), 3:1 (large text)\n');

  let allPassed = true;

  colorPairs.forEach((pair) => {
    const ratio = getContrastRatio(pair.foreground, pair.background);
    const requiredRatio = pair.largeText ? 3.0 : 4.5;
    const passes = ratio >= requiredRatio;

    if (!passes) allPassed = false;

    console.log(`${pair.name}: ${ratio.toFixed(2)}:1 - ${passes ? '✅ PASS' : '❌ FAIL'}`);
  });

  console.log(
    '\n' +
      (allPassed
        ? '✅ All color combinations pass WCAG AA!'
        : '❌ Some combinations need adjustment.')
  );

  return allPassed;
}

// Run the check if this file is executed directly
if (require.main === module) {
  checkAccessibility();
}
