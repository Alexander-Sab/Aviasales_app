import cn from 'classnames';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { showMore } from '../../store/aviasales';

import css from './Button.module.scss';

const Button = ({ showMore, count, showed }) => {
  if (count < showed) return null;

  return (
    <div
      className={cn(css.Button, 'borderRadius')}
      onClick={() => {
        showMore();
      }}
    >
      Показать ещё 5 билетов
    </div>
  );
};

Button.defaultProps = {
  onclick: () => {},
  showed: 0,
  count: 0,
};
Button.propTypes = {
  onclick: propTypes.func,
  showed: propTypes.number.isRequired,
  count: propTypes.number.isRequired,
};

const mapStateToProps = (store) => {
  return {
    showed: store.toShow,
    count: store.tickets.length,
  };
};

export default connect(mapStateToProps, { showMore })(Button);
