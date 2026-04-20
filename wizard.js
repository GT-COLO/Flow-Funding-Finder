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
      'The TAC funds medical and like services for people injured in transport accidents in Victoria.',
      'Continence aids and appliances may be covered where the need is related to the transport accident injury.'
    ],
    note: null,
    link: 'https://www.tac.vic.gov.au'
  },
  ICARE_MVA: {
    id: 'ICARE_MVA',
    name: 'Insurance and Care NSW (icare) — CTP Care',
    tier: 'tier-stop',
    badge: 'MVA Scheme — NSW',
    body: [
      'icare CTP Care provides support for people with serious injuries sustained in motor vehicle accidents in NSW.',
      'Continence aids may be covered for eligible claimants with serious injury classifications.'
    ],
    note: 'Serious injuries only.',
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
    note: 'Serious injuries only.',
    link: 'https://niisq.qld.gov.au'
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
    note: 'Serious injuries only.',
    link: 'https://www.lifetimesupport.sa.gov.au'
  },
  ICWA_MVA: {
    id: 'ICWA_MVA',
    name: 'Insurance Commission of WA (ICWA) — CTP / Catastrophic Injuries Support (CIS) Scheme',
    tier: 'tier-stop',
    badge: 'MVA Scheme — WA',
    body: [
      'ICWA administers compulsory third party and catastrophic injury schemes in Western Australia.',
      'Continence aids may be covered for eligible claimants, particularly those with catastrophic injuries.'
    ],
    note: 'Serious injuries only.',
    link: 'https://www.icwa.wa.gov.au'
  },
  MAC: {
    id: 'MAC',
    name: 'Motor Accidents Compensation (MAC) Scheme',
    tier: 'tier-stop',
    badge: 'MVA Scheme — NT',
    body: [
      'The Motor Accidents Compensation Scheme in the Northern Territory provides compensation for people injured in motor vehicle accidents.',
      'Continence aids and supports may be covered where the need arises from the accident injury.'
    ],
    note: null,
    link: 'https://nt.gov.au/driving/accidents-and-licensing/motor-accidents-compensation'
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
    note: null,
    link: 'https://www.maib.com.au'
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
    note: null,
    link: null
  },
  // ── Work Accident Schemes ───────────────────────────────────
  COMCARE: {
    id: 'COMCARE',
    name: 'Comcare — Commonwealth Workers\' Compensation',
    tier: 'tier-stop',
    badge: 'Work Accident Scheme',
    body: [
      'Comcare administers the Commonwealth workers\' compensation scheme for Australian Government employees and their employers.',
      'Continence aids and appliances may be funded where the need arises from a work-related injury or illness.'
    ],
    note: null,
    link: 'https://www.comcare.gov.au'
  },
  WORKSAFE_VIC: {
    id: 'WORKSAFE_VIC',
    name: 'WorkSafe Victoria — WorkCover',
    tier: 'tier-stop',
    badge: 'Work Accident Scheme — VIC',
    body: [
      'WorkSafe Victoria\'s WorkCover scheme provides compensation and support for workers injured in Victoria.',
      'Continence-related aids and equipment may be covered where the need is related to a compensable work injury.'
    ],
    note: null,
    link: 'https://www.worksafe.vic.gov.au'
  },
  ICARE_WORK: {
    id: 'ICARE_WORK',
    name: 'Insurance and Care NSW (icare) — Workers\' Compensation / Workers\' Care',
    tier: 'tier-stop',
    badge: 'Work Accident Scheme — NSW',
    body: [
      'icare provides workers\' compensation insurance and manages claims for injured workers in NSW.',
      'The Workers\' Care program supports workers with the most serious injuries, and may fund continence aids as part of an approved care plan.'
    ],
    note: null,
    link: 'https://www.icare.nsw.gov.au'
  },
  WORKSAFE_QLD: {
    id: 'WORKSAFE_QLD',
    name: 'WorkSafe Queensland / National Injury Insurance Scheme Queensland (NIISQ)',
    tier: 'tier-stop',
    badge: 'Work Accident Scheme — QLD',
    body: [
      'WorkSafe Queensland administers the workers\' compensation scheme in Queensland.',
      'NIISQ may also provide support for workers with serious injuries sustained in work-related accidents.',
      'Continence aids may be covered under either scheme depending on injury severity and circumstances.'
    ],
    note: null,
    link: 'https://www.worksafe.qld.gov.au'
  },
  ICWA_WORK: {
    id: 'ICWA_WORK',
    name: 'Insurance Commission of WA (ICWA) — Catastrophic Injuries Support (CIS) Scheme',
    tier: 'tier-stop',
    badge: 'Work Accident Scheme — WA',
    body: [
      'ICWA\'s Catastrophic Injuries Support scheme provides support for workers who sustain catastrophic injuries in Western Australia.',
      'Continence aids and supports may be covered for eligible claimants.'
    ],
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
    note: 'Note: ACT workers employed by the Australian Government may be covered by Comcare.',
    link: null
  },
  // ── DVA ────────────────────────────────────────────────────
  DVA_RAP: {
    id: 'DVA_RAP',
    name: 'Department of Veterans\' Affairs (DVA) — Rehabilitation Appliances Program (RAP)',
    tier: 'tier-stop',
    badge: 'DVA Scheme',
    body: [
      'The DVA Rehabilitation Appliances Program (RAP) provides aids and appliances to eligible veterans, war widows/widowers and dependants.',
      'Continence aids are available under RAP for eligible Gold Card holders, and White Card holders where incontinence is an accepted service-related condition.',
      'A referral from a medical practitioner or relevant health professional is generally required.'
    ],
    note: 'Eligible if you hold a Gold Card, or a White Card with incontinence listed as an accepted condition.',
    link: 'https://www.dva.gov.au/health-and-treatment/care-home-or-aged-care/rehabilitation-appliances-program-rap'
  },
  // ── NDIS ───────────────────────────────────────────────────
  NDIS: {
    id: 'NDIS',
    name: 'National Disability Insurance Scheme (NDIS)',
    tier: 'tier-2',
    badge: 'Commonwealth Scheme',
    body: [
      'The NDIS provides funding for supports and services to Australians under 65 with a permanent and significant disability.',
      'Continence aids and appliances can be funded under the NDIS as Consumables, where they are related to your disability.',
      'You must be an Australian citizen, permanent resident, or New Zealand citizen holding a Protected Special Category Visa, and be under 65 when you first apply.'
    ],
    note: null,
    link: 'https://www.ndis.gov.au'
  },
  NDIS_EARLY_CHILDHOOD: {
    id: 'NDIS_EARLY_CHILDHOOD',
    name: 'NDIS — Early Childhood Approach',
    tier: 'tier-2',
    badge: 'Commonwealth Scheme',
    body: [
      'The NDIS Early Childhood Approach supports children under 6 with developmental concerns or disability, and children under 9 with autism.',
      'As your child is under 5, please enquire about the NDIS Early Childhood Approach, which provides early intervention supports before a formal NDIS plan may be needed.',
      'Contact the NDIS or an Early Childhood Partner in your area for more information.'
    ],
    note: 'Relevant for children under 5. An NDIS plan may not be required to access early intervention supports.',
    link: 'https://www.ndis.gov.au/understanding/families-and-carers/early-childhood-approach'
  },
  // ── My Aged Care ───────────────────────────────────────────
  MY_AGED_CARE: {
    id: 'MY_AGED_CARE',
    name: 'My Aged Care — Home Care Package / Commonwealth Home Support Programme (CHSP)',
    tier: 'tier-2',
    badge: 'Commonwealth Scheme',
    body: [
      'My Aged Care is the entry point to the aged care system in Australia for people aged 65 and over (or 50 and over for Aboriginal and Torres Strait Islander people, and those experiencing or at risk of homelessness).',
      'Continence aids may be funded through a Home Care Package (HCP) or the Commonwealth Home Support Programme (CHSP), depending on your needs assessment.',
      'You will need to register with My Aged Care and undergo an assessment by an Aged Care Assessment Team (ACAT) or Regional Assessment Service (RAS).'
    ],
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
      'Eligible people include Australian citizens or permanent residents with a permanent bladder or bowel condition caused by certain conditions.',
      'A neurological condition automatically qualifies. For non-neurological conditions, a Pensioner Concession Card is also required.',
      'Payments are made directly to the participant and can be used to purchase continence aids of their choice.',
      'A referral from a medical practitioner or continence nurse is required to register.'
    ],
    note: 'CAPS cannot be used alongside MASS in Queensland. CAPS takes a secondary role where MASS is available.',
    link: 'https://www.health.gov.au/our-work/caps'
  },
  // ── MASS (QLD) ─────────────────────────────────────────────
  MASS: {
    id: 'MASS',
    name: 'Medical Aids Subsidy Scheme (MASS)',
    tier: 'tier-2',
    badge: 'QLD State Scheme',
    body: [
      'MASS is a Queensland Government program that subsidises the cost of medical aids and equipment, including continence products, for eligible Queensland residents.',
      'Eligible applicants must be Queensland residents, hold an Australian citizenship or permanent residency, and hold a relevant concession card (Pensioner Concession Card, Health Care Card, or Queensland Government Seniors Card).',
      'MASS generally provides a higher subsidy than CAPS and takes priority in Queensland. CAPS cannot be used alongside MASS.',
      'A referral from a medical practitioner or relevant allied health professional is required.'
    ],
    note: 'MASS takes priority over CAPS in QLD due to its higher allocation. CAPS and MASS cannot be used together.',
    link: 'https://www.health.qld.gov.au/mass'
  },
  // ── State Tier 3 Schemes ────────────────────────────────────
  SWEP: {
    id: 'SWEP',
    name: 'State-Wide Equipment Program (SWEP) — Victorian Aids & Equipment Program (VA&EP) — Continence Aids Program (CA)',
    tier: 'tier-3',
    badge: 'VIC State Scheme',
    body: [
      'SWEP administers the Victorian Aids and Equipment Program, which includes a Continence Aids Program (CA) for eligible Victorian residents.',
      'Eligible applicants must be Victorian residents, Australian citizens or permanent residents, and either have a permanent disability causing incontinence or be aged 65 and over with continence needs.',
      'SWEP can be used alongside CAPS to provide additional continence product funding.',
      'A referral from a medical practitioner or continence nurse is required.'
    ],
    note: 'Can be used alongside CAPS.',
    link: 'https://www.swep.org.au'
  },
  ENABLE_NSW: {
    id: 'ENABLE_NSW',
    name: 'EnableNSW — Aids & Equipment Program (AEP)',
    tier: 'tier-3',
    badge: 'NSW State Scheme',
    body: [
      'EnableNSW administers the Aids and Equipment Program, which provides subsidised aids, equipment and appliances to eligible NSW residents with permanent or long-term disabilities.',
      'Continence aids may be available under this program for eligible residents with permanent, lifelong incontinence.',
      'Applicants must be enrolled in Medicare. Where eligible, CAPS should be accessed first, with EnableNSW acting as a supplementary funder.',
      'A referral from a medical practitioner or relevant health professional is required.'
    ],
    note: 'CAPS should be accessed first where eligible. EnableNSW provides supplementary funding.',
    link: 'https://www.enable.health.nsw.gov.au'
  },
  ACTES: {
    id: 'ACTES',
    name: 'ACT Equipment Scheme (ACTES)',
    tier: 'tier-3',
    badge: 'ACT State Scheme',
    body: [
      'ACTES provides subsidised aids and equipment, including continence products, to eligible ACT residents with a permanent disability.',
      'Eligible applicants must be ACT residents, Australian citizens or permanent residents, have a permanent disability causing incontinence, and hold a Pensioner Concession Card or Health Care Card.',
      'A referral from a medical practitioner or relevant health professional is required.'
    ],
    note: null,
    link: 'https://www.health.act.gov.au/services-and-programs/actes'
  },
  CPSS: {
    id: 'CPSS',
    name: 'Continence Management and Advice Service (CMAS) — Continence Product Subsidy Scheme (CPSS)',
    tier: 'tier-3',
    badge: 'WA State Scheme',
    body: [
      'The CPSS is administered by CMAS and provides subsidised continence products to eligible Western Australian residents aged 16 and over.',
      'Eligible applicants must be WA residents, Australian citizens or permanent residents, aged 16 or over, have permanent lifelong incontinence, and hold a Pensioner Concession Card or Health Care Card.',
      'CPSS can be used alongside CAPS to provide additional continence product funding.',
      'A referral from a medical practitioner or continence nurse is required.'
    ],
    note: 'Can be used alongside CAPS.',
    link: 'https://www.health.wa.gov.au/cpss'
  },
  COSA: {
    id: 'COSA',
    name: 'Continuity of Support Arrangements (CoSA)',
    tier: 'tier-3',
    badge: 'WA State Scheme',
    body: [
      'CoSA provides continued support for Western Australians with a permanent disability who are not eligible for the NDIS and were previously supported under state disability services.',
      'CoSA provides access to continence product funding through the Continence Product Subsidy Scheme (CPSS).',
      'Applicants must be WA residents, Australian citizens or permanent residents, have a permanent disability causing incontinence, and have been determined ineligible for the NDIS.'
    ],
    note: 'CoSA provides access to funding via the Continence Product Subsidy Scheme (CPSS).',
    link: 'https://www.ndis.gov.au/understanding/how-ndis-works/continuity-support'
  },
  TEP: {
    id: 'TEP',
    name: 'Territory Equipment Program (TEP)',
    tier: 'tier-3',
    badge: 'NT State Scheme',
    body: [
      'TEP provides subsidised aids and equipment, including continence products, to eligible Northern Territory residents.',
      'Eligible applicants must be NT residents, Australian citizens or permanent residents, with permanent lifelong incontinence, and either hold a Pensioner Concession Card or have a permanent disability causing incontinence.',
      'TEP can supplement CAPS and My Aged Care to provide additional continence product funding.',
      'A referral from a medical practitioner or relevant health professional is required.'
    ],
    note: 'Can supplement CAPS and My Aged Care funding.',
    link: 'https://health.nt.gov.au/professionals/allied-health/territory-equipment-program'
  }
};
// ─── Questions Definition ─────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: 'Q1',
    text: 'How old are you?',
    hint: '',
    type: 'single',
    options: [
      { value: 'under5',  label: 'Under 5' },
      { value: '5to15',   label: '5–15' },
      { value: '16to49',  label: '16–49' },
      { value: '50to64',  label: '50–64' },
      { value: '65plus',  label: '65 or older' }
    ],
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
    show: (a) => a.Q1 === '50to64'
  },
  {
    id: 'Q3',
    text: 'Which of the following best describes your residency status?',
    hint: '',
    type: 'single',
    options: [
      { value: 'au_pr',  label: 'Australian citizen or permanent resident' },
      { value: 'nz',     label: 'New Zealand citizen' },
      { value: 'neither',label: 'Neither' }
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
  {
    id: 'Q6',
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
    id: 'Q7',
    text: 'Which DVA card do you hold?',
    hint: '',
    type: 'single',
    options: [
      { value: 'gold',          label: 'Gold Card' },
      { value: 'white_inc',     label: 'White Card with incontinence as an accepted condition' },
      { value: 'white_no_inc',  label: 'White Card without incontinence as an accepted condition' },
      { value: 'neither',       label: 'Neither' }
    ],
    show: (a) => a.Q6 === 'yes'
  },
  {
    id: 'Q8',
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
    id: 'Q9',
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
    id: 'Q10',
    text: 'Do you work for an Australian Government agency or statutory authority?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: (a) => a.Q9 === 'yes'
  },
  {
    id: 'Q11',
    text: 'Do you have a permanent disability that causes your incontinence?',
    hint: 'e.g. spinal cord injury, brain injury, spina bifida, or multiple sclerosis',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: () => true
  },
  {
    id: 'Q12',
    text: 'Are you currently a National Disability Insurance Scheme (NDIS) participant, or do you think you may be eligible?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes_maybe', label: 'Yes / Maybe' },
      { value: 'no',        label: 'No' }
    ],
    show: (a) => a.Q11 === 'yes'
  },
  {
    id: 'Q13',
    text: 'Is your incontinence likely to be lifelong?',
    hint: '',
    type: 'single',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'no',  label: 'No' }
    ],
    show: () => true
  },
  {
    id: 'Q14',
    text: 'What is the underlying cause of your incontinence?',
    hint: '',
    type: 'single',
    options: [
      {
        value: 'neuro',
        label: 'Neurological condition (e.g. multiple sclerosis, spinal cord injury, brain injury, spina bifida, Parkinson\'s disease, stroke)'
      },
      {
        value: 'non_neuro',
        label: 'Non-neurological condition (e.g. prostate problems, pelvic floor weakness, bladder overactivity)'
      },
      { value: 'unsure', label: 'Unsure' }
    ],
    show: (a) => a.Q13 === 'yes'
  },
  {
    id: 'Q15',
    text: 'Do you currently hold any of the following concession cards?',
    hint: 'Select all that apply.',
    type: 'multi',
    options: (a) => {
      const opts = [
        { value: 'pcc',  label: 'Pensioner Concession Card' },
        { value: 'hcc',  label: 'Health Care Card' }
      ];
      if (a.Q5 === 'QLD') {
        opts.push({ value: 'qld_senior', label: 'Queensland Government Seniors Card' });
      }
      opts.push({ value: 'none', label: 'None of the above' });
      return opts;
    },
    show: () => true
  }
];
// ─── State ────────────────────────────────────────────────────────────────────
let answers      = {};
let history      = [];   // stack of question IDs in order answered
let currentQId   = null;
// ─── Helpers ──────────────────────────────────────────────────────────────────
function getQuestion(id) {
  return QUESTIONS.find(q => q.id === id);
}
/** Return the next visible question ID after the current one, or null if done */
function getNextQuestionId(afterId) {
  const idx = QUESTIONS.findIndex(q => q.id === afterId);
  for (let i = idx + 1; i < QUESTIONS.length; i++) {
    const q = QUESTIONS[i];
    const show = typeof q.show === 'function' ? q.show(answers) : true;
    if (show) return q.id;
  }
  return null;
}
/** Return question display number based on history position */
function getQuestionDisplayNumber(id) {
  // Use position in filtered (visible) list
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
  return QUESTIONS.filter(q => (typeof q.show === 'function' ? q.show(answers) : true)).length;
}
// ─── Render ───────────────────────────────────────────────────────────────────
function renderQuestion(qId) {
  const q = getQuestion