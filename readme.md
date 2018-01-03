a simple script to scrape (using Chromeless) the current harry potter quotes from http://wodehouse.botnik.org/2f402c0e

it filters out empty quotes and those without at least 2 votes, but there's may still be plenty of low quality, offensive or irrelevant quotes towards the bottom.

```
yarn
node app.js > quotes.json
```
