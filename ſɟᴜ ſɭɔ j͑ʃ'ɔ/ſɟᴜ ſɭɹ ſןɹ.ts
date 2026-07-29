// ≺⧼ Sistemo ⧽≻ - Main OS Coordination

const Sistemo = {
    // ⟪ Utilities ⟫

    alOktalaCxeno( str: any ) {
        if ( !str || typeof window.vab6caja !== "function" ) return str;
        if ( str.includes( ":" ) ) return str.split( ":" ).map( (p: any) => window.vab6caja( parseInt( p, 0o10 ) ) || p ).join( "." );
        return window.vab6caja( parseInt( str, 0o10 ) ) || str;
    },

    gxisdatigiHorlogxon() {
        const el = document.getElementById( "clock" );
        if ( el && typeof window.castifeh2 === "function" && typeof window.vab6caja === "function" ) {
            const t = window.castifeh2( new Date() );
            el.innerText = `${window.vab6caja( t.she )}.${window.vab6caja( t.qe )}.${window.vab6caja( t.he )}`;
        }
    },

    // ⟪ Inicii ⟫

    init() {
        // 1. ⟨ Esencaj Administrantoj ⟩
        if ( (window as any).FenestraAdministranto ) (window as any).FenestraAdministranto.inicii();
        if ( (window as any).KuntekstaMenuoAdministranto ) (window as any).KuntekstaMenuoAdministranto.inicii();
        if ( (window as any).PanelaAdministranto ) (window as any).PanelaAdministranto.initClickOutsideHandler();
        if ( (window as any).SciigoAdministranto ) (window as any).SciigoAdministranto.inicii();
        if ( (window as any).HorlogxoAdministranto ) (window as any).HorlogxoAdministranto.inicii();

        // 2. ⟨ Servobukloj ⟩
        setInterval( () => this.gxisdatigiHorlogxon(), 0o2000 );
        this.gxisdatigiHorlogxon();

        // 3. ⟨ Eventoj ⟩
        this.agordiEventojn();

        // 4. ⟨ Fina Bildigo ⟩
        if ( (window as any).LabortablaPiktogramoAdministranto ) {
            requestAnimationFrame( () => (window as any).LabortablaPiktogramoAdministranto.inicii() );
        }
    },

    agordiEventojn() {
        const hb = document.getElementById( "home-bar" );
        if ( hb ) hb.onclick = () => {
            if ( document.body.classList.contains( "start-menu-open" ) ) (window as any).PanelaAdministranto.fermiCxiujnPanelojn();
            else (window as any).PanelaAdministranto.baskuligiKomencaMenuo();
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

function toggleQsButton( btn: any ) { if ( (window as any).RapidaAgordoAdministranto ) (window as any).RapidaAgordoAdministranto.pritraktiBaskulon( btn ); }
function updateSlider( type: any, val: any ) {
    if ( !(window as any).RapidaAgordoAdministranto ) return;
    if ( type === "brightness" ) (window as any).RapidaAgordoAdministranto.agordiHelecon( parseInt( val ) );
    else if ( type === "volume" ) (window as any).RapidaAgordoAdministranto.agordiLaŭtecon( parseInt( val ) );
}

// Aldoni al fenestro por tutmonda aliro
(window as any).toggleQsButton = toggleQsButton;
(window as any).updateSlider = updateSlider;
(window as any).Sistemo = Sistemo;
