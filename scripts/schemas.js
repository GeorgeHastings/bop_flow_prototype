export const NEW_ACCOUNT = [
  {
    title: 'Basic info',
    inputs: [
      'legalBusinessName',
      'doesBusinessAs',
      // 'legalEntityType',
      'naicsCode',
      // 'policyHolderPhoneNumber',
      // 'policyHolderEmail',
      'mailingAddress',
      'locationSameAsMailing'
      // 'totalSales',
      // 'payroll',
    ],
    actions: [
      'nextStep'
    ]
  },
  {
    title: 'Number of buildings',
    inputs: [
      'numLocations'
    ],
    actions: [
      'previousStep',
      'chooseNumBuildings'
    ]
  },
  {
    title: 'Building 1',
    inputs: [
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
    actions: [
      'previousStep',
      'nextStep'
    ]
  },
];

export const BOP_QUOTE = [
  {
    title: 'Liability Coverages',
    inputs: [
      'liabilityAndMedical',
      'glAggregateLimit',
      'medicalExpenses',
      'glDamageToRentedPremises',
      'eblCoverage',
      'eblCoverageRetroactiveDate',
      'eblEachEmployeeLimit',
      'eblAggregateLimit',
      'eblDeductible',
      'eplCoverage',
      'eplCoverageRetroactiveDate',
      'eplEachEmployeeLimit',
      'eplAggregateLimit',
      'eplDeductible',
      'actsOfTerror',
      'cyberLiability',
      'cyberRetroactiveDate',
      'cyberAggregateLimit',
      'cyberDeductible',
      'employeeDishonestyLimit',
      'Operations specific optional coverages',
      'professionalLiability',
      'snowPlowProducts',
      'hiredNonOwnedAutoCoverage',
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  // {
  //   title: 'Building Exposure',
  //   inputs: [
  //     'buildingClassCode',
  //     'buildingCoverage',
  //     'buildingPersonalPropertyLimit',
  //     'yearBuilt',
  //     'constructionType',
  //     'numEmployees',
  //     'areaSquareFeet',
  //     'numStories',
  //     'yearRoofReplaced',
  //     'plumbingElectricalUpdated',
  //     'sprinklerSystem',
  //     'burglerAlarm',
  //     'fireAlarm',
  //     'totalSales',
  //     'alcoholSales',
  //     'payroll',
  //   ],
  //   actions: [
  //     'previousStep',
  //     'nextStep'
  //   ],
  // },
  {
    title: 'Building Coverage',
    inputs: [
      'buildingDeductible',
      'windPercentage',
      'businessIncomeExtraExpensePeriod',
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  {
    title: 'Additional Building Coverage',
    inputs: [
      'equipmentBreakdown',
      'greenUpgrades',
      'utilityServicesTimeElement',
      'utilityServicesDirectDamage',
      'additionalDebrisRemoval',
      'spoilage',
      'Ordinance or Law Coverage',
      'ordinanceOrLawOne',
      'ordinanceOrLawTwoThree',
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  // {
  //   title: 'Additional Building',
  //   inputs: [
  //     'additionalBuilding'
  //   ],
  //   actions: [
  //     'previousStep',
  //     'nextStep'
  //   ],
  // },
  // {
  //   title: 'Additional Location',
  //   inputs: [
  //     'additionalLocation'
  //   ],
  //   actions: [
  //     'previousStep',
  //     'nextStep'
  //   ],
  // },
  {
    title: 'Additional Insureds',
    elements: [
      'additionalInsuredAdded'
    ],
    inputs: [
      'additionalInsuredOption',
      'additionalInsuredBizName',
      'additionalInsuredBizType',
      'additionalInsuredBizAddress',
      'additionalInsuredBizAddressType',
      'addAdditionalInsured'
    ],
    actions: [
      'previousStep',
      'reviewSummary'
    ],
  },
  {
    title: 'Quote Summary',
    elements: [
      'summary'
    ],
    actions: [
      'previousStep',
      'getQuote'
    ],
  }
];
