using CustomerSupportCase.Entities;

namespace CustomerSupportCase.DTOs
{
    public class CreateCaseRequest
    {
       // public Guid Id { get; set; }

        public string CustomerName { get; set; } = null!;
        public string CustomerEmail { get; set; } = null!;


        public string Subject { get; set; } = null!;

        public string Description { get; set; } = null!;

        public CasePriority Priority { get; set; }
    }
}
