AutoForm.addInputType("typeahead", {
  template: "afTypeahead",
  valueOut: function () {
    return this.typeahead('val');
  },
  valueConverters: {
    "number": AutoForm.Utility.stringToNumber,
    "numberArray": function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToNumber(item);
        });
      }
      return val;
    },
    "boolean": AutoForm.Utility.stringToBool,
    "booleanArray": function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToBool(item);
        });
      }
      return val;
    },
    "date": AutoForm.Utility.stringToDate,
    "dateArray": function (val) {
      if (_.isArray(val)) {
        return _.map(val, function (item) {
          item = $.trim(item);
          return AutoForm.Utility.stringToDate(item);
        });
      }
      return val;
    }
  }
});

Template.afTypeahead.helpers({
  atts: function () {
    var atts = _.clone(this.atts);
    atts = AutoForm.Utility.addClass(atts, "twitter-typeahead form-control");
    delete atts.typeaheadOptions;
    delete atts.typeaheadDatasets;
    return atts;
  }
});

Template.afTypeahead.rendered = function () {
  // instanciate typeahead
  var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substrRegex;
      // an array that will be populated with substring matches
      matches = [];
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str.label)) {
          // the typeahead jQuery plugin expects suggestions to a
          // JavaScript object, refer to typeahead docs for more info
          matches.push({ value: str.label });
        }
      });
      cb(matches);
    };
  };
  var options = {
    highlight: true
  };
  if (this.data.atts.typeaheadOptions) {
    _.extend(options, this.data.atts.typeaheadOptions);
  }
  var datasets = {
    source: substringMatcher(this.data.selectOptions)
  };
  if (this.data.atts.typeaheadDatasets) {
    _.extend(datasets, this.data.atts.typeaheadDatasets);
  }
  this.$('.twitter-typeahead').typeahead(options, datasets);
};

Template.afTypeahead.destroyed = function () {
  $('.twitter-typeahead').typeahead('destroy');
};
