export const SCHEMA = [
  {
    title: 'New Account',
    inputs: [
      'legalBusinessName',
      'doesBusinessAs',
      'legalEntityType',
      'naicsCode',
      'policyHolderPhoneNumber',
      'policyHolderEmail',
      'mailingAddress'
    ],
    actions: [
      'createAccount'
    ]
  },
  {
    title: 'Business Location',
    inputs: [
      'locationSameAsMailing',
      'locationAddress'
    ],
    actions: [
      'nextStep'
    ]
  },
  {
    title: 'Building Exposure',
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
    ],
  },
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
  {
    title: 'Additional Building',
    inputs: [
      'additionalBuilding'
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  {
    title: 'Additional Location',
    inputs: [
      'additionalLocation'
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
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
