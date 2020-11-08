using System;
using Microsoft.AspNetCore.Mvc;
using CommWebApi.Models;
using CommWebApi.DBWrappers;
using CommWebApi.Messages;

namespace CommWebApi.Controllers {

    [ApiController]
    [Route("CMS/new_app")]

    public class CommWebController : ControllerBase {

        [HttpGet]
        public string Get(){
            return "Hello World!";
        }

        [HttpPost]
        public string Post([FromBody] CommWeb_Model AppModel){
            var app_msg = new App_Message(AppModel.first_name, AppModel.last_name, AppModel.email_address);
            return "Sent to " + AppModel.first_name + " " + AppModel.last_name;
            // DBWrapper Wrapper = new DBWrapper();
            // if (!Wrapper.check_for_duplicate(AppModel.email_address)){
            //     var app_msg = new App_Message(AppModel.first_name, AppModel.last_name, AppModel.email_address);
            //     Wrapper = null;
            //     return "Added to DB";
            // }
            // Wrapper = null;
            // return "Duplicate Entry";
        }
    }
}