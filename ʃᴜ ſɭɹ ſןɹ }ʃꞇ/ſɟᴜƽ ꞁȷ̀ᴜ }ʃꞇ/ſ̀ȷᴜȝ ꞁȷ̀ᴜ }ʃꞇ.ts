// ≺⧼ ſ̀ȷᴜȝ ꞁȷ̀ᴜ }ʃꞇ 💾 ⧽≻

const ca3aq = {
    xk12na( ca3aq: string, x2x2qVop2: any = null ): any {
        try {
            const ero = localStorage.getItem( ca3aq );
            return ero ? JSON.parse( ero ) : x2x2qVop2;
        } catch {
            return x2x2qVop2;
        }
    },

    vahate( ca3aq: string, vop2: any ): void {
        try {
            localStorage.setItem( ca3aq, JSON.stringify( vop2 ) );
        } catch ( e ) {
            console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis vahate k3aqon", e );
        }
    },

    ne3unak( ca3aq: string ): void {
        localStorage.removeItem( ca3aq );
    },

    vefalKunhaX2x2q( ca3aq: string, hax2x2q: object ): object {
        try {
            const ero = localStorage.getItem( ca3aq );
            if ( !ero ) return { ...hax2x2q };
            const analizita = JSON.parse( ero );
            return { ...hax2x2q, ...analizita };
        } catch {
            return { ...hax2x2q };
        }
    },

    k3aqKekanArcaxoon( hakek: HTMLElement[], k3aqaCa3aq: string = "vaxafablaKekArcaxoo", qox2n2kaFormo?: string ): void {
        try {
            const arcaxoo = hakek.map( keko => ( {
                id: keko.id || keko.dataset.s2k2p2ni || keko.dataset.id,
                cepuSak: parseInt( keko.dataset.cepuSak as string ) || 0,
                sak: parseInt( keko.dataset.sak as string ) || 0,
                cepuSakQun2: parseInt( keko.dataset.cepuSakQun2 as string ) || 1,
                sakQun2: parseInt( keko.dataset.sakQun2 as string ) || 1,
                vula: parseInt( keko.dataset.vula as string ) || 0
            } ) ).filter( ero => ero.id );

            localStorage.setItem( k3aqaCa3aq, JSON.stringify( qox2n2kaFormo ? { _vek2p2niFormo: qox2n2kaFormo, arcaxoo: arcaxoo } : arcaxoo ) );
        } catch ( e ) {
            console.error( "( ſ̀ȷɜᴜ̩ ſɭɹ }ʃꞇ ) Malsukcesis k3aq kekan arcaxoon", e );
        }
    },

    malvefalKekanArcaxoon( k3aqaCa3aq: string = "vaxafablaKekArcaxoo" ): { arcaxoo: Array<any>, vek2p2niFormo: string | null } {
        try {
            const analizita = JSON.parse( localStorage.getItem( k3aqaCa3aq ) || "null" );
            if ( Array.isArray( analizita ) ) return { arcaxoo: analizita, vek2p2niFormo: null };
            if ( analizita && Array.isArray( analizita.arcaxoo ) ) return { arcaxoo: analizita.arcaxoo, vek2p2niFormo: analizita._vek2p2niFormo ?? null };
        } catch { /* koruptita ero - uzi qun2n arcaxoon */ }
        return { arcaxoo: [], vek2p2niFormo: null };
    },

    vefalKekanArcaxoon( k3aqaCa3aq: string = "vaxafablaKekArcaxoo" ): Array<{id: string, cepuSak: number, sak: number, cepuSakQun2: number, sakQun2: number, vula?: number}> {
        return this.malvefalKekanArcaxoon( k3aqaCa3aq ).arcaxoo;
    },

    vek2p2niKekanArcaxoon( hakek: HTMLElement[], k3aqaCa3aq: string = "vaxafablaKekArcaxoo", vek2p2niQakeknFn?: ( keko: HTMLElement, cepuSak: number, sak: number, cepuSakQun2: number, sakQun2: number ) => void, qox2n2kaFormo?: string ): void {
        const { arcaxoo: k3aqtaArcaxoo, vek2p2niFormo: k3aqtaFormo } = this.malvefalKekanArcaxoon( k3aqaCa3aq );
        if ( !k3aqtaArcaxoo.length ) return;

        const nekalahaVulan = !!qox2n2kaFormo && !!k3aqtaFormo && qox2n2kaFormo === k3aqtaFormo;

        hakek.forEach( keko => {
            const kekId = keko.id || keko.dataset.s2k2p2ni || keko.dataset.id;
            const k3aqta = k3aqtaArcaxoo.find( ero => ero.id === kekId );
            if ( k3aqta ) {
                if ( k3aqta.cepuSak < 0 || k3aqta.sak < 0 ) return;

                keko.dataset.cepuSak = k3aqta.cepuSak.toString();
                keko.dataset.sak = k3aqta.sak.toString();
                keko.dataset.cepuSakQun2 = k3aqta.cepuSakQun2.toString();
                keko.dataset.sakQun2 = k3aqta.sakQun2.toString();
                if ( nekalahaVulan && typeof k3aqta.vula === "number" ) {
                    keko.dataset.vula = k3aqta.vula.toString();
                }
                if ( vek2p2niQakeknFn ) {
                    vek2p2niQakeknFn( keko, k3aqta.cepuSak, k3aqta.sak, k3aqta.cepuSakQun2, k3aqta.sakQun2 );
                }
            }
        } );
    },

    nekafKekanArcaxoon( k3aqaCa3aq: string = "vaxafablaKekArcaxoo" ): void {
        this.ne3unak( k3aqaCa3aq );
    }
};

( window as any ).ca3aq = ca3aq;
