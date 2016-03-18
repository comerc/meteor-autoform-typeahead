comerc:autoform-typeahead
=========================

An add-on Meteor package for [aldeed:autoform](https://github.com/aldeed/meteor-autoform). Provides a single custom input type, "typeahead", which renders an input using the [typeahead](https://twitter.github.io/typeahead.js/) plugin.

## Prerequisites

The plugin library must be installed separately.

In a Meteor app directory, enter:

```bash
$ meteor add comerc:bs-typeahead
$ meteor add aldeed:autoform
```

## Installation

In a Meteor app directory, enter:

```bash
$ meteor add comerc:autoform-typeahead
```

## Usage

Specify "typeahead" for the `type` attribute of any input. This can be done in a number of ways:

In the schema, which will then work with a `quickForm` or `afQuickFields`:

```js
{
  tags: {
    type: String,
    autoform: {
      type: "typeahead",
      afFieldInput: {
        typeaheadOptions: {},
        typeaheadDatasets: {}
      }
    }
  }
}
```

Or on the `afFieldInput` component or any component that passes along attributes to `afFieldInput`:

```js
{{> afQuickField name="tags" type="typeahead"}}

{{> afFormGroup name="tags" type="typeahead"}}

{{> afFieldInput name="tags" type="typeahead"}}
```

To provide typeahead options, set a `typeaheadOptions` attribute equal to a helper that returns the options object. Most of the `data-` attributes that the plugin recognizes should also work.

## Basic Usage

You may use `autoform.options` (instead of `typeaheadDatasets`) like this example:

```js
{
  tags: {
    type: String,
    autoform: {
      type: "typeahead",
      options: {
        'value1': 'label1',
        'value2': 'label2'
      }
    }
  }
}
```

## Demo

[Live](http://autoform.meteor.com/types)

## Contributing

Anyone is welcome to contribute. Fork, make your changes, and then submit a pull request.
