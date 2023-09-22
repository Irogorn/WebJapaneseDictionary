import mail from 'fastify-mailer'

export default async function mailer(app) {
    app.register(mail, {
                        defaults: { from: process.env.FROM },
                        transport: {
                                        host: process.env.MAIL_HOST,
                                        port: process.env.MAIL_PORT,                                      
                                        auth: {
                                            user: process.env.USER,
                                            pass: process.env.PASS}
                                    }
                                });

}