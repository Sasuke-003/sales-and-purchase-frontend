import React, { useState, useEffect } from "react";

import "./Stock.styles.css";

function Stock({ Name, Unit, Qty, setItem }) {
    return (
        <div className='stock__item' onClick={() => setItem(Name)}>
            <div>
                {" "}
                <h2>{Name} </h2>
            </div>
            <div>
                <h2>{Qty}</h2>
            </div>
            <div>
                <h2>{Unit}</h2>
            </div>
        </div>
    );
}

export default Stock;
