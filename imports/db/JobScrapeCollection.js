import { Meteor } from 'meteor/meteor';

const axios = require('axios');
const cheerio = require('cheerio');

let jobScrape = {};

/*
Meteor.methods({
    scrape({terms}) {
        const prefix='https://www.google.com/search?q=';
        const suffix='&ibp=htl;jobs#htivrt=jobs&htidocid=6mhA_U7g6XEAAAAAAAAAAA%3D%3D&fpstate=tldetail';
        const page = prefix + terms + suffix;

        //const page = 'https://scrapeme.live/shop/';

        const config = { 
            headers: { 
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36', 
            }, 
        };

        
        axios(page, config).then((res) => {
            const data = res.data;

            //console.log(data);
            const $ = cheerio.load(data);

            let content = [];

            $('.BjJfJf.PUpOsf', data).each(function () {
                const title = $(this).text();
                //const url = $(this).find('a').attr('href');

                content.push({
                    title,
                    //url,
                });
            });

            console.log(content);
            jobScrape = content;

        });
    }
}); 

Meteor.call('scrape', {terms: 'front+desk'}, 
    (error, result) => {
        if (error) return reject(error);
        resolve(result);
    }
)
*/

export const JobScrapeCollection = jobScrape;

