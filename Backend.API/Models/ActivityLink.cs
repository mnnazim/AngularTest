using System;

namespace Backend.API.Models
{
    public class ActivityLink
    {
         public string Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public string TemplateGroupId { get; set; }
        public TemplateGroup TemplateGroup { get; set; }
    }
}