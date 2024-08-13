using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Image
    {
        public int ImageId { get; set; }
        public string Title { get; set; } = string.Empty;
        public string ImageDescription { get; set; } = string.Empty;
        public string Url { get; set; } = string.Empty;
        public DateTime UploadDate { get; set; } = DateTime.Now;
        public List<Tag> Tags { get; set; } = new List<Tag>();
        public List<Comment> Comments { get; set; } = new List<Comment>();
        public string AppUserId { get; set; }
        public AppUser AppUser { get; set; }


    }
}