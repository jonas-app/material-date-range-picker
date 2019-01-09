import React, { Component } from 'react';
import styled from 'styled-components';

/*  1. Import material date range picker */
import { DateRangePicker } from 'material-date-range-picker';

const Wrapper = styled.div`
  width: 350px;
  padding: 20px;
`;

class App extends Component {
  state = {
    fromDate: null,
    toDate: null
  };
  /*  2. Add state handler */
  _handleDateRangeChange = update => this.setState(update);

  render() {
    return (
      <Wrapper>
        {/* 3. Add the material date range picker in your project */}
        <DateRangePicker
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          onChange={this._handleDateRangeChange}
          closeDialogOnSelection
        />
      </Wrapper>
    );
  }
}

export default App;
