import { useEffect, useState } from 'react';
import cn from 'classnames';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

import { setFilter } from '../../store/aviasales';

import css from './Filter.module.scss';

const Filter = ({ filter, setFilter }) => {
  const [isAll, setIsAll] = useState(false);
  const [filterItems, setFItems] = useState({
    '0_transfers': { label: 'Без пересадок', checked: false },
    '1_transfer': { label: '1 пересадка', checked: false },
    '2_transfers': { label: '2 пересадки', checked: false },
    '3_transfers': { label: '3 пересадки', checked: false },
  });

  const toggleAllFilter = (isChecked) => {
    setIsAll(isChecked);
    setFilter(isChecked ? Object.keys(filterItems) : []);
  };

  const toggleFilter = (isChecked, val) => {
    const newConfig = [];
    for (const k in filterItems) {
      if (k == val) {
        if (isChecked) newConfig.push(k);
      } else {
        if (filterItems[k].checked) newConfig.push(k);
      }
    }
    setFilter(newConfig);
  };

  useEffect(() => {
    buildItemsFromConfig(filter);
  }, [filter]);

  const buildItemsFromConfig = (cfg) => {
    if (cfg.length === Object.keys(filterItems).length) {
      setIsAll(true);
    } else {
      setIsAll(false);
    }

    setFItems((items) => {
      const newItems = {};
      for (const k in items) {
        newItems[k] = { ...items[k], checked: cfg.includes(k) };
      }
      return newItems;
    });
  };

  const fItems = [];
  for (const k in filterItems) {
    fItems.push(<FilterItem key={k} value={k} onClick={toggleFilter} {...filterItems[k]} />);
  }

  return (
    <div className={cn(css.Filter, 'boxShadow', 'borderRadius')}>
      <span className={css.label}>Количество пересадок</span>
      <FilterItem value="all" label={'Все'} checked={isAll} onClick={toggleAllFilter} />
      {fItems}
    </div>
  );
};

Filter.defaultProps = {
  setFilter: () => {},
  filter: [],
};
Filter.propTypes = {
  setFilter: propTypes.func,
  filter: propTypes.array,
};

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

export default connect(mapStateToProps, { setFilter })(Filter);

const FilterItem = ({ value, label, checked, onClick }) => {
  return (
    <label className={css.item}>
      <input
        type="checkbox"
        value={value}
        className={css.checkbox}
        checked={checked}
        onChange={() => {
          onClick(!checked, value);
        }}
      />
      <span className={css.visualCheckBox}></span>
      {label}
    </label>
  );
};

FilterItem.defaultProps = {
  value: undefined,
  label: undefined,
  checked: false,
  onClick: () => {},
};

FilterItem.propTypes = {
  value: propTypes.string,
  label: propTypes.string,
  checked: propTypes.bool,
  onClick: propTypes.func,
};
