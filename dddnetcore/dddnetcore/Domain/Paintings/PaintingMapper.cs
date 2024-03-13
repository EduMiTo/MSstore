using System;
using DDDSample1.Domain.Paintings;

namespace DDDSample1.Domain.Paintings
{
    public class PaintingMapper
    {
        public static PaintingDto domainToDTO(Painting Painting)
        {
            return new PaintingDto
            {
                Id = Painting.Id.value,
                Width = Painting.width.width,
                Lenght = Painting.lenght.lenght,
                Price = Painting.price.price,
                Image = Painting.image.image,
                description= Painting.description
            };
        }
       /* public static PaintingDto domainToDTOSecundaryImages(Image Painting)
        {
            return new PaintingDto
            {
                Id = Painting.Id.value,
                Image = Painting.image.image,
            };
        }*/


        public static Painting dtoToDomain(PaintingDto Painting)
        {
            return new Painting(Painting.Id,Painting.Width, Painting.Lenght, Painting.Price, Painting.Image, Painting.description ,Painting.secundaryImages);
        }
    }
}