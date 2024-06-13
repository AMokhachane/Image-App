using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.User
{
    public class CreateUserRequestDto
    {
        [Required]
        [MaxLength(50, ErrorMessage = "Your full name can not be over 50 characters")]
    public string FullName { get; set; } = string.Empty;
       [Required]
        [MaxLength(50, ErrorMessage = "Your email address can not be over 50 characters")] 
    public string EmailAddress { get; set; } = string.Empty;
        [Required]
        [MaxLength(50, ErrorMessage = "Your password can not be over 50 characters")]
    public string Password { get; set; } = string.Empty;

    }
}