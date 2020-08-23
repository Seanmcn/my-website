import React, { Component } from 'react'
import { Link } from 'gatsby'

// Search component
class Search extends Component {

  constructor (props) {
    super(props)
    this.state = {
      query: '',
      results: [],
    }
  }

  static getSearchResults (query) {
    /* eslint no-underscore-dangle: 0 */
    const { index , store } = window.__FLEXSEARCH__.en

    console.log('index', index);
    console.log('store', store);
    if (!query || !index) {
      return []
    }
    let results = []
    Object.keys(index).forEach(idx => {
      results.push(...index[idx].values.search(query))
    })

    results = Array.from(new Set(results))

    return store
      .filter(node => (results.includes(node.id) ? node : null))
      .map(node => node.node)
  }

  search = event => {
    const { query } = this.state
    const queryValue = event.target.value
    console.log('queryValue', queryValue);
    if (query.length > 2) {
      const results = Search.getSearchResults(queryValue)
      this.setState({ results, query: queryValue })
    } else {
      this.setState({ results: [], query: queryValue })
    }
  }

  render () {
    const { results, query } = this.state
    const { classNames } = this.props

    console.log('results', results);
    console.log('query', query);

    const ResultList = () => {
      if (results.length > 0) {
        return results.map((page) => (
          <div className="item-search" key={page.slug}>
            <Link to={page.url} className="link">
              <h4>{page.title}</h4>
            </Link>
          </div>
        ))
      }
      if (query.length > 2) {
        return `No results for ${query}`
      }
      if (
        results.length === 0 &&
        query.length > 0
      ) {
        return 'Please insert at least 3 characters'
      }
      return ''

    }

    return (
      <div className={classNames}>
        <input
          className="search__input"
          type="text"
          onChange={this.search}
          placeholder="Search"
        />
        <div className="search__list">
          <ResultList />
        </div>
      </div>
    )
  }
}

export default Search