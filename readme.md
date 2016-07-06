# domon

## A lightweight DOM representation format

DOMON is a lightweight data format for representing the DOM without circular
references, making it suitable for JSON transport and storage etc.

It looks like (for example, a DOM element):

```json
[ "div", { "id": "myDiv" }, [ "Hello World" ] ]
```

## Install

`npm install domon`

## Usage

The DOMON API looks like:

```
{
  validate: domon => boolean,
  parse: str => domon,
  stringify: domon => str,
  toDom: ( document, domon ) => dom,
  fromDom: ( document, dom ) => domon
}
```

```javascript
const assert = require( 'assert' )
const fs = require( 'fs' )
const domon = require( 'domon' )
const jsdom = require( 'jsdom' ).jsdom

fs.readFile( 'document.html', 'utf8', ( err, html ) => {
  if( err ) throw err

  const domonTree = domon.parse( html )

  assert( domon.validate( domonTree, 'domon-document' ) )
  assert( !domon.validate( 1, 'domon-document' ) )

  const stringed = domon.stringify( domonTree )

  assert( typeof stringed === 'string' )

  const dom = domon.toDom( jsdom(), domonTree )

  assert( dom.nodeType === 9 )

  const domonTree2 = domon.fromDom( jsdom(), dom )

  assert( domon.validate( domonTree2, 'domon-document' ) )
})
```
