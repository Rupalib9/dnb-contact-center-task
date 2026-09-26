using CustomerSupportCase.DTOs;
using CustomerSupportCase.Entities;
using CustomerSupportCase.Repositories;
using System.Net;
using System.Runtime.Versioning;

namespace CustomerSupportCase.Services
{
    public class CaseService:ICaseService
    {
        private readonly ICaseRepository _caseRepository;
        public CaseService(ICaseRepository caseRepository) {
            _caseRepository = caseRepository;
        }
        public async Task<CaseDetailsResponse> CreateAsync(CreateCaseRequest request)
        {

            Guid id = Guid.NewGuid();
            var supportCase = new SupportCase
            {
                ID = id,
                ReferenceNo = GenerateReferemceNo(id),
                Subject = request.Subject,
                CustomerName = request.CustomerName,
                CustomerEmail = request.CustomerEmail,
                Description = request.Description,
                Priority = request.Priority,
                Status = CaseStatus.Open,
                CreatedOn = DateTime.UtcNow
            };
            await _caseRepository.AddAsync(supportCase);
            return MapToDetailsResponse(supportCase);

        }

        public string GenerateReferemceNo(Guid id)
        {
            string str = $"CASE-{id.ToString("N")[..8].ToUpper()}";
            return str;
           
        }
        public CaseDetailsResponse MapToDetailsResponse(SupportCase supportCase)
        {
           return new CaseDetailsResponse
            {
                ID = supportCase.ID,
                ReferenceNo = supportCase.ReferenceNo,
                CustomerName = supportCase.CustomerName,
                CustomerEmail = supportCase.CustomerEmail,
                Subject = supportCase.Subject,
                Description=supportCase.Description,
                Priority = supportCase.Priority,
                Status = supportCase.Status


            };
        }
       public async Task<CaseDetailsResponse> GetByIDAsync(Guid ID)
        {
            SupportCase? supportCase=await _caseRepository.GetByIdAsync(ID);
            if(supportCase is null)
            {
                return null;
            }

            return MapToDetailsResponse(supportCase);



        }
       public  async Task<bool> UpdateStatusAsync(Guid ID, UpdateCaseStatusRequest request)
        {
            SupportCase? supportCase = await _caseRepository.GetByIdAsync(ID);
            if(supportCase is null)
            {
                return false;
            }
            bool isValidateStatus = (supportCase.Status == CaseStatus.Open && request.Status == CaseStatus.InProgress) ||

                 (supportCase.Status == CaseStatus.Open && request.Status == CaseStatus.Resolved) ||
                  (supportCase.Status == CaseStatus.InProgress && request.Status == CaseStatus.Resolved) ;
            if (!isValidateStatus)
            {
                throw new  InvalidOperationException($"Can not change status from {supportCase.Status} " + $"to {request.Status}");
            }
            supportCase.Status =  request.Status;
            supportCase.ModifiedOn = DateTime.UtcNow;
            await _caseRepository.UpdateAsync(supportCase);
            return true;
        }


        public async Task<List<CaseDetailsResponse>> SearchCaseAsync(string? search)
        {
            var result= await _caseRepository.SearchCaseAsync(search);

            return result.Select(x => new CaseDetailsResponse
            {
                ID=x.ID,
                ReferenceNo=x.ReferenceNo,
                Subject=x.Subject,
                CustomerName=x.CustomerName,
                CustomerEmail=x.CustomerEmail,
                Description=x.Description,
                Priority=x.Priority,
                Status=x.Status,
                CreatedOn=x.CreatedOn

            }).ToList();

        }


    }
}
