import React from 'react';

export class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ''
    }
    this.handleChange = this.handleChange.bind(this);
  }

  /* 入力した値でstateを更新する */
  handleChange(event) {
    this.setState({ inputValue: event.target.value });
    this.props.callBackSearch(event.target.value);
  }


  render() {
    return (
      < div className="searchBox" >
        <i className="fa fa-search searchBox__icon" aria-hidden="true" />
        <input type="text"
          className="searchBox__input js-search"
          value={this.state.inputValue}
          onChange={this.handleChange}
          placeholder="somothing keyword" />
      </div >
    );
  }
}
