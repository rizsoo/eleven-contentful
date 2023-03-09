import React from 'react'
import styled from 'styled-components'
import { Navbar } from './Navbar'
import { Localization } from './Localization'

export const PageContentSection = ({ title, output, navbar, lang }) => {
    return (
        <>
            <Navbar navbar={navbar} lang={lang} />
            <PageTitle>{title}</PageTitle>
            <PageContent>
                {output}
            </PageContent>
            <Localization data={lang} />
        </>
    )
}

export const PageTitle = styled.h2`
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 20px;
`

export const PageContent = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 10px 20px;
`