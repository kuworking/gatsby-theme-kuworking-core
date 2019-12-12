export const fixDate = string_date => {
  let [year, month, day] = string_date.split('.') // iOS is not understanding the date format
  month = parseInt(month) - 1
  return {
    date: new Date(year, month, day).toLocaleString('es-ES', {
      year: 'numeric',
      month: '2-digit',
      day: 'numeric',
    }),
    months: Math.floor((new Date(Date.now()) - new Date(year, month, day)) / (1000 * 60 * 60 * 24 * 30)),
  }
}

export const shuffle_array = array => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}

export const is_this_a_mobile_device = () =>
  typeof window !== `undefined` &&
  (typeof window.orientation !== 'undefined' || navigator.userAgent.indexOf('IEMobile') !== -1)

export const wait = ms => new Promise((res, rej) => setTimeout(() => res('timed'), ms))

export const get_response = async (url, request, times, time = 2000, json) => {
  const rq = request || get_request('GET')
  let response = await Promise.race([fetch(url, rq), wait(time)])
  let counter = 0

  for (const _ of [...Array(times)]) {
    if (counter >= times || response !== 'timed') break
    response = await Promise.race([fetch(url, request), wait(time)])
    counter++
  }

  if (response === 'timed') return
  return json ? await response.json() : response
}

export const get_request = method => ({
  crossDomain: true,
  referrerPolicy: 'origin-when-cross-origin',
  method: method,
  cache: 'no-cache',
  mode: 'cors',
  headers: {
    //    'Access-Control-Allow-Credentials': true,
    //    'Access-Control-Allow-Origin': '*',
    //    'Access-Control-Allow-Methods': 'GET, POST',
    //    'Access-Control-Allow-Headers': 'application/json',
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})
