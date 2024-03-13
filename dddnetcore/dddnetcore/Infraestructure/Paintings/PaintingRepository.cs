using DDDSample1.Domain.Paintings;
using DDDSample1.Infrastructure.Shared;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace DDDSample1.Infrastructure.Paintings
{
    public class PaintingRepository : BaseRepository<Painting, PaintingId>, IPaintingRepository
    {
    
            private readonly DDDSample1DbContext _context;

        public PaintingRepository(DDDSample1DbContext context):base(context.Paintings)
        {
            _context = context;

        }

        public async Task<List<Image>> GetSecundaryImagesByPaintingIdAsync(PaintingId id)
        {
            // Retrieve the painting including its secundary images.
            var painting = await _context.Paintings
                .Where(p => p.Id.Equals(id))
                .Include(p => p.secundaryImages) // Make sure to include secundaryImages.
                .FirstOrDefaultAsync();

            // Return the secundary images if the painting was found, otherwise return an empty list.
            return painting?.secundaryImages ?? new List<Image>();
        }


    }
}