export const checkSort = (sortStatus, tickets) => {
  const activeSorts = Object.entries(sortStatus)
    .slice(1)
    .filter(([_, val]) => val)
    .map(([index]) => parseInt(index))

  const sortedTickets = [...tickets].sort((a, b) => {
    const seg1StopsCountA = a.segments[0].stops.length
    const seg1StopsCountB = b.segments[0].stops.length
    const seg2StopsCountA = a.segments[1].stops.length
    const seg2StopsCountB = b.segments[1].stops.length

    if (
      activeSorts.includes(seg1StopsCountA) &&
      activeSorts.includes(seg1StopsCountB)
    ) {
      if (seg1StopsCountA < seg1StopsCountB) return -1
      if (seg1StopsCountA > seg1StopsCountB) return 1
    }

    if (
      activeSorts.includes(seg2StopsCountA) &&
      activeSorts.includes(seg2StopsCountB)
    ) {
      if (seg2StopsCountA < seg2StopsCountB) return -1
      if (seg2StopsCountA > seg2StopsCountB) return 1
    }

    return 0
  })

  return sortedTickets
}
