// https://github.com/javinor/zero-to-live-fp-js-workshop/blob/master/workshop/fp-js.md

const fetch = require('node-fetch')
const Async = require('crocks/Async')
const compose = require('crocks/helpers/compose')
const { Rejected, Resolved } = Async

const mfetch = Async.fromPromise(fetch) 
const toJson = res => res.json();
const promiseToAsync = p => Async((rej, res) => p.then(res).catch(rej));
const jsonAsync = compose(promiseToAsync, toJson);


const ex1 = code => 
  mfetch(`https://status-code-checker.now.sh/${code}`)
    // .map((...args) => console.log({args}))
    // .chain((...args) => console.log({args}))
    .chain(
      res => res.status >= 400
        ? Rejected("Received invalid response")
        : Resolved(res)
    )
    .chain(
      response => 
        Async((rej, res) => 
          response.json().then(res).catch(rej))
    )
    .fork(
      e => console.error(e),
      json => console.log(json)
    );

const code = process.argv[2]
console.log(`code: ${code}`)
ex1(code)