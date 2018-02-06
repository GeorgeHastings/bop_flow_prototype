export const STEPS = {
  legalBusinessName: {
    label: 'Legal business name',
      component: 'input',
      size: 'form-group-half-size',
      id: 'legalBusinessName',
      type: 'text',
  },
  doesBusinessAs: {
    label: 'Does business as',
    component: 'input',
    size: 'form-group-half-size',
    id: 'doesBusinessAs',
      type: 'text'
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
      size: 'form-group-half-size',
      id: 'policyHolderPhoneNumber',
      placeholder: '555-555-5555'
  },
  policyHolderEmail: {
    label: 'Policyholder email',
      component: 'input',
      size: 'form-group-half-size',
      id: 'policyHolderEmail',
      type: 'text',
      placeholder: 'policyholder@email.com'
  },
  locationSameAsMailing: {
      label: 'Is the business\'s location the same as the mailing address?',
      component: 'radioGroup',
      id: 'locationSameAsMailing',
      values: ['Yes', 'No']
  },
  locationAddress: {
      label: 'What\'s the locations\' address?',
      component: 'location',
      id: 'locationAddress',
      placeholder: 'Search street address',
      type:'text',
      hidden: true
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
      size: 'form-group-half-size',
      id: 'yearBuilt',
      type: 'text',
      placeholder: '1970'
  },
  yearRoofReplaced: {
    label: 'Year roof replaced',
      component: 'input',
      size: 'form-group-half-size',
      id: 'yearRoofReplaced',
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
      size: 'form-group-half-size',
      id: 'areaSquareFeet',
      min: 0
  },
  numStories: {
    label: 'Number of stories',
      component: 'number',
      increment: true,
      size: 'form-group-half-size',
      id: 'numStories',
      min: 0
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
      size: 'form-group-half-size',
      id: 'totalSales',
      placeholder: '$0'
  },
  liquorSales: {
    label: 'Liquor sales',
      component: 'money',
      size: 'form-group-half-size',
      id: 'liquorSales',
      placeholder: '$0'
  },
  payroll: {
      label: 'Payroll',
      component: 'money',
      id: 'payroll',
      placeholder: '$0'
  },
  buildingDeductible: {
      label: 'Property Deductible',
      component: 'dropDown',
      id: 'buildingDeductible',
      values: [
        '$1,000',
        '$2,500',
        '$5,000',
        '$7,500',
        '$10,000'
      ],
      value: '$1,000'
  },
  buildingCoverage: {
      label: 'Building limit',
      component: 'money',
      id: 'buildingCoverage',
      value: '$0'
  },
  buildingCoverageAmount: {
    label: 'Building coverage limit',
    component: 'money',
    id: 'buildingCoverageAmount',
    placeholder: '$0',
    hidden: true
  },
  buildingPersonalPropertyCoverage: {
    label: 'Building personal property coverage',
    component: 'money',
    id: 'buildingPersonalPropertyCoverage',
    value: '$0'
  },
  buildingPersonalPropertyCoverageAmount: {
      label: 'Building personal property coverage limit',
      component: 'money',
      id: 'buildingPersonalPropertyCoverageAmount',
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
    values: [6,9,12,18,24],
    value: 12
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
    label: 'Does the building have green upgrades?',
    component: 'radioGroup',
    id: 'greenUpgrades',
    values: ['Yes', 'No']
  },
  ordinanceOrLaw: {
    label: 'Would you like Ordinance or Law coverage?',
    component: 'radioGroup',
    id: 'ordinanceOrLaw',
    values: ['Yes', 'No']
  },
  ordinanceOrLawOne: {
    label: 'Would you coverage for the loss to the undamaged portion of the building? (Coverage 1)',
    component: 'radioGroup',
    id: 'ordinanceOrLawOne',
    values: ['Yes', 'No']
  },
  ordinanceOrLawTwoThree: {
    label: 'Would you like Demolition Costs and Increased Cost of Construction coverage? (Coverage 2 and 3)',
    component: 'money',
    id: 'ordinanceOrLawTwoThree',
    placeholder: '$0'
  },
  utilityServicesTimeElement: {
    label: 'Utility Services - Time Element limit',
    component: 'money',
    size: 'form-group-half-size',
    id: 'utilityServicesTimeElement',
    placeholder: '$0',
    value: '$0',
    description: 'Cannot be more than $25,000'
  },
  utilityServicesDirectDamage: {
    label: 'Utility Services - Direct Damage limit',
    component: 'money',
    size: 'form-group-half-size',
    id: 'utilityServicesDirectDamage',
    placeholder: '$0',
    value: '$0',
    description: 'Must be between $5,000 and $100,000'
  },
  additionalDebrisRemoval: {
    label: 'Additional Debris Removal',
    component: 'money',
    id: 'additionalDebrisRemoval',
    placeholder: '$0',
    value: '$0'
  },
  spoilage: {
    label: 'Spoilage',
    component: 'money',
    id: 'spoilage',
    placeholder: '$0',
    value: '$0'
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
    ]
  },
  glAggregateLimit: {
    label: 'Aggregate Limit',
    component: 'radioGroup',
    id: 'glAggregateLimit',
    values: [
      '$1,000,000',
      '$2,000,000'
    ]
  },
  glDamageToRentedPremises: {
    label: 'Damage to premises rented to you',
    component: 'radioGroup',
    id: 'glDamageToRentedPremises',
    values: [
      '$1,000,000',
      '$2,000,000'
    ]
  },
  medicalExpenses: {
    label: 'Medical Expenses',
    component: 'radioGroup',
    id: 'medicalExpenses',
    values: [
      '$5,000',
      '$10,000'
    ]
  },
  actsOfTerror: {
    label: 'Would you like to cover certified acts of terror?',
    component: 'radioGroup',
    id: 'actsOfTerror',
    values: ['Yes', 'No']
  },
  cyberLiability: {
    label: 'Would you like Data Response and Cyber Liability?',
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
      '$1,000,000',
      '$2,000,000'
    ]
  },
  cyberDeductible: {
    label: 'Deductible',
    component: 'radioGroup',
    hidden: true,
    id: 'cyberDeductible',
    values: [
      '$0',
      '$1,000',
      '$2,500',
      '$5,000'
    ]
  },
  eblCoverage: {
    label: 'Would you like Employee Benefits Liability Coverage?',
    component: 'radioGroup',
    id: 'eblCoverage',
    values: ['Yes', 'No']
  },
  eblCoverageRetroactiveDate: {
    label: 'Retroactive Date',
    component: 'input',
    hidden: true,
    id: 'eblCoverageRetroactiveDate',
    type: 'date'
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
    label: 'Would you like Employee-Related Practices Liability Endorsement Coverage?',
    component: 'radioGroup',
    id: 'eplCoverage',
    values: ['Yes', 'No']
  },
  eplCoverageRetroactiveDate: {
    label: 'Retroactive Date',
    component: 'input',
    hidden: true,
    id: 'eplCoverageRetroactiveDate',
    type: 'date'
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
  additionalInsuredType: {
    label: 'Additional insured type',
    component: 'radioGroup',
    id: 'additionalInsuredType',
    values: ['Person', 'Business']
  },
  additionalInsuredFirstName: {
    label: 'First Name',
    component: 'input',
    id: 'additionalInsuredFirstName',
    type: 'text',
    hidden: true
  },
  additionalInsuredLastName: {
    label: 'Last Name',
    component: 'input',
    id: 'additionalInsuredLastName',
    type: 'text',
    hidden: true
  },
  additionalInsuredBizAddress: {
    label: 'Address',
    component: 'location',
    id: 'additionalInsuredBizAddress',
    hidden: true
  },
  additionalInsuredPersonAddress: {
    label: 'Address',
    component: 'location',
    id: 'additionalInsuredPersonAddress',
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
  additionalInsuredPersonAddressType: {
    label: 'Address type',
    component: 'dropDown',
    id: 'additionalInsuredPersonAddressType',
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
    action: ''
  },
  createAccount: {
    component: 'button',
    style: 'button-big button-confirm',
    label: 'Start quote',
    action: 'advanceStep'
  },
  reviewSummary: {
    component: 'button',
    style: 'button-big button-confirm',
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
  addAdditionalInsured: {
    component: 'button',
    style: 'button-big button-primary-ghost',
    label: 'Add',
    action: 'addAdditionalInsured'
  }
};
