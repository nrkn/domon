'use strict'

const assert = require( 'assert' )
const fs = require( 'fs' )
const domon = require( '../index' )
const jsdom = require( 'jsdom' ).jsdom

fs.readFile( './test/document.html', 'utf8', ( err, html ) => {
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
