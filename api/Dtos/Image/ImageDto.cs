using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Dtos.Comment;

namespace api.Dtos.Image
{
    public class ImageDto
    {
    public int ImageId { get; set; }
    public string Title { get; set; } = string.Empty;
    public string ImageDescription { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public DateTime UploadDate { get; set; } = DateTime.Now;
    public List<TagDto> Tags { get; set; }
    public List<CommentDto> Comments { get; set; }
     public string AppUserId { get; set; }
        



        
    }
}