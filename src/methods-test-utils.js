import {freeze as f} from './creation'

// method works after parsing into freezr
const testMethod = (t, method, o, expec, args) => {
  const fo = f(o)
  const result = fo[method.name].apply(o, args)
  t.equal(result, expec)
}

// method works passing source by prop
const testMethodBound = (t, method, o, expec, args) => {
  const result = method.apply(null, args.concat(o))
  t.equal(result, expec)
}

// assert method by prop and by method
export const assertMethod = (t, method, source, expec) =>
  (...args) => {
    testMethod(t, method, source, expec, args)
    testMethodBound(t, method, source, expec, args)
  }
