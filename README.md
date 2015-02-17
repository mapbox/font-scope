# font-scope

[![build status](https://secure.travis-ci.org/mapbox/font-scope.png)](http://travis-ci.org/mapbox/font-scope)

generate font debugging information


### `fontScope(points)`

Analyze a font's coverage across languages

Analysis results include:

```js
{
  name: 'English font name'
  id: 'Unicode font code'
  coverages: // array of how many codepoints are covered by each language
  count: // codepoints in this font for this language
  total: // codepoints in this language
}
```


### Parameters

| parameter | type          | description                                                                        |
| --------- | ------------- | ---------------------------------------------------------------------------------- |
| `points`  | Array.<Array> | an array of arrays of codepoints, corresponding to the coverage of multiple fonts. |



**Returns** `Object`, analysis

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install font-scope
```

## Tests

```sh
$ npm test
```

