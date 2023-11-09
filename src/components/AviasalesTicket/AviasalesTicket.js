import clsx from 'clsx'
import { v1 as uuidv1 } from 'uuid'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTickets } from '../../store/actions'
import AviasalesTicketList from '../AviasalesTicketList'
import { setSelectedFilter } from '../../store/filtersSlice'

import classes from './AviasalesTicket.module.scss'

export const AviasalesTicket = () => {
  const { tickets, loading, error } = useSelector((state) => state.tickets)
  console.log('AviasalesTicket - tickets', tickets)
  const [isTicketsLoading, setIsTicketsLoading] = useState(true)
  const selectedFilters = useSelector((state) => state.checkboxes)
  const selectedFilter = useSelector((state) => state.filters.selectedFilter)
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
  // Функция для сортировки билетов
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
        // Добавьте свою логику сортировки для оптимального фильтра
        return allTickets
      default:
        return allTickets
    }
  }
  // Фильтер билетов

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

  // Сохраняем отфильтрованные и отсортированные билеты в переменную
  const filteredAndSorted = sortTickets(
    filteredTickets(tickets, selectedFilters, selectedFilter),
    selectedFilter,
  )

  console.log('filteredAndSorted', filteredAndSorted)
  return (
    <>
      {isTicketsLoading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error: {error.message}</div>
      ) : filteredAndSorted.length === 0 ? (
        <div className={clsx(classes['aviasales__ticket-error'])}>
          <div className={clsx(classes['viasales__ticket-error__icons'])}></div>
          <p className={clsx(classes['aviasales__ticket-error__text'])}>
            К сожалению, билетов по вашему запросу не найдено. <br /> Попробуйте
            изменить параметры поиска или повторить позже.
          </p>
        </div>
      ) : (
        <>
          {filteredAndSorted.map((ticket) => (
            <AviasalesTicketList ticket={ticket} key={uuidv1()} />
          ))}
        </>
      )}
    </>
  )
}
