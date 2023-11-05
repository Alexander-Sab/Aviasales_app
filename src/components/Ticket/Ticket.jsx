import cn from 'classnames';
import propTypes from 'prop-types';
import { format, addMinutes } from 'date-fns';

import css from './Ticket.module.scss';

const Ticket = ({ isLoading, ...ticket }) => {
  const ticketCss = cn(css.Ticket, 'borderRadius', 'boxShadow', { [`${css.Placeholder}`]: isLoading });

  const carrier = isLoading ? (
    <div className={css.logo}></div>
  ) : (
    <img src={`//pics.avs.io/99/36/${ticket.carrier}.png`} alt={ticket.carrier} className={css.logo} />
  );

  const price = ticket?.price ? ticket.price.toLocaleString() : '';
  const sections = ticket?.segments?.map((s, i) => <TicketSection key={i} {...s} />);

  return (
    <div className={ticketCss}>
      <div className={css.header}>
        <div className={css.price}>{price} Р</div>
        {carrier}
      </div>
      <div className={css.sections}>{sections}</div>
    </div>
  );
};

Ticket.defaultProps = {
  isLoading: false,
  price: undefined,
  carrier: undefined,
  segments: [],
};
Ticket.propTypes = {
  isLoading: propTypes.bool,
  price: propTypes.number,
  carrier: propTypes.string,
  segments: propTypes.array,
};

export default Ticket;

const TicketSection = ({ origin, destination, date, duration, stops }) => {
  const stopsName = (val) => {
    if (val === 0 || val >= 5) return 'пересадок';
    if (val >= 2 && val <= 4) return 'пересадки';
    if (val === 1) return 'пересадка';
  };

  const departureDate = format(new Date(date), 'HH:mm');
  const arriveDate = format(addMinutes(new Date(date), duration), 'HH:mm');

  const stopsText = `${stops.length} ${stopsName(stops.length)}`;

  const m = duration % 60;
  const h = (duration - m) / 60;
  const travelDuration = `${h}ч ${m}м`;

  return (
    <div className={css.section}>
      <div className={css.item}>
        <div className={css.label}>
          {origin} - {destination}
        </div>
        <div className={css.value}>
          {departureDate} - {arriveDate}
        </div>
      </div>
      <div className={css.item}>
        <div className={css.label}>В пути</div>
        <div className={cn(css.value, css.duration)}>{travelDuration}</div>
      </div>
      <div className={css.item}>
        <div className={css.label}>{stopsText}</div>
        <div className={css.value}>{stops.join(', ')}</div>
      </div>
    </div>
  );
};

TicketSection.defaultProps = {
  origin: undefined,
  destination: undefined,
  date: undefined,
  duration: undefined,
  stops: [],
};
TicketSection.propTypes = {
  origin: propTypes.string,
  destination: propTypes.string,
  date: propTypes.string,
  duration: propTypes.number,
  stops: propTypes.array,
};
