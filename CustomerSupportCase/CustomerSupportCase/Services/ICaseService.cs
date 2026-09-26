using CustomerSupportCase.DTOs;
using CustomerSupportCase.Entities;

namespace CustomerSupportCase.Services
{
    public interface ICaseService
    {
        Task<CaseDetailsResponse> CreateAsync(CreateCaseRequest request);
        Task<CaseDetailsResponse> GetByIDAsync(Guid ID);
        Task<bool> UpdateStatusAsync(Guid ID,UpdateCaseStatusRequest request);
        Task<List<CaseDetailsResponse>> SearchCaseAsync(string? search);

    }
}
