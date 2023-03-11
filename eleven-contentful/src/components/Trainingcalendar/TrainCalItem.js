import React from 'react'
import styled from 'styled-components';

export const TrainCalItem = ({ el }) => {
    console.log(el);
    return (
        <Item>
            <img src={el.icon.url} alt="" />
            <span>
                <h3>{el.title}</h3>
                <p>{el.dates.filter(elem => elem.day === "monday").map(item => item.date.split("T").pop() + " - " + item.duration)}</p>
            </span>
        </Item>
    )
}

export const Item = styled.div`
    padding: 8px 16px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    display: flex;
    gap: 10px;
    align-items: center;
    p {
        font-size: 14px;
        color: grey;
    }
    img {
        height: 30px;
    }
`