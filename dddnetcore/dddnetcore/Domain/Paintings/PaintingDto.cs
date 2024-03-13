using System;
using System.Collections.Generic;
using DDDSample1.Domain.Paintings;
using Microsoft.AspNetCore.Http;

namespace DDDSample1.Domain.Paintings
{
    public class PaintingDto
    {
        public string Id { get; init; }
        public double Width { get;  init; }

        public double Lenght { get;  init; }

        public double Price { get;  init; }

        public string description {get; init;}

        public byte[] Image { get ; set;}

        public IFormFile file {get; init;}

         public IFormFileCollection file2 {get; init;}


        public List<byte[]> secundaryImages {get;init;}

    }
}