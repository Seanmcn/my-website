import React from 'react'
import PropTypes from 'prop-types'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import StaticData from '../data/static'
import Layout from '../components/layout/layout'
import AboutMeWidget from '../components/widgets/aboutMe'
import LatestPostsWidget from '../components/widgets/latestPosts/latestPosts'
import GithubReposWidget from '../components/widgets/githubRepos/githubRepos'
import BlogPostSeriesWidget from '../components/widgets/blogPostSeries'

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { title: siteTitle } = data.site.siteMetadata
    return (
      <Layout>
        <Helmet title={`Home | ${siteTitle}`} />
        <div className="columns is-multiline">
          <div className="column is-one-quarter">
            <AboutMeWidget />
            <LatestPostsWidget />
          </div>
          <div className="column is-three-quarters">
            <div className="box">
              <h1 className="subtitle">About Me</h1>
              <div
                className="content"
                dangerouslySetInnerHTML={{
                  __html: StaticData.about_me,
                }}
              />
              <Link to="/about">
                <button className="button is-small is-fullwidth" type="button">
                  Read More
                </button>
              </Link>
            </div>
            <div className="columns">
              <div className="column is-half">
                <GithubReposWidget />
              </div>
              <div className="column is-half">
                <BlogPostSeriesWidget />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allWordpressPost: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
  pageContext: PropTypes.shape({
    currentPage: PropTypes.number,
    numPages: PropTypes.number,
  }),
}

export const indexPageQuery = graphql`
  query IndexQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`