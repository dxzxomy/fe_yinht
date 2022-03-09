
export function getSortClass(key, sort) {
  return sort === `+${key}` ? 'ascending' : 'descending'
}

export function sortByID(order) {
  return order === 'ascending' ? '+id' : '-id'
}

export function sortChange(data) {
  const { prop, order } = data
  if (prop === 'id') {
    return sortByID(order)
  }
}

export function nodeIdC2N(id, node_list) {
  const node = node_list.find(e=> {
    return e.id === id
  })
  if (node) {return node.name}
  return '未绑定节点'
}

export function pagination(array, pageNo, pageSize) {
  const offset = (pageNo - 1) * pageSize
  if (array) {
    const data = (offset + pageSize >= array.length)
      ? array.slice(offset, array.length)
      : array.slice(offset, offset + pageSize)
    return data
  }
  return []
}

export function installTmpl(tmplId, array) {
  const v = array.find(e => {
    return e.id === tmplId
  })
  if (v) {
    return v.name
  }
}

export function getQueryFilter(listQuery) {
  for (const k in listQuery._filter) {
    if (listQuery._filter[k] === '') {
      delete listQuery._filter[k]
    }
  }
  return listQuery
}

export function pnodeIdC2N(pnode, navList) {
  const nav = navList.find(e=> {
    return e.id === pnode
  })
  if (nav) {return nav.name}
  return ''
}
