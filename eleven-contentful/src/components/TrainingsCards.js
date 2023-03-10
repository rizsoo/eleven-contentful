import React from 'react'
import styled from 'styled-components';
import { Link } from 'gatsby';
import { BsFillArrowRightCircleFill } from "react-icons/bs";

export const TrainingsCards = ({ props, lang }) => {
    console.log(lang);

    return (
        <TrainContent>
            {props.map(el => {
                let weekly = el.dates.length
                return (
                    <Link to={`/${lang.node_locale}/${el.slug}`}>
                        <TrainCard>
                            <img src={el.image.url} alt="" />
                            <span>
                                <h2>{el.title}</h2>
                                <b>Amatőr</b>
                            </span>
                            <Arrow><BsFillArrowRightCircleFill /></Arrow>
                            {/* <p>{el.description.description}</p> */}
                            <p>{weekly}{lang.node_locale === "hu" ? " edzés egy héten" : weekly > 1 ? " times a week" : " time a week"}</p>
                        </TrainCard>
                    </Link>
                )
            })}
        </TrainContent>
    )
}

export const TrainContent = styled.div`
    display: flex;
    gap: 25px;
    padding: 0 20px;
    margin: 0 -20px;
    margin-bottom: 25px;
    @media(max-width: 650px) {
        overflow-x: scroll;   
        margin-bottom: 15px;
    }
`

export const TrainCard = styled.div`
    min-width: 270px;
    width: 270px;
    height: 400px;
    
    background-color: #f1f1f1;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

    border-radius: 30px;
    @media(max-width: 650px) {
        margin-bottom: 10px;
        box-shadow: unset;
    }

    padding: 30px 20px;
    overflow: hidden;

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    position: relative;
    span {
        z-index: 1 !important;
    }
    h2 {
        font-weight: 600;
        padding-right: 20%;
        font-size: 27px;
        line-height: 37px;
        margin-bottom: 9px;
    }
    b {
        z-index: 1 !important;
        background-color: white;
        width: max-content;
        padding: 3px 6px;
        border-radius: 8px;
        font-weight: 500;
        font-size: 14px;
    }
    p {
        z-index: 1 !important;
        width: max-content;
        border-radius: 8px;
    }
    img {
        object-fit: contain;
        position: absolute;
        max-width: 80%;
        bottom: 0px;
        right: 0px;
        z-index: 0;
    }
`

export const Arrow = styled.div`
    position: absolute;
    bottom: 25px;
    right: 30px;
    color: white;
    transform: scale(2.4);
    &::before {
        content: "";
        position: absolute;
        top: 5px;
        left: 1px;
        width: 90%;
        height: 50%;
        background-color: black;
        border-radius: 50%;
        z-index: -1;
    }
`