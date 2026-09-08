// ≺⧼ Labortabla Piktograma Administranto ⧽≻

declare const APPS_DATA: any;
declare const CONSTANTS: any;
declare const QS_TOGGLES: any;
declare const QS_SLIDERS: any;
declare const RapidaAgordoAdministranto: any;
declare const SciigoAdministranto: any;
declare const limkurzo: any;
declare const KonservejaUtilo: any;
declare const baskuligiQsButonon: any;
declare const akiriPiktogramon: any;
declare const akiriPiktogramanFonon: any;

import { PiktogramaKrado, MOBILE_GRID_ROWS, MOBILE_GRID_COLS, DESKTOP_GRID_COLS, DESKTOP_GRID_ROWS } from "./ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ.js";
import { AppData } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";

let APPS: AppData[] = [];

// ⟪ Labortabla Piktograma Administranto ⟫

export const LabortablaPiktogramoAdministranto = {
    labortablo: null as PiktogramaKrado | null,
    komencaMenuo: null as PiktogramaKrado | null,

    _rearanĝiCxiujn() {
        [ this.labortablo, this.komencaMenuo ].forEach( grid => grid?.rearanĝi() );
    },

    // Ŝanĝi la etikedan reĝimon de ambaŭ kradoj kaj rekonstrui ĉiujn kahelojn
    agordiEtikedReĝimon( val: string ) {
        const kradoj = [ this.labortablo, this.komencaMenuo ].filter( ( k: any ) => k );

        kradoj.forEach( ( krado: any ) => {
            krado.etikedReĝimo = val;
            if ( krado.container ) krado.container.innerHTML = "";
        } );

        // Rekonstrui ĉiujn piktogramojn en ambaŭ kradoj
        APPS.forEach( ( app: AppData, i: number ) => {
            this.labortablo?.aldoniPiktogramon( app, i );
            this.komencaMenuo?.aldoniPiktogramon( app, i );
        } );
        this._alakrogiCxiujnKradojn();
        this._rearanĝiCxiujn();

        // Restarigi la konservitan labortablan aranĝon post la rekonstruo
        if ( KonservejaUtilo && this.labortablo?.container ) {
            const tiles = Array.from( this.labortablo.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
            const labortablo = this.labortablo;
            KonservejaUtilo.aplikiKahelanAranĝon( tiles, "desktopTileLayout", ( kahelo: HTMLElement, col: number, row: number ) => {
                labortablo.aplikiPozicion( kahelo, col, row );
            } );
        }
        this.labortablo?.refreŝigi();
        this.komencaMenuo?.refreŝigi();
    },

    _alakrogiCxiujnKradojn() {
        [ this.labortablo, this.komencaMenuo ].forEach( grid => {
            if ( grid?.container ) grid.container.querySelectorAll( ".app-tile" ).forEach( ( t: any ) => grid.alakrogiPostTrenado( t as HTMLElement ) );
        } );
    },

    _pritraktiGrandSxangxon() {
        [ this.labortablo, this.komencaMenuo ].forEach( grid => {
            if ( grid?.container ) grid.rearanĝi();
        } );
    },

    _konserviLabortablanArangxon() {
        if ( KonservejaUtilo && this.labortablo?.container ) {
            const tiles = Array.from( this.labortablo.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
            KonservejaUtilo.konserviKahelanAranĝon( tiles, "desktopTileLayout" );
        }
    },

    // Movigi kahelon al specifa paĝo (nur portebla)
    // En redakta reĝimo ( portebla ): deŝovi ĉiujn kahelojn unu paĝon malsupren,
    // kreante novan malplenan paĝon supre ( rulumo supre de la unua paĝo )
    deŝoviKahelojnUnuPaĝon() {
        if ( !this.labortablo ) return;
        const erojPoPaĝo = this.labortablo.rows * this.labortablo.cols;
        if ( erojPoPaĝo <= 0 ) return;

        const tiles = Array.from( this.labortablo.container?.querySelectorAll( ".app-tile" ) || [] ) as HTMLElement[];
        tiles.forEach( kahelo => {
            const indekso = APPS.findIndex( ( app: any ) => app.app === kahelo.dataset.app );
            if ( indekso === -1 ) return;
            const novaIndekso = indekso + erojPoPaĝo;
            this.labortablo!.alakrogiAlKrado( kahelo, novaIndekso );
        } );
        this._konserviLabortablanArangxon();
        this.labortablo.refreŝigi();
        this._gxisdatigiPaĝajnIndikilojn();
    },

    movigiKahelonAlPagxo( kahelo: HTMLElement, celPaĝo: number ) {
        if ( !kahelo || !this.labortablo ) return;

        const aplikaVojo = kahelo.dataset.app;
        const aplikaIndekso = APPS.findIndex( ( app: any ) => app.app === aplikaVojo );

        if ( aplikaIndekso === -1 ) return;

        // Forigi kahelon el nuna pozicio
        kahelo.remove();

        // Re-aldoni ĉe nova paĝpozicio
        const erojPoPaĝo = Math.max( 1, this.labortablo.rows * this.labortablo.cols );
        const novaIndekso = ( celPaĝo * erojPoPaĝo ) + ( aplikaIndekso % erojPoPaĝo );

        const novaEl = this.labortablo.aldoniPiktogramon( APPS[ aplikaIndekso ], novaIndekso );
        this.labortablo.alakrogiAlKrado( novaEl, novaIndekso );

        // Ĝisdatigi paĝajn indikilojn
        this._gxisdatigiPaĝajnIndikilojn();

        // Refreŝigi por montri kahelon sur nova paĝo
        this.labortablo.nunaPaĝo = celPaĝo;
        this.labortablo.refreŝigi();
        this._konserviLabortablanArangxon();
    },

    transigiPiktogramonDeKomencaMenuo( el: HTMLElement ) {
        const appData = {
            name: el.dataset.title || el.dataset.app?.split( "/" ).pop()?.replace( ".html", "" ) || "App",
            icon: ( el.querySelector( ".icon" ) as HTMLElement )?.innerHTML || akiriPiktogramon( "Defaŭlta" ),
            koloro: ( el.querySelector( ".icon" ) as HTMLElement )?.dataset.koloro || "",
            app: el.dataset.app || ""
        };
        
        if ( !this.labortablo || !this.komencaMenuo ) return;
        
        // Aldoni al labortablo
        const newEl = this.labortablo.aldoniPiktogramon( appData, 0 );
        this.labortablo.alakrogiAlKrado( newEl, 0 );
        el.remove();
        
        // Forigi duoblaĵon el komenca menuo kaj reelaranĝi
        const startMenu = this.komencaMenuo;
        if ( !startMenu.container ) return;
        
        [ ...startMenu.container.querySelectorAll( ".app-tile" ) ]
            .forEach( ( tile: any, idx: number ) => {
                if ( tile.dataset.app === appData.app ) tile.remove();
                else startMenu.alakrogiAlKrado( tile, idx );
            } );
        
        this._rearanĝiCxiujn();
        this._konserviLabortablanArangxon();
    },

    async inicii() {
        // IconGrid aŭtomate detektas porteblan aŭ labortablan nun
        this.labortablo = new PiktogramaKrado( "desktop", { centered: false, bottomUp: true, labelMode: "external" } );
        this.komencaMenuo = new PiktogramaKrado( "start-menu-content", { centered: false, bottomUp: true, labelMode: "external" } );

        // Agordi kruc-referencojn por transigaj operacioj
        ( this.labortablo as any ).desktop = this.labortablo;
        ( this.labortablo as any ).startMenu = this.komencaMenuo;
        ( this.komencaMenuo as any ).desktop = this.labortablo;
        ( this.komencaMenuo as any ).startMenu = this.komencaMenuo;

        APPS = APPS_DATA.map( ( app: any ) => ( {
            name: app.title || app.path.split( "/" ).pop().replace( ".html", "" ),
            icon: app.piktogramo,
            koloro: app.koloro || "",
            app: app.path
        } ) );

        // Ĝisdatigi la tutmondan referencon, ĉar ĝi estis fiksita ĉe ŝarĝo kun malplena tabelo
        ( window as any ).APPS = APPS;

        APPS.forEach( ( app: any, i: number ) => {
            this.labortablo?.aldoniPiktogramon( app, i );
            this.komencaMenuo?.aldoniPiktogramon( app, i );
        } );
        this._sxargiTitolojnDeLokalajPaĝoj();

        // Apliki konservitan kahelan aranĝon el stokejo ( nur se ĝi kongruas kun
        // la nuna krado; alie forĵeti ĝin por eviti denzigajn stakojn )
        if ( KonservejaUtilo && this.labortablo?.container ) {
            const konservita = KonservejaUtilo.sxargiKahelanAranĝon?.( "desktopTileLayout" ) || [];
            // Validi kontraŭ la efektivaj kraddimensioj ( la originala krado kiam
            // la spegulado estas malŝaltita, la faldebla 6 × 8 kiam ŝaltita )
            const labKolumnoj = this.labortablo.cols;
            const labVicoj = this.labortablo.rows;
            const kongruas = konservita.length === 0 || konservita.every( ( ero: any ) =>
                ero.col < labKolumnoj && ero.row < labVicoj );
            if ( kongruas ) {
                const tiles = Array.from( this.labortablo.container.querySelectorAll( ".app-tile" ) ) as HTMLElement[];
                const desktop = this.labortablo;
                KonservejaUtilo.aplikiKahelanAranĝon( tiles, "desktopTileLayout", ( tile: HTMLElement, col: number, row: number ) => {
                    desktop.aplikiPozicion( tile, col, row );
                } );
            } else if ( !kongruas ) {
                KonservejaUtilo.forigi?.( "desktopTileLayout" );
            }
        }

        this._iniciiRapidaAgordojn();
        this._rearanĝiCxiujn();
        this._kreiPaĝajnIndikilojn();
        setTimeout( () => this.labortablo?.rearanĝi(), 140 );

        window.addEventListener( "resize", limkurzo( () => {
            this._pritraktiGrandSxangxon();
            setTimeout( () => {
                this._alakrogiCxiujnKradojn();
                this._gxisdatigiPaĝajnIndikilojn();
            }, 200 );
        }, 300 ) );

        if ( RapidaAgordoAdministranto ) RapidaAgordoAdministranto.inicii();
        if ( (window as any).SciigoAdministranto ) (window as any).SciigoAdministranto.inicii();
    },

    // ⟪ Ŝargi titolojn de paĝoj mem per HTTP ( fetch + DOMParser ) ⟫
    // Por lokal aplikaĵoj ( relativaj vojoj ) ni ricevas la realan <title> el la HTML.
    // Por eksteraj URLoj ( https://… ) CORS blokas la peton — ni simple silentas kaj
    // uzas la jam ekzistantan nomon ( el app.title aŭ dosiernomo ).
    _sxargiTitolojnDeLokalajPaĝoj() {
        const cxuLoka = ( p: string ): boolean => !p.startsWith( "http://" ) && !p.startsWith( "https://" );

        APPS_DATA.forEach( ( appData: any, idx: number ) => {
            if ( !cxuLoka( appData.path ) ) return;

            const path = appData.path;
            fetch( path )
                .then( res => {
                    if ( !res.ok ) throw new Error( `HTTP ${res.status}` );
                    return res.text();
                } )
                .then( html => {
                    const doc = new DOMParser().parseFromString( html, "text/html" );
                    const titleEl = doc.querySelector( "title" );
                    if ( !titleEl || !titleEl.textContent ) return;

                    const title = titleEl.textContent.trim();
                    if ( !title ) return;

                    // Ĝisdatigi la kahelojn sur ambaŭ kradoj
                    [ ( window as any ).LabortablaPiktogramoAdministranto?.labortablo,
                      ( window as any ).LabortablaPiktogramoAdministranto?.komencaMenuo ]
                        .forEach( ( grid: any ) => {
                            if ( !grid?.container ) return;
                            const tiles = grid.container.querySelectorAll( ".app-tile" ) as NodeListOf<HTMLElement>;
                            for ( const tile of tiles ) {
                                if ( tile.dataset.app === path ) {
                                    tile.dataset.title = title;
                                    const label = tile.querySelector( ".title-bar-title, .label" );
                                    if ( label ) label.textContent = title;
                                }
                            }
                        } );
                } )
                .catch( () => {
                    // Silenti: CORS, reta eraro, ktp. — uzu la defaŭltan nomon.
                } );
        } );
    },

    _kreiPaĝajnIndikilojn() {
        // Forigi ekzistantajn indikilojn
        const ekzistanta = document.querySelector( ".page-indicators" );
        if ( ekzistanta ) ekzistanta.remove();

        // Krei paĝajn indikilojn por la nuna krado ( portebla aŭ labortabla )
        const krado = this.labortablo;
        const erojPoPaĝo = krado ? Math.max( 1, krado.rows * krado.cols ) : ( MOBILE_GRID_ROWS * MOBILE_GRID_COLS );
        const tutajPaĝoj = Math.ceil( APPS.length / erojPoPaĝo );

        const ujo = document.createElement( "div" );
        ujo.className = "page-indicators";

        for ( let i = 0; i < tutajPaĝoj; i++ ) {
            const punkto = document.createElement( "div" );
            punkto.className = "page-indicator" + ( i === this.labortablo?.nunaPaĝo ? " active" : "" );
            punkto.onclick = () => {
                if ( this.labortablo ) {
                    const antaŭa = this.labortablo.nunaPaĝo;
                    this.labortablo.nunaPaĝo = i;
                    this.labortablo.refreŝigi();
                    if ( i !== antaŭa ) this.labortablo.animaciiPaĝanSvingon( i > antaŭa ? 1 : -1 );
                    this._gxisdatigiPaĝajnIndikilojn();
                }
            };
            ujo.appendChild( punkto );
        }

        // La ujo restas en la dokumento eĉ kun unu paĝo, por ke rulumoj ĉe la
        // rando povu montri la indikilojn ( randa sugesto )
        document.body.appendChild( ujo );
    },

    _gxisdatigiPaĝajnIndikilojn() {
        if ( !this.labortablo ) return;
        if ( !document.querySelector( ".page-indicators" ) ) this._kreiPaĝajnIndikilojn();

        // Rekonstrui la punktojn kiam la paĝnombro ŝanĝiĝis ( krad-dimensioj )
        const krado = this.labortablo;
        const erojPoPaĝo = Math.max( 1, krado.rows * krado.cols );
        const tutajPaĝoj = Math.max( 1, Math.ceil( APPS.length / erojPoPaĝo ) );
        let ujo = document.querySelector( ".page-indicators" ) as HTMLElement;
        let punktoj = ujo.querySelectorAll( ".page-indicator" );
        if ( punktoj.length !== tutajPaĝoj ) {
            this._kreiPaĝajnIndikilojn();
            ujo = document.querySelector( ".page-indicators" ) as HTMLElement;
            if ( !ujo ) return;
            punktoj = ujo.querySelectorAll( ".page-indicator" );
        }

        punktoj.forEach( ( punkto, i ) => {
            punkto.classList.toggle( "active", i === krado.nunaPaĝo );
        } );

        // Montri la indikilojn dum la paĝa ŝanĝo, kaŝi ilin post mallonga paŭzo
        // ( re-akiri la ujon post ia ajn rekonstruado, por ke la flugo efektiviĝu )
        ujo.classList.add( "visible" );
        clearTimeout( ( this as any )._indikilaTempigilo );
        ( this as any )._indikilaTempigilo = setTimeout( () => ujo.classList.remove( "visible" ), 1200 );
    },

    _iniciiRapidaAgordojn() {
        const qsContainer = document.getElementById( "quick-settings-container" );
        const qsGrid = document.getElementById( "quick-settings-buttons" );
        const slidersContainer = document.getElementById( "quick-settings-sliders" );
        const editActions = document.getElementById( "qs-edit-actions" );

        if ( !qsContainer || !qsGrid || !slidersContainer || !editActions ) return;

        const stokejo = KonservejaUtilo;
        const savedToggleOrder = stokejo.akiri( "xeku1okek-order", null );
        const savedSliderOrder = stokejo.akiri( "qs-slider-order", null );
        const savedContainerOrder = stokejo.akiri( "qs-container-order", [ "quick-settings-sliders", "quick-settings-buttons" ] );

        const currentContainers: { [ key: string ]: HTMLElement | null } = { "quick-settings-buttons": qsGrid, "quick-settings-sliders": slidersContainer };
        savedContainerOrder.forEach( ( id: string ) => {
            const el = currentContainers[ id ];
            if ( el ) qsContainer.appendChild( el );
        } );
        qsContainer.appendChild( editActions );

        let toggles = [ ...QS_TOGGLES ];
        if ( savedToggleOrder ) {
            toggles = savedToggleOrder.map( ( id: string ) => QS_TOGGLES.find( ( t: any ) => t.id === id ) ).filter( Boolean );
            QS_TOGGLES.forEach( ( t: any ) => { if ( !savedToggleOrder.includes( t.id ) ) toggles.push( t ); } );
        }
        qsGrid.innerHTML = toggles.map( ( t: any ) => `
            <div class="xeku1okek" data-qs-id="${t.id}" onclick="window.LabortablaPiktogramoAdministranto._pritraktiRAAKlako( event , this , 'xeku1okek-order' )">
                <button class="caku1o" data-setting="${t.id}" aria-pressed="${t.default}" onclick="if ( window.baskuligiQsButonon ) baskuligiQsButonon( this )">
                    <span class="icon">${t.icon}</span>
                    <span class="label" data-oskakefani="${t.string}">${t.label}</span>
                </button>
                <button class="qs-remove-btn" onclick="event.stopPropagation(); window.LabortablaPiktogramoAdministranto._forigiRAAElementon( event , 'xeku1okek-order' , '${t.id}' )">/</button>
            </div>
        ` ).join( "" );

        const defaultSliders = QS_SLIDERS;
        let sliders = [ ...defaultSliders ];
        if ( savedSliderOrder ) {
            sliders = savedSliderOrder.map( ( id: string ) => defaultSliders.find( ( s: any ) => s.id === id ) ).filter( Boolean as any );
            defaultSliders.forEach( ( s: any ) => { if ( !savedSliderOrder.includes( s.id ) ) sliders.push( s ); } );
        }
        slidersContainer.innerHTML = sliders.map( ( s: any ) => `
            <div class="xeku1okek" data-qs-id="${s.id}" onclick="window.LabortablaPiktogramoAdministranto._pritraktiRAAKlako( event , this , 'qs-slider-order' )">
                <ciihii class="">
                    <span class="label" data-oskakefani="${s.string}">${s.label}</span>
                    <span class="icon">${s.icon}</span>
                    <input type="range" min="0" max="${s.max}" value="${s.value}" oninput="if ( window.aktualigiSxovilon ) aktualigiSxovilon( '${s.handler}' , this.value )">
                </ciihii>
                <button class="qs-remove-btn" onclick="event.stopPropagation(); window.LabortablaPiktogramoAdministranto._forigiRAAElementon( event , 'qs-slider-order' , '${s.id}' )">/</button>
            </div>
        ` ).join( "" );

        if ( !editActions.querySelector( ".qs-edit-btn" ) ) {
            const redaktiButono = document.createElement( "button" );
            redaktiButono.className = "qs-edit-btn n2tase";
            redaktiButono.innerHTML = "✏️";
            redaktiButono.onclick = () => {
                const estasRedaktata = qsContainer.classList.toggle( "qs-editing" );
                redaktiButono.innerHTML = estasRedaktata ? "✅" : "✏️";
            };
            redaktiButono.oncontextmenu = ( e: MouseEvent ) => {
                e.preventDefault();
                if ( !qsContainer.classList.contains( "qs-editing" ) ) return;
                const curT = Array.from( qsGrid.querySelectorAll( "[data-qs-id]" ) ).map( ( el: any ) => ( el as HTMLElement ).dataset.qsId );
                const curS = Array.from( slidersContainer.querySelectorAll( "[data-qs-id]" ) ).map( ( el: any ) => ( el as HTMLElement ).dataset.qsId );
                const remT = QS_TOGGLES.filter( ( t: any ) => !curT.includes( t.id ) );
                const remS = defaultSliders.filter( ( s: any ) => !curS.includes( s.id ) );
                if ( remT.length === 0 && remS.length === 0 ) return;
                if ( ( (window as any).KuntekstaMenuoAdministranto ) ) {
                    const addA = [ ...remT.map( ( t: any ) => ( { action: `add-qs-${t.id}`, label: `+ ${t.label}`, icon: t.icon } ) ), ...remS.map( ( s: any ) => ( { action: `add-qs-${s.id}`, label: `+ ${s.label}`, icon: "S" } ) ) ];
                    ( window as any ).KuntekstaMenuoAdministranto.bildigiMenuon( [], addA, e.clientX, e.clientY );
                    const originalaH = ( window as any ).KuntekstaMenuoAdministranto.pritraktiAgadon;
                    ( window as any ).KuntekstaMenuoAdministranto.pritraktiAgadon = ( ago: string ) => {
                        if ( ago.startsWith( "add-qs-" ) ) {
                            const id = ago.replace( "add-qs-", "" ), estasSxovilo = ( id === "volume" || id === "brightness" );
                            const stokejo = KonservejaUtilo;
                            const sxlosilo = estasSxovilo ? "qs-slider-order" : "xeku1okek-order", ord = stokejo.akiri( sxlosilo, [] );
                            ord.push( id ); stokejo.agordi( sxlosilo, ord ); this._iniciiRapidaAgordojn();
                        } else originalaH.call( ( window as any ).KuntekstaMenuoAdministranto, ago );
                        ( window as any ).KuntekstaMenuoAdministranto.pritraktiAgadon = originalaH;
                    };
                }
            };
            editActions.appendChild( redaktiButono );
        }

        [ qsGrid, slidersContainer ].forEach( c => this._agordiRAATreniReordigxon( c ) );
        this._agordiRAATeniLonTreni( qsContainer );

        if ( (window as any).RapidaAgordoAdministranto ) (window as any).RapidaAgordoAdministranto.restaŭriUI();
    },

    _pritraktiRAAKlako( e: any, el: HTMLElement ) {
        if ( document.getElementById( "quick-settings-container" )?.classList.contains( "qs-editing" ) ) {
            if ( e.target.tagName === "INPUT" ) return;
            e.preventDefault(); e.stopPropagation();
        } else if ( el.classList.contains( "xeku1okek" ) ) {
            if ( typeof baskuligiQsButonon === "function" ) baskuligiQsButonon( el );
        }
    },

    _forigiRAAElementon( storageKey: string, id: string ) {
        const stokejo = KonservejaUtilo;
        const ord = stokejo.akiri( storageKey, [] ).filter( ( itemId: string ) => itemId !== id );
        stokejo.agordi( storageKey, ord ); this._iniciiRapidaAgordojn();
    },

    _agordiRAATeniLonTreni( container: HTMLElement | null ) {
        if ( !container ) return;
        const stokejo = KonservejaUtilo;
        ( container as any ).onmousedown = ( e: MouseEvent ) => {
            if ( !container.classList.contains( "qs-editing" ) ) return;
            const celo = ( e.target as HTMLElement ).closest( "#quick-settings-buttons, #quick-settings-sliders" ) as HTMLElement | null;
            if ( !celo || ( e.target as HTMLElement ).tagName === "INPUT" || ( e.target as HTMLElement ).closest( "[data-qs-id]" ) ) return;
            const movi = ( ev: any, datumoj: any ) => {
                const svebanta = document.elementFromPoint( datumoj.x, datumoj.y )?.closest( "#quick-settings-buttons, #quick-settings-sliders" ) as HTMLElement | null;
                if ( svebanta && svebanta !== celo ) {
                    if ( Array.from( container.children ).indexOf( celo ) < Array.from( container.children ).indexOf( svebanta ) ) svebanta.after( celo );
                    else svebanta.before( celo );
                    stokejo.agordi( "qs-container-order", Array.from( container.children ).filter( c => c.id === "quick-settings-buttons" || c.id === "quick-settings-sliders" ).map( c => c.id ) );
                }
            };
            // Uzi unuecigitan enigan traktilon
            const EnigaAdministranto = ( window as any ).EnigaAdministranto;
            if ( EnigaAdministranto ) {
                EnigaAdministranto.agordiTrenadon( celo, null, movi, () => {} );
            }
        };
    },

    _agordiRAATreniReordigxon( container: HTMLElement | null ) {
        if ( !container ) return;
        const stokejo = KonservejaUtilo;
        container.addEventListener( "mousedown", ( e: MouseEvent ) => {
            const qsContainer = document.getElementById( "quick-settings-container" );
            if ( !qsContainer?.classList.contains( "qs-editing" ) ) return;
            const ero = ( e.target as HTMLElement ).closest( "[data-qs-id]" ) as HTMLElement | null;
            if ( !ero || !container.contains( ero ) ) return;
            e.preventDefault(); ero.classList.add( "qs-dragging" );
            const movi = ( ev: any, datumoj: any ) => {
                const faligi = document.elementFromPoint( datumoj.x, datumoj.y )?.closest( "[data-qs-id]" ) as HTMLElement | null;
                if ( faligi && faligi !== ero && container.contains( faligi ) ) {
                    const cxiuj = Array.from( container.querySelectorAll( "[data-qs-id]" ) ) as HTMLElement[];
                    if ( cxiuj.indexOf( ero ) < cxiuj.indexOf( faligi ) ) faligi.after( ero ); else faligi.before( ero );
                }
            };
            const supren = () => {
                ero.classList.remove( "qs-dragging" );
                const sxlosilo = ( container.id === "quick-settings-buttons" ) ? "xeku1okek-order" : "qs-slider-order";
                stokejo.agordi( sxlosilo, Array.from( container.querySelectorAll( "[data-qs-id]" ) ).map( el => ( el as HTMLElement ).dataset.qsId ) );
            };
            // Uzi unuecigitan enigan traktilon
            const EnigaAdministranto = ( window as any ).EnigaAdministranto;
            if ( EnigaAdministranto ) {
                EnigaAdministranto.agordiTrenadon( ero, null, movi, supren );
            }
        } );
    },
};

// Aldoni al fenestro por tutmonda aliro
( window as any ).LabortablaPiktogramoAdministranto = LabortablaPiktogramoAdministranto;
( window as any ).APPS = APPS;
