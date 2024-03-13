using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using DDDSample1.Domain.Paintings;
namespace DDDSample1.Infrastructure.Paintings
{
    internal class PaintingEntityTypeConfiguration : IEntityTypeConfiguration<Painting>
    {
        public void Configure(EntityTypeBuilder<Painting> builder)
        {
            // cf. https://www.entityframeworktutorial.net/efcore/fluent-api-in-entity-framework-core.aspx

            
            
            builder.ToTable("Paintings", SchemaNames.DDDSample1);
            
            builder.HasKey(b => b.Id);
            builder.Property(b => b.Id).HasConversion(v => v.value, v => new PaintingId(v));
            builder.OwnsOne(b => b.width);
            builder.OwnsOne(b => b.lenght);
            builder.OwnsOne(b => b.price);
            builder.OwnsOne(b => b.image);

           builder.OwnsMany(b => b.secundaryImages, a =>
            {
                a.WithOwner().HasForeignKey("PaintingId"); // Specify a foreign key if necessary
                a.Property<int>("Id"); // EF Core requires an identifier for each owned entity, even if it's not exposed in your domain model
                a.HasKey("Id"); // Makes the Id configured above as the primary key
                a.ToTable("SecondaryImages"); // Maps the owned collection to a separate table since EF Core doesn't support collections of owned types in the same table by default
            });

            //builder.Property<bool>("_active").HasColumnName("Active");
        }
    }
}