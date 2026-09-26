using CustomerSupportCase.Data;
using CustomerSupportCase.Entities;
using Microsoft.EntityFrameworkCore;

namespace CustomerSupportCase.Repositories
{
    public class CaseRepository:ICaseRepository
    {
        private readonly AppDbContext _context;
        public CaseRepository(AppDbContext context)
        {
            _context = context;
        }
        public async Task AddAsync(SupportCase supportCase)
        {
            await _context.SupportCases.AddAsync(supportCase);
            await _context.SaveChangesAsync();
        }
        public async Task<SupportCase?> GetByIdAsync(Guid id)
        {
            return await _context.SupportCases.FirstOrDefaultAsync(x => x.ID == id);
        }
       public async Task UpdateAsync(SupportCase supportCase)
        {
             _context.SupportCases.Update(supportCase);
            await _context.SaveChangesAsync();

        }
        public async Task<List<SupportCase>> SearchCaseAsync(string? search)
        {
            var result = _context.SupportCases.AsQueryable();

            if(!string.IsNullOrEmpty(search))
            {
                search = search.Trim();

                result = result.Where(x => x.ReferenceNo.Contains(search) ||
                x.CustomerName.Contains(search) ||
                x.CustomerEmail.Contains(search) ||
                x.Subject.Contains(search));
            }
            return await result.ToListAsync();
        }

    }
}
