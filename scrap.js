const request = require('request');
const cheerio = require('cheerio');

request('https://www.leapaust.com.au/3dconnexion/', (err, res, html) => {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html);
        const productName = $('h6.mpcth-post-title');
        const productPrice = $('span.woocommerce-Price-amount.amount');


        console.log(productName.children('a').text());
        console.log(productPrice.text());
    }
});