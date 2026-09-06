// ≺⧼ Panela Administranto ⧽≻ - Unuigita panela administrado kun direktaj animacioj

declare const CONSTANTS: any;
declare const AnimacioAdministranto: any;
declare const SciigoAdministranto: any;
declare const DOMCache: any;
declare const cxuKlaso: any;
declare const forigiKlason: any;
declare const aldoniKlason: any;
declare const agordiButonPremita: any;
declare const aktualigiDokon: any;
declare const akiriKomencanMenuon: any;
declare const akiriTaskobreton: any;
declare const akiriTaskobretanGrandecon: any;
declare const cxuTaskbretoGranda: any;
declare const bildigiLastatempajn: any;
declare const akiriMalfermajnFenestrojn: any;

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
        return DOMCache.akiri(panelId);
    }

    // ⟪ Kontroli Panelan Videblecon ⟫
    static cxuPaneloVidebla(panel: HTMLElement | null): boolean {
        return panel != null && cxuKlaso(panel, "visible");
    }

    // ⟪ Kaŝi Panelon kun Direkta Animacio ⟫
    static kaŝiPanelon(panel: HTMLElement, panelId: string): Promise<void> {
        if (!panel) return Promise.resolve();

        return AnimacioAdministranto.fermiPanelon(panel, panelId, {
            duration: this.animationDuration
        }).then(() => {
            forigiKlason(panel, "visible");
    });
    }

    // ⟪ Montri Panelon kun Direkta Animacio ⟫
    static montriPanelon(panel: HTMLElement, btnId: string, estasSxoviloj: boolean = false, panelId: string | null = null): Promise<void> {
        if (!panel) return Promise.resolve();

        this.poziciigiPanelon(panel, btnId, estasSxoviloj, panelId);

        void panel.offsetWidth;

        agordiButonPremita(btnId, true);

        return AnimacioAdministranto.malfermiPanelon(panel, panelId || btnId, {
            duration: this.animationDuration
        }).then(() => {
            aldoniKlason(panel, "visible");
    });
    }

    // ⟪ Fermi Ĉiujn Panelojn ⟫ - Unuigita fino de sistemaj paneloj, starta menuo kaj doko
    static fermiCxiujnPanelojn(): Promise<void[]> {
        const animations: Promise<void>[] = [];

        [this.panels.quickSettings, this.panels.notifications, this.panels.clockFlyout, this.panels.recents].forEach(panelId => {
            const panel = this.akiriPanelon(panelId);
            if (panel && this.cxuPaneloVidebla(panel)) {
                animations.push(this.kaŝiPanelon(panel, panelId));
            }
        });

        const startMenu: HTMLElement | null = akiriKomencanMenuon();
        if (startMenu && cxuKlaso(startMenu, "open")) {
            animations.push(AnimacioAdministranto.fermiPanelon(startMenu, "startMenu", {
                duration: this.animationDuration
            }).then(() => {
                forigiKlason(startMenu, "open");
                forigiKlason(document.body, "start-menu-open");
            }));
        }

        const dock = this.akiriPanelon(this.panels.dock);
        if (dock && this.cxuPaneloVidebla(dock)) {
            animations.push(AnimacioAdministranto.malaperiEl(dock, {
                duration: CONSTANTS.ANIM.DURATION_SHORT
            }).then(() => {
                forigiKlason(dock, "visible");
            }));
        }

        ["status-area", "notification-btn", "clock-area", "recents-btn", "home-area"].forEach(btnId => {
            agordiButonPremita(btnId, false);
        });

        return Promise.all(animations);
    }

    // ⟪ Poziciigi Panelon ⟫
    static poziciigiPanelon(panel: HTMLElement, btnId: string, estasSxoviloj: boolean = false, panelId: string | null = null): void {
        if (!panel) return;
        const taskbar: HTMLElement | null = akiriTaskobreton();
        const pos: string = taskbar ? (taskbar.dataset.position || "left") : "left";

        const tbSize: number = akiriTaskobretanGrandecon();
        const tbBuffer: string = `${tbSize + CONSTANTS.SYS.MARGIN * 2}px`;
        const rando: string = `${CONSTANTS.SYS.MARGIN}px`;
        const interspaco: string = "8px";

        ["left", "right", "top", "bottom"].forEach(p => { (panel.style as any)[p] = "auto"; });
        panel.style.transform = "none";
        panel.style.blockSize = "fit-content";

        const pozicioj: { [key: string]: string } = this._akiriPanelajnPoziciojn(tbBuffer, rando, interspaco, estasSxoviloj, pos, btnId, panelId);

        Object.entries(pozicioj).forEach(([prop, val]) => {
            (panel.style as any)[prop] = val;
        });
    }

    // ⟪ Akiri Panelajn Poziciojn ⟫ - Legas CONSTANTS.TASKBAR_POSITIONS ( unuigita agordo )
    static _akiriPanelajnPoziciojn(tbBuffer: string, rando: string, interspaco: string, estasSxoviloj: boolean, pos: string, btnId: string, panelId: string | null): { [key: string]: string } {
        const sxovilaOfseto: string = estasSxoviloj ? `calc(${tbBuffer} + 300px + ${interspaco})` : tbBuffer;
        const estasMaldekstra: boolean = btnId === "status-area" || btnId === "recents-btn";
        const estasDekstra: boolean = btnId === "clock-area" || btnId === "notification-btn";
        const estasCentra: boolean = !estasMaldekstra && !estasDekstra;

        // Unuigita agordo — la sama tabelo legata de AnimacioAdministranto kaj FenestraAdministranto
        const agordo = CONSTANTS.TASKBAR_POSITIONS[pos] || CONSTANTS.TASKBAR_POSITIONS.bottom;
        const alignValoro = estasMaldekstra ? rando : estasDekstra ? "auto" : "50%";

        return {
            [pos]: sxovilaOfseto,
            [agordo.opposite]: "auto",
            [agordo.secondary]: estasDekstra ? rando : "auto",
            [agordo.align]: alignValoro,
            transform: estasCentra ? agordo.centerTransform : "none"
        };
    }

    // ⟪ Baskuli Panelon ⟫
    static baskuligi(panelId: string, btnId: string, opts?: { onBefore?: () => void; onAboutToShow?: () => void; onShow?: () => void }): void {
        if ( opts?.onBefore ) opts.onBefore();
        const panel = this.akiriPanelon( panelId );
        if ( !panel ) return;

        const estasVidebla = this.cxuPaneloVidebla( panel );
        this.fermiCxiujnPanelojn();

        if ( !estasVidebla ) {
            if ( opts?.onAboutToShow ) opts.onAboutToShow();
            setTimeout( () => {
                if ( opts?.onShow ) opts.onShow();
                else this.montriPanelon( panel, btnId, false, panelId );
            }, this.animationDuration );
        }
    }

    // ⟪ Baskuli Rapidajn Agordojn ⟫ - la malnova enreta montra kopio kunfandiĝis en montriPanelon
    static baskuligiRapidaAgordoj(): void {
        this.baskuligi( this.panels.quickSettings, "status-area" );
    }

    // ⟪ Baskuli Sciigojn ⟫
    static baskuligiSciigojn(): void {
        this.baskuligi( this.panels.notifications, "notification-btn", {
            onBefore: () => {
                if ( ( window as any ).SciigoAdministranto ) ( window as any ).SciigoAdministranto.renderi();
            }
        } );
    }

    // ⟪ Baskuli Horloĝan Elflugaĵon ⟫
    static baskuligiHorlogxoElsxovo(): void {
        this.baskuligi( this.panels.clockFlyout, "clock-area", {
            onBefore: () => {
                if ( ( window as any ).HorlogxoAdministranto ) ( window as any ).HorlogxoAdministranto.aktualigi();
            }
        } );
    }

    // ⟪ Baskuli Komencan Menuon ⟫ - uzas la unuigitan baskulan skeletan logikon
    static baskuligiKomencaMenuo(): void {
        const startMenu: HTMLElement | null = akiriKomencanMenuon();
        if (!startMenu) return;

        const estasMalferma = cxuKlaso(startMenu, "open");
        if (estasMalferma) {
            AnimacioAdministranto.fermiPanelon(startMenu, "startMenu", {
                duration: this.animationDuration
            }).then(() => {
                forigiKlason(startMenu, "open");
                forigiKlason(document.body, "start-menu-open");
            });
        } else {
            this.fermiCxiujnPanelojn();
            setTimeout(() => {
                if ((window as any).LabortablaPiktogramoAdministranto?.startMenu) {
                    (window as any).LabortablaPiktogramoAdministranto.startMenu.refresh();
                }

                AnimacioAdministranto.malfermiPanelon(startMenu, "startMenu", {
                    duration: this.animationDuration
                }).then(() => {
                    aldoniKlason(startMenu, "open");
                    aldoniKlason(document.body, "start-menu-open");
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

        const estasVidebla = this.cxuPaneloVidebla(panel);
        this.fermiCxiujnPanelojn();

        if (!estasVidebla) {
            if (typeof bildigiLastatempajn === "function") {
                bildigiLastatempajn();
            }

            if (!cxuTaskbretoGranda() && dock) {
                if (typeof aktualigiDokon === "function") {
                    aktualigiDokon();
                }
                const windows: NodeListOf<HTMLElement> = akiriMalfermajnFenestrojn();
                if (windows.length > 0) {
                    aldoniKlason(dock, "visible");
                    AnimacioAdministranto.malaperiEn(dock, { duration: CONSTANTS.ANIM.DURATION_SHORT });
                }
            }

            setTimeout(() => {
                this.montriPanelon(panel, "recents-btn", false, "recents");
            }, this.animationDuration);
        }
    }

    // ⟪ Iniciati Panelan Eksterklakan Traktilon ⟫
    static iniciiEksterklakanTraktilon(): void {
        klikoEkstereTraktilo(
            [ ".system-panel", "#taskbar", "#taskbar-dock", "#start-menu", "#recents-panel", "#quick-settings-container" ],
            () => this.fermiCxiujnPanelojn()
        );
    }
}

// Aldoni al fenestro por tutmonda aliro
( window as any ).PanelaAdministranto = PanelaAdministranto;
