// ≺⧼ ſɟᴜ j͑ʃƨꞇ ֭ſɭɹ 🕒 ⧽≻ - ſɟᴜ j͑ʃƨꞇ ֭ſɭɹ ʌ ſɟᴜ ſ͕ɭᴜ ſɭɔƽ ʌ }ʃɹ ɭʃᴜ }ʃw

// ⟪ ſɟᴜ j͑ʃƨꞇ ֭ſɭɹ ʌ ſ͕ɭᴜ ɽ͑ʃ'ɜ ı],ɔ ŋᷠᴜ ⟫

export const aracastifeh2 = {
    timeEl: null as HTMLElement | null,
    dateEl: null as HTMLElement | null,
    taskobraCastih2o: null as HTMLElement | null,

    saxe() {
        this.timeEl = document.getElementById( "puf2-castih2" );
        this.dateEl = document.getElementById( "karani-castih2" );
        this.taskobraCastih2o = document.getElementById( "castih2" );
        this.aktualigi();
        setInterval( () => this.aktualigi(), 0o2000 );
    },

    aktualigi() {
        this.timeEl = this.timeEl || document.getElementById( "puf2-castih2" );
        this.dateEl = this.dateEl || document.getElementById( "karani-castih2" );
        this.taskobraCastih2o = this.taskobraCastih2o || document.getElementById( "castih2" );
        const now = new Date();
        if ( typeof window.vab6caja === "function" && typeof window.castifeh2 === "function" ) {
            const time = window.castifeh2( now );
            const qavek2p2niaS2bana = `${window.vab6caja( time.she )}.${window.vab6caja( time.qe )}.${window.vab6caja( time.he )}`;
            const elflugaS2bana = `${window.vab6caja( time.she )} . ${window.vab6caja( time.qe )} . ${window.vab6caja( time.he )}`;

            if ( this.taskobraCastih2o ) this.taskobraCastih2o.innerText = qavek2p2niaS2bana;

            if ( this.timeEl ) this.timeEl.innerText = elflugaS2bana;
        }
        if ( this.dateEl && typeof window.kf2Cax2lStafl2 === "function" ) {
            this.dateEl.innerText = window.kf2Cax2lStafl2( now );
        }
    }
};

( window as any ).aracastifeh2 = aracastifeh2;
