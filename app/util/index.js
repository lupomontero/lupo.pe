const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

const isISODate = str => isoDateRegex.test(str);

const parseObj = obj => Object.keys(obj).reduce(
  (memo, key) => {
    return {
      ...memo,
      [key]: (
        isISODate(obj[key])
          ? new Date(obj[key])
          : obj[key]
      ),
    };
  },
  {},
);

const parseValue = (value) => {
  if (Array.isArray(value)) {
    return value.map(parseValue);
  }

  if (typeof value === 'object' && value !== null) {
    return parseObj(value);
  }

  return value;
};

export const fetchJSON = url => fetch(url)
  .then(resp => resp.json())
  .then(parseValue);
