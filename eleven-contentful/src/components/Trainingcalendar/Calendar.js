import React from 'react'
import styled from 'styled-components'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const Calendar = ({ lang, props }) => {

    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [day, setDay] = useState(new Date().getDate())
    const [result, setResult] = useState('');

    const weekdays_en = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    const weekdays_hu = ['Hét', 'Kedd', 'Szer', 'Csüt', 'Pén', 'Szom', 'Vas']

    let language = lang.node_locale === "hu" ? weekdays_hu : weekdays_en

    const monthes_hu = ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"];
    const monthes_en = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const current_month = new Date().getMonth()
    const current_year = new Date().getFullYear()
    const current_day = new Date().getDate()

    const days = [31, year % 4 === 0 ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    const daysArray = Array.from(Array(days[month]).keys())

    let isSameMonthYear = month === current_month && year === current_year;

    // Arrow onclick functions
    function changeMonth(bool) {
        setResult('')
        // DOWN
        !isSameMonthYear && bool && setMonth(month - 1)
        bool && month === 0 && setMonth(11)
        bool && month === 0 && setYear(year - 1)
        // UP
        !bool && month !== 11 && setMonth(month + 1)
        !bool && month === 11 && setMonth(0)
        !bool && month === 11 && setYear(year + 1)
    }

    // Get first day and its array
    function getFirstDayOfMonth(year, month) {
        return new Date(year, month, 1);
    }
    let getFirstDay = getFirstDayOfMonth(year, month).getDay();
    let firstdays = Array.from(Array(getFirstDay === 0 ? 7 : getFirstDay).keys())
    firstdays.pop()

    // Show if there is something on a specific day
    function getDataFromEvents() {
        let dataArray = props.map(el => el.dates).flat(1).map(el => {
            const originalDate = el.date.split('T').shift();
            return originalDate
        })
        let repeatDate = props.map(el => el.dates).flat(1).map(el => {
            let repeat = el.date.split('T').shift();
            if (el.repeat) {
                let today = new Date(repeat);
                let nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate() + el.repeat);
                let howFar = nextweek.getDate() - current_day < 7 ? true : false;
                let trueDate = howFar ? `${nextweek.getFullYear()}-${nextweek.getMonth() < 9 && '0'}${nextweek.getMonth() + 1}-${nextweek.getDate()}` : '';
                return trueDate;
            }
            return repeat
        })
        let result = [...dataArray, ...repeatDate]
        return result
    }
    console.log(props.map(el => el.dates).flat(1));

    return (
        <Content>
            <h2>{lang.node_locale === "hu" ? "Naptár" : "Calendar"}</h2>
            <Block>
                <p><b>{lang.node_locale === "hu" ? monthes_hu[month] : monthes_en[month]}</b> {year}</p>
                <span>
                    <BsChevronLeft onClick={() => changeMonth(true)} style={month === current_month && year === current_year && { color: "lightgrey" }} />
                    <BsChevronRight onClick={() => changeMonth(false)} />
                </span>
            </Block>
            <Dates>
                <Weekdays>
                    {language.map(el => {
                        return (
                            <p>{el}</p>
                        )
                    })}
                </Weekdays>
                <Days>
                    {firstdays.map(el => <b></b>)}
                    {daysArray.map((el, i) => {
                        const value = `${year}-${month < 9 && '0'}${month + 1}-${el + 1}`
                        return (
                            <Num
                                index={i}
                                day={day}
                                dataArray={getDataFromEvents()}
                                result={result}
                                value={value}
                                sameMonth={current_month === month}
                                current_day={current_day}
                                num={el}
                                onClick={() => (el + 1 >= current_day && (setResult(value), setDay(el + 1)))}>
                                {el + 1}
                            </Num>
                        )
                    })}
                </Days>
            </Dates>
            <Hours>
                <h3>{lang.node_locale === "hu" ? "Szabad időpontok" : "Hours available"}</h3>
                {props.map(el => el.dates).flat(1).filter(el => el.date.split("T").shift() === result).map(el => {
                    return (
                        <p>{el.date.split("T").pop()}</p>
                    )
                })}
            </Hours>
        </Content>

    )
}
export const Content = styled.div`
    height: 100%;
    width: 100%;
`
export const Block = styled.div`
    background-color: #f5f5f5; 
    padding: 20px;
    margin: 10px 0 20px 0px;
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
        margin: 15px 0;
        span {
            gap: 10px;
        }
    }
`
export const Dates = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    margin-bottom: 30px;
    @media (max-width: 650px) {
        margin-left: 0;
    }
`
export const Weekdays = styled.div`
    display: grid;
    text-align: center;
    grid-template-columns: repeat(7, 1fr);
    color: grey;
    margin-bottom: 13px;
`
export const Days = styled.div`
    display: grid;
    text-align: center;
    grid-template-columns: repeat(7, 1fr);
    gap: 7px;
`
export const Num = styled.p`
    font-size: 17px;
    background-color: #f9f9f9;
    padding: 16px 0;
    @media (max-width: 650px) {
        padding: 8px 0;
        border-radius: 10px;
    }
    border-radius: 18px;
    cursor: pointer;
    ${props => !(props.current_day > props.num + 1 && props.sameMonth) && props.dataArray.includes(props.value) ? 'background-color: #d9d9d9;' : null}

    ${props => props.index + 1 === props.day && props.result ? 'background-color: #F3DFC1; font-weight: 700;' : null}
    ${props => props.current_day > props.num + 1 && props.sameMonth ? 'color: lightgrey !important;' : null}
`

export const Hours = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    p {
        width: 100%;
        background-color: #f1f1f1;
        border-radius: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 17px;
        padding: 10px 0;
    }
`