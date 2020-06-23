import React from 'react';
import './billing-page.styles.css'
import Billing from '../../components/billing/billing.component'

const BillingPage = () => {
    return (
        <div className='container'>
            <h2>BILLING</h2>
            <Billing />
        </div>
    );
};

export default BillingPage;