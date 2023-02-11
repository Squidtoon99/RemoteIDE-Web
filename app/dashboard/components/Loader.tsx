"use client";
import React from 'react';

const Loader = ({isLoading}: {isLoading: boolean;}) => {
    console.log(isLoading);
    return (
        <div className={`flex -z-1 items-center justify-center h-screen overflow-y-hidden w-screen ${isLoading ? '' : ''}`}>
            
            <div className={`p-48 -z-10 bg-primary duration-1000 transform-all ease-in-out rounded-full ${isLoading ? 'scale-[1000]' : 'animate-pulse scale-50'}`}>
            </div>
        </div>
    );
};

export default Loader;