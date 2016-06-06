using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace oldAng.Models
{
    [Table("Todos")]
    public class TodoItem
    {
        [Key]
        public int TodoId { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }
        
    }
}
