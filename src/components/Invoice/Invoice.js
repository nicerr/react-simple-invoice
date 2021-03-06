import * as React from 'react'
import useLineItems from '../custom-hooks/useLineItems.js'
import styles from './Invoice.module.scss'

import LineItems from './LineItems'

import uuidv4 from 'uuid/v4'

const { useState } = React
const locale = 'en-ZA'
const currency = 'ZAR'

const Invoice = () => {
  const initialLineItems = [
    {
      id: 'initial', // react-beautiful-dnd unique key
      name: '',
      description: '',
      quantity: 0,
      price: 0.0
    }
  ]

  const lineItemTemplate = {
    id: uuidv4(),
    name: '',
    description: '',
    quantity: 0,
    price: 0.0
  }

  const lineItemReducer = (acc, { quantity, price }) => acc + quantity * price

  const [taxRate, setTaxRate] = useState(14.0)

  const [
    lineItems,
    {
      changeLineItem,
      addLineItem,
      removeLineItem,
      reorderLineItems,
      totalLineItems
    }
  ] = useLineItems(initialLineItems, lineItemTemplate)

  const calculateTax = () => totalLineItems(lineItemReducer) * (taxRate / 100)

  const totalTaxInclusive = () =>
    totalLineItems(lineItemReducer) + calculateTax()

  const selectFocus = event => event.target.select()

  const formatCurrency = amount =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)

  return (
    <div className={styles.invoice}>
      <div className={styles.brand}>
        <img
          src='https://via.placeholder.com/150x50.png?text=logo'
          alt='Logo'
          className={styles.logo}
        />
      </div>
      <div className={styles.addresses}>
        <div className={styles.from}>
          <strong>Amazing Company</strong>
          <br />
          123 Kensington Ave
          <br />
          Toronto, ON, Canada &nbsp;A1B2C3
          <br />
          416-555-1234
        </div>
        <div>
          <div className={`${styles.valueTable} ${styles.to}`}>
            <div className={styles.row}>
              <div className={styles.label}>Customer #</div>
              <div className={styles.value}>123456</div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Invoice #</div>
              <div className={styles.value}>123456</div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Date</div>
              <div className={`${styles.value} ${styles.date}`}>2019-01-01</div>
            </div>
          </div>
        </div>
      </div>
      <h2>Invoice</h2>

      <LineItems
        items={lineItems}
        currencyFormatter={formatCurrency}
        addHandler={addLineItem}
        changeHandler={changeLineItem}
        focusHandler={selectFocus}
        deleteHandler={removeLineItem}
        reorderHandler={reorderLineItems}
      />

      <div className={styles.totalContainer}>
        <form>
          <div className={styles.valueTable}>
            <div className={styles.row}>
              <div className={styles.label}>Tax Rate (%)</div>
              <div className={styles.value}>
                <input
                  name='taxRate'
                  type='number'
                  step='0.01'
                  value={taxRate}
                  onChange={e => setTaxRate(e.target.value)}
                  onFocus={selectFocus}
                />
              </div>
            </div>
          </div>
        </form>
        <form>
          <div className={styles.valueTable}>
            <div className={styles.row}>
              <div className={styles.label}>Subtotal</div>
              <div className={`${styles.value} ${styles.currency}`}>
                {formatCurrency(totalLineItems(lineItemReducer))}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Tax ({taxRate}%)</div>
              <div className={`${styles.value} ${styles.currency}`}>
                {formatCurrency(calculateTax())}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Total Due</div>
              <div className={`${styles.value} ${styles.currency}`}>
                {formatCurrency(totalTaxInclusive())}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className={styles.pay}>
        <button className={styles.payNow}>Pay Now</button>
      </div>

      <div className={styles.footer}>
        <div className={styles.comments}>
          <h4>Notes</h4>
          <div>
            By Kevin Firko, consulting developer at{' '}
            <a href='https://bitcurve.com'>Bitcurve Systems</a>. Check out my
            blog: <a href='https://firxworx.com'>https://firxworx.com</a>.
          </div>
        </div>
        <div className={styles.closing}>
          <div>Thank-you for your business</div>
        </div>
      </div>
    </div>
  )
}

export default Invoice
