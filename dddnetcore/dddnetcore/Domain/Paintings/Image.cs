using System.Reflection.Metadata;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Paintings
{
    public class Image : IValueObject
    {

        public byte[] image { get; init; }

        public Image() { }
        public Image(byte[] image)
        {

            this.image = image;
        }
}
}