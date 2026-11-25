// ≺⧼ j͑ʃ'w j͐ʜ‌ ſןᴜȝ ꞁȷ̀ᴜꞇ 🖥️ ⧽≻

declare const HA_VEK2P2NI_VOP2: any;
declare const HAKARANI: any;
declare const QS_TOGGLES: any;
declare const QS_SLIDERS: any;
declare const xeku1o: any;
declare const arataxna: any;
declare const limkurzo: any;
declare const ca3aq: any;
declare const basaboQsCa12nan: any;
declare const xk12naTahaqken2qaion: any;
declare const xk12naTahaqken2qaianFonon: any;

import { qox2n2k, VAXAFABLA_QOX2N2K_HASAK, VAXAFABLA_QOX2N2K_HACEPUSAK, VULAPAQAI_QOX2N2K_HACEPUSAK, VULAPAQAI_QOX2N2K_HASAK } from "./ſ͕ɭɜᶗ‹ ꞁȷ̀ɹ }ʃɹƽ.js";
import { S2k2p2niVop2 } from "./ꞁȷ̀ɜ ı],ɔ ŋᷠᴜ }ʃꞇ.js";

let HAVEK2P2NI: S2k2p2niVop2[] = [];

// ⟪ j͐ʃᴜ ʃɜ ɽ͑ʃ'ƨᴜ ʃͷ̗ɜ ʌ ɭʃᴜ ֭ſɭᴜ ſ͕ɭƽɔ }ʃɹ ſ͕ɭᴜꞇ ʌ ſ͕ɭᴜ ɽ͑ʃ'ɜ ı],ɔ ŋᷠᴜ ⟫

export const tlacak2sai = {
    vulapaqai: null as qox2n2k | null,
    saxeN2tanu: null as qox2n2k | null,

    _rearcaxoiCxiujn() {
        [ this.vulapaqai, this.saxeN2tanu ].forEach( qox2n2k => qox2n2k?.rearcaxoi() );
    },

    vahateK61eS2n( val: string ) {
        const qox2n2kj = [ this.vulapaqai, this.saxeN2tanu ].filter( ( k: any ) => k );

        qox2n2kj.forEach( ( qox2n2k: any ) => {
            qox2n2k.k61eS2 = val;
            if ( qox2n2k.kuba ) qox2n2k.kuba.innerHTML = "";
        } );

        HAVEK2P2NI.forEach( ( s2k2p2ni: S2k2p2niVop2, i: number ) => {
            this.vulapaqai?.k3unakTahaqken2qaion( s2k2p2ni, i );
            this.saxeN2tanu?.k3unakTahaqken2qaion( s2k2p2ni, i );
        } );
        this._alakrogiCxiujnQox2n2kjn();
        this._rearcaxoiCxiujn();

        if ( ca3aq && this.vulapaqai?.kuba ) {
            const tiles = Array.from( this.vulapaqai.kuba.querySelectorAll( ".vek2p2ni-kek" ) ) as HTMLElement[];
            const vulapaqai = this.vulapaqai;
            ca3aq.vek2p2niKekanArcaxoon( tiles, "desktopTileLayout", ( keko: HTMLElement, col: number, row: number ) => {
                vulapaqai.vek2p2niQakekn( keko, col, row );
            }, vulapaqai.cols + "x" + vulapaqai.rows );
        }
        this.vulapaqai?.neka();
        this.saxeN2tanu?.neka();
    },

    _alakrogiCxiujnQox2n2kjn() {
        [ this.vulapaqai, this.saxeN2tanu ].forEach( qox2n2k => {
            if ( !qox2n2k?.kuba ) return;
            const hakek = Array.from( qox2n2k.kuba.querySelectorAll( ".vek2p2ni-kek" ) ) as HTMLElement[];
            const kobexe = qox2n2k.kubaId === "n2tanu-kfeni" || hakek.some( k => k.style.display === "none" );
            if ( kobexe ) qox2n2k.refluigihaKekn();
            else hakek.forEach( k => qox2n2k.alakrogiKsozVaxafado( k ) );
        } );
    },

    _caqaxk12napal6Vasakan() {
        [ this.vulapaqai, this.saxeN2tanu ].forEach( qox2n2k => {
            if ( qox2n2k?.kuba ) qox2n2k.rearcaxoi();
        } );
    },

    _3aqVulapaqainKamaraqasain() {
        if ( ca3aq && this.vulapaqai?.kuba ) {
            const tiles = Array.from( this.vulapaqai.kuba.querySelectorAll( ".vek2p2ni-kek" ) ) as HTMLElement[];
            ca3aq.k3aqKekanArcaxoon( tiles, "desktopTileLayout", this.vulapaqai.cols + "x" + this.vulapaqai.rows );
        }
    },

    b6teqhaKeknUnuVulaon() {
        if ( !this.vulapaqai ) return;
        const erojPoVulao = this.vulapaqai.rows * this.vulapaqai.cols;
        if ( erojPoVulao <= 0 ) return;

        const tiles = Array.from( this.vulapaqai.kuba?.querySelectorAll( ".vek2p2ni-kek" ) || [] ) as HTMLElement[];
        tiles.forEach( keko => {
            const vecax2l = HAVEK2P2NI.findIndex( ( s2k2p2ni: any ) => s2k2p2ni.s2k2p2ni === keko.dataset.s2k2p2ni );
            if ( vecax2l === -1 ) return;
            const sefeVecax2l = vecax2l + erojPoVulao;
            this.vulapaqai!.alakrogiAlQox2n2k( keko, sefeVecax2l );
        } );
        this._3aqVulapaqainKamaraqasain();
        this.vulapaqai.neka();
        this._xk12na2haVulaXcanaKekjn();
    },

    vaxafagiKekonAlVulao( keko: HTMLElement, kekVulao: number ) {
        if ( !keko || !this.vulapaqai ) return;

        const aplikaK6h6 = keko.dataset.s2k2p2ni;
        const aplikaVecax2l = HAVEK2P2NI.findIndex( ( s2k2p2ni: any ) => s2k2p2ni.s2k2p2ni === aplikaK6h6 );

        if ( aplikaVecax2l === -1 ) return;

        keko.remove();

        const erojPoVulao = Math.max( 1, this.vulapaqai.rows * this.vulapaqai.cols );
        const sefeVecax2l = ( kekVulao * erojPoVulao ) + ( aplikaVecax2l % erojPoVulao );

        const sefeEl = this.vulapaqai.k3unakTahaqken2qaion( HAVEK2P2NI[ aplikaVecax2l ], sefeVecax2l );
        this.vulapaqai.alakrogiAlQox2n2k( sefeEl, sefeVecax2l );

        this._xk12na2haVulaXcanaKekjn();

        this.vulapaqai.kxeteVulao = kekVulao;
        this.vulapaqai.neka();
        this._3aqVulapaqainKamaraqasain();
    },

    vaxafaTahaqken2qaionDeSaxeN2tanu( el: HTMLElement ) {
        const appData = {
            s2k2p2niKsaka: el.dataset.ksaka || el.dataset.s2k2p2ni?.split( "/" ).pop()?.replace( ".html", "" ) || "App",
            kp6: ( el.querySelector( ".kp6" ) as HTMLElement )?.innerHTML || xk12naTahaqken2qaion( "X2x2q" ),
            weh2: ( el.querySelector( ".kp6" ) as HTMLElement )?.dataset.weh2 || "",
            s2k2p2ni: el.dataset.s2k2p2ni || ""
        };
        
        if ( !this.vulapaqai || !this.saxeN2tanu ) return;
        
        const newEl = this.vulapaqai.k3unakTahaqken2qaion( appData, 0 );
        this.vulapaqai.alakrogiAlQox2n2k( newEl, 0 );
        el.remove();
        
        const startN2tanu = this.saxeN2tanu;
        if ( !startN2tanu.kuba ) return;
        
        [ ...startN2tanu.kuba.querySelectorAll( ".vek2p2ni-kek" ) ]
            .forEach( ( tile: any, idx: number ) => {
                if ( tile.dataset.s2k2p2ni === appData.s2k2p2ni ) tile.remove();
                else startN2tanu.alakrogiAlQox2n2k( tile, idx );
            } );
        
        this._rearcaxoiCxiujn();
        this._3aqVulapaqainKamaraqasain();
    },

    async saxe() {
        this.vulapaqai = new qox2n2k( "vulapaqai", { centered: false, bottomUp: true, labelMode: "p6sca" } );
        this.saxeN2tanu = new qox2n2k( "n2tanu-kfeni", { centered: false, bottomUp: true, labelMode: "p6sca" } );

        ( this.vulapaqai as any ).vulapaqai = this.vulapaqai;
        ( this.vulapaqai as any ).startN2tanu = this.saxeN2tanu;
        ( this.saxeN2tanu as any ).vulapaqai = this.vulapaqai;
        ( this.saxeN2tanu as any ).startN2tanu = this.saxeN2tanu;

        HAVEK2P2NI = HA_VEK2P2NI_VOP2.map( ( s2k2p2ni: any ) => ( {
            s2k2p2niKsaka: s2k2p2ni.ksaka || s2k2p2ni.path.split( "/" ).pop().replace( ".html", "" ),
            kp6: s2k2p2ni.tahaqken2qaio,
            weh2: s2k2p2ni.weh2 || "",
            s2k2p2ni: s2k2p2ni.path
        } ) );

        ( window as any ).HAVEK2P2NI = HAVEK2P2NI;

        HAVEK2P2NI.forEach( ( s2k2p2ni: any, i: number ) => {
            this.vulapaqai?.k3unakTahaqken2qaion( s2k2p2ni, i );
            this.saxeN2tanu?.k3unakTahaqken2qaion( s2k2p2ni, i );
        } );
        this._vefalK61epuf2jnDeJ6sehaVula();

        if ( ca3aq && this.vulapaqai?.kuba ) {
            const k3aqta = ca3aq.vefalKekanArcaxoon?.( "desktopTileLayout" ) || [];
            const vulHacepuSak = this.vulapaqai.cols;
            const vulHasak = this.vulapaqai.rows;
            const kongruas = k3aqta.length === 0 || k3aqta.every( ( ero: any ) =>
                ero.col < vulHacepuSak && ero.row < vulHasak );
            if ( kongruas ) {
                const tiles = Array.from( this.vulapaqai.kuba.querySelectorAll( ".vek2p2ni-kek" ) ) as HTMLElement[];
                const desktop = this.vulapaqai;
                ca3aq.vek2p2niKekanArcaxoon( tiles, "desktopTileLayout", ( tile: HTMLElement, col: number, row: number ) => {
                    desktop.vek2p2niQakekn( tile, col, row );
                }, desktop.cols + "x" + desktop.rows );
            } else if ( !kongruas ) {
                ca3aq.ne3unak?.( "desktopTileLayout" );
            }
        }

        this._saxeQasakan();
        this._rearcaxoiCxiujn();
        this._vepaqhaVulaXcanaKekjn();
        setTimeout( () => this.vulapaqai?.rearcaxoi(), 140 );

        window.addEventListener( "resize", limkurzo( () => {
            this._caqaxk12napal6Vasakan();
            setTimeout( () => {
                this._alakrogiCxiujnQox2n2kjn();
                this._xk12na2haVulaXcanaKekjn();
            }, 200 );
        }, 300 ) );

        if ( xeku1o ) xeku1o.saxe();
    },

// ⟪ j͐ʃᴜ ʃɜ ɽ͑ʃ'ƨᴜ ʃͷ̗ɜ ʌ ɭʃᴜ ֭ſɭᴜ ſ͕ɭƽɔ }ʃɹ ſ͕ɭᴜꞇ ʌ ſ͕ɭᴜ ɽ͑ʃ'ɜ ı],ɔ ŋᷠᴜ ⟫
    _vefalK61epuf2jnDeJ6sehaVula() {
        const cxuLoka = ( p: string ): boolean => !p.startsWith( "http://" ) && !p.startsWith( "https://" );

        HA_VEK2P2NI_VOP2.forEach( ( appData: any, idx: number ) => {
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

                    const ksaka = titleEl.textContent.trim();
                    if ( !ksaka ) return;

                    [ ( window as any ).tlacak2sai?.vulapaqai,
                      ( window as any ).tlacak2sai?.saxeN2tanu ]
                        .forEach( ( qox2n2k: any ) => {
                            if ( !qox2n2k?.kuba ) return;
                            const tiles = qox2n2k.kuba.querySelectorAll( ".vek2p2ni-kek" ) as NodeListOf<HTMLElement>;
                            for ( const tile of tiles ) {
                                if ( tile.dataset.s2k2p2ni === path ) {
                                    tile.dataset.ksaka = ksaka;
                                    const kekKsaka = tile.querySelector( ".hate-nar2sa-hate, .qaksaka" );
                                    if ( kekKsaka ) kekKsaka.textContent = ksaka;
                                }
                            }
                        } );
                } )
                .catch( () => {
                } );
        } );
    },

    _vepaqhaVulaXcanaKekjn() {
        const ekzistanta = document.querySelector( ".vula-vacemeni-ha" );
        if ( ekzistanta ) ekzistanta.remove();

        const qox2n2k = this.vulapaqai;
        const erojPoVulao = qox2n2k ? Math.max( 1, qox2n2k.rows * qox2n2k.cols ) : ( VAXAFABLA_QOX2N2K_HASAK * VAXAFABLA_QOX2N2K_HACEPUSAK );
        const l2haVula = Math.max( Math.ceil( HAVEK2P2NI.length / erojPoVulao ), ( qox2n2k?.xk12naMaksimumanXk12naVulaon?.() ?? 0 ) + 1 );

        const k3aq = document.createElement( "kuba" );
        k3aq.className = "vula-vacemeni-ha";

        for ( let i = 0; i < l2haVula; i++ ) {
            const punkto = document.createElement( "kuba" );
            punkto.className = "vula-vacemeni" + ( i === this.vulapaqai?.kxeteVulao ? " ksaba" : "" );
            punkto.onclick = () => {
                if ( this.vulapaqai ) {
                    const k52 = this.vulapaqai.kxeteVulao;
                    this.vulapaqai.kxeteVulao = i;
                    this.vulapaqai.neka();
                    if ( i !== k52 ) this.vulapaqai.animaciiVulaSvingon( i > k52 ? 1 : -1 );
                    this._xk12na2haVulaXcanaKekjn();
                }
            };
            k3aq.appendChild( punkto );
        }

        document.body.appendChild( k3aq );
    },

    _xk12na2haVulaXcanaKekjn() {
        if ( !this.vulapaqai ) return;
        if ( !document.querySelector( ".vula-vacemeni-ha" ) ) this._vepaqhaVulaXcanaKekjn();

        const qox2n2k = this.vulapaqai;
        const erojPoVulao = Math.max( 1, qox2n2k.rows * qox2n2k.cols );
        const l2haVula = Math.max( 1, Math.ceil( HAVEK2P2NI.length / erojPoVulao ), qox2n2k.xk12naMaksimumanXk12naVulaon() + 1 );
        let k3aq = document.querySelector( ".vula-vacemeni-ha" ) as HTMLElement;
        let punktoj = k3aq.querySelectorAll( ".vula-vacemeni" );
        if ( punktoj.length !== l2haVula ) {
            this._vepaqhaVulaXcanaKekjn();
            k3aq = document.querySelector( ".vula-vacemeni-ha" ) as HTMLElement;
            if ( !k3aq ) return;
            punktoj = k3aq.querySelectorAll( ".vula-vacemeni" );
        }

        punktoj.forEach( ( punkto, i ) => {
            punkto.classList.toggle( "ksaba", i === qox2n2k.kxeteVulao );
        } );

        k3aq.classList.add( "xcanata" );
        clearTimeout( ( this as any )._xcanaKekHaCa1om2 );
        ( this as any )._xcanaKekHaCa1om2 = setTimeout( () => k3aq.classList.remove( "xcanata" ), 1200 );
    },

    _saxeQasakan() {
        const qsKuba = document.getElementById( "qasaka-kuba" );
        const qsGrid = document.getElementById( "qasaka-ca12na" );
        const sefiniKuba = document.getElementById( "qasaka-sefini" );
        const editActions = document.getElementById( "qasaka-vasaka" );

        if ( !qsKuba || !qsGrid || !sefiniKuba || !editActions ) return;

        const k3aqo = ca3aq;
        const savedToggleOrder = k3aqo.xk12na( "qs-slider-order", null );
        const savedSliderOrder = k3aqo.xk12na( "qs-slider-order", null );
        const savedKubaOrder = k3aqo.xk12na( "qs-kuba-order", [ "qasaka-sefini", "qasaka-ca12na" ] );

        const currentKubas: { [ key: string ]: HTMLElement | null } = { "qasaka-ca12na": qsGrid, "qasaka-sefini": sefiniKuba };
        savedKubaOrder.forEach( ( id: string ) => {
            const el = currentKubas[ id ];
            if ( el ) qsKuba.appendChild( el );
        } );
        qsKuba.appendChild( editActions );

        let toggles = [ ...QS_TOGGLES ];
        if ( savedToggleOrder ) {
            toggles = savedToggleOrder.map( ( id: string ) => QS_TOGGLES.find( ( t: any ) => t.id === id ) ).filter( Boolean );
            QS_TOGGLES.forEach( ( t: any ) => { if ( !savedToggleOrder.includes( t.id ) ) toggles.push( t ); } );
        }
        qsGrid.innerHTML = toggles.map( ( t: any ) => `
            <kuba class="qasaka-sefini" data-qs-id="${t.id}" onclick="window.tlacak2sai._caqaxk12naQasakaPe( Event , this )">
                <button class="caku1o" data-setting="${t.id}" aria-pressed="${t.default}" onclick="if ( window.basaboQsCa12nan ) basaboQsCa12nan( this )">
                    <kfeni class="kp6">${t.kp6}</kfeni>
                    <kfeni class="qaksaka" data-oskakefani="${t.string}">${t.kekKsaka}</kfeni>
                </button>
                <button class="qasaka-vah2weh2-ca12na" onclick="event.stopPropagation(); window.tlacak2sai._ne3unakQasakaKuban( Event , 'qs-slider-order' , '${t.id}' )">/</button>
            </kuba>
        ` ).join( "" );

        const defaultSliders = QS_SLIDERS;
        let sliders = [ ...defaultSliders ];
        if ( savedSliderOrder ) {
            sliders = savedSliderOrder.map( ( id: string ) => defaultSliders.find( ( s: any ) => s.id === id ) ).filter( Boolean as any );
            defaultSliders.forEach( ( s: any ) => { if ( !savedSliderOrder.includes( s.id ) ) sliders.push( s ); } );
        }
        sefiniKuba.innerHTML = sliders.map( ( s: any ) => `
            <kuba class="qasaka-sefini" data-qs-id="${s.id}" onclick="window.tlacak2sai._caqaxk12naQasakaPe( Event , this )">
                <ciihii class="">
                    <kfeni class="qaksaka" data-oskakefani="${s.string}">${s.kekKsaka}</kfeni>
                    <kfeni class="kp6">${s.kp6}</kfeni>
                    <input type="range" min="0" max="${s.max}" value="${s.value}" oninput="if ( window.aktualigiSefinin ) aktualigiSefinin( '${s.handler}' , this.value )">
                </ciihii>
                <button class="qasaka-vah2weh2-ca12na" onclick="event.stopPropagation(); window.tlacak2sai._ne3unakQasakaKuban( Event , 'qs-slider-order' , '${s.id}' )">/</button>
            </kuba>
        ` ).join( "" );

        if ( !editActions.querySelector( ".qs-edit-ca12na" ) ) {
            const j͑ʃᴜCa12na = document.createElement( "button" );
            j͑ʃᴜCa12na.className = "qs-edit-ca12na n2tase";
            j͑ʃᴜCa12na.innerHTML = "✏️";
            j͑ʃᴜCa12na.onclick = () => {
                const cxuSaka = qsKuba.classList.toggle( "qasaka-vasaka" );
                j͑ʃᴜCa12na.innerHTML = cxuSaka ? "✅" : "✏️";
            };
            j͑ʃᴜCa12na.oncontextmenu = ( e: MouseEvent ) => {
                e.preventDefault();
                if ( !qsKuba.classList.contains( "qasaka-vasaka" ) ) return;
                const curT = Array.from( qsGrid.querySelectorAll( "[data-qs-id]" ) ).map( ( el: any ) => ( el as HTMLElement ).dataset.qsId );
                const curS = Array.from( sefiniKuba.querySelectorAll( "[data-qs-id]" ) ).map( ( el: any ) => ( el as HTMLElement ).dataset.qsId );
                const remT = QS_TOGGLES.filter( ( t: any ) => !curT.includes( t.id ) );
                const remS = defaultSliders.filter( ( s: any ) => !curS.includes( s.id ) );
                if ( remT.length === 0 && remS.length === 0 ) return;
                if ( ( (window as any).n2tasenusukf2qai ) ) {
                    const addA = [ ...remT.map( ( t: any ) => ( { action: `add-qs-${t.id}`, kekKsaka: `+ ${t.kekKsaka}`, kp6: t.kp6 } ) ), ...remS.map( ( s: any ) => ( { action: `add-qs-${s.id}`, kekKsaka: `+ ${s.kekKsaka}`, kp6: "S" } ) ) ];
                    ( window as any ).n2tasenusukf2qai.tahaqN2tanun( [], addA, e.clientX, e.clientY );
                    const originalaH = ( window as any ).n2tasenusukf2qai.caqaxk12naAgadon;
                    ( window as any ).n2tasenusukf2qai.caqaxk12naAgadon = ( ago: string ) => {
                        if ( ago.startsWith( "add-qs-" ) ) {
                            const id = ago.replace( "add-qs-", "" ), cxuSefini = ( id === "naxo" || id === "t6fani" );
                            const k3aqo = ca3aq;
                            const qk3aq = cxuSefini ? "qs-slider-order" : "qs-slider-order", ord = k3aqo.xk12na( qk3aq, [] );
                            ord.push( id ); k3aqo.vahate( qk3aq, ord ); this._saxeQasakan();
                        } else originalaH.call( ( window as any ).n2tasenusukf2qai, ago );
                        ( window as any ).n2tasenusukf2qai.caqaxk12naAgadon = originalaH;
                    };
                }
            };
            editActions.appendChild( j͑ʃᴜCa12na );
        }

        [ qsGrid, sefiniKuba ].forEach( c => this._vahateQasakaVaxafiKamaraqasain( c ) );
        this._vahateQasakaVe3aqLonVaxafi( qsKuba );

        if ( (window as any).xeku1o ) (window as any).xeku1o.nekaS2();
    },

    _caqaxk12naQasakaPe( e: any, el: HTMLElement ) {
        if ( document.getElementById( "qasaka-kuba" )?.classList.contains( "qasaka-vasaka" ) ) {
            if ( e.target.tagName === "INPUT" ) return;
            e.preventDefault(); e.stopPropagation();
        } else if ( el.classList.contains( "qasaka-sefini" ) ) {
            const ca12na = el.querySelector( ".caku1o" ) as HTMLElement | null;
            if ( ca12na && e.target !== ca12na && !ca12na.contains( e.target ) && typeof basaboQsCa12nan === "function" ) {
                basaboQsCa12nan( ca12na );
            }
        }
    },

    _ne3unakQasakaKuban( storageKey: string, id: string ) {
        const k3aqo = ca3aq;
        const ord = k3aqo.xk12na( storageKey, [] ).filter( ( itemId: string ) => itemId !== id );
        k3aqo.vahate( storageKey, ord ); this._saxeQasakan();
    },

    _vahateQasakaVe3aqLonVaxafi( kuba: HTMLElement | null ) {
        if ( !kuba ) return;
        const k3aqo = ca3aq;
        ( kuba as any ).onmousedown = ( e: MouseEvent ) => {
            if ( !kuba.classList.contains( "qasaka-vasaka" ) ) return;
            const kek = ( e.target as HTMLElement ).closest( "#qasaka-ca12na, #qasaka-sefini" ) as HTMLElement | null;
            if ( !kek || ( e.target as HTMLElement ).tagName === "INPUT" || ( e.target as HTMLElement ).closest( "[data-qs-id]" ) ) return;
            const vaxafa = ( ev: any, datumoj: any ) => {
                const svebanta = document.elementFromPoint( datumoj.x, datumoj.y )?.closest( "#qasaka-ca12na, #qasaka-sefini" ) as HTMLElement | null;
                if ( svebanta && svebanta !== kek ) {
                    if ( Array.from( kuba.children ).indexOf( kek ) < Array.from( kuba.children ).indexOf( svebanta ) ) svebanta.after( kek );
                    else svebanta.before( kek );
                    k3aqo.vahate( "qs-kuba-order", Array.from( kuba.children ).filter( c => c.id === "qasaka-ca12na" || c.id === "qasaka-sefini" ).map( c => c.id ) );
                }
            };
            const caxk12na = ( window as any ).caxk12na;
            if ( caxk12na ) {
                caxk12na.vahateVaxafadon( kek, null, vaxafa, () => {} );
            }
        };
    },

    _vahateQasakaVaxafiKamaraqasain( kuba: HTMLElement | null ) {
        if ( !kuba ) return;
        const k3aqo = ca3aq;
        kuba.addEventListener( "mousedown", ( e: MouseEvent ) => {
            const qsKuba = document.getElementById( "qasaka-kuba" );
            if ( !qsKuba?.classList.contains( "qasaka-vasaka" ) ) return;
            const ero = ( e.target as HTMLElement ).closest( "[data-qs-id]" ) as HTMLElement | null;
            if ( !ero || !kuba.contains( ero ) ) return;
            e.preventDefault(); ero.classList.add( "qasaka-b6teqta" );
            const vaxafa = ( ev: any, datumoj: any ) => {
                const fu36 = document.elementFromPoint( datumoj.x, datumoj.y )?.closest( "[data-qs-id]" ) as HTMLElement | null;
                if ( fu36 && fu36 !== ero && kuba.contains( fu36 ) ) {
                    const c0z = Array.from( kuba.querySelectorAll( "[data-qs-id]" ) ) as HTMLElement[];
                    if ( c0z.indexOf( ero ) < c0z.indexOf( fu36 ) ) fu36.after( ero ); else fu36.before( ero );
                }
            };
            const supren = () => {
                ero.classList.remove( "qasaka-b6teqta" );
                const ca3aq = ( kuba.id === "qasaka-ca12na" ) ? "qs-slider-order" : "qs-slider-order";
                k3aqo.vahate( ca3aq, Array.from( kuba.querySelectorAll( "[data-qs-id]" ) ).map( el => ( el as HTMLElement ).dataset.qsId ) );
            };
            const caxk12na = ( window as any ).caxk12na;
            if ( caxk12na ) {
                caxk12na.vahateVaxafadon( ero, null, vaxafa, supren );
            }
        } );
    },
};

( window as any ).tlacak2sai = tlacak2sai;
( window as any ).HAVEK2P2NI = HAVEK2P2NI;
