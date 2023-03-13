import React from 'react'
import styled from 'styled-components'
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useState } from 'react';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { DateElement } from './DateElement';
import { BsDashCircleFill } from "react-icons/bs";
import { Placeholder } from './TrainingCalendar';

export const Calendar = ({ lang, props, choosenDateAndHour, setChoosenDateAndHour }) => {

    const [month, setMonth] = useState(new Date().getMonth())
    const [year, setYear] = useState(new Date().getFullYear())
    const [day, setDay] = useState(new Date().getDate())
    const [result, setResult] = useState('');

    const weekdays_en = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun']
    const weekdays_hu = ['Hét', 'Kedd', 'Szer', 'Csüt', 'Pén', 'Szom', 'Vas']
    const full_weekdays_en = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    const full_weekdays_hu = ['Hétfő', 'Kedd', 'Szerda', 'Csütörtök', 'Péntek', 'Szombat', 'Vasárnap']

    let language = lang.node_locale === "hu" ? weekdays_hu : weekdays_en
    let full_language = lang.node_locale === "hu" ? full_weekdays_hu : full_weekdays_en

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
    function getDatesInRange(originalDate, repeatNum) {
        let today = new Date(),
            startDate = new Date(originalDate),
            endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 14);

        const date = new Date(startDate.getTime());

        const dates = [];

        while (date <= endDate) {
            dates.push(new Date(date));
            date.setDate(date.getDate() + repeatNum);
        }

        return dates
    }

    let eventDateList = props.map(el => el.dates).flat(1).map(el => {
        const res = getDatesInRange(el.date.split('T').shift(), el.repeat).map(el => `${el.getFullYear()}-${month < 9 && '0'}${el.getMonth() + 1}-${el.getDate()}`);
        return res
    })
    let eventHourList = props.map(el => el.dates).flat(1).map(el => {
        const newDate = getDatesInRange(el.date, el.repeat);
        const eventTitle = el.event[0].title;
        const eventIcon = el.event[0].icon
        const eventLevel = el.level
        const eventDuration = el.duration
        let res = newDate.map(el => ({
            title: eventTitle,
            icon: eventIcon.url,
            level: eventLevel,
            duration: eventDuration,
            date: `${el.getFullYear()}-${month < 9 && '0'}${el.getMonth() + 1}-${el.getDate()}`,
            hour: `${el.getHours()}:${el.getMinutes() === 0 ? '0' : ''}${el.getMinutes()}`,
            compare: `${el.getFullYear()}-${month < 9 && '0'}${el.getMonth() + 1}-${el.getDate()}` + 'T' + `${el.getHours()}:${el.getMinutes() === 0 ? '0' : ''}${el.getMinutes()}`
        }))
        return res
    })

    let jesus = eventHourList.flat(1)

    return (
        <Content>
            <h2>{lang.node_locale === "hu" ? "Naptár" : "Calendar"}</h2>
            <Block>
                <p><b>{lang.node_locale === "hu" ? monthes_hu[month] : monthes_en[month]}</b> {year}</p>
                <span>
                    <BsChevronLeft onClick={() => changeMonth(true)} style={month === current_month && year === current_year && { color: "grey" }} />
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
                                dataArray={eventDateList.flat(1)}
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
                {result && <h3>{lang.node_locale === "hu" ? "Szabad időpontok" : "Hours available"}</h3>}
                {jesus.filter(el => el.date === result).length > 0 ?
                    jesus.filter(el => el.date === result).map(el => {
                        let element = `${result}T${el.hour}`
                        let label = `${el.hour} - ${el.title}`
                        let underLabel = el.date
                        let icon = el.icon
                        return (
                            <DateElement
                                element={element}
                                label={label}
                                icon={icon}
                                el={el}
                                underLabel={underLabel}
                                choosenDateAndHour={choosenDateAndHour}
                                setChoosenDateAndHour={setChoosenDateAndHour} />
                        )
                    }) : result && <Placeholder>No event today!</Placeholder>}
            </Hours>
            <h3>{choosenDateAndHour.length > 0 && (lang.node_locale === "hu" ? "Kiválaszott időpontok" : "Choosen events")}</h3>
            <Selected>
                {jesus.filter(el => choosenDateAndHour.includes(el.compare)).map(el => {
                    let weekdayName = new Date(el.date).getDay() - 1
                    return (
                        <Item icon={el.icon}>
                            <p>{el.title}</p>
                            <p>{full_language[weekdayName]}</p>
                            <b>{el.hour}</b>
                            <span
                                onClick={() =>
                                    setChoosenDateAndHour(choosenDateAndHour.filter(item => item !== el.compare))}
                            ><BsDashCircleFill /></span>
                        </Item>
                    )
                })}
            </Selected>
        </Content>

    )
}
export const Content = styled.div`
    height: 100%;
    width: 100%;
`
export const Block = styled.div`
    background-color: black; 
    color: white;
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

    ${props => props.index + 1 === props.day && props.result ? 'background-color: black; font-weight: 700; color: white;' : null}
    ${props => props.current_day > props.num + 1 && props.sameMonth ? 'color: lightgrey !important;' : null}
`

export const Hours = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;
`

export const Selected = styled.div`
    display: grid;
    
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 15px;
    @media (max-width: 650px) {
        grid-template-columns: repeat(2, 1fr);
    }
`

export const Item = styled.div`
    background-color: #f8f8f8;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
    padding: 12px;
    border-radius: 15px;
    display: flex;
    height: 160px;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    background: url(${props => props.icon});
    background-size: cover;
    background-position: 50px 55px;
    background-repeat: no-repeat;
    b {
        font-size: 25px;
        z-index: 1;
        background-color: white;
        width: max-content;
        padding: 1px 5px 0 5px;
        border-radius: 6px;
    }
    span {
        position: absolute;
        top: -4px;
        right: -4px;
        z-index: 10;
        color: salmon;
        transform: scale(1.3);
        border-radius: 50%;
        cursor: pointer;
    }
`