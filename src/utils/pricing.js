export function calcPrice(n) {
  let per
  if (n <= 100) per = 200
  else if (n <= 500) per = 150
  else if (n <= 2000) per = 120
  else if (n <= 5000) per = 100
  else if (n <= 10000) per = 80
  else per = 60
  return { per, total: n * per }
}

export function fmtNaira(n) {
  if (n >= 1_000_000) return '₦' + (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000) return '₦' + (n / 1_000).toFixed(0) + 'k'
  return '₦' + n.toLocaleString()
}

export function getBreakdown(n) {
  const ng = Math.round(n * 0.39)
  const gr = Math.round(n * 0.23)
  const ke = Math.round(n * 0.14)
  const sa = Math.round(n * 0.12)
  const oa = Math.max(0, n - ng - gr - ke - sa)
  return { ng, gr, ke, sa, oa }
}

export const COMPANIES = [
  { name: 'Paystack',         domain: 'paystack.com',        flag: '🇳🇬' },
  { name: 'Flutterwave',      domain: 'flutterwave.com',     flag: '🇳🇬' },
  { name: 'Safaricom',        domain: 'safaricom.co.ke',     flag: '🇰🇪' },
  { name: 'Yoco',             domain: 'yoco.com',            flag: '🇿🇦' },
  { name: 'GitLab',           domain: 'gitlab.com',          flag: '🌍' },
  { name: 'Deel',             domain: 'deel.com',            flag: '🌍' },
  { name: 'mPharma',          domain: 'mpharma.com',         flag: '🇬🇭' },
  { name: 'Fawry',            domain: 'fawry.com',           flag: '🇪🇬' },
  { name: 'Kuda Bank',        domain: 'kuda.com',            flag: '🇳🇬' },
  { name: 'Stripe',           domain: 'stripe.com',          flag: '🌍' },
  { name: 'Moniepoint',       domain: 'moniepoint.com',      flag: '🇳🇬' },
  { name: 'Notion',           domain: 'notion.so',           flag: '🌍' },
  { name: 'Takealot',         domain: 'takealot.com',        flag: '🇿🇦' },
  { name: 'Andela',           domain: 'andela.com',          flag: '🇳🇬' },
  { name: 'Zapier',           domain: 'zapier.com',          flag: '🌍' },
  { name: 'PiggyVest',        domain: 'piggyvest.com',       flag: '🇳🇬' },
  { name: 'Twiga Foods',      domain: 'twigafoods.com',      flag: '🇰🇪' },
  { name: 'Hugging Face',     domain: 'huggingface.co',      flag: '🌍' },
  { name: 'Carbon',           domain: 'carbon.ng',           flag: '🇳🇬' },
  { name: 'Figma',            domain: 'figma.com',           flag: '🌍' },
  { name: 'Naked Insurance',  domain: 'nakedinsurance.co.za',flag: '🇿🇦' },
  { name: 'Paymob',           domain: 'paymob.com',          flag: '🇪🇬' },
  { name: 'Coinbase',         domain: 'coinbase.com',        flag: '🌍' },
]
