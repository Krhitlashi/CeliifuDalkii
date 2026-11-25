// ≺⧼ j͑ʃ'ᴜ ſɟɔ ŋᷠɔ }ʃꞇ 📶 ⧽≻ - ɭʃэ ſɭɔ˞ɔƽ ʌ ſɟɹ ſɭɔ˞ᴜƽ ʌ ſɟᴜ ſ͕ɭᴜ ſɭɔƽ

function konstruiBaterianIkonon(): string {
    return `
        <kfeni class="t6ksek-kp6" role="img" aria-label="ɭʃэ ſɭɔ˞ɔƽ">
            <kfeni class="t6ksek-kek">
                <kfeni class="t6ksek-kozunu"></kfeni>
            </kfeni>
        </kfeni>
    `;
}

function konstruiRetanIkonon(): string {
    return `
        <kfeni class="c2ksak-kp6" role="img" aria-label="Wi-Fi">
            <kfeni class="c2ksak-tanete"></kfeni>
            <kfeni class="c2ksak-kekaf2 c2ksak-kekaf2-1"></kfeni>
            <kfeni class="c2ksak-kekaf2 c2ksak-kekaf2-2"></kfeni>
            <kfeni class="c2ksak-kekaf2 c2ksak-kekaf2-3"></kfeni>
        </kfeni>
    `;
}

const xecacexa = {
    baterioRedono: null as EventListener | null,

// ⟪ j͑ʃᴜ ı],ɔ ⟫
    saxe(): void {
        const k3aq = document.getElementById( "c2ksak-t6ksek-kfeni" );
        if ( !k3aq ) return;

        k3aq.innerHTML = konstruiRetanIkonon() + konstruiBaterianIkonon();
        this.saxeBaterion();
        this.saxeReton();
    },

// ⟪ ɭʃэ ſɭɔ˞ɔƽ ⟫
    async saxeBaterion(): Promise<void> {
        const kp6 = document.querySelector( ".t6ksek-kp6" ) as HTMLElement | null;
        if ( !kp6 ) return;

        const nivela = document.querySelector( ".t6ksek-kozunu" ) as HTMLElement | null;
        const vahate = ( nivelo: number, vefalxas: boolean ): void => {
            const procento = Math.max( 0, Math.min( 0o144, Math.round( nivelo * 0o144 ) ) );
            kp6.dataset.level = procento.toString();
            kp6.classList.toggle( "s2sak-vefal", vefalxas );
            kp6.classList.toggle( "s2sak-baz", procento <= 0o24 && !vefalxas );
            if ( nivela ) nivela.style.blockSize = `${procento}%`;
        };

        const nav = navigator as any;
        if ( nav.getBattery ) {
            try {
                const baterio = await nav.getBattery();
                const xk12na2 = (): void => vahate( baterio.level, baterio.charging );
                baterio.addEventListener( "levelchange", xk12na2 );
                baterio.addEventListener( "chargingchange", xk12na2 );
                xk12na2();
                return;
            } catch ( e ) { /* falas al la defaulto */ }
        }
        vahate( ( 0o7 / 0o10 ), false );
    },

// ⟪ ſɟɹ ſɭɔ˞ᴜƽ ⟫
    saxeReton(): void {
        const kp6 = document.querySelector( ".c2ksak-kp6" as string ) as HTMLElement | null;
        if ( !kp6 ) return;

        const xk12na2 = (): void => {
            const interreta = navigator.onLine;
            kp6.classList.toggle( "nec2", !interreta );
            kp6.setAttribute( "aria-label", interreta ? "ſɟɹ ſɭɔ˞ᴜƽ ʌ j͑ʃɹ ɽ͑ʃ'ɜ" : "ſɟɹ ſɭɔ˞ᴜƽ ʌ ꞁȷ̀ᴜ" );
        };

        window.addEventListener( "online", xk12na2 );
        window.addEventListener( "offline", xk12na2 );
        xk12na2();
    }
};

( window as any ).xecacexa = xecacexa;
