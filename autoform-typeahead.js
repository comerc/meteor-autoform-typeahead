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
  var atts = this.data.atts
  var TAOptions = atts.typeaheadOptions  || {highlight: true}
  var defOpt = {
    name: 'selectOptions',
    displayKey: 'label',
    options: {
      datumTokenizer: Bloodhound.tokenizers.obj.whitespace('label'),
      queryTokenizer: Bloodhound.tokenizers.whitespace,
      local: this.data.selectOptions,
    }
  }

  var DS = atts.typeaheadDatasets || [{}]
  if (! (DS instanceof Array))
    DS = [DS]

  var Datasets = _.map(DS, function (bh) {
    if (bh.displayKey) {
      var tk = Bloodhound.tokenizers.obj.whitespace(bh.displayKey)
      if (! bh.options || ! bh.options.datumTokenizer) {
        /* deep _.extend is broken */
        bh.options = _.extend (_.clone(defOpt.options), { datumTokenizer: tk})
      }
    }
    return _.extend (_.clone(defOpt), bh)
  })

  _.each (Datasets, function (bh) {
    var matcher = new Bloodhound(bh.options)
    delete bh.options

    matcher.initialize()
    bh.source = matcher.ttAdapter()
    if (TAOptions.templates)
      bh.templates = bh.templates || _.clone(TAOptions.templates)
    if (bh.templates) /* render Blaze templates if any */
      _.each (bh.templates, function (v, k){
        if (!v || typeof v === "string")
          return

        var template = v /* scope */
        bh.templates[k] = function (data) {
          return Blaze.toHTMLWithData(template, data)
        }
      })
  })

  var e = this.$('.twitter-typeahead').typeahead(TAOptions, Datasets)
};

Template.afTypeahead.destroyed = function () {
  $('.twitter-typeahead').typeahead('destroy');
};
