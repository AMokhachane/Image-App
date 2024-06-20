using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Dtos.Comment
{
    public class CommentDto
    {
        public int CommentId { get; set; }
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedOn { get; set; } = DateTime.Now;
        public int? ImageId { get; set; }
        
    }
}