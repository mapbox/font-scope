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
  ratio: // percentage coverage as number from 0 to 1
  count: // codepoints in this font for this language
  total: // codepoints in this language
}
```


### Parameters

| parameter | type  | description                                                             |
| --------- | ----- | ----------------------------------------------------------------------- |
| `points`  | Array | an array of codepoints covered by a given font, as an array of integers |



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

