import { createAction } from '@reduxjs/toolkit';

export default function createApiRequestActions(
  type,
  prepareAction = (args) => ({ payload: args.payload })
) {
  // create only necessary actions
  return {
    init: createAction(
      `${type}_INIT`,
      (payload = {}) => ({ payload })
    ),
    start: createAction(
      `${type}_START`,
      (payload = {}) => ({ payload })
    ),
    success: createAction(
      `${type}_SUCCESS`,
      (payload = { data: {} }) => ({ payload })
    ),
    error: createAction(
      `${type}_ERROR`,
      (payload = {}) => ({ payload })
    ),
  };
}
