using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using api.Service;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
  public class ApplicationDBContext : IdentityDbContext<AppUser>
  {
        internal readonly IEnumerable<object> PasswordHistories;

        public ApplicationDBContext(DbContextOptions dbContextOptions)
    : base(dbContextOptions)
    {

    }
    public DbSet<Image> Images { get; set; }
    public DbSet<Tag> Tags { get; set; }
    public DbSet<Comment> Comments { get; set; }
    public DbSet<AppUser> AppUsers { get; set; }
    public DbSet<PasswordHistory> passwordHistories { get; set; }


    protected override void OnModelCreating(ModelBuilder builder)
    {
      base.OnModelCreating(builder);

      List<IdentityRole> roles = new List<IdentityRole>
            {
              new IdentityRole
              {
                Name = "Admin",
                NormalizedName = "ADMIN"
              },

                 new IdentityRole
              {
                Name = "User",
                NormalizedName = "USER"
              },
            };
      builder.Entity<IdentityRole>().HasData(roles);
    }

  }
}