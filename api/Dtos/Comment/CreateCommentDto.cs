using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CreateCommentDto
    {
        [Required]
        [MinLength(2, ErrorMessage = "Content must be at least 2 characters")]
        [MaxLength(300, ErrorMessage = "Content cannot exceed over 300 characters")]
        public string Content { get; set; } = string.Empty;
        // public string AppUserId { get; set;}  

    }
}