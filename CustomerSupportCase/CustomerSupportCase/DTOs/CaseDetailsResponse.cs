using CustomerSupportCase.Entities;

namespace CustomerSupportCase.DTOs
{
    public class CaseDetailsResponse
    {
        public Guid ID { get; set; }
        public string ReferenceNo { get; set; }
        public string CustomerName { get; set; }
        public string CustomerEmail { get; set; }
        public string Subject { get; set; }
        public string Description { get; set; }
        public CaseStatus Status { get; set; }
        public CasePriority Priority { get; set; }

        public DateTime CreatedOn { get; set; }
        public DateTime ModifiedOn { get; set; }

    }
}
