import React from 'react'
import PropTypes from 'prop-types'
import RelatedPostsWidget from '../widgets/relatedPosts/relatedPosts'
import CategoriesWidget from '../widgets/categories/categoriesWidget'
import TagsWidget from '../widgets/tags/tagsWidget'
import Search from './search'

const Sidebar = ({ relatedPosts }) => (
  <div>
    <Search />
    <RelatedPostsWidget posts={relatedPosts} />
    <CategoriesWidget />
    <TagsWidget />
  </div>
)

Sidebar.propTypes = {
  relatedPosts: PropTypes.arrayOf(PropTypes.object),
}

export default Sidebar
