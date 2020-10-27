using System;
using Microsoft.AspNetCore.Mvc;
using CommWebApi.Models;
using CommWebApi.DBWrappers;

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
            DBWrapper Wrapper = new DBWrapper();
            if (!Wrapper.check_for_duplicate(AppModel.email_address)){
                Wrapper.add_to_DB(AppModel.first_name, AppModel.last_name, AppModel.email_address);
                Wrapper = null;
                return "Added to DB";
            }
            Wrapper = null;
            return "Duplicate Entry";
        }
    }
}