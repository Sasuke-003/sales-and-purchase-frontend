import React, { useState, useEffect } from "react";

import "./Stock.styles.css";

function Stock({ Name, Unit, Qty, setItem }) {
    return (
        <div className='stock__item' onClick={() => setItem(Name)}>
            <h2>{Name}</h2>
            <h2>
                {Qty} {Unit}
            </h2>
        </div>
    );
}

export default Stock;
