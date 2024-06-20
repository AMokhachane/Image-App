using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Image.Tag
{
    public class UpdateTagRequestDto
    {
        [Required]
        [MinLength(2, ErrorMessage = "TagName must be at least 2 characters")]
        [MaxLength(50, ErrorMessage = "TagName cannot be over 50 characters")]
    public string TagName { get; set; } = string.Empty;
        [Required]
        [MinLength(2, ErrorMessage = "Tag description must be at least 2 characters")]
        [MaxLength(200, ErrorMessage = "Tag description cannot be over 200 characters")]

    public string TagDescription { get; set; } = string.Empty;
    }
}