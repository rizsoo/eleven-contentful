import React from 'react'
import { useState } from 'react'
import styled from 'styled-components'

export const DateElement = ({ el, element, label, underLabel, icon, choosenDateAndHour, setChoosenDateAndHour }) => {

  function handlePushToArray(elem) {
    !choosenDateAndHour.includes(elem) ?
      setChoosenDateAndHour([...choosenDateAndHour, elem])
      :
      setChoosenDateAndHour(choosenDateAndHour.filter(el => el !== elem));
  }

  return (
    <Item
      onClick={() => {
        handlePushToArray(element)
      }}
      choosenDateAndHour={choosenDateAndHour}
      element={element}
    >
      <Left>
        <img src={icon} alt="" />
        <span>
          <h3>{label}</h3>
          <p>{underLabel + " - " + el.duration}</p>
        </span>
      </Left>
      <h4>{el.level}</h4>
    </Item>
  )
}

export const Item = styled.p`
    ${props => props.choosenDateAndHour.includes(props.element) ? 'background-color: black; color: white;' : 'background-color: white;'}
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
        transition: all ease 0.2s;
    }
    h4 {
        color: #d1d1d1;
        border: 2.5px solid #d9d9d9;
        border-radius: 11px;
        font-weight: 700;
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
        img {
            transform: scale(1.07) rotate(30deg);
        }
    }
`

export const Left = styled.div`
    display: flex;
    gap: 10px;
    align-items: center;
`