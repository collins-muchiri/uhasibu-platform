const AT = require('@africastalking').default;
const crypto = require('crypto');

const sms = AT({ username: process.env.AFRICAS_TALKING_USERNAME, apiKey: process.env.AFRICAS_TALKING_API_KEY }).SMS;

async function sendOTP(phone) {
  const otp = crypto.randomInt(100000, 999999).toString();
  const message = `Uhasibu OTP: ${otp}. Valid for 5 mins. Do not share.`;

  const response = await sms.send({ to: phone, message });
  console.log('SMS Response:', response);

  return { success: response.SMSMessageData.Recipients[0].status === 'Sent', otp };
}

module.exports = { sendOTP };