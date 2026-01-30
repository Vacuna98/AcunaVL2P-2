using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using myapi.Services;


namespace myapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RpslsController : ControllerBase
    {
        private readonly RpslsService _service;

        public RpslsController(RpslsService service)
        {
            _service = service;
        }

        [HttpGet("{userInput}")]
        
        public string GetResponse(string userInput)
        {
            return _service.GetResponse(userInput);
        }
    }
}