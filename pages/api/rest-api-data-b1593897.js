import fetch from 'node-fetch'

async function fetchData(params = {}) {
  const req = {
    query: params,
    method: 'GET',
  }
  
  let result = null
  let statusCode = 200
  
  const res = {
    status: (code) => {
      statusCode = code
      return res
    },
    json: (data) => {
      result = data
      return res
    },
  }
  
  await handler(req, res)
  
  if (statusCode !== 200 || !result || !result.success) {
    throw new Error(result?.error || 'Failed to fetch data')
  }
  
  return result.data
}

async function fetchCount(params = {}) {
  const req = {
    query: params,
    method: 'GET',
  }
  
  let result = null
  let statusCode = 200
  
  const res = {
    status: (code) => {
      statusCode = code
      return res
    },
    json: (data) => {
      result = data
      return res
    },
  }
  
  await getCount(req, res)
  
  if (statusCode !== 200 || !result || !result.success) {
    throw new Error(result?.error || 'Failed to get count')
  }
  
  return result.count
}

async function getCount(req, res) {
  try {
    const { query, queryColumns, filters } = req.query
    const fakeReq = { query: { query, queryColumns, filters }, method: 'GET' }
    let result = null
    let statusCode = 200
    
    const fakeRes = {
      status: (code) => {
        statusCode = code
        return fakeRes
      },
      json: (data) => {
        result = data
        return fakeRes
      },
    }
    
    await handler(fakeReq, fakeRes)
    
    if (statusCode !== 200 || !result || !result.success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to get data for counting',
        timestamp: Date.now()
      })
    }
    
    const count = Array.isArray(result.data) ? result.data.length : 0
    
    return res.status(200).json({
      success: true,
      count: count,
      timestamp: Date.now()
    })
  } catch (error) {
    console.error('Error getting count:', error)
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to get count',
      timestamp: Date.now()
    })
  }
}

const safeJSONParse = (value) => {
  if (!value) return value
  if (typeof value === 'object') return value
  try {
    return JSON.parse(value)
  } catch (e) {
    console.warn('Failed to parse JSON:', e)
    return value
  }
}

const formatDateValue = (date) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }
  
  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
  }
  
  const hasTime = date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0
  
  if (hasTime) {
    return date.toLocaleString('en-US', { ...options, ...timeOptions })
  }
  
  return date.toLocaleDateString('en-US', options)
}

const dateReplacer = (key, value) => {
  if (value instanceof Date) {
    return formatDateValue(value)
  }
  return value
}

function getNestedValue(obj, path) {
  if (!obj || typeof obj !== 'object') return undefined
  const keys = path.split('.')
  let value = obj
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key]
    } else {
      return undefined
    }
  }
  return value
}

function compareValues(value, target, operand) {
  if (value === null || value === undefined || target === null || target === undefined) {
    switch (operand) {
      case '=': return value == target
      case '!=': return value != target
      default: return false
    }
  }

  if (typeof value === 'number' && typeof target === 'number') {
    switch (operand) {
      case '=': return value === target
      case '!=': return value !== target
      case '>': return value > target
      case '>=': return value >= target
      case '<': return value < target
      case '<=': return value <= target
      default: return true
    }
  }

  if (typeof value === 'string' && typeof target === 'string') {
    switch (operand) {
      case '=': return value === target
      case '!=': return value !== target
      case '>': return value > target
      case '>=': return value >= target
      case '<': return value < target
      case '<=': return value <= target
      default: return true
    }
  }

  const valueDate = value instanceof Date ? value : (typeof value === 'string' ? new Date(value) : null)
  const targetDate = target instanceof Date ? target : (typeof target === 'string' ? new Date(target) : null)
  if (valueDate && targetDate && !isNaN(valueDate.getTime()) && !isNaN(targetDate.getTime())) {
    const valueTime = valueDate.getTime()
    const targetTime = targetDate.getTime()
    switch (operand) {
      case '=': return valueTime === targetTime
      case '!=': return valueTime !== targetTime
      case '>': return valueTime > targetTime
      case '>=': return valueTime >= targetTime
      case '<': return valueTime < targetTime
      case '<=': return valueTime <= targetTime
      default: return true
    }
  }

  if (Array.isArray(value) && Array.isArray(target)) {
    switch (operand) {
      case '=': return JSON.stringify(value) === JSON.stringify(target)
      case '!=': return JSON.stringify(value) !== JSON.stringify(target)
      case '>': return value.length > target.length
      case '>=': return value.length >= target.length
      case '<': return value.length < target.length
      case '<=': return value.length <= target.length
      default: return true
    }
  }

  if (Array.isArray(value) && !Array.isArray(target)) {
    switch (operand) {
      case '=': return value.includes(target)
      case '!=': return !value.includes(target)
      default: return false
    }
  }

  if (typeof value === 'object' && typeof target === 'object') {
    switch (operand) {
      case '=': return JSON.stringify(value) === JSON.stringify(target)
      case '!=': return JSON.stringify(value) !== JSON.stringify(target)
      default: return false
    }
  }

  switch (operand) {
    case '=': return value == target
    case '!=': return value != target
    case '>': return Number(value) > Number(target)
    case '>=': return Number(value) >= Number(target)
    case '<': return Number(value) < Number(target)
    case '<=': return Number(value) <= Number(target)
    default: return true
  }
}

async function handler(req, res) {
  try {
    const { query, queryColumns, limit, page, perPage, sortBy, sortOrder, filters, sorts, offset } = req.query
    
    const url = "http://jc-headless.local/wp-json/wp/v2/project"
    const method = "GET"
    
    const headers = {}
    
    
    const options = {
      method,
      headers
    }
    
    
    
    const response = await fetch(url, options)
    
    if (!response.ok) {
      return res.status(response.status).json({
        success: false,
        error: `HTTP ${response.status}: ${response.statusText}`,
        timestamp: Date.now()
      })
    }
    
    let data = await response.json()
    
    if (Array.isArray(data)) {
      if (query && query.trim()) {
        const searchQuery = query.toLowerCase()
        
        if (queryColumns) {
          try {
            const parsed = safeJSONParse(queryColumns)
            const columns = Array.isArray(parsed) ? parsed : [parsed]
            data = data.filter((item) => {
              return columns.some((col) => {
                const value = getNestedValue(item, col)
                if (value === null || value === undefined) return false
                return String(value).toLowerCase().includes(searchQuery)
              })
            })
          } catch (err) {
            console.error('Error parsing queryColumns:', err)
          }
        } else {
          data = data.filter((item) => {
            try {
              const stringified = JSON.stringify(item).toLowerCase()
              return stringified.includes(searchQuery)
            } catch {
              return false
            }
          })
        }
      }
      
      if (filters) {
        try {
          const parsedFilters = safeJSONParse(filters)
          
          if (Array.isArray(parsedFilters)) {
            data = data.filter((item) => {
              return parsedFilters.every((filter) => {
                if (!filter.source || filter.destination === undefined) return true
                
                const field = filter.source
                const value = getNestedValue(item, field)
                const target = filter.destination
                const operand = filter.operand || '='
                
                if (Array.isArray(target)) {
                  if (operand === '!=') {
                    return !target.includes(value)
                  }
                  return target.includes(value)
                }
                
                return compareValues(value, target, operand)
              })
            })
          } else {
            data = data.filter((item) => {
              return Object.entries(parsedFilters).every(([key, value]) => {
                const itemValue = getNestedValue(item, key)
                if (Array.isArray(value)) {
                  return value.includes(itemValue)
                }
                return compareValues(itemValue, value, '=')
              })
            })
          }
        } catch (err) {
          console.error('Error parsing filters:', err)
        }
      }
      
      if (sorts) {
        try {
          const parsedSorts = safeJSONParse(sorts)
          if (Array.isArray(parsedSorts) && parsedSorts.length > 0) {
            data.sort((a, b) => {
              for (const sort of parsedSorts) {
                if (!sort.field) continue
                const aVal = getNestedValue(a, sort.field)
                const bVal = getNestedValue(b, sort.field)
                const sortOrderValue = sort.order?.toLowerCase() === 'desc' ? -1 : 1
                
                let comparison = 0
                if (aVal === null || aVal === undefined) {
                  comparison = bVal === null || bVal === undefined ? 0 : -1
                } else if (bVal === null || bVal === undefined) {
                  comparison = 1
                } else if (typeof aVal === 'number' && typeof bVal === 'number') {
                  comparison = aVal - bVal
                } else if (aVal instanceof Date && bVal instanceof Date) {
                  comparison = aVal.getTime() - bVal.getTime()
                } else {
                  const aStr = String(aVal)
                  const bStr = String(bVal)
                  if (aStr < bStr) comparison = -1
                  else if (aStr > bStr) comparison = 1
                }
                
                if (comparison !== 0) return comparison * sortOrderValue
              }
              return 0
            })
          }
        } catch (err) {
          console.error('Error parsing sorts:', err)
        }
      } else if (sortBy && sortBy.trim()) {
        data.sort((a, b) => {
          const aVal = getNestedValue(a, sortBy)
          const bVal = getNestedValue(b, sortBy)
          const sortOrderValue = sortOrder?.toLowerCase() === 'desc' ? -1 : 1
          
          let comparison = 0
          if (aVal === null || aVal === undefined) {
            comparison = bVal === null || bVal === undefined ? 0 : -1
          } else if (bVal === null || bVal === undefined) {
            comparison = 1
          } else if (typeof aVal === 'number' && typeof bVal === 'number') {
            comparison = aVal - bVal
          } else if (aVal instanceof Date && bVal instanceof Date) {
            comparison = aVal.getTime() - bVal.getTime()
          } else {
            const aStr = String(aVal)
            const bStr = String(bVal)
            if (aStr < bStr) comparison = -1
            else if (aStr > bStr) comparison = 1
          }
          
          return comparison * sortOrderValue
        })
      }
      
      const limitValue = limit || perPage
      const pageValue = page ? Math.max(1, parseInt(page)) : undefined
      const offsetValue = offset !== undefined ? Math.max(0, parseInt(offset)) : (pageValue && perPage ? (pageValue - 1) * Math.max(1, parseInt(perPage)) : 0)
      
      if (limitValue) {
        const limitInt = Math.max(1, parseInt(limitValue))
        data = data.slice(offsetValue, offsetValue + limitInt)
      } else if (offsetValue > 0) {
        data = data.slice(offsetValue)
      }
    }
    
    const safeData = JSON.parse(JSON.stringify(data, dateReplacer))
    
    return res.status(200).json({
      success: true,
      data: safeData,
      timestamp: Date.now()
    })
  } catch (error) {
    console.error('REST API fetch error:', error)
    return res.status(500).json({
      success: false,
      error: error.message || 'Failed to fetch data',
      timestamp: Date.now()
    })
  }
}

export default handler
