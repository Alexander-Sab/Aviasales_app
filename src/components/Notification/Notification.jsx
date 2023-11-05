import cn from 'classnames';
import propTypes from 'prop-types';

import css from './Notification.module.scss';

const Notification = ({ children, type }) => {
  const classes = cn([css.Notification, css[type], 'borderRadius', 'boxShadow']);
  return (
    <div className={classes}>
      <div className={cn([css.mark, 'boxShadow'])}>!</div>
      <div className={css.text}>{children}</div>
    </div>
  );
};

Notification.defaultProps = {
  children: undefined,
  type: undefined,
};
Notification.propTypes = {
  children: propTypes.element,
  type: propTypes.oneOf(['notify', 'alert']),
};

export default Notification;
