const nodemailer = require('nodemailer');

// 配置邮件发送
async function sendEmail(htmlContent) {
  const senderEmail = process.env.EMAIL;
  const receiverEmail = process.env.RECEIVER_EMAIL;
  const password = process.env.PASSWORD;  // 注意：使用163邮箱的授权码，而不是密码

  const transporter = nodemailer.createTransport({
    service: '163',
    auth: {
      user: senderEmail,
      pass: password
    }
  });

  const mailOptions = {
    from: senderEmail,
    to: receiverEmail,
    subject: '网页内容',
    html: htmlContent
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('邮件发送成功');
  } catch (error) {
    console.error('邮件发送失败:', error);
  }
}

// 下载网页内容
async function fetchWebPage(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const htmlContent = await response.text();
    return htmlContent;
  } catch (error) {
    console.error('下载网页失败:', error);
    return '';
  }
}

(async () => {
  const url = 'https://www.safe.gov.cn/safe/2025/0206/25744.html';  // 替换为你需要下载的网页
  const htmlContent = await fetchWebPage(url);
  await sendEmail(htmlContent);
})();
