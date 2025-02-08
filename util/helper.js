export const mapAndClearErrors = (e) => {
  let prefix = e.content?.prefix
  return e.content?.errors?.map((e) => {
    let msg = e.message
    if (prefix && msg?.startsWith(prefix)) {
      msg = msg.slice(prefix.length)
    }
    return capitalize(msg)
  })
}

const capitalize = (msg) => msg.charAt(0).toUpperCase() + msg.slice(1)

export const throwError = (message, code = 400) => {
  const error = new Error()
  error.errors = [{ message }]
  error.code = code
  throw error
}
