import React from 'react'
import './zero.css'
import { graphql } from "gatsby"
import { Helmet } from 'react-helmet';
import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { PageContentSection } from '../components/PageContentSection';

const PageTemplate = ({ data: { page, event, navbar } }) => {
  console.log(page);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      <Helmet>
        <title>{page ? page.title : event.title}</title>
      </Helmet>
      <PageContentSection
        title={page ? page.title : event.title}
        content={page ? page.content : event.content}
        navbar={navbar}
        lang={page ? page : event} />
    </>
  )
}

export const query = graphql`
query MyQuery($slug: String, $node_locale: String) {
  page: contentfulPage(slug: { eq: $slug }, node_locale: { eq: $node_locale }) {
        content {
          raw
          references {
            ... on ContentfulAsset {
              __typename
              contentful_id
              description
              file {
                url
              }
            }
            ... on ContentfulTrainingsList {
              __typename
              contentful_id
              events {
                title
                slug
                description {
                  description
                }
                image {
                  url
                }
                dates {
                  location
                  link
                  date
                  duration
                  level
                }
              }
            }
            ... on ContentfulTrainingCalendar {
              __typename
              contentful_id
              events {
                title
                slug
                description {
                  description
                }
                image {
                  url
                }
                icon {
                  url
                }
                dates {
                  location
                  link
                  date
                  duration
                  repeat
                  level
                  event {
                    title
                    icon {
                      url
                    }
                  }
                }
              }
            }
         }  
        }
        contentful_id
        slug
        description {
            description
        }
        node_locale
        title
        image {
            url
        }
    }
    event: contentfulEvent(slug: { eq: $slug }, node_locale: { eq: $node_locale }) {
      content {
        raw
        references {
          ... on ContentfulAsset {
            __typename
            contentful_id
            description
            file {
              url
            }
          }
       }  
      }
      contentful_id
      slug
      description {
          description
      }
      node_locale
      title
      image {
          url
      }
      dates {
        location
        link
        date
        duration
      }
  }
  navbar: contentfulPageList(node_locale: {eq: $node_locale}, title: {eq: "Navbar"}) {
    title
    node_locale
    contentful_id
    pages {
      title
      description {
        description
      }
      slug
      node_locale
      }
  }
}
`

export default PageTemplate