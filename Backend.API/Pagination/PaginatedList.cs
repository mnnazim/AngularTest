using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.API.Pagination
{
   public class PaginatedList<T>
    {
        public int PageIndex { get; private set; }
        public int NextPage{get; private set;}
        public int PreviousPage{get; private set;}
        public int TotalPages { get; private set; }
        public int TotalItem { get; set; }
        public int StartFrom { get; set; }
        public string CurrentFilter { get; set; }
        public int PageSize {get;set;}
        public List<T> Items {get;set;}
        public PaginatedList(List<T> items, int count, int pageIndex, int pageSize)
        {
           
            PageIndex = pageIndex;
           
            NextPage = pageIndex+1;
            
            PageSize = pageSize;
             if(pageIndex <= 1){
                PreviousPage = 0;
            }else{
                PreviousPage = pageIndex - 1;
            }

            TotalPages = (int)Math.Ceiling(count / (double)pageSize);
            TotalItem = count;
            StartFrom = (pageIndex - 1) * pageSize + 1;
            Items = items;
        }

        public bool HasPreviousPage
        {
            get
            {
                return (PageIndex > 1);
            }
        }

        public bool HasNextPage
        {
            get
            {
                return (PageIndex < TotalPages);
            }
        }

        public static async Task<PaginatedList<T>> CreateAsync(
            IQueryable<T> source, int pageIndex, int pageSize)
        {
            var count = await source.CountAsync();
            var items = await source.Skip(
                (pageIndex - 1) * pageSize)
                .Take(pageSize).ToListAsync();
            return new PaginatedList<T>(items, count, pageIndex, pageSize);
        }
    }
}