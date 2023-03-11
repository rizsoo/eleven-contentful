import React from 'react'
import styled from 'styled-components'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState } from 'react';

export const Calendar = ({ lang }) => {
    const [month, setMonth] = useState(new Date().getMonth())
    const monthes_hu = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    const monthes_en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const current_month = new Date().getMonth()


    return (
        <>
            <Block>
                <p><b>{lang.node_locale === "hu" ? monthes_hu[month] : monthes_en[month]}</b> {new Date().getFullYear()}</p>
                <span>
                    <BsChevronLeft onClick={() => month !== current_month && setMonth(month - 1)} style={month === current_month && { color: "lightgrey" }} />
                    <BsChevronRight onClick={() => setMonth(month + 1)} />
                </span>
            </Block>

        </>

    )
}

export const Block = styled.div`
    background-color: #f5f5f5; 
    height: 100%;
    width: 80%;
    padding: 20px;
    margin: 10px 0 20px 20px;
    border-radius: 30px;

    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
        display: flex;
        gap: 5px;
        align-items: center; 
        transform: scale(1.5);
        margin-right: 10px;
        cursor: pointer;
    }
    
    @media (max-width: 650px) {
        display: none;
    }
`