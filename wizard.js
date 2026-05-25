/* ============================================================
   CONTINENCE FUNDING WIZARD — LOGIC
   ============================================================ */
'use strict';
// ─── Scheme Definitions ──────────────────────────────────────────────────────
const SCHEMES = {
  // ── MVA Schemes ────────────────────────────────────────────
  TAC: {
    id: 'TAC',
    name: 'Transport Accident Commission (TAC)',
    tier: 'tier-stop',
    badge: 'MVA Scheme — VIC',
    body: [
      'The TAC funds medical and like services for people injured in motor vehicle or transport accidents in Victoria, or in interstate accidents that involved a Victorian registered vehicle.',
      'Continence aids and appliances may be covered where the need is related to the transport accident injury.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: null,
    link: 'https://www.tac.vic.gov.au'
  },
  ICARE_MVA: {
    id: 'ICARE_MVA',
    name: 'Insurance and Care NSW (icare) — CTP Care & Lifetime Care',
    tier: 'tier-stop',
    badge: 'MVA Scheme — NSW',
    body: [
      'icare CTP Care provides support for people with long-term or serious injuries sustained in motor vehicle accidents in NSW.',
      'Continence aids may be covered for eligible claimants with long-term or serious injury classifications.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: 'Long-term or serious injuries only.',
    link: 'https://www.icare.nsw.gov.au'
  },
  NIISQ_MVA: {
    id: 'NIISQ_MVA',
    name: 'National Injury Insurance Scheme Queensland (NIISQ)',
    tier: 'tier-stop',
    badge: 'MVA Scheme — QLD',
    body: [
      'NIISQ provides lifetime treatment, care and support for people who sustain serious injuries in motor vehicle accidents in Queensland.',
      'Continence aids and supports may be funded as part of an approved care plan.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: 'Serious injuries only.',
    link: 'https://niis.qld.gov.au'
  },
  LSA: {
    id: 'LSA',
    name: 'Lifetime Support Authority (LSA) — Lifetime Support Scheme (LSS)',
    tier: 'tier-stop',
    badge: 'MVA Scheme — SA',
    body: [
      'The Lifetime Support Scheme provides lifetime care and support for people seriously injured in motor vehicle accidents in South Australia.',
      'Continence-related supports may be funded as part of an individualised care plan.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: 'Serious injuries only.',
    link: 'https://www.lifetimesupport.sa.gov.au'
  },
  ICWA_MVA: {
    id: 'ICWA_MVA',
    name: 'Insurance Commission of WA (ICWA) — CTP or Catastrophic Injuries Support (CIS) Scheme',
    tier: 'tier-stop',
    badge: 'MVA Scheme — WA',
    body: [
      'ICWA administers compulsory third party and catastrophic injury schemes in Western Australia (WA), for those sustained injury in a motor vehicle accident involving a WA-registered vehicle, or serious injuries in a motor vehicle accident in WA.',
      'Continence aids may be covered for eligible claimants, particularly those with catastrophic injuries.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: null,
    link: 'https://www.icwa.wa.gov.au'
  },
  MAC: {
    id: 'MAC',
    name: 'Motor Accidents Compensation (MAC) Scheme',
    tier: 'tier-stop',
    badge: 'MVA Scheme — NT',
    body: [
      'The Motor Accidents Compensation Scheme in the Northern Territory (NT) provides compensation for people injured in motor vehicle accidents involving a NT-registered vehicle.',
      'Continence aids and supports may be covered where the need arises from the accident injury.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: null,
    link: 'https://www.ntmacc.com.au'
  },
  MAIB: {
    id: 'MAIB',
    name: 'Motor Accidents Insurance Board (MAIB)',
    tier: 'tier-stop',
    badge: 'MVA Scheme — TAS',
    body: [
      'The MAIB provides compulsory third party insurance for all registered motor vehicles in Tasmania.',
      'Continence aids and supports may be funded where the need is related to a transport accident injury.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: null,
    link: 'https://maib.tas.gov.au'
  },
  ACT_MVA_NIL: {
    id: 'ACT_MVA_NIL',
    name: 'Motor Vehicle Accident — ACT',
    tier: 'tier-info',
    badge: 'MVA Scheme — ACT',
    body: [
      'A state-based motor vehicle accident scheme is not available in the ACT.',
      'You may wish to explore non-government funding options or speak to your healthcare professional for further guidance.'
    ],
    subsidy: null,
    note: null,
    link: null
  },
  // ── Work Accident Schemes ───────────────────────────────────
  COMCARE: {
    id: 'COMCARE',
    name: "Comcare — Commonwealth Workers' Compensation",
    tier: 'tier-stop',
    badge: 'Work Accident Scheme',
    body: [
      "Comcare administers the Commonwealth workers' compensation scheme for Australian Government employees and their employers.",
      'Continence aids and appliances may be funded where the need arises from a work-related injury or illness.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: null,
    link: 'https://www.comcare.gov.au'
  },
  WORKSAFE_VIC: {
    id: 'WORKSAFE_VIC',
    name: 'WorkSafe Victoria — WorkCover',
    tier: 'tier-stop',
    badge: 'Work Accident Scheme — VIC',
    body: [
      "WorkSafe Victoria's WorkCover scheme provides compensation and support for workers injured in Victoria.",
      'Continence-related aids and equipment may be covered where the need is related to a compensable work injury.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: null,
    link: 'https://www.worksafe.vic.gov.au'
  },
  ICARE_WORK: {
    id: 'ICARE_WORK',
    name: "Insurance and Care NSW (icare) — Workers' Compensation / Workers' Care",
    tier: 'tier-stop',
    badge: 'Work Accident Scheme — NSW',
    body: [
      "icare provides workers' compensation insurance and manages claims for injured workers in NSW.",
      "The Workers' Care program supports workers with the most serious injuries, and may fund continence aids as part of an approved care plan."
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: null,
    link: 'https://www.icare.nsw.gov.au'
  },
  WORKSAFE_QLD: {
    id: 'WORKSAFE_QLD',
    name: 'WorkSafe Queensland / National Injury Insurance Scheme Queensland (NIISQ)',
    tier: 'tier-stop',
    badge: 'Work Accident Scheme — QLD',
    body: [
      'WorkSafe Queensland administers the workers\u2019 compensation scheme in Queensland.',
      'NIISQ may also provide support for workers with serious injuries sustained in work-related accidents.',
      'Continence aids may be covered under either scheme depending on injury severity and circumstances.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: null,
    link: 'https://www.worksafe.qld.gov.au'
  },
  ICWA_WORK: {
    id: 'ICWA_WORK',
    name: 'Insurance Commission of WA (ICWA) — Catastrophic Injuries Support (CIS) Scheme',
    tier: 'tier-stop',
    badge: 'Work Accident Scheme — WA',
    body: [
      "ICWA's Catastrophic Injuries Support scheme provides support for workers who sustain catastrophic injuries in Western Australia.",
      'Continence aids and supports may be covered for eligible claimants.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined individually based on your injury and care requirements.'
    },
    note: 'Serious/catastrophic injuries only.',
    link: 'https://www.icwa.wa.gov.au'
  },
  SA_WORK_NIL: {
    id: 'SA_WORK_NIL',
    name: 'Work Accident Scheme — SA',
    tier: 'tier-info',
    badge: 'Work Accident Scheme — SA',
    body: [
      'A state-based work accident scheme for continence funding has not been identified for South Australia.',
      'You may wish to explore non-government funding options or speak to your employer or healthcare professional for further guidance.'
    ],
    subsidy: null,
    note: null,
    link: null
  },
  TAS_WORK_NIL: {
    id: 'TAS_WORK_NIL',
    name: 'Work Accident Scheme — TAS',
    tier: 'tier-info',
    badge: 'Work Accident Scheme — TAS',
    body: [
      'A state-based work accident scheme for continence funding has not been identified for Tasmania.',
      'You may wish to explore non-government funding options or speak to your employer or healthcare professional for further guidance.'
    ],
    subsidy: null,
    note: null,
    link: null
  },
  NT_WORK_NIL: {
    id: 'NT_WORK_NIL',
    name: 'Work Accident Scheme — NT',
    tier: 'tier-info',
    badge: 'Work Accident Scheme — NT',
    body: [
      'A state-based work accident scheme for continence funding has not been identified for the Northern Territory.',
      'You may wish to explore non-government funding options or speak to your employer or healthcare professional for further guidance.'
    ],
    subsidy: null,
    note: null,
    link: null
  },
  ACT_WORK_NIL: {
    id: 'ACT_WORK_NIL',
    name: 'Work Accident Scheme — ACT',
    tier: 'tier-info',
    badge: 'Work Accident Scheme — ACT',
    body: [
      'A state-based work accident scheme for continence funding has not been identified for the ACT.',
      'You may wish to explore non-government funding options or speak to your employer or healthcare professional for further guidance.'
    ],
    subsidy: null,
    note: 'Note: ACT workers employed by the Australian Government may be covered by Comcare.',
    link: null
  },
  // ── DVA ────────────────────────────────────────────────────
  DVA_RAP: {
    id: 'DVA_RAP',
    name: "Department of Veterans' Affairs (DVA) — Rehabilitation Appliances Program (RAP)",
    tier: 'tier-stop',
    badge: 'DVA Scheme',
    body: [
      'The DVA Rehabilitation Appliances Program (RAP) provides aids and appliances to eligible veterans, war widows/widowers and dependants.',
      'Continence aids are available under RAP for eligible Gold Card holders, and White Card holders where incontinence is an accepted service-related condition.',
      'A referral from a medical practitioner or relevant health professional is generally required.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based. DVA covers the cost of continence aids as clinically required at no cost to the veteran.'
    },
    note: 'Eligible if you hold a Gold Card, or a White Card with incontinence listed as an accepted condition.',
    link: 'https://www.dva.gov.au/providers/programs-services-information-for-providers/rap-overview'
  },
  // ── NDIS ───────────────────────────────────────────────────
  NDIS: {
    id: 'NDIS',
    name: 'National Disability Insurance Scheme (NDIS)',
    tier: 'tier-2',
    badge: 'Commonwealth Scheme',
    body: [
      'The NDIS provides funding for supports and services to people with a permanent disability or impairment leading to substantial reduced functional capacity.',
      'Continence aids and appliances can be funded under the NDIS as Consumables, where they are related to your disability.',
      'You must be an Australian citizen, permanent resident, or New Zealand citizen holding a Protected Special Category Visa, and be under 65 when you first apply.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and allocated through your individual NDIS plan under the Consumables budget, where reasonable and necessary.'
    },
    note: null,
    link: 'https://www.ndis.gov.au'
  },
  NDIS_EARLY_CHILDHOOD: {
    id: 'NDIS_EARLY_CHILDHOOD',
    name: 'NDIS — Early Childhood Approach',
    tier: 'tier-2',
    badge: 'Commonwealth Scheme',
    body: [
      'The NDIS Early Childhood Approach supports children younger than 9 with developmental delay or disability.',
      'As your child is under 9, please enquire about the NDIS Early Childhood Approach, which provides early intervention supports before a formal NDIS plan may be needed.',
      'Contact the NDIS or an Early Childhood Partner in your area for more information.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and allocated throug the NDIS plan under the Consumables budget, where reasonable and necessary.'
    },
    note: 'Relevant for children younger than 9. An NDIS plan may not be required to access early intervention supports.',
    link: 'https://www.ndis.gov.au/understanding/families-and-carers/early-childhood-approach'
  },
  // ── My Aged Care ───────────────────────────────────────────
  MY_AGED_CARE: {
    id: 'MY_AGED_CARE',
    name: 'My Aged Care, including Support at Home and Commonwealth Home Support Program (CHSP)',
    tier: 'tier-2',
    badge: 'Commonwealth Scheme',
    body: [
      'My Aged Care is the entry point to the aged care system in Australia for people aged 65 and over (or 50 and over for Aboriginal and Torres Strait Islander people, and those experiencing or at risk of homelessness).',
      'Continence aids may be funded through a Support at Home program or the Commonwealth Home Support Program (CHSP), depending on your needs assessment.',
      'You will need to register with My Aged Care and undergo an assessment.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and means-tested. Support at Home provides up to $10,000–$78,000 per year depending on your assessed needs, including up to $500–$15,000 per year for assistive technology. CHSP provides up to $1,000 per year for equipment and products.'
    },
    note: null,
    link: 'https://www.myagedcare.gov.au'
  },
  // ── CAPS ───────────────────────────────────────────────────
  CAPS: {
    id: 'CAPS',
    name: 'Continence Aids Payment Scheme (CAPS)',
    tier: 'tier-2',
    badge: 'Commonwealth Scheme',
    body: [
      'CAPS is an Australian Government scheme that provides a payment to assist eligible people with the cost of continence aids.',
      'Eligible people include Australian citizens or permanent residents with a permanent bladder or bowel condition caused by neurological or non-neurological conditions.',
      'For non-neurological conditions, a Pensioner Concession Card is also required.',
      'Payments are made directly to the participant and can be used to purchase continence aids of their choice.',
      'A medical practitioner or continence nurse is required to complete part of the registration form to register.'
    ],
    subsidy: {
      amount: '$717.10',
      period: 'per year',
      notes: 'Amount is indexed annually. Paid as a single direct payment to the participant.'
    },
    note: null,
    link: 'https://www.health.gov.au/our-work/continence-aids-payment-scheme-caps'
  },
  // ── State Tier 3 Schemes ────────────────────────────────────
  MASS: {
    id: 'MASS',
    name: 'Medical Aids Subsidy Scheme (MASS)',
    tier: 'tier-3',
    badge: 'QLD State Scheme',
    body: [
      'MASS is a Queensland Government program that subsidises the cost of medical aids and equipment, including continence products, for eligible Queensland residents.',
      'Eligible applicants must be Queensland residents, hold Australian citizenship or permanent residency, and hold a relevant concession card (Pensioner Concession Card, Health Care Card, or Queensland Government Seniors Card).',
      'MASS can be used alongside the Continence Aids Payment Scheme (CAPS).'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Support is provided as a 6-monthly allocation of products. Examples include up to 300 intermittent catheters, 20 leg bags, or 150 urisheaths per 6 months. Transanal irrigation and plugs are not covered.'
    },
    note: null,
    link: 'https://www.health.qld.gov.au/mass'
  },
  SWEP: {
    id: 'SWEP',
    name: 'State-Wide Equipment Program (SWEP) — Victorian Aids & Equipment Program (VA&EP) — Continence Aids Program (CA)',
    tier: 'tier-3',
    badge: 'VIC State Scheme',
    body: [
      'SWEP administers the Victorian Aids and Equipment Program, which includes a Continence Aids Program (CA) for eligible Victorian residents.',
      'Eligible applicants must be Victorian residents who are Australian citizens or permanent residents, and either have a permanent incontinence or be aged or frailed with continence needs.',
      'SWEP can be used alongside the Continence Aids Payment Scheme (CAPS).'
    ],
    subsidy: {
      amount: 'Up to $1,200',
      period: 'per year',
      notes: 'Capped at $1,200 per year. Can be used alongside CAPS.'
    },
    note: null,
    link: 'https://swep.bhs.org.au/'
  },
  ENABLE_NSW: {
    id: 'ENABLE_NSW',
    name: 'EnableNSW — Aids & Equipment Program (AEP) - Continence Assistance',
    tier: 'tier-3',
    badge: 'NSW State Scheme',
    body: [
      'EnableNSW administers the Aids and Equipment Program, which provides subsidised aids, equipment and appliances to eligible NSW residents with permanent or long-term disabilities.',
      'Continence aids may be available under this program for eligible residents with permanent, lifelong incontinence.',
      'Applicants must be enrolled in Medicare.',
      'EnableNSW can be used alongside the Continence Aids Payment Scheme (CAPS).'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Support is provided as a means-tested annual allocation of products. Examples include up to 600 standard intermittent catheters, 270 ready-to-use intermittent catheters, 36 leg bags, 270 urisheaths, or 1 transanal irrigation kit with 150 catheters per year.'
    },
    note: 'CAPS should be accessed first where eligible. EnableNSW provides supplementary funding.',
    link: 'https://www.enable.health.nsw.gov.au/services/continence#:~:text=EnableNSW%20provides%20assistance%20for%20consumers,Continence%20AidsPayment%20Scheme%20(CAPS).'
  },
  ACTES: {
    id: 'ACTES',
    name: 'ACT Equipment Scheme (ACTES)',
    tier: 'tier-3',
    badge: 'ACT State Scheme',
    body: [
      'ACTES provides subsidised aids and equipment, including continence products, to eligible ACT residents with a permanent disability, long-term incontinence, or frailed or aged.',
      'Eligible applicants must be ACT residents, Australian citizens or permanent residents, and hold a Pensioner Concession Card or Health Care Card.',
      'ACTES can be used alongside the Continence Aids Payment Scheme (CAPS).'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined through individual assessment.'
    },
    note: null,
    link: 'https://www.canberrahealthservices.act.gov.au/services-and-clinics/services/act-equipment-scheme-actes'
  },
  CPSS: {
    id: 'CPSS',
    name: 'Continence Management and Advice Service (CMAS) — Continence Product Subsidy Scheme (CPSS)',
    tier: 'tier-3',
    badge: 'WA State Scheme',
    body: [
      'The CPSS is administered by CMAS and provides subsidised continence products to eligible Western Australian residents aged 16 and over.',
      'Eligible applicants must be WA residents, Australian citizens or permanent residents, aged 16 or over, have permanent lifelong incontinence, and hold a Pensioner Concession Card or Health Care Card.',
      'CPSS can be used alongside the Continence Aids Payment Scheme (CAPS).',
      'A referral from a medical practitioner or continence nurse is required.'
    ],
    subsidy: {
      amount: 'Up to $490',
      period: 'per year',
      notes: 'Capped at $490 per year. Can be used alongside CAPS.'
    },
    note: 'Can be used alongside CAPS.',
    link: 'https://www.wa.gov.au/service/health-care/public-health-services/apply-the-continence-product-subsidy-scheme-cpss'
  },
  COSA: {
    id: 'COSA',
    name: 'Continuity of Support Arrangements (CoSA)',
    tier: 'tier-3',
    badge: 'WA State Scheme',
    body: [
      'CoSA provides continued support for Western Australians with a permanent disability who are not eligible for the NDIS and were previously supported under state disability services.',
      'CoSA provides access to continence product funding through the Continence Product Subsidy Scheme (CPSS) of the Continence Management and Advice Service (CMAS).',
      'Applicants must be WA residents, Australian citizens or permanent residents, have a permanent disability causing incontinence, and have been determined ineligible for the NDIS.',
      'CoSA can supplement the Continence Aids Payment Scheme (CAPS).'
    ],
    subsidy: {
      amount: 'Up to $490',
      period: 'per year',
      notes: 'Capped at $490 per year via the CPSS. Can be used alongside CAPS.'
    },
    note: 'CoSA provides access to funding via the Continence Product Subsidy Scheme (CPSS).',
    link: 'https://www.wa.gov.au/organisation/department-of-communities/continuity-of-support-arrangements-local-coordination'
  },
  TEP: {
    id: 'TEP',
    name: 'Territory Equipment Program (TEP)',
    tier: 'tier-3',
    badge: 'NT State Scheme',
    body: [
      'TEP provides subsidised aids and equipment, including continence products, to eligible Northern Territory residents.',
      'Eligible applicants must be NT residents, Australian citizens or permanent residents, with permanent lifelong incontinence, and either hold a Pensioner Concession Card or have a permanent disability causing incontinence.',
      'TEP can supplement the Continence Aids Payment Scheme (CAPS).',
      'A referral from a medical practitioner or relevant health professional is required.'
    ],
    subsidy: {
      amount: 'Up to $1,500',
      period: 'per year',
      notes: 'Capped at $1,500 per year. Can be used alongside CAPS.'
    },
    note: null,
    link: 'https://health.nt.gov.au/professionals/disability-equipment-program/territory-equipment-program'
  },
  TASEQUIP: {
    id: 'TASEQUIP',
    name: 'TasEquip',
    tier: 'tier-3',
    badge: 'TAS State Scheme',
    body: [
      'TasEquip provides a range of equipment to eligible Tasmanians to help them with everyday tasks at home, to live independently at home, or transition home from acute care.',
      'Eligible applicants must be permanently living in Tasmania (for at least 3 months), hold an eligible concession card, live at home and not in residential aged care.',
      'TasEquip can supplement the Continence Aids Payment Scheme (CAPS).',
      'The equipment must be prescribed by the authorised therapist/prescriber.'
    ],
    subsidy: {
      amount: null,
      period: null,
      notes: 'Funding is needs-based and determined through individual assessment.'
    },
    note: null,
    link: 'https://www.concessions.tas.gov.au/concessions/health/community_equipment_scheme_ces'
  }
};
// ─── Questions Definition ─────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'Q1',
    text: 'How old are you?',
    hint: 'Please enter your age in whole years.',
    type: 'number',
    show: () => true
  },
  {
    id: 'Q2',
    text: 'Are you an Aboriginal or Torres Strait Islander person, or are you experiencing (or at risk of) homelessness?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: (a) => a.Q1 >= 50 && a.Q1 <= 64
  },
  {
    id: 'Q3',
    text: 'Which of the following best describes your residency status?',
    hint: '',
    type: 'single',
    options: [
      { value: 'au_pr',   label: 'Australian citizen or permanent resident' },
      { value: 'nz',      label: 'New Zealand citizen' },
      { value: 'neither', label: 'Neither' }
    ],
    show: () => true
  },
  {
    id: 'Q4',
    text: 'Are you enrolled in Medicare?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: (a) => a.Q3 === 'neither'
  },
  {
    id: 'Q5',
    text: 'Which state or territory are you permanently residing in?',
    hint: '',
    type: 'single',
    options: [
      { value: 'ACT', label: 'Australian Capital Territory (ACT)' },
      { value: 'NSW', label: 'New South Wales (NSW)' },
      { value: 'NT',  label: 'Northern Territory (NT)' },
      { value: 'QLD', label: 'Queensland (QLD)' },
      { value: 'SA',  label: 'South Australia (SA)' },
      { value: 'TAS', label: 'Tasmania (TAS)' },
      { value: 'VIC', label: 'Victoria (VIC)' },
      { value: 'WA',  label: 'Western Australia (WA)' }
    ],
    show: () => true
  },
  // ── NEW Q6 ──────────────────────────────────────────────────
  {
    id: 'Q6',
    text: 'Do you live in a residential aged care facility?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: () => true
  },
  // ── Renumbered from Q6 onwards ──────────────────────────────
  {
    id: 'Q7',
    text: 'Are you a veteran, war widow/widower, or dependent of a veteran?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: () => true
  },
  {
    id: 'Q8',
    text: 'Which DVA card do you hold?',
    hint: '',
    type: 'single',
    options: [
      { value: 'gold',         label: 'Gold Card' },
      { value: 'white_inc',    label: 'White Card with incontinence as an accepted condition' },
      { value: 'white_no_inc', label: 'White Card without incontinence as an accepted condition' },
      { value: 'neither',      label: 'Neither' }
    ],
    show: (a) => a.Q7 === 'yes'
  },
  {
    id: 'Q9',
    text: 'Was your incontinence caused by a motor vehicle accident?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: () => true
  },
  {
    id: 'Q10',
    text: 'Was your incontinence caused by a work-related injury?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: () => true
  },
  {
    id: 'Q11',
    text: 'Do you work for an Australian Government agency or statutory authority?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: (a) => a.Q10 === 'yes'
  },
  {
    id: 'Q12',
    text: 'Do you have a permanent disability that causes your incontinence?',
    hint: 'Disability defined as any intellectual, cognitive, neurological, sensory, or physical impairment',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: () => true
  },
  {
    id: 'Q13',
    text: 'Have you been formally assessed and deemed ineligible for the National Disability Insurance Scheme (NDIS)?',
    hint: 'Select "No" if you have not yet applied, are currently applying, or are already an NDIS participant.',
    type: 'single',
    options: [
      { value: 'no',  label: 'No — I have not been assessed, or I am an NDIS participant' },
      { value: 'yes', label: 'Yes — I have been deemed ineligible for the NDIS' }
    ],
    show: (a) => a.Q12 === 'yes'
  },
  {
    id: 'Q14',
    text: 'Is your incontinence likely to be long-term or lifelong?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: () => true
  },
  {
    id: 'Q15',
    text: 'What is the underlying cause of your incontinence?',
    hint: '',
    type: 'single',
    options: [
      {
        value: 'neuro',
        label: "Neurological condition (e.g. multiple sclerosis, spinal cord injury, brain injury, spina bifida, Parkinson's disease, stroke)"
      },
      {
        value: 'non_neuro',
        label: 'Non-neurological condition (e.g. prostate problems, pelvic floor weakness, bladder overactivity)'
      }
    ],
    show: (a) => a.Q14 === 'yes'
  },
  {
    id: 'Q16',
    text: 'Do you ONLY need funding support for transanal irrigation systems and/or plugs?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: (a) => a.Q5 === 'QLD'
  },
  {
    id: 'Q17',
    text: 'Do you currently hold any of the following concession cards?',
    hint: 'Select all that apply.',
    type: 'multi',
    options: (a) => {
      const opts = [
        { value: 'pcc', label: 'Pensioner Concession Card' },
        { value: 'hcc', label: 'Health Care Card' }
      ];
      if (a.Q5 === 'QLD') {
        opts.push({ value: 'qld_senior', label: 'Queensland Government Seniors Card' });
      }
      opts.push({ value: 'none', label: 'None of the above' });
      return opts;
    },
    show: (a) =>
     a.Q14 === 'yes' &&
     a.Q15 === 'non_neuro' &&
     a.Q9 !== 'yes' &&
     a.Q10 !== 'yes' &&
     !(a.Q7 === 'yes' && (a.Q8 === 'gold' || a.Q8 === 'white_inc'))
  }
];
// ─── State ────────────────────────────────────────────────────────────────────
let answers    = {};
let history    = [];
let currentQId = null;
// ─── Helpers ──────────────────────────────────────────────────────────────────
function getQuestion(id) {
  return QUESTIONS.find(q => q.id === id);
}
function getNextQuestionId(afterId) {
  const idx = QUESTIONS.findIndex(q => q.id === afterId);
  for (let i = idx + 1; i < QUESTIONS.length; i++) {
    const q    = QUESTIONS[i];
    const show = typeof q.show === 'function' ? q.show(answers) : true;
    if (show) return q.id;
  }
  return null;
}
function getQuestionDisplayNumber(id) {
  let n = 0;
  for (const q of QUESTIONS) {
    const show = typeof q.show === 'function' ? q.show(answers) : true;
    if (show) {
      n++;
      if (q.id === id) return n;
    }
  }
  return n;
}
function getTotalVisibleQuestions() {
  return QUESTIONS.filter(
    q => (typeof q.show === 'function' ? q.show(answers) : true)
  ).length;
}
// Multi-select helper: returns array of selected values
function getMultiAnswer(id) {
  return answers[id] || [];
}
function hasCard(cards) {
  const held = getMultiAnswer('Q17'); // ← updated from Q16 to Q17
  return cards.some(c => held.includes(c));
}
// ─── Render ───────────────────────────────────────────────────────────────────
function renderQuestion(qId) {
  const q = getQuestion(qId);
  if (!q) return;
  currentQId = qId;
  // Progress
  const displayNum = getQuestionDisplayNumber(qId);
  const total      = getTotalVisibleQuestions();
  const pct        = Math.round(((displayNum - 1) / total) * 100);
  document.getElementById('progressLabel').textContent = `Question ${displayNum} of ${total}`;
  document.getElementById('progressPct').textContent   = `${pct}%`;
  document.getElementById('progressBar').style.width   = `${pct}%`;
  // Question metadata
  document.getElementById('questionNumber').style.display = 'none';
  document.getElementById('questionText').textContent   = q.text;
  document.getElementById('questionHint').textContent   = q.hint || '';
  document.getElementById('questionHint').style.display = q.hint ? 'block' : 'none';
  // Build options
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  const opts = typeof q.options === 'function' ? q.options(answers) : q.options;
  if (q.type === 'number') {
    const wrapper = document.createElement('div');
    wrapper.className = 'age-input-wrapper';
    const input = document.createElement('input');
    input.type        = 'number';
    input.min         = '0';
    input.max         = '120';
    input.step        = '1';
    input.placeholder = 'e.g. 45';
    input.className   = 'age-input';
    input.inputMode   = 'numeric';
    input.value       = answers[q.id] !== undefined ? answers[q.id] : '';
    const nextBtn = document.getElementById('nextBtn');
    nextBtn.disabled = input.value === '';
    input.addEventListener('input', () => {
      const raw = parseInt(input.value, 10);
      if (!isNaN(raw) && raw >= 0 && raw <= 120) {
        answers[q.id] = raw;
        nextBtn.disabled = false;
      } else {
        delete answers[q.id];
        nextBtn.disabled = true;
      }
    });
    wrapper.appendChild(input);
    container.appendChild(wrapper);
  } else if (q.type === 'single') {
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.type      = 'button';
      if (answers[q.id] === opt.value) {
        btn.classList.add('selected');
      }
      btn.innerHTML = `
        <span class="option-radio">
          <span class="option-radio-dot"></span>
        </span>
        <span class="option-label">${opt.label}</span>
      `;
      btn.addEventListener('click', () => {
        container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        answers[q.id] = opt.value;
        document.getElementById('nextBtn').disabled = false;
      });
      container.appendChild(btn);
    });
  } else if (q.type === 'multi') {
    if (!answers[q.id]) answers[q.id] = [];
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-checkbox-btn';
      btn.type      = 'button';
      btn.dataset.value = opt.value;
      const alreadySelected = answers[q.id].includes(opt.value);
      if (alreadySelected) btn.classList.add('selected');
      btn.innerHTML = `
        <span class="option-checkbox">
          <span class="option-checkbox-tick">&#10003;</span>
        </span>
        <span class="option-label">${opt.label}</span>
      `;
      btn.addEventListener('click', () => {
        const isNone      = opt.value === 'none';
        const arr         = answers[q.id];
        const btnSelected = btn.classList.contains('selected');
        if (isNone) {
          container.querySelectorAll('.option-checkbox-btn').forEach(b => {
            b.classList.remove('selected');
          });
          if (!btnSelected) {
            btn.classList.add('selected');
            answers[q.id] = ['none'];
          } else {
            answers[q.id] = [];
          }
        } else {
          container.querySelectorAll('.option-checkbox-btn[data-value="none"]').forEach(b => {
            b.classList.remove('selected');
          });
          answers[q.id] = arr.filter(v => v !== 'none');
          if (btnSelected) {
            btn.classList.remove('selected');
            answers[q.id] = answers[q.id].filter(v => v !== opt.value);
          } else {
            btn.classList.add('selected');
            if (!answers[q.id].includes(opt.value)) {
              answers[q.id].push(opt.value);
            }
          }
        }
        document.getElementById('nextBtn').disabled = answers[q.id].length === 0;
      });
      container.appendChild(btn);
    });
    document.getElementById('nextBtn').disabled = answers[q.id].length === 0;
  }
  // Enable Next button for single if already answered
  if (q.type === 'single') {
    document.getElementById('nextBtn').disabled = !answers[q.id];
  }
  // Back button
  document.getElementById('backBtn').disabled = history.length === 0;
  // Show question card, hide results
  document.getElementById('questionCard').style.display      = 'block';
  document.getElementById('resultsCard').style.display       = 'none';
  document.getElementById('progressContainer').style.display = 'block';
}
// ─── Navigation ───────────────────────────────────────────────────────────────
function goNext() {
  const q = getQuestion(currentQId);
  if (!q) return;
  if (q.type === 'single' && !answers[q.id]) return;
  if (q.type === 'multi'  && (!answers[q.id] || answers[q.id].length === 0)) return;
  history.push(currentQId);
  const nextId = getNextQuestionId(currentQId);
  invalidateStaleAnswers();
  if (nextId) {
    renderQuestion(nextId);
    scrollToTop();
  } else {
    showResults();
  }
}
function goBack() {
  if (history.length === 0) return;
  const prevId = history.pop();
  currentQId   = prevId;
  renderQuestion(prevId);
  scrollToTop();
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function invalidateStaleAnswers() {
  QUESTIONS.forEach(q => {
    const show = typeof q.show === 'function' ? q.show(answers) : true;
    if (!show && answers[q.id] !== undefined) {
      delete answers[q.id];
    }
  });
}
function restartWizard() {
  answers    = {};
  history    = [];
  currentQId = null;
  renderQuestion('Q1');
  scrollToTop();
}
// ─── Output Logic ─────────────────────────────────────────────────────────────
function computeResults() {
  const a = answers;
  const rawAge = a.Q1;
  const age =
    rawAge < 3  ? 'under3' :
    rawAge <= 4  ? '3to4'   :
    rawAge <= 8  ? '5to8'   :
    rawAge <= 15 ? '9to15'  :
    rawAge <= 49 ? '16to49' :
    rawAge <= 64 ? '50to64' :
                   '65plus';
  const atsi           = a.Q2;
  const residency      = a.Q3;
  const medicare       = a.Q4;
  const state          = a.Q5;
  const racf           = a.Q6;  // ← NEW: residential aged care facility
  const veteran        = a.Q7;  // ← renumbered
  const dvaCard        = a.Q8;  // ← renumbered
  const mva            = a.Q9;  // ← renumbered
  const work           = a.Q10; // ← renumbered
  const govWorker      = a.Q11; // ← renumbered
  const disability     = a.Q12; // ← renumbered
  const ndisIneligible = a.Q13; // ← renumbered
  const lifelong       = a.Q14; // ← renumbered
  const cause          = a.Q15; // ← renumbered
  const tai            = a.Q16; // ← renumbered
  const cards          = a.Q17 || []; // ← renumbered
  const isAuPR      = residency === 'au_pr';
  const isNZ        = residency === 'nz';
  const hasMedicare = medicare === 'yes';
  const inRACF      = racf === 'yes'; // ← NEW: residential aged care flag
  const isUnder9 =
    age === 'under3' ||
    age === '3to4'   ||
    age === '5to8';
  const isCosaAge =
    age === '3to4'   ||
    age === '5to8'   ||
    age === '9to15'  ||
    age === '16to49' ||
    age === '50to64';
  const agedCareAge       = age === '65plus' || (age === '50to64' && atsi === 'yes');
  const agedCareResidency = isAuPR || isNZ || hasMedicare;
  const hasPCC           = cards.includes('pcc');
  const hasHCC           = cards.includes('hcc');
  const hasQldSenior     = cards.includes('qld_senior');
  const hasAnyConcession = hasPCC || hasHCC || hasQldSenior;
  const tier1 = [];
  const tier2 = [];
  const tier3 = [];
  // ── EARLY EXIT CHECK ────────────────────────────────────────
  const notAgedCareAge =
    age === 'under3' ||
    age === '3to4'   ||
    age === '5to8'   ||
    age === '9to15'  ||
    age === '16to49' ||
    (age === '50to64' && atsi !== 'yes');
  const conditionA =
    lifelong   === 'no' &&
    mva        === 'no' &&
    work       === 'no' &&
    veteran    === 'no' &&
    disability === 'no' &&
    notAgedCareAge;
  const conditionB =
    residency === 'neither' &&
    medicare  === 'no'      &&
    mva       === 'no'      &&
    work      === 'no'      &&
    veteran   === 'no';
  if (conditionA || conditionB) {
    return { noSchemes: true, tier1: [], tier2: [], tier3: [] };
  }
  // ── TIER 1: MVA ─────────────────────────────────────────────
  let mvaHasScheme = false;
  if (mva === 'yes') {
    switch (state) {
      case 'VIC': tier1.push(SCHEMES.TAC);         mvaHasScheme = true; break;
      case 'NSW': tier1.push(SCHEMES.ICARE_MVA);   mvaHasScheme = true; break;
      case 'QLD': tier1.push(SCHEMES.NIISQ_MVA);   mvaHasScheme = true; break;
      case 'SA':  tier1.push(SCHEMES.LSA);         mvaHasScheme = true; break;
      case 'WA':  tier1.push(SCHEMES.ICWA_MVA);    mvaHasScheme = true; break;
      case 'NT':  tier1.push(SCHEMES.MAC);         mvaHasScheme = true; break;
      case 'TAS': tier1.push(SCHEMES.MAIB);        mvaHasScheme = true; break;
      case 'ACT': tier1.push(SCHEMES.ACT_MVA_NIL);                      break;
      default: break;
    }
    if (mvaHasScheme) {
      return { noSchemes: false, tier1, tier2: [], tier3: [] };
    }
  }
  // ── TIER 1: WORK ACCIDENT ────────────────────────────────────
  let workHasScheme = false;
  if (work === 'yes') {
    if (govWorker === 'yes') {
      tier1.push(SCHEMES.COMCARE);
      workHasScheme = true;
    } else {
      switch (state) {
        case 'VIC': tier1.push(SCHEMES.WORKSAFE_VIC); workHasScheme = true; break;
        case 'NSW': tier1.push(SCHEMES.ICARE_WORK);   workHasScheme = true; break;
        case 'QLD': tier1.push(SCHEMES.WORKSAFE_QLD); workHasScheme = true; break;
        case 'WA':  tier1.push(SCHEMES.ICWA_WORK);    workHasScheme = true; break;
        case 'SA':  tier1.push(SCHEMES.SA_WORK_NIL);                        break;
        case 'TAS': tier1.push(SCHEMES.TAS_WORK_NIL);                       break;
        case 'NT':  tier1.push(SCHEMES.NT_WORK_NIL);                        break;
        case 'ACT': tier1.push(SCHEMES.ACT_WORK_NIL);                       break;
        default: break;
      }
    }
    if (workHasScheme) {
      return { noSchemes: false, tier1, tier2: [], tier3: [] };
    }
  }
  // ── TIER 1: DVA RAP ─────────────────────────────────────────
  if (veteran === 'yes' && (dvaCard === 'gold' || dvaCard === 'white_inc')) {
    tier1.push(SCHEMES.DVA_RAP);
    return { noSchemes: false, tier1, tier2: [], tier3: [] };
  }
  // ── TIER 2: NDIS ─────────────────────────────────────────────
  if (
    disability === 'yes'     &&
    ndisIneligible !== 'yes' &&
    (isAuPR || isNZ)         &&
    age !== '65plus'
  ) {
    if (isUnder9) {
      tier2.push(SCHEMES.NDIS_EARLY_CHILDHOOD);
    } else {
      tier2.push(SCHEMES.NDIS);
    }
    return { noSchemes: false, tier1, tier2, tier3: [] };
  }
  // ── TIER 2: MY AGED CARE ─────────────────────────────────────
  let myAgedCareRecommended = false;
  if (agedCareAge && agedCareResidency) {
    tier2.push(SCHEMES.MY_AGED_CARE);
    myAgedCareRecommended = true;
    return { noSchemes: false, tier1, tier2, tier3: [] }; 
  }
  // ── TIER 2: CAPS ─────────────────────────────────────────────
  // Excluded if living in a residential aged care facility (inRACF)
  if (
    !myAgedCareRecommended &&
    !inRACF                &&
    isAuPR                 &&
    lifelong === 'yes'     &&
    age !== 'under3'       &&
    age !== '3to4'
  ) {
    const capsQualifies =
      cause === 'neuro' ||
      (cause === 'non_neuro' && hasPCC);
    if (capsQualifies) {
      tier2.push(SCHEMES.CAPS);
    }
  }
  // ── TIER 3: STATE-BASED TOP-UP SCHEMES ───────────────────────
  // All state-based schemes are excluded if living in a residential
  // aged care facility (inRACF)
  // VIC — SWEP
  if (
    state === 'VIC'        &&
    isAuPR                 &&
    !myAgedCareRecommended &&
    !inRACF                && // ← excluded for RACF residents
    (age === '65plus' || lifelong === 'yes')
  ) {
    tier3.push(SCHEMES.SWEP);
  }
  // NSW — EnableNSW
  if (
    state === 'NSW'                 &&
    (isAuPR || isNZ || hasMedicare) &&
    lifelong === 'yes'              &&
    !myAgedCareRecommended          &&
    !inRACF                         // ← excluded for RACF residents
  ) {
    tier3.push(SCHEMES.ENABLE_NSW);
  }
  // QLD — MASS
  if (
    state === 'QLD'        &&
    isAuPR                 &&
    !myAgedCareRecommended &&
    !inRACF                && // ← excluded for RACF residents
    lifelong === 'yes'     &&
    hasAnyConcession       &&
    tai !== 'yes'             // ← excluded for TAI-only users
  ) {
    tier3.push(SCHEMES.MASS);
  }
  // ACT — ACTES
  if (
    state === 'ACT'        &&
    isAuPR                 &&
    (hasPCC || hasHCC)     &&
    !myAgedCareRecommended &&
    !inRACF                && // ← excluded for RACF residents
    lifelong === 'yes'
  ) {
    tier3.push(SCHEMES.ACTES);
  }
  // WA — CPSS
  if (
    state === 'WA'                                             &&
    isAuPR                                                     &&
    (age === '16to49' || age === '50to64' || age === '65plus') &&
    lifelong === 'yes'                                         &&
    (hasPCC || hasHCC)                                         &&
    !myAgedCareRecommended                                     &&
    !inRACF                                                    // ← excluded for RACF residents
  ) {
    tier3.push(SCHEMES.CPSS);
  }
  // WA — CoSA (only if CPSS not already recommended)
  if (
    state === 'WA'           &&
    isAuPR                   &&
    disability === 'yes'     &&
    ndisIneligible === 'yes' &&
    lifelong === 'yes'       &&
    isCosaAge                &&
    !(hasPCC || hasHCC)      &&
    !myAgedCareRecommended   &&
    !inRACF                  // ← excluded for RACF residents
  ) {
    tier3.push(SCHEMES.COSA);
  }
  // NT — TEP
  if (
    state === 'NT'     &&
    isAuPR             &&
    lifelong === 'yes' &&
    !inRACF            && // ← excluded for RACF residents
    (
      age === 'under3' ||
      age === '3to4'   ||
      age === '5to8'   ||
      age === '9to15'  ||
      (age === '16to49' && (hasPCC || disability === 'yes')) ||
      (age === '50to64' && (hasPCC || disability === 'yes')) ||
      (age === '65plus' && (hasPCC || disability === 'yes'))
    )
  ) {
    tier3.push(SCHEMES.TEP);
  }
  // TAS — TasEquip
  if (
    state === 'TAS'        &&
    isAuPR                 &&
    (hasPCC || hasHCC)     &&
    !myAgedCareRecommended &&
    !inRACF                // ← excluded for RACF residents
  ) {
    tier3.push(SCHEMES.TASEQUIP);
  }
  // ── EARLY EXIT: No schemes at all ────────────────────────────
  if (tier1.length === 0 && tier2.length === 0 && tier3.length === 0) {
    return { noSchemes: true, tier1: [], tier2: [], tier3: [] };
  }
  return { noSchemes: false, tier1, tier2, tier3 };
}
// ─── Results Rendering ────────────────────────────────────────────────────────
function showResults() {
  const result = computeResults();
  document.getElementById('questionCard').style.display      = 'none';
  document.getElementById('progressContainer').style.display = 'none';
  document.getElementById('resultsCard').style.display       = 'block';
  const content = document.getElementById('resultsContent');
  const intro   = document.getElementById('resultsIntro');
  content.innerHTML = '';
  if (result.noSchemes) {
    intro.textContent = 'Based on your answers, we were unable to identify a suitable continence funding scheme for you at this time.';
    content.innerHTML = `
      <div class="no-schemes-box">
        <span class="no-schemes-icon">&#9888;</span>
        <p class="no-schemes-text">
          We recommend speaking to your healthcare professional for further guidance.
          There may be non-government options or other supports available to you
          that are not captured by this tool.
        </p>
      </div>
    `;
    return;
  }
  const allSchemes = [...result.tier1, ...result.tier2, ...result.tier3];
  if (allSchemes.length === 0) {
    intro.textContent = 'Based on your answers, we were unable to identify a suitable continence funding scheme for you at this time.';
    content.innerHTML = `
      <div class="no-schemes-box">
        <span class="no-schemes-icon">&#9888;</span>
        <p class="no-schemes-text">
          We recommend speaking to your healthcare professional for further guidance.
        </p>
      </div>
    `;
    return;
  }
  const count = allSchemes.length;
  intro.textContent = `Based on your answers, we have identified ${count} most suitable funding scheme${count !== 1 ? 's' : ''} you may be eligible for. Click each scheme to learn more.`;
  const prioritySchemes = [...result.tier1, ...result.tier2];
  const stateSchemes    = [...result.tier3];
  // ── Left column — Priority schemes ──────────────────────────
  if (prioritySchemes.length > 0) {
    const col = document.createElement('div');
    col.className = 'results-column';
    const label = document.createElement('p');
    label.className = 'results-section-label';
    const isMVAorWork = result.tier1.some(s =>
      s.badge.toLowerCase().includes('mva') ||
      s.badge.toLowerCase().includes('work') ||
      s.id === 'COMCARE'
    );
    const isDVA = result.tier1.some(s => s.id === 'DVA_RAP');
    if (isMVAorWork) {
      label.textContent = 'Priority Scheme — Injury-Based Funding';
    } else if (isDVA) {
      label.textContent = 'Priority Scheme — DVA';
    } else {
      label.textContent = 'Priority Scheme';
    }
    col.appendChild(label);
    prioritySchemes.forEach(s => col.appendChild(buildSchemeCard(s)));
    content.appendChild(col);
  }
  // ── Right column — State-based schemes ──────────────────────
  if (stateSchemes.length > 0) {
    const col = document.createElement('div');
    col.className = 'results-column';
    const label = document.createElement('p');
    label.className   = 'results-section-label';
    label.textContent = 'State-Based Scheme';
    col.appendChild(label);
    stateSchemes.forEach(s => col.appendChild(buildSchemeCard(s)));
    content.appendChild(col);
  }
  // ── If only one column exists, make it full width ────────────
  const columns = content.querySelectorAll('.results-column');
  if (columns.length === 1) {
    content.style.gridTemplateColumns = '1fr';
  } else {
    content.style.gridTemplateColumns = '';  // restore CSS default
  }
  scrollToTop();
}
function buildSchemeCard(scheme) {
  const card = document.createElement('div');
  card.className = `scheme-card ${scheme.tier}`;
  const header = document.createElement('div');
  header.className = 'scheme-card-header';
  header.innerHTML = `
    <span class="scheme-badge">${scheme.badge}</span>
    <span class="scheme-card-title">${scheme.name}</span>
    <span class="scheme-card-chevron">&#9660;</span>
  `;
  const body = document.createElement('div');
  body.className = 'scheme-card-body';
  let bodyHTML = scheme.body.map(p => `<p>${p}</p>`).join('');
  // ── Level of Funding or Subsidy block ──────────────────────
  if (scheme.subsidy) {
    let subsidyHTML = `<div class="scheme-subsidy-block">
      <p class="scheme-subsidy-label">&#128181; Level of funding or subsidy</p>`;
    if (scheme.subsidy.amount) {
      subsidyHTML += `<p class="scheme-subsidy-amount">
        ${scheme.subsidy.amount}
        ${scheme.subsidy.period
          ? `<span class="scheme-subsidy-period">${scheme.subsidy.period}</span>`
          : ''}
      </p>`;
    }
    if (scheme.subsidy.notes) {
      subsidyHTML += `<p class="scheme-subsidy-notes">${scheme.subsidy.notes}</p>`;
    }
    subsidyHTML += `</div>`;
    bodyHTML += subsidyHTML;
  }
  if (scheme.note) {
    bodyHTML += `<div class="scheme-note">&#128204; ${scheme.note}</div>`;
  }
  if (scheme.link) {
    bodyHTML += `
      <a class="scheme-link" href="${scheme.link}" target="_blank" rel="noopener noreferrer">
        Visit website &#8599;
      </a>
    `;
  }
  body.innerHTML = bodyHTML;
  // ── Toggle open/close this card only ───────────────────────
  // Removed close-others logic to allow multiple cards open at once
  header.addEventListener('click', () => {
    card.classList.toggle('open');
  });
  card.appendChild(header);
  card.appendChild(body);
  return card;
}
// ─── Disclaimer close ─────────────────────────────────────────────────────────
document.getElementById('disclaimerClose').addEventListener('click', () => {
  const banner = document.getElementById('disclaimerBanner');
  banner.style.maxHeight  = banner.scrollHeight + 'px';
  banner.style.overflow   = 'hidden';
  banner.style.transition = 'max-height 0.3s ease, opacity 0.3s ease';
  requestAnimationFrame(() => {
    banner.style.maxHeight = '0';
    banner.style.opacity   = '0';
  });
  setTimeout(() => { banner.style.display = 'none'; }, 320);
});
// ─── Initialise ───────────────────────────────────────────────────────────────
renderQuestion('Q1');
