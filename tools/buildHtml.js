import fs from 'fs';//file system
import cheerio from 'cheerio';//in-memory dom - jquery selectors
import colors from 'colors';

/*eslint-disable no-console */

fs.readFile('src/index.html', 'utf8', (err, markup) => {
  if(err) {
    return console.log(err);
  }

  const $ = cheerio.load(markup);

  $('head').prepend('<link rel="stylesheet" href="styles.css">');

  fs.writeFile('dist/index.html', $.html(), 'utf8', function(err) {
    if(err) {
      return console.log(err);
    }
    console.log('index.html written to /dist'.green);
  });
});
