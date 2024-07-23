using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interfaces;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;
using BCrypt.Net; // Ensure you have this using directive



namespace api.Service
{
    public class PasswordHistoryService : IPasswordHistoryService
    {
        private readonly ApplicationDBContext _context; // Assuming you have an EF Core DbContext

        public PasswordHistoryService(ApplicationDBContext context)
        {
            _context = context;
        }

       public async Task<bool> CheckPasswordHistoryAsync(string userId, string newPassword)
        {
            // var passwordHistories = await _context.PasswordHistories
            //     .Where(ph => ph.UserId == userId)
            //     .ToListAsync();

            // foreach (var passwordHistory in passwordHistories)
            // {
            //     if (BCrypt.Net.BCrypt.Verify(newPassword, passwordHistory.PasswordHash))
            //     {
            //         return true; // Password has been used before
            //     }
            // }

            return false; // Password is new
        }
    }
}