using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class PasswordHistory
    {
        public int Id { get; set; }
        public string UserId { get; set; } // Ensure this property exists
        public string PasswordHash { get; set; }
        public DateTime CreatedDate { get; set; }
    }
}