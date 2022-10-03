export const getAll = async (): Promise<Array<unknown>> => {
  const response = await fetch('https://restcountries.com/v3.1/all')
  const result = await response.json()
  return result
}

export const getCountry = async (code: string) => {
  const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
  const result = await response.json()
  if (result.length) {
    return result[0]
  }
  return result
}
