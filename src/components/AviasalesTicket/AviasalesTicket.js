import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { getTickets } from '../../store/actions'

import classes from './AviasalesTicket.module.scss'

export const AviasalesTicket = () => {
  const tickets = useSelector((state) => state.tickets)
  console.log(tickets)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTickets())
  }, [dispatch])
  return (
    <section className={clsx(classes.aviasales__ticket, classes.ticket)}>
      <div className={clsx(classes.ticket__header)}>
        <div className={clsx(classes.ticket__price)}>ticket.price</div>
        <img
          className={clsx(classes.ticket__img)}
          src="https://pics.avs.io/99/36/UT.png"
          alt="Airline logo"
        />
      </div>
      <div className={clsx(classes.ticket__section)}>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            MOW – HKT
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            10:45 – 08:00
          </div>
        </div>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            В пути
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            21ч 15м
          </div>
        </div>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            2 пересадки
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            HKG, JNB
          </div>
        </div>
      </div>

      <div className={clsx(classes.ticket__section)}>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            MOW – HKT
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            11:20 – 00:500
          </div>
        </div>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            В пути
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            13ч 30м
          </div>
        </div>
        <div className={clsx(classes['ticket__section-info'])}>
          <div className={clsx(classes['ticket__section-info--name'])}>
            1 пересадки
          </div>
          <div className={clsx(classes['ticket__section-info--value'])}>
            HKG
          </div>
        </div>
      </div>
    </section>
  )
}
