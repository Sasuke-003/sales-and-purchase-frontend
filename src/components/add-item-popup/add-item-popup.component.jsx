import React from 'react';
import './add-item-popup.styles.css'

const AddItemPopup = ({ data, cart }) => {
    return (
        <div>
            {
                cart.map((c, index) => (
                    <div key={index} className={`${data.indexOf(c.Name) !== -1 ? "row" : ""}`} >
                        <p>{c.Name}              {c.Qty}{c.Unit}</p>
                    </div>
                ))
            }
            {
                console.log("yo")
            }
        </div>
    );
};

export default AddItemPopup;