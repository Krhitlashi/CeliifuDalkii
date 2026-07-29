// ≺⧼ Panela Administranto ⧽≻ - Unuigita panela administrado kun direktaj animacioj

declare const CONSTANTS: any;
declare const AnimacioAdministranto: any;
declare const SciigoAdministranto: any;
declare const DOMCache: any;
declare const hasClass: any;
declare const removeClass: any;
declare const addClass: any;
declare const setButtonPressed: any;
declare const getStartMenu: any;
declare const getTaskbar: any;
declare const isTaskbarLarge: any;
declare const renderRecents: any;
declare const updateDock: any;
declare const getOpenWindows: any;

import { klikoEkstereTraktilo } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

class PanelaAdministranto {
    static animationDuration: number = CONSTANTS.ANIM.DURATION_DEFAULT;

    static panels: { [key: string]: string } = {
        quickSettings: "quick-settings-container",
        notifications: "notifications-panel",
        recents: "recents-panel",
        clockFlyout: "clock-panel",
        startMenu: "start-menu",
        dock: "taskbar-dock"
    };

    // ⟪ Akiri Panelon per ID ⟫
    static akiriPanelon(panelId: string): HTMLElement | null {
        return DOMCache.get(panelId);
    }

    // ⟪ Kontroli Panelan Videblecon ⟫
    static cxuPaneloVidebla(panel: HTMLElement | null): boolean {
        return panel != null && hasClass(panel, "visible");
    }

    // ⟪ Agordi Premitan Butonstaton ⟫
    static agordiButononPremita(btnId: string, pressed: boolean): void {
        setButtonPressed(btnId, pressed);
    }

    // ⟪ Kaŝi Panelon kun Direkta Animacio ⟫
    static kaŝiPanelon(panel: HTMLElement, panelId: string): Promise<void> {
        if (!panel) return Promise.resolve();

        return AnimacioAdministranto.fermiPanelon(panel, panelId, {
            duration: this.animationDuration
        }).then(() => {
            removeClass(panel, "visible");
        });
    }

    // ⟪ Montri Panelon kun Direkta Animacio ⟫
    static montriPanelon(panel: HTMLElement, btnId: string, isSliders: boolean = false, panelId: string | null = null): Promise<void> {
        if (!panel) return Promise.resolve();

        this.poziciigiPanelon(panel, btnId, isSliders, panelId);

        void panel.offsetWidth;

        this.agordiButononPremita(btnId, true);

        return AnimacioAdministranto.malfermiPanelon(panel, panelId || btnId, {
            duration: this.animationDuration
        }).then(() => {
            addClass(panel, "visible");
        });
    }

    // ⟪ Fermi Sistemajn Panelojn ⟫
    static fermiSistemajnPanelojn(): Promise<void[]> {
        const animations: Promise<void>[] = [];

        [this.panels.quickSettings, this.panels.notifications, this.panels.clockFlyout].forEach(panelId => {
            const panel = this.akiriPanelon(panelId);
            if (panel && this.cxuPaneloVidebla(panel)) {
                animations.push(this.kaŝiPanelon(panel, panelId));
            }
        });

        const dock = this.akiriPanelon(this.panels.dock);
        if (dock && this.cxuPaneloVidebla(dock)) {
            removeClass(dock, "visible");
        }

        ["status-area", "notification-btn", "clock-area"].forEach(btnId => {
            this.agordiButononPremita(btnId, false);
        });

        return Promise.all(animations);
    }

    // ⟪ Fermi Ĉiujn Panelojn ⟫
    static fermiCxiujnPanelojn(): Promise<void[]> {
        const animations: Promise<void>[] = [];

        [this.panels.quickSettings, this.panels.notifications, this.panels.clockFlyout, this.panels.recents].forEach(panelId => {
            const panel = this.akiriPanelon(panelId);
            if (panel && this.cxuPaneloVidebla(panel)) {
                animations.push(this.kaŝiPanelon(panel, panelId));
            }
        });

        const startMenu: HTMLElement | null = getStartMenu();
        if (startMenu && hasClass(startMenu, "open")) {
            animations.push(AnimacioAdministranto.fermiPanelon(startMenu, "startMenu", {
                duration: this.animationDuration
            }).then(() => {
                removeClass(startMenu, "open");
                removeClass(document.body, "start-menu-open");
            }));
        }

        ["status-area", "notification-btn", "clock-area", "recents-btn", "home-area"].forEach(btnId => {
            this.agordiButononPremita(btnId, false);
        });

        const dock = this.akiriPanelon(this.panels.dock);
        if (this.cxuPaneloVidebla(dock)) {
            animations.push(AnimacioAdministranto.malaperiEl(dock, {
                duration: CONSTANTS.ANIM.DURATION_SHORT
            }).then(() => {
                removeClass(dock, "visible");
            }));
        }

        return Promise.all(animations);
    }

    // ⟪ Poziciigi Panelon ⟫
    static poziciigiPanelon(panel: HTMLElement, btnId: string, isSliders: boolean = false, panelId: string | null = null): void {
        if (!panel) return;
        const taskbar: HTMLElement | null = getTaskbar();
        const pos: string = taskbar ? (taskbar.dataset.position || "left") : "left";
        const isVertical: boolean = pos === "left" || pos === "right";

        const tbSize: number = parseInt(getComputedStyle(document.documentElement).getPropertyValue(CONSTANTS.CSS_VARS.taskbarSize)) || CONSTANTS.SYS.TASKBAR_SIZE;
        const tbBuffer: string = `${tbSize + CONSTANTS.SYS.MARGIN * 2}px`;
        const edge: string = `${CONSTANTS.SYS.MARGIN}px`;
        const gap: string = "8px";

        ["left", "right", "top", "bottom"].forEach(p => { (panel.style as any)[p] = "auto"; });
        panel.style.transform = "none";
        panel.style.blockSize = "fit-content";

        const positions: { [key: string]: string } = this.#getPanelPositions(tbBuffer, edge, gap, isSliders, isVertical, pos, btnId, panelId, taskbar);

        Object.entries(positions).forEach(([prop, val]) => {
            (panel.style as any)[prop] = val;
        });
    }

    // ⟪ Akiri Panelajn Poziciojn ⟫
    static #getPanelPositions(tbBuffer: string, edge: string, gap: string, isSliders: boolean, isVertical: boolean, pos: string, btnId: string, panelId: string | null, taskbar: HTMLElement | null): { [key: string]: string } {
        const sliderOffset: string = isSliders ? `calc(${tbBuffer} + 300px + ${gap})` : tbBuffer;
        const isLeftAligned: boolean = btnId === "status-area" || btnId === "recents-btn";
        const isRightAligned: boolean = btnId === "clock-area" || btnId === "notification-btn";
        const isCenterAligned: boolean = !isLeftAligned && !isRightAligned;

        // Serĉtabelo de pozicia agordo
        const configs: { [key: string]: { offset: string; align: string; opposite: string; secondary: string; transform: string } } = {
            bottom: { offset: "bottom", align: "left", opposite: "top", secondary: "right", transform: "translateX(-50%)" },
            top:    { offset: "top",    align: "left", opposite: "bottom", secondary: "right", transform: "translateX(-50%)" },
            left:   { offset: "left",   align: "top",  opposite: "right", secondary: "bottom", transform: "translateY(-50%)" },
            right:  { offset: "right",  align: "top",  opposite: "left", secondary: "bottom", transform: "translateY(-50%)" }
        };

        const config = configs[pos] || configs.bottom;
        const alignValue = isLeftAligned ? edge : isRightAligned ? "auto" : "50%";

        return {
            [config.offset]: sliderOffset,
            [config.align]: alignValue,
            [config.secondary]: isRightAligned ? edge : "auto",
            [config.opposite]: "auto",
            transform: isCenterAligned ? config.transform : "none"
        };
    }

    // ⟪ Baskuli Panelon ⟫
    static togglePanel(panelId: string, btnId: string, isSliders: boolean = false): void {
        const panel = this.akiriPanelon(panelId);
        if (!panel) return;

        const isVisible = this.cxuPaneloVidebla(panel);
        this.fermiCxiujnPanelojn();

        if (!isVisible) {
            setTimeout(() => {
                this.montriPanelon(panel, btnId, isSliders, panelId);
            }, this.animationDuration);
        }
    }

    // ⟪ Unuigita Panela Baskulilo ⟫

    static baskuligi( panelId: string, btnId: string, opts?: { onBefore?: () => void; onAboutToShow?: () => void; onShow?: () => void } ): void {
        if ( opts?.onBefore ) opts.onBefore();
        const panel = this.akiriPanelon( panelId );
        if ( !panel ) return;

        const isVisible = this.cxuPaneloVidebla( panel );
        this.fermiCxiujnPanelojn();

        if ( !isVisible ) {
            if ( opts?.onAboutToShow ) opts.onAboutToShow();
            setTimeout( () => {
                if ( opts?.onShow ) opts.onShow();
                else this.montriPanelon( panel, btnId, false, panelId );
            }, this.animationDuration );
        }
    }

    // ⟪ Baskuli Rapidajn Agordojn ⟫
    static baskuligiRapidaAgordoj(): void {
        return this.baskuligi( this.panels.quickSettings, "status-area", {
            onAboutToShow: () => {
                const container = this.akiriPanelon( this.panels.quickSettings );
                if ( container && ( container as any )._hideTimeout ) {
                    clearTimeout( ( container as any )._hideTimeout );
                    delete ( container as any )._hideTimeout;
                }
            },
            onShow: () => {
                const container = this.akiriPanelon( this.panels.quickSettings );
                if ( !container ) return;
                this.poziciigiPanelon( container, "status-area", false, "quickSettings" );
                void container.offsetWidth;
                addClass( container, "visible" );
                this.agordiButononPremita( "status-area", true );
                AnimacioAdministranto.malfermiPanelon( container, "quickSettings", {
                    duration: this.animationDuration
                } );
            }
        } );
    }

    // ⟪ Baskuli Sciigojn ⟫
    static baskuligiSciigojn(): void {
        return this.baskuligi( this.panels.notifications, "notification-btn", {
            onBefore: () => {
                if ( ( window as any ).SciigoAdministranto ) ( window as any ).SciigoAdministranto.renderi();
            }
        } );
    }

    // ⟪ Baskuli Horloĝan Elflugaĵon ⟫
    static baskuligiHorlogxoElsxovo(): void {
        return this.baskuligi( this.panels.clockFlyout, "clock-area", {
            onBefore: () => {
                if ( ( window as any ).HorlogxoAdministranto ) ( window as any ).HorlogxoAdministranto.update();
            }
        } );
    }

    // ⟪ Baskuli Komencan Menuon ⟫
    static baskuligiKomencaMenuo(): void {
        const startMenu: HTMLElement | null = getStartMenu();
        if (!startMenu) return;

        const isOpen = hasClass(startMenu, "open");
        if (isOpen) {
            AnimacioAdministranto.fermiPanelon(startMenu, "startMenu", {
                duration: this.animationDuration
            }).then(() => {
                removeClass(startMenu, "open");
                removeClass(document.body, "start-menu-open");
            });
        } else {
            this.fermiSistemajnPanelojn();
            setTimeout(() => {
                if ((window as any).LabortablaPiktogramoAdministranto?.startMenu) {
                    (window as any).LabortablaPiktogramoAdministranto.startMenu.refresh();
                }

                AnimacioAdministranto.malfermiPanelon(startMenu, "startMenu", {
                    duration: this.animationDuration
                }).then(() => {
                    addClass(startMenu, "open");
                    addClass(document.body, "start-menu-open");
                });
            }, this.animationDuration);
        }
    }

    // ⟪ Montri Lastatempajn Panelon ⟫
    static montriLastatempajn(e?: Event): void {
        if (e) e.preventDefault();

        const panel = this.akiriPanelon(this.panels.recents);
        if (!panel) return;
        const dock = this.akiriPanelon(this.panels.dock);

        const isVisible = this.cxuPaneloVidebla(panel);
        this.fermiCxiujnPanelojn();

        if (!isVisible) {
            if (typeof renderRecents === "function") {
                renderRecents();
            }

            if (!isTaskbarLarge() && dock) {
                if (typeof updateDock === "function") {
                    updateDock();
                }
                const windows: NodeListOf<HTMLElement> = getOpenWindows();
                if (windows.length > 0) {
                    addClass(dock, "visible");
                    AnimacioAdministranto.malaperiEn(dock, { duration: CONSTANTS.ANIM.DURATION_SHORT });
                }
            }

            setTimeout(() => {
                this.montriPanelon(panel, "recents-btn", false, "recents");
            }, this.animationDuration);
        }
    }

    // ⟪ Iniciati Panelan Eksterklakan Traktilon ⟫
    static initClickOutsideHandler(): void {
        klikoEkstereTraktilo(
            [ ".system-panel", "#taskbar", "#taskbar-dock", "#start-menu", "#recents-panel", "#quick-settings-container" ],
            () => this.fermiCxiujnPanelojn()
        );
    }
}

// Aldoni al fenestro por tutmonda aliro
( window as any ).PanelaAdministranto = PanelaAdministranto;
