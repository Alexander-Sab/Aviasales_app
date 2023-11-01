import axios from 'axios'

const baseUrl = 'https://aviasales-test-api.kata.academy'

export const fetchTickets = () => async (dispatch) => {
  try {
    const searchIdResponse = await axios.get(`${baseUrl}/search`)
    const { searchId } = searchIdResponse.data

    let tickets = []
    let stop = false

    while (!stop) {
      try {
        const ticketsResponse = await axios.get(
          `${baseUrl}/tickets?searchId=${searchId}`,
        )

        if (!ticketsResponse.data.ok) {
          throw new Error('Ошибка при получении билетов')
        }

        const { tickets: newTickets, stop: newStop } = ticketsResponse.data
        tickets = [...tickets, ...newTickets]
        stop = newStop
      } catch (error) {
        // Игнорирование ошибки net::ERR_CONNECTION_TIMED_OUT
        if (error.code !== 'ECONNABORTED') {
          throw error
        }
      }
    }

    dispatch({ type: 'FETCH_TICKETS_SUCCESS', payload: tickets })
  } catch (error) {
    dispatch({ type: 'FETCH_TICKETS_FAILURE', payload: error.message })
  }
}

export const getTickets = () => async (dispatch) => {
  try {
    dispatch({ type: 'FETCH_TICKETS_REQUEST' })
    await dispatch(fetchTickets())
    dispatch({ type: 'FETCH_TICKETS_COMPLETE' })
  } catch (error) {
    dispatch({ type: 'FETCH_TICKETS_ERROR', payload: error.message })
  }
}

export default getTickets
