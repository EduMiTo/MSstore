using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System;
using System.Threading.Tasks;
using DDDSample1.Domain.Shared;
using DDDSample1.Domain.Paintings;


namespace DDDSample1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaintingController : ControllerBase
    {
        private readonly PaintingService _service;

        public PaintingController(PaintingService service)
        {
            _service = service;
        }

        // GET: api/Deliveries
        [HttpGet("listAll")]
        public async Task<ActionResult<IEnumerable<PaintingDto>>> GetAll()
        {
            return await _service.GetAllAsync();
        }

        // GET: api/Deliveries/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PaintingDto>> GetById(PaintingDto dto)
        {
            var cat = await _service.GetByIdAsync(new PaintingId(dto.Id));

            if (cat == null)
            {
                return NotFound("The Painting does not exist");
            }

            return cat;
        }


        // GET: api/Deliveries/5
        [HttpGet("{id}/images")]
        public async Task<ActionResult<IEnumerable<Image>>> GetImagesByPaintingId(string id)
        {
            var cat = await _service.GetImagesByPaintingIdAsync(new PaintingId(id));

            if (cat == null)
            {
                return NotFound("The Painting does not exist");
            }

            return cat;
        }





        // POST: api/Deliveries
        [HttpPost]
        public async Task<ActionResult<PaintingDto>> Create([FromForm]PaintingDto dto)
        {
            try
            {

                

                var cat = await _service.AddAsync(dto);

                return CreatedAtAction(nameof(GetById), new { id = cat.Id }, cat);
            }
            catch (BusinessRuleValidationException ex)
            {
                return BadRequest(new { Message = ex.Message });
            }
            
        }

        
        // PUT: api/Deliveries/5
       /* [HttpPatch("{id}")]
        public async Task<ActionResult<PaintingDto>> Update(PaintingDto dto)
        {
        

            try
            {
                var cat = await _service.UpdateAsync(dto);
                
                if (cat == null)
                {
                    return NotFound("The Painting does not exist");
                }
                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
                return BadRequest(new {Message = ex.Message});
            }
        }*/

        // Inactivate: api/Deliveries/5
      /*  [HttpDelete("{id}")]
        public async Task<ActionResult<PaintingDto>> SoftDelete(Guid id)
        {
            var cat = await _service.InactivateAsync(new PaintingId(id));

            if (cat == null)
            {
                return NotFound();
            }

            return Ok(cat);
        }*/
        
        // DELETE: api/Deliveries/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<PaintingDto>> HardDelete(PaintingDto dto)
        {
            try
            {
                var cat = await _service.DeleteAsync(new PaintingId(dto.Id));

                if (cat == null)
                {
                    return NotFound("The Painting does not exist");
                }

                return Ok(cat);
            }
            catch(BusinessRuleValidationException ex)
            {
               return BadRequest(new {Message = ex.Message});
            }
        }
    }
}