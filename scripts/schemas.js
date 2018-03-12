export const NEW_ACCOUNT = [
  {
    title: 'Basic info',
    inputs: [
      'legalBusinessName',
      'doesBusinessAs',
      'legalEntityType',
      'naicsCode',
      // 'policyHolderPhoneNumber',
      // 'policyHolderEmail',
      'mailingAddress',
      'numLocations',
      'tooManyLocations'
      // 'locationSameAsMailing'
    ],
    actions: [
      'chooseNumLocations'
    ]
  },
];

export const BOP_QUOTE = [
  {
    title: 'Loc 1 / Bldg 1',
    type: 'building',
    inputs: [
      'buildingDeductible',
      'windPercentage',
      'businessIncomeExtraExpensePeriod',
      'Additional Coverage',
      'equipmentBreakdown',
      'greenUpgrades',
      'utilityServicesTimeElement',
      'utilityServicesDirectDamage',
      'additionalDebrisRemoval',
      'spoilage',
      'ordinanceOrLaw',
      'ordinanceOrLawOne',
      'ordinanceOrLawTwoThree',
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
      'Operations specific optional coverages',
      'professionalLiability',
      'snowPlowProducts',
      'hiredNonOwnedAutoCoverage',
      'eachCoveredJobsite',
      'propertyInTransit'
    ],
    actions: [
      'previousStep',
      'nextStep'
    ],
  },
  {
    title: 'Additional Coverages',
    inputs: [
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
      'liquorLiability',
      'liquorLiabilityEEC',
      'liquorLiabilityAggregate',
      'employeeDishonestyLimit'
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
