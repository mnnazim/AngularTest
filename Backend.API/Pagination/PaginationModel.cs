namespace Backend.API.Pagination
{
    public class PaginationModel
    {
        public string FromDate{get;set;}
        public string ToDate{get;set;}
        public int PageIndex{get;set;}
        public string SortBy{get;set;}
        public string Order{get;set;}
        public int ShowItem{get;set;}
        public string SearchKeyword{get;set;}
        
    }
}