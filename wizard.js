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
    name: "Comcare — Commonwealth Workers' Compensation",
    tier: 'tier-stop',
    badge: 'Work Accident Scheme',
    body: [
      "Comcare administers the Commonwealth workers' compensation scheme for Australian Government employees and their employers.",
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
      "WorkSafe Victoria's WorkCover scheme provides compensation and support for workers injured in Victoria.",
      'Continence-related aids and equipment may be covered where the need is related to a compensable work injury.'
    ],
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
    name: "Department of Veterans' Affairs (DVA) — Rehabilitation Appliances Program (RAP)",
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
      'Eligible applicants must be Queensland residents, hold Australian citizenship or permanent residency, and hold a relevant concession card (Pensioner Concession Card, Health Care Card, or Queensland Government Seniors Card).',
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
      { value: 'under5', label: 'Under 5' },
      { value: '5to15',  label: '5\u201315' },
      { value: '16to49', label: '16\u201349' },
      { value: '50to64', label: '50\u201364' },
      { value: '65plus', label: '65 or older' }
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
      { value: 'gold',         label: 'Gold Card' },
      { value: 'white_inc',    label: 'White Card with incontinence as an accepted condition' },
      { value: 'white_no_inc', label: 'White Card without incontinence as an accepted condition' },
      { value: 'neither',      label: 'Neither' }
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
        { value: 'pcc', label: 'Pensioner Concession Card' },
        { value: 'hcc', label: 'Health Care Card' }
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
  // cards = array of strings e.g. ['pcc','hcc']
  const held = getMultiAnswer('Q15');
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
  document.getElementById('questionNumber').textContent = q.id;
  document.getElementById('questionText').textContent   = q.text;
  document.getElementById('questionHint').textContent   = q.hint || '';
  document.getElementById('questionHint').style.display = q.hint ? 'block' : 'none';
  // Build options
  const container = document.getElementById('optionsContainer');
  container.innerHTML = '';
  const opts = typeof q.options === 'function' ? q.options(answers) : q.options;
  if (q.type === 'single') {
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-btn';
      btn.type      = 'button';
      // Pre-select if already answered
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
        // Deselect all
        container.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        answers[q.id] = opt.value;
        document.getElementById('nextBtn').disabled = false;
      });
      container.appendChild(btn);
    });
  } else if (q.type === 'multi') {
    // Initialise answer array if not present
    if (!answers[q.id]) answers[q.id] = [];
    opts.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'option-checkbox-btn';
      btn.type      = 'button';
      const alreadySelected = answers[q.id].includes(opt.value);
      if (alreadySelected) btn.classList.add('selected');
      btn.innerHTML = `
        <span class="option-checkbox">
          <span class="option-checkbox-tick">&#10003;</span>
        </span>
        <span class="option-label">${opt.label}</span>
      `;
      btn.addEventListener('click', () => {
        const isNone    = opt.value === 'none';
        const arr       = answers[q.id];
        const btnSelected = btn.classList.contains('selected');
        if (isNone) {
          // Selecting "None" clears all others
          container.querySelectorAll('.option-checkbox-btn').forEach(b => {
            b.classList.remove('selected');
          });
          answers[q.id] = [];
          if (!btnSelected) {
            btn.classList.add('selected');
            answers[q.id] = ['none'];
          }
        } else {
          // Deselect "none" if another option is picked
          container.querySelectorAll('.option-checkbox-btn').forEach(b => {
            const label = b.querySelector('.option-label');
            if (label && b !== btn) {
              // find matching opt value
              const matchOpt = opts.find(o => o.label === label.textContent);
              if (matchOpt && matchOpt.value === 'none') {
                b.classList.remove('selected');
                answers[q.id] = answers[q.id].filter(v => v !== 'none');
              }
            }
          });
          if (btnSelected) {
            btn.classList.remove('selected');
            answers[q.id] = arr.filter(v => v !== opt.value);
          } else {
            btn.classList.add('selected');
            if (!arr.includes(opt.value)) arr.push(opt.value);
          }
        }
        // Enable Next if at least one option selected
        document.getElementById('nextBtn').disabled = answers[q.id].length === 0;
      });
      container.appendChild(btn);
    });
    // Enable Next if already has selections from back-navigation
    document.getElementById('nextBtn').disabled = answers[q.id].length === 0;
  }
  // Enable Next button for single if already answered
  if (q.type === 'single') {
    document.getElementById('nextBtn').disabled = !answers[q.id];
  }
  // Back button
  document.getElementById('backBtn').disabled = history.length === 0;
  // Show question card, hide results
  document.getElementById('questionCard').style.display  = 'block';
  document.getElementById('resultsCard').style.display   = 'none';
  document.getElementById('progressContainer').style.display = 'block';
}
// ─── Navigation ───────────────────────────────────────────────────────────────
function goNext() {
  const q = getQuestion(currentQId);
  if (!q) return;
  // Validate
  if (q.type === 'single' && !answers[q.id]) return;
  if (q.type === 'multi'  && (!answers[q.id] || answers[q.id].length === 0)) return;
  // Push current to history
  history.push(currentQId);
  // Clear answers for questions that are now hidden due to new answer
  // (handles branching — e.g. if user changes Q3 from 'neither' back to 'au_pr',
  //  Q4 should be cleared)
  invalidateStaleAnswers();
  const nextId = getNextQuestionId(currentQId);
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
/**
 * After changing an answer, clear stored answers for any question
 * that is no longer visible (avoids stale data affecting output logic).
 */
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
  // Convenience aliases
  const age        = a.Q1;
  const atsi       = a.Q2;          // 'yes'|'no'|undefined
  const residency  = a.Q3;          // 'au_pr'|'nz'|'neither'
  const medicare   = a.Q4;          // 'yes'|'no'|undefined
  const state      = a.Q5;
  const veteran    = a.Q6;          // 'yes'|'no'
  const dvaCard    = a.Q7;          // 'gold'|'white_inc'|'white_no_inc'|'neither'|undefined
  const mva        = a.Q8;          // 'yes'|'no'
  const work       = a.Q9;          // 'yes'|'no'
  const govWorker  = a.Q10;         // 'yes'|'no'|undefined
  const disability = a.Q11;         // 'yes'|'no'
  const ndis       = a.Q12;         // 'yes_maybe'|'no'|undefined
  const lifelong   = a.Q13;         // 'yes'|'no'
  const cause      = a.Q14;         // 'neuro'|'non_neuro'|'unsure'|undefined
  const cards      = a.Q15 || [];   // array
  const isAuPR     = residency === 'au_pr';
  const isNZ       = residency === 'nz';
  const hasMedicare = medicare === 'yes';
  // Eligible for aged care pathway?
  const agedCareAge = age === '65plus' || (age === '50to64' && atsi === 'yes');
  const agedCareResidency = isAuPR || isNZ || hasMedicare;
  const hasPCC     = cards.includes('pcc');
  const hasHCC     = cards.includes('hcc');
  const hasQldSenior = cards.includes('qld_senior');
  const hasAnyConcession = hasPCC || hasHCC || hasQldSenior;
  // Result buckets
  const tier1    = [];  // MVA / Work / DVA RAP — STOP schemes
  const tier2    = [];  // NDIS, My Aged Care, CAPS, MASS
  const tier3    = [];  // State top-up schemes
  let   stopHere = false;
  // ── EARLY EXIT CHECK ─────────────────────────────────────────
  // Condition A: no lifelong, no MVA, no work, no veteran, no disability
  const conditionA =
    lifelong   === 'no' &&
    mva        === 'no' &&
    work       === 'no' &&
    veteran    === 'no' &&
    disability === 'no';
  // Condition B: neither citizen/NZ/PR, no Medicare, no MVA, no work, no veteran
  const conditionB =
    residency === 'neither' &&
    medicare  === 'no' &&
    mva       === 'no' &&
    work      === 'no' &&
    veteran   === 'no';
  if (conditionA || conditionB) {
    return { noSchemes: true, tier1: [], tier2: [], tier3: [] };
  }
  // ── TIER 1: MVA ───────────────────────────────────────────────
  if (mva === 'yes') {
    switch (state) {
      case 'VIC': tier1.push(SCHEMES.TAC);        break;
      case 'NSW': tier1.push(SCHEMES.ICARE_MVA);  break;
      case 'QLD': tier1.push(SCHEMES.NIISQ_MVA);  break;
      case 'SA':  tier1.push(SCHEMES.LSA);        break;
      case 'WA':  tier1.push(SCHEMES.ICWA_MVA);   break;
      case 'NT':  tier1.push(SCHEMES.MAC);        break;
      case 'TAS': tier1.push(SCHEMES.MAIB);       break;
      case 'ACT': tier1.push(SCHEMES.ACT_MVA_NIL); break;
      default:    break;
    }
    stopHere = true;
  }
  // ── TIER 1: WORK ACCIDENT ─────────────────────────────────────
  if (work === 'yes') {
    if (govWorker === 'yes') {
      tier1.push(SCHEMES.COMCARE);
    } else {
      switch (state) {
        case 'VIC': tier1.push(SCHEMES.WORKSAFE_VIC);  break;
        case 'NSW': tier1.push(SCHEMES.ICARE_WORK);    break;
        case 'QLD': tier1.push(SCHEMES.WORKSAFE_QLD);  break;
        case 'WA':  tier1.push(SCHEMES.ICWA_WORK);     break;
        case 'SA':  tier1.push(SCHEMES.SA_WORK_NIL);   break;
        case 'TAS': tier1.push(SCHEMES.TAS_WORK_NIL);  break;
        case 'NT':  tier1.push(SCHEMES.NT_WORK_NIL);   break;
        case 'ACT': tier1.push(SCHEMES.ACT_WORK_NIL);  break;
        default:    break;
      }
    }
    stopHere = true;
  }
  // If MVA or Work — STOP, return only tier1
  if (stopHere) {
    return { noSchemes: false, tier1, tier2: [], tier3: [] };
  }
  // ── TIER 1: DVA RAP ──────────────────────────────────────────
  let dvaRapRecommended = false;
  if (veteran === 'yes' && (dvaCard === 'gold' || dvaCard === 'white_inc')) {
    tier1.push(SCHEMES.DVA_RAP);
    dvaRapRecommended = true;
    return { noSchemes: false, tier1, tier2: [], tier3: [] };
  }
  // If veteran but wrong card type — continue to Tier 2
  // ── TIER 2: NDIS ──────────────────────────────────────────────
  let ndisRecommended = false;
  if (
    disability === 'yes' &&
    ndis === 'yes_maybe' &&
    (isAuPR || isNZ)
  ) {
    if (age === 'under5') {
      tier2.push(SCHEMES.NDIS_EARLY_CHILDHOOD);
    } else {
      tier2.push(SCHEMES.NDIS);
    }
    ndisRecommended = true;
    return { noSchemes: false, tier1, tier2, tier3: [] };
  }
  // ── TIER 2: MY AGED CARE ──────────────────────────────────────
  let myAgedCareRecommended = false;
  if (agedCareAge && agedCareResidency) {
    tier2.push(SCHEMES.MY_AGED_CARE);
    myAgedCareRecommended = true;
    // Do NOT stop — continue to Tier 3
  }
  // ── TIER 2: MASS (QLD only, if My Aged Care NOT recommended) ──
  let massRecommended = false;
  if (!myAgedCareRecommended && state === 'QLD' && isAuPR && lifelong === 'yes' && hasAnyConcession) {
    tier2.push(SCHEMES.MASS);
    massRecommended = true;
    // Continue to Tier 3
  }
  // ── TIER 2: CAPS ──────────────────────────────────────────────
  // Only if: not My Aged Care, not QLD (MASS takes priority), AU citizen/PR,
  // lifelong, age 5+, and correct cause/card combination
  let capsRecommended = false;
  if (
    !myAgedCareRecommended &&
    !massRecommended &&
    state !== 'QLD' &&
    isAuPR &&
    lifelong === 'yes' &&
    age !== 'under5'
  ) {
    const capsQualifies =
      cause === 'neuro' ||
      (cause === 'non_neuro' && hasPCC) ||
      (cause === 'unsure'    && hasPCC);
    if (capsQualifies) {
      tier2.push(SCHEMES.CAPS);
      capsRecommended = true;
    }
  }
  // ── EARLY EXIT: No schemes at all ────────────────────────────
  // If we reach here with nothing in tier1/tier2 and lifelong = 'no'
  if (
    tier1.length === 0 &&
    tier2.length === 0 &&
    lifelong === 'no'
  ) {
    return { noSchemes: true, tier1: [], tier2: [], tier3: [] };
  }
  // ── TIER 3: STATE-BASED TOP-UP SCHEMES ───────────────────────
  // Only if MVA, Work, DVA RAP, NDIS not recommended
  // VIC — SWEP
  if (
    state === 'VIC' &&
    isAuPR &&
    lifelong === 'yes' &&
    (disability === 'yes' || age === '65plus')
  ) {
    tier3.push(SCHEMES.SWEP);
  }
  // NSW — EnableNSW
  if (
    state === 'NSW' &&
    (isAuPR || isNZ || hasMedicare) &&
    lifelong === 'yes'
  ) {
    tier3.push(SCHEMES.ENABLE_NSW);
  }
  // ACT — ACTES
  if (
    state === 'ACT' &&
    isAuPR &&
    disability === 'yes' &&
    (hasPCC || hasHCC)
  ) {
    tier3.push(SCHEMES.ACTES);
  }
  // WA — CPSS
  if (
    state === 'WA' &&
    isAuPR &&
    (age === '16to49' || age === '50to64' || age === '65plus') &&
    lifelong === 'yes' &&
    (hasPCC || hasHCC)
  ) {
    tier3.push(SCHEMES.CPSS);
  }
  // WA — CoSA
  if (
    state === 'WA' &&
    isAuPR &&
    disability === 'yes' &&
    ndis === 'no' &&
    lifelong === 'yes'
  ) {
    tier3.push(SCHEMES.COSA);
  }
  // NT — TEP
  if (
    state === 'NT' &&
    isAuPR &&
    lifelong === 'yes' &&
    (hasPCC || disability === 'yes')
  ) {
    tier3.push(SCHEMES.TEP);
  }
  // QLD — MASS already handled in Tier 2; no additional Tier 3 for QLD
  // SA  — No Tier 3 scheme identified
  // TAS — No Tier 3 scheme identified
  return { noSchemes: false, tier1, tier2, tier3 };
}
// ─── Results Rendering ────────────────────────────────────────────────────────
function showResults() {
  const result = computeResults();
  document.getElementById('questionCard').style.display     = 'none';
  document.getElementById('progressContainer').style.display = 'none';
  document.getElementById('resultsCard').style.display      = 'block';
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
  intro.textContent = `Based on your answers, we have identified ${count} potential funding scheme${count !== 1 ? 's' : ''} you may be eligible for. Click each scheme to learn more.`;
  // Tier 1
  if (result.tier1.length > 0) {
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
    content.appendChild(label);
    result.tier1.forEach(s => content.appendChild(buildSchemeCard(s)));
  }
  // Tier 2
  if (result.tier2.length > 0) {
    const label = document.createElement('p');
    label.className   = 'results-section-label';
    label.textContent = 'Primary Funding Scheme';
    content.appendChild(label);
    result.tier2.forEach(s => content.appendChild(buildSchemeCard(s)));
  }
  // Tier 3
  if (result.tier3.length > 0) {
    const label = document.createElement('p');
    label.className   = 'results-section-label';
    label.textContent = 'State-Based Top-Up Scheme';
    content.appendChild(label);
    result.tier3.forEach(s => content.appendChild(buildSchemeCard(s)));
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
  header.addEventListener('click', () => {
    const isOpen = card.classList.contains('open');
    // Close all other open cards
    document.querySelectorAll('.scheme-card.open').forEach(c => c.classList.remove('open'));
    if (!isOpen) card.classList.add('open');
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
