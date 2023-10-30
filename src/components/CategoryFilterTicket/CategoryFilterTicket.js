import clsx from 'clsx'

import classes from './CategoryFilterTicket.module.scss'

export const CategoryFilterTicket = () => {
  return (
    <section className={clsx(classes.aviasales__tickets)}>
      <div
        className={clsx(
          classes['aviasales__ticket-category-filter'],
          classes['category-filter'],
        )}
      >
        <button
          className={clsx(classes['category-filter__option'], classes.selected)}
        >
          САМЫЙ ДЕШЕВЫЙ
        </button>
        <button className={clsx(classes['category-filter__option'])}>
          САМЫЙ БЫСТРЫЙ
        </button>
        <button className={clsx(classes['category-filter__option'])}>
          ОПТИМАЛЬНЫЙ
        </button>
      </div>
    </section>
  )
}
