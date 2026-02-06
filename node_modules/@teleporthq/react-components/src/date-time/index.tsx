import dayjs from 'dayjs'
import React from 'react'

const DateTimePrimitive = ({ date, format }) => {
  const dateTime = dayjs.unix(new Date(date).getTime() / 1000)
  const formattedDate = dayjs(dateTime).format(format)
  return <>{formattedDate}</>
}


export default DateTimePrimitive
