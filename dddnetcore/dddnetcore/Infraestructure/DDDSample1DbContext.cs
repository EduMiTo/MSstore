using Microsoft.EntityFrameworkCore;
using DDDSample1.Domain.Paintings;
using DDDSample1.Infrastructure.Paintings;


namespace DDDSample1.Infrastructure
{
    public class DDDSample1DbContext : DbContext
    {

        public DbSet<Painting> Paintings { get; set; }



        public DDDSample1DbContext(DbContextOptions options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
           // base.OnModelCreating(modelBuilder);

            modelBuilder.ApplyConfiguration(new PaintingEntityTypeConfiguration());

        }
    }
}