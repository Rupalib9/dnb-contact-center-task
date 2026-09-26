using CustomerSupportCase.DTOs;
using CustomerSupportCase.Entities;

namespace CustomerSupportCase.Repositories
{
    public interface ICaseRepository
    {
        Task AddAsync(SupportCase supportCase);
        Task<SupportCase?> GetByIdAsync(Guid id);
        Task UpdateAsync(SupportCase supportCase);
        Task<List<SupportCase>> SearchCaseAsync(string? search);

    }
}
