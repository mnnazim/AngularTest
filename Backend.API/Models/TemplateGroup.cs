using System;
using System.Collections.Generic;

namespace Backend.API.Models
{
    public class TemplateGroup
    {
         public string Id { get; set; }
        public string Name { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public ICollection<Template> Templates { get; set; }
        public ICollection<ActivityLink> ActivityLinks { get; set; }
    }
}