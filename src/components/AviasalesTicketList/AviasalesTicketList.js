import clsx from 'clsx'
import { v1 as uuidv1 } from 'uuid'
import { format, add } from 'date-fns'

import classes from './AviasalesTicketList.module.scss'

export const AviasalesTicketList = ({ ticket }) => {
  const departureTime1 = format(new Date(ticket.segments[0].date), 'HH:mm')
  const arrivalTime1 = format(
    add(new Date(ticket.segments[1].date), {
      minutes: ticket.segments[1].duration,
    }),
    'HH:mm',
  )
  const formattedTimeRange1 = `${departureTime1} – ${arrivalTime1}`
  const departureTime2 = format(new Date(ticket.segments[1].date), 'HH:mm')
  const arrivalTime2 = format(
    add(new Date(ticket.segments[1].date), {
      minutes: ticket.segments[1].duration,
    }),
    'HH:mm',
  )
  const formattedTimeRange2 = `${departureTime2} – ${arrivalTime2}`
  const duration1 = ticket.segments[0].duration
  const hours1 = Math.floor(duration1 / 60)
  const minutes1 = duration1 % 60
  const formattedDuration1 = `${hours1}ч ${minutes1}м`
  const duration2 = ticket.segments[1].duration
  const hours2 = Math.floor(duration2 / 60)
  const minutes2 = duration2 % 60
  const formattedDuration2 = `${hours2}ч ${minutes2}м`
  let stopsText1 = ''
  const stopsCount1 = ticket.segments[0].stops.length
  if (stopsCount1 === 0) {
    stopsText1 = 'нет пересадок'
  } else if (stopsCount1 === 1) {
    stopsText1 = '1 пересадка'
  } else if (stopsCount1 === 2) {
    stopsText1 = '2 пересадки'
  } else if (stopsCount1 === 3) {
    stopsText1 = '3 пересадки'
  }
  let stopsText2 = ''
  const stopsCount2 = ticket.segments[1].stops.length
  if (stopsCount2 === 0) {
    stopsText2 = 'нет пересадок'
  } else if (stopsCount2 === 1) {
    stopsText2 = '1 пересадка'
  } else if (stopsCount2 === 2) {
    stopsText2 = '2 пересадки'
  } else if (stopsCount2 === 3) {
    stopsText2 = '3 пересадки'
  }

  return (
    <section
      key={uuidv1()}
      className={clsx(classes.aviasales__ticket, classes.ticket)}
    >
      <div className={clsx(classes.ticket__header)}>
        <div className={clsx(classes.ticket__price)}>{ticket.price} Р</div>
        <img
          className={clsx(classes.ticket__img)}
          src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
          alt="Airline logo"
        />
      </div>
      <div className={clsx(classes.ticket__section)}>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            {ticket.segments[0].origin} – {ticket.segments[0].destination}
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            {formattedTimeRange1}
          </div>
        </div>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            В пути
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            {formattedDuration1}
          </div>
        </div>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            {stopsText1}
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            {ticket.segments[0].stops.join(', ')}
          </div>
        </div>
      </div>
      <div className={clsx(classes.ticket__section)}>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            {ticket.segments[1].origin} – {ticket.segments[1].destination}
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            {formattedTimeRange2}
          </div>
        </div>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            В пути
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            {formattedDuration2}
          </div>
        </div>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            {stopsText2}
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            {ticket.segments[1].stops.join(', ')}
          </div>
        </div>
      </div>
    </section>
  )
}
