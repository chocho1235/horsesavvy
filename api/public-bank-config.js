// Publicly readable bank details from environment
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  res.status(200).json({
    accountName: process.env.PUBLIC_BANK_ACCOUNT_NAME || 'BeHorseSavvy Ltd',
    sortCode: process.env.PUBLIC_BANK_SORT_CODE || '12-34-56',
    accountNumber: process.env.PUBLIC_BANK_ACCOUNT_NUMBER || '87654321',
    bankName: process.env.PUBLIC_BANK_NAME || 'Lloyds Bank'
  });
}


