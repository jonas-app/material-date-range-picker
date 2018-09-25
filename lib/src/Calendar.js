import React, { PureComponent } from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import ArrowDropUp from '@material-ui/icons/ArrowDropUp';
import ClearAll from '@material-ui/icons/ClearAll';
import Card from '@material-ui/core/Card';
import { Row, Cell } from './Components';
import DaySelect from './DaySelect';
import MonthSelect from './MonthSelect';

const Wrapper = styled(Card)`
  && {
    margin-top: 10px;
    width: 100%;
    min-width: 212px;
    position: absolute;
    z-index: 1;
    flex-direction: row;
    padding: 8px;
  }
`;

const MonthButton = styled(IconButton)`
  && {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const Spacer = styled.div`
  flex: 1;
`;

const MothText = styled(Button)`
  && {
    font-weight: 600;
    font-size: 14px;
  }
`;

export default class Calendar extends PureComponent {
  state = { monthSelectOpen: false };

  handleMonthTextClick = () => this.setState(({ monthSelectOpen }) => ({ monthSelectOpen: !monthSelectOpen }));

  render() {
    const { getFormattedDate, setDateNextMonth, setDatePrevMonth, clearDateRange } = this.props;
    const { monthSelectOpen } = this.state;
    return (
      <Wrapper raised>
        <Row>
          <MothText size="small" onClick={this.handleMonthTextClick}>
            {getFormattedDate('MMM YYYY')}
            {monthSelectOpen ? <ArrowDropUp /> : <ArrowDropDown />}
          </MothText>
          <Spacer />
          <Cell>
            <MonthButton onClick={clearDateRange} aria-label="Clear selection">
              <ClearAll />
            </MonthButton>
          </Cell>
          <Cell>
            <MonthButton onClick={setDatePrevMonth} aria-label="Previous month">
              <NavigateBefore />
            </MonthButton>
          </Cell>
          <Cell>
            <MonthButton onClick={setDateNextMonth} aria-label="Next month">
              <NavigateNext />
            </MonthButton>
          </Cell>
        </Row>
        {monthSelectOpen ? <MonthSelect {...this.props} /> : <DaySelect {...this.props} />}
      </Wrapper>
    );
  }
}
