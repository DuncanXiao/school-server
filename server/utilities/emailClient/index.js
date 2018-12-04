import nodemailer from 'nodemailer';

// const mail = {
// 	// 发件人
// 	from: 'xck_feimao@163.com',
// 	// 主题
// 	subject: '测试',
// 	// 收件人
// 	to: '429437522@qq.com'
// };
// 创建一个SMTP客户端配置
const config = {
	host: 'smtp.163.com',
	port: 25,
	auth: {
		user: 'xck_feimao@163.com', //刚才注册的邮箱账号
		pass: 'sm664523'  //邮箱的授权码
	}
};

// 创建一个SMTP客户端对象
const transporter = nodemailer.createTransport(config);

// 发送邮件
const sendMail = (data) => {
	const mail = Object.assign({
		from: 'xck_feimao@163.com',
		subject: 'Verifying email.'
	}, data);
	transporter.sendMail(mail, (error, info) => {
		if(error) {
			// eslint-disable-next-line no-console
			return console.log(error);
		}
		// eslint-disable-next-line no-console
		console.log('mail sent:', info.response);
	});
};

export default sendMail;