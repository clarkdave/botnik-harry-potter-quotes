const { Chromeless } = require('chromeless')
const cheerio = require('cheerio')
const fs = require('fs')

async function run() {
  const chromeless = new Chromeless()

  const html = await chromeless
    .goto('http://wodehouse.botnik.org/2f402c0e')
    // quotes are loaded in after page load, so wait a bit so we have a better
    // chance of getting them all
    .wait(5000)
    .html()

  const $ = cheerio.load(html)

  const quotes = $('#copy > div')
    .toArray()
    .map(node => {
      const $node = $(node)
      const votes = parseInt($node.find('.votes').text())
      const text = $node
        .find('p')
        .text()
        .trim()

      return { votes, text }
    })
    .filter(quote => quote.text.length >= 4 && quote.votes > 1)
    .sort((a, b) => b.votes - a.votes)

  console.log(JSON.stringify(quotes, null, '  '))

  await chromeless.end()
}

run().catch(console.error.bind(console))
