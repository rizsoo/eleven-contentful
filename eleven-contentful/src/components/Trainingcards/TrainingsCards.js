import React, { useState, useEffect } from "react";
import styled from 'styled-components';
import { Link } from 'gatsby';
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { TrainCard } from "./TrainCard";

export const TrainingsCards = ({ props, lang }) => {
    console.log(lang);
    return (
        <TrainContent>
            {props.map(el => {
                return (
                    <TrainCard el={el} lang={lang} />
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

