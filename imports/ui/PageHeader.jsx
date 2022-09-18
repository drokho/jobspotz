import { Meteor } from 'meteor/meteor';
import React from 'react';
import { MainNav } from './MainNav';
import { MobileNav } from './MobileNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export const PageHeader = () => {

    return (

        <div className="page-header dark-bg container-fluid">
            <div className="grid">
                <div className="header-logo-container align-center">
                    <div>
                        <a href="/"><img src="/images/jobspotz-logo-2.png" /></a>
                    </div>
                </div>
                <div className="align-right">
                    <MainNav />
                    <div className="search">
                        <input type="text"></input>
                        <button className="input-action"><FontAwesomeIcon icon={faMagnifyingGlass} />Search</button>
                        <button className="input-action"><FontAwesomeIcon icon={faFilter} />Filter</button>
                    </div>
                </div>
            </div>
        </div>
    );
}