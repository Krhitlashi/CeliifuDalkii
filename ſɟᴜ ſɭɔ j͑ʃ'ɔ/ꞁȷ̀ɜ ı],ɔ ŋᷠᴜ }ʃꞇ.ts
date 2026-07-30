// ≺⧼ Tipaj Difinoj ⧽≻

// ⟨ Tutmondaĵoj ŝargitaj el eksteraj skriptoj ĉe krhitlashi.github.io ⟩
// Ĉi tiuj funkcioj estas agorditaj sur fenestro per la gastigita skripta pakaĵo el la originala
// projekto ( ſɟᴜ ſɭɔ j͑ʃ'ɔ/ ), ŝargita rultempe per <script> etikedoj en la HTML.
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
