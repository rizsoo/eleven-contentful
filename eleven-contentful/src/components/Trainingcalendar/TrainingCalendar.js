import React from 'react'
import styled from 'styled-components';
import { Calendar } from './Calendar';
import { TrainCalItem } from './TrainCalItem'
import { useState } from 'react';
import { DateElement } from './DateElement';

export const TrainingCalendar = ({ props, lang }) => {
    const [choosenDateAndHour, setChoosenDateAndHour] = useState([])

    function getDateFunction(num) {
        var d = new Date();
        d.setDate(d.getDate() + (num + 7 - d.getDay()) % 7);
        return d
    }

    let datelist = [
        {
            index: 1,
            english: "Mon",
            hungarian: "Hét",
            day: getDateFunction(1)
        },
        {
            index: 2,
            english: "Tue",
            hungarian: "Kedd",
            day: getDateFunction(2)
        },
        {
            index: 3,
            english: "Wed",
            hungarian: "Szer",
            day: getDateFunction(3)
        },
        {
            index: 4,
            english: "Thur",
            hungarian: "Csüt",
            day: getDateFunction(4)
        },
        {
            index: 5,
            english: "Fri",
            hungarian: "Pén",
            day: getDateFunction(5)
        },
    ]
    const full_weekdays_en = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    const full_weekdays_hu = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek']

    const monthes_hu = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    const monthes_en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Oktober", "November", "December"];
    const current = new Date().getDay();

    function renderNextDay(num) {
        let upper = datelist.filter(el => el.index >= num).sort((a, b) => (a.index < num) ? 1 : -1)
        let lower = datelist.filter(el => el.index < num).sort((a, b) => b - a);
        // console.log([...upper, ...lower]);
        return [...upper, ...lower]
    }
    renderNextDay(5);

    // console.log(choosenDateAndHour);

    return (
        <>
            <Frame>
                <ListHolder>
                    <h2>{lang.node_locale === "hu" ? "Közelgő edzések" : "Upcoming events"}</h2>
                    {renderNextDay(current).map(date => {
                        let result = props.map(el => el.dates.filter(d => new Date(d.date.split('T').shift()).getDay() === date.index)).filter(el => el.length > 0)[0]
                        return (
                            <Block>
                                <Day>
                                    <DateNumber>{date.day.getDate()}</DateNumber>
                                    <b>{lang.node_locale === "hu" ? monthes_hu[date.day.getMonth()] : monthes_en[date.day.getMonth()]}</b>
                                    {lang.node_locale === "hu" ? full_weekdays_hu[date.day.getDay() - 1] : full_weekdays_en[date.day.getDay() - 1]}
                                </Day>
                                <List>
                                    {result !== undefined ?
                                        result.map(el => {
                                            console.log(el);
                                            let title = el.event[0].title;
                                            let icon = el.event[0].icon.url;
                                            let element = el.date
                                            let underLabel = el.date.split('T').pop()
                                            return (
                                                <DateElement
                                                    element={element}
                                                    label={title}
                                                    icon={icon}
                                                    underLabel={underLabel}
                                                    el={el}
                                                    choosenDateAndHour={choosenDateAndHour}
                                                    setChoosenDateAndHour={setChoosenDateAndHour} />
                                            )
                                        })
                                        : <Placeholder>No event today!</Placeholder>}
                                </List>
                            </Block>
                        )
                    })}
                </ListHolder>
                <Calendar lang={lang} props={props} choosenDateAndHour={choosenDateAndHour} setChoosenDateAndHour={setChoosenDateAndHour} />
            </Frame>
            <ApplyBtn disabled={choosenDateAndHour.length > 0 ? false : true} onClick={() => alert('Hamarosan!')}>{lang.node_locale === "hu" ? "Jelentkezem" : "Apply"}</ApplyBtn>
        </>

    )
}

export const Frame = styled.div`
    display: flex;
    margin: 30px 0;
    @media (max-width: 650px) {
        flex-direction: column;
    }
`
export const ListHolder = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-right: 40px;
`
export const Block = styled.div`
    display: grid;
    grid-template-columns: 1fr 5fr;
    margin: 10px 0;
`

export const Day = styled.p`
    border-top: 1px solid black;
    padding: 10px 10px 0 10px;
    width: 95px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 15px;
    letter-spacing: -0.2px;
    b {
        font-size: 12px;
    }
    @media (max-width: 650px) {
        padding: 10px 10px 0 0;
    }
`
export const DateNumber = styled.h3`
    padding: 5px;
    background-color: black;
    color: white;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 25px;
    margin-bottom: 5px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`
export const List = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-top: 1.6px solid black;
    padding-top: 10px;
    width: 100%;
    @media (max-width: 650px) {
       
    }
`

export const Left = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`
export const Placeholder = styled.div`
    padding: 8px 16px;
    border-radius: 15px;

    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;
    p {
        font-size: 14px;
        color: grey;
    }
    border: 2px solid lightgrey;
    color: lightgrey;
    height: 70px;
    background-color: #f9f9f9;
`

export const ApplyBtn = styled.button`
    width: 100%;
    padding: 10px;
    border-radius: 50px;
    border: unset;
    margin: 50px auto;
    background-color: ${props => props.disabled ? 'grey' : 'black'};
    color: ${props => props.disabled ? 'lightgrey' : 'white'};
    
    font-family: inherit;
    font-size: 30px;
    font-weight: 700;
    letter-spacing: 2px;
    ${props => props.disabled ? null : 'cursor: pointer;'}
`