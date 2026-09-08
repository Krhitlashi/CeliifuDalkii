// ≺⧼ Sistemo ⧽≻ - Ĉefa OS-Kunordigo

const Sistemo = {
    // ⟪ Utilaĵoj ⟫

    alOktalaCxeno( str: any ) {
        if ( !str || typeof window.vab6caja !== "function" ) return str;
        if ( str.includes( ":" ) ) return str.split( ":" ).map( (p: any) => window.vab6caja( parseInt( p, 0o10 ) ) || p ).join( "." );
        return window.vab6caja( parseInt( str, 0o10 ) ) || str;
    },

    // ⟪ Inicii ⟫

    init() {
        // 1. ⟨ Esencaj Administrantoj ⟩
        if ( (window as any).FenestraAdministranto ) (window as any).FenestraAdministranto.inicii();
        if ( (window as any).KuntekstaMenuoAdministranto ) (window as any).KuntekstaMenuoAdministranto.inicii();
        if ( (window as any).PanelaAdministranto ) (window as any).PanelaAdministranto.iniciiEksterklakanTraktilon();
        if ( (window as any).SciigoAdministranto ) (window as any).SciigoAdministranto.inicii();
        if ( (window as any).HorlogxoAdministranto ) (window as any).HorlogxoAdministranto.inicii();
        if ( (window as any).StatusaAdministranto ) (window as any).StatusaAdministranto.inicii();

        // 2. ⟨ Eventoj ⟩
        this.agordiEventojn();

        // 3. ⟨ Fina Bildigo ⟩
        if ( (window as any).LabortablaPiktogramoAdministranto ) {
            requestAnimationFrame( () => (window as any).LabortablaPiktogramoAdministranto.inicii() );
        }
    },

    agordiEventojn() {
        const hb = document.getElementById( "home-bar" );
        if ( hb ) hb.onclick = () => {
            const paneloj = (window as any).PanelaAdministranto;
            const ekranTiro = document.querySelector( "#quick-settings-container.visible, #notifications-panel.visible, #recents-panel.visible, #clock-panel.visible, #taskbar-dock.visible, #start-menu.open" );

            // Unue fermi malfermitajn panelojn/ombrejojn ( hejmbreto = hejmen )
            if ( ekranTiro ) {
                paneloj.fermiCxiujnPanelojn();
                return;
            }

            // Ĉe porteblaj ekranoj premo sur la hejmbreto minimumigas la fokusitan aplikaĵon
            // al la taskobreto ( hejmo ) anstataŭ plene fermi ĝin
            const wm = (window as any).FenestraAdministranto;
            if ( wm?.estasPortebla?.() ) {
                wm.minimumigiFokusitanFenestron();
                return;
            }
            if ( document.body.classList.contains( "start-menu-open" ) ) paneloj.fermiCxiujnPanelojn();
            else paneloj.baskuligiKomencaMenuo();
        };

        const tb = document.getElementById( "taskbar" );
        if ( tb ) tb.onclick = ( e: any ) => {
            const btn = (e.target as HTMLElement).closest( "button" );
            if ( !btn ) return;
            const actions: { [key: string]: string } = { "status-area": "baskuligiRapidaAgordoj", "notification-btn": "baskuligiSciigojn", "recents-btn": "montriLastatempajn", "clock-area": "baskuligiHorlogxoElsxovo" };
            if ( actions[ btn.id ] ) ((window as any).PanelaAdministranto as any)[ actions[ btn.id ] ]();
        };
    }
};

// ⟪ Tutmondaj Aliajnimoj ⟫

function baskuligiQsButonon( btn: any ) { if ( (window as any).RapidaAgordoAdministranto ) (window as any).RapidaAgordoAdministranto.pritraktiBaskulon( btn ); }
function aktualigiSxovilon( type: any, val: any ) {
    if ( !(window as any).RapidaAgordoAdministranto ) return;
    if ( type === "brightness" ) (window as any).RapidaAgordoAdministranto.agordiHelecon( parseInt( val ) );
    else if ( type === "volume" ) (window as any).RapidaAgordoAdministranto.agordiLaŭtecon( parseInt( val ) );
}

// Aldoni al fenestro por tutmonda aliro
(window as any).baskuligiQsButonon = baskuligiQsButonon;
(window as any).aktualigiSxovilon = aktualigiSxovilon;
(window as any).Sistemo = Sistemo;
