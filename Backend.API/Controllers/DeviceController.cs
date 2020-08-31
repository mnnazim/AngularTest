using System;
using System.Threading.Tasks;
using Backend.API.Data;
using Microsoft.AspNetCore.Mvc;
using System.Threading;
using Backend.API.Models;
using Microsoft.EntityFrameworkCore;
using Backend.API.Pagination;
using System.Linq;

namespace Backend.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly ApplicationDbContext context;

        public DeviceController(ApplicationDbContext context)
        {
            this.context = context;
        }

        //get all
        [HttpGet]
        public async Task<IActionResult> GetDevices([FromQuery] PaginationModel filter){
            if(filter != null){
                var query =  context.Devices.AsNoTracking().AsQueryable();

                if(filter.Order == "ascending"){
                    query = query.OrderBy(e=>e.CreateDate);
                }else{
                    query = query.OrderByDescending(e=>e.CreateDate);
                }

                var devices = await PaginatedList<Device>.CreateAsync(query, filter.PageIndex, filter.ShowItem);
                return Ok(devices);

            }
            
            return BadRequest();
        }

        //get with id
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDevice(string id){
            var device  = await context.Devices.AsNoTracking().FirstOrDefaultAsync(e=>e.Id == id);
            if(device != null)
                return Ok(device);

            return NotFound();
        }

        //create
        [HttpPost]
        public async Task<IActionResult> CreateDevice(Device device){
            if(device != null){
                device.Id = Guid.NewGuid().ToString();
                device.CreateDate = DateTime.Now;
                await context.Devices.AddAsync(device);
                var res = await context.SaveChangesAsync();
                if(res > 0)
                return CreatedAtAction(nameof(GetDevice), new{ id = device.Id}, device);
            }
            return BadRequest();
        }

        //update
        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateDevice(string id, Device device){
            if(device != null){
               
                context.Entry(device).State = EntityState.Modified;

                try{
                     var res = await context.SaveChangesAsync();

                    if(res > 0)
                        return NoContent();
                }catch(Exception ex){
                    
                }
               
            }
            return NotFound();
        }

        //delete
        [HttpDelete("{id:guid}")]
        public async Task<IActionResult> DeleteDevice(string id){
            var item = await context.Devices.FirstOrDefaultAsync(e=>e.Id == id);
            if(item != null){
                context.Devices.Remove(item);
                var res = await context.SaveChangesAsync();
                if(res > 0)
                    return Ok();
            }

            return NotFound();
        }

    }
}