import { useEffect } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import { fetchTickets } from '../../store/aviasales';
import Notification from '../Notification';
import Ticket from '../Ticket';
import Button from '../Button';

const TicketsList = ({ tickets, isLoading, fetchTickets, count, sort, filter }) => {
  useEffect(() => {
    fetchTickets();
  }, []);

  let i = 0;

  const list = buildList(tickets, sort, filter)
    .slice(0, count)
    .slice(0, 100)
    .map((t) => <Ticket {...t} key={i++} />);

  return (
    <>
      {isLoading ? <Ticket isLoading={true} /> : null}
      {!list.length && !isLoading ? (
        <Notification type={'notify'}>
          К сожалению, билетов по вашему запросу не найдено.
          <br />
          <br />
          Попробуйте изменить параметры поиска или повторить позже.
        </Notification>
      ) : null}
      {list}
      {list.length ? <Button /> : null}
    </>
  );
};

TicketsList.defaultProps = {
  tickets: [],
  isLoading: false,
  fetchTickets: () => {},
};
TicketsList.propTypes = {
  tickets: propTypes.arrayOf(propTypes.object),
  isLoading: propTypes.bool,
  fetchTickets: propTypes.func,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.isLoading,
    tickets: state.tickets,
    count: state.toShow,
    sort: state.sort,
    filter: state.filter,
  };
};
export default connect(mapStateToProps, { fetchTickets })(TicketsList);

const doSort = (tickets, mode) => {
  if (mode === 'cheap') {
    return [...tickets].sort((a, b) => {
      return a.price - b.price;
    });
  }
  if (mode === 'fast') {
    return [...tickets].sort((a, b) => {
      let aD = 0;
      let bD = 0;
      for (let s of a.segments) {
        aD += s.duration;
      }
      for (let s of b.segments) {
        bD += s.duration;
      }
      return aD - bD;
    });
  }
  if (mode === 'optimal') {
    return [...tickets].sort((a, b) => {
      let aD = 0;
      let bD = 0;
      for (let s of a.segments) {
        aD += s.duration;
      }
      for (let s of b.segments) {
        bD += s.duration;
      }
      return aD + a.price - (bD + b.price);
    });
  }
  return tickets;
};

const doFilter = (tickets, filter) => {
  const cond = [];
  for (const c of filter) {
    cond.push(Number(c.replace(/\D/g, '')));
  }
  return [...tickets].filter((t) => {
    for (let s of t.segments) {
      if (!cond.includes(s.stops.length)) return false;
    }
    return true;
  });
};

const buildList = (tickets, sort, filter) => {
  const res = doSort(tickets, sort);
  return doFilter(res, filter);
};
