import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import { getTickets } from '../../services/AviasalesServices'
import {
  setCheckboxValue,
  toggleAllCheckbox,
} from '../../store/checkboxReducer'

import classes from './FilterTransplants.module.scss'

export const FilterTransplants = () => {
  const checkboxes = useSelector((state) => state.checkboxes)
  const dispatch = useDispatch()

  const handleCheckboxChange = (checkboxName) => {
    if (checkboxName === 'all') {
      dispatch(toggleAllCheckbox(!checkboxes.all))
    } else {
      const newValue = !checkboxes[checkboxName]
      dispatch(setCheckboxValue(checkboxName, newValue))
      if (checkboxName === 'withoutTransfers') {
        dispatch(setCheckboxValue('withoutTransfers', newValue))
      }
      if (checkboxName === 'oneTransfer') {
        dispatch(setCheckboxValue('oneTransfer', newValue))
      }
      if (checkboxName === 'twoTransfers') {
        dispatch(setCheckboxValue('twoTransfers', newValue))
      }
      if (checkboxName === 'threeTransfers') {
        dispatch(setCheckboxValue('threeTransfers', newValue))
      }
    }
    dispatch(getTickets())
  }

  const checkboxItems = [
    { name: 'all', label: 'Все' },
    { name: 'withoutTransfers', label: 'Без пересадок' },
    { name: 'oneTransfer', label: '1 пересадка' },
    { name: 'twoTransfers', label: '2 пересадки' },
    { name: 'threeTransfers', label: '3 пересадки' },
  ]

  return (
    <section className={clsx(classes.aviasales__options)}>
      <div className={clsx(classes.aviasales__filter)}>
        <h3 className={clsx(classes['aviasales__filter-header'])}>
          Количество пересадок
        </h3>
        <ul className={clsx(classes['box-checkbox'])}>
          {checkboxItems.map((item) => (
            <li
              key={item.name}
              className={clsx(
                classes['aviasales__transfer-checkbox-container'],
                classes['checkbox-filter'],
              )}
            >
              <input
                className={clsx(classes['checkbox-filter__checkbox'])}
                type="checkbox"
                name={item.name}
                id={clsx(classes['transfer-all'])}
                checked={checkboxes[item.name]}
                onChange={() => handleCheckboxChange(item.name)}
              />
              <label className={clsx(classes['checkbox-filter__label'])}>
                {item.label}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
