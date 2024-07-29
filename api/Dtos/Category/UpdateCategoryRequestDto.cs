using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Image.Category
{
    public class UpdateCategoryRequestDto
    {
        [Required]
        [MinLength(2, ErrorMessage = "CategoryName must be at least 2 characters")]
        [MaxLength(50, ErrorMessage = "CategoryName cannot be over 50 characters")]
    public string CategoryName { get; set; } = string.Empty;
        [Required]
        [MinLength(2, ErrorMessage = "Category description must be at least 2 characters")]
        [MaxLength(200, ErrorMessage = "Category description cannot be over 200 characters")]

    public string CategoryDescription { get; set; } = string.Empty;
    }
}