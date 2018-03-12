const NESTED_CONDITIONALS = {
  'roofReplaced': {
    'Yes': [
      'yearRoofReplaced'
    ]
  },
  'numLocations': {
    '5+': [
      'tooManyLocations'
    ]
  },
  'numBuildings': {
    '5+': [
      'tooManyBuildings'
    ]
  },
  'eblCoverage': {
    'Yes': [
      'eblCoverageRetroactiveDate',
      'eblEachEmployeeLimit',
      'eblAggregateLimit',
      'eblDeductible'
    ]
  },
  'eplCoverage': {
    'Yes': [
      'eplCoverageRetroactiveDate',
      'eplEachEmployeeLimit',
      'eplAggregateLimit',
      'eplDeductible'
    ]
  },
  'cyberLiability': {
    'Yes': [
      'cyberRetroactiveDate',
      'cyberAggregateLimit',
      'cyberDeductible'
    ]
  },
  'ordinanceOrLaw': {
    'Yes': [
      'ordinanceOrLawOne',
      'ordinanceOrLawTwoThree'
    ]
  },
  'liquorLiability': {
    'Yes': [
      'liquorLiabilityEEC',
      'liquorLiabilityAggregate'
    ]
  },
  'additionalInsuredOption': {
    'Yes': [
      'additionalInsuredBizName',
      'additionalInsuredBizType',
      'additionalInsuredBizAddress',
      'additionalInsuredBizAddressType',
      'addAdditionalInsured'
    ]
  },
  'buildingSameAsMailing': {
    'Yes': [
      'buildingClassCode',
      'buildingCoverage',
      'buildingPersonalPropertyLimit',
      'yearBuilt',
      'constructionType',
      'numEmployees',
      'areaSquareFeet',
      'numStories',
      'yearRoofReplaced',
      'plumbingElectricalUpdated',
      'sprinklerSystem',
      'burglerAlarm',
      'fireAlarm',
      'totalSales',
      'alcoholSales',
      'payroll',
    ],
    'No': [
      'locationAddress',
      'buildingClassCode',
      'buildingCoverage',
      'buildingPersonalPropertyLimit',
      'yearBuilt',
      'constructionType',
      'numEmployees',
      'areaSquareFeet',
      'numStories',
      'yearRoofReplaced',
      'plumbingElectricalUpdated',
      'sprinklerSystem',
      'burglerAlarm',
      'fireAlarm',
      'totalSales',
      'alcoholSales',
      'payroll',
    ]
  }
};

export { NESTED_CONDITIONALS };
