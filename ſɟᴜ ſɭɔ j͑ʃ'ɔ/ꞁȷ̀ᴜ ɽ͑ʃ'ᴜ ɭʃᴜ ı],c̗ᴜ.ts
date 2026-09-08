// ≺⧼ Sciiga Administranto ⧽≻ - Centralizita sciiga administrado

declare const CONSTANTS: any;
declare const DOMCache: any;
declare const akiriTextojn: any;
declare const KonservejaUtilo: any;

class SciigoAdministranto {
    static #dismissed: Set<any> = new Set();
    static #notifications: any[] = [...CONSTANTS.NOTIFICATION_DEFAULTS];

    // ⟨ Ŝargi Forŝutitajn el Stokejo ⟩
    static sxargiElStokejo(): void {
        const stored: number[] = KonservejaUtilo.akiri(CONSTANTS.STORAGE_KEYS.dismissedNotifs, []);
        stored.forEach((id: number) => this.#dismissed.add(id));
    }

    // ⟨ Konservi al Stokejo ⟩
    static konserviAlStokejo(): void {
        KonservejaUtilo.agordi(CONSTANTS.STORAGE_KEYS.dismissedNotifs, Array.from(this.#dismissed));
    }

    // ⟨ Forŝuti Sciigon ⟩
    static forsxuti(index: number): void {
        this.#dismissed.add(index);
        this.konserviAlStokejo();
        this.renderi();
    }

    // ⟨ Malplenigi Ĉiujn Sciigojn ⟩
    static malplenigi(): void {
        this.#notifications.forEach((_, i) => this.#dismissed.add(i));
        this.konserviAlStokejo();
        this.renderi();
    }

    // ⟨ Akiri Aktivajn Sciigojn ⟩
    static akiriAktivajn(): any[] {
        return this.#notifications.filter((_, i) => !this.#dismissed.has(i));
    }

    // ⟨ Akiri Nombron ⟩
    static akiriNombron(): number {
        return this.akiriAktivajn().length;
    }

    // ⟨ Bildigi Sciigojn ⟩
    static renderi(): void {
        const list = DOMCache.akiri("notif-list");
        if (!list) return;

        const tekstoj = akiriTextojn();
        const active = this.akiriAktivajn();
        const countSpan: any = document.querySelector(".notification-count");

        if (active.length === 0) {
            const noNotifText = tekstoj.notif_none;
            list.innerHTML = `<div>${noNotifText}</div>`;
            const system = (window as any).Sistemo;
            // vab6caja prenas la nombron rekte ( parseInt de oktala ĉeno denziglus ciferojn ≥ 8 )
            if (countSpan && system) countSpan.innerText = typeof ( window as any ).vab6caja === "function" ? ( window as any ).vab6caja( 0 ) : "0";
            return;
        }

        list.innerHTML = active.map((n: any) => {
            const origIdx = this.#notifications.indexOf(n);
            const title = tekstoj[n.title];
            const desc = tekstoj[n.desc];
            return `<ciihii class="notif-card">
                <div class="notif-content">
                    <div class="notif-title">${title}</div>
                    <div class="notif-desc">${desc}</div>
                </div>
                <div class="notif-icon">${n.icon}</div>
                <button onclick="SciigoAdministranto.forsxuti(${origIdx})">/</button>
            </ciihii>`;
        }).join("");

        const system = (window as any).Sistemo;
        // vab6caja prenas la nombron rekte ( parseInt de oktala ĉeno denziglus ciferojn ≥ 8 )
        if (countSpan && system) countSpan.innerText = typeof ( window as any ).vab6caja === "function" ? ( window as any ).vab6caja( this.akiriNombron() ) : this.akiriNombron().toString();
    }

    // ⟨ Inicii ⟩
    static inicii(): void {
        this.sxargiElStokejo();
        this.renderi();
    }
}

// Aldoni al fenestro por tutmonda aliro
(window as any).SciigoAdministranto = SciigoAdministranto;
