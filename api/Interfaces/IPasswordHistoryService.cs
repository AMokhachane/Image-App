using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Interfaces
{
    public interface IPasswordHistoryService
    {
        Task<bool> CheckPasswordHistoryAsync(string userId, string newPassword);
    }
}