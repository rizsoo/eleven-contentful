import React from 'react'
import styled from 'styled-components'
import { useState, useRef } from 'react';
import { Link } from 'gatsby';
import { BsFacebook, BsInstagram } from 'react-icons/bs'
import { BiMenuAltLeft } from 'react-icons/bi'
import logo from '../assets/eleven_logo_noblack.png'


export const Navbar = ({ navbar, lang }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavBox>
            <MobileBtn><BiMenuAltLeft onClick={() => setIsOpen(!isOpen)} /></MobileBtn>
            <NavContent isOpen={isOpen}>
                <Link to={lang.node_locale === "hu" ? "/" : "/en"}>
                    <img src={logo} alt="" />
                    <h1>ELEVEN Sportclub</h1>
                </Link>
                <ul>
                    {navbar.pages.map(el => {
                        return (
                            <Link to={`/${el.node_locale}/${el.slug}`}><li>{el.title}</li></Link>
                        )
                    })}
                    <span>
                        <li><a href={'https://www.facebook.com/elevensportclub'} target='_blank'><BsFacebook /></a></li>
                        <li><a href={'https://www.instagram.com/eleven.hungary/'} target='_blank'><BsInstagram /></a></li>
                    </span>
                </ul>
            </NavContent>
        </NavBox>
    )
}

export const NavBox = styled.div`
    @media (min-width: 650px) {
        background-color: black;
        color: white;
    }
    position: relative;
`
export const NavContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: black;
    color: white;
    @media (max-width: 650px) {
        flex-direction: column;
        align-items: start;
        gap: 30px;

        position: absolute;
        width: 100%;
        padding: 30px;
        ${props => props.isOpen ? "transform: translateX(0)" : "transform: translateX(-100%)"};
        ${props => props.isOpen ? "opacity: 1" : "opacity: 0.9"};
        transition: all ease 0.5s;

        z-index: 100;
    }
    h1 {
        letter-spacing: 0.2px;
        line-height: 30px;
        @media (max-width: 650px) {
            width: 70%;
        }
    }
    display: flex;

    justify-content: space-between;
    align-items: center;
    a {
        display: flex;
        align-items: center;
        gap: 12px;
    }
    img {
        max-height: 57px;
    }
    ul {
        display: flex;
        gap: 14px;
        span {
            display: flex;
            gap: 12px;
            margin-left: 3px;
            margin-right: 3px;
            @media (max-width: 650px) {
                margin: 10px 0;
                gap: 20px;
            }
        }
        @media (max-width: 650px) {
            flex-direction: column;
            gap: 13px;
        }
    }
    li {
        list-style-type: none;
        display: flex;
        align-items: center;
        a {
            display: flex;
            transform: scale(1.3);
            margin-left: 2px;
        }
        @media (max-width: 650px) {
            font-size: 25px;
        }
    }
`

export const MobileBtn = styled.div`
padding: 25px 30px 20px 30px;
    svg {
        background-color: black;
        color: white;
        transform: scale(2.7);
        padding: 3px;
        border-radius: 5px;
    }    
    @media (min-width: 650px) {
        display: none;
    }
`