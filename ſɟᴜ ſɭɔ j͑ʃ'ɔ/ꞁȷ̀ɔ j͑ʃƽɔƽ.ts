// ≺⧼ Konstantoj ⧽≻

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
        DEFAULT_ROWS: 0o10,
        DEFAULT_COLS: 0o20,
        MARGIN_COMPENSATION: 0o20,
        INTERACTIVE_TAGS: ["INPUT", "BUTTON", "LABEL"],
        // Krad-aranĝaj konstantoj
        GAP_SIZE: 0o10,           // 8px - interspaco inter piktogramoj
        CELL_MIN_WIDTH: 0o100,    // 64px minimuma ĉel-larĝo
        CELL_MIN_HEIGHT: 0o100,   // 64px minimuma ĉel-alto
        // Porteblaj krad-dimensioj
        MOBILE_ROWS: 0o6,         // 6 vicoj en portebla reĝimo
        MOBILE_COLS: 0o4,         // 4 kolumnoj en portebla reĝimo
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

    // ⟨ Aplikaĵa Agordo ⟩
    APPS_DATA: [
        { path: "ſɟᴜ ſɭɹ/ſןwʞ ꞁȷ̀ᴜ ſɟɔ j͐ʃɹʞ.html", emoji: "🌐", title: "ſןwʞ ꞁȷ̀ᴜ ſɟɔ j͐ʃɹʞ" },
        { path: "ſɟᴜ ſɭɹ/ſɟᴜ ſᶘᴜ j͐ʃɹ.html", emoji: "📝", title: "ſɟᴜ ſᶘᴜ j͐ʃɹ" },
        { path: "ſɟᴜ ſɭɹ/ſɭw ſᶘɜ.html", emoji: "⚙️", title: "ſɭw ſᶘɜ" },
        { path: "ſɟᴜ ſɭɹ/ſןɔ ſɭʞꞇ.html", emoji: "💻", title: "ſןɔ ſɭʞꞇ" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/j%CD%90%CA%83%E1%B4%9C%20%C5%BF%CD%94%C9%AD%E1%B4%9C.html", emoji: "🔤", title: "Ŝlosilaro" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/j%CD%91%CA%83'%E1%B4%9C%20%C9%AD%CA%83%E1%B4%9C%20%D6%AD%C5%BF%C9%AD%E1%B4%9C%C8%9D%20%C5%BF%CD%94%C9%AD%E1%B4%9C%20%E1%B6%85%C5%BF%C9%94%20%C5%BF%C9%AD%C9%B9%CA%9E/j%CD%91%CA%83'%E1%B4%9C%20%C9%AD%CA%83%E1%B4%9C%20%D6%AD%C5%BF%C9%AD%E1%B4%9C%C8%9D%20%C5%BF%CD%94%C9%AD%E1%B4%9C%20%E1%B6%85%C5%BF%C9%94%20%C5%BF%C9%AD%C9%B9%CA%9E.html", emoji: "📜", title: "Cafalkefu" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/%C5%BF%C9%9F%E1%B4%9C%20%CA%83%E1%B4%9C%20j%CD%90%CA%83%C9%B9%20%C4%B1],%E1%B4%9C/%C5%BF%C9%9F%E1%B4%9C%20%CA%83%E1%B4%9C%20j%CD%90%CA%83%C9%B9%20%C4%B1],%E1%B4%9C.html", emoji: "🗺️", title: "Mapo" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/%C5%BF%C9%9F%E1%B4%9C%20%C5%BF%C9%AD%C9%B9%20%C5%BF%C8%B7%C9%94/%C5%BF%C9%9F%E1%B4%9C%20%C5%BF%C9%AD%C9%B9%20%C5%BF%C8%B7%C9%94.html", emoji: "🧮", title: "Kalkulilo" },
        { path: "https://krhitlashi.github.io/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%7D%CA%83%EA%9E%87/%D6%AD%C5%BF%C9%AD%E1%B4%9C%20%C4%B1],%C9%94%20%C5%BF%C9%AD%C9%B9%20%C5%BF%D7%9F%C9%B9.html", emoji: "🧩", title: "Puzlo" },
        { path: "https://cakanisakfii.vercel.app/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%C5%BF%C9%AD%C9%B9%CA%9E/%C5%BF%C9%9F%E1%B4%9C%C6%BD%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%20%C5%BF%C9%AD%C9%B9%CA%9E.html", emoji: "🖌️", title: "Desegnilo" },
        { path: "https://krhitlashi.github.io/%C5%BF%CD%94%C9%AD%E1%B4%9C%20%E1%B6%85%C5%BF%C9%94/%C5%BF%C8%B7%E1%B4%9C%CD%B7%CC%97%20%C5%BF%C9%AD%C9%94%CA%9E%20%EA%9E%81%C8%B7%CC%80%E1%B4%9C%EA%9E%87/%C5%BF%C8%B7%C5%BF%C9%AD%20%EA%9E%81%C8%B7%CC%80%C9%B9%20%C5%BF%C9%AD%CB%AC%EA%9E%87%E1%B4%9C.html", emoji: "📖", title: "Libro" }
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
        taskbarSize: "--taskbar-inline-size",
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

// ⟪ DOM Kaŝmemora Utilo ⟫

const DOMCache: any = {
    _kaŝmemoro: {},
    akiri(id: string): HTMLElement | null {
        if (!(this as any)._kaŝmemoro[id]) {
            (this as any)._kaŝmemoro[id] = document.getElementById(id);
        }
        return (this as any)._kaŝmemoro[id];
    },
    malplenigi(): void {
        (this as any)._kaŝmemoro = {};
    },
    forigi(id: string): void {
        delete (this as any)._kaŝmemoro[id];
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
