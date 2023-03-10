import React from 'react'
import styled from 'styled-components'
import { Navbar } from './Navbar'
import { Localization } from './Localization'
import { TrainingsCards } from './Trainingcards/TrainingsCards'
import { BLOCKS, INLINES } from "@contentful/rich-text-types"
import { renderRichText } from "gatsby-source-contentful/rich-text"
import { TrainingCalendar } from './Trainingcalendar/TrainingCalendar'


export const PageContentSection = ({ title, content, navbar, lang }) => {
    // console.log(content);

    const options = {
        renderNode: {
            [BLOCKS.EMBEDDED_ASSET]: (node) => {
                // console.log(node);
                let link = node.data.target.description;
                if (link) {
                    return <a href={link} target={link.includes("http") && "_blank"} rel="noreferrer"><img src={node.data.target.file.url} alt="" /></a>
                } else return <img src={node.data.target.file.url} alt="" />
            },
            [INLINES.HYPERLINK]: (node) => {
                // console.log(node);
                let link = node.data.uri
                return <a href={link} target={link.includes("http") && "_blank"} rel="noreferrer">{node.content[0].value}</a>
            },
            [BLOCKS.PARAGRAPH]: (node) => {
                console.log(node.content);
                let data = node.content.map(el => {
                    if (el.marks[0] && el.marks[0].type === "bold") {
                        return (
                            <Paragraph><b>{el.value}</b></Paragraph>
                        )
                    } else {
                        return (
                            <Paragraph>{el.value}</Paragraph>
                        )
                    }

                })
                return data
            },
            [BLOCKS.EMBEDDED_ENTRY]: (node) => {
                // console.log(node);
                let data = node.data.target
                switch (data.__typename) {
                    case "ContentfulTrainingsList":
                        return (
                            <TrainingsCards
                                props={data.events}
                                lang={lang}
                            />
                        )
                    case "ContentfulTrainingCalendar":
                        return (
                            <TrainingCalendar
                                props={data.events}
                                lang={lang}
                            />
                        )
                    default:
                        return null
                }
            }
        }
    }
    const output = content && renderRichText(content, options)

    return (
        <>
            <Navbar navbar={navbar} lang={lang} />
            <PageTitle>{lang.slug !== "home" && title}</PageTitle>
            <PageContent>
                {output}
            </PageContent>
            <Localization data={lang} />
        </>
    )
}

export const PageTitle = styled.h2`
    max-width: 1100px;
    margin: 0 auto;
    padding: 20px;
`

export const PageContent = styled.div`
    max-width: 1100px;
    margin: 0 auto;
    padding: 0 20px;
`

export const Paragraph = styled.p`
    margin-top: 12px;
    b {
        font-weight: 600;
    }
`