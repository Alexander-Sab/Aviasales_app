import cn from 'classnames';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import css from './Logo.module.scss';
import globe from './globe.svg';
import plane from './plane.svg';

const Logo = ({ isLoading }) => {
  const planeCSS = cn(css.planeImg, css.img, { [`${css.onLoad}`]: isLoading });

  return (
    <div className={css.logo}>
      <div className={cn(css.plane)}>
        <img src={plane} alt="plane" className={planeCSS} />
      </div>
      <img src={globe} alt="globe" className={cn(css.globe, css.img)} />
    </div>
  );
};

Logo.defaultProps = {
  isLoading: false,
};
Logo.propTypes = {
  isLoading: propTypes.bool,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
  };
};

export default connect(mapStateToProps)(Logo);
