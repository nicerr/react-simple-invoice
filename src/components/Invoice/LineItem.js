// @flow
import * as React from 'react'
import { MdCancel as DeleteIcon } from 'react-icons/md'
import styles from './LineItem.module.scss'

type props = {
  index: number,
  name: string,
  description: string,
  quantity: number,
  price: number,
  changeHandler: Function,
  focusHandler: Function,
  currencyFormatter: Function,
  deleteHandler: Function,
}

const LineItem = ({
  index,
  name,
  description,
  quantity,
  price,
  changeHandler,
  focusHandler,
  currencyFormatter,
  deleteHandler
}: props) => (
  <div className={styles.lineItem}>
    <div>{index + 1}</div>
    <div>
      <input
        name='name'
        type='text'
        value={name}
        onChange={changeHandler(index)}
      />
    </div>
    <div>
      <input
        name='description'
        type='text'
        value={description}
        onChange={changeHandler(index)}
      />
    </div>
    <div>
      <input
        name='quantity'
        type='number'
        step='1'
        value={quantity}
        onChange={changeHandler(index)}
        onFocus={focusHandler}
      />
    </div>
    <div className={styles.currency}>
      <input
        name='price'
        type='number'
        step='0.01'
        min='0.00'
        max='9999999.99'
        value={price}
        onChange={changeHandler(index)}
        onFocus={focusHandler}
      />
    </div>
    <div className={styles.currency}>{currencyFormatter(quantity * price)}</div>
    <div>
      <button
        type='button'
        className={styles.deleteItem}
        onClick={deleteHandler(index)}
      >
        <DeleteIcon size='1.25em' />
      </button>
    </div>
  </div>
)

export default LineItem
