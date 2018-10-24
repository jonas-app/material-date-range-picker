import React, {Component} from 'react';
import styled from 'styled-components';

/*  1. Import for material date range picker */
import {DateRangePicker} from 'material-date-range-picker';

const Wrapper = styled.div`
  width: 350px;
  padding: 20px;
`;

class App extends Component {
  /*  2. Add state handler */

  state = {
    fromDate: null,
    toDate: null
  };

  _handleDateRangeChange = update => this.setState(update);

  render() {
    return (
      <Wrapper>
        {/* 3. Add the material date range picker in your project */}

        <DateRangePicker
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          onChange={this._handleDateRangeChange}
        />
      </Wrapper>
    );
  }
}

export default App;
