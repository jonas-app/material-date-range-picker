import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Downshift from 'downshift';
import { isSameDay, format, isAfter, isBefore } from 'date-fns';
import TextField from '@material-ui/core/TextField';
import Kalendaryo from 'kalendaryo';
import styled from 'styled-components';
import Calendar from './Calendar';

const Wrapper = styled.div`
  position: relative;
  * {
    box-sizing: border-box;
  }
`;

const itemToString = dateFormat => ({ fromDate, toDate } = {}) =>
  `${fromDate ? `From: ${format(fromDate, dateFormat)}${toDate ? ' ' : ''}` : ''}${
    toDate ? `To: ${format(toDate, dateFormat)}` : ''
  }`;

function stateReducer(state, changes) {
  // this prevents the menu from being closed when the user
  // selects an item with a keyboard or mouse
  switch (changes.type) {
    case Downshift.stateChangeTypes.keyDownEnter:
    case Downshift.stateChangeTypes.clickItem:
      return {
        ...changes,
        isOpen: state.isOpen,
        highlightedIndex: state.highlightedIndex
      };
    default:
      return changes;
  }
}

const renderCalendar = props => <Calendar {...props} />;

class DateRangePicker extends PureComponent {
  setDateRange = (selectedDate /* , stateAndHelpers */) => {
    const { fromDate, toDate } = this.props;

    if (!fromDate && toDate && isAfter(selectedDate, toDate)) {
      this.props.onChange({ fromDate: toDate, toDate: selectedDate });
      return;
    }

    // Reset the state if the selected date is equal
    if (toDate && isSameDay(selectedDate, toDate)) {
      this.props.onChange({ toDate: null });
      return;
    }
    if (fromDate && isSameDay(selectedDate, fromDate)) {
      this.props.onChange({ fromDate: null });
      return;
    }

    // Set the starting date to the selected date
    // if the starting date is empty
    if (!fromDate) {
      this.props.onChange({ fromDate: selectedDate });
      return;
    }

    // Set the ending date to the selected date if the start date
    // is given and the selected date is after the start date
    if (fromDate && isAfter(selectedDate, fromDate)) {
      this.props.onChange({ toDate: selectedDate });
      return;
    }

    // Set the starting date to the selected date if the
    // starting date is given and the selected date is
    // before the selected date
    if (toDate && fromDate && isBefore(selectedDate, fromDate)) {
      this.props.onChange({ fromDate: selectedDate });
      return;
    }

    if (fromDate && isBefore(selectedDate, fromDate)) {
      this.props.onChange({ fromDate: selectedDate, toDate: fromDate });
    }
  };

  clearDateRange = () => this.props.onChange({ fromDate: null, toDate: null });

  render() {
    const { fromDate, toDate, dateFormat } = this.props;
    return (
      <Downshift
        stateReducer={stateReducer}
        selectedItem={{ fromDate, toDate }}
        itemToString={itemToString(dateFormat)}
        onSelect={this.setDateRange}
        {...this.props}>
        {({ getInputProps, getLabelProps, selectedItem, ...downshiftProps }) => (
          <div className={this.props.className}>
            <TextField
              id="date-range"
              label="Date range"
              InputLabelProps={getLabelProps({
                shrink: downshiftProps.isOpen || !!fromDate || !!toDate
              })}
              placeholder="From:"
              fullWidth
              InputProps={getInputProps({
                readOnly: true,
                onClick: downshiftProps.openMenu,
                onFocus: downshiftProps.openMenu
              })}
            />

            {downshiftProps.isOpen ? (
              <Wrapper>
                <Kalendaryo
                  {...downshiftProps}
                  startCurrentDateAt={selectedItem.fromDate || selectedItem.toDate}
                  fromDate={selectedItem.fromDate}
                  toDate={selectedItem.toDate}
                  clearDateRange={this.clearDateRange}
                  startWeekAt={1}
                  defaultFormat={dateFormat}
                  render={renderCalendar}
                />
              </Wrapper>
            ) : null}
          </div>
        )}
      </Downshift>
    );
  }
}

DateRangePicker.propTypes = {
  fromDate: PropTypes.instanceOf(Date),
  toDate: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  dateFormat: PropTypes.string
};

DateRangePicker.defaultProps = {
  fromDate: null,
  toDate: null,
  className: '',
  dateFormat: 'YYYY-MM-DD'
};

export default DateRangePicker;
