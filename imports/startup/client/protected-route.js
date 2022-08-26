// not actually using this file but keeping it cuz ill prob have to go back to it at some point. 

import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from '/imports/ui/Loading.jsx';

export const ProtectedRoute = () => {
    // determine if authorized, from context or however you're doing it
    const user = useTracker(() => Meteor.user());
    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page

    return (
        <>
            { user ? ( <Outlet /> ) : ( <Loading /> ) }
        </>
    )
    
    
}




