export const STEPS = {
  legalBusinessName: {
    label: 'Legal business name',
      component: 'input',
      size: 'half-size',
      id: 'legalBusinessName',
      type: 'text',
  },
  doesBusinessAs: {
    label: 'Doing business as',
    component: 'input',
    size: 'half-size',
    id: 'doesBusinessAs',
      type: 'text'
  },
  naicsCode: {
    label: 'Type of business',
    component: 'naics',
    id: 'naicsCode',
    placeholder: 'Search business type'
  },
  legalEntityType: {
    label: 'Legal entity type',
    component: 'dropDown',
    id: 'legalEntityType',
    values: [
      'Common Ownership',
      'Corporation',
      'Executor Trustee',
      'Government',
      'Individual',
      'Joint Venture',
      'Limited Partnership',
      'LLC',
      'LLP',
      'Non-Profit',
      'Other',
      'Partnership',
      'Religious',
      'Sole Proprietorship',
      'Trust Estate'
    ]
  },
  policyHolderPhoneNumber: {
    label: 'Policyholder phone number',
    component: 'phoneNumber',
    size: 'half-size',
    id: 'policyHolderPhoneNumber',
    placeholder: '555-555-5555'
  },
  policyHolderEmail: {
    label: 'Policyholder email',
    component: 'input',
    size: 'half-size',
    id: 'policyHolderEmail',
    type: 'text',
    placeholder: 'policyholder@email.com'
  },
  buildingSameAsMailing: {
    label: 'Add new building with the same address as the mailing address?',
    component: 'radioGroup',
    id: 'buildingSameAsMailing',
    values: ['Yes', 'No']
  },
  numLocations: {
    label: 'How many locations does this business have?',
    component: 'radioGroup',
    id: 'numLocations',
    values: ['1', '2', '3', '4', '5+'],
    default: '1'
  },
  numBuildings: {
    label: 'How many buildings does this location have?',
    component: 'radioGroup',
    id: 'numBuildings',
    values: ['1', '2', '3', '4', '5+'],
    default: '1'
  },
  tooManyLocations: {
    component: 'warning',
    id: 'tooManyLocations',
    header: 'Whoah there cowboy',
    copy: 'That might be too many locations. Give us a call at 1-800-555-5555 or chat with one of our reps.',
    hidden: true
  },
  tooManyBuildings: {
    component: 'warning',
    id: 'tooManyBuildings',
    header: 'Hold on there chief',
    copy: 'That might be too many buildings. Give us a call at 1-800-555-5555 or chat with one of our reps.',
    hidden: true
  },
  locationSameAsMailing: {
    label: 'Business address is the same as mailing address',
    component: 'checkBox',
    id: 'locationSameAsMailing',
    checked: true
  },
  locationAddress: {
    label: 'What\'s the locations\' address?',
    component: 'location',
    id: 'locationAddress',
    placeholder: 'Search street address',
    type:'text',
  },
  mailingAddress: {
    label: 'Business mailing address',
    component: 'location',
    id: 'mailingAddress',
    placeholder: 'Search street address',
    type:'text'
  },
  buildingClassCode: {
    label: 'Type of business',
    component: 'input',
    id: 'buildingClassCode',
    type: 'text',
    placeholder: 'Search classification codes',
    style: ''
  },
  numEmployees: {
    label: 'Number of employees',
    component: 'number',
    increment: true,
    id: 'numEmployees',
    min: 0,
    max: 50
  },
  yearBuilt: {
    label: 'Year built',
    component: 'input',
    size: 'half-size',
    id: 'yearBuilt',
    type: 'text',
    placeholder: '1970'
  },
  plumbingElectricalUpdated: {
    label: 'Was the plumbing, HVAC, and electrical updated within past 30 years?',
    component: 'radioGroup',
    id: 'plumbingElectricalUpdated',
    values: ['Yes', 'No']
  },
  constructionType: {
    label: 'Construction type',
    component: 'dropDown',
    id: 'constructionType',
    size: 'half-size',
    values: [
      'Fire-Resistive',
      'Frame Construction',
      'Joisted Masonry',
      'Masonry Non-Combustible',
      'Modified Fire-Resistive',
      'Non-Combustible'
    ]
  },
  areaSquareFeet: {
    label: 'Occupied area (square feet)',
    component: 'number',
    size: 'half-size',
    id: 'areaSquareFeet',
    min: 0
  },
  numStories: {
    label: 'Number of stories',
    component: 'number',
    increment: true,
    size: 'half-size',
    id: 'numStories',
    min: 0
  },
  yearRoofReplaced: {
    label: 'Has the roof been updated?',
    component: 'radioGroup',
    id: 'yearRoofReplaced',
    values: ['Yes', 'No']
  },
  sprinklerSystem: {
    label: 'Is there an automatic sprinkler system in palce?',
    component: 'radioGroup',
    id: 'sprinklerSystem',
    values: ['Yes', 'No']
  },
  burglerAlarm: {
    label: 'Is there a central station burglar alarm?',
    component: 'radioGroup',
    id: 'burglerAlarm',
    values: ['Yes', 'No']
  },
  fireAlarm: {
    label: 'Is there a central station fire alarm?',
    component: 'radioGroup',
    id: 'fireAlarm',
    values: ['Yes', 'No']
  },
  totalSales: {
    label: 'Total sales',
    component: 'money',
    id: 'totalSales',
    placeholder: '$0'
  },
  alcoholSales: {
    label: 'Alcohol sales',
    component: 'money',
    id: 'alcoholSales',
    placeholder: '$0'
  },
  payroll: {
    label: 'Payroll',
    component: 'money',
    id: 'payroll',
    placeholder: '$0'
  },
  buildingDeductible: {
    label: 'All Other Perils Deductible',
    component: 'dropDown',
    id: 'buildingDeductible',
    values: [
      '$1,000',
      '$2,500',
      '$5,000',
      '$7,500',
      '$10,000'
    ],
    default: '$1,000'
  },
  buildingCoverage: {
    label: 'Building limit',
    component: 'money',
    id: 'buildingCoverage',
    placeholder: '$0'
  },
  buildingCoverageAmount: {
    label: 'Building coverage limit',
    component: 'money',
    id: 'buildingCoverageAmount',
    placeholder: '$0',
    hidden: true
  },
  buildingPersonalPropertyLimit: {
    label: 'Building Personal Property limit',
    component: 'money',
    id: 'buildingPersonalPropertyLimit',
    placeholder: '$0'
  },
  buildingPersonalPropertyLimitAmount: {
      label: 'Building personal property coverage limit',
      component: 'money',
      id: 'buildingPersonalPropertyLimitAmount',
      placeholder: '$0',
    hidden: true
  },
  condoAssociationCoverage: {
    label: 'Would you like condominium association coverage?',
    component: 'radioGroup',
    id: 'condoAssociationCoverage',
    values: ['Yes', 'No']
  },
  condoAssociationCoverageAmount: {
    label: 'Condominium association coverage limit',
    component: 'money',
    id: 'condoAssociationCoverageAmount',
    placeholder: '$0',
    hidden: true
  },
  businessIncomeExtraExpensePeriod: {
    label: 'BI/EE Period of Indemnity (months)',
    component: 'radioGroup',
    id: 'businessIncomeExtraExpensePeriod',
    values: ['6','9','12','18','24'],
    default: '12'
  },
  windPercentage: {
    label: 'Wind Deductible',
    component: 'dropDown',
    id: 'windPercentage',
    values: ['0%','1%','2%','3%','4%','5%','6%','7%','8%','9%','10%'],
    default: '0%'
  },
  equipmentBreakdown: {
    label: `Would you like <span class="tooltip-underline" data-tippet="*tooltip*">Equipment Breakdown</span> coverage?`,
    component: 'radioGroup',
    id: 'equipmentBreakdown',
    tooltip: `
      <div class='coverage-table'>
        <p><b>Coverage</b><b>Amount</b></p>
        <p><span>Equipment Breakdown</span><span>$50,000</span></p>
        <p><span>Data Restoration</span><span>$50,000</span></p>
        <p><span>Expiditing Expenses</span><span>$50,000</span></p>
        <p><span>Hazardous Substances</span><span>$50,000</span></p>
        <p><span>Spoilage</span><span>$50,000</span></p>
      </div>
    `,
    values: ['Yes', 'No']
  },
  greenUpgrades: {
    label: 'Apply <span class="tooltip-underline" data-tippet="*tooltip*">Green Upgrades</span>?',
    component: 'radioGroup',
    id: 'greenUpgrades',
    tooltip: `<span class='mini-label'>Tip</span><p class='tooltip'>Option to rebuild using environmentally friendly materials and processes</p>`,
    values: ['Yes', 'No']
  },
  ordinanceOrLaw: {
    label: 'Would you like Ordinance or Law coverage?',
    component: 'radioGroup',
    id: 'ordinanceOrLaw',
    values: ['Yes', 'No']
  },
  ordinanceOrLawOne: {
    label: 'Apply Coverage 1? (Undamaged portion of the building)',
    component: 'radioGroup',
    id: 'ordinanceOrLawOne',
    values: ['Yes', 'No'],
    hidden: true
  },
  ordinanceOrLawTwoThree: {
    label: 'Apply Coverage 2 and 3? (Demolition Costs and Increased Cost of Construction coverage)',
    component: 'rangeSlider',
    id: 'ordinanceOrLawTwoThree',
    // default: '$0',
    // description: 'Cannot exceed $100,000',
    min: 0,
    max: 100000,
    step: 1000,
    default: 0,
    hidden: true
  },
  utilityServicesTimeElement: {
    label: 'Utility Services - Time Element limit',
    component: 'dropDown',
    id: 'utilityServicesTimeElement',
    placeholder: '$0',
    values: [
      '$0',
      '$10,000',
      '$20,000',
      '$30,000',
      '$40,000',
      '$50,000',
    ],
    default: '$0',
  },
  utilityServicesDirectDamage: {
    label: 'Utility Services - Direct Damage limit',
    component: 'dropDown',
    id: 'utilityServicesDirectDamage',
    placeholder: '$0',
    values: [
      '$0',
      '$25,000',
      '$50,000',
      '$75,000',
      '$100,000',
    ],
    default: '$0',
  },
  additionalDebrisRemoval: {
    label: 'Additional Debris Removal',
    component: 'dropDown',
    id: 'additionalDebrisRemoval',
    values: [
      '$0',
      '$25,000',
      '$50,000',
      '$75,000',
      '$100,000',
    ],
    default: '$0'
  },
  spoilage: {
    label: 'Spoilage',
    component: 'dropDown',
    id: 'spoilage',
    values: [
      '$0',
      '$10,000',
      '$20,000',
      '$30,000',
      '$40,000',
      '$50,000',
    ],
    default: '$0'
  },
  additionalBuilding: {
    label: 'Would you like to insure another building at this location?',
    component: 'radioGroup',
    id: 'insureAdditionalBuilding',
    values: ['Yes', 'No'],
    default: 'No'
  },
  additionalLocation: {
    label: 'Would you like to insure another location?',
    component: 'radioGroup',
    id: 'insureAdditionalLocation',
    values: ['Yes', 'No'],
    default: 'No'
  },
  liabilityAndMedical: {
    label: 'Per Occurrence Limit',
    component: 'radioGroup',
    id: 'liabilityAndMedical',
    values: [
      '$300,000',
      '$500,000',
      '$1,000,000',
      '$2,000,000'
    ],
    default: '$1,000,000'
  },
  glAggregateLimit: {
    label: 'Aggregate Limit',
    component: 'radioGroup',
    id: 'glAggregateLimit',
    values: [
      '$1,000,000',
      '$2,000,000'
    ],
    default: '$2,000,000'
  },
  glDamageToRentedPremises: {
    label: 'Damage to premises rented to you',
    component: 'rangeSlider',
    id: 'glDamageToRentedPremises',
    min: 50000,
    max: 1000000,
    step: 50000,
    default: 50000
  },
  medicalExpenses: {
    label: 'Medical Expenses',
    component: 'radioGroup',
    id: 'medicalExpenses',
    values: [
      '$5,000',
      '$10,000'
    ],
    default: '$5,000'
  },
  actsOfTerror: {
    label: 'Certified Acts of Terror coverage?',
    component: 'radioGroup',
    id: 'actsOfTerror',
    values: ['Yes', 'No']
  },
  cyberLiability: {
    label: 'Data Response and Cyber Liability coverage?',
    component: 'radioGroup',
    id: 'cyberLiability',
    values: ['Yes', 'No']
  },
  cyberRetroactiveDate: {
    label: 'Retroactive Date',
    component: 'input',
    hidden: true,
    id: 'cyberRetroactiveDate',
    type: 'date'
  },
  cyberAggregateLimit: {
    label: 'Aggregate Limit',
    component: 'radioGroup',
    hidden: true,
    id: 'cyberAggregateLimit',
    values: [
      '$50,000',
      '$100,000'
    ]
  },
  cyberDeductible: {
    label: 'Deductible',
    component: 'radioGroup',
    hidden: true,
    id: 'cyberDeductible',
    values: [
      '$1,000',
      '$2,500',
    ]
  },
  eblCoverage: {
    label: 'Employee Benefits Liability coverage?',
    component: 'radioGroup',
    id: 'eblCoverage',
    values: ['Yes', 'No']
  },
  eblCoverageRetroactiveDate: {
    label: 'Retroactive Date',
    component: 'date',
    placeholder:"dd/mm/yyyy",
    hidden: true,
    id: 'eblCoverageRetroactiveDate',
  },
  eblEachEmployeeLimit: {
    label: 'Each Employee Limit',
    component: 'radioGroup',
    hidden: true,
    id: 'eblEachEmployeeLimit',
    values: [
      '$100,000',
      '$300,000',
      '$500,000',
      '$1,000,000'
    ]
  },
  eblAggregateLimit: {
    label: 'Aggregate Limit',
    component: 'radioGroup',
    hidden: true,
    id: 'eblAggregateLimit',
    values: [
      '$1,000,000',
      '$2,000,000'
    ]
  },
  eblDeductible: {
    label: 'Deductible',
    component: 'radioGroup',
    hidden: true,
    id: 'eblDeductible',
    values: [
      '$0',
      '$1,000',
      '$2,500',
      '$5,000'
    ]
  },
  eblConsecutiveYears: {
    label: 'Consecutive Years of Coverage',
    component: 'radioGroup',
    hidden: true,
    id: 'eblConsecutiveYears',
    values: [
      '1',
      '2',
      '3',
      '4+'
    ]
  },
  eplCoverage: {
    label: 'Employee-Related Practices Liability coverage?',
    component: 'radioGroup',
    id: 'eplCoverage',
    values: ['Yes', 'No']
  },
  eplCoverageRetroactiveDate: {
    label: 'Retroactive Date',
    component: 'date',
    placeholder:"dd/mm/yyyy",
    hidden: true,
    id: 'eplCoverageRetroactiveDate',
  },
  eplEachEmployeeLimit: {
    label: 'Each Employment Wrongful Act Limit',
    component: 'radioGroup',
    hidden: true,
    id: 'eplEachEmployeeLimit',
    values: [
      '$100,000',
      '$300,000',
      '$500,000',
      '$1,000,000'
    ]
  },
  eplAggregateLimit: {
    label: 'Aggregate Limit',
    component: 'radioGroup',
    hidden: true,
    id: 'eplAggregateLimit',
    values: [
      '$1,000,000',
      '$2,000,000'
    ]
  },
  eplDeductible: {
    label: 'Deductible',
    component: 'radioGroup',
    hidden: true,
    id: 'eplDeductible',
    values: [
      '$0',
      '$1,000',
      '$2,500',
      '$5,000'
    ]
  },
  eplConsecutiveYears: {
    label: 'Consecutive Years of Coverage',
    component: 'radioGroup',
    hidden: true,
    id: 'eplConsecutiveYears',
    values: [
      '1',
      '2',
      '3',
      '4+'
    ]
  },
  employeeDishonestyLimit: {
    label: 'Employee Dishonesty-Limit',
    component: 'dropDown',
    id: 'employeeDishonestyLimit',
    values: [
      '$5,000',
      '$10,000',
      '$25,000',
      '$50,000',
      '$100,000'
    ]
  },
  hiredNonOwnedAutoCoverage: {
    component: 'checkBox',
    id: 'hiredNonOwnedAutoCoverage',
    label: 'Hired Non-Owned Auto Coverage'
  },
  professionalLiability: {
    component: 'checkBox',
    id: 'professionalLiability',
    label: 'Professional Liability'
  },
  snowPlowProducts: {
    component: 'checkBox',
    id: 'snowPlowProducts',
    label: 'Snow plow products/Completed ops'
  },
  additionalInsuredOption: {
    label: 'Would you like to add an additional insured?',
    component: 'radioGroup',
    id: 'additionalInsuredOption',
    values: ['Yes', 'No']
  },
  additionalInsuredBizAddress: {
    label: 'Address',
    component: 'location',
    id: 'additionalInsuredBizAddress',
    hidden: true
  },
  additionalInsuredBizType: {
    label: 'Type',
    component: 'dropDown',
    id: 'additionalInsuredBizType',
    values: [
      'Controlling Interest',
      'Designated Person or Organization',
      'Engineers, Architects or Surveyors',
      'Engineers, Architects or Surveyors not engaged by the Named Insured',
      'State or Political Subdivisions - Permits Relating to Premises',
      'Grantor of Franchise ',
      'Owners, Lessees or Contractors - With Additional Insured Requirement in Construction Contract',
      'State or Political Subdivision - Permits or Authorizations',
      'Vendors',
      'Co-Owner of Insured Premises',
      'Lessor of Leased Equipment',
      'Managers or Lessors of Premises',
      'Owners or Other Interests From Whom Land Has Been leased',
      'Owners, lessees or contractors - Scheduled Person or Organization',
      'Owners, lessees or contractors - Completed Operations',
      'Loss of rental value - Landlord as Designated Payee',
      'Mortgagee, Assignee or Receiver'
    ],
    hidden: true
  },
  additionalInsuredBizAddressType: {
    label: 'Address type',
    component: 'dropDown',
    id: 'additionalInsuredBizAddressType',
    values: [
      'Billing',
      'Business',
      'Home',
      'Other'
    ],
    hidden: true
  },
  additionalInsuredBizName: {
    label: 'Legal business name',
    component: 'input',
    id: 'additionalInsuredBizName',
    type: 'text',
    hidden: true
  },
  addAdditionalInsured: {
    component: 'submit',
    id: 'addAdditionalInsured',
    style: 'button-big button-primary',
    label: 'Add',
    action: 'addAdditionalInsured',
    hidden: true
  },
  summary: {
    component: 'summary',
  }
};

export const ACTION_COMPONENTS = {
  getQuote: {
    component: 'button',
    style: 'button-big button-confirm',
    label: 'Get quote',
    action: 'getQuote'
  },
  createAccount: {
    component: 'button',
    style: 'button-big button-confirm',
    label: 'Create Account',
    action: 'createAccount'
  },
  reviewSummary: {
    component: 'button',
    style: 'button-big button-primary',
    label: 'Review summary',
    action: 'advanceStep'
  },
  previousStep: {
    component: 'button',
    style: 'button-big button-secondary',
    label: 'Previous',
    action: 'previousStep'
  },
  nextStep: {
    component: 'button',
    style: 'button-big button-primary',
    label: 'Next',
    action: 'advanceStep'
  },
  chooseNumBuildings: {
    component: 'button',
    style: 'button-big button-primary',
    label: 'Next',
    action: 'addMultiBuildings'
  },
  chooseNumLocations: {
    component: 'button',
    style: 'button-big button-primary',
    label: 'Next',
    action: 'addMultiLocations'
  },
  addAdditionalInsured: {
    component: 'button',
    style: 'button-big button-primary-ghost',
    label: 'Add',
    action: 'addAdditionalInsured'
  }
};
