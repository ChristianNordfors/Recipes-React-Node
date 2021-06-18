import React from 'react';
import { CgSearchLoading } from 'react-icons/cg';

import './loading.css';


export default function Loading() {


    return (
        <div className="loadingIcon">
            <CgSearchLoading></CgSearchLoading>
            <p>Preparing ingredients...</p>
        </div>
    );
}