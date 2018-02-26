const NESTED_CONDITIONALS = {
  // 'locationSameAsMailing': {
  //   'No': [
  //     'locationAddress'
  //   ]
  // },
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
