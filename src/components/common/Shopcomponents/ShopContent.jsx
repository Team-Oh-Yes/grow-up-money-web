// Link import
import '../../css/ShopComponents/ShopContent.css';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// AxiosInstance import
import axiosInstance from '../../api/axiosInstance';

// Const
export default function ShopContent() {
    return (
        <>
            <div className='shop-content-main'>
                <div className='shop-card-component'>
                    <img src={Shop} alt="" />
                    <div className='shop-info-item'>
                        <div className='shop-info-title'>
                            
                        </div>
                        <div className='shop-info-buy-button'>
                            <img src={d} alt="" />
                            <div className='shop-buy-price'>1000</div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
