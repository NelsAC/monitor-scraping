const { chromium } = require('playwright')

const descriptions = [
  {
    name: 'Huawei AudIfonos Freebuds 4 Plateado con Case Gris',
    url: 'https://shopstar.pe/huawei-audifonos-freebuds-4-plateado-con-case-gris-796846/p',
    tienda: 'SANY',
    checkStock: async ({ page }) => {
      const content = await page.textContent('[class="skuBestPrice"]')
      const soloPrice = parseInt(content.split(' ')[1])
      const info = soloPrice < 350
      return { info, content }
    }
  },
  {
    name: 'Huawei Freebuds 4 Silver - Hero',
    url: 'https://shopstar.pe/huawei-freebuds-4-silver---hero-583722/p',
    tienda: 'OECHSLE',
    checkStock: async ({ page }) => {
      const content = await page.textContent('[class="skuBestPrice"]')
      const soloPrice = parseInt(content.split(' ')[1])
      const info = soloPrice < 350
      return { info, content }
    }
  }
]

;(async () => {
  const browser = await chromium.launch()

  for (const description of descriptions) {
    const { checkStock, name, url, tienda } = description
    const page = await browser.newPage()
    await page.goto(url)
    const { info, content } = await checkStock({ page })
    console.log(`${name}: ${info ? 'Menos de 350' : 'Más de 350'}, precio: ${content}, tienda: ${tienda}`)
    await page.screenshot({ path: `screenshots/${name}.png` })
    await page.close()
  }

  await browser.close()
})()
