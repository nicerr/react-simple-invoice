import { useState } from 'react'

const useLineItems = (initialLineItems, lineItemTemplate) => {
  const [lineItems, setLineItems] = useState(initialLineItems)

  return [
    lineItems,
    {
      changeLineItem: elementIndex => event =>
        setLineItems([
          ...lineItems.filter((item, i) => elementIndex !== i),
          (lineItems[elementIndex] = {
            ...lineItems[elementIndex],
            [event.target.name]: event.target.value
          })
        ]),
      addLineItem: event =>
        // use optimistic uuid for drag drop; in a production app this could be a database id
        setLineItems([...lineItems, lineItemTemplate]),

      removeLineItem: elementIndex => event =>
        setLineItems(lineItems.filter((item, i) => elementIndex !== i)),

      reorderLineItems: newLineItems => setLineItems(newLineItems),

      totalLineItems: reducer => lineItems.reduce(reducer, 0)
    }
  ]
}

export default useLineItems
