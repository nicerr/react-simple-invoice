// @flow
import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import LineItem from './LineItem'

import { MdAddCircle as AddIcon } from 'react-icons/md'
import styles from './LineItems.module.scss'

type props = {
  items: Array<{
    id: string,
    name: string,
    description: string,
    quantity?: number,
    price?: number,
  }>,
  currencyFormatter: Function,
  addHandler: Function,
  changeHandler: Function,
  focusHandler: Function,
  deleteHandler: Function,
  reorderHandler: Function,
}

const LineItems = ({
  items,
  currencyFormatter,
  addHandler,
  changeHandler,
  focusHandler,
  deleteHandler,
  reorderHandler
}: props) => {
  const handleDragEnd = result => {
    if (!result.destination) return

    // helper function to reorder result (src: react-beautiful-dnd docs)
    const reorder = (list, startIndex, endIndex) => {
      const result = Array.from(list)
      const [removed] = result.splice(startIndex, 1)
      result.splice(endIndex, 0, removed)
      return result
    }

    // perform reorder
    const lineItems = reorder(
      items,
      result.source.index,
      result.destination.index
    )

    // call parent handler with new state representation
    reorderHandler(lineItems)
  }

  return (
    <form>
      <div className={styles.lineItems}>
        <div className={`${styles.gridTable}`}>
          <div className={`${styles.row} ${styles.header}`}>
            <div>#</div>
            <div>Item</div>
            <div>Description</div>
            <div>Qty</div>
            <div>Price</div>
            <div>Total</div>
            <div />
          </div>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId='droppable'>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={
                    snapshot.isDraggingOver ? styles.listDraggingOver : ''
                  }
                >
                  {items.map((item, i) => (
                    <Draggable key={item.id} draggableId={item.id} index={i}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                          className={
                            snapshot.isDragging ? styles.listItemDragging : ''
                          }
                        >
                          <LineItem
                            style={{ color: 'red' }}
                            key={i + item.id}
                            index={i}
                            name={item.name}
                            description={item.description}
                            quantity={item.quantity}
                            price={item.price}
                            currencyFormatter={currencyFormatter}
                            addHandler={addHandler}
                            changeHandler={changeHandler}
                            focusHandler={focusHandler}
                            deleteHandler={deleteHandler}
                            reorderHandler={reorderHandler}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>

        <div className={styles.addItem}>
          <button type='button' onClick={addHandler}>
            <AddIcon size='1.25em' className={styles.addIcon} /> Add Item
          </button>
        </div>
      </div>
    </form>
  )
}

export default LineItems
