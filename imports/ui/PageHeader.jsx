import { Meteor } from 'meteor/meteor';
import React, { useState, useRef } from 'react';
import { MainNav } from './MainNav';
import { MobileNav } from './MobileNav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faFilter } from '@fortawesome/free-solid-svg-icons';

export const PageHeader = (props) => {

    let handleKeyPress = event => {
        if (event.key == 'Enter') {
            console.log(props.search)
            props.onSearchClick();
        }
      };

    return (

        <div className="page-header dark-bg container-fluid">
            <div className="grid">
                <div className="header-logo-container">
                    <div>
                        <a href="/"><img src="/images/jobspotz-logo-2.png" /></a>
                    </div>
                </div>
                <div className="align-right">
                    <div className="search">
                        <input 
                        type="text" 
                        name="search"
                        value={ props.search }
                        placeholder="Enter Search Terms"
                        onKeyPress={ handleKeyPress }
                        onChange={(e) => props.onSearchChange(e.target.value) }
                        ></input>
                        <button className="input-action" onClick={ props.onSearchClick }><FontAwesomeIcon icon={faMagnifyingGlass} />Search</button>
                        <button className="input-action"><FontAwesomeIcon icon={faFilter} />Filter</button>
                        <MainNav />
                    </div>
                </div>
            </div>
        </div>
    );
}