using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using api.Interfaces;

namespace api.EmailService
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration _configuration;

        public EmailSender(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendEmailAsync(string email, string confirmationLink)
        {
             var smtpHost = _configuration["EmailConfiguration:Host"];
            var smtpPortString  = _configuration["EmailConfiguration:Port"];
            var smtpUsername = _configuration["EmailConfiguration:Username"];
            var smtpPassword = _configuration["EmailConfiguration:Password"];
            var smtpFrom = _configuration["EmailConfiguration:From"];
 
            var message = new MailMessage();
            message.To.Add(email);
            message.From = new MailAddress(smtpFrom);
            message.Subject = "Welcome to Image Gallery App";
            message.Body = $@"<p>Hi,</p>
                            <h2>WELCOME TO Image Gallery App!</h2>
                            <p>Thank you for signing up for our online gallery app.</p>
                             <p><a href='http://localhost:3000' target='_blank' rel='noopener noreferrer'>Click here to sign in</a></p>
                            <p>Use these credentials when logging into your account:</p>
                            <p>Username: your registered Username</p>
                            <p>Password: The password you set when creating your account</p>";
            message.IsBodyHtml = true;
 
            using (var smtpClient = new SmtpClient(smtpHost))
            {
                smtpClient.Credentials = new NetworkCredential(smtpUsername, smtpPassword);
                smtpClient.Port = 587;
                await smtpClient.SendMailAsync(message);
            }
        }
    }
}