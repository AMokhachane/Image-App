using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Image
{
    public class CreateImageRequestDto
    {
        [Required]
        [MinLength(2, ErrorMessage = "Title must be at least 2 characters")]
        [MaxLength(50, ErrorMessage = "Title cannot be over 200 characters")]

    public string Title { get; set; } = string.Empty;
        [Required]
        [MinLength(2, ErrorMessage = "Image description must be at least 2 characters")]
        [MaxLength(200, ErrorMessage = "Image description cannot be over 200 characters")]

    public string ImageDescription { get; set; } = string.Empty;
        [Required(ErrorMessage = "The URL is required.")]
        [Url(ErrorMessage = "Please enter a valid URL.")]
        [MaxLength(2083, ErrorMessage = "URL cannot be over 2083 characters.")]
    public string Url { get; set; } = string.Empty;
        [Required(ErrorMessage = "The upload date is required.")]
     public DateTime UploadDate { get; set; } = DateTime.Now;
    }
}