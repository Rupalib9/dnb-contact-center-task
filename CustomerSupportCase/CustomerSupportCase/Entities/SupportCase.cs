
using System.ComponentModel.DataAnnotations;

namespace CustomerSupportCase.Entities
{
    public class SupportCase
    {
        public Guid ID { get; set; }
        [Required]
        public string ReferenceNo { get; set; }
        [Required]
        [MaxLength(200)]
        public string CustomerName { get; set; }
        [Required]
        [MaxLength(200)]
        [EmailAddress]
        public string CustomerEmail { get; set; }
        [Required]
        [MaxLength(200)]
        public string Subject { get; set; }
        [Required]
        [MaxLength(2000)]
        public string Description { get; set; }
        public CaseStatus Status { get; set; }
        [Required]
        public CasePriority Priority { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }





    }
    public enum CaseStatus
    {
        Open=0,InProgress=1,Resolved=2
    }

    public enum CasePriority
    {
        Low = 0, Medium = 1, High = 2
    }
}
