const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('leapaustralia.csv');

// Write headers

writeStream.write(`Product title,price,link \n`)

/***
 * My case
    Every product lives in article class of product type-product == product.type-product
    Product information lives in div.mpcth-product-wrap > section.mpcth-post-content
    Inside mpcth-post-content lives product title and pricing
 **/

request('https://www.leapaust.com.au/3dconnexion/', (err, res, html) => {
    if (!err && res.statusCode == 200) {
        const $ = cheerio.load(html);

        $('.product.type-product').each((i, element) => {
            const title = $(element)
                .find('.mpcth-post-title')
                .text();
            const price = $(element)
                .find('.mpcth-cart-wrap .price .woocommerce-Price-amount.amount')
                .text();

            const link = $(element)
                .find('.mpcth-post-title > a')
                .attr('href');

            // Write row to CSV

            writeStream.write(`${title}, ${price}, ${link} \n`);
        });

        console.log('Scrap Done...');
    }
});

