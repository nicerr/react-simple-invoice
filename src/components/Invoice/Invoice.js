import * as React from 'react'
import styles from './Invoice.module.scss'

import LineItems from './LineItems'

import uuidv4 from 'uuid/v4'

const { useState } = React

const Invoice = () => {
  const locale = 'en-ZA'
  const currency = 'ZAR'

  const [state, setState] = useState({
    taxRate: 14.0,
    lineItems: [
      {
        id: 'initial', // react-beautiful-dnd unique key
        name: '',
        description: '',
        quantity: 0,
        price: 0.0
      }
    ]
  })

  const handleInvoiceChange = event =>
    setState({ ...state, [event.target.name]: event.target.value })

  const handleLineItemChange = elementIndex => event => {
    let lineItems = state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return { ...item, [event.target.name]: event.target.value }
    })
    setState({ ...state, lineItems })
  }

  const handleAddLineItem = event =>
    setState({
      ...state,
      // use optimistic uuid for drag drop; in a production app this could be a database id
      lineItems: state.lineItems.concat([
        { id: uuidv4(), name: '', description: '', quantity: 0, price: 0.0 }
      ])
    })

  const handleRemoveLineItem = elementIndex => event =>
    setState({
      ...state,
      lineItems: state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })

  const handleReorderLineItems = newLineItems =>
    setState({ ...state, lineItems: newLineItems })

  const handleFocusSelect = event => event.target.select()

  const formatCurrency = amount =>
    new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount)

  // const calcTaxAmount = c => c * (state.taxRate / 100)

  const calcLineItemsTotal = () =>
    state.lineItems.reduce((prev, cur) => prev + cur.quantity * cur.price, 0)

  const calcTaxTotal = () => calcLineItemsTotal() * (state.taxRate / 100)

  const calcGrandTotal = () => calcLineItemsTotal() + calcTaxTotal()

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
        items={state.lineItems}
        currencyFormatter={formatCurrency}
        addHandler={handleAddLineItem}
        changeHandler={handleLineItemChange}
        focusHandler={handleFocusSelect}
        deleteHandler={handleRemoveLineItem}
        reorderHandler={handleReorderLineItems}
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
                  value={state.taxRate}
                  onChange={handleInvoiceChange}
                  onFocus={handleFocusSelect}
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
                {formatCurrency(calcLineItemsTotal())}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Tax ({state.taxRate}%)</div>
              <div className={`${styles.value} ${styles.currency}`}>
                {formatCurrency(calcTaxTotal())}
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.label}>Total Due</div>
              <div className={`${styles.value} ${styles.currency}`}>
                {formatCurrency(calcGrandTotal())}
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
