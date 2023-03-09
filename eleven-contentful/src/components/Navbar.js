import React from 'react'
import styled from 'styled-components'
import { useState, useRef } from 'react';
import { Link } from 'gatsby';

export const Navbar = ({ navbar, lang }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <NavBox>
            <NavContent>
                <Link to={lang.node_locale === "hu" ? "/" : "/en"}>
                    <h1>ELEVEN Sportclub</h1>
                </Link>
                <ul>
                    {navbar.pages.map(el => {
                        return (
                            <Link to={`/${el.node_locale}/${el.slug}`}><li>{el.title}</li></Link>
                        )
                    })}
                </ul>
            </NavContent>
        </NavBox>
    )
}

export const NavBox = styled.div`
    background-color: black;
    color: white;
`
export const NavContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    h1 {
        letter-spacing: 0.2px;
    }
    display: flex;
    justify-content: space-between;
    align-items: center;
    ul {
        display: flex;
        gap: 15px;
    }
    li {
        list-style-type: none;
        letter-spacing: 0.2px;
    }
`