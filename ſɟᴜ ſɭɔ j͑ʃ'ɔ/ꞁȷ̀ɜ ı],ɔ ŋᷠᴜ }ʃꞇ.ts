// ≺⧼ Type Definitions ⧽≻

// ⟨ Globals loaded from external scripts at krhitlashi.github.io ⟩
// These functions are set on window by the hosted script bundle from the original
// project (ſɟᴜ ſɭɔ j͑ʃ'ɔ/), loaded at runtime via <script> tags in the HTML.
declare global {
    interface Window {
        vab6caja: (n: number) => string;
        castifeh2: (d: Date) => { she: number; qe: number; he: number };
        kf2Cax2lStafl2: (d: Date) => string;
        k2regawe: (lang: string) => void;
    }
}

export interface CustomHTMLElement extends HTMLElement {
    _isResizing?: boolean;
}

export interface AppData {
    name: string;
    icon: string;
    app: string;
}

export interface IconGridConfig {
    rows?: number;
    cols?: number;
    centered?: boolean;
    bottomUp?: boolean;
    width?: number;
    height?: number;
    labelMode?: string;
}
