import styled from 'styled-components';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import { withTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';

function fromTheme(theme, key, def) {
  if (!theme || !theme.dateRangePicker) return def;
  const value = theme.dateRangePicker[key];
  return typeof value !== 'undefined' ? value : def;
}

export const HeaderDivider = styled(Divider)`
  && {
    margin: 0 -8px 8px;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
`;

export const Text = styled(Typography)`
  && {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
`;

export const Cell = styled.div`
  width: calc(
    100% * ${({ widthPercentage = 1 / 7 }) => widthPercentage} -
      ${({ horizontalSpacing }) => (horizontalSpacing ? 3 : 0)}px
  );
  padding-top: calc((100% / 7) - 2px);
  margin: 2px 0;
  position: relative;
  border: 1px solid transparent;
`;

function getBorderRadius({ isInRange, isRangeStart, isRangeEnd }) {
  if (isRangeStart) return '999px 0 0 999px';
  if (isRangeEnd) return '0 999px 999px 0';
  if (isInRange) return 0;
  return '999px';
}

function getBackground({ isInRange, isSelected, theme, isHighlighted }) {
  if (isSelected) return fromTheme(theme, 'selected', theme.palette.primary.main);
  if (isHighlighted) return fromTheme(theme, 'highlighted', '#ebebeb');
  if (isInRange) return fromTheme(theme, 'inRange', theme.palette.primary.light);
  return '#fff';
}

function getColor(props) {
  const { isLessImportant, isSelected, theme } = props;
  const color = theme.palette.getContrastText(getBackground(props));
  if (isSelected || !isLessImportant) return color;
  return fromTheme(theme, 'lessImportant', fade(color, 0.54));
}

export const SelectableCell = withTheme()(styled(Cell)`
  border-radius: ${getBorderRadius};
  border-color: ${({ theme, isCurrent }) => (isCurrent ? fromTheme(theme, 'current', '#9e9e9e') : 'transparent')};
  box-sizing: border-box;
  cursor: pointer;
  background: ${getBackground};
  && {
    * {
      color: ${getColor};
    }
  }
`);

export const Header = withTheme()(styled(Cell)`
  && {
    * {
      color: ${({ theme }) => fromTheme(theme, 'header', '#9e9e9e')};
    }
  }
`);
