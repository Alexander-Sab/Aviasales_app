import clsx from 'clsx'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import AviasalesTicketList from '../AviasalesTicketList'

import classes from './ShowMore.module.scss'

export const ShowMore = () => {
  const [ticketsToShow, setTicketsToShow] = useState(4)
  const filteredAndSorted =
    useSelector((state) => state.filteredAndSorted) || []

  const handleShowMore = () => {
    setTicketsToShow(ticketsToShow + 5)
  }

  const displayedTickets = filteredAndSorted.slice(0, ticketsToShow)

  return (
    <>
      {displayedTickets.map((ticket) => (
        <AviasalesTicketList ticket={ticket} key={ticket.id} />
      ))}

      {displayedTickets.length < filteredAndSorted.length && (
        <button
          className={clsx(classes['aviasales__show-more'])}
          onClick={handleShowMore}
        >
          ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
        </button>
      )}
    </>
  )
}
