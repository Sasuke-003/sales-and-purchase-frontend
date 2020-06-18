import React from 'react';
import Purchase from '../../components/purchase/purchase.component';
import './purchase-page.styles.css'

const PurchasePage = () => {
    return (
        <div className='container'>
            <h2>PURCHASE ITEMS</h2>
            <Purchase />
        </div>
    );
};

export default PurchasePage;