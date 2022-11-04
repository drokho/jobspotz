import { Meteor } from 'meteor/meteor';
import {Client} from "@googlemaps/google-maps-services-js";

const client = new Client({});


Meteor.methods({
    'getLatLong': async function({address}) {

        let content = {}
        
        try {
            await client.findPlaceFromText({
                params: {
                    input: address,
                    inputtype: 'textquery',
                    key: 'AIzaSyDGCkairfLS2qifFlIIKdxl7u_jvIQTpvI',
                    fields: ['place_id', 'geometry']
                }
            }).then(async (response) => {
                //console.log(response.data.candidates[0].geometry.location)
                    if(response.data.candidates[0]) {
                        const location = response.data.candidates[0].geometry.location;
                        content = {lat: location.lat, lng: location.lng};
                    }
    
            }, (error) => {
                console.error(error);
            })

            return content;

        } catch (error) {
            console.log(error)
        }
    }
});
