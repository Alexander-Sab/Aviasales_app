import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'

import checkboxReducer, {
  setCheckboxValue,
  toggleAllCheckbox,
} from '../../store/checkboxReducer'

import classes from './FilterTransplants.module.scss'

export const FilterTransplants = () => {
  const checkboxes = useSelector((state) => state.checkboxes)
  const dispatch = useDispatch()

  const handleCheckboxChange = (checkboxName) => {
    if (checkboxName === 'all') {
      if (checkboxes.all) {
        dispatch(toggleAllCheckbox(false))
      } else {
        dispatch(toggleAllCheckbox(true))
      }
    } else {
      const newValue = !checkboxes[checkboxName]
      dispatch(setCheckboxValue(checkboxName, newValue))
    }
  }

  return (
    <section className={clsx(classes.aviasales__options)}>
      <div className={clsx(classes.aviasales__filter)}>
        <h3 className={clsx(classes['aviasales__filter-header'])}>
          Количество пересадок
        </h3>
        <ul className={clsx(classes['box-checkbox'])}>
          <li
            className={clsx(
              classes['aviasales__transfer-checkbox-container'],
              classes['checkbox-filter'],
            )}
          >
            <input
              className={clsx(classes['checkbox-filter__checkbox'])}
              type="checkbox"
              name="all"
              id={clsx(classes['transfer-all'])}
              checked={checkboxes.all}
              onChange={() => handleCheckboxChange('all')}
            />
            <label className={clsx(classes['checkbox-filter__label'])}>
              Все
            </label>
          </li>
          <li
            className={clsx(
              classes['aviasales__transfer-checkbox-container'],
              classes['checkbox-filter'],
            )}
          >
            <input
              className={clsx(classes['checkbox-filter__checkbox'])}
              type="checkbox"
              name="withoutTransfers"
              id={clsx(classes['transfer-all'])}
              checked={checkboxes.withoutTransfers}
              onChange={() => handleCheckboxChange('withoutTransfers')}
            />{' '}
            <label className={clsx(classes['checkbox-filter__label'])}>
              Без пересадок
            </label>
          </li>
          <li
            className={clsx(
              classes['aviasales__transfer-checkbox-container'],
              classes['checkbox-filter'],
            )}
          >
            <input
              className={clsx(classes['checkbox-filter__checkbox'])}
              type="checkbox"
              name="oneTransfer"
              id={clsx(classes['transfer-all'])}
              checked={checkboxes.oneTransfer}
              onChange={() => handleCheckboxChange('oneTransfer')}
            />
            <label className={clsx(classes['checkbox-filter__label'])}>
              1 пересадка
            </label>
          </li>
          <li
            className={clsx(
              classes['aviasales__transfer-checkbox-container'],
              classes['checkbox-filter'],
            )}
          >
            <input
              className={clsx(classes['checkbox-filter__checkbox'])}
              type="checkbox"
              name="twoTransfers"
              id={clsx(classes['transfer-all'])}
              checked={checkboxes.twoTransfers}
              onChange={() => handleCheckboxChange('twoTransfers')}
            />
            <label className={clsx(classes['checkbox-filter__label'])}>
              2 пересадки
            </label>
          </li>
          <li
            className={clsx(
              classes['aviasales__transfer-checkbox-container'],
              classes['checkbox-filter'],
            )}
          >
            <input
              className={clsx(classes['checkbox-filter__checkbox'])}
              type="checkbox"
              name="threeTransfers"
              id={clsx(classes['transfer-all'])}
              checked={checkboxes.threeTransfers}
              onChange={() => handleCheckboxChange('threeTransfers')}
            />
            <label className={clsx(classes['checkbox-filter__label'])}>
              3 пересадки
            </label>
          </li>
        </ul>
      </div>
    </section>
  )
}
