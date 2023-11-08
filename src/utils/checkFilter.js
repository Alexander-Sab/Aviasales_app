/* eslint-disable no-return-assign */
const totalDuration = (data) =>
  // eslint-disable-next-line no-param-reassign
  data.segments.reduce((acc, prev) => (acc += prev.duration), 0)

// eslint-disable-next-line import/no-mutable-exports
let newTickets = {}

// eslint-disable-next-line consistent-return
const checkFilter = (checkedFilter, ticketsData) => {
  switch (checkedFilter) {
    case 'cheap':
      return (newTickets = [
        ...ticketsData.sort((prev, next) => prev.price - next.price),
      ])

    case 'fast':
      return (newTickets = [
        ...ticketsData.sort(
          (prev, next) => totalDuration(prev) - totalDuration(next),
        ),
      ])

    case 'optimal':
      return (newTickets = [
        ...ticketsData.sort((prev, next) => {
          const optimalPrev = prev.price + totalDuration(prev)
          const optimalNext = next.price + totalDuration(next)

          return optimalPrev - optimalNext
        }),
      ])

    default:
      return newTickets
  }
}

// eslint-disable-next-line import/prefer-default-export
export { checkFilter }
