import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random'
import { check } from 'meteor/check';
import { Accounts } from 'meteor/accounts-base';
import { JobsCollection } from '/imports/db/JobsCollection';
import { ServiceConfiguration } from 'meteor/service-configuration';
import { fetch, Headers, Request, Response } from 'meteor/fetch';
import {Client} from "@googlemaps/google-maps-services-js";
import '/imports/api/jobsMethods';
import '/imports/api/jobsPublications';
import './getLatLong.js';

import Geocode from "react-geocode";

const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const client = new Client({});

Geocode.setApiKey('AIzaSyDGCkairfLS2qifFlIIKdxl7u_jvIQTpvI');

/*
const insertJob = (jobText, user) => 
    JobsCollection.insert({ 
        text: jobText,
        userId: user._id,
        createdAt: new Date(), 
    });

const SEED_USERNAME = 'bgamble';
const SEED_PASSWORD = 'password'; */

async function getLatLong(address) {

    return client.findPlaceFromText({
        params: {
            input: address,
            inputtype: 'textquery',
            key: 'AIzaSyDGCkairfLS2qifFlIIKdxl7u_jvIQTpvI',
            fields: ['place_id', 'geometry']
        }
    })  
}

async function getJobContent(element, content, result) {
    const data = result.data;
    const $ = cheerio.load(data);
    const length = $(element).length;
    console.log(4)
    $(element, data).each(async function (i) {
        console.log(5)
        const _id = Random.id(17);
        const text = $(this).find('.data-results-title').text();
        const company = $(this).find('.data-details span:first-child').text();
        const city = $(this).find('.data-details span:nth-child(2)').text().split(', ')[0];
        const state = $(this).find('.data-details span:nth-child(2)').text().split(', ')[1];;
        const pay = false;
        const payType  = $(this).find('.data-details span:nth-child(3)').text();
        const postedDate = $(this).find('.data-results-publish-time').text();
        let latlong = {};
 
            const job = {
                _id,
                text,
                company,
                city,
                state,
                pay,
                payType,
                postedDate,
                latlong
            }

            content.push(job);

            if( i == length-1 ) {
                return content;
            }

        //} 
    })
}




Meteor.methods({

    'scrape': async function({keywords, loc}) {

        console.log(1)

        let content = [];

        async function scrape (keywords, loc) {
            console.log(2)
            
            const page = `https://www.careerbuilder.com/jobs?keywords=${encodeURI(keywords)}&location=${loc}`;
            
            const config = { 
                headers: { 
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36', 
                }, 
            };


            let promise = new Promise((resolve, reject) => {
                resolve(axios(page, config))
            });

            let result = await promise;
            console.log(3)
            
            let moreStuffPromise = new Promise((resolve, reject) => {
                resolve(getJobContent('.data-results-content-parent', content, result));
            })

            let moreStuffResult = await moreStuffPromise;

            console.log(7)
            //console.log('content')
            //console.log(content)
            
        }

        try {
            let stuffPromise = new Promise((resolve, reject) => {
                resolve(scrape(keywords, loc));
            })

            let stuffResult = await stuffPromise;
            console.log(8)

            for(element of content) {
                let address = element.company + ' ' + element.city + ', ' + element.state;

                let locationPromise = new Promise((resolve, reject) => {
                    resolve(getLatLong(address));
                })
            
                let locationResult = await locationPromise;
                if(locationResult.data.candidates[0]) {
                    latlong = locationResult.data.candidates[0].geometry.location;
                    element.latlong = latlong;
                }
            }

            return content;
        } catch {
            return "No jobs match your search";
        }
        
    }
})


Meteor.startup(() => {  


    
    /*
    if (!Accounts.findUserByUsername(SEED_USERNAME)){
        Accounts.createUser({
            username: SEED_USERNAME,
            password: SEED_PASSWORD,
        });
    }

    const user = Accounts.findUserByUsername(SEED_USERNAME);

    if (JobsCollection.find().count() === 0) {
        [
            'First Job',
            'Second Job',
            'Third Job',
            'Fourth Job',
            'Fifth Job',
            'Sixth Job',
            'Seventh Job',
        ].forEach(jobText => insertJob(jobText, user));
    } */

    ServiceConfiguration.configurations.upsert(
        {service: 'github'},
        {
            $set: {
                loginStyle: 'popup',
                clientId: '4a7a6988ad5e241275b9',
                secret: '539cecee75ee83b6aebfe4aa866d36e327ad73f3',
            },
        }
    )


}); 


