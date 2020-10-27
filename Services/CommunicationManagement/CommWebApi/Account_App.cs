using System;
using CommWebApi.DBWrappers;

namespace CommWebApi.Account_App {

    public class Account_App {

        public Account_App(string user_first_name, string user_last_name, string user_email_addr) {
            first_name = user_first_name;
            last_name = user_last_name;
            email_addr = user_email_addr;
        }

        public string first_name {get; set;}
        public string last_name {get; set;}
        public string email_addr {get; set;}

    }
}