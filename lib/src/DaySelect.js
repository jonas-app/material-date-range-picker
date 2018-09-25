import React, { Fragment } from 'react';
import { isSameMonth, isWithinRange, isSameDay, isToday } from 'date-fns';
import { Text, Header, HeaderDivider, Row, SelectableCell } from './Components';

const dateIsInRange = (date, fromDate, toDate) => fromDate && toDate && isWithinRange(date, fromDate, toDate);

const isSelected = (date, compareDate) => compareDate && isSameDay(date, compareDate);

function DaySelect(props) {
  const {
    fromDate,
    toDate,
    getWeeksInMonth,
    getDayLabelsInWeek,
    date,
    getItemProps,
    getMenuProps,
    highlightedIndex,
    setHighlightedIndex
  } = props;

  const weeksInMonth = getWeeksInMonth();
  const isInOtherMonth = dateValue => !isSameMonth(date, dateValue);
  return (
    <Fragment>
      <Row>
        {getDayLabelsInWeek('dd').map(day => (
          <Header key={day}>
            <Text>{day}</Text>
          </Header>
        ))}
      </Row>
      <HeaderDivider />
      <Row {...getMenuProps({ onMouseLeave: () => setHighlightedIndex(null) })}>
        {weeksInMonth.map((week, i) =>
          week.map((day, j, { length }) => {
            const isFromDate = isSelected(day.dateValue, fromDate);
            const isToDate = isSelected(day.dateValue, toDate);
            const index = i * length + j;
            return (
              <SelectableCell
                {...getItemProps({
                  key: day.label,
                  item: day.dateValue,
                  index,
                  isHighlighted: highlightedIndex === index,
                  isLessImportant: isInOtherMonth(day.dateValue),
                  isInRange: dateIsInRange(day.dateValue, fromDate, toDate),
                  isRangeStart: isFromDate && toDate,
                  isRangeEnd: isToDate && fromDate,
                  isSelected: isFromDate || isToDate,
                  isCurrent: isToday(day.dateValue)
                })}>
                <Text>{day.label}</Text>
              </SelectableCell>
            );
          })
        )}
      </Row>
    </Fragment>
  );
}

export default DaySelect;
