import clsx from 'clsx'
import { Spin } from 'antd'
import { v1 as uuidv1 } from 'uuid'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTickets } from '../../services/AviasalesServices'
import AviasalesTicketList from '../AviasalesTicketList'

import classes from './AviasalesTicket.module.scss'

export const AviasalesTicket = () => {
  const { tickets, loading, error } = useSelector((state) => state.tickets)
  const [isTicketsLoading, setIsTicketsLoading] = useState(true)
  const selectedFilters = useSelector((state) => state.checkboxes)
  const selectedFilter = useSelector((state) => state.filters.selectedFilter)
  const [displayedTickets, setDisplayedTickets] = useState(5)
  const dispatch = useDispatch()

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setTimeout(() => {
          setIsTicketsLoading(false)
        }, 1000)
        dispatch(getTickets())
      } catch (error) {
        console.error(error)
        setIsTicketsLoading(false)
      }
    }
    fetchTickets()
  }, [dispatch, selectedFilters])

  const sortTickets = (allTickets, sortBy) => {
    if (!sortBy || sortBy === 'none') {
      return allTickets
    }
    switch (sortBy) {
      case 'cheapest':
        return [...allTickets].sort((a, b) => a.price - b.price)
      case 'fastest':
        return [...allTickets].sort((a, b) => {
          const totalDurationA = a.segments.reduce(
            (acc, segment) => acc + segment.duration,
            0,
          )
          const totalDurationB = b.segments.reduce(
            (acc, segment) => acc + segment.duration,
            0,
          )
          return totalDurationA - totalDurationB
        })
      case 'optimal':
        return allTickets
      default:
        return allTickets
    }
  }

  const filteredTickets = (allTickets, activeFilters, selectedFilter) =>
    allTickets.filter((ticket) => {
      const transfersCountForBothSegments = ticket.segments.map(
        (segment) => segment.stops.length,
      )
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

  const filteredAndSortedTickets = sortTickets(
    filteredTickets(tickets, selectedFilters, selectedFilter),
    selectedFilter,
  )

  const handleShowMoreTickets = () => {
    setDisplayedTickets((prevDisplayedTickets) => prevDisplayedTickets + 5)
  }

  return (
    <>
      {isTicketsLoading ? (
        <div className={clsx(classes['aviasales__ticket-large'])}>
          <Spin
            className={clsx(classes['aviasales__ticket-large__spin'])}
            size="large"
          />
        </div>
      ) : error ? (
        <div className={clsx(classes['aviasales__ticket-error'])}>
          <div
            className={clsx(
              classes['viasales__ticket-error__offline-icons'],
              classes.icons,
            )}
          ></div>
          <p className={clsx(classes['aviasales__ticket-error__offline-text'])}>
            Отсудствует интернет!
          </p>
        </div>
      ) : filteredAndSortedTickets.length === 0 ? (
        <div className={clsx(classes['aviasales__ticket-error'])}>
          <div
            className={clsx(
              classes['viasales__ticket-error__icons'],
              classes.icons,
            )}
          ></div>
          <p className={clsx(classes['aviasales__ticket-error__text'])}>
            К сожалению, билетов по вашему запросу не найдено. <br /> Попробуйте
            изменить параметры поиска или повторить позже.
          </p>
        </div>
      ) : (
        <>
          {filteredAndSortedTickets.slice(0, displayedTickets).map((ticket) => (
            <AviasalesTicketList ticket={ticket} key={uuidv1()} />
          ))}
          <button
            className={clsx(classes['aviasales__show-more'])}
            onClick={handleShowMoreTickets}
          >
            показать еще 5 билетов!
          </button>
        </>
      )}
    </>
  )
}

export default AviasalesTicket
