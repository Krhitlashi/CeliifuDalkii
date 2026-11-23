// ≺⧼ Animacia Administranto ⧽≻ - Taskobret-direktaj animacioj kun okumaj frakcioj

declare const CONSTANTS: any;
declare const akiriTaskobreton: any;
declare const akiriTaskobretanGrandecon: any;

const AnimacioAdministranto: {
    apriorajxoj: { duration: number; easing: string };
    mildigoj: any;
    _positionConfigCache: { [key: string]: any };
    _animacii: (
        element: HTMLElement,
        from: Keyframe,
        to: Keyframe,
        options: any,
        setup?: ( el: HTMLElement ) => void,
        teardown?: ( el: HTMLElement ) => void
    ) => Promise<void>;
    [key: string]: any;
} = {
    // ⟪ Aprioraj Animaciaj Agordoj ⟫
    apriorajxoj: {
        duration: CONSTANTS.ANIM.DURATION_DEFAULT,
        easing: CONSTANTS.ANIM.EASINGS.ease
    },

    // ⟪ Mildigaj Funkcioj ⟫
    mildigoj: CONSTANTS.ANIM.EASINGS,

    // ⟪ Pozicia Agorda Kaŝmemoro ⟫
    _positionConfigCache: {},

    // ⟪ Unuigita Animacia Kerno ⟫

    _animacii(
        element: HTMLElement,
        from: Keyframe,
        to: Keyframe,
        options: any = {},
        setup?: ( el: HTMLElement ) => void,
        teardown?: ( el: HTMLElement ) => void
    ): Promise<void> {
        if ( !element ) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.apriorajxoj.easing;

        if ( setup ) setup( element );
        void element.offsetWidth;

        return element.animate( [ from, to ], { duration, easing } ).finished.then( () => {
            if ( teardown ) teardown( element );
        } );
    },

    // ⟪ Poziciaj Utilaĵoj ⟫

    // Akiri kompletan pozician agordon por taskobreta pozicio ( el CONSTANTS.TASKBAR_POSITIONS )
    akiriPozicianAgordon(pos: any = null): any {
        const taskbar: HTMLElement | null = akiriTaskobreton();
        const position: string = pos || taskbar?.dataset.position || "left";

        // Redoni kaŝmemorigitan agordon se disponebla
        if (this._positionConfigCache[position]) {
            return this._positionConfigCache[position];
        }

        const cfg: any = CONSTANTS.TASKBAR_POSITIONS[ position ] || CONSTANTS.TASKBAR_POSITIONS.bottom;

        const result = {
            position,
            slideTransform: cfg.slide,
            offsetTransform: cfg.panelOffset,
            axis: position === "left" || position === "right" ? "X" : "Y",
            invert: position === "left" || position === "right" ? 1 : -1,
            insetProp: position
        };

        this._positionConfigCache[position] = result;
        return result;
    },

    // ⟪ Akiri Panelan Animacian Direkton Bazitan sur Taskobreto ⟫

    // Ĉiuj paneloj glitas el la taskobreta rando
    akiriPanelanDirekton(panelId: string): { from: string; to: string } {
        const { position } = this.akiriPozicianAgordon();
        // Ĉiuj paneloj kunhavas la saman direktan logikon — gliti el taskobreta rando
        return { from: position, to: position };
    },

    // ⟪ Akiri Transformon por Direkto ⟫

    akiriDirektanTransformon(direction: string, fraction: number = 1): string {
        const percentage: number = fraction * 100;
        const transforms: { [key: string]: string } = {
            top: `translateY(-${percentage}%)`,
            bottom: `translateY(${percentage}%)`,
            left: `translateX(-${percentage}%)`,
            right: `translateX(${percentage}%)`
        };
        return transforms[direction] || transforms.bottom;
    },

    // ⟪ Akiri Taskobretan Grandecon por Pozicio ⟫

    akiriTaskobretanGrandonPorPozicio(pos: any = null, fraction: number = 1): { position: string; size: number; offset: number } {
        const { position } = this.akiriPozicianAgordon(pos);
        const tbSize: number = akiriTaskobretanGrandecon();
        return {
            position,
            size: tbSize,
            offset: tbSize * fraction
        };
    },

    // ⟪ Malaperi En ⟫

    malaperiEn(element: HTMLElement, options: any = {}): Promise<void> {
        return this._animacii(
            element,
            { opacity: 0 },
            { opacity: 1 },
            options,
            ( el ) => {
                el.style.opacity = "0";
                el.style.display = options.display || "flex";
                el.style.pointerEvents = "none";
            },
            ( el ) => {
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Malaperi El ⟫

    malaperiEl(element: HTMLElement, options: any = {}): Promise<void> {
        return this._animacii(
            element,
            { opacity: 1 },
            { opacity: 0 },
            options,
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.display = "none";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Gliti Panelon ( Unuigita Interna Metodo ) ⟫

    glitiPanelon(
        element: HTMLElement,
        panelId: string,
        isEntering: boolean,
        options: any = {}
    ): Promise<void> {
        if (!element) return Promise.resolve();

        // Ĉe porteblaj ekranoj paneloj animacias kiel plenekranaj fenestroj:
        // glito el la taskobreta rando + skalo + malaperi ( sama kiel fenestroMalfermi/Fermi )
        const portebla = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
        if ( portebla ) {
            const frakcio: number = CONSTANTS.ANIM.FRACTIONS.oneEighth;
            const skalo: number = CONSTANTS.ANIM.FRACTIONS.sevenEighths;
            const akso = this.akiriTaskobretanGrandonPorPozicio(null, frakcio);
            const taskbretaTransformo = this._fenestraTaskobretoTransformo(akso.position, akso.offset, isEntering);
            const startTransform = isEntering ? `${taskbretaTransformo} scale(${skalo})` : "scale(1)";
            const endTransform = isEntering ? "scale(1)" : `${taskbretaTransformo} scale(${skalo})`;

            return this._animacii(
                element,
                { transform: startTransform, opacity: isEntering ? 0 : 1 },
                { transform: endTransform, opacity: isEntering ? 1 : 0 },
                options,
                ( el ) => {
                    el.style.display = options.display || "flex";
                    el.style.transform = startTransform;
                    el.style.opacity = isEntering ? "0" : "1";
                    el.style.pointerEvents = "none";
                },
                ( el ) => {
                    el.style.transform = "";
                    el.style.opacity = "";
                    el.style.pointerEvents = "";
                    if (!isEntering) el.style.display = "none";
                }
            );
        }

        const fraction: number = options.fraction ?? 1;
        const direction = this.akiriPanelanDirekton(panelId);
        const edge = isEntering ? direction.from : direction.to;

        const baseTransform: string = element.style.transform && element.style.transform !== "none" ? element.style.transform : "";
        const slideTransform: string = this.akiriDirektanTransformon(edge, fraction);
        
        const startTransform: string = isEntering ? `${baseTransform} ${slideTransform}`.trim() : (baseTransform || "translate(0, 0)");
        const endTransform: string = isEntering ? (baseTransform || "translate(0, 0)") : `${baseTransform} ${slideTransform}`.trim();

        return this._animacii(
            element,
            { transform: startTransform, opacity: isEntering ? 0 : 1 },
            { transform: endTransform, opacity: isEntering ? 1 : 0 },
            options,
            ( el ) => {
                el.style.display = options.display || "flex";
                el.style.transform = startTransform;
                el.style.opacity = isEntering ? "0" : "1";
                el.style.pointerEvents = "none";
            },
            ( el ) => {
                el.style.transform = baseTransform;
                el.style.opacity = "";
                el.style.pointerEvents = "";
                if (!isEntering) el.style.display = "none";
            }
        );
    },

    // ⟪ Gliti En el Taskobreta Rando ⟫

    glitiEnElTaskobreto(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeOut;
        const fraction: number = options.fraction ?? 1;

        return this.glitiPanelon(element, panelId, true, { duration, easing, fraction, display: options.display });
    },

    // ⟪ Gliti El al Taskobreta Rando ⟫

    glitiElAlTaskobreto(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeIn;
        const fraction: number = options.fraction ?? 1;

        return this.glitiPanelon(element, panelId, false, { duration, easing, fraction, display: options.display });
    },

    // ⟪ Animacii Panelan Malfermon ( el taskobreta rando ) ⟫

    malfermiPanelon(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeOut;

        return this.glitiEnElTaskobreto(element, panelId, { duration, easing, fraction: options.fraction, display: options.display });
    },

    // ⟪ Animacii Panelan Fermon ( al taskobreta rando ) ⟫

    fermiPanelon(element: HTMLElement, panelId: string, options: any = {}): Promise<void> {
        if (!element) return Promise.resolve();

        const duration: number = options.duration ?? this.apriorajxoj.duration;
        const easing: string = options.easing ?? this.mildigoj.easeIn;

        return this.glitiElAlTaskobreto(element, panelId, { duration, easing, fraction: options.fraction, display: options.display });
    },

    // ⟪ Fenestro Malferma Animacio ( gliti + malaperi el taskobreto ) ⟫

    fenestroMalfermi(element: HTMLElement, options: any = {}): Promise<void> {
        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.oneEighth;
        const scale: number = options.scale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;
        const axis = this.akiriTaskobretanGrandonPorPozicio(null, fraction);
        const startTransform: string = this._fenestraTaskobretoTransformo(axis.position, axis.offset, true);

        return this._animacii(
            element,
            { transform: startTransform + ` scale(${scale})`, opacity: 0 },
            { transform: "scale(1)", opacity: 1 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM.DURATION_LONG, easing: options.easing ?? this.mildigoj.easeOut },
            ( el ) => {
                el.style.display = "block";
                el.style.transform = startTransform + ` scale(${scale})`;
                el.style.opacity = "0";
            },
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
            }
        );
    },

    // ⟪ Fenestro Ferma Animacio ( skali malsupren + malaperi al taskobreto ) ⟫

    fenestroFermi(element: HTMLElement, options: any = {}): Promise<void> {
        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.oneEighth;
        const scale: number = options.scale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths;
        const axis = this.akiriTaskobretanGrandonPorPozicio(null, fraction);
        const endTransform: string = this._fenestraTaskobretoTransformo(axis.position, axis.offset, false);

        return this._animacii(
            element,
            { transform: "scale(1)", opacity: 1 },
            { transform: endTransform + ` scale(${scale})`, opacity: 0 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM.DURATION_SHORT, easing: options.easing ?? this.mildigoj.easeIn },
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.display = "none";
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Unuigita Fenestra Taskobreto-Transformo ( malfermo kaj fermo ) ⟫

    _fenestraTaskobretoTransformo(position: string, offset: number, estasMalfermo: boolean): string {
        const cfg: any = CONSTANTS.TASKBAR_POSITIONS[ position ] || CONSTANTS.TASKBAR_POSITIONS.bottom;
        const baza: string = cfg.windowOffset.replace("{offset}", offset.toString());
        if ( position === "left" || position === "right" ) {
            const etaY: string = estasMalfermo ? CONSTANTS.ANIM_SETTINGS.windowOpen.offsetY : CONSTANTS.ANIM_SETTINGS.windowClose.offsetY;
            return baza + ` translateY(${etaY})`;
        }
        return baza;
    },

    // ⟪ Minimumigi Fenestran Animacion ( skali en taskobreton ) ⟫

    minimumigiFenestron(element: HTMLElement, options: any = {}): Promise<void> {
        const scale: number = options.scale ?? CONSTANTS.ANIM_SETTINGS.windowMinimize.scale;

        // Akiri taskobretan pozicion kaj grandecon
        const { position } = this.akiriPozicianAgordon();
        const taskbar: HTMLElement | null = akiriTaskobreton();
        const tbRect: DOMRect = taskbar?.getBoundingClientRect() || { left: 0, top: window.innerHeight, right: window.innerWidth, bottom: window.innerHeight, width: window.innerWidth, height: 0, x: 0, y: window.innerHeight, toJSON() { return {}; } };
        const winRect: DOMRect = element.getBoundingClientRect();

        // Kalkuli la centran punkton de la fenestro
        const winCenterX: number = winRect.left + winRect.width / 2;
        const winCenterY: number = winRect.top + winRect.height / 2;

        // Kalkuli celpunkton sur taskobreto
        let targetX: number, targetY: number;
        switch (position) {
            case "left":
                targetX = tbRect.right;
                targetY = winCenterY;
                break;
            case "right":
                targetX = tbRect.left;
                targetY = winCenterY;
                break;
            case "top":
                targetX = winCenterX;
                targetY = tbRect.bottom;
                break;
            case "bottom":
            default:
                targetX = winCenterX;
                targetY = tbRect.top;
                break;
        }

        // Kalkuli tradukan distancon
        const translateX: number = targetX - winCenterX;
        const translateY: number = targetY - winCenterY;

        return this._animacii(
            element,
            { transform: "scale(1)", opacity: 1 },
            { transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`, opacity: 0 },
            { ...options, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.windowMinimize.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.windowMinimize.easing },
            ( el ) => { el.style.pointerEvents = "none"; },
            ( el ) => {
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    },

    // ⟪ Maksimumigi Fenestran Animacion ⟫

    maksimumigiFenestron(element: HTMLElement, options: any = {}): Promise<void> {
        return this._skaliKerno(
            element,
            options.fromScale ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.scale,
            true,
            { ...options, startOpacity: CONSTANTS.ANIM.FRACTIONS.sixEighths, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.easing }
        );
    },

    // ⟪ Restarigi el Maksimumiga Animacio ⟫

    malmaksimumigiFenestron(element: HTMLElement, options: any = {}): Promise<void> {
        return this._skaliKerno(
            element,
            options.toScale ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.scale,
            false,
            { ...options, endOpacity: CONSTANTS.ANIM.FRACTIONS.sixEighths, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.windowMaximize.easing }
        );
    },

    // ⟪ Restarigi Fenestran Animacion ( el minimumigita ) ⟫

    restaŭriFenestron(element: HTMLElement, options: any = {}): Promise<void> {
        const fraction: number = options.fraction ?? CONSTANTS.ANIM.FRACTIONS.oneEighth;

        return this._skaliKerno(element, fraction, true, {
            ...options,
            duration: options.duration ?? CONSTANTS.ANIM.DURATION_DEFAULT,
            easing: options.easing ?? this.mildigoj.spring,
            agordiEkrano: true,
            display: "block"
        });
    },

    // ⟪ Skali En ( ŝprucaĵo ) ⟫

    skaliEn(element: HTMLElement, options: any = {}): Promise<void> {
        return this._skaliKerno(
            element,
            options.fromScale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths,
            true,
            { ...options, easing: options.easing ?? this.mildigoj.spring, agordiEkrano: true, blokiEventojn: true }
        );
    },

    // ⟪ Skali El ( ŝrumpa efiko ) ⟫

    skaliEl(element: HTMLElement, options: any = {}): Promise<void> {
        return this._skaliKerno(
            element,
            options.toScale ?? CONSTANTS.ANIM.FRACTIONS.sevenEighths,
            false,
            { ...options, easing: options.easing ?? this.mildigoj.easeIn, blokiEventojn: true, finoKaŝi: true }
        );
    },

    // ⟪ Ŝpruca Animacio ( por kunteksta menuo ) ⟫

    sxprucEn(element: HTMLElement, options: any = {}): Promise<void> {
        const scale: number = options.scale ?? CONSTANTS.ANIM_SETTINGS.popup.scale;

        return this._skaliKerno(
            element,
            scale,
            true,
            { ...options, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.popup.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.popup.easing }
        );
    },

    // ⟪ Ŝpruca Ferma Animacio ( malaperi el ) ⟫

    sxprucEl(element: HTMLElement, options: any = {}): Promise<void> {
        const scale: number = options.scale ?? CONSTANTS.ANIM_SETTINGS.popup.scale;

        return this._skaliKerno(
            element,
            scale,
            false,
            { ...options, duration: options.duration ?? CONSTANTS.ANIM_SETTINGS.popup.duration, easing: options.easing ?? CONSTANTS.ANIM_SETTINGS.popup.easing, blokiEventojn: true, finoKaŝi: true }
        );
    },

    // ⟪ Unuigita Skala Kerno ( eniro kaj eliro ) ⟫
    // options:
    //   agordiEkrano - ĉu la eniro difinas el.style.display ( fenestroj jes, menuoj ne )
    //   display - la display-valoro uzata kiam agordiEkrano ( defaŭlte "flex" )
    //   blokiEventojn - ĉu pointer-events estas malŝaltita dum la animacio
    //   finoKaŝi - ĉu la eliro kaŝas la elementon post la animacio
    //   startOpacity / endOpacity - laŭvolaj opakecaj ekstremoj ( defaŭlte 0 kaj 1 )

    _skaliKerno(element: HTMLElement, scale: number, estasEniro: boolean, options: any = {}): Promise<void> {
        const startTransform: string = estasEniro ? `scale(${scale})` : "scale(1)";
        const endTransform: string = estasEniro ? "scale(1)" : `scale(${scale})`;
        const startOpacity: number = options.startOpacity ?? 0;
        const endOpacity: number = options.endOpacity ?? 1;

        return this._animacii(
            element,
            { transform: startTransform, opacity: estasEniro ? startOpacity : 1 },
            { transform: endTransform, opacity: estasEniro ? 1 : endOpacity },
            options,
            ( el ) => {
                if ( estasEniro && options.agordiEkrano ) el.style.display = options.display || "flex";
                el.style.transform = startTransform;
                el.style.opacity = estasEniro ? startOpacity.toString() : "1";
                if ( options.blokiEventojn ) el.style.pointerEvents = "none";
            },
            ( el ) => {
                if ( options.finoKaŝi ) el.style.display = "none";
                el.style.transform = "";
                el.style.opacity = "";
                el.style.pointerEvents = "";
            }
        );
    }
};

// Aldoni al fenestro por tutmonda aliro
(window as any).AnimacioAdministranto = AnimacioAdministranto;
