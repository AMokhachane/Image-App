using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Tag
    {
    public int TagId { get; set; }
    public string TagName { get; set; } = string.Empty;
    public string TagDescription { get; set; } = string.Empty;

    public int? ImageId { get; set; }

    public Image? Image { get; set; } 
    }
}