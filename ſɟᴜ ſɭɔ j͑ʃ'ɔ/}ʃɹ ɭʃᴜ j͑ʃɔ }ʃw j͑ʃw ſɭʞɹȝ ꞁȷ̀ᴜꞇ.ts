// ≺⧼ Kunteksta Menuo Administranto ⧽≻

declare const CONSTANTS: any;
declare const AnimacioAdministranto: any;
declare const getStrings: any;
declare const getWindowManager: any;

import { AppData } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";
import { akiriMaksimumanPaĝon } from "./ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ.js";
import { klikoEkstereTraktilo } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

let APPS: AppData[] = [];

// ⟪ Kunteksta Menuo Administranto ⟫

export const KuntekstaMenuoAdministranto = {
    menuo: null as any,
    labortablo: null as any,
    menuoMalfermita: false,
    nunaKahelo: null as any,

    inicii() {
        this.menuo = document.getElementById( "context-menu" );
        this.labortablo = document.getElementById( "desktop" );
        if ( !this.menuo || !this.labortablo ) return;

        this.labortablo.addEventListener( "contextmenu", ( e: MouseEvent ) => {
            if ( ( e.target as HTMLElement ).closest( ".app-tile" ) ) return;
            e.preventDefault();
            e.stopPropagation();
            this.menuoMalfermita = true;
            this.montriPorLabortablo( e.clientX, e.clientY );
        } );

    // Kaŝi menuon kiam oni klakas ekstere (sama ŝablono kiel PanelaAdministranto)
        klikoEkstereTraktilo( [ "#context-menu" ], () => this.kaŝi(), () => this.menuoMalfermita );

    // Kaŝi menuon kiam oni dek-klakas ekstere (por montri novan kuntekstan menuon)
        document.addEventListener( "contextmenu", ( e: MouseEvent ) => {
            if ( !this.menuoMalfermita ) return;
            const inMenu = ( e.target as HTMLElement ).closest( "#context-menu" );
            if ( !inMenu ) {
                this.kaŝi();
            }
        } );
    },

    montriPorLabortablo( x: number, y: number ) {
        this.nunaKahelo = null;
        this.bildigiMenuon( [
            { action: "edit-mode", label: "Redakta Reĝimo", icon: "✏️", i18n: "ctx_edit_mode" }
        ], [
            { action: "refresh", label: "Refreŝigi", icon: "🔄", i18n: "ctx_refresh" },
            { action: "new-note", label: "Nova Noto", icon: "📝", i18n: "ctx_new_note" },
            { action: "terminal", label: "Terminalo", icon: "💻", i18n: "ctx_terminal" }
        ], x, y );
    },

    montriPorKahelo( x: number, y: number, tileEl: HTMLElement ) {
        this.nunaKahelo = tileEl;

    // Konstrui movpaĝajn agojn por portebla reĝimo
        const movePageActions = [];
        const maxPage = akiriMaksimumanPaĝon( APPS );

        if ( maxPage > 0 ) {
            for ( let i = 0; i <= maxPage; i++ ) {
                movePageActions.push( {
                    action: `move-page-${i}`,
                    label: `Page ${i + 1}`,
                    icon: `${i + 1}`,
                    i18n: "ctx_move_page"
                } );
            }
        }

        this.bildigiMenuon( [
            { action: "edit-mode", label: "Redakta Reĝimo", icon: "✏️", i18n: "ctx_edit_mode" }
        ], [
            ...movePageActions,
            { action: "toggle-widget", label: "Fenestraĵa Reĝimo", icon: "🖼️", i18n: "ctx_widget_mode" },
            { action: "toggle-live-tile", label: "Vivanta Kahela Reĝimo", icon: "✨", i18n: "ctx_live_tile_mode" }
        ], x, y );
    },

    bildigiMenuon( primaryActions: any[], secondaryActions: any[], x: number, y: number ) {
        const allActions = [ ...primaryActions, ...secondaryActions ];
        const strings = typeof getStrings === "function" ? getStrings() : {};

        const renderButton = ( btn: any ) => {
            let label = btn.label || "";
            let i18nLabel = "";
            
    // Trakti i18n kun lokaĵa anstataŭigo por ctx_move_page
            if ( btn.i18n && strings[ btn.i18n ] ) {
                i18nLabel = strings[ btn.i18n ];
                if ( btn.i18n === "ctx_move_page" && btn.label ) {
                    const pageNum = btn.label.replace( "Page ", "" );
                    label = i18nLabel.replace( "{ɿ}", pageNum );
                } else {
                    label = i18nLabel;
                }
            }

            const i18nAttr = btn.i18n ? ` data-oskakefani="${btn.i18n}"` : "";
            const labelHtml = label ? `<span>${label}</span>` : "";
            
            return `<button data-action="${btn.action}"${i18nAttr} title="${label}">${labelHtml}<span>${btn.icon}</span></button>`;
        };

        if ( this.menuo ) {
            this.menuo.innerHTML = allActions.map( renderButton ).join( "" );
            this.ligiMenuajnEventojn();
             this.montri( x, y );
        }
    },

    ligiMenuajnEventojn() {
        if ( this.menuo ) {
            this.menuo.querySelectorAll( "button" ).forEach( ( item: any ) => {
                ( item as HTMLElement ).onclick = ( e: MouseEvent ) => {
                    this.pritraktiAgadon( ( e.currentTarget as HTMLElement ).dataset.action );
                    this.kaŝi();
                };
            } );
        }
    },

    montri( x: number, y: number ) {
        if ( this.menuo ) {
            this.menuo.style.left = x + "px";
            this.menuo.style.top = y + "px";
            this.menuo.classList.add( "visible" );

            const rect = this.menuo.getBoundingClientRect();
            if ( rect.right > window.innerWidth ) this.menuo.style.left = ( window.innerWidth - rect.width ) + "px";
            if ( rect.bottom > window.innerHeight ) this.menuo.style.top = ( window.innerHeight - rect.height ) + "px";

            if ( AnimacioAdministranto ) {
                AnimacioAdministranto.sxprucEn( this.menuo, {
                    duration: CONSTANTS.ANIM_SETTINGS.popup.duration,
                    easing: CONSTANTS.ANIM_SETTINGS.popup.easing
                } );
            }
        }
    },

    kaŝi() {
        if ( this.menuo ) {
            if ( AnimacioAdministranto ) {
                AnimacioAdministranto.sxprucEl( this.menuo, {
                    duration: CONSTANTS.ANIM_SETTINGS.popup.duration,
                    easing: CONSTANTS.ANIM_SETTINGS.popup.easing
                } ).then( () => {
                    this.menuo?.classList.remove( "visible" );
                } );
            } else {
                this.menuo?.classList.remove( "visible" );
            }
        }
        this.menuoMalfermita = false;
    },

    pritraktiAgadon( action: string | undefined ) {
        if ( !action ) return;
        const wm = getWindowManager();

    // Trakti movpaĝajn agojn por portebla reĝimo
        if ( action.startsWith( "move-page-" ) ) {
            const targetPage = parseInt( action.replace( "move-page-", "" ) );
            if ( this.nunaKahelo && ( window as any ).LabortablaPiktogramoAdministranto?.desktop ) {
                ( window as any ).LabortablaPiktogramoAdministranto.movigiKahelonAlPagxo( this.nunaKahelo, targetPage );
            }
            return;
        }

        switch ( action ) {
            case "refresh": location.reload(); break;
            case "toggle-widget":
            case "toggle-live-tile":
                if ( this.nunaKahelo ) {
                    this.nunaKahelo.classList.toggle( "widget-mode", action === "toggle-widget" );
                    this.nunaKahelo.classList.toggle( "live-tile-mode", action === "toggle-live-tile" );
                }
                break;
            case "edit-mode": ( window as any ).LabortablaPiktogramoAdministranto?.desktop?.toggleEdit(); break;
            case "new-note": wm?.sxargiAplikonDeVojo( "ſɟᴜ ſɭɹ/ſɟᴜ ſᶘᴜ j͐ʃɹ.html", "Notoj" ); break;
            case "terminal": wm?.sxargiAplikonDeVojo( "ſɟᴜ ſɭɹ/ſןɔ ſɭʞꞇ.html", "Terminalo" ); break;
        }
    }
};

// Aldoni al fenestro por tutmonda aliro
( window as any ).KuntekstaMenuoAdministranto = KuntekstaMenuoAdministranto;
