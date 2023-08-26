export const baseServerUrl = "http://localhost:4000"

export const createIdsQuery = ids =>
  ids !== undefined ?
    `?ids=${ids.join()}`
  :
    ""

