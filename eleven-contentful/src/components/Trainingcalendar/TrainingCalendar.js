import React from 'react'
import styled from 'styled-components';
import { Calendar } from './Calendar';
import { TrainCalItem } from './TrainCalItem'

export const TrainingCalendar = ({ props, lang }) => {
    console.log(props);

    // TUESDAY

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
            tag: 'monday',
            day: getDateFunction(1)
        },
        {
            index: 2,
            english: "Tue",
            hungarian: "Kedd",
            tag: 'tuesday',
            day: getDateFunction(2)
        },
        {
            index: 3,
            english: "Wed",
            hungarian: "Szer",
            tag: 'wednesday',
            day: getDateFunction(3)
        },
        {
            index: 4,
            english: "Thur",
            hungarian: "Csüt",
            tag: 'thursday',
            day: getDateFunction(4)
        },
        {
            index: 5,
            english: "Fri",
            hungarian: "Pén",
            tag: 'friday',
            day: getDateFunction(5)
        },
    ]
    const monthes = ["Jan", "Febr", "Márc", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"];
    const current = new Date().getDay();

    function renderNextDay(num) {
        let upper = datelist.filter(el => el.index >= num).sort((a, b) => (a.index < num) ? 1 : -1)
        let lower = datelist.filter(el => el.index < num).sort((a, b) => b - a);
        console.log([...upper, ...lower]);
        return [...upper, ...lower]
    }
    renderNextDay(5);

    return (
        <Frame>
            <ListHolder>
                {renderNextDay(current).map(date => {
                    let result = props.map(el => el.dates.filter(d => d.day === date.tag)).filter(el => el.length > 0)[0]
                    // console.log(result);
                    return (
                        <Block>
                            <Day>
                                <DateNumber>{date.day.getDate()}</DateNumber>
                                <b>{monthes[date.day.getMonth()]}</b>
                                {lang.node_locale === "hu" ? date.hungarian : date.english}
                            </Day>
                            <List>
                                {result !== undefined ?
                                    result.map(el => {
                                        let title = el.event[0].title;
                                        let icon = el.event[0].icon;
                                        return (
                                            <Item>
                                                <Left>
                                                    <img src={icon.url} alt="" />
                                                    <span>
                                                        <h3>{title}</h3>
                                                        <p>{el.date.split("T").pop() + " - " + el.duration}</p>
                                                    </span>
                                                </Left>
                                                <h4>{el.level}</h4>
                                            </Item>
                                        )
                                    })
                                    : <Placeholder>No event today!</Placeholder>}
                            </List>
                        </Block>
                    )
                })}
            </ListHolder>
            <Calendar lang={lang} />
        </Frame>
    )
}

export const Frame = styled.div`
    display: flex;
`
export const ListHolder = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`
export const Block = styled.div`
    display: flex;
    margin: 10px 0;
    padding-bottom: 10px;
`

export const Day = styled.p`
    border-top: 1px solid black;
    width: min-width;
    padding: 10px 10px 0 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
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
    margin-bottom: 8px;
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
export const Item = styled.div`
    padding: 8px 16px;
    border-radius: 15px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;

    min-height: 70px;

    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    h3 {
        line-height: 25px;
    }
    p {
        font-size: 14px;
        color: grey;
    }
    img {
        height: 30px;
    }
    h4 {
        color: grey;
        border: 2px solid #d9d9d9;
        border-radius: 7px;
        font-weight: 400;
        font-size: 14px;
        padding: 2px 7px;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: 650px) {
            display: none;
        }
    }
    &:hover {
        transform: scale(1.01);
        transition: all ease 0.2s;
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