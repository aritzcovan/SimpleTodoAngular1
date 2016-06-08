using Microsoft.EntityFrameworkCore;

namespace SimpTodo1.Models
{
    public class TodoContext : DbContext
    {
        public DbSet<TodoItem> Todos { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite("Filename=./todo.db");

        }
    }
}
