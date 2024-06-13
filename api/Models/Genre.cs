using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Models
{
    public class Genre
    {
    public int GenreId { get; set; }
    public string GenreName { get; set; } = string.Empty;
    public string GenreDescription { get; set; } = string.Empty;

    public Image? Image { get; set; } 
    }
}