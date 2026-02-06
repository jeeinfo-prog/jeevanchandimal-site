export default async function (params = {}) {
  let urlParams = {
    dataSourceId: 'b1593897-6386-4fb2-98e7-00672fcc4a9a',
    dataSourceType: 'rest-api',
    tableName: 'data',
  }
  let data = await fetch(
    `/api/data-source/b1593897-6386-4fb2-98e7-00672fcc4a9a/data?${new URLSearchParams(
      urlParams
    )}`,
    {
      method: 'GET',
    }
  )
  const response = await data.json()
  return response
}
