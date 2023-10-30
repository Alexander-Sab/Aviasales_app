import clsx from 'clsx'

import classes from './ShowMore.module.scss'
export const ShowMore = () => {
  return (
    <button className={clsx(classes['aviasales__show-more'])}>
      ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!
    </button>
  )
}
