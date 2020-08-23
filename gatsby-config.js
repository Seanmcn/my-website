module.exports = {
  siteMetadata: {
    title: `Sean McNamara | Programming Stuff`,
    author: `Sean McNamara`,
    description: `Sean McNamara's blog mostly programming articles with a sprinkle of games & reviews.`,
    siteUrl: `https://seanmcn.com`,
  },
  plugins: [
    'gatsby-plugin-sass',
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/assets`,
        name: `assets`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        // a workaround to solve mdx-remark plugin compat issue
        // https://github.com/gatsbyjs/gatsby/issues/15486
        plugins: [
          `gatsby-remark-images`,
        ],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: `gatsby-remark-copy-linked-files`,
          },

          {
            resolve: `gatsby-remark-smartypants`,
          },
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMdx } }) => {
              return allMdx.edges.map(edge => {
                return { ...edge.node.frontmatter, description: edge.node.excerpt,
                  data: edge.node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  guid: site.siteMetadata.siteUrl + edge.node.frontmatter.slug,
                  custom_elements: [{ 'content:encoded': edge.node.html }],}
              })
            },
            query: `
            {
              allMdx(
                limit: 1000,
                sort: { order: DESC, fields: [frontmatter___date] },
              ) {
                edges {
                  node {
                    frontmatter {
                      title
                      date
                      slug
                    }
                    html
                  }
                }
              }
            }
            `,
            output: '/rss.xml',
            title: 'Seanmcn.com RSS feed',
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sean McNamara`,
        short_name: `Sean McN`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `content/assets/pwa/icon.png`,
      },
    },
    {
      resolve: 'gatsby-plugin-flexsearch',
      options: {
        languages: ['en'],
        type: 'MarkdownRemark',
        fields: [
          {
            name: 'title',
            indexed: true,
            resolver: 'frontmatter.title',
            attributes: {
              encode: 'balance',
              tokenize: 'strict',
              threshold: 0,
              resolution: 3,
              depth: 3,
            },
            store: true,
          },
          {
            name: 'category',
            indexed: true,
            resolver: 'frontmatter.category',
            attributes: {
              encode: 'balance',
              tokenize: 'strict',
              threshold: 0,
              resolution: 3,
              depth: 3,
            },
            store: true
          },
          {
            name: 'tags',
            indexed: true,
            resolver: 'frontmatter.tags',
            attributes: {
              encode: 'icase',
              tokenize: 'strict',
              threshold: 0,
              resolution: 9,
            },
            store: true,
          },
          {
            name: 'keywords',
            indexed: true,
            resolver: 'frontmatter.keywords',
            attributes: {
              encode: 'balance',
              tokenize: 'strict',
              threshold: 0,
              resolution: 3,
            },
            store: true,
          },
          {
            name: 'url',
            indexed: false,
            resolver: 'fields.slug',
            store: true,
          },
        ],
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
}
