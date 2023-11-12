import clsx from 'clsx'
import { Offline } from 'react-detect-offline'

import FilterTransplants from '../FilterTransplants'
import CategoryFilterTicket from '../CategoryFilterTicket'
import AviasalesTicket from '../AviasalesTicket'

import classes from './App.module.scss'

export const App = () => {
  return (
    <div className={clsx(classes['aviasales-container'], classes.aviasales)}>
      <div className={clsx(classes.logo)}>
        <div className={clsx(classes.globe)}>
          <div className={clsx(classes.plane)}></div>
        </div>
      </div>
      <div className={clsx(classes.filterTransplants)}>
        <FilterTransplants />
        <div className={clsx(classes.airTickets)}>
          <CategoryFilterTicket />
          <AviasalesTicket />
        </div>
      </div>
      <Offline>
        <p className={clsx(classes['aviasales-offline'])}>
          Вы находитесь в автономном режиме.
        </p>
      </Offline>
    </div>
  )
}
