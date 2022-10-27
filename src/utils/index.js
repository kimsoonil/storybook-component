import axios from 'axios';
import _ from 'lodash';
import { all, put } from 'redux-saga/effects';
import idistApi from 'redux/idistApi';
import { getToken } from './Cookies/Cookies';

export function* sagaCallback(payload, responseData) {
  if (payload.actionList) {
    yield all(
      payload.actionList.map((action) => {
        if (action.useResponseData && responseData) {
          // const _payload = action.keyPairs.reduce(
          //   (acc, cur) => ({ ...acc, [cur.payload]: responseData[cur.response] }),
          //   {}
          // );
          const _payload = {};
          action.keyPairs.forEach((keyPair) => {
            _payload[keyPair.payload] = responseData[keyPair.response];
          });
          // console.log({ type: action.type, payload: _payload });
          return put({ type: action.type, payload: _payload });
        }
        return put(action);
      })
    );
  }
}

export const immerParse = (value) => JSON.parse(JSON.stringify(value));

export const getApiFunction = () => {
  axios.get('https://server.superclub.idist.ai/docs/', getToken()).then((result) => {
    const pathData = result?.data?.paths;
    const functionList = [];
    for (const path in pathData) {
      const functionName = path
        .split('/')
        .map((item) => {
          if (item[0] === '{') {
            return '';
          }
          if (item.includes('-')) {
            return item
              .split('-')
              .map((item2) => _.capitalize(item2))
              .join('');
          }
          return _.capitalize(item);
        })
        .join('');
      const url = path.replace(/{.*}/g, '${props.id}');

      if (Object.hasOwnProperty.call(pathData, path)) {
        for (const method in pathData[path]) {
          if (method !== 'parameters') {
            if (method === 'get' || method === 'delete') {
              functionList.push(
                `const ${method + functionName} = (props) => _axios.${method}(\`${url}\`, { params: props?.params });`
              );
            } else {
              functionList.push(
                `const ${method + functionName} = (props) => _axios.${method}(\`${url}\`, props?.data);`
              );
            }
          }
        }
      }
    }
    console.log(functionList.join('\n'));
  });
};
// getApiFunction();

export const postTestData = async (props) => {
  switch (props.type) {
    case 'postAdmin':
      const { club, board, count, initNumber } = props;
      for (let index = 0; index < count; index++) {
        const obj = {
          board: board,
          title: 'string' + (index + initNumber),
          content: 'string' + (index + initNumber),
          tags: [`${index + initNumber}`],
          is_temporary: false
        };
        await idistApi.postClubPost({ id: club, data: obj });
      }

      break;
    default:
      break;
  }
};
// postTestData({ type: 'postAdmin', club: 22, board: 131, count: 10, initNumber: 2000 });

export const toCamelCase = (data) => {
  if (data == null || data == undefined) return data;

  if (typeof data === 'string') {
    return _.camelCase(data);
  } else if (typeof data === 'object') {
    const ret = {};
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (typeof element === 'object') {
          ret[_.camelCase(key)] = toCamelCase(element);
        } else {
          ret[_.camelCase(key)] = element;
        }
      }
    }
    return ret;
  } else {
    return data;
  }
};

export const toSnakeCase = (data) => {
  if (data == null || data == undefined) return data;

  if (typeof data === 'string') {
    return _.snakeCase(data);
  } else if (typeof data === 'object') {
    const ret = {};
    for (const key in data) {
      if (Object.hasOwnProperty.call(data, key)) {
        const element = data[key];
        if (typeof element === 'object') {
          ret[_.snakeCase(key)] = toSnakeCase(element);
        } else {
          ret[_.snakeCase(key)] = element;
        }
      }
    }
    return ret;
  } else {
    return data;
  }
};
