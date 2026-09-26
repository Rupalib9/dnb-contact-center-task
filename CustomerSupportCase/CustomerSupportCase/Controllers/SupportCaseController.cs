using CustomerSupportCase.DTOs;
using CustomerSupportCase.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace CustomerSupportCase.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SupportCaseController : ControllerBase
    {
        private readonly ICaseService _caseService;
       public  SupportCaseController   (ICaseService caseService) {

            _caseService = caseService;
        }

        [HttpPost]
        public async Task<ActionResult<CaseDetailsResponse>>Create([FromBody]CreateCaseRequest request)
        {
            CaseDetailsResponse response = await _caseService.CreateAsync(request);
            return Ok(response);

        }

        [HttpGet("{ID:Guid}")]
        public async Task<ActionResult<CaseDetailsResponse>>GetByID(Guid ID)
        {
            CaseDetailsResponse ? response=await _caseService.GetByIDAsync(ID);
            if (response is null)
            {
                return NotFound();
            }
            return Ok(response);


        }
        [HttpPut("{ID:Guid}")]

        public async Task<ActionResult>UpdateStatus(Guid ID, [FromBody] UpdateCaseStatusRequest request)
        {
            
            bool updated = await _caseService.UpdateStatusAsync(ID, request);
            if (!updated) { return NotFound(); }
            return NoContent();
            
        }
        [HttpGet("SearchCaseAsync")]
        public async Task<ActionResult> SearchCaseAsync([FromQuery]string? search)
        {
            var result= await _caseService.SearchCaseAsync(search);
            return Ok(result);
        }

    }
}
