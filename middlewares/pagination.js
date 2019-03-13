import _ from 'lodash'

export default (defaultLimit, defaultFilters = [], defaultSorts = []) => {

  return (req, res, next) => {
    // console.log(defaultLimit)
    const limit = Math.max(5, req.query.page_size || defaultLimit);
    const page = parseInt(Math.max(1, req.query.page || 1));
    const offset = limit * (page - 1);

    // condition and sort (sequelize)
    let _filters = req.query.filters || {};
    let _sorts = req.query.sorts || {};

    const filters = _.pickBy(typeof _filters === 'object' ? _filters : {}, (val, key) => defaultFilters.indexOf(key) >= 0);
    const sorts = _.pickBy(typeof _sorts === 'object' ? _sorts : {}, (val, key) => defaultSorts.indexOf(key) >= 0);

    // normalize sorts
    req.pagination = {
      page,
      offset,
      limit,

      filters,
      sorts: Object.keys(sorts).map(v => {
        if (String(sorts[v]) === '1') return [v, 'ASC']
        if (String(sorts[v]) === '-1') return [v, 'DESC']
        return []
      }).filter(v => v.length > 0)
    };

    res.pagination = result => {
      res.json({
        current: page,
        total: Math.ceil(result.count / limit),
        limit,
        items: result.rows,
      });
    };

    next();
  }
}