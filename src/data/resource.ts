let cache: Record<
  string,
  PendingResource<any> | DoneResource<any>
> = {};
export function useResource<TValue>(
  key: string,
  promiseFactory: (key: string) => Promise<TValue>
): DoneResource<TValue> {
  if (!cache[key]) {
    const promise = promiseFactory(key)
      .then(data => {
        resource.data = data;
        resource.state = "done";
        resource.error = undefined;
        return data;
      })
      .catch(err => {
        resource.data = undefined;
        resource.state = "error";
        resource.error = err;
      });
    const resource:
      | PendingResource<TValue>
      | DoneResource<TValue> = {
      state: "pending",
      data: undefined,
      promise: promise,
      error: undefined
    };
    cache[key] = resource;
  }

  const resource = cache[key];
  if (resource.state === "pending") {
    throw resource.promise;
  }

  return resource;
}

type PendingResource<TValue> = {
  data: undefined;
  promise: Promise<TValue | void>;
  state: "pending";
  error: any;
};

type DoneResource<TValue> = {
  data: TValue;
  promise: Promise<TValue | void>;
  state: "done" | "error";
  error: any;
};
