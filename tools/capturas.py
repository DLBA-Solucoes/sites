"""Capturas do site em 1440 e 390 de largura (pagina inteira e primeira dobra).

Uso: python tools/capturas.py <url_base> <pasta_saida> "/=home" "/maquinas/=catalogo" ...
Mostra a largura de rolagem (deve ser igual a da tela) e erros do console.
Precisa de: pip install playwright && playwright install chromium
"""
import sys
from pathlib import Path
from playwright.sync_api import sync_playwright

base, out = sys.argv[1], Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
pares = [a.split("=", 1) for a in sys.argv[3:]]
vps = {"desktop": (1440, 900), "mobile": (390, 844)}

with sync_playwright() as p:
    b = p.chromium.launch()
    for vp, (w, h) in vps.items():
        ctx = b.new_context(viewport={"width": w, "height": h}, device_scale_factor=1, reduced_motion="reduce")
        pg = ctx.new_page()
        erros = []
        pg.on("console", lambda m: erros.append(m.text) if m.type == "error" else None)
        for rota, nome in pares:
            pg.goto(base + rota, wait_until="networkidle")
            pg.evaluate("document.querySelectorAll('img[loading=lazy]').forEach(i=>i.loading='eager')")
            pg.evaluate("""async () => { const h = document.body.scrollHeight;
                for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); }
                document.querySelectorAll('.faixa, .galeria').forEach(f => f.scrollLeft = 0);
                window.scrollTo(0, 0); }""")
            pg.wait_for_timeout(1200)
            pg.screenshot(path=str(out / f"{nome}-{vp}.png"), full_page=True)
            pg.screenshot(path=str(out / f"{nome}-{vp}-dobra.png"))
            larg = pg.evaluate("document.documentElement.scrollWidth")
            print(vp, rota, "scrollWidth", larg, "erros", erros[-3:])
        ctx.close()
    b.close()
