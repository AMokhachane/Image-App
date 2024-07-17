using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using api.Interfaces;

namespace api.EmailService
{
    public class EmailSender : IEmailSender
    {
        public async Task SendEmailAsync(string email, string subject, string message)
        {
            using (var client = new SmtpClient("smtp-mail.outlook.com", 587)) // MailHog SMTP server address and port
            {
                var mailMessage = new MailMessage
                {
                    From = new MailAddress("AmandaMokhachane88@outlook.com"), // Replace with your sender email address
                    Subject = subject,
                    Body = message,
                    IsBodyHtml = true // Set to true if your message body is in HTML format
                };

                mailMessage.To.Add(email);

                await client.SendMailAsync(mailMessage);
            }
        }
    }
}