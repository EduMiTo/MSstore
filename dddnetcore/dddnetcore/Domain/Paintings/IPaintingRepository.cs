using System.Collections.Generic;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Paintings
{
    public interface IPaintingRepository: IRepository<Painting, PaintingId>
    {
        public Task<List<Image>> GetSecundaryImagesByPaintingIdAsync(PaintingId id);
    }

     
}