using Backend.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Backend.API.Data.EentityConfig
{
   public class TemplateEntityConfig : IEntityTypeConfiguration<Template>
    {
        public void Configure(EntityTypeBuilder<Template> builder)
        {
            builder.HasOne(e => e.TemplateGroup)
                .WithMany(e => e.Templates)
                .HasForeignKey(e => e.TemplateGroupid)
                .OnDelete(DeleteBehavior.SetNull);
        }
    }
}