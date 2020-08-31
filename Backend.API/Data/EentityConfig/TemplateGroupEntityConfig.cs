using Backend.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.API.Data.EentityConfig
{
    public class TemplateGroupEntityConfig : IEntityTypeConfiguration<TemplateGroup>
    {
        public void Configure(EntityTypeBuilder<TemplateGroup> builder)
        {
            //builder.HasOne(e => e.ApplicationUser)
            //    .WithOne(e => e.AdminDetails)
            //    .HasForeignKey<AdminDetails>(e => e.UserId)
            //    .OnDelete(DeleteBehavior.SetNull);
        }
    }
}