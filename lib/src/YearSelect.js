import React, { Fragment } from 'react';
import styled from 'styled-components';
import { getYear, addYears, format, isThisYear, isSameYear } from 'date-fns';
import { Text, HeaderDivider, Row, SelectableCell } from './Components';

const Divider = styled(HeaderDivider)`
  && {
    margin-top: 8px;
  }
`;

function getSurroundingYears(date, amount = 8, dateFormat = 'YYYY') {
  const result = [];
  const selectedYearIndex = getYear(date) % amount;
  for (let year = 0; year < amount; year++) {
    const dateValue = addYears(date, year - selectedYearIndex);
    result.push({ dateValue, label: format(dateValue, dateFormat) });
  }
  return result;
}

function YearSelect(props) {
  const { setDate, date } = props;

  return (
    <Fragment>
      <Divider />
      <Row>
        {getSurroundingYears(date).map(year => (
          <SelectableCell
            key={year.label}
            widthPercentage={1 / 4}
            horizontalSpacing
            onClick={() => setDate(year.dateValue)}
            isSelected={isSameYear(year.dateValue, date)}
            isCurrent={isThisYear(year.dateValue)}>
            <Text>{year.label}</Text>
          </SelectableCell>
        ))}
      </Row>
    </Fragment>
  );
}

export default YearSelect;
