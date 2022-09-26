import React, { useEffect, useRef, useState } from "react";
import { Wrapper, Status } from "@googlemaps/react-wrapper";
import Geocode from "react-geocode";


const Spinner = () => {
    return (
        <div>Spinner Component</div>
    )
}

const ErrorComponent = () => {
    return (
        <div>Error Component</div>
    )
}

const render = (status) => {
    switch (status) {
        case Status.LOADING:
        return <Spinner />;
        case Status.FAILURE:
        return <ErrorComponent />;
        case Status.SUCCESS:
        return <MyMap />;
    }
};
  

const MyMap = ({children, ...options}) => {

    const ref = useRef();
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
          setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    if (map) {
        map.setOptions(options)
    }


    return (
        <>
            <div ref={ref} id="map" />
            { React.Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                // set the map prop on the child component
                return React.cloneElement(child, { map });
                }
            })}
        </>
      );
}

const Marker = (options) => {
    const [marker, setMarker] = useState();
  
    useEffect(() => {
        if (!marker) {
            setMarker(new google.maps.Marker());
        }
  
        // remove marker from map on unmount
        return () => {
            if (marker) {
                marker.setMap(null);
            }
        };
    }, [marker]);

    useEffect(() => {
        if (marker) {
            marker.setOptions(options);
        }
    }, [marker, options]);

    return null;
};
  
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

    Geocode.setApiKey('AIzaSyDGCkairfLS2qifFlIIKdxl7u_jvIQTpvI');

    useEffect(() => {
        getPos();
    }, []); 


    if(jobs.jobs[0] ) {
        console.log(jobs.jobs[0].latlong)
    }

    
    
    const center = {lat: pos.lat, lng: pos.lng};
    const position = {lat: pos.lat, lng: pos.lng};
    const zoom = 15;
   
    return (
            <Wrapper apiKey="AIzaSyDGCkairfLS2qifFlIIKdxl7u_jvIQTpvI" render={render}>
                <MyMap center={center} zoom={zoom} > 
                    <Marker key="1" position={ position } />
                    { jobs.jobs[0] && jobs.jobs.map(job => 
                        <Marker 
                            key={ job._id}
                            position={ job.latlong } 
                        />
                    ) }
                    
                </MyMap>
            </Wrapper>
    );
};