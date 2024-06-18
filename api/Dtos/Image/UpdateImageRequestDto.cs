using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace api.Dtos.Image
{
    public class UpdateImageRequestDto
    {

    public string Title { get; set; } = string.Empty;
    public string ImageDescription { get; set; } = string.Empty;
    public string Url { get; set; } = string.Empty;
    public DateTime UploadDate { get; set; } = DateTime.Now;
    }
}