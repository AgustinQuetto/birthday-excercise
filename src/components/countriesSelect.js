import React from 'react'

class CountriesSelect extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      countries : []
    }
  }
  
  componentDidMount() {
    this.request()
  }

  async request() {
    const response = await fetch('https://restcountries.eu/rest/v2/all');
    const json = await response.json();
    this.setState({
      countries : json
    })
  }

  render() {
    let countries = this.state.countries
    let optionItems = countries.map((country) =>
            <option key={country.name}>{country.name}</option>
        )
    return (
      <select name="country">
        {optionItems}
      </select>
    )
  }
}

export default CountriesSelect