import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Geocode from "react-geocode";


export const Map = (jobs) => {

    const defaultPos = {
        lat: 29.97531052190691, 
        lng: 31.137572764361458
    };

    const [pos, setPos] = useState(defaultPos);

    const getPos = () => { 
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
            //navigator.geolocation.watchPosition(
                (position) => {
                    setPos ({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    console.log('position set!')
                },
                () => {
                    console.log('Error - Geolocation Service Failed');
                }
            );
        } else {
            // Browser doesn't support Geolocation
            console.log('Error - Browser doesn\'t support geolocation');
        }
    }

    const payType = (x) => {
        if(x == 'hourly') {
            return '/hr';
        } else if (x == 'salary') {
            return '/yr Salary';
        } else {
            return ' ' + x
        }
    }
    const pay = (x) => {
        if(x) {
            return '$' + x
        } else {
            return '';
        }
    }


    if(jobs.jobs[0] ) {
        //console.log(jobs.jobs[0])
    }

    
    const center = {lat: pos.lat, lng: pos.lng};
    const position = {lat: pos.lat, lng: pos.lng};
    const zoom = 11;


    const onMarkerLoad = marker => {
        //console.log('marker: ', marker)
      }

    const [markerClicked, setMarkerClicked] = useState();
    const [thisMap, setThisMap] = useState();
    const [newCenter, setNewCenter] = useState();

    const markerClick = (x) => {
        setMarkerClicked(x);
        console.log(markerClicked);
    }

    const infoWindowCloseClick = () => {
        setMarkerClicked();
        console.log(markerClicked)
    }

    useEffect(() => {

        getPos();
 
    }, []);
   
    return (
        <LoadScript googleMapsApiKey="AIzaSyDGCkairfLS2qifFlIIKdxl7u_jvIQTpvI" >
            <GoogleMap
                onLoad={ map => { map && setThisMap(map); }}
                center={ newCenter || center }
                zoom={ zoom } 
                id="map"
                options={{panControl: false, noClear: true}}
                onCenterChanged={() => { thisMap && setNewCenter(thisMap.getCenter()) }}
            >

                <Marker
                    onLoad={onMarkerLoad}
                    position={position}
                />

                { jobs.jobs[0] && jobs.jobs.map((job, index) => 
                    <Marker 
                        key={ job._id}
                        position={ job.latlong } 
                        onClick={ () => { markerClick(job._id) } }
                        label={ String(index + 1) }
                    >
                        { (markerClicked == job._id) &&
                        <InfoWindow 
                            key={ job._id}
                            position={ job.latlong } 
                            onCloseClick={ infoWindowCloseClick }
                            options={{disableAutoPan: true }}
                        >
                            <div className="info-window">
                                <h3 className="card-title">{job.text}</h3>
                                <p className="job-company">{ job.company }</p>
                                <p className="job-pay">{ pay(job.pay) + payType(job.payType) }</p>
                                <p className="job-date">{ job.postedDate }</p>
                                <p><a href={'job/' + job._id } className="">More Details</a></p>
                            </div>
                        </InfoWindow> }
                    </Marker>
                ) }
          
        </GoogleMap>
      </LoadScript>
    );
};