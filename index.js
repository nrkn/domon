'use strict'

const validator = require( 'domon-validator' )
const parser = require( 'domon-parser' )
const parse5 = require( 'parse5' )
const DomAdapter = require( 'dom-treeadapter' )
const DomonAdapter = require( 'domon-treeadapter' )
const Mapper = require( 'treeadapter-mapper' )

const domonAdapter = DomonAdapter()

const stringify = domon => parse5.serialize( domon, { treeAdapter: domonAdapter } )

const domon = {
  validate: ( obj, id ) => validator.validate( obj, id ),
  parse: str => parser.parse( str ),
  parseFragment: str => parser.parseFragment( str ),
  stringify,
  toDom: ( document, domon ) => {
    const domAdapter = DomAdapter( document )
    const mapper = Mapper( domonAdapter, domAdapter )

    return mapper( domon )
  },
  fromDom: ( document, node ) => {
    const domAdapter = DomAdapter( document )
    const mapper = Mapper( domAdapter, domonAdapter )

    return mapper( node )
  }
}

module.exports = domon
