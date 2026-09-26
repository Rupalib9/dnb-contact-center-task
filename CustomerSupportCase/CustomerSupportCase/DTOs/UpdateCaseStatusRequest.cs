using CustomerSupportCase.Entities;
using System.ComponentModel.DataAnnotations;

namespace CustomerSupportCase.DTOs
{
    public class UpdateCaseStatusRequest
    {
        [Required]
        public CaseStatus Status { get; set; }
    }
}
