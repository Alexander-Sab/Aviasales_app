import clsx from 'clsx'
import { format, add } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTickets } from '../../store/actions'

import classes from './AviasalesTicket.module.scss'

export const AviasalesTicket = () => {
  const { tickets } = useSelector((state) => state.tickets)
  const [isTicketsLoading, setIsTicketsLoading] = useState(true)
  console.log(tickets)
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
  }, [dispatch])

  const firstFiveTickets = tickets.slice(0, 5) // Ограничение до первых пяти билетов
  // фильтр
  const [selectedFilters, setSelectedFilters] = useState({
    all: true,
    withoutTransfers: true,
    oneTransfer: true,
    twoTransfers: true,
    threeTransfers: true,
  })

  const [sortType, setSortType] = useState('default')
  // Фильтрация билетов
  const filteredTickets = tickets.filter((ticket) => {
    // Применение фильтров
    if (selectedFilters.all) {
      return true
    }
    return selectedFilters[ticket.transfers.length]
  })

  // Сортировка билетов
  const sortedTickets = filteredTickets.sort((a, b) => {
    if (sortType === 'price') {
      return a.price - b.price
    } else if (sortType === 'duration') {
      return (
        a.segments.reduce(
          (totalDuration, segment) => totalDuration + segment.duration,
          0,
        ) -
        b.segments.reduce(
          (totalDuration, segment) => totalDuration + segment.duration,
          0,
        )
      )
    }
    return 0
  })

  // Отображение билетов

  return (
    <>
      {firstFiveTickets.length === 0 ? (
        <div className={clsx(classes['aviasales__ticket-error'])}>
          <div className={clsx(classes['viasales__ticket-error__icons'])}></div>
          <p className={clsx(classes['aviasales__ticket-error__text'])}>
            К сожалению, билетов по вашему запросу не найдено. <br /> Попробуйте
            изменить параметры поиска или повторить позже.
          </p>
        </div>
      ) : (
        <>
          {firstFiveTickets.map((ticket) => {
            // Время 1
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
            // Время 2
            const duration1 = ticket.segments[0].duration
            const hours1 = Math.floor(duration1 / 60)
            const minutes1 = duration1 % 60
            const formattedDuration1 = `${hours1}ч ${minutes1}м`
            const duration2 = ticket.segments[0].duration
            const hours2 = Math.floor(duration2 / 60)
            const minutes2 = duration2 % 60
            const formattedDuration2 = `${hours2}ч ${minutes2}м`

            return (
              <section
                key={`${ticket.price}`}
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
                      2 пересадки
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
                      1 пересадки
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
