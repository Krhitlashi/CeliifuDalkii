// ≺⧼ Constants ⧽≻

// Attach CONSTANTS to window for global access
(window as any).CONSTANTS = {
    // ⟨ Window Manager ⟩
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

    // ⟨ System ⟩
    SYS: {
        SWIPE_THRESHOLD: 0o200,
        PANEL_ANIMATION_DURATION: 0o300,
        TASKBAR_SIZE: 0o100,
        MARGIN: 0o20,
        DOCK_MARGIN: 0o10,
        BRIGHTNESS_MAX: 0o200,
        BRIGHTNESS_BUFFER: 0o300
    },

    // ⟨ Desktop Icon Manager ⟩
    DIM: {
        DEFAULT_ROWS: 0o10,
        DEFAULT_COLS: 0o20,
        MARGIN_COMPENSATION: 0o20,
        INTERACTIVE_TAGS: ["INPUT", "BUTTON", "LABEL"],
        // Grid layout constants
        GAP_SIZE: 0o10,           // 8px - gap between icons
        CELL_MIN_WIDTH: 0o100,    // 64px minimum cell width
        CELL_MIN_HEIGHT: 0o100,   // 64px minimum cell height
        // Mobile grid dimensions
        MOBILE_ROWS: 0o6,         // 6 rows on mobile
        MOBILE_COLS: 0o4,         // 4 columns on mobile
        // Drag thresholds
        DRAG_THRESHOLD: 0o10,     // 8px - minimum movement for drag
        // Label modes
        LABEL_MODES: {
            EXTERNAL: "external",
            INSIDE: "inside",
            HIDDEN: "hidden",
            OFF: "off"
        }
    },

    // ⟨ Input Handler ⟩
    INPUT: {
        DRAG_THRESHOLD: 0o10,     // 8px - minimum distance for drag
        LONG_PRESS_DURATION: 0o400, // ms for long press
        SWIPE_THRESHOLD: 0o40,      // Minimum swipe distance
        DOUBLE_TAP_DELAY: 0o300,    // ms between taps
        RESIZE_MIN_WIDTH: 0o460,    // 304px minimum resize width
        RESIZE_MIN_HEIGHT: 0o310    // 200px minimum resize height
    },

    // ⟨ Breakpoints ⟩
    BREAKPOINTS: {
        MOBILE: 768,              // px - mobile/desktop threshold
        TASKBAR_LARGE: 0o100,     // 64px - large taskbar threshold
        SMALL_SCREEN: 0o300       // 192px - very small screens
    },

    // ⟨ Animation Durations ⟩
    ANIM: {
        DURATION_SHORT: 0o200,
        DURATION_DEFAULT: 0o300,
        DURATION_LONG: 0o400,
        DURATION_SLOW: 0o500,
        NEXT_FRAME_DELAY: 0,

        // ⟨ Animation Fractions ( 1/8 based ) ⟩
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

        // ⟨ Easing Functions ⟩
        EASINGS: {
            ease: "cubic-bezier(0.5, 0, 0.25, 1)",
            easeIn: "cubic-bezier(0.5, 0, 1, 1)",
            easeOut: "cubic-bezier(0, 0, 0.25, 1)",
            easeInOut: "cubic-bezier(0.5, 0, 0.25, 1)",
            spring: "cubic-bezier(0.25, 1.5, 0.625, 1)",
            bounce: "cubic-bezier(0.625, -0.5, 0.25, 1.5)"
        }
    },

    // ⟨ Animation Settings ⟩
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

    // ⟨ App Configuration ⟩
    APPS_DATA: [
        { path: "ſɟᴜ ſɭɹ/ſןwʞ ꞁȷ̀ᴜ ſɟɔ j͐ʃɹʞ.html", emoji: "🌐" },
        { path: "ſɟᴜ ſɭɹ/ſɟᴜ ſᶘᴜ j͐ʃɹ.html", emoji: "📝" },
        { path: "ſɟᴜ ſɭɹ/ſɭw ſᶘɜ.html", emoji: "⚙️" },
        { path: "ſɟᴜ ſɭɹ/ſןɔ ſɭʞꞇ.html", emoji: "💻" },
        { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/j͐ʃᴜ ſ͔ɭᴜ.html", emoji: "🔤" },
        { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ſ͔ɭᴜ ᶅſɔ ſɭɹʞ/j͑ʃ'ᴜ ɭʃᴜ ֭ſɭᴜȝ ſ͔ɭᴜ ᶅſɔ ſɭɹʞ.html", emoji: "🌍" },
        { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ſɭɹ ſȷɔ/ſɟᴜ ſɭɹ ſȷɔ.html", emoji: "🎨" },
        { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ſɟᴜ ʃᴜ j͐ʃɹ ı],ᴜ/ſɟᴜ ʃᴜ j͐ʃɹ ı],ᴜ.html", emoji: "🧮" },
        { path: "../../ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/֭ſɭᴜ ı],ɔ ſɭɹ ſןɹ.html", emoji: "🧩" },
        { path: "../ſɟᴜƽ ꞁȷ̀ᴜ ſɭɹʞ/ſɟᴜƽ ꞁȷ̀ᴜ ſɭɹʞ.html", emoji: "🖌️" },
        { path: "../../ſ͔ɭᴜ ᶅſɔ/ſȷᴜͷ̗ ſɭɔʞ ꞁȷ̀ᴜꞇ/ſȷſɭ ꞁȷ̀ɹ ſɭˬꞇᴜ.html", emoji: "📖" }
    ],

    // ⟨ Quick Settings ⟩
    QS: {
        TOGGLES: [
            { id: "wifi", icon: "📶", label: "Wi-Fi", string: "qs_wifi", default: true },
            { id: "bluetooth", icon: "ᛒ", label: "Bluetooth", string: "qs_bluetooth", default: true },
            { id: "airplane", icon: "✈️", label: "Airplane", string: "qs_airplane", default: false },
            { id: "dnd", icon: "🔕", label: "DND", string: "qs_dnd", default: false }
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

    // ⟨ Notifications ⟩
    NOTIFICATION_DEFAULTS: [
        { icon: "✉️", title: "notif_messages", desc: "notif_messages_desc" },
        { icon: "📅", title: "notif_calendar", desc: "notif_calendar_desc" }
    ],

    // ⟨ CSS Variable Names ⟩
    CSS_VARS: {
        taskbarSize: "--taskbar-inline-size",
        panelInset: "--panel-inset",
        brightness: "--os-brightness"
    },

    // ⟨ Storage Keys ⟩
    STORAGE_KEYS: {
        settings: "os-settings",
        qsState: "os-qs-state",
        dismissedNotifs: "os-dismissed-notifs",
        theme: "os-theme",
        language: "os-language"
    },

    // ⟨ Event Names ⟩
    EVENT_NAMES: {
        settingsChange: "os-settings-change",
        themeChange: "os-theme-change",
        languageChange: "os-language-change",
        panelOpen: "os-panel-open",
        panelClose: "os-panel-close"
    }
};

// ⟪ Flat Exports for Common Usage ⟫

(window as any).APPS_DATA = (window as any).CONSTANTS.APPS_DATA;
(window as any).QS_TOGGLES = (window as any).CONSTANTS.QS.TOGGLES;
(window as any).CSS_VARS = (window as any).CONSTANTS.CSS_VARS;
(window as any).SYS_TASKBAR_SIZE = (window as any).CONSTANTS.SYS.TASKBAR_SIZE;

// ⟪ DOM Cache Utility ⟫

const DOMCache: any = {
    _cache: {},
    get(id: string): HTMLElement | null {
        if (!(this as any)._cache[id]) {
            (this as any)._cache[id] = document.getElementById(id);
        }
        return (this as any)._cache[id];
    },
    clear(): void {
        (this as any)._cache = {};
    },
    remove(id: string): void {
        delete (this as any)._cache[id];
    }
};

// Attach to window for global access
(window as any).DOMCache = DOMCache;

// ⟪ Notification Helper ⟫

function clearNotifications(): void {
    if ((window as any).NotificationManager) {
        (window as any).NotificationManager.clear();
    }
}

// Attach to window for global access
(window as any).clearNotifications = clearNotifications;
