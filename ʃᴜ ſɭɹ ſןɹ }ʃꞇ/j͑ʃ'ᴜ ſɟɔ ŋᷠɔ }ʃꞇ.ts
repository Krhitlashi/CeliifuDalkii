// ≺⧼ Statusa Administranto ⧽≻ - Bateria kaj Retaj Indikiloj por la Taskobreto
// Montras verticalan baterian ikonon kun animacioj ( ŝargado, malalta baterio )
// kaj retan ( Wi‑Fi ) ikonon bazitajn sur la Nazavigatoraj Battery kaj Network APIs.

// Konstrui la vertikalan baterian ikonon ( pilolo, sen terminala>nubo )
function konstruiBaterianIkonon(): string {
    return `
        <span class="battery-icon" role="img" aria-label="Battery">
            <span class="battery-body">
                <span class="battery-level"></span>
            </span>
        </span>
    `;
}

// Konstrui la retan ( Wi‑Fi ) ikonon
function konstruiRetanIkonon(): string {
    return `
        <span class="wifi-icon" role="img" aria-label="Wi-Fi">
            <span class="wifi-dot"></span>
            <span class="wifi-arc wifi-arc-1"></span>
            <span class="wifi-arc wifi-arc-2"></span>
            <span class="wifi-arc wifi-arc-3"></span>
        </span>
    `;
}

const StatusaAdministranto = {
    baterioRedono: null as EventListener | null,

    // ⟪ Inicii ⟫
    inicii(): void {
        const ujo = document.getElementById( "status-icons" );
        if ( !ujo ) return;

        ujo.innerHTML = konstruiRetanIkonon() + konstruiBaterianIkonon();
        this.iniciiBaterion();
        this.iniciiReton();
    },

    // ⟪ Baterio ⟫
    async iniciiBaterion(): Promise<void> {
        const ikono = document.querySelector( ".battery-icon" ) as HTMLElement | null;
        if ( !ikono ) return;

        const nivela = document.querySelector( ".battery-level" ) as HTMLElement | null;
        const agordi = ( nivelo: number, sxargxas: boolean ): void => {
            const procento = Math.max( 0, Math.min( 100, Math.round( nivelo * 100 ) ) );
            ikono.dataset.level = procento.toString();
            ikono.classList.toggle( "charging", sxargxas );
            ikono.classList.toggle( "low", procento <= 20 && !sxargxas );
            if ( nivela ) nivela.style.blockSize = `${procento}%`;
        };

        const nav = navigator as any;
        if ( nav.getBattery ) {
            try {
                const baterio = await nav.getBattery();
                const ĝisdatigi = (): void => agordi( baterio.level, baterio.charging );
                baterio.addEventListener( "levelchange", ĝisdatigi );
                baterio.addEventListener( "chargingchange", ĝisdatigi );
                ĝisdatigi();
                return;
            } catch ( e ) { /* falas al la defaulto */ }
        }
        // La Battery API ne disponeblas ( multaj foliumiloj ) — montrui proceduran valoron
        agordi( 0.875, false );
    },

    // ⟪ Reto ( Wi‑Fi ) ⟫
    iniciiReton(): void {
        const ikono = document.querySelector( ".wifi-icon" as string ) as HTMLElement | null;
        if ( !ikono ) return;

        const ĝisdatigi = (): void => {
            const interreta = navigator.onLine;
            ikono.classList.toggle( "offline", !interreta );
            ikono.setAttribute( "aria-label", interreta ? "Wi-Fi connected" : "Wi-Fi disconnected" );
        };

        window.addEventListener( "online", ĝisdatigi );
        window.addEventListener( "offline", ĝisdatigi );
        ĝisdatigi();
    }
};

( window as any ).StatusaAdministranto = StatusaAdministranto;
