using System;
using System.Collections.Generic;
using System.Linq;
using DDDSample1.Domain.Shared;

namespace DDDSample1.Domain.Paintings
{
    public class Painting : Entity<PaintingId>, IAggregateRoot
    {
     
        public PaintingId Id { get; private set; }

        public Width width{ get; private set; }

        public Lenght lenght{ get; private set; }

        public Price price {get; private set;}

        public Image image {get;private set;}

        public List<Image> secundaryImages {get; private set;}

        public string description{get; private set;}

        
        



        public Painting()
        {
            
        }

        public Painting(string id, double width, double lenght, double price, byte[] image, string description, List<byte[]> secundaryImages)
        {
            this.Id = new PaintingId(id);
            this.width = new Width(width);
            this.lenght = new Lenght(lenght);
            this.price = new Price(price);
            this.image = new Image(image);
            this.description= description;
            this.secundaryImages = new List<Image>();
            for(int i=0; i< secundaryImages.Count; i++){
                this.secundaryImages.Add(new Image(secundaryImages[i]));
            }
        }
    }
}