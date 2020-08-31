using System;

namespace Backend.API.Models
{
    public class Device
    {
         public string Id { get; set; }
        public string UniqueId { get; set; }
        public string Name { get; set; }
        public bool IsActive { get; set; }
        public DateTime CreateDate{get;set;} = DateTime.Now;
    }
}