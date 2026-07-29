// ≺⧼ Horloĝa Administranto ⧽≻

// ⟪ Horloĝa Administranto ⟫

export const HorlogxoAdministranto = {
    timeEl: null as HTMLElement | null,
    dateEl: null as HTMLElement | null,

    inicii() {
        this.timeEl = document.getElementById( "full-clock-time" );
        this.dateEl = document.getElementById( "full-clock-date" );
        this.aktualigi();
        setInterval( () => this.aktualigi(), 0o2000 );
    },

    aktualigi() {
        this.timeEl = this.timeEl || document.getElementById( "full-clock-time" );
        this.dateEl = this.dateEl || document.getElementById( "full-clock-date" );
        const now = new Date();
        if ( this.timeEl && typeof window.vab6caja === "function" && typeof window.castifeh2 === "function" ) {
            const time = window.castifeh2( now );
            this.timeEl.innerText = `${window.vab6caja( time.she )} . ${window.vab6caja( time.qe )} . ${window.vab6caja( time.he )}`;
        }
        if ( this.dateEl && typeof window.kf2Cax2lStafl2 === "function" ) {
            this.dateEl.innerText = window.kf2Cax2lStafl2( now );
        }
    }
};

// Aldoni al fenestro por tutmonda aliro
( window as any ).HorlogxoAdministranto = HorlogxoAdministranto;
