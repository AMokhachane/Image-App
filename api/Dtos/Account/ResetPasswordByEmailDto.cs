using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Account
{
    public class ResetPasswordByEmailDto
    {
        public string Email { get; set; }
    public string NewPassword { get; set; }
    
    }
}