import { connect } from 'react-redux';
import propTypes from 'prop-types';

import Filter from '../Filter';
import Logo from '../Logo';
import Tabs from '../Tabs';
import TicketsList from '../TicktetsList';
import Notification from '../Notification';

import css from './App.module.scss';

const App = ({ errors }) => {
  return (
    <div className={css.Aviasales}>
      <Logo />
      <div className={css.layout}>
        <div className={css.sidebar}>
          <Filter />
        </div>
        <div className={css.main}>
          <Tabs />
          {errors >= 15 ? (
            <Notification type="alert">
              При обращении к серверу произошла ошибка.
              <br />
              <br />
              Попробуйте повторить поиск позже.
            </Notification>
          ) : null}
          {errors >= 5 && errors < 15 ? (
            <Notification type="notify">
              Наблюдается легкая турбулентность, не все билеты будут отображены.
              <br />
              <br />
              Попробуйте повторить поиск позже.
            </Notification>
          ) : null}
          {errors < 15 ? <TicketsList /> : null}
        </div>
      </div>
    </div>
  );
};

App.defaultProps = {
  errors: 0,
};
App.propTypes = {
  errors: propTypes.number,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
  };
};

export default connect(mapStateToProps)(App);
