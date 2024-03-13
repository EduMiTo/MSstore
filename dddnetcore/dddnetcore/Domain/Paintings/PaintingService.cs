using System.Threading.Tasks;
using System.Collections.Generic;
using DDDSample1.Domain.Shared;
using System;
using System.IO;

namespace DDDSample1.Domain.Paintings
{
    public class PaintingService
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IPaintingRepository _repo;

        public PaintingService(IUnitOfWork unitOfWork, IPaintingRepository repo)
        {
            this._unitOfWork = unitOfWork;
            this._repo = repo;
        }

        public virtual async Task<List<PaintingDto>> GetAllAsync()
        {
            var list = await this._repo.GetAllAsync();
            
            List<PaintingDto> listDto = list.ConvertAll<PaintingDto>(cat => PaintingMapper.domainToDTO(cat));

            return listDto;
        }

        public virtual async Task<PaintingDto> GetByIdAsync(PaintingId id)
        {
            var cat = await this._repo.GetByIdAsync(id);
            
            if(cat == null)
                return null;
            
            return PaintingMapper.domainToDTO(cat);
        }

        public virtual async Task<List<Image>> GetImagesByPaintingIdAsync(PaintingId id)
        {
            var list = await this._repo.GetSecundaryImagesByPaintingIdAsync(id);
            
            if(list == null)
                return null;

            return list;
        }

        public virtual async Task<PaintingDto> AddAsync(PaintingDto dto)
        {

            var list = await this._repo.GetAllAsync();

            var idNumber = list.Count + 1;

            byte[] imagemBytes;
            using (var ms = new MemoryStream())
            {
                await dto.file.CopyToAsync(ms);
                imagemBytes = ms.ToArray();
            }


            
            List<byte[]> imagemBytes2 = new List<byte[]>();
            foreach (var fileTmp in dto.file2)
            {

                using (var ms = new MemoryStream())
                {
                    await fileTmp.CopyToAsync(ms);
                    imagemBytes2.Add(ms.ToArray());
                }
            }



            var Painting = new Painting(idNumber.ToString(), dto.Width, dto.Lenght, dto.Price, imagemBytes,dto.description, imagemBytes2);

            await this._repo.AddAsync(Painting);

            await this._unitOfWork.CommitAsync();

            return PaintingMapper.domainToDTO(Painting);
        }

    /*    public virtual async Task<PaintingDto> UpdateAsync(PaintingDto dto)
        {
            var Painting = await this._repo.GetByIdAsync(new PaintingId(dto.Id)); 

            if (Painting == null)
                return null;

            Painting.update(dto);

            
            await this._unitOfWork.CommitAsync();

            return PaintingMapper.domainToDTO(Painting);
        }*/

         public virtual async Task<PaintingDto> DeleteAsync(PaintingId id)
        {
            var Painting = await this._repo.GetByIdAsync(id); 

            if (Painting == null)
                return null;   

            
            this._repo.Remove(Painting);
            await this._unitOfWork.CommitAsync();

            return PaintingMapper.domainToDTO(Painting);
        }
    }
}