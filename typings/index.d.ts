import * as React from "react"

type AsyncChildren<T> = ((state: AsyncState<T>) => React.ReactNode) | React.ReactNode

interface AsyncProps<T> {
  promiseFn?: (props: object) => Promise<T>
  deferFn?: (...args) => Promise<T>
  watch?: any
  initialValue?: T
  onResolve?: (data: T) => void
  onError?: (error: Error) => void
  children?: AsyncChildren<T>
}

interface AsyncState<T> {
  initialValue?: T
  data?: T
  error?: Error
  isLoading: boolean
  startedAt?: Date
  finishedAt?: Date
  cancel: () => void
  run: (...args) => Promise<T>
  reload: () => void
  setData: (data: T, callback?: () => void) => T
  setError: (error: Error, callback?: () => void) => Error
}

declare class Async<T> extends React.Component<AsyncProps<T>, AsyncState<T>> {}

declare namespace Async {
  export function Pending<T>(props: { children?: AsyncChildren<T>; persist?: boolean }): React.ReactNode
  export function Loading<T>(props: { children?: AsyncChildren<T>; initial?: boolean }): React.ReactNode
  export function Resolved<T>(props: { children?: AsyncChildren<T>; persist?: boolean }): React.ReactNode
  export function Rejected<T>(props: { children?: AsyncChildren<T>; persist?: boolean }): React.ReactNode
}

declare function createInstance<T>(defaultProps?: AsyncProps<T>): Async<T>

export default createInstance
