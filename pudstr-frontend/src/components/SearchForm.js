import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import './searchform.css';

class SimpleForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = { address: ''}
    this.onChange = (address) => this.setState({ address })
  }

  handleFormSubmit = (event) => {
    event.preventDefault()

    geocodeByAddress(this.state.address)
      .then(results => getLatLng(results[0]))
      .then(latLng => this.props.grabLocation(latLng))
      .catch(error => console.error('Error', error))
  }

  render() {

    const inputProps = {
      value: this.state.address,
      onChange: this.onChange,
    }

    return (
      <form className='SearchForm' onSubmit={this.handleFormSubmit}>
        <PlacesAutocomplete inputProps={inputProps} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

export default SimpleForm
