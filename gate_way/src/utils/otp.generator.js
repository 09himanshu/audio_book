
// Function to generate opt
async function generateOTP() {
    var digits = '0123456789';
    var OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return OTP;
}
  
export {generateOTP};