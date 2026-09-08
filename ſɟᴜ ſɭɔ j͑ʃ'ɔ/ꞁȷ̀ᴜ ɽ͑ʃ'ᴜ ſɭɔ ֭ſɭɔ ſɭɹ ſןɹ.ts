// ≺⧼ Fenestra Administranto ⧽≻

declare const CONSTANTS: any;
declare const akiriFenestranUjon: any;
declare const akiriHejmanAreon: any;
declare const akiriTaskobreton: any;
declare const agordiTrenanStaton: any;
declare const EnigaAdministranto: any;
declare const AnimacioAdministranto: any;
declare const akiriTextojn: any;
declare const APPS: any;
declare const aktualigiDokon: any;
declare const akiriFenestranTitolon: any;
declare const akiriPiktogramon: any;

import { setupMontrajnEventojn, akiriMontranPunkton } from "./ſɟᴜƽ ꞁȷ̀ᴜ }ʃꞇ/ŋᷠᴜ ſȷɔ ſɭ,ꞇ.js";

// ⟪ HSL → Hex Konvertilo ⟫
// h: 0-360°, s kaj l: 0-1

function _akiriHSLHex( h: number, s: number, l: number ): string {
    const c: number = ( 1 - Math.abs( 2 * l - 1 ) ) * s;
    const x: number = c * ( 1 - Math.abs( ( ( h / 0o74 ) % 2 ) - 1 ) );
    const m: number = l - c / 2;

    let r = 0, g = 0, b = 0;
    if ( h < 0o74 ) { r = c; g = x; }
    else if ( h < 0o170 ) { r = x; g = c; }
    else if ( h < 0o264 ) { g = c; b = x; }
    else if ( h < 0o360 ) { g = x; b = c; }
    else if ( h < 0o454 ) { r = x; b = c; }
    else { r = c; b = x; }

    const alHex = ( raw: number ): string => {
        // Per konstrukcio raw ( = r + m aŭ g + m aŭ b + m ) ≤ 1, do 0o377 estas la
        // ĝusta maksimuma multiplikato sen bezonata klampo
        const v = Math.round( raw * 0o377 );
        return v.toString( 16 ).padStart( 2, "0" );
    };
    return "#" + alHex( r + m ) + alHex( g + m ) + alHex( b + m );
}


// \u27ea Hilaj Funkcioj por Tavola Komponado \u27eb

function _hexToRgba( hex: string, alfa: number ): string {
    const c: string = hex.charAt( 0 ) === "#" ? hex.substring( 1 ) : hex;
    const r: number = parseInt( c.substring( 0, 2 ), 16 );
    const g: number = parseInt( c.substring( 2, 4 ), 16 );
    const b: number = parseInt( c.substring( 4, 6 ), 16 );
    return `rgba(${r},${g},${b},${Math.max(0, Math.min(1, alfa)).toFixed(2)})`;
}

const _randEntjer = ( min: number, max: number ): number =>
    Math.floor( min + Math.random() * ( max - min + 1 ) );

const _randPozicio = (): string =>
    `${_randEntjer( 0o17, 0o125 )}% ${_randEntjer( 0o17, 0o125 )}%`;

// Magiaj ne\u016daj akcentoj por 20% de brilaj akcentoj - donas surprizan diversecon
const _MAGIAJ_NEUTRALOJ: string[] = [
    "#ffd166",
    "#7adfff",
    "#ffffff",
    "#ff8acc",
    "#a3b6ff",
    "#caffc7"
];

function _akiriBrilanAkcenton( h: number, s: number ): string {
    const novaS: number = Math.min( 0.95, s + 0.20 );
    const novaL: number = Math.min( 0.88, 0.60 + Math.random() * 0.20 );
    return _akiriHSLHex( h, novaS, novaL );
}

function _akiriAkcentanKoloron( h: number, s: number ): string {
    // 20% magiaj ne\u016daj; 80% derivitaj de la baza huao (altigitaj S/L)
    if ( Math.random() < 0.20 ) {
        return _MAGIAJ_NEUTRALOJ[ _randEntjer( 0, _MAGIAJ_NEUTRALOJ.length - 1 ) ];
    }
    return _akiriBrilanAkcenton( h, s );
}

// Brila orbo: hela koloro en centro, malklari\u011das al menumo%
function _briloTavolo( hex: string, intenseco: number, menumo: number ): string {
    return `radial-gradient(circle at ${_randPozicio()}, ${_hexToRgba( hex, intenseco )} 0%, ${_hexToRgba( hex, 0 )} ${menumo}%)`;
}

// Frostita vitro: travidebla centro, meza bando, malklari\u011das eksteren
function _frostTavolo( hex: string, opako: number ): string {
    return `radial-gradient(circle at ${_randPozicio()}, ${_hexToRgba( hex, 0 )} 0%, ${_hexToRgba( hex, opako )} 45%, ${_hexToRgba( hex, 0 )} 100%)`;
}

// Subtila direkta lavumo
function _lavTavolo( hex: string, opako: number, angulo: number ): string {
    return `linear-gradient(${angulo}deg, ${_hexToRgba( hex, opako )} 0%, ${_hexToRgba( hex, 0 )} 65%)`;
}

// Konusa prisma radio (mallar\u011da, klare difinita)
function _konusTavolo( hex: string, opako: number ): string {
    const angulo: number = _randEntjer( 0, 0o550 );
    return `conic-gradient(from ${angulo}deg at ${_randPozicio()}, ${_hexToRgba( hex, 0 )} 0deg, ${_hexToRgba( hex, opako )} 18deg, ${_hexToRgba( hex, 0 )} 36deg)`;
}

type _Regimo = "aūroro" | "kosmo" | "frost" | "prismo";

// Re\u011dimo-pez-distribuo: a\u016broro 33%, kosmo 33%, frost 17%, prismo 17%
const _REGIMOJ: _Regimo[] = [ "aūroro", "aūroro", "kosmo", "kosmo", "frost", "prismo" ];

function _konstruiTavolojn(
    koloroj: string[],
    h1: number, s1: number,
    angulo: number,
    tipo: "linear" | "radial",
    regimo: _Regimo
): string[] {
    const baza: string = tipo === "radial"
        ? `radial-gradient(ellipse at center, ${koloroj.join( ", " )})`
        : `linear-gradient(${angulo}deg, ${koloroj.join( ", " )})`;

    const tavoloj: string[] = [];

    if ( regimo === "aūroro" ) {
        // A\u016broro: 2 lar\u011daj molaj briloj + eventuala lavumo
        const ak1: string = _akiriAkcentanKoloron( h1, s1 );
        const ak2: string = _akiriAkcentanKoloron( h1, s1 );
        tavoloj.push( _briloTavolo( ak1, 0.55, 0o74 ) );
        tavoloj.push( _briloTavolo( ak2, 0.45, 0o106 ) );
        if ( Math.random() < 0.50 ) {
            tavoloj.push( _lavTavolo( "#ffffff", 0.06, _randEntjer( 0o120, 0o264 ) ) );
        }
    } else if ( regimo === "kosmo" ) {
        // Kosmo: 3 akraj densaj briloj + malhela vualo
        const ak1: string = _akiriAkcentanKoloron( h1, s1 );
        const ak2: string = _akiriAkcentanKoloron( h1, s1 );
        const ak3: string = _akiriAkcentanKoloron( h1, s1 );
        tavoloj.push( _briloTavolo( ak1, 0.85, 0o43 ) );
        tavoloj.push( _briloTavolo( ak2, 0.75, 0o36 ) );
        tavoloj.push( _briloTavolo( ak3, 0.65, 0o55 ) );
        tavoloj.push( _lavTavolo( "#000000", 0.25, 0o264 ) );
    } else if ( regimo === "frost" ) {
        // Frosto: 2-3 frostitaj vitroj + ak\u0109enta brilo
        const lav: string = "#ffffff";
        const ak: string = _akiriAkcentanKoloron( h1, s1 );
        tavoloj.push( _frostTavolo( lav, 0.30 ) );
        tavoloj.push( _frostTavolo( lav, 0.22 ) );
        if ( Math.random() < 0.60 ) {
            tavoloj.push( _frostTavolo( ak, 0.18 ) );
        }
        tavoloj.push( _briloTavolo( ak, 0.40, 0o62 ) );
    } else if ( regimo === "prismo" ) {
        // Prismo: konusaj radioj de baza koloroj + 1 magia
        koloroj.forEach( hex => {
            tavoloj.push( _konusTavolo( hex, 0.40 ) );
        });
        if ( koloroj.length < 3 ) {
            const plia: string = _akiriAkcentanKoloron( h1, s1 );
            tavoloj.push( _konusTavolo( plia, 0.35 ) );
        }
    }


    // Baza IRAS LAS -- CSS background-image desupre montras la unuan tavolon,
    // do por ke la opaka baza estu FONE (ne kaŝu la brilojn / frostajn vitrojn),
    // ni aldonas ĝin post la translucentaj tavoloj en la listo.
    tavoloj.push( baza );

    return tavoloj;
}


class FenestraAdministranto {
    static statikaZIndekso: number = CONSTANTS.WM.BASE_Z_INDEX;
    static statikaTemoVigladilo: any = null;
    static statikaNunaTemo: string = "detect";

    // Tab-trena stato ( aktiva nur dum tabo estas trenata )
    static tabTrenaStato: { tabId: string; fantomo: HTMLElement | null; fontaFenestro: HTMLElement | null; foriganto: (() => void) | null } = { tabId: "", fantomo: null, fontaFenestro: null, foriganto: null };

    // ⟪ Tabaj Stat-helperoj ⟫

    static _akiriTabojn( fenestro: HTMLElement ): HTMLElement[] {
        return Array.from( fenestro.querySelectorAll( ".tab-btn" ) ) as HTMLElement[];
    }

    static _akiriAktivanTabon( fenestro: HTMLElement ): HTMLElement | null {
        const taboj = this._akiriTabojn( fenestro );
        return taboj.find( t => t.getAttribute( "aria-pressed" ) === "true" ) || taboj[ taboj.length - 1 ] || null;
    }

    // ⟪ Aldoni Tabon al Fenestro ⟫

    static aldoniTabonAl( fenestro: HTMLElement, path: string, titolo: string, enhavoHtml: string = "" ): string {
        const fenestroId = fenestro.id;
        const enhavujo = fenestro.querySelector( ".tab-enhavujo" ) as HTMLElement | null;
        if ( !enhavujo ) return "";

        const tabId = fenestroId + "-tab" + Date.now();
        const iframeId = "iframe-" + tabId;

        // Krei la enhavan ujon ( kaŝita ĝis aktivigo )
        const senvolvaĵo = document.createElement( "div" );
        senvolvaĵo.className = "tab-enhavo";
        senvolvaĵo.dataset.tab = tabId;
        senvolvaĵo.style.display = "none";
        senvolvaĵo.innerHTML = path
            ? this._konstruiIframanEnhavon( iframeId, path )
            : ( enhavoHtml || `<div><p>${titolo}</p></div>` );
        enhavujo.appendChild( senvolvaĵo );

        // Krei la taban butonon en la tabstrio ( ĉe la fino )
        const tabstrio = fenestro.querySelector( ".tab-strip" ) as HTMLElement | null;
        if ( !tabstrio ) return "";
        tabstrio.insertAdjacentHTML( "beforeend", this._konstruiTabon( tabId, titolo, false, path ) );

        if ( path ) this._injektiStilojnEnIframon( iframeId );
        this.aktivigiTabon( tabId );
        return tabId;
    }

    // ⟪ Aldoni Novan Tabon de la Aplikaĵo ( x-butono ) ⟫

    static aldoniTabon( fenestroId: string ): void {
        const fenestro = document.getElementById( fenestroId );
        if ( !fenestro ) return;
        this.fokusigiFenestron( fenestroId );

        const enhavujo = fenestro.querySelector( ".tab-enhavujo" ) as HTMLElement | null;
        if ( !enhavujo || enhavujo.children.length === 0 ) return;

        // Uzi la vojon de la lasta tabo kiel defaŭlta aplikaĵo
        const lastaTabo = this._akiriTabojn( fenestro ).pop();
        const vojo = lastaTabo?.dataset.src || "";
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === vojo ) : null;
        const titolo = app?.title || vojo.split( "/" ).pop()?.replace( ".html", "" ) || "App";

        this.aldoniTabonAl( fenestro, vojo, titolo );
    }

    // ⟪ Aktivigi Tabon ⟫

    static aktivigiTabon( tabId: string ): void {
        const tabo = document.querySelector( `.tab-btn[data-tab="${tabId}"]` ) as HTMLElement | null;
        if ( !tabo ) return;
        const fenestro = tabo.closest( ".window" ) as HTMLElement | null;
        if ( !fenestro ) return;

        // Malpremi ĉiujn tabojn de tiu ĉi fenestro kaj premi la celan
        this._akiriTabojn( fenestro ).forEach( t => t.setAttribute( "aria-pressed", ( t === tabo ).toString() ) );
        fenestro.dataset.activeTab = tabId;

        // Montri nur la enhavon de la aktiva tabo
        const enhavujo = fenestro.querySelector( ".tab-enhavujo" ) as HTMLElement | null;
        if ( enhavujo ) {
            enhavujo.querySelectorAll( ":scope > .tab-enhavo" ).forEach( el => {
                ( el as HTMLElement ).style.display = ( ( el as HTMLElement ).dataset.tab === tabId ) ? "" : "none";
            } );
        }

        // Rulumi la tabon en videblecon kaj fokusigi la fenestron
        tabo.scrollIntoView( { block: "nearest", inline: "nearest", behavior: "smooth" } );
        if ( fenestro.classList.contains( "minimized" ) ) this.fokusigiFenestron( fenestro.id );
        else this.alenportiAlFrunto( fenestro.id );
    }

    // ⟪ Fermi Tabon ⟫

    static fermiTabon( tabId: string ): void {
        const tabo = document.querySelector( `.tab-btn[data-tab="${tabId}"]` ) as HTMLElement | null;
        if ( !tabo ) return;
        const fenestro = tabo.closest( ".window" ) as HTMLElement | null;
        if ( !fenestro ) return;

        const estisAktiva = tabo.getAttribute( "aria-pressed" ) === "true";
        const taboj = this._akiriTabojn( fenestro );
        const indekso = taboj.indexOf( tabo );

        // Forigi enhavon kaj taban butonon
        fenestro.querySelector( `.tab-enhavo[data-tab="${tabId}"]` )?.remove();
        tabo.remove();

        if ( fenestro.querySelector( ".tab-btn" ) ) {
            // Restas taboj — aktivigi najbaran se la fermita estis aktiva
            if ( estisAktiva ) {
                const najbaro = taboj[ indekso + 1 ] || taboj[ indekso - 1 ] || null;
                if ( najbaro ) this.aktivigiTabon( najbaro.dataset.tab as string );
            }
            return;
        }

        // Lasta tabo fermita — fermi la tutan fenestron
        this.fermiFenestron( fenestro.id );
    }
    
    // ⟪ Komenci Tab-Trenadon ( premado sur tabo ) ⟫

    static komenciTabTrenadon( e: PointerEvent, tabId: string ): void {
        // Nur maldekstra butono / unua tuŝo
        if ( e.button !== undefined && e.button !== 0 ) return;

        const tabo = document.querySelector( `.tab-btn[data-tab="${tabId}"]` ) as HTMLElement | null;
        const fenestro = tabo?.closest( ".window" ) as HTMLElement | null;
        if ( !tabo || !fenestro ) return;

        const komencoX = e.clientX;
        const komencoY = e.clientY;
        let lastaX = e.clientX;
        let lastaY = e.clientY;
        const rekt = tabo.getBoundingClientRect();
        const ofsetoX = komencoX - rekt.left;
        const ofsetoY = komencoY - rekt.top;
        let trenata = false;
        let foriganto: (() => void) | null = null;

        const cxeMov = ( ev: PointerEvent ) => {
            lastaX = ev.clientX;
            lastaY = ev.clientY;
            if ( ev.buttons !== undefined && ev.buttons === 0 && ev.type === "mousemove" ) { fini(); return; }

            if ( !trenata ) {
                if ( Math.abs( ev.clientX - komencoX ) < CONSTANTS.INPUT.DRAG_THRESHOLD && Math.abs( ev.clientY - komencoY ) < CONSTANTS.INPUT.DRAG_THRESHOLD ) return;
                // ( Ŝango ) Sojlo transirita — komenci la trenom
                trenata = true;
                agordiTrenanStaton( true );
                this._akiriTabTrenanStaton( tabId, tabo, fenestro );
            }
            ev.preventDefault();
            this.aktualigiTabTrenadon( ev.clientX, ev.clientY, ofsetoX, ofsetoY );
        };

        const fini = () => {
            document.removeEventListener( "pointermove", cxeMov );
            document.removeEventListener( "pointerup", fini );
            document.removeEventListener( "pointercancel", fini );
            if ( foriganto ) { foriganto(); foriganto = null; }
            if ( trenata ) {
                agordiTrenanStaton( false );
                this.finiTabTrenadon( lastaX, lastaY );
            }
        };

        document.addEventListener( "pointermove", cxeMov );
        document.addEventListener( "pointerup", fini );
        document.addEventListener( "pointercancel", fini );
        foriganto = () => {
            document.removeEventListener( "pointermove", cxeMov );
            document.removeEventListener( "pointerup", fini );
            document.removeEventListener( "pointercancel", fini );
        };
        this.tabTrenaStato.foriganto = foriganto;

        // Ne ebligi la kutiman klakon treni la fenestron anstataŭ la tabon
        e.stopPropagation();
    }

    // Ensalvi la trenatan tabon kaj krei la fantomon

    static _akiriTabTrenanStaton( tabId: string, tabo: HTMLElement, fenestro: HTMLElement ): void {
        this.forigiTabTrenanFantomon();
        this.tabTrenaStato.tabId = tabId;
        this.tabTrenaStato.fontaFenestro = fenestro;

        // Fantomo — flosanta kopio de la tabo por vida retrosciigo
        const fantomo = document.createElement( "div" );
        fantomo.className = "tab-drag-ghost n2tase";
        fantomo.textContent = ( tabo.querySelector( ".tab-title" ) as HTMLElement | null )?.innerText || "Tab";
        document.body.appendChild( fantomo );
        this.tabTrenaStato.fantomo = fantomo;
        tabo.classList.add( "tab-dragging" );
    }

    static forigiTabTrenanFantomon(): void {
        this.tabTrenaStato.fantomo?.remove();
        this.tabTrenaStato.fantomo = null;
        document.querySelectorAll( ".tab-btn.tab-dragging" ).forEach( el => el.classList.remove( "tab-dragging" ) );
    }

    // Ĝisdatigi la fantomon kaj substreki la celan tabstrion / fal regionon

    static aktualigiTabTrenadon( x: number, y: number, ofsetoX: number, ofsetoY: number ): void {
        if ( !this.tabTrenaStato.fantomo ) return;
        this.tabTrenaStato.fantomo.style.left = ( x - ofsetoX ) + "px";
        this.tabTrenaStato.fantomo.style.top = ( y - ofsetoY ) + "px";

        // Ĉu la montrilo estas super alia fenestro?
        const { celaStio, celaFenestro } = this._akiriTabTrenajnCelojn( x, y );

        document.querySelectorAll( ".tab-strip.tab-drop-target" ).forEach( s => s.classList.remove( "tab-drop-target" ) );
        if ( celaStio ) celaStio.classList.add( "tab-drop-target" );
        else if ( celaFenestro ) celaFenestro.querySelector( ".tab-strip" )?.classList.add( "tab-drop-target" );
    }

    // Fari la tabon: demeti la fantomon, troviceligi kaj movigi / malfermi novan fenestron

    static finiTabTrenadon( x: number, y: number ): void {
        const { tabId, fontaFenestro } = this.tabTrenaStato;
        this.forigiTabTrenanFantomon();
        document.querySelectorAll( ".tab-strip.tab-drop-target" ).forEach( s => s.classList.remove( "tab-drop-target" ) );
        if ( !tabId ) return;

        const tabo = document.querySelector( `.tab-btn[data-tab="${tabId}"]` ) as HTMLElement | null;
        if ( !tabo || !fontaFenestro || !fontaFenestro.isConnected ) return;

        // Trovi celfenestron sub la montrilo ( alia fenestro kun tabstrio )
        const { celaStio, celaFenestro } = this._akiriTabTrenajnCelojn( x, y );

        // Ĉu la falpunkto estas ene de la fonta fenestro?
        const fontaRekt = fontaFenestro.getBoundingClientRect();
        const enFonta = x >= fontaRekt.left && x <= fontaRekt.right && y >= fontaRekt.top && y <= fontaRekt.bottom;

        if ( celaFenestro && celaFenestro !== fontaFenestro ) {
            // Movigi la tabon al la cela fenestro
            this.movigiTabonInterFenestrojn( tabId, fontaFenestro, celaFenestro );
        } else if ( !celaStio && !enFonta ) {
            // Demetita ekster ĉiu tabstrio kaj ekster la fonta fenestro — malfermi en novan fenestron
            this.malpendigiTabon( tabId, x, y );
        }

        this.tabTrenaStato = { tabId: "", fantomo: null, fontaFenestro: null, foriganto: null };
    }

    // ⟪ Movigi Tabon Inter Fenestroj ⟫

    static movigiTabonInterFenestrojn( tabId: string, fontaFenestro: HTMLElement, celaFenestro: HTMLElement ): void {
        const tabo = fontaFenestro.querySelector( `.tab-btn[data-tab="${tabId}"]` ) as HTMLElement | null;
        const enhavo = fontaFenestro.querySelector( `.tab-enhavo[data-tab="${tabId}"]` ) as HTMLElement | null;
        if ( !tabo || !enhavo ) return;

        // Elpreni la tabon kaj ĝisdatigi la fontan fenestron
        const { titolo, vojo, enhavoHtml } = this._eltiriTabon( fontaFenestro, tabo, enhavo );

        // Enmeti la tabon en la celan fenestron
        const novaTabId = this.aldoniTabonAl( celaFenestro, vojo, titolo, vojo ? "" : enhavoHtml );
        this.fokusigiFenestron( celaFenestro.id );
    }

    // ⟪ Malpendigi Tabon en Novan Fenestron ⟫

    static malpendigiTabon( tabId: string, x: number = 0o200, y: number = 0o40 ): void {
        const tabo = document.querySelector( `.tab-btn[data-tab="${tabId}"]` ) as HTMLElement | null;
        if ( !tabo ) return;
        const fontaFenestro = tabo.closest( ".window" ) as HTMLElement | null;
        if ( !fontaFenestro ) return;

        // Elpreni la tabon kaj ĝisdatigi la fontan fenestron
        const fontaEnhavo = fontaFenestro.querySelector( `.tab-enhavo[data-tab="${tabId}"]` ) as HTMLElement | null;
        const { titolo, vojo, enhavoHtml } = this._eltiriTabon( fontaFenestro, tabo, fontaEnhavo );

        // Krei novan fenestron ĉe la falpunkto ( limigita al la vidfenestro )
        const limigitaX = Math.min( Math.max( x - 0o40, 0 ), Math.max( 0, window.innerWidth - CONSTANTS.INPUT.RESIZE_MIN_WIDTH ) );
        const limigitaY = Math.min( Math.max( y - 0o20, 0 ), Math.max( 0, window.innerHeight - CONSTANTS.INPUT.RESIZE_MIN_HEIGHT ) );
        this._kreiFenestronKunTabo(
            ( iframeId ) => vojo ? this._konstruiIframanEnhavon( iframeId, vojo ) : enhavoHtml,
            vojo,
            { titolo, cepufal: true, injekti: !!vojo, x: limigitaX, y: limigitaY }
        );
        this.renderiLastatempajn();
    }
    
    // ⟪ Eltiri Tabon el Fenestro ⟫ - demetas la tabon kaj ĝisdatigas la fontan fenestron ( najbara aktivigo aŭ fermo )

    static _eltiriTabon( fontaFenestro: HTMLElement, tabo: HTMLElement, enhavo: HTMLElement | null ): { titolo: string; vojo: string; enhavoHtml: string } {
        const estisAktiva = tabo.getAttribute( "aria-pressed" ) === "true";
        const taboj = this._akiriTabojn( fontaFenestro );
        const indekso = taboj.indexOf( tabo );

        const titolo = ( tabo.querySelector( ".tab-title" ) as HTMLElement | null )?.innerText || "Tab";
        const vojo = tabo.dataset.src || "";
        const enhavoHtml = enhavo ? enhavo.innerHTML : "";

        tabo.remove();
        enhavo?.remove();

        if ( fontaFenestro.querySelector( ".tab-btn" ) ) {
            if ( estisAktiva ) {
                const najbaro = taboj[ indekso + 1 ] || taboj[ indekso - 1 ] || null;
                if ( najbaro ) this.aktivigiTabon( najbaro.dataset.tab as string );
            }
        } else {
            // Fonta fenestro malpleniĝis — fermi ĝin sen animacio
            fontaFenestro.remove();
            this.agordiAplikonAktiva();
            this.renderiLastatempajn();
        }

        return { titolo, vojo, enhavoHtml };
    }

    // ⟪ Trovi Tab-Trenajn Celojn sub la Montrilo ⟫ - kunhavata de la fantomo-ĝisdatigo kaj la taba falo

    static _akiriTabTrenajnCelojn( x: number, y: number ): { celaStio: HTMLElement | null; celaFenestro: HTMLElement | null } {
        const ebloj = document.elementsFromPoint( x, y );
        const celaStio = ebloj.find( el => ( el as HTMLElement ).closest?.( ".tab-strip" ) ) as HTMLElement | null;
        const celaFenestro = ( celaStio?.closest( ".window" ) || ebloj.map( el => ( el as HTMLElement ).closest?.( ".window" ) ).find( w => w && w !== this.tabTrenaStato.fontaFenestro && ( w as HTMLElement ).querySelector( ".tab-strip" ) ) ) as HTMLElement | null;
        return { celaStio, celaFenestro };
    }

    // ⟪ Krei Fenestron kun Unua Tabo ⟫ - unuigita kreo por kreiFenestron, sxargiAplikonDeVojo kaj malpendigiTabon
    // @param enhavoKonstruilo - redonas la internan HTML-on por la unua tabo ( ricevas la iframe-idon )
    // @param vojo - la aplikaĵa vojo registrita sur la tabo ( malplena por statika enhavo )
    // @param opts.titolo - fenestra kaj taba titolo
    // @param opts.simpla - ĉu uzi la simplan titolbreton ( defaŭlte true )
    // @param opts.cepufal - ĉu envolvi la enhavon en cepufal-ujon
    // @param opts.injekti - ĉu injekti stilojn en la iframon
    // @param opts.x / opts.y - fenestra pozicio ( defaŭlte hazarda )

    static _kreiFenestronKunTabo(
        enhavoKonstruilo: ( iframeId: string ) => string,
        vojo: string,
        opts?: { titolo?: string; simpla?: boolean; cepufal?: boolean; injekti?: boolean; x?: number; y?: number }
    ): HTMLElement {
        const id = "win-" + Date.now();
        const titolo = opts?.titolo || "App";
        const ujo = akiriFenestranUjon();
        const fenestro = this._kreiFenestranElementon( id, titolo );
        const app = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === vojo ) : null;
        fenestro.dataset.piktogramo = app?.piktogramo || "Defaŭlta";

        const hazardo = this._aleatoriaFenestraPozicio( CONSTANTS.WM.WINDOW_BASE_Y_CREATE );
        fenestro.style.left = ( opts?.x ?? hazardo.x ) + "px";
        fenestro.style.top = ( opts?.y ?? hazardo.y ) + "px";
        fenestro.style.zIndex = ( ++this.statikaZIndekso ).toString();

        const tabId = id + "-tab0";
        const iframeId = "iframe-" + tabId;
        const internaEnhavo = enhavoKonstruilo( iframeId );
        const titolaBreto = this._konstruiTitolaBreton( id, titolo, opts?.simpla ?? true );
        const enhavujo = `<div class="tab-enhavujo"><div class="tab-enhavo" data-tab="${tabId}">${internaEnhavo}</div></div>`;

        fenestro.innerHTML = ( opts?.cepufal ? `<div class="cepufal" style="padding: 0; inline-size: 100%;">\n            ${titolaBreto}\n            ${enhavujo}\n        </div>\n        ` : titolaBreto + enhavujo ) +
            this._konstruiGrandSxangxilojn( id );

        // Krei la unuan tabon en la tabstrio
        const tabstrio = fenestro.querySelector( ".tab-strip" ) as HTMLElement | null;
        if ( tabstrio ) {
            tabstrio.insertAdjacentHTML( "afterbegin", this._konstruiTabon( tabId, titolo, true, vojo ) );
        }
        fenestro.dataset.activeTab = tabId;

        ujo.appendChild( fenestro );
        // Ĉe porteblaj ekranoj novaj fenestroj malfermiĝas plenekrane
        if ( this.estasPortebla() ) fenestro.classList.add( "fullscreen" );
        this._agordiFenestrajnInteragojn( fenestro );
        this.gxisdatigiTaskobretajnAplikojn();

        if ( opts?.injekti ) {
            this._injektiStilojnEnIframon( iframeId );
        }

        // Animacii fenestran malfermon kun frakcioj
        AnimacioAdministranto.fenestroMalfermi( fenestro, { ...CONSTANTS.ANIM_SETTINGS.windowOpen } );

        return fenestro;
    }

    // ⟪ Helpaj Funkcioj ⟫

    static _aleatoriaFenestraPozicio( baseY: number ): { x: number; y: number } {
        return {
            x: ( Math.floor( Math.random() * CONSTANTS.WM.WINDOW_RANDOM_RANGE ) * CONSTANTS.WM.WINDOW_RANDOM_STEP ) + CONSTANTS.WM.WINDOW_BASE_X,
            y: ( Math.floor( Math.random() * CONSTANTS.WM.WINDOW_RANDOM_RANGE ) * CONSTANTS.WM.WINDOW_RANDOM_STEP ) + baseY
        };
    }

    static _kreiFenestranElementon( id: string, titolo: string ): HTMLElement {
        const fenestro = document.createElement( "div" );
        fenestro.classList.add( "window" );
        fenestro.id = id;
        return fenestro;
    }

    static _agordiFenestrajnInteragojn( fenestro: HTMLElement ): void {
        fenestro.addEventListener( "mousedown", () => { fenestro.style.zIndex = ( ++this.statikaZIndekso ).toString(); } );
        this.agordiAplikonAktiva();
    }

    static _injektiStilojnEnIframon( iframeId: string ): void {
        const iframo = document.getElementById( iframeId ) as HTMLIFrameElement | null;
        if ( !iframo ) return;

        iframo.onload = (): void => {
            try {
                const dokumento = iframo.contentDocument || ( iframo.contentWindow as Window )?.document;
                if ( !dokumento?.head ) return;

                // Injekti superregajn stilojn
                if ( !dokumento.getElementById( "injected-style" ) ) {
                    const stilo = dokumento.createElement( "style" );
                    stilo.id = "injected-style";
                    stilo.textContent = `
                        h1, .saxesukef, .cakaxa, .sozanu, nav, footer, header { display: none !important; }
                        body { background-color: transparent !important; padding: var(--អារេងព៏) !important; }
                        ciihii {
                        background-color: var(--តានេក) !important; }
                    `;
                    dokumento.head.appendChild( stilo );
                }

                // Ligi la tutmondan stilfolion por plena dezajna sistemo
                if ( !dokumento.getElementById( "injected-global-css" ) ) {
                    const tutmondaCss = document.querySelector( 'link[href*="%C4%B1__%C9%94.css"]' ) as HTMLLinkElement | null;
                    if ( tutmondaCss ) {
                        const ligilo = dokumento.createElement( "link" );
                        ligilo.id = "injected-global-css";
                        ligilo.rel = "stylesheet";
                        ligilo.href = tutmondaCss.href;
                        dokumento.head.appendChild( ligilo );
                    }
                }

                // Adopti la propran <title> de la pagio al OS-titola-breto ( lokaj aplikoj, https, same-origin ).
                // Cross-origin https paĝoj ĵetos Sekurec-Eroron ĉi tie — la ekzista try / catch englutos ĝin
                if ( dokumento.title ) {
                    const fenestraId = iframeId.replace( /^iframe-/, "" );
                    // Aktualigi kaj la fenestran titolon kaj la taban butonan titolon
                    const tabaTitolo = document.querySelector( `.tab-btn[data-tab="${fenestraId}"] .tab-title` );
                    if ( tabaTitolo ) tabaTitolo.textContent = dokumento.title;
                }
            } catch ( e ) {
                // Cross-origin iframes ĵetos eraron; silente ignoru
            }
        };
    }

    // ⟪ Konstrui Tabon ⟫

    static _konstruiTabon( id: string, title: string, estasAktiva: boolean, src: string ): string {
        return `<button class="tab-btn" data-tab="${id}" data-src="${src}" aria-pressed="${estasAktiva}" onpointerdown="FenestraAdministranto.komenciTabTrenadon(event, '${id}')" onmousedown="event.stopPropagation()" ontouchstart="event.stopPropagation()" onclick="FenestraAdministranto.aktivigiTabon('${id}')">`
            + `<span class="tab-title">${title}</span>`
            + `<span class="tab-close" onclick="event.stopPropagation(); FenestraAdministranto.fermiTabon('${id}')">/</span>`
            + `</button>`;
    }

    // ⟪ Konstrui Tabstrion ⟫

    static _konstruiTabstrion( fenestroId: string ): string {
        return `<sabosuc2w2q class="tab-strip" data-fenestro="${fenestroId}"></sabosuc2w2q>`;
    }

    static _konstruiTitolaBreton( id: string, title: string, simple: boolean = false ): string {
        if ( simple ) {
            return `
                <ksaka onmousedown="FenestraAdministranto.komenciTrenadon(event, '${id}')" ontouchstart="FenestraAdministranto.komenciTrenadon(event, '${id}')">
                    <button onclick="FenestraAdministranto.fermiFenestron('${id}')" title="Fermi">/</button>
                    <button onclick="FenestraAdministranto.baskuligiMaksimumigxon('${id}')" title="Maksimumigi">O</button>
                    <button onclick="FenestraAdministranto.minimumigiFenestron('${id}')" title="Minimumigi">|</button>
                    <button class="tab-add-btn" onclick="event.stopPropagation(); FenestraAdministranto.aldoniTabon('${id}')" title="Nova Tabo">x</button>
                    ${this._konstruiTabstrion( id )}
                </ksaka>
            `;
        }
        return `
            <ksaka class="title-bar n2tase" onmousedown="FenestraAdministranto.komenciTrenadon(event, '${id}')" ontouchstart="FenestraAdministranto.komenciTrenadon(event, '${id}')">
                <div class="window-controls cakaxa">
                    <button class="control-btn" onclick="FenestraAdministranto.fermiFenestron('${id}')" title="Fermi">/</button>
                    <button class="control-btn" onclick="FenestraAdministranto.baskuligiMaksimumigxon('${id}')" title="Maksimumigi">O</button>
                    <button class="control-btn" onclick="FenestraAdministranto.minimumigiFenestron('${id}')" title="Minimumigi">|</button>
                    <button class="control-btn tab-add-btn" onclick="event.stopPropagation(); FenestraAdministranto.aldoniTabon('${id}')" title="Nova Tabo">x</button>
                </div>
                ${this._konstruiTabstrion( id )}
            </ksaka>
        `;
    }

    static _konstruiIframanEnhavon( iframeId: string, url: string ): string {
        return `<iframe id="${iframeId}" src="${url}" sandbox="allow-same-origin allow-scripts" style="inline-size:100%; block-size:100%;" class="n2tase"></iframe>`;
    }

    static _konstruiGrandSxangxilojn( id: string ): string {
        const direktoj: string[] = [ "n", "s", "e", "w", "ne", "nw", "se", "sw" ];
        return direktoj.map( direkto => `
            <div class="resize-handle resize-handle-${direkto}" onmousedown="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', '${direkto}')" ontouchstart="FenestraAdministranto.alenportiAlFrunto('${id}'); FenestraAdministranto.komenciGrandSxangxon(event, '${id}', '${direkto}')"></div>
        ` ).join( "" );
    }

    // ⟪ Alenporti Fenestron al Frunto ⟫

    static alenportiAlFrunto( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( fenestro ) {
            fenestro.style.zIndex = ( ++this.statikaZIndekso ).toString();
        }
    }

    // ⟪ Ŝargi Aplikon el Vojo ⟫

    static sxargiAplikonDeVojo( path: string, titolo: string ): void {
        // Ĉiam malfermi en propra fenestro ( ikonaj klakoj ne grupiĝas en tabojn;
        // taboj kreiĝas nur per la nova-tabo-butono aŭ trenante tabon en tabstrion )
        const { x, y } = this._aleatoriaFenestraPozicio( CONSTANTS.WM.WINDOW_BASE_Y_LOAD );
        this._kreiFenestronKunTabo(
            ( iframeId ) => this._konstruiIframanEnhavon( iframeId, path ),
            path,
            { titolo, cepufal: true, injekti: true, x, y }
        );

        // Refreŝigi lastatempajn por montri novan fenestron
        this.renderiLastatempajn();
    }

    // ⟪ Krei Fenestron ⟫

    static kreiFenestron( path: string, enhavo: string = "" ): void {
        const titolo = path.split( "/" ).pop()?.replace( ".html", "" ) || "App";
        const aplikaĵaUrl = ( typeof CONSTANTS.APPS_DATA !== "undefined" ) ? ( CONSTANTS.APPS_DATA.find( ( a: any ) => a.path === path )?.path ?? "" ) : "";
        this._kreiFenestronKunTabo(
            ( iframeId ) => aplikaĵaUrl ? this._konstruiIframanEnhavon( iframeId, aplikaĵaUrl ) : ( enhavo || `<div><p>${titolo}</p></div>` ),
            aplikaĵaUrl,
            { titolo, simpla: false, injekti: !!aplikaĵaUrl }
        );
    }

    // ⟪ Komenci GrandŜanĝon ⟫

    static komenciGrandSxangxon( e: MouseEvent | TouchEvent, id: string, tenilo: string ): void {
        e.stopPropagation();
        e.preventDefault();

        const fenestro = document.getElementById( id );
        if ( !fenestro || fenestro.classList.contains( "maximized" ) || fenestro.classList.contains( "fullscreen" ) ) return;

        // Agordi regrandigan flagon
        ( fenestro as any )._estasRegrandiganta = true;
        agordiTrenanStaton( true );

        const rekt = fenestro.getBoundingClientRect();
        const komencaMaldekstro = fenestro.offsetLeft;
        const komencaSupro = fenestro.offsetTop;
        const komencaLarĝo = fenestro.offsetWidth;
        const komencaAlto = fenestro.offsetHeight;
        const komencaDekstro = komencaMaldekstro + komencaLarĝo;
        const komencaMalsupro = komencaSupro + komencaAlto;

        // Akiri montrilan pozicion per unuecigita traktilo
        const poz = akiriMontranPunkton( e );
        const komencoX = poz.x;
        const komencoY = poz.y;

        // Kalkuli kursoran ofseton de fenestra rando ( teniloj etendiĝas ekster fenestron )
        const estasOkcidento = tenilo.includes( "w" );
        const estasOriento = tenilo.includes( "e" );
        const estasNordo = tenilo.includes( "n" );
        const estasSudo = tenilo.includes( "s" );
        const ofsetoX = estasOkcidento ? komencoX - rekt.left : 0;
        const ofsetoY = estasNordo ? komencoY - rekt.top : 0;

        const fariTrenon = ( klientoX: number, klientoY: number ) => {
            const dx = klientoX - komencoX;
            const dy = klientoY - komencoY;

            // Kalkuli novan pozicion kaj grandecon per direktaj flagoj
            let novaMaldekstro = komencaMaldekstro;
            let novaSupro = komencaSupro;
            let novaDekstro = komencaDekstro;
            let novaMalsupro = komencaMalsupro;

            if ( estasOkcidento ) novaMaldekstro = komencaMaldekstro + dx + ofsetoX;
            else if ( estasOriento ) novaDekstro = komencaDekstro + dx;

            if ( estasNordo ) novaSupro = komencaSupro + dy + ofsetoY;
            else if ( estasSudo ) novaMalsupro = komencaMalsupro + dy;

            // Kalkuli finan pozicion kaj grandecon
            const finaLarĝo = Math.max( CONSTANTS.INPUT.RESIZE_MIN_WIDTH, novaDekstro - novaMaldekstro );
            const finaAlto = Math.max( CONSTANTS.INPUT.RESIZE_MIN_HEIGHT, novaMalsupro - novaSupro );

            fenestro.style.left = novaMaldekstro + "px";
            fenestro.style.top = novaSupro + "px";
            fenestro.style.width = finaLarĝo + "px";
            fenestro.style.height = finaAlto + "px";
        };

        // Krei mov-traktilon
        const cxeMov = ( ev: any ) => {
            ev.preventDefault();
            const p = akiriMontranPunkton( ev );
            fariTrenon( p.x, p.y );
        };

        // Agordi komunajn montradajn eventojn (forigiEventojn estas vokata en la onEnd-fino)
        const forigiEventojn = setupMontrajnEventojn( cxeMov, () => {
            agordiTrenanStaton( false );
            ( fenestro as any )._estasRegrandiganta = false;
            forigiEventojn();
        } );
    }

    // ⟪ Fermi Fenestron ⟫

    static fermiFenestron( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( fenestro ) {
            // Animacii fenestran fermon kun frakcioj
            AnimacioAdministranto.fenestroFermi( fenestro, { ...CONSTANTS.ANIM_SETTINGS.windowClose } ).then( () => {
                this.agordiAplikonAktiva();
                fenestro.remove();
                this.gxisdatigiTaskobretajnAplikojn();
                this.gxisdatigiDokon();
                this.renderiLastatempajn();
            } );

            return;
        }
    }

    // ⟪ Komenci Trenadon ⟫

    static komenciTrenadon( e: MouseEvent | TouchEvent, id: string ): void {
        // Nur musaj eventoj preventDefault — ĉe tuŝo tio subpremus la laŭtan
        // klakon de la butonoj en la pilolo ( fermi, maksimumigi, taboj... ),
        // do ĉe tuŝo la gestojn blokas CSS touch-action anstataŭe
        if ( e.type === "mousedown" ) e.preventDefault();

        const fenestro = document.getElementById( id );
        if ( !fenestro || ( fenestro as any )._estasRegrandiganta ) return;

        agordiTrenanStaton( true );
        const rekt = fenestro.getBoundingClientRect();

        // Akiri montrilan pozicion per unuecigita traktilo
        const poz = akiriMontranPunkton( e );
        const klientoX = poz.x;
        const klientoY = poz.y;
        const ŝovoX = klientoX - rekt.left;
        const ŝovoY = klientoY - rekt.top;

        const fariTrenon = ( novaX: number, novaY: number ) => {
            let maldekstra = novaX - ŝovoX;
            let supro = novaY - ŝovoY;

            // Ĉe porteblaj ekranoj la fenestro ne rajtas eliri el la kadro:
            // konservi almenaŭ la titolan strion atingebla ĉiudirekte
            const estasPortebla = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
            if ( estasPortebla ) {
                const minimumaVidebla = 64;
                maldekstra = Math.min( Math.max( maldekstra, -( fenestro.offsetWidth - minimumaVidebla ) ), window.innerWidth - minimumaVidebla );
                supro = Math.min( Math.max( supro, 0 ), window.innerHeight - minimumaVidebla );
            }

            fenestro.style.left = maldekstra + "px";
            fenestro.style.top = supro + "px";
        };

        const haltiTrenon = () => {
            agordiTrenanStaton( false );
        };

        // Uzi unuecigitan enigan traktilon por ambaŭ muso kaj tuŝo
        const cxeMov = ( ev: any, datumoj: any ) => {
            fariTrenon( datumoj.x, datumoj.y );
        };

        const cxeFin = () => {
            haltiTrenon();
        };

        EnigaAdministranto.agordiTrenadon( fenestro, null, cxeMov, cxeFin );
    }

    // ⟪ Baskuli Maksimumigon ⟫

    static baskuligiMaksimumigxon( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( !fenestro ) return;

        if ( fenestro.classList.contains( "maximized" ) ) {
            // Ludi malmaksimumigan animacion unue
            AnimacioAdministranto.malmaksimumigiFenestron( fenestro, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMaximize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMaximize.easing,
                toScale: CONSTANTS.ANIM_SETTINGS.windowMaximize.scale
            } );
            // Restarigi antaŭajn dimensiojn
            fenestro.style.width = fenestro.dataset.prevWidth || "";
            fenestro.style.height = fenestro.dataset.prevHeight || "";
            fenestro.style.left = fenestro.dataset.prevLeft || "";
            fenestro.style.top = fenestro.dataset.prevTop || "";
            ( fenestro.style as any ).right = "";
            ( fenestro.style as any ).bottom = "";
            fenestro.classList.remove( "maximized" );
        } else {
            // Konservi nunajn dimensiojn
            fenestro.dataset.prevWidth = fenestro.style.width || fenestro.offsetWidth + "px";
            fenestro.dataset.prevHeight = fenestro.style.height || fenestro.offsetHeight + "px";
            fenestro.dataset.prevLeft = fenestro.style.left || fenestro.offsetLeft + "px";
            fenestro.dataset.prevTop = fenestro.style.top || fenestro.offsetTop + "px";
            // Forviŝi enliniajn stilojn por ke CSS .maximized reguloj transprenu
            fenestro.style.width = "";
            fenestro.style.height = "";
            fenestro.style.left = "";
            fenestro.style.top = "";
            ( fenestro.style as any ).right = "";
            ( fenestro.style as any ).bottom = "";
            fenestro.classList.add( "maximized" );
            // Ludi maksimumigan animacion
            AnimacioAdministranto.maksimumigiFenestron( fenestro, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMaximize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMaximize.easing,
                fromScale: CONSTANTS.ANIM_SETTINGS.windowMaximize.scale
            } );
        }
    }

    // ⟪ Minimumigi Fenestron ⟫

    static minimumigiFenestron( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( fenestro ) {
            // Aldoni minimumigitan klason tuj por ekigi ŝtatŝanĝon,
            // sed la animacia administranto pritraktos la vidan parton.
            AnimacioAdministranto.minimumigiFenestron( fenestro, {
                duration: CONSTANTS.ANIM_SETTINGS.windowMinimize.duration,
                easing: CONSTANTS.ANIM_SETTINGS.windowMinimize.easing
            } ).then( () => {
                fenestro.classList.add( "minimized" );
                this.gxisdatigiTaskobretajnAplikojn();
                this.renderiLastatempajn();
                this.gxisdatigiDokon();
            } );
        }
    }

    // ⟪ Fokusigi Fenestron ⟫

    static fokusigiFenestron( id: string ): void {
        const fenestro = document.getElementById( id );
        if ( fenestro ) {
            if ( fenestro.classList.contains( "minimized" ) ) {
                fenestro.classList.remove( "minimized" );
                AnimacioAdministranto.restaŭriFenestron( fenestro );
                this.gxisdatigiDokon();
            }
            fenestro.style.zIndex = ( ++this.statikaZIndekso ).toString();
            if ( ( window as any ).PanelaAdministranto ) ( window as any ).PanelaAdministranto.fermiCxiujnPanelojn();
            this.gxisdatigiTaskobretajnAplikojn();
        }
    }

    // ⟪ Poŝa Plenekrana Reĝimo ⟫

    static estasPortebla(): boolean {
        return window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
    }

    // Ĉe porteblaj ekranoj fenestroj montriĝas plenekrane ( sen pilolo );
    // nur traversoj de la poŝa sojlo ŝanĝas la reĝimon de ĉiuj fenestroj
    static _lastaPortebleco: boolean | null = null;

    static aktualigiPlenekrananModon( devigi: boolean = false ): void {
        const portebla = this.estasPortebla();
        if ( !devigi && portebla === this._lastaPortebleco ) return;
        this._lastaPortebleco = portebla;
        document.querySelectorAll( ".window" ).forEach( ( f: any ) => f.classList.toggle( "fullscreen", portebla ) );
    }

    // Minimumigi la plej supran ne-minimumigitan fenestron ( poŝa hejmbreto )
    static minimumigiFokusitanFenestron(): void {
        const fenestroj = Array.from( document.querySelectorAll( ".window:not(.minimized)" ) ) as HTMLElement[];
        if ( fenestroj.length === 0 ) return;
        const fokusita = fenestroj.reduce( ( a, b ) => ( parseInt( b.style.zIndex || "0", 10 ) > parseInt( a.style.zIndex || "0", 10 ) ? b : a ) );
        this.minimumigiFenestron( fokusita.id );
    }

    // Fermi la plej supran ne-minimumigitan fenestron ( poŝa hejmbreto )
    static fermiFokusitanFenestron(): void {
        const fenestroj = Array.from( document.querySelectorAll( ".window:not(.minimized)" ) ) as HTMLElement[];
        if ( fenestroj.length === 0 ) return;
        const fokusita = fenestroj.reduce( ( a, b ) => ( parseInt( b.style.zIndex || "0", 10 ) > parseInt( a.style.zIndex || "0", 10 ) ? b : a ) );
        this.fermiFenestron( fokusita.id );
    }

    // ⟪ Poŝaj Gestoj ⟫

    static iniciiPosxajnGestojn(): void {
        const hejmbreto = document.getElementById( "home-bar" );

        // Suprenŝvebo sur la hejmbreto ankaŭ fermas la fokusitan fenestron
        // ( la simpla premo traktiĝas per la ekzista onclick de la hejmbreto )
        if ( hejmbreto ) {
            let komencoY: number | null = null;
            hejmbreto.addEventListener( "touchstart", ( e: TouchEvent ) => {
                komencoY = e.touches[ 0 ].clientY;
            }, { passive: true } );
            hejmbreto.addEventListener( "touchend", ( e: TouchEvent ) => {
                if ( komencoY === null ) return;
                const supren = komencoY - e.changedTouches[ 0 ].clientY;
                komencoY = null;
                if ( supren > 40 && this.estasPortebla() ) {
                    e.stopPropagation();
                    this.minimumigiFokusitanFenestron();
                }
            } );
        }

        // Malsuprenŝvebo de la supra rando → eliri plenekranan reĝimon ( fenestrigita vido )
        let supraKomencoY: number | null = null;
        let supraFenestro: HTMLElement | null = null;
        document.addEventListener( "touchstart", ( e: TouchEvent ) => {
            supraKomencoY = null;
            supraFenestro = null;
            const tusxo = e.touches[ 0 ];
            if ( !tusxo || tusxo.clientY > 48 ) return;
            const plenekranaj = Array.from( document.querySelectorAll( ".window.fullscreen:not(.minimized)" ) ) as HTMLElement[];
            if ( plenekranaj.length === 0 ) return;
            supraFenestro = plenekranaj.reduce( ( a, b ) => ( parseInt( b.style.zIndex || "0", 10 ) > parseInt( a.style.zIndex || "0", 10 ) ? b : a ) );
            supraKomencoY = tusxo.clientY;
        }, { passive: true } );
        document.addEventListener( "touchend", ( e: TouchEvent ) => {
            if ( supraKomencoY === null || !supraFenestro ) return;
            const malsupren = e.changedTouches[ 0 ].clientY - supraKomencoY;
            supraKomencoY = null;
            if ( malsupren > 60 ) {
                supraFenestro.classList.remove( "fullscreen" );
                supraFenestro.style.zIndex = ( ++this.statikaZIndekso ).toString();
                supraFenestro = null;
            }
        } );
    }    // ⟪ Bildigi Lastatempajn ⟫

    static renderiLastatempajn(): void {
        const listo = document.getElementById( "recents-list" );
        if ( !listo ) return;

        const fenestroj = document.querySelectorAll( ".window" );
        const tekstoj = typeof akiriTextojn === "function" ? akiriTextojn() : {};

        if ( fenestroj.length === 0 ) {
            listo.innerHTML = `<div style="padding: 24px; text-align: center; opacity: 0.5;">${tekstoj.recents_no_apps || "No open apps"}</div>`;
            return;
        }

        listo.innerHTML = Array.from( fenestroj ).map( ( f: any ) => {
            const titolo = akiriFenestranTitolon( f );
            const emoĝio = akiriPiktogramon( f.dataset.piktogramo || "Defaŭlta" );
            const id = f.id;
            return `
                <div class="recents-card" onclick="FenestraAdministranto.fokusigiFenestron('${id}')">
                    <ksaka class="title-bar">
                        <button class="recents-close-btn" onclick="event.stopPropagation(); FenestraAdministranto.fermiFenestron('${id}'); FenestraAdministranto.renderiLastatempajn();">/</button>
                        <p class="title-bar-title">${titolo}</p>
                    </ksaka>
                    <div class="recents-preview">
                        ${this._akiriRecentsanBildo( f, emoĝio )}
                    </div>
                </div>
            `;
        } ).join( "" );
    }

    // Redoni vivan bildon de la aktiva fenestra enhavo ( klonita iframe ),
    // aŭ la aplikaĵan piktogramon kiel rezervan prezentaĵon
    static _akiriRecentsanBildo( fenestro: Element, rezervaEmoĝio: string ): string {
        const aktiva = fenestro.querySelector( ".tab-enhavo:not([style*='none']) iframe, .tab-enhavo:not([style*='none']) webview" ) as HTMLIFrameElement | null
            || fenestro.querySelector( "iframe" ) as HTMLIFrameElement | null;
        if ( aktiva && aktiva.src ) {
            const kopio = aktiva.cloneNode( false ) as HTMLIFrameElement;
            kopio.id = "";
            kopio.setAttribute( "aria-hidden", "true" );
            kopio.setAttribute( "tabindex", "-1" );
            return kopio.outerHTML;
        }
        return rezervaEmoĝio;
    }

    // ⟪ Ĝisdatigi Dokon ⟫

    static gxisdatigiDokon(): void {
        const doko = document.getElementById( "taskbar-dock" );
        if ( !doko ) return;

        // Ĉe nefoneblaj ekranoj minimumigitaj fenestroj eniras la taskobreto-dokon;
        // ĉe porteblaj ekranoj la doko restas kaŝita.
        const estasPortebla = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;
        doko.dataset.portebla = estasPortebla ? "true" : "false";

        // Ĉiuj minimumigitaj fenestroj eniras la dokon ( ili restas en DOM por restaŭro )
        const minimumigitaj = Array.from( document.querySelectorAll( ".window.minimized" ) ) as HTMLElement[];

        if ( minimumigitaj.length === 0 ) {
            doko.classList.remove( "visible" );
            doko.innerHTML = "";
            return;
        }

        doko.innerHTML = minimumigitaj.map( ( f: any ) => {
            const titolo = akiriFenestranTitolon( f );
            const id = f.id;
            const emoĝio = akiriPiktogramon( f.dataset.piktogramo || "Defaŭlta" );
            return `
                <button class="dock-btn n2tase" onclick="event.stopPropagation(); FenestraAdministranto.fokusigiFenestron('${id}')" title="${titolo}">
                    <span class="dock-btn-icon">${emoĝio}</span>
                    <span class="dock-btn-title">${titolo}</span>
                </button>
            `;
        } ).join( "" );

        doko.classList.toggle( "visible", !estasPortebla );
    }

    // ⟪ Agordi Aplikon Aktiva ⟫

    static agordiAplikonAktiva(): void {
        const nombraSpan = document.querySelector( ".active-apps-count" ) as HTMLElement | null;
        if ( nombraSpan ) {
            const nombro = document.querySelectorAll( ".window" ).length;
            nombraSpan.innerText = typeof ( window as any ).vab6caja === "function" ? ( window as any ).vab6caja( nombro ) : nombro.toString();
        }
    }

    // ⟪ Ĝisdatigi Taskobretajn Aplikojn ⟫

    static gxisdatigiTaskobretajnAplikojn(): void {
        // Lastatempaj aplikaĵoj nur montrataj en lastatempa panelo kaj komenca menuo, ne en taskobreto
        this.agordiAplikonAktiva();
    }

    // ⟪ Agordaj Traktiloj ⟫

    static gxisdatigiTaskobretajnAgordojn( val: string ): void {
        document.documentElement.style.setProperty( "--taskbar-width", val + "px" );

        const taskobar = akiriTaskobreton();
        if ( taskobar ) {
            taskobar.dataset.large = ( parseInt( val ) >= CONSTANTS.WM.TASKBAR_LARGE_THRESHOLD ) ? "true" : "false";
        }
        
        // Konservi al localStorage
        localStorage.setItem( "os-taskbar-size", val );
    }

    // ⟪ Tema Administrado ⟫

    static agordiTemon( theme: string ): void {
        if ( theme === "detect" ) {
            const estasMalhela = window.matchMedia( "(prefers-color-scheme: dark)" ).matches;
            this.aplikiTemon( estasMalhela );
            // Observi sistemajn ŝanĝojn
            if ( !this.statikaTemoVigladilo ) {
                this.statikaTemoVigladilo = ( e: MediaQueryListEvent ) => {
                    if ( this.statikaNunaTemo === "detect" ) this.aplikiTemon( e.matches );
                };
                window.matchMedia( "(prefers-color-scheme: dark)" ).addEventListener( "change", this.statikaTemoVigladilo );
            }
        } else {
            this.aplikiTemon( theme === "dark" );
        }
        this.statikaNunaTemo = theme;
        localStorage.setItem( "os-theme", theme );
    }

    static aplikiTemon( isDark: boolean ): void {
        const themeVars: { [ key: string ]: string } = isDark ? {
            "--ខេលេសៃ": "#000", "--ខេលេសៃច្ហិ": "#000000a0", "--កេភ": "#fff", "--កេភ២": "#c4c4c4",
            "--តានេក": "#ffffff10", "--តានេកខេលេ": "#ffffff10", "--តានេក២": "#ffffff20",
            "--ឆាងាធី": "#181818", "--ឆាងាធីច្ហិ": "#181818c0"
        } : {
            "--ខេលេសៃ": "#fff", "--ខេលេសៃច្ហិ": "#ffffffa0", "--កេភ": "#000", "--កេភ២": "#484848",
            "--តានេក": "#00000010", "--តានេកខេលេ": "#00000008", "--តានេក២": "#00000020",
            "--ឆាងាធី": "#f4f4f4", "--ឆាងាធីច្ហិ": "#f4f4f4c0"
        };
        const aplikiAl = ( dokumento: Document | null ) => {
            if ( !dokumento?.documentElement ) return;
            Object.entries( themeVars ).forEach( ( [ p, v ] ) => dokumento.documentElement.style.setProperty( p, v ) );
        };
        aplikiAl( document );
        document.querySelectorAll( "iframe" ).forEach( ( f: HTMLIFrameElement ) => { try { aplikiAl( f.contentDocument ); } catch ( e ) { /* ignore */ } } );
    }

    // ⟪ Tapeta Administrado ⟫

    static agordiTapeton( url: string ): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            root.classList.remove( "wallpaper-gradient" );
            if ( url ) {
                root.style.backgroundImage = `url('${url}')`;
                root.style.backgroundSize = "cover";
                root.style.backgroundPosition = "center";
            } else {
                root.style.backgroundImage = "none";
            }
        }
        localStorage.setItem( "os-wallpaper", url || "" );
    }

    static agordiGradientanTapeton(
        start: string,
        end: string,
        angulo: number = 0o207,
        koloroj?: string[],
        tipo: "linear" | "radial" = "linear",
        tavoloj?: string[]
    ): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            root.classList.add( "wallpaper-gradient" );
            const haltpunktoj: string[] = koloroj && koloroj.length >= 2 ? koloroj : [ start, end ];
            const css: string = tavoloj && tavoloj.length > 0
                ? tavoloj.join( ", " )
                : (
                    tipo === "radial"
                        ? `radial-gradient(ellipse at center, ${haltpunktoj.join( ", " )})`
                        : `linear-gradient(${angulo}deg, ${haltpunktoj.join( ", " )})`
                );
            root.style.backgroundImage = css;
            root.style.backgroundSize = "100% 100%";
        }
        // Persistas nur la tavolojn kiam ili ekzistas (aliaokaze retro-kompatiba skemo)
        const konservado: any = {
            start,
            end,
            koloroj: koloroj && koloroj.length >= 2 ? koloroj : [ start, end ],
            angulo,
            tipo
        };
        if ( tavoloj && tavoloj.length > 0 ) konservado.tavoloj = tavoloj;
        localStorage.setItem( "os-wallpaper-gradient", JSON.stringify( konservado ) );
        localStorage.removeItem( "os-wallpaper" );
    }

    static agordiHazardaGradientaTapeto(): void {
        // Algoritma hazarda gradienta generacio - neniu antaudifinita paledo.
        // Uzas kolorharmoniojn kun HSL-parametraj limoj por eviti la "mudan" zonon
        // (S < 50% kaj L \u0109irka\u016d 40-60%) kaj certigi klaran kontraston inter finoj.
        // Aldonas tavolojn (brilo, frostita vitro, prisma radio) sur la baza harmonio
        // por unikeco kaj videbla profundo -- ne nur plata koloro-al-koloro.

        // 1. Harmonio: 0=monokroma, 1=analoga, 2=triada-proksima, 3=dividita-komplementa
        const harmonio: number = Math.floor( Math.random() * 0o4 );
        const baza: number = Math.floor( Math.random() * 0o550 );

        let h1: number;
        let h2: number;
        if ( harmonio === 0 ) {
            // Monokroma: \u00b115\u00b0 - apena\u016ba eta delto por subtila profundeco
            h1 = baza;
            h2 = baza + ( Math.random() < 0.5 ? -0o15 : 0o15 );
        } else if ( harmonio === 1 ) {
            // Analoga: 20\u00b0-50\u00b0 - intima parenco
            h1 = baza;
            h2 = baza + 0o24 + Math.floor( Math.random() * 0o30 );
        } else if ( harmonio === 2 ) {
            // Triada-proksima: 60\u00b0-110\u00b0 - harmoniigita kontrasto (stilo Coolors/Adobe)
            h1 = baza;
            h2 = baza + 0o74 + Math.floor( Math.random() * 0o50 );
        } else {
            // Dividita-komplementa: 150\u00b0-210\u00b0 - vigla sen troa kontrasto
            h1 = baza;
            h2 = baza + 0o226 + Math.floor( Math.random() * 0o60 );
        }

        // Normigi al [0, 360\u00b0)
        h1 = ( ( h1 % 0o550 ) + 0o550 ) % 0o550;
        h2 = ( ( h2 % 0o550 ) + 0o550 ) % 0o550;

        // Plej-kurta-angula distanco inter h1 kaj h2 (en [-180\u00b0, +180\u00b0])
        let huDif: number = h2 - h1;
        if ( huDif > 0o264 ) huDif -= 0o550;
        else if ( huDif < -0o264 ) huDif += 0o550;

        // 2. Saturacio: 60%-90% - evita la mudan zonon kaj tenas kolorojn viglaj
        const s1: number = 0.6 + Math.random() * 0.3;
        const s2: number = 0.6 + Math.random() * 0.3;

        // 3. Lumeco-kontrasto garantiata: \u226514%, evitante ekstremojn
        const l1: number = 0.30 + Math.random() * 0.25;
        const lDiferenco: number = 0.14 + Math.random() * 0.26;
        const l2Bruta: number = l1 + ( Math.random() < 0.5 ? -lDiferenco : lDiferenco );
        const l2: number = Math.max( 0.20, Math.min( 0.80, l2Bruta ) );

        // 4. Devigu trian haltpunkton por lar\u011daj \u0135u-distancoj (>90\u00b0) por eviti
        // la mudan centron de RGB-spaco. Alie hazarda je 32%.
        const distancoAbs: number = Math.abs( huDif );
        const uzuTriStops: boolean = distancoAbs > 0o132 || Math.random() < 0.32;
        let koloroj: string[];
        if ( uzuTriStops ) {
            // Mezpunkt-\u0135uo la\u016d la plej kurta vojo, kun eta delto por organika vario
            let mh: number = h1 + huDif / 2 + ( Math.random() < 0.5 ? -0o14 : 0o14 );
            mh = ( ( mh % 0o550 ) + 0o550 ) % 0o550;
            const ms: number = ( s1 + s2 ) / 2;
            // Pli luma ol amba\u016d finoj por sunlevi\u0125o-/a\u016droro-efiko
            let ml: number = ( l1 + l2 ) / 2 + 0.12;
            ml = Math.max( 0.25, Math.min( 0.82, ml ) );
            koloroj = [
                _akiriHSLHex( h1, s1, l1 ),
                _akiriHSLHex( mh, ms, ml ),
                _akiriHSLHex( h2, s2, l2 )
            ];
        } else {
            koloroj = [ _akiriHSLHex( h1, s1, l1 ), _akiriHSLHex( h2, s2, l2 ) ];
        }

        // 5. ~22% de tempo uzas radialan tipon (organika diverseco)
        const uzuRadiala: boolean = Math.random() < 0.22;

        // 6. Angulo por linearaj: 90\u00b0-210\u00b0
        const angulo: number = 0o132 + Math.floor( Math.random() * 0o171 );

        const tipo: "linear" | "radial" = uzuRadiala ? "radial" : "linear";

        // 7. Elekti re\u011dimon por tavola komponado (pezoj en _REGIMOJ)
        const regimo: _Regimo = _REGIMOJ[ Math.floor( Math.random() * _REGIMOJ.length ) ];

        // 8. Konstrui la tavolojn (baza + brilo/frost/prismo la\u016d re\u011dimo)
        const tavoloj: string[] = _konstruiTavolojn( koloroj, h1, s1, angulo, tipo, regimo );

        // Persisti kun plena strukturo (haltpunktoj/angulo/tipo/tavoloj)
        this.agordiGradientanTapeton(
            koloroj[ 0 ],
            koloroj[ koloroj.length - 1 ],
            angulo,
            koloroj,
            tipo,
            tavoloj
        );
    }

    static forigiTapeton(): void {
        const root = document.getElementById( "os-root" );
        if ( root ) {
            root.classList.remove( "wallpaper-gradient" );
            root.style.backgroundImage = "none";
        }
        localStorage.removeItem( "os-wallpaper" );
        localStorage.removeItem( "os-wallpaper-gradient" );
    }

    // ⟪ Inicado ⟫

    static inicii(): void {
        const konservitaTemo = localStorage.getItem( "os-theme" ) || "detect";
        this.agordiTemon( konservitaTemo );

        // Ŝargi tapeton ( bildo aŭ gradiento )
        const konservitaTapeto = localStorage.getItem( "os-wallpaper" );
        if ( konservitaTapeto ) {
            this.agordiTapeton( konservitaTapeto );
        } else {
            const konservitaGradiento = JSON.parse( localStorage.getItem( "os-wallpaper-gradient" ) || "null" );
            if ( konservitaGradiento ) {
                // Restarigi gradienton kun ĉiuj konservitaj ecoj (haltpunktoj, angulo, tipo, tavoloj)
            this.agordiGradientanTapeton(
                konservitaGradiento.start,
                konservitaGradiento.end,
                konservitaGradiento.angulo ?? 0o207,
                konservitaGradiento.koloroj,
                konservitaGradiento.tipo ?? "linear",
                konservitaGradiento.tavoloj
            );
            }
        }

        // Iniciati taskobretan grandecon el localStorage
        const konservitaTaskobretaGrando = localStorage.getItem( "os-taskbar-size" ) || "48";
        this.gxisdatigiTaskobretajnAgordojn( konservitaTaskobretaGrando );

        // Iniciati taskobreton kun konservita pozicio kaj enŝovoj
        this.iniciiTaskobreton();

        // Restarigi la apartecon de la portebla krado ( antaŭ la krada konstruo en Sistemo.init )
        const konservitaAparteco = localStorage.getItem( "os-mobile-grid-separate" );
        if ( konservitaAparteco !== null ) {
            CONSTANTS.DIM.MOBILE_GRID_SEPARATE = konservitaAparteco !== "off";
        }

        // Restarigi lingvon kaj etikedan montron el localStorage
        const konservitaLingvo = localStorage.getItem( "os-language" );
        if ( konservitaLingvo ) this.agordiLingvon( konservitaLingvo );

        // Regului la dokan videblecon kaj plenekranan reĝimon ĉe grandecaj ŝanĝoj ( portebla ↔ nefonebla )
        window.addEventListener( "resize", () => {
            this.gxisdatigiDokon();
            this.aktualigiPlenekrananModon();
        } );
        this.aktualigiPlenekrananModon( true );

        // Poŝaj gestoj: hejmbreto kaj ŝvebo de la supra rando
        this.iniciiPosxajnGestojn();

        // Etikedmontra resto post kiam ĉiuj administrantoj estas konstruitaj
        const konservitaEtikedo = localStorage.getItem( "os-label-display" );
        if ( konservitaEtikedo ) {
            window.addEventListener( "load", () => this.agordiEtikedMontron( konservitaEtikedo ) );
        }
    }

    // ⟪ Agordi Lingvon ⟫

    static agordiLingvon( val: string ): void {
        if ( typeof window.k2regawe === "function" ) {
            window.k2regawe( val );
        }
        localStorage.setItem( "os-language", val );
    }

    // ⟪ Agordi Etikedan Montron ⟫

    static agordiEtikedMontron( val: string ): void {
        localStorage.setItem( "os-label-display", val );

        // La krado-rekonstruo apartenas al la piktograma administranto
        if ( ( window as any ).LabortablaPiktogramoAdministranto?.agordiEtikedReĝimon ) {
            ( window as any ).LabortablaPiktogramoAdministranto.agordiEtikedReĝimon( val );
        }
    }

    // ⟪ Agordi Porteblan Kradan Apartecon ⟫

    static agordiPorteblanKradanApartecon( val: string ): void {
        const aparta = val !== "off";
        CONSTANTS.DIM.MOBILE_GRID_SEPARATE = aparta;
        localStorage.setItem( "os-mobile-grid-separate", aparta ? "on" : "off" );

        // Rekomputi la krad-dimensiojn ( labortabla origina kiam la spegulado
        // estas malŝaltita, faldebla 6 × 8 kiam ŝaltita )
        const admin = ( window as any ).LabortablaPiktogramoAdministranto;
        admin?.labortablo?.rekomputiDimensiojn?.();
        admin?.komencaMenuo?.rekomputiDimensiojn?.();

        // Rekonstrui ambaŭ kradojn kun la novaj dimensioj
        if ( admin?.agordiEtikedReĝimon ) {
            const nuna = localStorage.getItem( "os-label-display" ) || "vertical-pill";
            admin.agordiEtikedReĝimon( nuna );
        }
    }

    // ⟪ Agordi Taskobretan Pozicion ⟫

    // @param persisti - ĉu konservi la pozicion en localStorage ( la aŭtomata
    // devigo ĉe porteblaj ekranoj ne devas anstataŭigi la konservitan agordon )
    static agordiTaskobretanPozicion( pos: string, persisti: boolean = true ): void {
        const taskobar = akiriTaskobreton();
        if ( taskobar ) taskobar.dataset.position = pos;

        const radiko = document.documentElement;
        const grandoKunInterspaco = "calc(var(--taskbar-width) + var(--អារេងព៏) + var(--អារេងព៏) + var(--inset-gap))";
        const marĝeno = "var(--អារេងព៏)";

        const panelajEnŝovoj: { [ key: string ]: { [ key: string ]: string } } = {
            left: { "left": grandoKunInterspaco, "right": marĝeno, "top": marĝeno, "bottom": marĝeno },
            right: { "right": grandoKunInterspaco, "left": marĝeno, "top": marĝeno, "bottom": marĝeno },
            top: { "top": grandoKunInterspaco, "bottom": marĝeno, "left": marĝeno, "right": marĝeno },
            bottom: { "bottom": grandoKunInterspaco, "top": marĝeno, "left": marĝeno, "right": marĝeno }
        };

        // Restarigi ĉiujn panelajn enŝovojn
        [ "top", "bottom", "left", "right" ].forEach( p => {
            radiko.style.setProperty( `--panel-inset-${p}`, "0px" );
        } );

        const panelajValoroj = panelajEnŝovoj[ pos ] || panelajEnŝovoj.left;

        Object.entries( panelajValoroj ).forEach( ( [ prop, val ] ) => {
            radiko.style.setProperty( `--panel-inset-${prop}`, val );
        } );

        // Ĝisdatigi titolbreto-orientiĝon por fenestroj
        document.querySelectorAll( ".window" ).forEach( ( el: any ) => {
            const titolBreto = el.querySelector( ".title-bar" );
            if ( titolBreto ) {
                titolBreto.dataset.position = pos;
            }
            el.dataset.position = pos;
        } );

        // Ĝisdatigi kahelajn orientiĝojn per administrantoj
        if ( ( window as any ).LabortablaPiktogramoAdministranto ) {
            [ ( window as any ).LabortablaPiktogramoAdministranto.desktop, ( window as any ).LabortablaPiktogramoAdministranto.startMenu ].forEach( ( krado: any ) => {
                krado?.container?.querySelectorAll( ".app-tile" ).forEach( ( kahelo: HTMLElement ) => krado.gxisdatigiAdaptanOrientigon( kahelo ) );
            } );
        }

        if ( ( window as any ).LabortablaPiktogramoAdministranto?.desktop ) {
            setTimeout( () => {
                document.querySelectorAll( "#desktop .app-tile" ).forEach( ( kahelo: any ) =>
                    ( window as any ).LabortablaPiktogramoAdministranto.desktop.aplikiPozicion( kahelo, parseInt( kahelo.dataset.col ), parseInt( kahelo.dataset.row ) )
                );
            }, CONSTANTS.WM.TASKBAR_REPOSITION_DELAY );
        }

        // Konservi al localStorage ( nur se petite )
        if ( persisti ) localStorage.setItem( "os-taskbar-position", pos );
    }

    // ⟪ Inicii Taskobreton ⟫

    static iniciiTaskobreton(): void {
        const taskobar = akiriTaskobreton();
        if ( !taskobar ) return;

        taskobar.dataset.position = "left";
        taskobar.dataset.flow = "default";
        taskobar.dataset.large = "false";

        // Ĉe porteblaj ekranoj la taskobreto estas ĉiam devigita laŭ orientiĝo
        // ( portreto: sube; pejzaĝo: flanke ) — SEN anstataŭigi la konservitan
        // agordon, do transiri al normala vido restarigas la uzantan preferon.
        // Ĉe normalaj ekranoj la konservita pozicio estas restarigata.
        const aktualigiTaskobreton = ( devigi: boolean = false ) => {
            const estasPortebla = window.innerWidth < CONSTANTS.BREAKPOINTS.MOBILE || window.innerHeight < CONSTANTS.BREAKPOINTS.MOBILE;

            if ( estasPortebla ) {
                const estasPortreta = window.innerHeight > window.innerWidth;
                const devigaPozicio = estasPortreta ? "bottom" : "left";
                if ( devigi || taskobar.dataset.position !== devigaPozicio ) {
                    this.agordiTaskobretanPozicion( devigaPozicio, false );
                }
            } else {
                const konservitaPozicio = localStorage.getItem( "os-taskbar-position" ) || "left";
                if ( devigi || taskobar.dataset.position !== konservitaPozicio ) {
                    this.agordiTaskobretanPozicion( konservitaPozicio, false );
                }
            }
        };

        // Ĉiam apliki almenaŭ unufoje ĉe starto — la voko ankaŭ starigas la
        // panelajn enŝovojn ( --panel-inset-* ), sen kiuj la labortablo etendiĝas
        // ĝis la randoj de la ekrano
        aktualigiTaskobreton( true );

        // Aŭskulti orientiĝajn ŝanĝojn kaj regrandigojn por sekvi vidtransirojn
        // ( envolvitaj por ne transdoni la eventon kiel la devigi-flagon )
        window.addEventListener( "orientationchange", () => aktualigiTaskobreton() );
        window.addEventListener( "resize", () => aktualigiTaskobreton() );
    }
}

// ⟨ Aŭskulti postMessage De Agorda Iframo ⟩

// La agorda aplikaĵo sendas anglajn agojn; ĉi tiu mapo tradukas ilin
// al la esperantaj metodoj de FenestraAdministranto.
const agordajAgoj: { [ key: string ]: string } = {
    setTheme: "agordiTemon",
    setWallpaper: "agordiTapeton",
    updateTaskbarSettings: "gxisdatigiTaskobretajnAgordojn",
    setLabelDisplay: "agordiEtikedMontron",
    setLanguage: "agordiLingvon",
    setTaskbarPosition: "agordiTaskobretanPozicion",
    setMobileGridSeparate: "agordiPorteblanKradanApartecon"
};

window.addEventListener( "message", ( e ) => {
    if ( e.data?.source !== "settings" ) return;
    const { action, value } = e.data;
    
    // Pritrakti gradientajn tapetajn agojn
    if ( action === "setGradientWallpaper" && value?.start && value?.end ) {
        (window as any).FenestraAdministranto.agordiGradientanTapeton( value.start, value.end );
        return;
    }
    if ( action === "setRandomGradientWallpaper" ) {
        (window as any).FenestraAdministranto.agordiHazardaGradientaTapeto();
        return;
    }
    if ( action === "clearWallpaper" ) {
        (window as any).FenestraAdministranto.forigiTapeton();
        return;
    }
    
    const metodo = agordajAgoj[ action ];
    if ( metodo && typeof ( window as any ).FenestraAdministranto[ metodo ] === "function" ) {
        ( window as any ).FenestraAdministranto[ metodo ]( value );
        return;
    }
    
    if ( typeof ( window as any ).FenestraAdministranto[ action ] === "function" ) {
        ( window as any ).FenestraAdministranto[ action ]( value );
    }
} );

// Iniciati Fenestran Administranton ( temo, tapeto, ktp. )
document.addEventListener( "DOMContentLoaded", () => (window as any).FenestraAdministranto.inicii() );

( window as any ).FenestraAdministranto = FenestraAdministranto;
( window as any ).bildigiLastatempajn = () => (window as any).FenestraAdministranto.renderiLastatempajn();
( window as any ).aktualigiDokon = () => (window as any).FenestraAdministranto.gxisdatigiDokon();