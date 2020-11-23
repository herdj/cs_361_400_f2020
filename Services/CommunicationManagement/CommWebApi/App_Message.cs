using System;
using System.Net;
using System.Net.Mail;

namespace CommWebApi.Messages{

    public class App_Message : Message {
        public App_Message (string first_name, string last_name, string email_addr){
            user_name = first_name + " " + last_name;
            to = new MailAddress(email_addr);
            mail_message = new MailMessage(from, to);
            mail_message.Subject = "So " + first_name + ", we hear you are an expert.";
            mail_message.Body = Application_Body;
            mail_message.IsBodyHtml = true;
            send_message();
        }
        private MailMessage mail_message {get; set;}
        private static string Application_Body = "<p>You've been invited to join our OSU expert finder. Show off your skills today!</p><p><a href='http://localhost:3000/invite-landing'>Join Us!</a></p>";
        private static string mail_server = "smtp.mailtrap.io";
        private static string mail_username = "03640829aff133";
        private static string mail_pw = "1f0c7652f271d8";
        private static int out_mail_port = 2525;

        private void send_message(){
            using SmtpClient smtp_client = new SmtpClient(mail_server, out_mail_port){
                Credentials = new NetworkCredential(mail_username, mail_pw),
                EnableSsl = true
            };
            try{
                smtp_client.Send(mail_message);
            }
            catch (SmtpException fail_msg){
                Console.Write(fail_msg);
            }
        }
    }
}