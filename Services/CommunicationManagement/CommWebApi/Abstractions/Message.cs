using System;
using System.Net;
using System.Net.Mail;

namespace CommWebApi.Messages {

    public class Message{
        protected Message() {}
        protected string user_name {get; set;}
        static string from_address = "from@smtp.mailtrap.io";
        protected static MailAddress to {get; set;}
        protected static MailAddress from = new MailAddress(from_address);
    }
}