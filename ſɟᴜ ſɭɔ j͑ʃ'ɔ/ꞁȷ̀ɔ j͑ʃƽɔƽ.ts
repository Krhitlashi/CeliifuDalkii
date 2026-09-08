// ≺⧼ Konstantoj ⧽≻

// ⟪ Piktogramaj Koloroj ⟫ - la ĉefa piktograma koloro por ĉiu aplikaĵo ( #nmnmnm paletro )

const PiktogramajKoloroj: { [ŝlosilo: string]: string } = {
    Retumilo: "#0868E8",
    Notoj: "#C88808",
    Agordoj: "#586878",
    Terminalo: "#08A838",
    Ŝlosilaro: "#6858E8",
    Cafalkefu: "#A86828",
    Mapo: "#28A848",
    Kalkulilo: "#E87808",
    Puzlo: "#E84898",
    Desegnilo: "#D83848",
    Libro: "#2858A8",
    Defaŭlta: "#687078"
};

// ⟪ SVG Piktogramoj ⟫ - glaifaj piktogramoj ( 24x24 ) por ĉiuj aplikaĵoj
// Nur la glifo mem estas en la SVG ( strekita per la ĉefa piktograma koloro ) —
// la duontravidebla fono estas kuirata de akiriPiktogramanFonon ( ) super la karto

const Piktogramoj: { [ŝlosilo: string]: string } = {
    Retumilo: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Retumilo}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18"/></svg>`,
    Notoj: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Notoj}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z"/><path d="M14 3v5h5"/><path d="M9 13h6"/><path d="M9 17h4"/></svg>`,
    Agordoj: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Agordoj}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>`,
    Terminalo: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Terminalo}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m7 9 3 3-3 3"/><path d="M13 15h4"/></svg>`,
    Ŝlosilaro: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Ŝlosilaro}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="2"/><path d="M7 10h.01"/><path d="M12 10h.01"/><path d="M17 10h.01"/><path d="M8 14h8"/></svg>`,
    Cafalkefu: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Cafalkefu}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17V5a2 2 0 0 0-2-2H4"/><path d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"/></svg>`,
    Mapo: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Mapo}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2-6-2Z"/><path d="M9 4v14"/><path d="M15 6v14"/></svg>`,
    Kalkulilo: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Kalkulilo}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 7h6"/><path d="M8 12h.01"/><path d="M12 12h.01"/><path d="M16 12h.01"/><path d="M8 16h.01"/><path d="M12 16h.01"/><path d="M16 16h.01"/></svg>`,
    Puzlo: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Puzlo}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 9h4a3 3 0 1 1 6 0h4v4a2 2 0 1 1 0 4v2H5Z"/></svg>`,
    Desegnilo: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Desegnilo}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9.06 11.9 8.07-8.06a2.85 2.85 0 1 1 4.03 4.03l-8.06 8.08"/><path d="M7.07 14.94c-1.66 0-3 1.35-3 3.02 0 1.33-2.5 1.52-2 2.02 1.08 1.1 2.49 2.02 4 2.02 2.2 0 4-1.8 4-4.04a3.01 3.01 0 0 0-3-3.02Z"/></svg>`,
    Libro: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Libro}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/></svg>`,
    Hejmo: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 14.5 6-6 6 6"/></svg>`,
    Defaŭlta: `<svg viewBox="0 0 24 24" fill="none" stroke="${PiktogramajKoloroj.Defaŭlta}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/></svg>`
};

// ⟪ Akiri Piktograman Fonon ⟫ - anstataŭ fiksi la fonon rekte en la SVG, ĉi tiu
// funkcio redonas plenan overlajon ( opakeco 2/8 ) de la ĉefa koloro, kiu
// etendiĝas super la tutan kartan fonon de la kahela butono

function akiriPiktogramanFonon(koloro: string): string {
    const overlajho = `color-mix(in srgb, ${koloro} 25%, transparent)`;
    return `linear-gradient(${overlajho}, ${overlajho})`;
}

// ⟪ Akiri Piktogramon ⟫ - redonas la SVG-on por ŝlosilo aŭ la defaŭltan piktogramon

function akiriPiktogramon(ŝlosilo: string): string {
    return Piktogramoj[ŝlosilo] || Piktogramoj.Defaŭlta;
}

// Alkroĉi CONSTANTS al fenestro por tutmonda aliro
(window as any).CONSTANTS = {
    // ⟨ Fenestra Administranto ⟩
    WM: {
        BASE_Z_INDEX: 0o200,
        WINDOW_RANDOM_RANGE: 0o30,
        WINDOW_RANDOM_STEP: 0o10,
        WINDOW_BASE_X: 0o200,
        WINDOW_BASE_Y_CREATE: 0o40,
        WINDOW_BASE_Y_LOAD: 0o40,
        RESIZE_BASE: 0o10,
        TASKBAR_LARGE_THRESHOLD: 0o100,
        TASKBAR_REPOSITION_DELAY: 0o4
    },

    // ⟨ Sistemo ⟩
    SYS: {
        SWIPE_THRESHOLD: 0o200,
        TASKBAR_SIZE: 0o100,
        MARGIN: 0o20,
        DOCK_MARGIN: 0o10,
        BRIGHTNESS_MAX: 0o200,
        BRIGHTNESS_BUFFER: 0o300
    },

    // ⟨ Labortabla Piktograma Administranto ⟩
    DIM: {
        DEFAULT_ROWS: 0o6,       // 6 — aperas vertikale ( la temo estas sideways )
        DEFAULT_COLS: 0o10,      // 8 — aperas horizontale ( 6 × 8 faldeble )
        MARGIN_COMPENSATION: 0o20,
        INTERACTIVE_TAGS: ["INPUT", "BUTTON", "LABEL"],
        // Krad-aranĝaj konstantoj
        GAP_SIZE: 0o10,           // 8px - interspaco inter piktogramoj
        CELL_MIN_WIDTH: 0o100,    // 64px minimuma ĉel-larĝo
        CELL_MIN_HEIGHT: 0o100,   // 64px minimuma ĉel-alto
        // Porteblaj krad-dimensioj
        MOBILE_ROWS: 0o6,         // 6 vicoj en portebla reĝimo
        MOBILE_COLS: 0o4,         // 4 kolumnoj en portebla reĝimo
        // Kiam false, la ĉefa labortabla krado spegulas la porteblan aranĝon
        // ( faldebla 6 × 8 ); kiam true, ĝi konservas la originalan kradojn
        MOBILE_GRID_SEPARATE: true,
        // Trenaj sojloj
        DRAG_THRESHOLD: 0o10,     // 8px - minimuma movo por trenado
        // Etikedaj reĝimoj
        LABEL_MODES: {
            EXTERNAL: "external",
            INSIDE: "inside",
            HIDDEN: "hidden",
            OFF: "off"
        }
    },

    // ⟨ Eniga Traktilo ⟩
    INPUT: {
        DRAG_THRESHOLD: 0o10,     // 8px - minimuma distanco por trenado
        LONG_PRESS_DURATION: 0o400, // ms por longa premo
        SWIPE_THRESHOLD: 0o40,      // Minimuma glita distanco
        DOUBLE_TAP_DELAY: 0o300,    // ms inter frapetoj
        RESIZE_MIN_WIDTH: 0o460,    // 304px minimuma regrandiga larĝo
        RESIZE_MIN_HEIGHT: 0o310    // 200px minimuma regrandiga alto
    },

    // ⟨ Paŭzpunktoj ⟩
    BREAKPOINTS: {
        MOBILE: 0o1400,           // px - portebla/labortabla sojlo
        TASKBAR_LARGE: 0o100,     // 64px - granda taskobreto sojlo
        SMALL_SCREEN: 0o300       // 192px - tre malgrandaj ekranoj
    },

    // ⟨ Animaciaj Daŭroj ⟩
    ANIM: {
        DURATION_SHORT: 0o200,
        DURATION_DEFAULT: 0o300,
        DURATION_LONG: 0o400,
        DURATION_SLOW: 0o500,
        NEXT_FRAME_DELAY: 0,

        // ⟨ Animaciaj Frakcioj ( bazitaj sur 1/8 ) ⟩
        FRACTIONS: {
            oneEighth: 1/8,      // 0.125
            twoEighths: 2/8,     // 0.25
            threeEighths: 3/8,   // 0.375
            fourEighths: 4/8,    // 0.5
            fiveEighths: 5/8,    // 0.625
            sixEighths: 6/8,     // 0.75
            sevenEighths: 7/8,   // 0.875
            full: 8/8            // 1
        },

        // ⟨ Mildaĵaj Funkcioj ⟩
        EASINGS: {
            ease: "cubic-bezier(0.5, 0, 0.25, 1)",
            easeIn: "cubic-bezier(0.5, 0, 1, 1)",
            easeOut: "cubic-bezier(0, 0, 0.25, 1)",
            easeInOut: "cubic-bezier(0.5, 0, 0.25, 1)",
            spring: "cubic-bezier(0.25, 1.5, 0.625, 1)",
            bounce: "cubic-bezier(0.625, -0.5, 0.25, 1.5)"
        }
    },

    // ⟨ Animaciaj Agordoj ⟩
    ANIM_SETTINGS: {
        panelSlide: {
            duration: 0o300,
            easing: "cubic-bezier(0.5, 0, 0.25, 1)"
        },
        panelFade: {
            duration: 0o200,
            easing: "cubic-bezier(0, 0, 0.25, 1)"
        },
        windowOpen: {
            duration: 0o400,
            easing: "cubic-bezier(0.375, 1.5, 0.625, 1)",
            offsetY: "-16px",
            scale: 7/8
        },
        windowClose: {
            duration: 0o200,
            easing: "cubic-bezier(0.5, 0, 1, 1)",
            offsetY: "8px",
            scale: 7/8
        },
        windowMinimize: {
            duration: 0o200,
            easing: "cubic-bezier(0.5, 0, 1, 1)",
            scale: 1/8
        },
        windowMaximize: {
            duration: 0o300,
            easing: "cubic-bezier(0, 0, 0.25, 1)",
            scale: 7/8
        },
        popup: {
            duration: 0o200,
            easing: "cubic-bezier(0, 0, 0.25, 1)",
            scale: 7/8
        },
        ripple: {
            duration: 0o300,
            color: "rgba(255, 255, 255, 0.25)"
        }
    },

    // ⟨ Taskobretaj Pozicioj ⟩ - Unuigita agordo por panelaj ŝovoj, fenestraj ŝovoj kaj panela poziciigo
    TASKBAR_POSITIONS: {
        top: {
            slide: "translateY(-100%)",
            panelOffset: "translateY(-{offset}px)",
            windowOffset: "translateY({offset}px)",
            opposite: "bottom",
            secondary: "right",
            align: "left",
            centerTransform: "translateX(-50%)"
        },
        bottom: {
            slide: "translateY(100%)",
            panelOffset: "translateY(-{offset}px)",
            windowOffset: "translateY(-{offset}px)",
            opposite: "top",
            secondary: "right",
            align: "left",
            centerTransform: "translateX(-50%)"
        },
        left: {
            slide: "translateX(-100%)",
            panelOffset: "translateX({offset}px)",
            windowOffset: "translateX({offset}px)",
            opposite: "right",
            secondary: "bottom",
            align: "top",
            centerTransform: "translateY(-50%)"
        },
        right: {
            slide: "translateX(100%)",
            panelOffset: "translateX(-{offset}px)",
            windowOffset: "translateX(-{offset}px)",
            opposite: "left",
            secondary: "bottom",
            align: "top",
            centerTransform: "translateY(-50%)"
        }
    },

    // ⟨ Aplikaĵa Agordo ⟩ - ĉiu aplikaĵo uzas sian SVG-piktogramon el Piktogramoj
    APPS_DATA: [
        { path: "ſɟᴜ ſɭɹ/ſןwʞ ꞁȷ̀ᴜ ſɟɔ j͐ʃɹʞ.html", piktogramo: Piktogramoj.Retumilo, koloro: PiktogramajKoloroj.Retumilo, title: "ſןwʞ ꞁȷ̀ᴜ ſɟɔ j͐ʃɹʞ" },
        { path: "ſɟᴜ ſɭɹ/ſɟᴜ ſᶘᴜ j͐ʃɹ.html", piktogramo: Piktogramoj.Notoj, koloro: PiktogramajKoloroj.Notoj, title: "ſɟᴜ ſᶘᴜ j͐ʃɹ" },
        { path: "ſɟᴜ ſɭɹ/ſɭw ſᶘɜ.html", piktogramo: Piktogramoj.Agordoj, koloro: PiktogramajKoloroj.Agordoj, title: "ſɭw ſᶘɜ" },
        { path: "ſɟᴜ ſɭɹ/ſןɔ ſɭʞꞇ.html", piktogramo: Piktogramoj.Terminalo, koloro: PiktogramajKoloroj.Terminalo, title: "ſןɔ ſɭʞꞇ" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/j%CD%90%CA%83%E1%B4%9C%20%C5%BF%CD%94%C9%AD%E1%B4%9C.html", piktogramo: Piktogramoj.Ŝlosilaro, koloro: PiktogramajKoloroj.Ŝlosilaro, title: "Ŝlosilaro" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/j%CD%91%CA%83'%E1%B4%9C%20%C9%AD%CA%83%E1%B4%9C%20%D6%AD%C5%BF%C9%AD%E1%B4%9C%C8%9D%20%C5%BF%CD%94%C9%AD%E1%B4%9C%20%E1%B6%85%C5%BF%C9%94%20%C5%BF%C9%AD%C9%B9%CA%9E/j%CD%91%CA%83'%E1%B4%9C%20%C9%AD%CA%83%E1%B4%9C%20%D6%AD%C5%BF%C9%AD%E1%B4%9C%C8%9D%20%C5%BF%CD%94%C9%AD%E1%B4%9C%20%E1%B6%85%C5%BF%C9%94%20%C5%BF%C9%AD%C9%B9%CA%9E.html", piktogramo: Piktogramoj.Cafalkefu, koloro: PiktogramajKoloroj.Cafalkefu, title: "Cafalkefu" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/%C5%BF%C9%9F%E1%B4%9C%20%CA%83%E1%B4%9C%20j%CD%90%CA%83%C9%B9%20%C4%B1],%E1%B4%9C/%C5%BF%C9%9F%E1%B4%9C%20%CA%83%E1%B4%9C%20j%CD%90%CA%83%C9%B9%20%C4%B1],%E1%B4%9C.html", piktogramo: Piktogramoj.Mapo, koloro: PiktogramajKoloroj.Mapo, title: "Mapo" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/%C5%BF%C9%9F%E1%B4%9C%20%C5%BF%C9%AD%C9%B9%20%C5%BF%C8%B7%C9%94/%C5%BF%C9%9F%E1%B4%9C%20%C5%BF%C9%AD%C9%B9%20%C5%BF%C8%B7%C9%94.html", piktogramo: Piktogramoj.Kalkulilo, koloro: PiktogramajKoloroj.Kalkulilo, title: "Kalkulilo" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/%D6%AD%C5%BF%C9%AD%E1%B4%9C%20%C4%B1],%C9%94%20%C5%BF%C9%AD%C9%B9%20%C5%BF%D7%9F%C9%B9.html", piktogramo: Piktogramoj.Puzlo, koloro: PiktogramajKoloroj.Puzlo, title: "Puzlo" },
        { path: "https://cakanisakfii.vercel.app/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%C5%BF%C9%AD%C9%B9%CA%9E/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%C5%BF%C9%AD%C9%B9%CA%9E.html", piktogramo: Piktogramoj.Desegnilo, koloro: PiktogramajKoloroj.Desegnilo, title: "Desegnilo" },
        { path: "https://krhitlashi.github.io/%C5%BF%CD%94%C9%AD%E1%B4%9C%20%E1%B6%85%C5%BF%C9%94/%C5%BF%C8%B7%E1%B4%9C%CD%B7%CC%97%20%C5%BF%C9%AD%C9%94%CA%9E%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%EA%9E%87/%C5%BF%C8%B7%C5%BF%C9%AD%20%EA%9E%81%C8%B7%CC%80%C9%B9%20%C5%BF%C9%AD%CB%AC%EA%9E%87%E1%B4%9C.html", piktogramo: Piktogramoj.Libro, koloro: PiktogramajKoloroj.Libro, title: "Libro" }
    ],

    // ⟨ Rapidaj Agordoj ⟩
    QS: {
        TOGGLES: [
            { id: "wifi", icon: "📶", label: "Wi-Fi", string: "qs_wifi", default: true },
            { id: "bluetooth", icon: "ᛒ", label: "Bluetooth", string: "qs_bluetooth", default: true },
            { id: "airplane", icon: "✈️", label: "Airplane", string: "qs_airplane", default: false },
            { id: "dnd", icon: "🔕", label: "DND", string: "qs_dnd", default: false }
        ],
        SLIDERS: [
            { id: "volume", label: "Laŭteco", icon: "🔊", string: "qs_volume", max: 0o100, value: 0o40, handler: "volume" },
            { id: "brightness", label: "Heleco", icon: "🔆", string: "qs_brightness", max: 0o100, value: 0o60, handler: "brightness" }
        ],
        DEFAULTS: {
            wifi: true,
            bluetooth: true,
            airplane: false,
            dnd: false,
            brightness: 0o60,
            volume: 0o40
        }
    },

    // ⟨ Sciigoj ⟩
    NOTIFICATION_DEFAULTS: [
        { icon: "✉️", title: "notif_messages", desc: "notif_messages_desc" },
        { icon: "📅", title: "notif_calendar", desc: "notif_calendar_desc" }
    ],

    // ⟨ CSS Variablaj Nomoj ⟩
    CSS_VARS: {
        taskbarSize: "--taskbar-width",
        panelInset: "--panel-inset",
        brightness: "--os-brightness"
    },

    // ⟨ Stokejaj Ŝlosiloj ⟩
    STORAGE_KEYS: {
        settings: "os-settings",
        qsState: "os-qs-state",
        dismissedNotifs: "os-dismissed-notifs",
        theme: "os-theme",
        language: "os-language"
    },

    // ⟨ Eventaj Nomoj ⟩
    EVENT_NAMES: {
        settingsChange: "os-settings-change",
        themeChange: "os-theme-change",
        languageChange: "os-language-change",
        panelOpen: "os-panel-open",
        panelClose: "os-panel-close"
    }
};

// ⟪ Plataj Eksportoj por Komuna Uzo ⟫

(window as any).APPS_DATA = (window as any).CONSTANTS.APPS_DATA;
(window as any).QS_TOGGLES = (window as any).CONSTANTS.QS.TOGGLES;
(window as any).QS_SLIDERS = (window as any).CONSTANTS.QS.SLIDERS;
(window as any).Piktogramoj = Piktogramoj;
(window as any).PiktogramajKoloroj = PiktogramajKoloroj;
(window as any).akiriPiktogramon = akiriPiktogramon;
(window as any).akiriPiktogramanFonon = akiriPiktogramanFonon;

// ⟪ DOM Kaŝmemora Utilo ⟫

const DOMCache: any = {
    _kaŝmemoro: {},
    akiri(id: string): HTMLElement | null {
        if (!(this as any)._kaŝmemoro[id]) {
            (this as any)._kaŝmemoro[id] = document.getElementById(id);
        }
        return (this as any)._kaŝmemoro[id];
    }
};

// Alkroĉi al fenestro por tutmonda aliro
(window as any).DOMCache = DOMCache;

// ⟪ Sciiga Helpilo ⟫

function malplenigiSciigojn(): void {
    if ((window as any).SciigoAdministranto) {
        (window as any).SciigoAdministranto.malplenigi();
    }
}

// Alkroĉi al fenestro por tutmonda aliro
(window as any).malplenigiSciigojn = malplenigiSciigojn;
