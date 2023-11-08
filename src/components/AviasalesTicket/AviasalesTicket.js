import clsx from 'clsx'
import { v1 as uuidv1 } from 'uuid'
import { format, add } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTickets } from '../../store/actions'

import classes from './AviasalesTicket.module.scss'

export const AviasalesTicket = () => {
  const { tickets, loading, error } = useSelector((state) => state.tickets)
  console.log('AviasalesTicket - tickets', tickets)
  const [isTicketsLoading, setIsTicketsLoading] = useState(true)
  const selectedFilters = useSelector((state) => state.checkboxes)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        dispatch(getTickets())
        setIsTicketsLoading(false)
      } catch (error) {
        console.error(error)
        setIsTicketsLoading(false)
      }
    }
    fetchTickets()
  }, [dispatch, selectedFilters])
  // Фильтер билетов

  const filteredTickets = (allTickets, activeFilters) =>
    allTickets.filter((ticket) => {
      const transfersCountForBothSegments = ticket.segments.map(
        (segment) => segment.stops.length,
      )
      // console.log(
      //   'transfersCountForBothSegments',
      //   transfersCountForBothSegments,
      // )
      if (
        activeFilters &&
        activeFilters.withoutTransfers &&
        transfersCountForBothSegments.every((count) => count === 0)
      ) {
        return true
      }
      if (
        activeFilters &&
        activeFilters.oneTransfer &&
        transfersCountForBothSegments.every((count) => count === 1)
      ) {
        return true
      }
      if (
        activeFilters &&
        activeFilters.twoTransfers &&
        transfersCountForBothSegments.every((count) => count === 2)
      ) {
        return true
      }
      if (
        activeFilters &&
        activeFilters.threeTransfers &&
        transfersCountForBothSegments.every((count) => count === 3)
      ) {
        return true
      }
      return false
    })

  // Сохраняем отфильтрованные билеты в переменную
  const filtered = filteredTickets(tickets, selectedFilters)
  console.log('filtered', filtered)
  return (
    <>
      {isTicketsLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : filtered.length === 0 ? (
        <div className={clsx(classes['aviasales__ticket-error'])}>
          <div className={clsx(classes['viasales__ticket-error__icons'])}></div>
          <p className={clsx(classes['aviasales__ticket-error__text'])}>
            К сожалению, билетов по вашему запросу не найдено. <br /> Попробуйте
            изменить параметры поиска или повторить позже.
          </p>
        </div>
      ) : (
        <>
          {filtered.map((ticket) => {
            const departureTime1 = format(
              new Date(ticket.segments[0].date),
              'HH:mm',
            )
            const arrivalTime1 = format(
              add(new Date(ticket.segments[1].date), {
                minutes: ticket.segments[1].duration,
              }),
              'HH:mm',
            )
            const formattedTimeRange1 = `${departureTime1} – ${arrivalTime1}`
            const departureTime2 = format(
              new Date(ticket.segments[1].date),
              'HH:mm',
            )
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
                  <div className={clsx(classes.ticket__price)}>
                    {ticket.price} Р
                  </div>
                  <img
                    className={clsx(classes.ticket__img)}
                    src={`https://pics.avs.io/99/36/${ticket.carrier}.png`}
                    alt="Airline logo"
                  />
                </div>
                <div className={clsx(classes.ticket__section)}>
                  <div className={clsx(classes['ticket__section-info'])}>
                    <div
                      className={clsx(classes['ticket__section-info--name'])}
                    >
                      {ticket.segments[0].origin} –{' '}
                      {ticket.segments[0].destination}
                    </div>
                    <div
                      className={clsx(classes['ticket__section-info--value'])}
                    >
                      {formattedTimeRange1}
                    </div>
                  </div>
                  <div className={clsx(classes['ticket__section-info'])}>
                    <div
                      className={clsx(classes['ticket__section-info--name'])}
                    >
                      В пути
                    </div>
                    <div
                      className={clsx(classes['ticket__section-info--value'])}
                    >
                      {formattedDuration1}
                    </div>
                  </div>
                  <div className={clsx(classes['ticket__section-info'])}>
                    <div
                      className={clsx(classes['ticket__section-info--name'])}
                    >
                      {stopsText1}
                    </div>
                    <div
                      className={clsx(classes['ticket__section-info--value'])}
                    >
                      {ticket.segments[0].stops.join(', ')}
                    </div>
                  </div>
                </div>
                <div className={clsx(classes.ticket__section)}>
                  <div className={clsx(classes['ticket__section-info'])}>
                    <div
                      className={clsx(classes['ticket__section-info--name'])}
                    >
                      {ticket.segments[1].origin} –{' '}
                      {ticket.segments[1].destination}
                    </div>
                    <div
                      className={clsx(classes['ticket__section-info--value'])}
                    >
                      {formattedTimeRange2}
                    </div>
                  </div>
                  <div className={clsx(classes['ticket__section-info'])}>
                    <div
                      className={clsx(classes['ticket__section-info--name'])}
                    >
                      В пути
                    </div>
                    <div
                      className={clsx(classes['ticket__section-info--value'])}
                    >
                      {formattedDuration2}
                    </div>
                  </div>
                  <div className={clsx(classes['ticket__section-info'])}>
                    <div
                      className={clsx(classes['ticket__section-info--name'])}
                    >
                      {stopsText2}
                    </div>
                    <div
                      className={clsx(classes['ticket__section-info--value'])}
                    >
                      {ticket.segments[1].stops.join(', ')}
                    </div>
                  </div>
                </div>
              </section>
            )
          })}
        </>
      )}
    </>
  )
}
