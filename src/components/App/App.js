import clsx from 'clsx'

import FilterTransplants from '../FilterTransplants'
import CategoryFilterTicket from '../CategoryFilterTicket'
import AviasalesTicket from '../AviasalesTicket'
import ShowMore from '../ShowMore'

import classes from './App.module.scss'

export const App = () => {
  return (
    <div className={clsx(classes['aviasales-container'], classes.aviasales)}>
      <div className={clsx(classes.logo)}></div>
      <div className={clsx(classes.filterTransplants)}>
        <FilterTransplants />
        <div className={clsx(classes.airTickets)}>
          <CategoryFilterTicket />
          <AviasalesTicket />
          {/* <ShowMore /> */}
        </div>
      </div>
    </div>
  )
}
