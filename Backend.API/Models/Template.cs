using System;

namespace Backend.API.Models
{
    public class Template
    {
        public string Id { get; set; }
        public string Message { get; set; }
        public DateTime CreateDate { get; set; } = DateTime.Now;
        public string TemplateGroupid { get; set; }
        public TemplateGroup TemplateGroup { get; set; }
    }
}